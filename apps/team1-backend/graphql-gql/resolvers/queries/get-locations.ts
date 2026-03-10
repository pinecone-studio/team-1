import { getDb } from '../../../lib/cloudflare-d1';
import { locations } from '../../../db/schema';

export const getLocations = async () => {
  const db = getDb();
  return db.select().from(locations);
};
