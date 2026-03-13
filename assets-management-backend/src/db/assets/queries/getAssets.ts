import { and, inArray, like } from "drizzle-orm";
import { assets } from "../../../../drizzle/schema";
import { getDb } from "../../client";
import type { Asset } from "../types";

export async function getAssets(
  office?: string,
  categoryIds?: string[],
  subCategoryIds?: string[],
): Promise<Asset[]> {
  const db = await getDb();
  const conditions = [];
  if (office) {
    conditions.push(like(assets.locationId, `%${office}%`));
  }
  if (categoryIds && categoryIds.length > 0) {
    conditions.push(inArray(assets.categoryId, categoryIds));
  }
  if (subCategoryIds && subCategoryIds.length > 0) {
    conditions.push(inArray(assets.subCategoryId, subCategoryIds));
  }
  if (conditions.length === 0) {
    return db.select().from(assets).all();
  }
  return db.select().from(assets).where(and(...conditions)).all();
}
