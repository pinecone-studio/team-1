import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { auditLogs } from '../../../db/schema';

export const deleteAuditLog = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  await db.delete(auditLogs).where(eq(auditLogs.id, args.id));
  return true;
};
