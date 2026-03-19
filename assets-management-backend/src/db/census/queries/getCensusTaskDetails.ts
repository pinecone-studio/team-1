import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assets, censusTasks, employees } from "@/schema";

export async function getCensusTaskDetails(censusId: string) {
  const db = await getDb();

  const rows = await db
    .select({
      task: censusTasks,
      asset: assets,
      verifier: {
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        email: employees.email,
      },
    })
    .from(censusTasks)
    .innerJoin(assets, eq(assets.id, censusTasks.assetId))
    .leftJoin(employees, eq(employees.id, censusTasks.verifierId))
    .where(eq(censusTasks.censusId, censusId))
    .all();

  return rows.map((r) => ({
    id: r.task.id,
    assetId: r.task.assetId,
    verifierId: r.task.verifierId,
    status: r.task.status,
    reason: (r.task as any).reason ?? null,
    transferredToEmployeeId: (r.task as any).transferredToEmployeeId ?? null,
    respondedAt: (r.task as any).respondedAt ?? null,
    asset: {
      id: r.asset.id,
      assetTag: r.asset.assetTag,
      serialNumber: r.asset.serialNumber,
      category: (r.asset as any).category ?? (r.asset as any).categoryId ?? null,
    },
    verifier: r.verifier?.id ? r.verifier : null,
  }));
}

