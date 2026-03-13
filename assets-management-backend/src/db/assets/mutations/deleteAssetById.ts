import { eq } from "drizzle-orm";
import { assets } from "../../../../drizzle/schema";
import { getDb } from "../../client";

export async function deleteAssetById(id: string): Promise<boolean> {
  const db = await getDb();
  const existing = await db
    .select({ id: assets.id })
    .from(assets)
    .where(eq(assets.id, id))
    .get();

  if (!existing) return false;

  await db.delete(assets).where(eq(assets.id, id));
  return true;
}
