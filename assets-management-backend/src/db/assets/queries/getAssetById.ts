import { and, eq, isNull } from "drizzle-orm";

import { getDb } from "../../client";
import type { Asset } from "../types";
import { assets } from "@/schema";

export async function getAssetById(id: string): Promise<Asset | undefined> {
  const db = await getDb();
  return db
    .select()
    .from(assets)
    .where(and(eq(assets.id, id), isNull(assets.deletedAt)))
    .get();
}
