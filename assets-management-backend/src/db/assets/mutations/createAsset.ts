import { assets } from "../../../../drizzle/schema";
import { getDb } from "../../client";
import type { Asset, AssetCreate } from "../types";
import { getAssetById } from "../queries";

export async function createAsset(input: AssetCreate): Promise<Asset> {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();

  await db.insert(assets).values({
    id,
    assetTag: input.assetTag,
    category: input.category,
    serialNumber: input.serialNumber,
    status: input.status ?? "AVAILABLE",
    purchaseDate: input.purchaseDate,
    purchaseCost: input.purchaseCost,
    currentBookValue: input.currentBookValue,
    locationId: input.locationId,
    assignedTo: input.assignedTo,
    deletedAt: input.deletedAt,
    imageUrl: input.imageUrl,
    createdAt: now,
    updatedAt: now,
  });

  const created = await getAssetById(id);
  if (!created) {
    throw new Error("Failed to create asset");
  }
  return created;
}

