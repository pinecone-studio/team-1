import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { auditLogs } from '../../../db/schema';

export const getAuditLog = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  return (await db.select().from(auditLogs).where(eq(auditLogs.id, args.id)))[0] ?? null;
};
