import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { depreciationLogs } from '../../../db/schema';

export const getDepreciationLogsByAsset = async (_: unknown, args: { assetId: string }) => {
  const db = getDb();
  return db
    .select()
    .from(depreciationLogs)
    .where(eq(depreciationLogs.assetId, args.assetId));
};
