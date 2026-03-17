import { getDb } from "@/db/client";
import { and, eq, desc } from "drizzle-orm";
import { auditLogs, dataWipeTasks, maintenanceTickets } from "@/schema";

export const miscQueries = {
  auditLogs: async (
    _: unknown,
    args: { tableName?: string; recordId?: string },
  ) => {
    const db = await getDb();
    const conditions = [];
    if (args.tableName) conditions.push(eq(auditLogs.tableName, args.tableName));
    if (args.recordId) conditions.push(eq(auditLogs.recordId, args.recordId));
    let q = db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt));
    if (conditions.length > 0) {
      q = q.where(and(...conditions)) as typeof q;
    }
    return q.all();
  },
  maintenanceTickets: async (_: unknown, args: { status?: string }) => {
    const db = await getDb();
    let query = db
      .select()
      .from(maintenanceTickets)
      .orderBy(desc(maintenanceTickets.createdAt));
    if (args.status) {
      query = query.where(eq(maintenanceTickets.status, args.status)) as any;
    }
    return query.all();
  },
  dataWipeTasks: async (_: unknown, args: { status?: string }) => {
    const db = await getDb();
    let q = db.select().from(dataWipeTasks).orderBy(desc(dataWipeTasks.createdAt));
    if (args.status?.trim()) {
      q = q.where(eq(dataWipeTasks.status, args.status.trim())) as typeof q;
    }
    return q.all();
  },
};
