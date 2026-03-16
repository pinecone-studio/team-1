import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { getAssetById } from "../../assets/queries";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import {
  assets,
  assignmentFinancing,
  assignments,
} from "@/schema";

export async function assignAssetToEmployee(
  assetId: string,
  employeeId: string,
  conditionAtAssign = "GOOD",
  accessoriesJson?: string,
  buyoutPolicyId?: string,
  financials?: {
    assignedValue?: number;
    paymentPlanMonths?: number;
    interestRate?: number;
  },
  requestedByEmployeeId?: string,
) {
  const db = await getDb();
  const now = Date.now();
  const assignmentId = crypto.randomUUID();

  await db.insert(assignments).values({
    id: assignmentId,
    assetId,
    employeeId,
    assignedAt: now,
    conditionAtAssign,
    status: "ASSIGN_REQUESTED",
    accessoriesJson,
    buyoutPolicyId,
    requestedByEmployeeId: requestedByEmployeeId ?? null,
    createdAt: now,
    updatedAt: now,
  });

  if (financials?.assignedValue && financials?.paymentPlanMonths) {
    const interest = financials.interestRate ?? 0;
    const totalPayment = Math.round(
      financials.assignedValue * (1 + interest / 100),
    );
    const monthlyPayment = Math.round(
      totalPayment / financials.paymentPlanMonths,
    );

    await db.insert(assignmentFinancing).values({
      id: crypto.randomUUID(),
      assignmentId,
      assignedValue: financials.assignedValue,
      paymentPlanMonths: financials.paymentPlanMonths,
      interestRate: financials.interestRate?.toString(),
      monthlyPayment,
      totalPayment,
      createdAt: now,
      updatedAt: now,
    });
  }

  await db
    .update(assets)
    .set({ status: "ASSIGN_REQUESTED", updatedAt: now })
    .where(eq(assets.id, assetId));

  const asset = await getAssetById(assetId);
  if (asset) {
    await writeAuditLog(
      "assets",
      assetId,
      "ASSIGNED",
      employeeId,
      { status: asset.status },
      { status: "ASSIGN_REQUESTED", employeeId },
    );
  }

  const assetAfter = asset ?? (await getAssetById(assetId));
  if (assetAfter) {
    await createNotification({
      employeeId,
      title: "New Asset Assigned",
      message: `A new asset ${assetAfter.assetTag} (${assetAfter.serialNumber}) has been assigned to you.`,
      type: "INFO",
      link: `/my-assets/${assetId}`,
    });
  }

  return assetAfter ?? null;
}
