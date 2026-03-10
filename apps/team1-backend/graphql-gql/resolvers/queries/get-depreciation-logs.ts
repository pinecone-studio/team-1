import { getDb } from '../../../lib/cloudflare-d1';
import { depreciationLogs } from '../../../db/schema';

export const getDepreciationLogs = async () => {
  const db = getDb();
  return db.select().from(depreciationLogs);
};
