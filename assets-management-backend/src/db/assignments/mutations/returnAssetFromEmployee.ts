import { and, desc, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { getAssetById } from "../../assets/queries";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import { assets, assignments } from "@/schema";

export async function returnAssetFromEmployee(
  assetId: string,
  conditionAtReturn = "OK",
) {
  const db = await getDb();
  const now = Date.now();

  const openAssignment = await db
    .select({ id: assignments.id, employeeId: assignments.employeeId })
    .from(assignments)
    .where(
      and(eq(assignments.assetId, assetId), isNull(assignments.returnedAt)),
    )
    .orderBy(desc(assignments.assignedAt))
    .get();

  const assetBefore = await getAssetById(assetId);

  if (openAssignment?.id) {
    await db
      .update(assignments)
      .set({
        returnedAt: now,
        conditionAtReturn,
        status: "RETURNED",
        updatedAt: now,
      })
      .where(eq(assignments.id, openAssignment.id));
  }

  await db
    .update(assets)
    .set({ status: "AVAILABLE", updatedAt: now })
    .where(eq(assets.id, assetId));

  if (assetBefore && openAssignment?.employeeId) {
    await writeAuditLog(
      "assets",
      assetId,
      "ASSET_RETURNED",
      openAssignment.employeeId,
      { status: assetBefore.status },
      { status: "AVAILABLE" },
    );
  }

  const asset = await getAssetById(assetId);
  if (asset) {
    await createNotification({
      role: "IT_ADMIN",
      title: "Asset Returned",
      message: `Asset ${asset.assetTag} has been returned and is now AVAILABLE.`,
      type: "INFO",
      link: `/assets/${assetId}`,
    });
  }

  return asset;
}
