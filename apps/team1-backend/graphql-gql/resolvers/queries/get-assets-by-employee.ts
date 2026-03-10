import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { assets } from '../../../db/schema';

export const getAssetsByEmployee = async (_: unknown, args: { employeeId: string }) => {
  const db = getDb();
  return db.select().from(assets).where(eq(assets.assignedTo, args.employeeId));
};
