import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { locations } from "@/schema";

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
