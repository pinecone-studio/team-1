import { getDb } from '../../../lib/cloudflare-d1';
import { auditLogs } from '../../../db/schema';

export const getAuditLogs = async () => {
  const db = getDb();
  return db.select().from(auditLogs);
};
