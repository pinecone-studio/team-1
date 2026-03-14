import { eq } from "drizzle-orm";

import { getDb } from "./client";
import { vendors } from "@/schema";

export async function getVendors() {
  const db = await getDb();
  return db.select().from(vendors).all();
}

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

export async function deleteVendor(id: string) {
  const db = await getDb();
  await db.delete(vendors).where(eq(vendors.id, id)).execute();
  return true;
}
