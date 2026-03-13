import { and, eq, isNull, or } from "drizzle-orm";
import { categories } from "../../drizzle/schema";
import { getDb } from "./client";

export async function getCategories() {
  const db = await getDb();
  return db.select().from(categories).all();
}

export async function getRootCategories() {
  const db = await getDb();
  return db.select().from(categories).where(isNull(categories.parentId)).all();
}

export async function getSubcategories(parentId: string) {
  const db = await getDb();
  return db
    .select()
    .from(categories)
    .where(eq(categories.parentId, parentId))
    .all();
}
