import { and, eq, isNull } from "drizzle-orm";

import { getDb } from "../../client";
import { assets, assignments } from "@/schema";

export async function getAssignmentsByEmployee(
  employeeId: string,
  status?: string,
) {
  const db = await getDb();
  const conditions =
    status !== undefined && status !== null
      ? and(
          eq(assignments.employeeId, employeeId),
          eq(assignments.status, status),
          isNull(assignments.deletedAt),
          isNull(assets.deletedAt),
        )
      : and(
          eq(assignments.employeeId, employeeId),
          isNull(assignments.deletedAt),
          isNull(assets.deletedAt),
        );
  const rows = await db
    .select({ assignment: assignments })
    .from(assignments)
    .innerJoin(assets, eq(assets.id, assignments.assetId))
    .where(conditions)
    .all();

  return rows.map(({ assignment }) => assignment);
}
