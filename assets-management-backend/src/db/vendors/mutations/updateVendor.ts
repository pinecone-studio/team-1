import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { vendors } from "@/schema";

export async function updateVendor(
  id: string,
  input: {
    name?: string;
    contactName?: string;
    email?: string;
    phone?: string;
    address?: string;
  },
) {
  const db = await getDb();
  await db
    .update(vendors)
    .set({
      ...input,
    })
    .where(eq(vendors.id, id))
    .execute();
  return db.select().from(vendors).where(eq(vendors.id, id)).get();
}
