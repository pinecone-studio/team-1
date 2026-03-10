import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { auditLogs } from '../../../db/schema';

export const getAuditLogsByAsset = async (_: unknown, args: { assetId: string }) => {
  const db = getDb();
  return db.select().from(auditLogs).where(eq(auditLogs.assetId, args.assetId));
};
