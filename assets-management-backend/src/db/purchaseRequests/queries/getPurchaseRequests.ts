import { desc, eq } from "drizzle-orm";
import { getDb } from "../../client";
import { purchaseRequests } from "@/schema";
import type { PurchaseRequestStatus } from "../types";

export async function getPurchaseRequests(status?: PurchaseRequestStatus) {
  const db = await getDb();
  if (!status) {
    return db
      .select()
      .from(purchaseRequests)
      .orderBy(desc(purchaseRequests.createdAt))
      .all();
  }
  return db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.status, status))
    .orderBy(desc(purchaseRequests.createdAt))
    .all();
}
