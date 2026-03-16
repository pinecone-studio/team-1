import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { categories } from "@/schema";

export async function getCategoryById(id: string | null | undefined) {
  if (!id) return null;
  const db = await getDb();
  return db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.id, id))
    .get();
}
