import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assets, auditLogs } from "@/schema";

export async function deleteAssetById(
  id: string,
  actorId: string,
): Promise<boolean> {
  const db = await getDb();

  return await db.transaction(async (tx) => {
    // 1️⃣ хуучин asset авах
    const oldAsset = await tx.query.assets.findFirst({
      where: eq(assets.id, id),
    });

    if (!oldAsset) return false;

    // 2️⃣ asset delete (soft-delete эсвэл hard-delete)
    await tx.delete(assets).where(eq(assets.id, id));

    // 3️⃣ audit log insert
    await tx.insert(auditLogs).values({
      id: crypto.randomUUID(),
      tableName: "assets",
      recordId: id,
      action: "DELETE",
      oldValueJson: JSON.stringify(oldAsset),
      newValueJson: null,
      actorId,
      createdAt: Date.now(),
    });

    return true;
  });
}
