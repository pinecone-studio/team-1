import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { getDisposalRequest } from "../queries";
import {
  assets,
  disposalRecords,
  disposalRequests,
} from "@/schema";
import type { DisposalRequest } from "../types";

export async function completeDisposal(
  id: string,
  certifiedBy: string,
  writeOffValue?: number,
  recipient?: string,
): Promise<DisposalRequest> {
  const db = await getDb();
  const now = Date.now();

  const req = await getDisposalRequest(id);
  if (!req) throw new Error(`Disposal request ${id} not found`);
  if (req.status !== "FINANCE_APPROVED") {
    throw new Error(
      `Cannot complete disposal — current status is ${req.status}. Finance approval is required.`,
    );
  }

  await db.insert(disposalRecords).values({
    id: crypto.randomUUID(),
    assetId: req.assetId,
    method: req.method,
    writeOffValue: writeOffValue ?? null,
    certifiedBy,
    disposedAt: now,
    certR2Key: req.dataWipeCertKey ?? null,
    recipient: recipient ?? null,
    createdAt: now,
  });

  await db
    .update(disposalRequests)
    .set({ status: "COMPLETED", updatedAt: now })
    .where(eq(disposalRequests.id, id));

  const asset = await db
    .select()
    .from(assets)
    .where(eq(assets.id, req.assetId))
    .get();
  await db
    .update(assets)
    .set({ status: "DISPOSED", updatedAt: now })
    .where(eq(assets.id, req.assetId));

  await writeAuditLog(
    "assets",
    req.assetId,
    "ASSET_DISPOSED",
    certifiedBy,
    { status: asset?.status },
    { status: "DISPOSED", method: req.method, writeOffValue, recipient },
  );

  const updated = await getDisposalRequest(id);
  if (!updated) throw new Error("Failed to update disposal request");
  return updated;
}
