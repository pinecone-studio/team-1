import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../client";
import {
  disposalRequests,
  notifications,
  purchaseOrders,
  purchaseRequests,
} from "@/schema";

export async function getFinanceDashboardData() {
  const db = await getDb();

  const [
    pendingPurchaseRequests,
    recentOrders,
    pendingDisposals,
    financeNotifications,
  ] = await Promise.all([
    db
      .select()
      .from(purchaseRequests)
      .where(eq(purchaseRequests.status, "PENDING"))
      .limit(10)
      .all(),
    db
      .select()
      .from(purchaseOrders)
      .orderBy(desc(purchaseOrders.createdAt))
      .limit(5)
      .all(),
    db
      .select()
      .from(disposalRequests)
      .where(eq(disposalRequests.status, "IT_APPROVED"))
      .limit(10)
      .all(),
    db
      .select()
      .from(notifications)
      .where(
        and(eq(notifications.role, "FINANCE"), eq(notifications.isRead, 0)),
      )
      .orderBy(desc(notifications.createdAt))
      .limit(10)
      .all(),
  ]);

  return {
    pendingPurchaseRequests,
    recentOrders,
    pendingDisposals,
    notifications: financeNotifications,
  };
}
