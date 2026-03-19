import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { censusEvents } from "@/schema";

export async function closeCensus(censusId: string, _closedBy: string) {
  const db = await getDb();
  const now = Date.now();

  await db
    .update(censusEvents)
    .set({
      closedAt: now,
      updatedAt: now,
    })
    .where(eq(censusEvents.id, censusId));

  return true;
}

