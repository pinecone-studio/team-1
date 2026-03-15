import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { offboardingEvents } from "@/schema";

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
