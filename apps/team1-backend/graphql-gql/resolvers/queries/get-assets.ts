import { getDb } from '../../../lib/cloudflare-d1';
import { assets } from '../../../db/schema';

export const getAssets = async () => {
  const db = getDb();
  return db.select().from(assets);
};
