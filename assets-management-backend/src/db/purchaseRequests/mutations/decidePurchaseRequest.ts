import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { getPurchaseRequestById } from "../queries";
import { purchaseRequests } from "@/schema";
import type { PurchaseRequestStatus } from "../types";

export async function decidePurchaseRequest(
  id: string,
  status: PurchaseRequestStatus,
  decidedBy?: string,
) {
  const db = await getDb();
  const now = Date.now();

  await db
    .update(purchaseRequests)
    .set({
      status,
      decidedAt: now,
      decidedBy,
      updatedAt: now,
    })
    .where(eq(purchaseRequests.id, id));

  return getPurchaseRequestById(id);
}
