import { and, eq, inArray, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { createNotification } from "../../notifications";
import { assets, assignments, censusEvents, censusTasks } from "@/schema";
import type { CensusScope } from "../types";

export async function startCensus(input: {
  name: string;
  scope: CensusScope;
  scopeEmployeeIds?: string[] | null;
  createdBy: string;
}) {
  const db = await getDb();
  const now = Date.now();

  const censusId = crypto.randomUUID();
  const scopeFilter =
    input.scope === "EMPLOYEES"
      ? JSON.stringify({ employeeIds: input.scopeEmployeeIds ?? [] })
      : null;

  await db.insert(censusEvents).values({
    id: censusId,
    name: input.name,
    scope: input.scope,
    scopeFilter,
    createdBy: input.createdBy,
    startedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  // Collect assets according to scope.
  const assetRows =
    input.scope === "EMPLOYEES" && (input.scopeEmployeeIds?.length ?? 0) > 0
      ? await db
          .select({ id: assets.id })
          .from(assets)
          .innerJoin(
            assignments,
            and(
              eq(assignments.assetId, assets.id),
              inArray(assignments.employeeId, input.scopeEmployeeIds as string[]),
              isNull(assignments.returnedAt),
              isNull(assignments.deletedAt),
            ),
          )
          .where(isNull(assets.deletedAt))
          .all()
      : await db
          .select({ id: assets.id })
          .from(assets)
          .where(isNull(assets.deletedAt))
          .all();

  const assetIds = Array.from(new Set(assetRows.map((r) => r.id)));
  if (assetIds.length === 0) {
    return { id: censusId, totalTasks: 0, notifiedEmployees: 0 };
  }

  // Resolve current owner (assignment) for each asset.
  const ownerRows = await db
    .select({ assetId: assignments.assetId, employeeId: assignments.employeeId })
    .from(assignments)
    .where(
      and(
        inArray(assignments.assetId, assetIds),
        isNull(assignments.returnedAt),
        isNull(assignments.deletedAt),
      ),
    )
    .all();

  const ownerByAssetId = new Map<string, string>();
  for (const r of ownerRows) {
    if (!ownerByAssetId.has(r.assetId)) ownerByAssetId.set(r.assetId, r.employeeId);
  }

  // Create tasks (verifierId null for unassigned assets).
  await db
    .insert(censusTasks)
    .values(
      assetIds.map((assetId) => ({
        id: crypto.randomUUID(),
        censusId,
        assetId,
        verifierId: ownerByAssetId.get(assetId) ?? null,
        status: "PENDING",
        createdAt: now,
        updatedAt: now,
      })),
    )
    .execute();

  // Notify only employees who have assigned assets.
  const verifierIds = Array.from(
    new Set(
      assetIds
        .map((id) => ownerByAssetId.get(id))
        .filter((v): v is string => !!v),
    ),
  );

  await Promise.all(
    verifierIds.map((employeeId) =>
      createNotification({
        employeeId,
        title: `Census: ${input.name}`,
        message:
          "Танд олгогдсон хөрөнгүүдийн тооллогыг баталгаажуулна уу. Мэдэгдэл дээр дарж шалгана.",
        type: "WARNING",
        link: `census:${censusId}`,
      }),
    ),
  );

  return { id: censusId, totalTasks: assetIds.length, notifiedEmployees: verifierIds.length };
}

