import { eq } from "drizzle-orm";
import { assets } from "../../drizzle/schema";
import { getDb } from "./client";
import { processAssetArchiving } from "@/app/lib/archive";

export type Asset = typeof assets.$inferSelect;
export type AssetUpdate = Partial<typeof assets.$inferInsert>;
export type AssetCreate = Pick<
  typeof assets.$inferInsert,
  "assetTag" | "category" | "serialNumber"
> &
  Partial<
    Omit<
      typeof assets.$inferInsert,
      | "id"
      | "assetTag"
      | "category"
      | "serialNumber"
      | "createdAt"
      | "updatedAt"
    >
  >;

export async function getAssets(): Promise<Asset[]> {
  const db = await getDb();
  return db.select().from(assets).all();
}

export async function getAssetById(id: string): Promise<Asset | undefined> {
  const db = await getDb();
  return db.select().from(assets).where(eq(assets.id, id)).get();
}

export async function updateAssetById(
  id: string,
  updates: AssetUpdate,
): Promise<Asset | undefined> {
  const { id: _id, createdAt: _createdAt, ...safeUpdates } = updates;
  const db = await getDb();

  await db
    .update(assets)
    .set({ ...safeUpdates, updatedAt: Date.now() })
    .where(eq(assets.id, id));

  return getAssetById(id);
}

export async function createAsset(input: AssetCreate): Promise<Asset> {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();

  await db.insert(assets).values({
    id,
    assetTag: input.assetTag,
    category: input.category,
    serialNumber: input.serialNumber,
    status: input.status ?? "AVAILABLE",
    purchaseDate: input.purchaseDate,
    purchaseCost: input.purchaseCost,
    currentBookValue: input.currentBookValue,
    locationId: input.locationId,
    assignedTo: input.assignedTo,
    deletedAt: input.deletedAt,
    imageUrl: input.imageUrl,
    createdAt: now,
    updatedAt: now,
  });

  const created = await getAssetById(id);
  if (!created) {
    throw new Error("Failed to create asset");
  }
  return created;
}

export async function deleteAndArchiveAsset(id: string): Promise<boolean> {
  try {
    // 1. Эхлээд архивын логикийг дуудна (R2 руу хуулах + D1-ээс бүрмөсөн устгах)
    await processAssetArchiving(id);
    return true;
  } catch (error) {
    console.error("Архивлаж устгах үед алдаа гарлаа:", error);
    return false;
  }
}
