import { and, inArray, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { assets } from "@/schema";

export async function getAssetsByIds(ids: string[]) {
  if (ids.length === 0) return [];
  const db = await getDb();
  return db
    .select()
    .from(assets)
    .where(and(inArray(assets.id, ids), isNull(assets.deletedAt)))
    .all();
}
