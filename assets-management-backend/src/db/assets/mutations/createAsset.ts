import { getDb } from "../../client";
import type { Asset, AssetCreate } from "../types";
import { getAssetById } from "../queries";
import { assets, auditLogs } from "@/schema";

function buildAssetRow(
  input: AssetCreate & {
    mainCategoryId?: string | null;
    notes?: string | null;
  },
  now: number,
) {
  const fallbackImageUrl = process.env.DEFAULT_ASSET_IMAGE_URL;

  return {
    id: crypto.randomUUID(),
    assetTag: input.assetTag,
    serialNumber: input.serialNumber,
    status: input.status ?? "AVAILABLE",

    purchaseDate: input.purchaseDate,
    purchaseCost: input.purchaseCost,

    locationId: input.locationId,
    categoryId: input.categoryId,
    modelId: input.modelId,

    imageUrl: input.imageUrl ?? fallbackImageUrl,
    notes: input.notes,

    condition: input.condition ?? "GOOD",

    createdAt: now,
    updatedAt: now,
    deletedAt: input.deletedAt ?? null,
  };
}

export async function createAsset(
  input: AssetCreate,
  actorId: string,
): Promise<Asset> {
  const db = await getDb();
  const now = Date.now();
  const row = buildAssetRow(input, now);

  await db.transaction(async (tx) => {
    // 1️⃣ asset insert
    await tx.insert(assets).values(row);

    // 2️⃣ audit log insert
    await tx.insert(auditLogs).values({
      id: crypto.randomUUID(),
      tableName: "assets",
      recordId: row.id,
      action: "CREATE",
      oldValueJson: null,
      newValueJson: JSON.stringify(row),
      actorId,
      createdAt: now,
    });
  });

  const created = await getAssetById(row.id);

  if (!created) {
    throw new Error("Failed to create asset");
  }

  return created;
}
