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
};
