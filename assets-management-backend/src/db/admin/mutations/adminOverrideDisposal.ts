import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { disposalRequests } from "@/schema";

export async function adminOverrideDisposal(
  id: string,
  status: string,
  adminId: string,
) {
  const db = await getDb();
  const now = Date.now();

  const req = await db
    .select()
    .from(disposalRequests)
    .where(eq(disposalRequests.id, id))
    .get();
  if (!req) throw new Error("Disposal request not found");

  await db
    .update(disposalRequests)
    .set({ status: status as any, updatedAt: now })
    .where(eq(disposalRequests.id, id))
    .execute();

  await writeAuditLog(
    "disposal_requests",
    id,
    "ADMIN_OVERRIDE",
    adminId,
    { status: req.status },
    { status: status, reason: "Manual Super Admin override" },
  );

  return db
    .select()
    .from(disposalRequests)
    .where(eq(disposalRequests.id, id))
    .get();
}
