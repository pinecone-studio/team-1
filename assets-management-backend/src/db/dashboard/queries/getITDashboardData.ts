import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../client";
import {
  assets,
  maintenanceTickets,
  notifications,
  transfers,
} from "@/schema";

export async function getITDashboardData() {
  const db = await getDb();

  const [recentAssets, openTickets, pendingTransfers, recentNotifications] =
    await Promise.all([
      db.select().from(assets).orderBy(desc(assets.createdAt)).limit(5).all(),
      db
        .select()
        .from(maintenanceTickets)
        .where(eq(maintenanceTickets.status, "OPEN"))
        .limit(5)
        .all(),
      db
        .select()
        .from(transfers)
        .orderBy(desc(transfers.transferredAt))
        .limit(5)
        .all(),
      db
        .select()
        .from(notifications)
        .where(
          and(eq(notifications.role, "IT_ADMIN"), eq(notifications.isRead, 0)),
        )
        .orderBy(desc(notifications.createdAt))
        .limit(10)
        .all(),
    ]);

  return {
    recentAssets,
    openTickets,
    pendingTransfers,
    notifications: recentNotifications,
  };
}
