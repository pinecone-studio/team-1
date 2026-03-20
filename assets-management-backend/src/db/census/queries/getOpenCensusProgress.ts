import { desc, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { censusEvents } from "@/schema";
import { getCensusProgress } from "./getCensusProgress";

export async function getOpenCensusProgress() {
  const db = await getDb();

  const event = await db
    .select()
    .from(censusEvents)
    .where(isNull(censusEvents.closedAt))
    .orderBy(desc(censusEvents.startedAt))
    .limit(1)
    .get();

  if (!event) return null;
  return getCensusProgress(event.id);
}
