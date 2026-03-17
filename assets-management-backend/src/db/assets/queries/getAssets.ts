import { and, desc, inArray, like } from "drizzle-orm";

import type { Asset } from "../types";
import { assets } from "@/schema";
import type { GraphQLContext } from "@/graphql-gql/context";

export async function getAssets(
  ctx: GraphQLContext,
  office?: string,
  categoryIds?: string[],
  subCategoryIds?: string[],
  locationIds?: string[],
  limit = 50,
  offset = 0,
): Promise<Asset[]> {
  const db = ctx.db;
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
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(assets)
    .where(whereClause)
    .orderBy(desc(assets.createdAt))
    .limit(limit)
    .offset(offset)
    .all();
}
