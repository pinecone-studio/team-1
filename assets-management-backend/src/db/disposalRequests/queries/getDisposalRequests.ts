import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { disposalRequests } from "@/schema";
import type { DisposalRequest } from "../types";

export async function getDisposalRequests(
  status?: string,
): Promise<DisposalRequest[]> {
  const db = await getDb();
  if (status) {
    return db
      .select()
      .from(disposalRequests)
      .where(eq(disposalRequests.status, status))
      .all();
  }
  return db.select().from(disposalRequests).all();
}
