import { getDb } from "../../client";
import { ensureCategoryId } from "../../assets/mutations";
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

  const categoryIds = await Promise.all(
    inputs.map((input) => ensureCategoryId(input.category, undefined)),
  );

  const rows = inputs.map((input, i) => ({
    id: crypto.randomUUID(),
    assetTag: input.assetTag,
    categoryId: categoryIds[i],
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
