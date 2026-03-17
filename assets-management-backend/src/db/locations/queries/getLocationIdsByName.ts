import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { locations } from "@/schema";

/**
 * Тухайн нэртэй бүх байршлын ID-уудыг буцаана.
 * Нэр ижил байршлуудыг нэг filter-т ашиглахад зориулагдсан.
 */
export async function getLocationIdsByName(name: string): Promise<string[]> {
  if (!name?.trim()) return [];
  const db = await getDb();
  const rows = await db
    .select({ id: locations.id })
    .from(locations)
    .where(eq(locations.name, name.trim()))
    .all();
  return rows.map((r) => r.id);
}
