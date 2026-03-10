import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { employees } from '../../../db/schema';

const compact = (input: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

export const updateEmployee = async (
  _: unknown,
  args: { id: string; input: { email?: string; role?: string; locationId?: string; status?: string } }
) => {
  const db = getDb();
  const update = compact(args.input);
  if (Object.keys(update).length === 0) return null;
  await db.update(employees).set(update).where(eq(employees.id, args.id));
  return (await db.select().from(employees).where(eq(employees.id, args.id)))[0] ?? null;
};
