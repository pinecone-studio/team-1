import { and, inArray, like } from "drizzle-orm";

import { getDb } from "../../client";
import type { Asset } from "../types";
import { assets } from "@/schema";

export async function getAssets(
  office?: string,
  categoryIds?: string[],
  subCategoryIds?: string[],
  locationIds?: string[],
): Promise<Asset[]> {
  const db = await getDb();
  const conditions = [];
  if (office) {
    conditions.push(like(assets.locationId, `%${office}%`));
  }
  if (locationIds && locationIds.length > 0) {
    conditions.push(inArray(assets.locationId, locationIds));
  }
  if (categoryIds && categoryIds.length > 0) {
    conditions.push(inArray(assets.mainCategoryId, categoryIds));
  }
  if (subCategoryIds && subCategoryIds.length > 0) {
    conditions.push(inArray(assets.categoryId, subCategoryIds));
  }
  if (conditions.length === 0) {
    return db.select().from(assets).all();
  }
  return db
    .select()
    .from(assets)
    .where(and(...conditions))
    .all();
}
