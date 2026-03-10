import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { employees } from '../../../db/schema';

export const deleteEmployee = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  await db.delete(employees).where(eq(employees.id, args.id));
  return true;
};
