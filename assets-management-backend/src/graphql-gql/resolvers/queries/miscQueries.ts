import { getDb } from "@/db/client";
import { and, eq, desc } from "drizzle-orm";
import { auditLogs, maintenanceTickets } from "@/schema";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const miscQueries = {
  auditLogs: async (
    _: unknown,
    args: { tableName?: string; recordId?: string },
    ctx: GraphQLContext,
  ) =>
    cachedJson(ctx, {
      versionKey: "audit:cache_version",
      keyParts: ["auditLogs", `table_${args.tableName ?? ""}`, `record_${args.recordId ?? ""}`],
      ttlSeconds: 60,
      compute: async () => {
        const db = await getDb();
        const conditions = [];
        if (args.tableName)
          conditions.push(eq(auditLogs.tableName, args.tableName));
        if (args.recordId) conditions.push(eq(auditLogs.recordId, args.recordId));
        let q = db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt));
        if (conditions.length > 0) {
          q = q.where(and(...conditions)) as typeof q;
        }
        return q.all();
      },
    }),
  maintenanceTickets: async (
    _: unknown,
    args: { status?: string },
    ctx: GraphQLContext,
  ) =>
    cachedJson(ctx, {
      versionKey: "maintenance:cache_version",
      keyParts: ["maintenance:list", `status_${args.status ?? ""}`],
      ttlSeconds: 120,
      compute: async () => {
        const db = await getDb();
        let query = db
          .select()
          .from(maintenanceTickets)
          .orderBy(desc(maintenanceTickets.createdAt));
        if (args.status) {
          query = query.where(eq(maintenanceTickets.status, args.status)) as typeof query;
        }
        return query.all();
      },
    }),
};
