import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assignmentPayments } from "@/schema";

export async function getPaymentsByFinancing(financingId: string) {
  const db = await getDb();
  return db
    .select()
    .from(assignmentPayments)
    .where(eq(assignmentPayments.financingId, financingId))
    .all();
}
