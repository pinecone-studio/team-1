import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../client";
import { offboardingEvents } from "@/schema";
import type { OffboardingEvent } from "../types";

export async function getOffboardingEventByEmployee(
  employeeId: string,
): Promise<OffboardingEvent | undefined> {
  const db = await getDb();
  const active = await db
    .select()
    .from(offboardingEvents)
    .where(
      and(
        eq(offboardingEvents.employeeId, employeeId),
        eq(offboardingEvents.status, "IN_PROGRESS"),
      ),
    )
    .orderBy(desc(offboardingEvents.updatedAt))
    .get();

  if (active) return active;

  return db
    .select()
    .from(offboardingEvents)
    .where(eq(offboardingEvents.employeeId, employeeId))
    .orderBy(desc(offboardingEvents.updatedAt))
    .get();
}
