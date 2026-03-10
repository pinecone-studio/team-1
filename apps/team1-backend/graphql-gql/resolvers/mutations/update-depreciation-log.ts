import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { depreciationLogs } from '../../../db/schema';

const compact = (input: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

export const updateDepreciationLog = async (
  _: unknown,
  args: {
    id: string;
    input: {
      assetId?: string;
      period?: string;
      depreciationAmount?: number;
      bookValueAfter?: number;
      calculatedAt?: string;
    };
  }
) => {
  const db = getDb();
  const update = compact(args.input);
  if (Object.keys(update).length === 0) return null;
  await db.update(depreciationLogs).set(update).where(eq(depreciationLogs.id, args.id));
  return (
    (await db
      .select()
      .from(depreciationLogs)
      .where(eq(depreciationLogs.id, args.id)))[0] ?? null
  );
};
