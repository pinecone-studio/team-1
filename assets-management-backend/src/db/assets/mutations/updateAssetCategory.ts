import { eq } from "drizzle-orm";

import { getDb } from "../../client";
import { getAssetById } from "../queries";
import { assets } from "@/schema";

export async function updateAssetCategory(
  assetId: string,
  categoryId: string,
) {
  const db = await getDb();

  const asset = await getAssetById(assetId);
  if (!asset) {
    throw new Error("Asset not found");
  }

  if (asset.status !== "AVAILABLE") {
    throw new Error(
      "Asset category can only be updated for unassigned (AVAILABLE) assets.",
    );
  }

  const now = Date.now();
  await db
    .update(assets)
    .set({
      categoryId,
      updatedAt: now,
    })
    .where(eq(assets.id, assetId));

  return getAssetById(assetId);
}
