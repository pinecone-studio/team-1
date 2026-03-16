import {
  createAsset,
  deleteAndArchiveAsset,
  deleteAssetById,
  ensureCategoryId,
  ensureMainCategoryId,
  updateAssetById,
  updateAssetCategory,
} from "@/db/assets/mutations";
import { getAssetById } from "@/db/assets/queries";
import { ensureLocationId } from "@/db/locations";

type AssetCreateInput = {
  assetTag: string;
  category: string;
  mainCategory?: string | null;
  serialNumber: string;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  notes?: string | null;
  deletedAt?: number | null;
};

type AssetUpdateInput = {
  assetTag?: string | null;
  category?: string | null;
  mainCategory?: string | null;
  serialNumber?: string | null;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  notes?: string | null;
  deletedAt?: number | null;
};

const buildAssetUpdate = (input: AssetUpdateInput) => {
  const updates: Record<string, unknown> = {};
  const setIfDefined = (key: string, value: unknown) => {
    if (value !== undefined) updates[key] = value;
  };
  setIfDefined("assetTag", input.assetTag);
  setIfDefined("serialNumber", input.serialNumber);
  setIfDefined("status", input.status);
  setIfDefined("purchaseDate", input.purchaseDate);
  setIfDefined("purchaseCost", input.purchaseCost);
  setIfDefined("currentBookValue", input.currentBookValue);
  setIfDefined("locationId", input.locationId);
  setIfDefined("imageUrl", input.imageUrl);
  setIfDefined("notes", input.notes);
  setIfDefined("deletedAt", input.deletedAt);
  if (input.currentBookValue === undefined && input.purchaseCost !== undefined) {
    updates.currentBookValue = input.purchaseCost;
  }
  return updates;
};

export const assetMutations = {
  createAsset: async (_: unknown, args: { input: AssetCreateInput }) => {
    const input = args.input;
    const mainCategoryId =
      input.mainCategory?.trim() ?
        await ensureMainCategoryId(input.mainCategory.trim()) :
        undefined;
    const categoryId = await ensureCategoryId(
      input.category,
      input.mainCategory ?? null
    );
    const locationIdResolved = await ensureLocationId(input.locationId);
    return createAsset({
      assetTag: input.assetTag,
      serialNumber: input.serialNumber,
      status: input.status ?? undefined,
      purchaseDate: input.purchaseDate ?? undefined,
      purchaseCost: input.purchaseCost ?? undefined,
      locationId: locationIdResolved ?? input.locationId ?? undefined,
      imageUrl: input.imageUrl ?? undefined,
      notes: input.notes ?? undefined,
      deletedAt: input.deletedAt ?? undefined,
      mainCategoryId: mainCategoryId ?? undefined,
      categoryId,
    } as Parameters<typeof createAsset>[0]);
  },
  updateAsset: async (_: unknown, args: { id: string; input: AssetUpdateInput }) => {
    const input = args.input;
    const updates = buildAssetUpdate(input);
    if (input.locationId !== undefined) {
      updates.locationId = (await ensureLocationId(input.locationId)) ?? input.locationId ?? undefined;
    }
    if (input.mainCategory != null && input.mainCategory.trim()) {
      updates.mainCategoryId = await ensureMainCategoryId(input.mainCategory.trim());
    }
    if (input.category != null) {
      updates.categoryId = await ensureCategoryId(
        input.category,
        input.mainCategory ?? null
      );
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
  updateAssetCategory: async (_: unknown, args: { assetId: string; categoryId: string }) => {
    const categoryId = await ensureCategoryId(args.categoryId);
    return updateAssetCategory(args.assetId, categoryId);
  },
};
