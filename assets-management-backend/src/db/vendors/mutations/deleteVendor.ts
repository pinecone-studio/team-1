import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { vendors } from "@/schema";

export async function deleteVendor(id: string) {
  const db = await getDb();
  await db.delete(vendors).where(eq(vendors.id, id)).execute();
  return true;
}
