import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { getAssetById } from "../../assets/queries";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import { assets, assignments, employees, transfers } from "@/schema";

export async function transferAsset(
  assetId: string,
  fromEmployeeId: string,
  toEmployeeId: string,
  reason?: string,
  conditionNoted = "GOOD",
) {
  const db = await getDb();

  const toEmployee = await db
    .select({ status: employees.status })
    .from(employees)
    .where(eq(employees.id, toEmployeeId))
    .get();

  if (!toEmployee) {
    throw new Error(`Employee ${toEmployeeId} not found`);
  }
  if (toEmployee.status === "TERMINATED") {
    throw new Error(
      "Cannot transfer asset to a terminated employee. Ажлаас гарсан ажилтанд шилжүүлэх боломжгүй.",
    );
  }
  if (toEmployee.status === "OFFBOARDING") {
    throw new Error(
      "Cannot transfer asset to an employee in offboarding. Гарах процесс хийж буй ажилтанд шилжүүлэх боломжгүй.",
    );
  }

  const now = Date.now();

  const transferId = crypto.randomUUID();
  await db.insert(transfers).values({
    id: transferId,
    assetId,
    fromEmployeeId,
    toEmployeeId,
    reason: reason ?? null,
    transferredAt: now,
    conditionNoted,
    createdAt: now,
  });

  const openAssignment = await db
    .select({ id: assignments.id })
    .from(assignments)
    .where(
      and(eq(assignments.assetId, assetId), isNull(assignments.returnedAt)),
    )
    .get();

  if (openAssignment) {
    await db
      .update(assignments)
      .set({
        returnedAt: now,
        conditionAtReturn: conditionNoted,
        status: "RETURNED",
        updatedAt: now,
      })
      .where(eq(assignments.id, openAssignment.id));
  }

  await db.insert(assignments).values({
    id: crypto.randomUUID(),
    assetId,
    employeeId: toEmployeeId,
    assignedAt: now,
    conditionAtAssign: conditionNoted,
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
  });

  const assetBefore = await getAssetById(assetId);
  await db
    .update(assets)
    .set({ status: "ASSIGNED", updatedAt: now })
    .where(eq(assets.id, assetId));

  if (assetBefore) {
    await writeAuditLog(
      "assets",
      assetId,
      "TRANSFERRED",
      fromEmployeeId,
      { status: assetBefore.status, assignedTo: fromEmployeeId },
      { status: "ASSIGNED", fromEmployeeId, toEmployeeId, reason },
    );
  }

  const asset = await getAssetById(assetId);
  if (asset) {
    await createNotification({
      employeeId: toEmployeeId,
      title: "Asset Transferred to You",
      message: `Asset ${asset.assetTag} has been transferred to you from ${fromEmployeeId}.`,
      type: "INFO",
      link: `/my-assets/${assetId}`,
    });
    await createNotification({
      employeeId: fromEmployeeId,
      title: "Asset Transfer Complete",
      message: `Asset ${asset.assetTag} has been successfully transferred to ${toEmployeeId}.`,
      type: "INFO",
      link: `/history/${assetId}`,
    });
  }

  return db.select().from(transfers).where(eq(transfers.id, transferId)).get();
}
