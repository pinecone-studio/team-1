import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { purchaseRequests } from "@/schema";

export async function getPurchaseRequestsByToken(token: string) {
  const db = await getDb();
  return db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.token, token))
    .all();
}
