import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { getDisposalRequest } from "../queries";
import { assets, disposalRequests } from "@/schema";
import type { DisposalRequest } from "../types";

export async function rejectDisposalRequest(
  id: string,
  rejectedBy: string,
  rejectionReason?: string,
): Promise<DisposalRequest> {
  const db = await getDb();
  const now = Date.now();

  const req = await getDisposalRequest(id);
  if (!req) throw new Error(`Disposal request ${id} not found`);
  if (req.status === "COMPLETED")
    throw new Error("Cannot reject a completed disposal");

  const fkRejectedBy =
    rejectedBy === "FINANCE" || rejectedBy === "IT" ? null : rejectedBy;
  const auditActorId =
    rejectedBy === "FINANCE" || rejectedBy === "IT" ? null : rejectedBy;

  await db
    .update(disposalRequests)
    .set({
      status: "REJECTED",
      rejectedBy: fkRejectedBy,
      rejectedAt: now,
      rejectionReason: rejectionReason ?? null,
      updatedAt: now,
    })
    .where(eq(disposalRequests.id, id));

  await db
    .update(assets)
    .set({ status: "AVAILABLE", updatedAt: now })
    .where(eq(assets.id, req.assetId));

  await writeAuditLog(
    "disposal_requests",
    id,
    "DISPOSAL_REJECTED",
    auditActorId,
    { status: req.status },
    { status: "REJECTED", rejectionReason, rejectedBy },
  );
  if (req.assetId) {
    await writeAuditLog(
      "assets",
      req.assetId,
      "DISPOSAL_REJECTED",
      auditActorId,
      { status: req.status },
      { status: "REJECTED", rejectionReason, rejectedBy },
    );
  }

  const updated = await getDisposalRequest(id);
  if (!updated) throw new Error("Failed to update disposal request");
  return updated;
}
