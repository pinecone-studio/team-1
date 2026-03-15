import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { purchaseRequests } from "@/schema";

export async function adminOverridePurchase(
  token: string,
  status: string,
  adminId: string,
) {
  const db = await getDb();
  const now = Date.now();

  const requests = await db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.token, token))
    .all();
  if (!requests.length) throw new Error("Purchase request(s) not found");

  await db
    .update(purchaseRequests)
    .set({
      status: status as any,
      updatedAt: now,
      decidedAt: now,
      decidedBy: adminId,
    })
    .where(eq(purchaseRequests.token, token))
    .execute();

  for (const req of requests) {
    await writeAuditLog(
      "purchase_requests",
      req.id,
      "ADMIN_OVERRIDE",
      adminId,
      { status: req.status },
      { status: status, reason: "Manual Super Admin override" },
    );
  }

  return db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.token, token))
    .all();
}
