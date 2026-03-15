import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { categories } from "@/schema";

export async function deleteCategory(id: string) {
  const db = await getDb();
  await db.delete(categories).where(eq(categories.id, id)).execute();
  return true;
}
