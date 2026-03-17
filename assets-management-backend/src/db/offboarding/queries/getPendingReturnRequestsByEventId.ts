import { and, eq } from "drizzle-orm";
import { getDb } from "../../client";
import { offboardingReturnRequests } from "@/schema";

export async function getPendingReturnRequestsByEventId(
  offboardingEventId: string,
) {
  const db = await getDb();
  return db
    .select()
    .from(offboardingReturnRequests)
    .where(
      and(
        eq(offboardingReturnRequests.offboardingEventId, offboardingEventId),
        eq(offboardingReturnRequests.status, "PENDING_HR"),
      ),
    )
    .all();
}
