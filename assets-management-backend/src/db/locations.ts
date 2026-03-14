import { eq } from "drizzle-orm";

import { getDb } from "./client";
import { locations } from "@/schema";

export async function getLocations() {
  const db = await getDb();
  return db.select().from(locations).all();
}

export async function createLocation(input: {
  name: string;
  parentId?: string;
  type: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  await db
    .insert(locations)
    .values({
      id,
      name: input.name,
      parentId: input.parentId ?? null,
      type: input.type,
      createdAt: Date.now(),
    })
    .execute();
  return { id, ...input, createdAt: Date.now() };
}

export async function updateLocation(
  id: string,
  input: {
    name?: string;
    parentId?: string;
    type?: string;
  },
) {
  const db = await getDb();
  await db
    .update(locations)
    .set({
      ...(input.name && { name: input.name }),
      ...(input.parentId !== undefined && { parentId: input.parentId ?? null }),
      ...(input.type && { type: input.type }),
    })
    .where(eq(locations.id, id))
    .execute();
  return db.select().from(locations).where(eq(locations.id, id)).get();
}

export async function deleteLocation(id: string) {
  const db = await getDb();
  await db.delete(locations).where(eq(locations.id, id)).execute();
  return true;
}
