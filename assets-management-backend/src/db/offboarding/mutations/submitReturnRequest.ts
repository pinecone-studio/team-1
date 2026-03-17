import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import {
  assignments,
  offboardingEvents,
  offboardingReturnRequests,
} from "@/schema";

export type OffboardingReturnRequestRow =
  typeof offboardingReturnRequests.$inferSelect;

export async function submitReturnRequest(
  assetId: string,
  employeeId: string,
  condition: string,
  options?: { conditionDetail?: string | null; photoR2Key?: string | null },
): Promise<OffboardingReturnRequestRow> {
  const db = await getDb();
  const now = Date.now();
  const conditionDisplay =
    condition + (options?.conditionDetail?.trim() ? `: ${options.conditionDetail.trim()}` : "");

  const openAssignment = await db
    .select()
    .from(assignments)
    .where(
      and(
        eq(assignments.assetId, assetId),
        eq(assignments.employeeId, employeeId),
        isNull(assignments.returnedAt),
      ),
    )
    .get();

  if (!openAssignment)
    throw new Error("No active assignment found for this asset and employee");

  const event = await db
    .select()
    .from(offboardingEvents)
    .where(
      and(
        eq(offboardingEvents.employeeId, employeeId),
        eq(offboardingEvents.status, "IN_PROGRESS"),
      ),
    )
    .get();

  if (!event) throw new Error("No active offboarding event for this employee");

  const assetIds = JSON.parse(event.assetIdsJson || "[]") as string[];
  if (!assetIds.includes(assetId))
    throw new Error("Asset is not part of this offboarding");

  const existing = await db
    .select()
    .from(offboardingReturnRequests)
    .where(
      and(
        eq(offboardingReturnRequests.offboardingEventId, event.id),
        eq(offboardingReturnRequests.assetId, assetId),
        eq(offboardingReturnRequests.status, "PENDING_HR"),
      ),
    )
    .get();

  if (existing) return existing;

  const id = crypto.randomUUID();
  await db.insert(offboardingReturnRequests).values({
    id,
    offboardingEventId: event.id,
    assetId,
    assignmentId: openAssignment.id,
    employeeId,
    conditionEmployee: conditionDisplay,
    status: "PENDING_HR",
    photoR2Key: options?.photoR2Key?.trim() || null,
    createdAt: now,
    updatedAt: now,
  });

  const row = await db
    .select()
    .from(offboardingReturnRequests)
    .where(eq(offboardingReturnRequests.id, id))
    .get();
  if (!row) throw new Error("Failed to create return request");
  return row;
}
