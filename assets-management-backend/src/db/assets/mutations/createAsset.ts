import { assets } from "../../../../drizzle/schema";
import { getDb } from "../../client";
import type { Asset, AssetCreate } from "../types";
import { getAssetById } from "../queries";

function buildAssetRow(input: AssetCreate, now: number) {
  const fallbackImageUrl = process.env.DEFAULT_ASSET_IMAGE_URL;
  return {
    id: crypto.randomUUID(),
    assetTag: input.assetTag,
    serialNumber: input.serialNumber,
    status: input.status ?? "AVAILABLE",
    purchaseDate: input.purchaseDate,
    purchaseCost: input.purchaseCost,
    currentBookValue: input.currentBookValue,
    locationId: input.locationId,
    assignedTo: input.assignedTo,
    categoryId: input.categoryId,
    subCategoryId: input.subCategoryId,
    deletedAt: input.deletedAt,
    imageUrl: input.imageUrl ?? fallbackImageUrl,
    createdAt: now,
    updatedAt: now,
  };
}

export async function createAsset(input: AssetCreate): Promise<Asset> {
  const db = await getDb();
  const now = Date.now();
  const row = buildAssetRow(input, now);

  await db.insert(assets).values(row);

  const created = await getAssetById(row.id);
  if (!created) {
    throw new Error("Failed to create asset");
  }
  return created;
}

export async function createAssets(inputs: AssetCreate[]) {
  if (!inputs || inputs.length === 0) return;

  const db = await getDb();
  const now = Date.now();
  const rows = inputs.map((input) => buildAssetRow(input, now));

  await db.insert(assets).values(rows);
}
