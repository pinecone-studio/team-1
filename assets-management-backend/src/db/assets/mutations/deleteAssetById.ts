import { and, eq, isNull } from "drizzle-orm";

import { getDb } from "../../client";
import { assets } from "@/schema";

export async function deleteAssetById(id: string): Promise<boolean> {
  const db = await getDb();
  const existing = await db
    .select({ id: assets.id })
    .from(assets)
    .where(and(eq(assets.id, id), isNull(assets.deletedAt)))
    .get();

  if (!existing) return false;

  await db
    .update(assets)
    .set({ deletedAt: Date.now(), updatedAt: Date.now() })
    .where(eq(assets.id, id));
  return true;
}
