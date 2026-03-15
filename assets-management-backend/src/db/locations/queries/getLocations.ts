import { getDb } from "../../client";
import { locations } from "@/schema";

export async function getLocations() {
  const db = await getDb();
  return db.select().from(locations).all();
}
