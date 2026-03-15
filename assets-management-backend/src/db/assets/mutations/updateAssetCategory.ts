import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { getAssetById } from "../queries";
import { assets, auditLogs } from "@/schema";

export async function updateAssetCategory(
  assetId: string,
  newCategoryId: string,
  actorId: string, // audit-д хэрэглэх
) {
  const db = await getDb();

  // Transaction дотор бүх update+audit хийнэ
  const updatedAsset = await db.transaction(async (tx) => {
    // 1️⃣ Хуучин asset-г авна
    const oldAsset = await getAssetById(assetId);
    if (!oldAsset) throw new Error("Asset not found");

    if (oldAsset.status !== "AVAILABLE") {
      throw new Error(
        "Asset category can only be updated for unassigned (AVAILABLE) assets.",
      );
    }

    const now = Date.now();

    // 2️⃣ Asset update
    await tx
      .update(assets)
      .set({
        categoryId: newCategoryId,
        updatedAt: now,
      })
      .where(eq(assets.id, assetId));

    // 3️⃣ Audit log insert
    await tx.insert(auditLogs).values({
      id: crypto.randomUUID(),
      tableName: "assets",
      recordId: assetId,
      action: "UPDATE",
      oldValueJson: JSON.stringify(oldAsset),
      newValueJson: JSON.stringify({
        ...oldAsset,
        categoryId: newCategoryId,
        updatedAt: now,
      }),
      actorId,
      createdAt: now,
    });

    // 4️⃣ Updated asset-г буцааж авах
    return getAssetById(assetId);
  });

  return updatedAsset;
}
