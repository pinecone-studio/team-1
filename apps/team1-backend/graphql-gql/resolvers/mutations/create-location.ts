import { getDb } from '../../../lib/cloudflare-d1';
import { locations } from '../../../db/schema';

export const createLocation = async (_: unknown, args: { input: { id?: string; name: string; code: string } }) => {
  const db = getDb();
  const id = args.input.id ?? crypto.randomUUID();
  await db.insert(locations).values({ id, name: args.input.name, code: args.input.code });
  return { id, name: args.input.name, code: args.input.code };
};
