import { and, eq, inArray, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { getAssetById } from "../../assets/queries";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import { assets, assignmentFinancing, assignments, employees } from "@/schema";

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

  const employee = await db
    .select({ status: employees.status })
    .from(employees)
    .where(eq(employees.id, employeeId))
    .get();

  if (!employee) {
    throw new Error(`Employee ${employeeId} not found`);
  }
  if (employee.status === "TERMINATED") {
    throw new Error(
      "Cannot assign asset to a terminated employee. Ажлаас гарсан ажилтанд хөрөнгө оноох боломжгүй.",
    );
  }
  if (employee.status === "OFFBOARDING") {
    throw new Error(
      "Cannot assign asset to an employee in offboarding. Гарах процесс хийж буй ажилтанд хөрөнгө оноох боломжгүй.",
    );
  }

  const now = Date.now();
  const assignmentId = crypto.randomUUID();

  // Prevent duplicate / concurrent assignments for same asset.
  // We consider an assignment "open" when returnedAt IS NULL and status is not terminal.
  const openAssignment = await db
    .select({ id: assignments.id, status: assignments.status })
    .from(assignments)
    .where(
      and(
        eq(assignments.assetId, assetId),
        isNull(assignments.returnedAt),
        inArray(assignments.status, ["ASSIGN_REQUESTED", "PENDING", "ACTIVE"]),
      ),
    )
    .limit(1)
    .get();
  if (openAssignment) {
    throw new Error(
      "Asset already has an active/pending assignment. Энэ хөрөнгө дээр идэвхтэй/хүлээгдэж буй assignment байна.",
    );
  }

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
