import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { categories } from '../../../db/schema';

export const getCategory = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  return (await db.select().from(categories).where(eq(categories.id, args.id)))[0] ?? null;
};
