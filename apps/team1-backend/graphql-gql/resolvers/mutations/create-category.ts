import { getDb } from '../../../lib/cloudflare-d1';
import { categories } from '../../../db/schema';

export const createCategory = async (_: unknown, args: { input: { id?: string; name: string } }) => {
  const db = getDb();
  const id = args.input.id ?? crypto.randomUUID();
  await db.insert(categories).values({ id, name: args.input.name });
  return { id, name: args.input.name };
};
