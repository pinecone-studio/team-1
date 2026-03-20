import { and, eq, isNull } from "drizzle-orm";

import { getDb } from "../../client";
import { assets, assignments } from "@/schema";

export async function getAssignments() {
  const db = await getDb();
  const rows = await db
    .select({ assignment: assignments })
    .from(assignments)
    .innerJoin(assets, eq(assets.id, assignments.assetId))
    .where(and(isNull(assignments.deletedAt), isNull(assets.deletedAt)))
    .all();

  return rows.map(({ assignment }) => assignment);
}
