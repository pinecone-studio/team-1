import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { disposalRequests } from "@/schema";
import type { DisposalRequest } from "../types";

export async function getDisposalRequestsByAsset(
  assetId: string,
): Promise<DisposalRequest[]> {
  const db = await getDb();
  return db
    .select()
    .from(disposalRequests)
    .where(eq(disposalRequests.assetId, assetId))
    .all();
}
