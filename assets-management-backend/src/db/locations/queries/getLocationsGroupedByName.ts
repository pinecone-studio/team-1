import { getDb } from "../../client";
import { locations } from "@/schema";

export type LocationFilterOption = {
  name: string;
  locationIds: string[];
};

/**
 * Байршлуудыг нэрээр нь бүлэглэж, filter dropdown-д нэг нэр нэг сонголт болгоход ашиглана.
 * Ижил нэртэй олон байршил (өөр parentId-тэй) нэг entry болно.
 */
export async function getLocationsGroupedByName(): Promise<
  LocationFilterOption[]
> {
  const db = await getDb();
  const rows = await db.select().from(locations).all();
  const byName = new Map<string, string[]>();
  for (const row of rows) {
    const list = byName.get(row.name) ?? [];
    list.push(row.id);
    byName.set(row.name, list);
  }
  return Array.from(byName.entries()).map(([name, locationIds]) => ({
    name,
    locationIds,
  }));
}
