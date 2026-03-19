import { and, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { assets, assignments, censusTasks } from "@/schema";

export async function getEmployeeCensusTasks(censusId: string, employeeId: string) {
  const db = await getDb();

  const rows = await db
    .select({
      task: censusTasks,
      asset: assets,
    })
    .from(censusTasks)
    .innerJoin(assets, eq(assets.id, censusTasks.assetId))
    .where(and(eq(censusTasks.censusId, censusId), eq(censusTasks.verifierId, employeeId)))
    .all();

  return rows.map((r) => ({
      id: r.task.id,
      censusId: r.task.censusId,
      assetId: r.task.assetId,
      status: r.task.status,
      reason: (r.task as any).reason ?? null,
      transferredToEmployeeId: (r.task as any).transferredToEmployeeId ?? null,
      respondedAt: (r.task as any).respondedAt ?? null,
      asset: {
        id: r.asset.id,
        assetTag: r.asset.assetTag,
        serialNumber: r.asset.serialNumber,
        // Use categoryId as a lightweight category hint for now.
        category: (r.asset as any).category ?? (r.asset as any).categoryId ?? null,
        status: r.asset.status,
        imageUrl: r.asset.imageUrl,
      },
    }));
}

