import { and, eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assignments } from "@/schema";

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
        )
      : eq(assignments.employeeId, employeeId);
  return db.select().from(assignments).where(conditions).all();
}
