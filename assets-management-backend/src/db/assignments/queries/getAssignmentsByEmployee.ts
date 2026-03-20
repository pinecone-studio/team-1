import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { assignments, assets } from "@/schema";

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
          isNull(assets.deletedAt),
        )
      : and(eq(assignments.employeeId, employeeId), isNull(assets.deletedAt));

  return db
    .select()
    .from(assignments)
    .innerJoin(assets, (a) => a.id.eq(assignments.assetId))
    .where(conditions)
    .all()
    .map((row) => row.assignments);
}
