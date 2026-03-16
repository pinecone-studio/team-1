import { isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { categories } from "@/schema";

export async function getRootCategories() {
  const db = await getDb();
  return db.select().from(categories).where(isNull(categories.parentId)).all();
}
