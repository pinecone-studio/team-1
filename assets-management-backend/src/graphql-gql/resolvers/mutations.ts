import {
  createAsset,
  deleteAndArchiveAsset,
  deleteAssetById,
  ensureCategoryId,
  updateAssetById,
} from "@/db/assets/mutations";
import {
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
} from "@/db/employees";
import { getAssetById } from "@/db/assets/queries";
import { assignAssetToEmployee, returnAssetFromEmployee } from "@/db/assignments";
import {
  createPurchaseRequest,
  createPurchaseRequestsBatch,
  decidePurchaseRequestsByToken,
  decidePurchaseRequest,
  getPurchaseRequestByToken,
  getPurchaseRequestsByToken,
} from "@/db/purchaseRequests";
import {
  sendEmail,
  buildPurchaseRequestEmail,
  buildPurchaseRequestSummaryEmail,
} from "@/app/lib/email";

type AssetCreateInput = {
  assetTag: string;
  category: string;
  serialNumber: string;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  deletedAt?: number | null;
};

type AssetUpdateInput = {
  assetTag?: string | null;
  category?: string | null;
  serialNumber?: string | null;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  deletedAt?: number | null;
};

type EmployeeInput = Record<string, unknown>;

const buildAssetUpdate = (input: AssetUpdateInput) => {
  const updates: Record<string, unknown> = {};

  const setIfDefined = (key: string, value: unknown) => {
    if (value !== undefined) {
      updates[key] = value;
    }
  };

  setIfDefined("assetTag", input.assetTag);
  setIfDefined("serialNumber", input.serialNumber);
  setIfDefined("status", input.status);
  setIfDefined("purchaseDate", input.purchaseDate);
  setIfDefined("purchaseCost", input.purchaseCost);
  setIfDefined("currentBookValue", input.currentBookValue);
  setIfDefined("locationId", input.locationId);
  setIfDefined("assignedTo", input.assignedTo);
  setIfDefined("imageUrl", input.imageUrl);
  setIfDefined("deletedAt", input.deletedAt);

  if (input.currentBookValue === undefined && input.purchaseCost !== undefined) {
    updates.currentBookValue = input.purchaseCost;
  }

  return updates;
};

