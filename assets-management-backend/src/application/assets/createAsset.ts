/**
 * Use-case: Create a new asset.
 * Resolves category to subCategoryId and delegates to data layer.
 */
import {
  createAsset as createAssetInDb,
  ensureCategoryId,
} from "@/db/assets/mutations";
import type { Asset } from "@/db/assets/types";

export type CreateAssetInput = {
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

export async function createAssetUseCase(
  input: CreateAssetInput,
): Promise<Asset> {
  const subCategoryId = await ensureCategoryId(input.category);
  return createAssetInDb({
    assetTag: input.assetTag,
    serialNumber: input.serialNumber,
    status: input.status ?? undefined,
    purchaseDate: input.purchaseDate ?? undefined,
    purchaseCost: input.purchaseCost ?? undefined,
    currentBookValue:
      input.currentBookValue ?? input.purchaseCost ?? undefined,
    locationId: input.locationId ?? undefined,
    assignedTo: input.assignedTo ?? undefined,
    imageUrl: input.imageUrl ?? undefined,
    deletedAt: input.deletedAt ?? undefined,
    subCategoryId,
  });
}
