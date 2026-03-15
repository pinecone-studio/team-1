import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { offboardingEvents } from "@/schema";
import type { OffboardingEvent } from "../types";

export async function getOffboardingEvent(
  id: string,
): Promise<OffboardingEvent | undefined> {
  const db = await getDb();
  return db
    .select()
    .from(offboardingEvents)
    .where(eq(offboardingEvents.id, id))
    .get();
}
