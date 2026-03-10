import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { employees } from '../../../db/schema';

export const getEmployeesByLocation = async (_: unknown, args: { locationId: string }) => {
  const db = getDb();
  return db.select().from(employees).where(eq(employees.locationId, args.locationId));
};
