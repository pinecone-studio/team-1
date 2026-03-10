import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { assets } from '../../../db/schema';

export const getAssetsByLocation = async (_: unknown, args: { locationId: string }) => {
  const db = getDb();
  return db.select().from(assets).where(eq(assets.locationId, args.locationId));
};
