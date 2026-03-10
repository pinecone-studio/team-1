import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { assets } from '../../../db/schema';

export const deleteAsset = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  await db.delete(assets).where(eq(assets.id, args.id));
  return true;
};