export const Mutation = {
  createEmployee: (_: unknown, args: { input: EmployeeInput }) =>
    createEmployee(args.input as never),
  updateEmployee: (_: unknown, args: { id: string; input: EmployeeInput }) =>
    updateEmployeeById(args.id, args.input as never),
  deleteEmployee: (_: unknown, args: { id: string }) =>
    deleteEmployeeById(args.id),
  createAsset: async (_: unknown, args: { input: AssetCreateInput }) => {
    const input = args.input;
    const subCategoryId = await ensureCategoryId(input.category);
    return createAsset({
      assetTag: input.assetTag,
      serialNumber: input.serialNumber,
      status: input.status ?? undefined,
      purchaseDate: input.purchaseDate ?? undefined,
      purchaseCost: input.purchaseCost ?? undefined,
      currentBookValue: input.currentBookValue ?? input.purchaseCost ?? undefined,
      locationId: input.locationId ?? undefined,
      assignedTo: input.assignedTo ?? undefined,
      imageUrl: input.imageUrl ?? undefined,
      deletedAt: input.deletedAt ?? undefined,
      subCategoryId,
    });
  },
  updateAsset: async (_: unknown, args: { id: string; input: AssetUpdateInput }) => {
    const input = args.input;
    const updates = buildAssetUpdate(input);
    if (input.category != null) {
      updates.subCategoryId = await ensureCategoryId(input.category);
    }
    if (Object.keys(updates).length === 0) {
      return getAssetById(args.id);
    }
    return updateAssetById(args.id, updates as never);
  },
  deleteAsset: async (_: unknown, args: { id: string }) => {
    const hasArchiveEnv =
      !!process.env.R2_S3_API &&
      !!process.env.R2_ACCESS_KEY_ID &&
      !!process.env.R2_SECRET_ACCESS_KEY &&
      !!process.env.ARCHIVE_BUCKET_NAME;

    if (!hasArchiveEnv) {
      return deleteAssetById(args.id);
    }

    return deleteAndArchiveAsset(args.id);
  },
  assignAsset: (
    _: unknown,
    args: {
      assetId: string;
      employeeId: string;
      conditionAtAssign?: string | null;
      accessoriesJson?: string | null;
    },
  ) =>
    assignAssetToEmployee(
      args.assetId,
      args.employeeId,
      args.conditionAtAssign ?? undefined,
      args.accessoriesJson ?? undefined,
    ),
  returnAsset: (
    _: unknown,
    args: { assetId: string; conditionAtReturn?: string | null },
  ) =>
    returnAssetFromEmployee(
      args.assetId,
      args.conditionAtReturn ?? undefined,
    ),
  createPurchaseRequest: async (
    _: unknown,
    args: {
      assetTag: string;
      category: string;
      serialNumber: string;
      purchaseCost?: number | null;
      purchaseDate?: number | null;
      requesterEmployeeId: string;
      requesterEmail: string;
    },
  ) => {
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const request = await createPurchaseRequest({
      assetTag: args.assetTag,
      category: args.category,
      serialNumber: args.serialNumber,
      purchaseCost: args.purchaseCost ?? undefined,
      purchaseDate: args.purchaseDate ?? undefined,
      requesterEmployeeId: args.requesterEmployeeId,
      requesterEmail: args.requesterEmail,
      token,
      expiresAt,
    });

    const baseUrl = process.env.APP_BASE_URL ?? "";
    const approveUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=approve`;
    const declineUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=decline`;

    const approverEmail = process.env.APPROVER_EMAIL;
    if (!approverEmail) {
      throw new Error("Missing APPROVER_EMAIL");
    }

    const html = buildPurchaseRequestEmail({
      assetTag: args.assetTag,
      category: args.category,
      serialNumber: args.serialNumber,
      purchaseCost: args.purchaseCost ?? undefined,
      purchaseDate: args.purchaseDate ?? undefined,
      requesterEmail: args.requesterEmail,
      approveUrl,
      declineUrl,
    });

    await sendEmail({
      to: approverEmail,
      subject: "Asset purchase approval request",
      html,
    });

    return request!;
  },
  createPurchaseRequestBatch: async (
    _: unknown,
    args: {
      items: Array<{
        assetTag: string;
        category: string;
        serialNumber: string;
        purchaseCost?: number | null;
        purchaseDate?: number | null;
      }>;
      requesterEmployeeId: string;
      requesterEmail: string;
    },
  ) => {
    if (!args.items.length) {
      throw new Error("Items are required");
    }

    const baseUrl = process.env.APP_BASE_URL ?? "";
    const approverEmail = process.env.APPROVER_EMAIL;
    if (!approverEmail) {
      throw new Error("Missing APPROVER_EMAIL");
    }

    if (args.items.length <= 5) {
      const results = [];
      for (const item of args.items) {
        const token = crypto.randomUUID();
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
        const request = await createPurchaseRequest({
          assetTag: item.assetTag,
          category: item.category,
          serialNumber: item.serialNumber,
          purchaseCost: item.purchaseCost ?? undefined,
          purchaseDate: item.purchaseDate ?? undefined,
          requesterEmployeeId: args.requesterEmployeeId,
          requesterEmail: args.requesterEmail,
          token,
          expiresAt,
        });

        const approveUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=approve`;
        const declineUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=decline`;

        const html = buildPurchaseRequestEmail({
          assetTag: item.assetTag,
          category: item.category,
          serialNumber: item.serialNumber,
          purchaseCost: item.purchaseCost ?? undefined,
          purchaseDate: item.purchaseDate ?? undefined,
          requesterEmail: args.requesterEmail,
          approveUrl,
          declineUrl,
        });

        await sendEmail({
          to: approverEmail,
          subject: "Asset purchase approval request",
          html,
        });

        if (request) results.push(request);
      }
      return results;
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const batch = args.items.map((item) => ({
      assetTag: item.assetTag,
      category: item.category,
      serialNumber: item.serialNumber,
      purchaseCost: item.purchaseCost ?? undefined,
      purchaseDate: item.purchaseDate ?? undefined,
      requesterEmployeeId: args.requesterEmployeeId,
      requesterEmail: args.requesterEmail,
      token,
      expiresAt,
    }));

    const requests = await createPurchaseRequestsBatch(batch);

    const approveUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=approve`;
    const declineUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=decline`;

    const html = buildPurchaseRequestSummaryEmail({
      requesterEmail: args.requesterEmail,
      totalCount: args.items.length,
      sampleAssetTags: args.items.slice(0, 5).map((item) => item.assetTag),
      approveUrl,
      declineUrl,
    });

    await sendEmail({
      to: approverEmail,
      subject: "Asset purchase approval request (Batch)",
      html,
    });

    return requests;
  },
  approvePurchaseRequest: async (
    _: unknown,
    args: { token: string; approverEmail: string },
  ) => {
    const requests = await getPurchaseRequestsByToken(args.token);
    if (!requests.length) throw new Error("Request not found");

    for (const request of requests) {
      if (request.status !== "PENDING") continue;
      const subCategoryId = await ensureCategoryId(request.category);
      await createAsset({
        assetTag: request.assetTag,
        serialNumber: request.serialNumber,
        purchaseCost: request.purchaseCost ?? undefined,
        purchaseDate: request.purchaseDate ?? undefined,
        currentBookValue: request.purchaseCost ?? undefined,
        subCategoryId,
        status: "AVAILABLE",
      });
    }

    const updated = await decidePurchaseRequestsByToken(
      args.token,
      "APPROVED",
      args.approverEmail,
    );

    return updated[0];
  },
  declinePurchaseRequest: async (
    _: unknown,
    args: { token: string; approverEmail: string },
  ) => {
    const requests = await getPurchaseRequestsByToken(args.token);
    if (!requests.length) throw new Error("Request not found");

    const updated = await decidePurchaseRequestsByToken(
      args.token,
      "DECLINED",
      args.approverEmail,
    );

    return updated[0];
  },
};
