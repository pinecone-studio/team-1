import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { categories } from "@/schema";

export async function getSubcategories(parentId: string) {
  const db = await getDb();
  return db
    .select()
    .from(categories)
    .where(eq(categories.parentId, parentId))
    .all();
}
