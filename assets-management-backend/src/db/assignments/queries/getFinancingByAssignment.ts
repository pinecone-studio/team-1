import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assignmentFinancing } from "@/schema";

export async function getFinancingByAssignment(assignmentId: string) {
  const db = await getDb();
  return db
    .select()
    .from(assignmentFinancing)
    .where(eq(assignmentFinancing.assignmentId, assignmentId))
    .get();
}
