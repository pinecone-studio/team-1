import { getDb } from "../../client";
import { vendors } from "@/schema";

export async function createVendor(input: {
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  await db
    .insert(vendors)
    .values({
      id,
      ...input,
      createdAt: Date.now(),
    })
    .execute();
  return { id, ...input, createdAt: Date.now() };
}
