import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { assets } from '../../../db/schema';

export const getAsset = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  return (await db.select().from(assets).where(eq(assets.id, args.id)))[0] ?? null;
};
