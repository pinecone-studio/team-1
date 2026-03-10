import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { categories } from '../../../db/schema';

const compact = (input: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

export const updateCategory = async (_: unknown, args: { id: string; input: { name?: string } }) => {
  const db = getDb();
  const update = compact(args.input);
  if (Object.keys(update).length === 0) return null;
  await db.update(categories).set(update).where(eq(categories.id, args.id));
  return (await db.select().from(categories).where(eq(categories.id, args.id)))[0] ?? null;
};
