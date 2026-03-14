import { and, desc, eq, isNull } from "drizzle-orm";

import { getDb } from "./client";
import { getAssetById } from "./assets/queries";
import { createNotification } from "./notifications";
import {
  assets,
  assignmentBuyoutPolicies,
  assignmentFinancing,
  assignmentPayments,
  assignments,
  transfers,
} from "@/schema";

export async function getAssignments() {
  const db = await getDb();
  return db.select().from(assignments).all();
}

export async function getAssignmentsByEmployee(employeeId: string) {
  const db = await getDb();
  return db
    .select()
    .from(assignments)
    .where(eq(assignments.employeeId, employeeId))
    .all();
}

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
    status: "ACTIVE",
    accessoriesJson,
    buyoutPolicyId,
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
    .set({ assignedTo: employeeId, status: "ASSIGNED", updatedAt: now })
    .where(eq(assets.id, assetId));

  const asset = await getAssetById(assetId);
  if (asset) {
    await createNotification({
      employeeId,
      title: "New Asset Assigned",
      message: `A new asset ${asset.assetTag} (${asset.serialNumber}) has been assigned to you.`,
      type: "INFO",
      link: `/my-assets/${assetId}`,
    });
  }

  return asset;
}

export async function getFinancingByAssignment(assignmentId: string) {
  const db = await getDb();
  return db
    .select()
    .from(assignmentFinancing)
    .where(eq(assignmentFinancing.assignmentId, assignmentId))
    .get();
}

export async function getPaymentsByFinancing(financingId: string) {
  const db = await getDb();
  return db
    .select()
    .from(assignmentPayments)
    .where(eq(assignmentPayments.financingId, financingId))
    .all();
}

export async function getBuyoutPolicyById(id: string) {
  const db = await getDb();
  return db
    .select()
    .from(assignmentBuyoutPolicies)
    .where(eq(assignmentBuyoutPolicies.id, id))
    .get();
}

export async function returnAssetFromEmployee(
  assetId: string,
  conditionAtReturn = "OK",
) {
  const db = await getDb();
  const now = Date.now();

  const openAssignment = await db
    .select({ id: assignments.id })
    .from(assignments)
    .where(
      and(eq(assignments.assetId, assetId), isNull(assignments.returnedAt)),
    )
    .orderBy(desc(assignments.assignedAt))
    .get();

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
    .set({ assignedTo: null, status: "AVAILABLE", updatedAt: now })
    .where(eq(assets.id, assetId));

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

export async function transferAsset(
  assetId: string,
  fromEmployeeId: string,
  toEmployeeId: string,
  reason?: string,
  conditionNoted = "GOOD",
) {
  const db = await getDb();
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

  await db
    .update(assets)
    .set({ assignedTo: toEmployeeId, status: "ASSIGNED", updatedAt: now })
    .where(eq(assets.id, assetId));

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
