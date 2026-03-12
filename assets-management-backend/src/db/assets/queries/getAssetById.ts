import { eq } from "drizzle-orm";
import { assets } from "../../../../drizzle/schema";
import { getDb } from "../../client";
import type { Asset } from "../types";

export async function getAssetById(id: string): Promise<Asset | undefined> {
  const db = await getDb();
  return db.select().from(assets).where(eq(assets.id, id)).get();
}

