import { getDb } from "../../client";
import { createNotification } from "../../notifications";
import { getPurchaseRequestsByToken } from "../queries";
import { purchaseRequests } from "@/schema";
import type { PurchaseRequestCreate } from "../types";

export async function createPurchaseRequestsBatch(
  inputs: PurchaseRequestCreate[],
) {
  if (!inputs.length) return [];
  const db = await getDb();
  const now = Date.now();

  const rows = inputs.map((input) => ({
    id: crypto.randomUUID(),
    assetTag: input.assetTag,
    category: input.category,
    serialNumber: input.serialNumber,
    purchaseCost: input.purchaseCost,
    purchaseDate: input.purchaseDate,
    requesterEmployeeId: input.requesterEmployeeId,
    requesterEmail: input.requesterEmail,
    status: "PENDING",
    token: input.token,
    expiresAt: input.expiresAt,
    createdAt: now,
    updatedAt: now,
  }));

  await db.insert(purchaseRequests).values(rows);

  await createNotification({
    role: "FINANCE",
    title: "New Purchase Requests",
    message: `${inputs.length} new purchase requests submitted by ${inputs[0].requesterEmail}.`,
    type: "INFO",
    link: `/purchase-requests?token=${inputs[0].token}`,
  });

  return getPurchaseRequestsByToken(inputs[0].token);
}
