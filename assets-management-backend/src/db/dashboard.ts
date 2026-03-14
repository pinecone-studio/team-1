import { eq, desc, and, sql } from "drizzle-orm";

import { getDb } from "./client";
import {
  assets,
  assignments,
  disposalRequests,
  maintenanceTickets,
  notifications,
  purchaseOrders,
  purchaseRequests,
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
