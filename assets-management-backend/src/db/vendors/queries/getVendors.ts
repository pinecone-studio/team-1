import { getDb } from "../../client";
import { vendors } from "@/schema";

export async function getVendors() {
  const db = await getDb();
  return db.select().from(vendors).all();
}
