import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { locations } from '../../../db/schema';

const compact = (input: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

export const updateLocation = async (_: unknown, args: { id: string; input: { name?: string; code?: string } }) => {
  const db = getDb();
  const update = compact(args.input);
  if (Object.keys(update).length === 0) return null;
  await db.update(locations).set(update).where(eq(locations.id, args.id));
  return (await db.select().from(locations).where(eq(locations.id, args.id)))[0] ?? null;
};
