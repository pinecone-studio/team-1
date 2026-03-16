import { and, eq } from "drizzle-orm";
import { getDb } from "../../client";
import { createNotification } from "../../notifications";
import { getPurchaseRequestsByToken } from "../queries";
import { purchaseRequests } from "@/schema";
import type { PurchaseRequestStatus } from "../types";

export async function decidePurchaseRequestsByToken(
  token: string,
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
    .where(
      and(
        eq(purchaseRequests.token, token),
        eq(purchaseRequests.status, "PENDING"),
      ),
    );

  const updatedRequests = await getPurchaseRequestsByToken(token);
  if (updatedRequests.length > 0) {
    const first = updatedRequests[0];
    await createNotification({
      employeeId: first.requesterEmployeeId,
      title: `Purchase Request ${status}`,
      message: `Your purchase request for ${first.assetTag} has been ${status.toLowerCase()} by ${decidedBy}.`,
      type: status === "APPROVED" ? "INFO" : "WARNING",
      link: "/my-requests",
    });
  }

  return updatedRequests;
}
