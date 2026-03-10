import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { locations } from '../../../db/schema';

export const deleteLocation = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  await db.delete(locations).where(eq(locations.id, args.id));
  return true;
};
