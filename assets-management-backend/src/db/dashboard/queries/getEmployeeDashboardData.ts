import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assets, assignments, notifications } from "@/schema";

export async function getEmployeeDashboardData(employeeId: string) {
  const db = await getDb();

  const [myAssets, myAssignments, myNotifications] = await Promise.all([
    db.select().from(assets).where(eq(assets.assignedTo, employeeId)).all(),
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

  return {
    myAssets,
    myAssignments,
    notifications: myNotifications,
  };
}
