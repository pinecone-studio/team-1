import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { depreciationLogs } from '../../../db/schema';

export const deleteDepreciationLog = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  await db.delete(depreciationLogs).where(eq(depreciationLogs.id, args.id));
  return true;
};
