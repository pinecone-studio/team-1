import { and, eq, isNull, or } from "drizzle-orm";

import { getDb } from "./client";
import { categories } from "@/schema";

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

export async function createCategory(name: string, parentId?: string) {
  const db = await getDb();
  const id = crypto.randomUUID();
  await db
    .insert(categories)
    .values({
      id,
      name,
      parentId: parentId ?? null,
    })
    .execute();
  return { id, name, parentId };
}

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

export async function deleteCategory(id: string) {
  const db = await getDb();
  await db.delete(categories).where(eq(categories.id, id)).execute();
  return true;
}
