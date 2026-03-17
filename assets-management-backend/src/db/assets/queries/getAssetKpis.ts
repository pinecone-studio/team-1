import { and, eq, inArray, like, sql } from "drizzle-orm";

import { getDb } from "../../client";
import { assets, assignments } from "@/schema";

export type AssetKpis = {
  totalCount: number;
  totalValue: number;
  assignedCount: number;
  assignedValue: number;
  unassignedCount: number;
  unassignedValue: number;
  forSaleCount: number;
  forSaleValue: number;
  brokenCount: number;
  brokenValue: number;
};

/**
 * Dashboard KPI aggregates.
 *
 * NOTE:
 * - "assigned" is defined as: there exists an assignment with returnedAt IS NULL.
 *   This mirrors the GraphQL `assignedTo` resolver behavior.
 * - value uses purchaseCost as DB source (currentBookValue is not a DB column here).
 */
export async function getAssetKpis(office?: string): Promise<AssetKpis> {
  const db = await getDb();

  const baseConditions = [];
  if (office?.trim()) {
    baseConditions.push(like(assets.locationId, `%${office.trim()}%`));
  }

  const whereClause =
    baseConditions.length > 0 ? and(...baseConditions) : undefined;

  const hasActiveAssignment = sql<number>`exists(
    select 1 from ${assignments}
    where ${assignments.assetId} = ${assets.id}
      and ${assignments.returnedAt} is null
  )`;

  const valueExpr = sql<number>`coalesce(${assets.purchaseCost}, 0)`;

  const row = await db
    .select({
      totalCount: sql<number>`count(*)`,
      totalValue: sql<number>`sum(${valueExpr})`,

      assignedCount: sql<number>`sum(case when ${hasActiveAssignment} then 1 else 0 end)`,
      assignedValue: sql<number>`sum(case when ${hasActiveAssignment} then ${valueExpr} else 0 end)`,

      unassignedCount: sql<number>`sum(case when not ${hasActiveAssignment} then 1 else 0 end)`,
      unassignedValue: sql<number>`sum(case when not ${hasActiveAssignment} then ${valueExpr} else 0 end)`,

      forSaleCount: sql<number>`sum(case when ${assets.status} = ${"FOR_SALE"} then 1 else 0 end)`,
      forSaleValue: sql<number>`sum(case when ${assets.status} = ${"FOR_SALE"} then ${valueExpr} else 0 end)`,

      brokenCount: sql<number>`sum(case when ${assets.status} in (${sql.join(["IN_REPAIR", "DAMAGED"].map((s) => sql`${s}`), sql`, `)}) then 1 else 0 end)`,
      brokenValue: sql<number>`sum(case when ${assets.status} in (${sql.join(["IN_REPAIR", "DAMAGED"].map((s) => sql`${s}`), sql`, `)}) then ${valueExpr} else 0 end)`,
    })
    .from(assets)
    .where(whereClause)
    .get();

  return {
    totalCount: Number(row?.totalCount ?? 0),
    totalValue: Number(row?.totalValue ?? 0),
    assignedCount: Number(row?.assignedCount ?? 0),
    assignedValue: Number(row?.assignedValue ?? 0),
    unassignedCount: Number(row?.unassignedCount ?? 0),
    unassignedValue: Number(row?.unassignedValue ?? 0),
    forSaleCount: Number(row?.forSaleCount ?? 0),
    forSaleValue: Number(row?.forSaleValue ?? 0),
    brokenCount: Number(row?.brokenCount ?? 0),
    brokenValue: Number(row?.brokenValue ?? 0),
  };
}

