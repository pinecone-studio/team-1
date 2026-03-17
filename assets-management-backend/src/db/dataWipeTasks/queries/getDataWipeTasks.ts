import { desc, eq } from "drizzle-orm";

import { getDb } from "../../client";
import { dataWipeTasks } from "@/schema";

export async function getDataWipeTasks(status?: string) {
  const db = await getDb();
  let q = db.select().from(dataWipeTasks).orderBy(desc(dataWipeTasks.createdAt));
  if (status?.trim()) {
    q = q.where(eq(dataWipeTasks.status, status.trim())) as typeof q;
  }
  return q.all();
}

