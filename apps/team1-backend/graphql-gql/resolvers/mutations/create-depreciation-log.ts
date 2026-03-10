import { getDb } from '../../../lib/cloudflare-d1';
import { depreciationLogs } from '../../../db/schema';

export const createDepreciationLog = async (
  _: unknown,
  args: {
    input: {
      id?: string;
      assetId: string;
      period: string;
      depreciationAmount: number;
      bookValueAfter: number;
      calculatedAt: string;
    };
  }
) => {
  const db = getDb();
  const id = args.input.id ?? crypto.randomUUID();
  await db.insert(depreciationLogs).values({
    id,
    assetId: args.input.assetId,
    period: args.input.period,
    depreciationAmount: args.input.depreciationAmount,
    bookValueAfter: args.input.bookValueAfter,
    calculatedAt: args.input.calculatedAt,
  });
  return { id, ...args.input };
};
