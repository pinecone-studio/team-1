import { getDb } from '../../../lib/cloudflare-d1';
import { employees } from '../../../db/schema';

export const getEmployees = async () => {
  const db = getDb();
  return db.select().from(employees);
};
