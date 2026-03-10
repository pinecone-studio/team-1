import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { categories } from '../../../db/schema';

export const deleteCategory = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  await db.delete(categories).where(eq(categories.id, args.id));
  return true;
};
