import { and, eq, inArray, like, or, sql, desc, asc, gte, lte, isNull } from "drizzle-orm";

import { getDb } from "../../client";
import { assets, assignments } from "@/schema";

export interface AssetSearchFilter {
  status?: string;
  categoryId?: string;
  locationId?: string;
  employeeId?: string;
  searchText?: string;
  startDate?: number;
  endDate?: number;
}

export interface PaginationInput {
  limit?: number;
  offset?: number;
}

export interface SortInput {
  field: "createdAt" | "purchaseDate" | "assetTag";
  direction: "ASC" | "DESC";
}

export async function searchAssetsDB(
  filter: AssetSearchFilter,
  pagination?: PaginationInput,
  sort?: SortInput,
) {
  const db = await getDb();
  const conditions = [];
  conditions.push(isNull(assets.deletedAt));

  if (filter.status) {
    conditions.push(eq(assets.status, filter.status));
  }
  if (filter.categoryId) {
    conditions.push(eq(assets.categoryId, filter.categoryId));
  }
  if (filter.locationId) {
    conditions.push(eq(assets.locationId, filter.locationId));
  }
  if (filter.employeeId) {
    const assignedRows = await db
      .select({ assetId: assignments.assetId })
      .from(assignments)
      .where(
        and(
          eq(assignments.employeeId, filter.employeeId),
          isNull(assignments.returnedAt),
        ),
      )
      .all();
    const assignedAssetIds = assignedRows.map((r) => r.assetId);
    if (assignedAssetIds.length > 0) {
      conditions.push(inArray(assets.id, assignedAssetIds));
    } else {
      conditions.push(eq(assets.id, "")); // no assets match
    }
  }
  if (filter.startDate) {
    conditions.push(gte(assets.purchaseDate, filter.startDate));
  }
  if (filter.endDate) {
    conditions.push(lte(assets.purchaseDate, filter.endDate));
  }
  if (filter.searchText) {
    const search = `%${filter.searchText}%`;
    conditions.push(
      or(like(assets.assetTag, search), like(assets.serialNumber, search)),
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Total count for pagination
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(assets)
    .where(whereClause)
    .get();

  const total = totalResult?.count ?? 0;

  // Build query
  let query: any = db.select().from(assets).where(whereClause);

  // Sorting
  if (sort) {
    const orderFn = sort.direction === "DESC" ? desc : asc;
    const column = assets[sort.field as keyof typeof assets];
    if (column && "getSQL" in (column as any)) {
      query = query.orderBy(orderFn(column as any));
    }
  } else {
    query = query.orderBy(desc(assets.createdAt));
  }

  // Pagination (cap limit to avoid D1/response size issues; max 100 per request)
  const limit = pagination?.limit != null ? Math.min(100, Math.max(1, pagination.limit)) : 50;
  const offset = pagination?.offset != null ? Math.max(0, pagination.offset) : 0;
  query = query.limit(limit).offset(offset);

  const items = await query.all();

  return {
    total,
    items,
  };
}
