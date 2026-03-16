import { getDb } from "@/db/client";
import { eq, desc } from "drizzle-orm";
import { auditLogs, maintenanceTickets } from "@/schema";

export const miscQueries = {
  auditLogs: async (
    _: unknown,
    args: { tableName?: string; recordId?: string },
  ) => {
    const db = await getDb();
    let query = db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt));
    if (args.tableName) {
      query = query.where(eq(auditLogs.tableName, args.tableName)) as any;
    }
    if (args.recordId) {
      query = query.where(eq(auditLogs.recordId, args.recordId)) as any;
    }
    return query.all();
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
};
