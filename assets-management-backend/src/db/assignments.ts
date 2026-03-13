import { and, desc, eq, isNull } from "drizzle-orm";
import { assignments, assets } from "../../drizzle/schema";
import { getDb } from "./client";
import { getAssetById } from "./assets/queries";

export async function assignAssetToEmployee(
  assetId: string,
  employeeId: string,
  conditionAtAssign = "GOOD",
  accessoriesJson?: string,
) {
  const db = await getDb();
  const now = Date.now();

  await db.insert(assignments).values({
    id: crypto.randomUUID(),
    assetId,
    employeeId,
    assignedAt: now,
    conditionAtAssign,
    accessoriesJson,
    createdAt: now,
    updatedAt: now,
  });

  await db
    .update(assets)
    .set({ assignedTo: employeeId, status: "ASSIGNED", updatedAt: now })
    .where(eq(assets.id, assetId));

  return getAssetById(assetId);
}

export async function returnAssetFromEmployee(
  assetId: string,
  conditionAtReturn = "OK",
) {
  const db = await getDb();
  const now = Date.now();

  const openAssignment = await db
    .select({ id: assignments.id })
    .from(assignments)
    .where(and(eq(assignments.assetId, assetId), isNull(assignments.returnedAt)))
    .orderBy(desc(assignments.assignedAt))
    .get();

  if (openAssignment?.id) {
    await db
      .update(assignments)
      .set({ returnedAt: now, conditionAtReturn, updatedAt: now })
      .where(eq(assignments.id, openAssignment.id));
  }

  await db
    .update(assets)
    .set({ assignedTo: null, status: "AVAILABLE", updatedAt: now })
    .where(eq(assets.id, assetId));

  return getAssetById(assetId);
}
