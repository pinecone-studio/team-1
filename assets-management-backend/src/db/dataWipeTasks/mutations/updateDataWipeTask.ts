import { eq } from "drizzle-orm";

import { getDb } from "../../client";
import { dataWipeTasks } from "@/schema";

export async function updateDataWipeTask(id: string, status: string) {
  const db = await getDb();
  const now = Date.now();
  await db
    .update(dataWipeTasks)
    .set({ status, updatedAt: now })
    .where(eq(dataWipeTasks.id, id))
    .execute();

  const row = await db.select().from(dataWipeTasks).where(eq(dataWipeTasks.id, id)).get();
  if (!row) throw new Error("Data wipe task not found");
  return row;
}

