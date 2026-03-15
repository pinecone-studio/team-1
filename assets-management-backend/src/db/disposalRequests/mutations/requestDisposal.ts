import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import { getDisposalRequest } from "../queries";
import { assets, disposalRequests } from "@/schema";
import type { DisposalRequest } from "../types";

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
