import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { employees } from '../../../db/schema';

export const getEmployee = async (_: unknown, args: { id: string }) => {
  const db = getDb();
  return (await db.select().from(employees).where(eq(employees.id, args.id)))[0] ?? null;
};
