import { getDb } from "../../client";
import { categories } from "@/schema";

export async function getCategories() {
  const db = await getDb();
  return db.select().from(categories).all();
}
