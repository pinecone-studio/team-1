import { eq, or } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { getAssetById } from "../../assets/queries";
import {
  assets,
  assignments,
  employees,
  offboardingEvents,
  offboardingReturnRequests,
} from "@/schema";

export async function requestRepair(
  returnRequestId: string,
  conditionHr: string,
  inspectedBy: string,
  photoR2Key?: string | null,
) {
  const db = await getDb();
  const now = Date.now();

  const inspector =
    (await db
      .select({ id: employees.id })
      .from(employees)
      .where(
        or(
          eq(employees.id, inspectedBy),
          eq(employees.entraId, inspectedBy),
          eq(employees.email, inspectedBy),
        ),
      )
      .limit(1)
      .get()) ?? null;
  const actorId = inspector?.id ?? inspectedBy;

  const req = await db
    .select()
    .from(offboardingReturnRequests)
    .where(eq(offboardingReturnRequests.id, returnRequestId))
    .get();

  if (!req) throw new Error("Return request not found");
  if (req.status !== "PENDING_HR")
    throw new Error("Return request is not pending HR approval");

  await db
    .update(assignments)
    .set({
      returnedAt: now,
      conditionAtReturn: conditionHr,
      status: "RETURNED",
      updatedAt: now,
    })
    .where(eq(assignments.id, req.assignmentId));

  await db
    .update(assets)
    .set({ status: "REPAIR_REQUESTED", updatedAt: now })
    .where(eq(assets.id, req.assetId));

  await writeAuditLog(
    "assets",
    req.assetId,
    "REPAIR_REQUESTED",
    actorId,
    { status: "RETURNING" },
    { status: "REPAIR_REQUESTED", conditionHr, photoR2Key: photoR2Key ?? undefined },
  );

  await db
    .update(offboardingReturnRequests)
    .set({
      status: "REPAIR_REQUESTED",
      conditionHr,
      photoR2Key: photoR2Key ?? null,
      inspectedBy,
      updatedAt: now,
    })
    .where(eq(offboardingReturnRequests.id, returnRequestId));

  const event = await db
    .select()
    .from(offboardingEvents)
    .where(eq(offboardingEvents.id, req.offboardingEventId))
    .get();

  if (event) {
    const newReturnedCount = (event.returnedAssets ?? 0) + 1;
    const allDone = newReturnedCount >= (event.totalAssets ?? 0);

    await db
      .update(offboardingEvents)
      .set({
        returnedAssets: newReturnedCount,
        status: allDone ? "COMPLETED" : "IN_PROGRESS",
        completedAt: allDone ? now : null,
        updatedAt: now,
      })
      .where(eq(offboardingEvents.id, event.id));

    if (allDone) {
      await db
        .update(employees)
        .set({ status: "TERMINATED", updatedAt: now })
        .where(eq(employees.id, event.employeeId));

      await writeAuditLog(
        "offboarding_events",
        event.id,
        "OFFBOARDING_COMPLETED",
        actorId,
        { status: "IN_PROGRESS" },
        { status: "COMPLETED" },
      );
    }
  }

  const updated = await getAssetById(req.assetId);
  if (!updated) throw new Error("Asset not found after repair request");
  return updated;
}
