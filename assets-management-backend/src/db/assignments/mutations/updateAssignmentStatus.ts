import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { getAssetById } from "../../assets/queries";
import { writeAuditLog } from "../../auditLogger";
import { assignments, assets } from "@/schema";

export async function updateAssignmentStatus(
  assignmentId: string,
  status: string,
) {
  const db = await getDb();
  const now = Date.now();
  const row = await db
    .select({ assetId: assignments.assetId, employeeId: assignments.employeeId })
    .from(assignments)
    .where(eq(assignments.id, assignmentId))
    .get();
  if (row?.assetId) {
    const assetBefore = await getAssetById(row.assetId);
    if (status === "ACTIVE") {
      await db
        .update(assets)
        .set({ status: "ASSIGNED", updatedAt: now })
        .where(eq(assets.id, row.assetId));
      if (assetBefore && row.employeeId) {
        await writeAuditLog(
          "assets",
          row.assetId,
          "ASSIGNMENT_ACCEPTED",
          row.employeeId,
          { status: assetBefore.status },
          { status: "ASSIGNED", employeeId: row.employeeId },
        );
      }
    } else if (status === "REJECTED") {
      await db
        .update(assets)
        .set({ status: "AVAILABLE", updatedAt: now })
        .where(eq(assets.id, row.assetId));
      if (assetBefore && row.employeeId) {
        await writeAuditLog(
          "assets",
          row.assetId,
          "ASSIGNMENT_REJECTED",
          row.employeeId,
          { status: assetBefore.status },
          { status: "AVAILABLE" },
        );
      }
    }
  }
  await db
    .update(assignments)
    .set({ status, updatedAt: now })
    .where(eq(assignments.id, assignmentId));
  return db
    .select()
    .from(assignments)
    .where(eq(assignments.id, assignmentId))
    .get();
}
