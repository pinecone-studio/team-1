import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { getOffboardingEvent } from "../queries";
import {
  assets,
  assignments,
  employees,
  offboardingEvents,
} from "@/schema";
import type { OffboardingEvent } from "../types";

export async function startOffboarding(
  employeeId: string,
  initiatedBy: string,
): Promise<OffboardingEvent> {
  const db = await getDb();
  const now = Date.now();

  const employee = await db
    .select()
    .from(employees)
    .where(eq(employees.id, employeeId))
    .get();
  if (!employee) throw new Error(`Employee ${employeeId} not found`);
  if (employee.status === "TERMINATED")
    throw new Error("Employee is already terminated");

  const openAssignments = await db
    .select()
    .from(assignments)
    .where(
      and(
        eq(assignments.employeeId, employeeId),
        isNull(assignments.returnedAt),
      ),
    )
    .all();

  const totalAssets = openAssignments.length;

  await db
    .update(employees)
    .set({ status: "TERMINATED", terminationDate: now, updatedAt: now })
    .where(eq(employees.id, employeeId));

  for (const a of openAssignments) {
    await db
      .update(assets)
      .set({ status: "RETURNED", updatedAt: now })
      .where(eq(assets.id, a.assetId));
  }

  const id = crypto.randomUUID();
  await db.insert(offboardingEvents).values({
    id,
    employeeId,
    initiatedBy,
    status: "IN_PROGRESS",
    totalAssets,
    returnedAssets: 0,
    createdAt: now,
    updatedAt: now,
  });

  await writeAuditLog(
    "employees",
    employeeId,
    "OFFBOARDING_STARTED",
    initiatedBy,
    { status: employee.status },
    { status: "TERMINATED", totalAssetsToReturn: totalAssets },
  );

  const created = await getOffboardingEvent(id);
  if (!created) throw new Error("Failed to create offboarding event");
  return created;
}
