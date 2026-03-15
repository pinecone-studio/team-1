import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { locations } from "@/schema";

export async function deleteLocation(id: string) {
  const db = await getDb();
  await db.delete(locations).where(eq(locations.id, id)).execute();
  return true;
}
