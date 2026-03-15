import { getDb } from "../../client";
import { categories } from "@/schema";

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
