import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { getAssetById } from "../../assets/queries";
import {
  assets,
  assignments,
  offboardingEvents,
} from "@/schema";

export async function completeAssetReturn(
  assetId: string,
  employeeId: string,
  condition: string,
  inspectedBy: string,
) {
  const db = await getDb();
  const now = Date.now();

  const openAssignment = await db
    .select()
    .from(assignments)
    .where(
      and(eq(assignments.assetId, assetId), isNull(assignments.returnedAt)),
    )
    .get();

  if (openAssignment) {
    await db
      .update(assignments)
      .set({ returnedAt: now, conditionAtReturn: condition, updatedAt: now })
      .where(eq(assignments.id, openAssignment.id));
  }

  const badConditions = ["DAMAGED", "BROKEN", "DESTROYED", "FAULTY"];
  const nextStatus = badConditions.includes(condition.toUpperCase())
    ? "DISPOSAL_REQUESTED"
    : "AVAILABLE";

  await db
    .update(assets)
    .set({ status: nextStatus, updatedAt: now })
    .where(eq(assets.id, assetId));

  await writeAuditLog(
    "assets",
    assetId,
    "ASSET_RETURNED",
    inspectedBy,
    { status: "RETURNED" },
    { status: nextStatus, condition },
  );

  const event = await db
    .select()
    .from(offboardingEvents)
    .where(eq(offboardingEvents.employeeId, employeeId))
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
      await writeAuditLog(
        "offboarding_events",
        event.id,
        "OFFBOARDING_COMPLETED",
        inspectedBy,
        { status: "IN_PROGRESS" },
        { status: "COMPLETED" },
      );
    }
  }

  const updated = await getAssetById(assetId);
  if (!updated) throw new Error("Asset not found after return");
  return updated;
}
