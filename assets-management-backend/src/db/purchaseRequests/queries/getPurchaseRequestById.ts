import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { purchaseRequests } from "@/schema";

export async function getPurchaseRequestById(id: string) {
  const db = await getDb();
  return db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.id, id))
    .get();
}
