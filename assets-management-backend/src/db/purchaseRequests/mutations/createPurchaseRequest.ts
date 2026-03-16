import { getDb } from "../../client";
import { ensureCategoryId } from "../../assets/mutations";
import { getPurchaseRequestById } from "../queries";
import { purchaseRequests } from "@/schema";
import type { PurchaseRequestCreate } from "../types";

export async function createPurchaseRequest(input: PurchaseRequestCreate) {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();
  const categoryId = await ensureCategoryId(input.category, undefined);

  await db.insert(purchaseRequests).values({
    id,
    assetTag: input.assetTag,
    categoryId,
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
  });

  return getPurchaseRequestById(id);
}
