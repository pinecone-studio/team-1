import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { disposalRequests } from "@/schema";
import type { DisposalRequest } from "../types";

export async function getDisposalRequest(
  id: string,
): Promise<DisposalRequest | undefined> {
  const db = await getDb();
  return db
    .select()
    .from(disposalRequests)
    .where(eq(disposalRequests.id, id))
    .get();
}
