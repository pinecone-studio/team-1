import { getDb } from "../../client";
import { locations } from "@/schema";

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
