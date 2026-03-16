import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import { getDisposalRequest } from "../queries";
import { disposalRequests } from "@/schema";
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

  const updates =
    stage === "IT_APPROVED"
      ? {
          status: "IT_APPROVED",
          itApprovedBy: approvedBy,
          itApprovedAt: now,
          updatedAt: now,
        }
      : {
          status: "FINANCE_APPROVED",
          financeApprovedBy: approvedBy,
          financeApprovedAt: now,
          updatedAt: now,
        };

  await db
    .update(disposalRequests)
    .set(updates)
    .where(eq(disposalRequests.id, id));

  await writeAuditLog(
    "disposal_requests",
    id,
    stage === "IT_APPROVED"
      ? "DISPOSAL_IT_APPROVED"
      : "DISPOSAL_FINANCE_APPROVED",
    approvedBy,
    { status: req.status },
    { status: stage },
  );

  if (stage === "IT_APPROVED") {
    await createNotification({
      role: "FINANCE",
      title: "Disposal Pending Finance Approval",
      message: `Disposal request for ${req.id} has been approved by IT and awaits your sign-off.`,
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
  }

  const updated = await getDisposalRequest(id);

  if (!updated) throw new Error("Failed to update disposal request");
  return updated;
}
