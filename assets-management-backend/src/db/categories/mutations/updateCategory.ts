import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { categories } from "@/schema";

export async function updateCategory(
  id: string,
  name?: string,
  parentId?: string,
) {
  const db = await getDb();
  await db
    .update(categories)
    .set({
      ...(name && { name }),
      ...(parentId !== undefined && { parentId: parentId ?? null }),
    })
    .where(eq(categories.id, id))
    .execute();
  return db.select().from(categories).where(eq(categories.id, id)).get();
}
