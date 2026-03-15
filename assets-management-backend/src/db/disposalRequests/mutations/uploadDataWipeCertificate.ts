import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { getDisposalRequest } from "../queries";
import { assetFiles, disposalRequests } from "@/schema";
import type { DisposalRequest } from "../types";

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
