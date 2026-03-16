import { eq } from "drizzle-orm";

import { getDb } from "../../client";
import { locations } from "@/schema";

/**
 * locationId (leaf)-аас дээш parentId гинжилж,
 * бүтэн зам "Салбар / Төрөл / Хэсэг / Өрөө" string буцаана.
 */
export async function getLocationPath(
  locationId: string | null | undefined
): Promise<string | null> {
  if (!locationId?.trim()) return null;

  const db = await getDb();
  const path: string[] = [];
  let currentId: string | null = locationId.trim();

  while (currentId) {
    const row = await db
      .select({ name: locations.name, parentId: locations.parentId })
      .from(locations)
      .where(eq(locations.id, currentId))
      .get();

    if (!row) break;
    path.push(row.name);
    currentId = row.parentId;
  }

  if (path.length === 0) return null;
  path.reverse();
  return path.join(" / ");
}
