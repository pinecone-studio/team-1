import { eq, or } from "drizzle-orm";
import { categories } from "../../../../drizzle/schema";
import { getDb } from "../../client";

export async function ensureCategoryId(category: string): Promise<string> {
  const db = await getDb();

  const existing = await db
    .select({ id: categories.id })
    .from(categories)
    .where(or(eq(categories.id, category), eq(categories.name, category)))
    .get();

  if (existing?.id) return existing.id;

  const now = Date.now();
  const id = category;

  await db
    .insert(categories)
    .values({
      id,
      name: category,
      parentId: null,
      createdAt: now,
    })
    .onConflictDoNothing();

  const created = await db
    .select({ id: categories.id })
    .from(categories)
    .where(or(eq(categories.id, category), eq(categories.name, category)))
    .get();

  if (!created?.id) {
    throw new Error("Failed to ensure category");
  }

  return created.id;
}
