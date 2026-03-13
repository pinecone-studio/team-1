import { and, desc, eq } from "drizzle-orm";
import { purchaseRequests } from "../../drizzle/schema";
import { getDb } from "./client";

export type PurchaseRequestStatus = "PENDING" | "APPROVED" | "DECLINED";

export type PurchaseRequestCreate = {
  assetTag: string;
  category: string;
  serialNumber: string;
  purchaseCost?: number;
  purchaseDate?: number;
  requesterEmployeeId: string;
  requesterEmail: string;
  token: string;
  expiresAt?: number;
};

export async function createPurchaseRequest(input: PurchaseRequestCreate) {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();

  await db.insert(purchaseRequests).values({
    id,
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
  });

  return getPurchaseRequestById(id);
}

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

  return getPurchaseRequestsByToken(inputs[0].token);
}

export async function getPurchaseRequests(status?: PurchaseRequestStatus) {
  const db = await getDb();
  if (!status) {
    return db.select().from(purchaseRequests).orderBy(desc(purchaseRequests.createdAt)).all();
  }
  return db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.status, status))
    .orderBy(desc(purchaseRequests.createdAt))
    .all();
}

export async function getPurchaseRequestById(id: string) {
  const db = await getDb();
  return db.select().from(purchaseRequests).where(eq(purchaseRequests.id, id)).get();
}

export async function getPurchaseRequestByToken(token: string) {
  const db = await getDb();
  return db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.token, token))
    .get();
}

export async function getPurchaseRequestsByToken(token: string) {
  const db = await getDb();
  return db
    .select()
    .from(purchaseRequests)
    .where(eq(purchaseRequests.token, token))
    .all();
}

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
    .where(and(eq(purchaseRequests.token, token), eq(purchaseRequests.status, "PENDING")));

  return getPurchaseRequestsByToken(token);
}
