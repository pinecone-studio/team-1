import { and, eq } from "drizzle-orm";

import { getDb } from "./client";
import { writeAuditLog } from "./auditLogger";
import { createNotification } from "./notifications";
import {
  assetFiles,
  assets,
  disposalRecords,
  disposalRequests,
} from "@/schema";

export type DisposalRequest = typeof disposalRequests.$inferSelect;

// ─── Queries ────────────────────────────────────────────────────────────────

export async function getDisposalRequest(
  id: string,
): Promise<DisposalRequest | undefined> {
  const db = await getDb();
  return db
    .select()
    .from(disposalRequests)
    .where(eq(disposalRequests.id, id))
    .get();
}

export async function getDisposalRequests(
  status?: string,
): Promise<DisposalRequest[]> {
  const db = await getDb();
  if (status) {
    return db
      .select()
      .from(disposalRequests)
      .where(eq(disposalRequests.status, status))
      .all();
  }
  return db.select().from(disposalRequests).all();
}

export async function getDisposalRequestsByAsset(
  assetId: string,
): Promise<DisposalRequest[]> {
  const db = await getDb();
  return db
    .select()
    .from(disposalRequests)
    .where(eq(disposalRequests.assetId, assetId))
    .all();
}

// ─── Mutations ──────────────────────────────────────────────────────────────

/**
 * Step 1 — Any employee or IT admin requests disposal.
 * Sets asset.status = DISPOSAL_REQUESTED.
 */
export async function requestDisposal(
  assetId: string,
  requestedBy: string,
  method: string,
  reason?: string,
): Promise<DisposalRequest> {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();

  const asset = await db
    .select()
    .from(assets)
    .where(eq(assets.id, assetId))
    .get();
  if (!asset) throw new Error(`Asset ${assetId} not found`);
  if (asset.status === "DISPOSED") throw new Error("Asset is already disposed");

  await db.insert(disposalRequests).values({
    id,
    assetId,
    requestedBy,
    method,
    reason: reason ?? null,
    status: "PENDING",
    createdAt: now,
    updatedAt: now,
  });

  await db
    .update(assets)
    .set({ status: "DISPOSAL_REQUESTED", updatedAt: now })
    .where(eq(assets.id, assetId));

  await writeAuditLog(
    "disposal_requests",
    id,
    "DISPOSAL_REQUESTED",
    requestedBy,
    { status: asset.status },
    { status: "DISPOSAL_REQUESTED", method, reason },
  );

  await createNotification({
    role: "IT_ADMIN",
    title: "New Disposal Request",
    message: `Asset ${asset.assetTag} (${asset.serialNumber}) requested for disposal by ${requestedBy}.`,
    type: "INFO",
    link: `/disposal/${id}`,
  });

  const created = await getDisposalRequest(id);

  if (!created) throw new Error("Failed to create disposal request");
  return created;
}

/**
 * Step 2 / 3 — IT Admin or Finance approves.
 * stage must be "IT_APPROVED" or "FINANCE_APPROVED".
 */
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

/**
 * Reject a disposal request at any stage.
 * Resets asset.status back to AVAILABLE.
 */
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

  await db
    .update(disposalRequests)
    .set({
      status: "REJECTED",
      rejectedBy,
      rejectedAt: now,
      rejectionReason: rejectionReason ?? null,
      updatedAt: now,
    })
    .where(eq(disposalRequests.id, id));

  // Release the asset back to circulation
  await db
    .update(assets)
    .set({ status: "AVAILABLE", updatedAt: now })
    .where(eq(assets.id, req.assetId));

  await writeAuditLog(
    "disposal_requests",
    id,
    "DISPOSAL_REJECTED",
    rejectedBy,
    { status: req.status },
    { status: "REJECTED", rejectionReason },
  );

  const updated = await getDisposalRequest(id);
  if (!updated) throw new Error("Failed to update disposal request");
  return updated;
}

/**
 * Step 2b — IT uploads the data-wipe certificate to R2, stores the key.
 * Also creates an asset_files record for full traceability.
 */
export async function uploadDataWipeCertificate(
  id: string,
  fileKey: string,
  uploadedBy: string,
): Promise<DisposalRequest> {
  const db = await getDb();
  const now = Date.now();

  const req = await getDisposalRequest(id);
  if (!req) throw new Error(`Disposal request ${id} not found`);

  await db
    .update(disposalRequests)
    .set({ dataWipeCertKey: fileKey, updatedAt: now })
    .where(eq(disposalRequests.id, id));

  // Persist in asset_files for the full file audit trail
  await db.insert(assetFiles).values({
    id: crypto.randomUUID(),
    assetId: req.assetId,
    type: "DATA_WIPE_CERTIFICATE",
    fileKey,
    uploadedBy,
    createdAt: now,
  });

  await writeAuditLog(
    "disposal_requests",
    id,
    "DATA_WIPE_CERT_UPLOADED",
    uploadedBy,
    null,
    { fileKey },
  );

  const updated = await getDisposalRequest(id);
  if (!updated) throw new Error("Failed to update disposal request");
  return updated;
}

/**
 * Step 4 (final) — Completes the disposal.
 * Creates the permanent disposal_records row and sets asset.status = DISPOSED.
 * Requires at least FINANCE_APPROVED status.
 */
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

  // Write the permanent disposal record
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

  // Finalise the request row
  await db
    .update(disposalRequests)
    .set({ status: "COMPLETED", updatedAt: now })
    .where(eq(disposalRequests.id, id));

  // Mark the asset as DISPOSED
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
