import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { dataWipeTasks } from "@/schema";

export async function createDataWipeTask(assetId: string) {
  const db = await getDb();
  const now = Date.now();

  const existing = await db
    .select()
    .from(dataWipeTasks)
    .where(eq(dataWipeTasks.assetId, assetId))
    .all();

  const pending = existing.find((t) => t.status === "PENDING");
  if (pending) return pending;

  const id = crypto.randomUUID();
  await db.insert(dataWipeTasks).values({
    id,
    assetId,
    status: "PENDING",
    createdAt: now,
    updatedAt: now,
  });

  const row = await db
    .select()
    .from(dataWipeTasks)
    .where(eq(dataWipeTasks.id, id))
    .get();
  if (!row) throw new Error("Failed to create data wipe task");
  return row;
}
