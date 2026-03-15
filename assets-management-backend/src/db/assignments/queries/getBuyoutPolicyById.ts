import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assignmentBuyoutPolicies } from "@/schema";

export async function getBuyoutPolicyById(id: string) {
  const db = await getDb();
  return db
    .select()
    .from(assignmentBuyoutPolicies)
    .where(eq(assignmentBuyoutPolicies.id, id))
    .get();
}
