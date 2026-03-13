import { eq } from "drizzle-orm";
import { assets } from "../../../../drizzle/schema";
import { getDb } from "../../client";
import type { Asset, AssetUpdate } from "../types";
import { getAssetById } from "../queries";

export async function updateAssetById(
  id: string,
  updates: AssetUpdate,
): Promise<Asset | undefined> {
  const { id: _id, createdAt: _createdAt, ...safeUpdates } = updates;
  const db = await getDb();

  await db
    .update(assets)
    .set({ ...safeUpdates, updatedAt: Date.now() })
    .where(eq(assets.id, id));

  return getAssetById(id);
}

