import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assignments } from "@/schema";

export async function updateAssignmentStatus(
  assignmentId: string,
  status: string,
) {
  const db = await getDb();
  const now = Date.now();
  await db
    .update(assignments)
    .set({ status, updatedAt: now })
    .where(eq(assignments.id, assignmentId));
  return db
    .select()
    .from(assignments)
    .where(eq(assignments.id, assignmentId))
    .get();
}
