import { assets } from "../../../../drizzle/schema";
import { getDb } from "../../client";
import type { Asset } from "../types";

export async function getAssets(): Promise<Asset[]> {
  const db = await getDb();
  return db.select().from(assets).all();
}

