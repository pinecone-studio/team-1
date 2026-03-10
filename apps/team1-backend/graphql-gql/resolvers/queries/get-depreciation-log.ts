import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { depreciationLogs } from '../../../db/schema';

export const getDepreciationLog = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  return (
    (await db
      .select()
      .from(depreciationLogs)
      .where(eq(depreciationLogs.id, args.id)))[0] ?? null
  );
};
