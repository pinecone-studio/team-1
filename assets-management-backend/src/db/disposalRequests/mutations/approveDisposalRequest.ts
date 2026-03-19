import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import { getDisposalRequest } from "../queries";
import { assets, assignments, disposalRequests } from "@/schema";
import type { DisposalRequest } from "../types";

export async function approveDisposalRequest(
  id: string,
  approvedBy: string,
  stage: "IT_APPROVED" | "FINANCE_APPROVED",
): Promise<DisposalRequest> {
  const db = await getDb();
  const now = Date.now();

  const req = await getDisposalRequest(id);
  if (!req) throw new Error(`Disposal request ${id} not found`);
  if (req.status === "REJECTED" || req.status === "COMPLETED") {
    throw new Error(`Cannot approve a ${req.status} disposal request`);
  }

  // Demo-friendly: allow non-employee approver labels like "FINANCE"/"IT" without
  // violating foreign key constraints (these columns reference employees.id).
  const fkApproverId =
    approvedBy === "FINANCE" || approvedBy === "IT" ? null : approvedBy;
  const auditActorId =
    approvedBy === "FINANCE" || approvedBy === "IT" ? null : approvedBy;

  const updates =
    stage === "IT_APPROVED"
      ? {
          status: "IT_APPROVED",
          itApprovedBy: fkApproverId,
          itApprovedAt: now,
          updatedAt: now,
        }
      : {
          status: "FINANCE_APPROVED",
          financeApprovedBy: fkApproverId,
          financeApprovedAt: now,
          updatedAt: now,
        };

  await db
    .update(disposalRequests)
    .set(updates)
    .where(eq(disposalRequests.id, id));

  if (req.assetId) {
    if (stage === "IT_APPROVED") {
      await db
        .update(assets)
        .set({ status: "PENDING_DISPOSAL", updatedAt: now })
        .where(eq(assets.id, req.assetId));
    }

    if (stage === "FINANCE_APPROVED") {
      await db
        .update(assets)
        .set({ status: "DISPOSED", updatedAt: now })
        .where(eq(assets.id, req.assetId));
      // Close all active assignments for this asset (asset disposed = no longer assigned).
      await db
        .update(assignments)
        .set({
          returnedAt: now,
          conditionAtReturn: "DISPOSED",
          status: "RETURNED",
          updatedAt: now,
        })
        .where(
          and(
            eq(assignments.assetId, req.assetId),
            isNull(assignments.returnedAt),
          ),
        );
    }
  }

  await writeAuditLog(
    "disposal_requests",
    id,
    stage === "IT_APPROVED"
      ? "DISPOSAL_IT_APPROVED"
      : "DISPOSAL_FINANCE_APPROVED",
    auditActorId,
    { status: req.status },
    { status: stage, approvedBy },
  );
  if (req.assetId) {
    await writeAuditLog(
      "assets",
      req.assetId,
      stage === "IT_APPROVED"
        ? "DISPOSAL_IT_APPROVED"
        : "DISPOSAL_FINANCE_APPROVED",
      auditActorId,
      { status: req.status },
      { status: stage, approvedBy },
    );
  }

  if (stage === "IT_APPROVED") {
    await createNotification({
      role: "FINANCE",
      title: "Disposal Pending Finance Approval",
      message: `Disposal request for ${req.id} has been approved by IT and awaits your sign-off.`,
      type: "INFO",
      link: `/disposal/${id}`,
    });
    await createNotification({
      employeeId: req.requestedBy,
      title: "Disposal IT Approved",
      message: `Таны устгах хүсэлт (ID: ${req.id}) IT-ээр баталгаажлаа.`,
      type: "INFO",
      link: `/disposal/${id}`,
    });
  } else if (stage === "FINANCE_APPROVED") {
    await createNotification({
      role: "IT_ADMIN",
      title: "Disposal Finance Approved",
      message: `Finance has approved the disposal of ${req.id}. Proceed with data wipe and physical disposal.`,
      type: "INFO",
      link: `/disposal/${id}`,
    });
    await createNotification({
      employeeId: req.requestedBy,
      title: "Disposal Finance Approved",
      message: `Таны устгах хүсэлт (ID: ${req.id}) Санхүүгээр баталгаажлаа.`,
      type: "INFO",
      link: `/disposal/${id}`,
    });
  }

  const updated = await getDisposalRequest(id);

  if (!updated) throw new Error("Failed to update disposal request");
  return updated;
}
