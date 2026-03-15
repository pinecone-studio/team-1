/**
 * Use-case: Update an asset by id.
 * Handles category resolution and update payload building.
 */
import {
  ensureCategoryId,
  updateAssetById as updateAssetByIdInDb,
} from "@/db/assets/mutations";
import { getAssetById } from "@/db/assets/queries";
import type { Asset } from "@/db/assets/types";

export type UpdateAssetInput = {
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

function buildAssetUpdate(input: UpdateAssetInput): Record<string, unknown> {
  const updates: Record<string, unknown> = {};
  const set = (key: string, value: unknown) => {
    if (value !== undefined) updates[key] = value;
  };
  set("assetTag", input.assetTag);
  set("serialNumber", input.serialNumber);
  set("status", input.status);
  set("purchaseDate", input.purchaseDate);
  set("purchaseCost", input.purchaseCost);
  set("currentBookValue", input.currentBookValue);
  set("locationId", input.locationId);
  set("assignedTo", input.assignedTo);
  set("imageUrl", input.imageUrl);
  set("deletedAt", input.deletedAt);
  if (
    input.currentBookValue === undefined &&
    input.purchaseCost !== undefined
  ) {
    updates.currentBookValue = input.purchaseCost;
  }
  return updates;
}

export async function updateAssetUseCase(
  id: string,
  input: UpdateAssetInput,
): Promise<Asset | undefined> {
  const updates = buildAssetUpdate(input);
  if (input.category != null) {
    (updates as Record<string, string>).subCategoryId =
      await ensureCategoryId(input.category);
  }
  if (Object.keys(updates).length === 0) {
    return getAssetById(id);
  }
  return updateAssetByIdInDb(id, updates as never);
}
