import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { assets } from '../../../db/schema';

const compact = (input: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

export const updateAsset = async (
  _: unknown,
  args: {
    id: string;
    input: {
      assetTag?: string;
      categoryId?: string;
      parentAssetId?: string;
      locationId?: string;
      assignedTo?: string;
      status?: string;
      imageR2Key?: string;
      purchasePrice?: number;
      currentBookValue?: number;
      purchaseDate?: string;
    };
  }
) => {
  const db = getDb();
  const update = compact(args.input);
  if (Object.keys(update).length === 0) return null;
  await db.update(assets).set(update).where(eq(assets.id, args.id));
  return (await db.select().from(assets).where(eq(assets.id, args.id)))[0] ?? null;
};
