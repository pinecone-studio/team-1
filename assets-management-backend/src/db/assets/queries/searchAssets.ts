import { and, eq, like, or, sql, desc, asc, gte, lte } from "drizzle-orm";

import { getDb } from "../../client";
import { assets } from "@/schema";

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
    conditions.push(eq(assets.assignedTo, filter.employeeId));
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

  // Pagination
  if (pagination) {
    if (pagination.limit) query = query.limit(pagination.limit);
    if (pagination.offset) query = query.offset(pagination.offset);
  } else {
    query = query.limit(50); // Default limit
  }

  const items = await query.all();

  return {
    total,
    items,
  };
}
