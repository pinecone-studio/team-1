import { getDb } from '../../../lib/cloudflare-d1';
import { categories } from '../../../db/schema';

export const getCategories = async () => {
  const db = getDb();
  return db.select().from(categories);
};
