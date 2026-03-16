import { and, desc, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { assets, assignments, notifications } from "@/schema";

export async function getEmployeeDashboardData(employeeId: string) {
  const db = await getDb();

  const [myAssetsRows, myAssignments, myNotifications] = await Promise.all([
    db
      .select({ asset: assets })
      .from(assets)
      .innerJoin(
        assignments,
        and(
          eq(assignments.assetId, assets.id),
          eq(assignments.employeeId, employeeId),
          isNull(assignments.returnedAt),
        ),
      )
      .all(),
    db
      .select()
      .from(assignments)
      .where(eq(assignments.employeeId, employeeId))
      .orderBy(desc(assignments.assignedAt))
      .limit(10)
      .all(),
    db
      .select()
      .from(notifications)
      .where(
        and(
          eq(notifications.employeeId, employeeId),
          eq(notifications.isRead, 0),
        ),
      )
      .orderBy(desc(notifications.createdAt))
      .limit(10)
      .all(),
  ]);

  const myAssets = myAssetsRows.map((r) => r.asset);

  return {
    myAssets,
    myAssignments,
    notifications: myNotifications,
  };
}
