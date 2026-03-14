import { eq, and } from "drizzle-orm";

import { getDb } from "./client";
import { writeAuditLog } from "./auditLogger";
import {
  disposalRequests,
  offboardingEvents,
  purchaseRequests,
} from "@/schema";

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

export async function adminOverrideOffboarding(
  id: string,
  status: string,
  adminId: string,
) {
  const db = await getDb();
  const now = Date.now();

  const event = await db
    .select()
    .from(offboardingEvents)
    .where(eq(offboardingEvents.id, id))
    .get();
  if (!event) throw new Error("Offboarding event not found");

  await db
    .update(offboardingEvents)
    .set({
      status: status as any,
      updatedAt: now,
      ...(status === "COMPLETED" ? { completedAt: now } : {}),
    })
    .where(eq(offboardingEvents.id, id))
    .execute();

  await writeAuditLog(
    "offboarding_events",
    id,
    "ADMIN_OVERRIDE",
    adminId,
    { status: event.status },
    { status: status, reason: "Manual Super Admin override" },
  );

  return db
    .select()
    .from(offboardingEvents)
    .where(eq(offboardingEvents.id, id))
    .get();
}
