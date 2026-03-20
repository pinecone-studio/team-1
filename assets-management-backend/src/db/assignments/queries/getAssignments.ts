import { isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { assignments, assets } from "@/schema";

export async function getAssignments() {
  const db = await getDb();
  return db
    .select()
    .from(assignments)
    .innerJoin(assets, (a) => a.id.eq(assignments.assetId))
    .where(isNull(assets.deletedAt))
    .all()
    .map((row) => row.assignments);
}
