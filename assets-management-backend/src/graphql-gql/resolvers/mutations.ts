import {
  createAsset,
  deleteAndArchiveAsset,
  deleteAssetById,
  ensureCategoryId,
  updateAssetById,
  updateAssetCategory,
} from "@/db/assets/mutations";
import {
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
} from "@/db/employees";
import { getAssetById } from "@/db/assets/queries";
import {
  assignAssetToEmployee,
  returnAssetFromEmployee,
  transferAsset
} from "@/db/assignments";
import {
  createMaintenanceTicket,
  updateMaintenanceTicket
} from "@/db/maintenance";
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
import {
  requestDisposal,
  approveDisposalRequest,
  rejectDisposalRequest,
  uploadDataWipeCertificate,
  completeDisposal,
} from "@/db/disposalRequests";
import { startOffboarding, completeAssetReturn } from "@/db/offboarding";
import { createVendor, updateVendor, deleteVendor } from "@/db/vendors";
import { createLocation, updateLocation, deleteLocation } from "@/db/locations";
import { createCategory, updateCategory, deleteCategory } from "@/db/categories";
import { createNotification, markNotificationAsRead } from "@/db/notifications";
import {
  adminOverrideDisposal,
  adminOverridePurchase,
  adminOverrideOffboarding
} from "@/db/admin";



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
      buyoutPolicyId?: string | null;
      assignedValue?: number | null;
      paymentPlanMonths?: number | null;
      interestRate?: number | null;
    },
  ) =>
    assignAssetToEmployee(
      args.assetId,
      args.employeeId,
      args.conditionAtAssign ?? undefined,
      args.accessoriesJson ?? undefined,
      args.buyoutPolicyId ?? undefined,
      {
        assignedValue: args.assignedValue ?? undefined,
        paymentPlanMonths: args.paymentPlanMonths ?? undefined,
        interestRate: args.interestRate ?? undefined,
      },
    ),
  updateAssetCategory: async (_: unknown, args: { assetId: string; categoryId: string }) => {
    const subCategoryId = await ensureCategoryId(args.categoryId);
    return updateAssetCategory(args.assetId, subCategoryId);
  },
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

  // ── Disposal Mutations ───────────────────────────────────────────────
  requestDisposal: (
    _: unknown,
    args: { assetId: string; requestedBy: string; method: string; reason?: string | null },
  ) =>
    requestDisposal(
      args.assetId,
      args.requestedBy,
      args.method,
      args.reason ?? undefined,
    ),
  approveDisposal: (
    _: unknown,
    args: { id: string; approvedBy: string; stage: "IT_APPROVED" | "FINANCE_APPROVED" },
  ) => approveDisposalRequest(args.id, args.approvedBy, args.stage),
  rejectDisposal: (
    _: unknown,
    args: { id: string; rejectedBy: string; reason?: string | null },
  ) => rejectDisposalRequest(args.id, args.rejectedBy, args.reason ?? undefined),
  uploadDataWipeCertificate: (
    _: unknown,
    args: { id: string; fileKey: string; uploadedBy: string },
  ) => uploadDataWipeCertificate(args.id, args.fileKey, args.uploadedBy),
  completeDisposal: (
    _: unknown,
    args: {
      id: string;
      certifiedBy: string;
      writeOffValue?: number | null;
      recipient?: string | null;
    },
  ) =>
    completeDisposal(
      args.id,
      args.certifiedBy,
      args.writeOffValue ?? undefined,
      args.recipient ?? undefined,
    ),

  // ── Offboarding Mutations ────────────────────────────────────────────
  startOffboarding: (_: unknown, args: { employeeId: string; initiatedBy: string }) =>
    startOffboarding(args.employeeId, args.initiatedBy),
  completeAssetReturn: (
    _: unknown,
    args: {
      assetId: string;
      employeeId: string;
      condition: string;
      inspectedBy: string;
    },
  ) =>
    completeAssetReturn(
      args.assetId,
      args.employeeId,
      args.condition,
      args.inspectedBy,
    ),

  // ── Maintenance Mutations ──────────────────────────────────────────
  createMaintenanceTicket: (_: unknown, args: any) => createMaintenanceTicket(args),
  updateMaintenanceTicket: (_: unknown, args: { id: string; status: string; repairCost?: number; resolvedAt?: number }) =>
    updateMaintenanceTicket(args.id, args),

  // ── Asset Management ───────────────────────────────────────────────
  transferAsset: (_: unknown, args: { assetId: string; fromEmployeeId: string; toEmployeeId: string; reason?: string; conditionNoted?: string }) =>
    transferAsset(args.assetId, args.fromEmployeeId, args.toEmployeeId, args.reason, args.conditionNoted),

  // ── Super Admin Central Command ──────────────────────────────────────

  createVendor: (_: unknown, args: { input: any }) => createVendor(args.input),
  updateVendor: (_: unknown, args: { id: string; input: any }) => updateVendor(args.id, args.input),
  deleteVendor: (_: unknown, args: { id: string }) => deleteVendor(args.id),

  createLocation: (_: unknown, args: { input: any }) => createLocation(args.input),
  updateLocation: (_: unknown, args: { id: string; input: any }) => updateLocation(args.id, args.input),
  deleteLocation: (_: unknown, args: { id: string }) => deleteLocation(args.id),

  createCategory: (_: unknown, args: { name: string; parentId?: string }) =>
    createCategory(args.name, args.parentId),
  updateCategory: (_: unknown, args: { id: string; name?: string; parentId?: string }) =>
    updateCategory(args.id, args.name, args.parentId),
  deleteCategory: (_: unknown, args: { id: string }) => deleteCategory(args.id),

  sendNotification: (_: unknown, args: { input: any }) => createNotification(args.input),
  markNotificationAsRead: (_: unknown, args: { id: string }) => {
    markNotificationAsRead(args.id);
    return true;
  },

  adminOverrideDisposal: (_: unknown, args: { id: string; status: string }) =>
    adminOverrideDisposal(args.id, args.status, "SUPER_ADMIN"), // Hard-coding role for now as auth is not implemented
  adminOverridePurchase: (_: unknown, args: { token: string; status: string }) =>
    adminOverridePurchase(args.token, args.status, "SUPER_ADMIN"),
  adminOverrideOffboarding: (_: unknown, args: { id: string; status: string }) =>
    adminOverrideOffboarding(args.id, args.status, "SUPER_ADMIN"),
};

