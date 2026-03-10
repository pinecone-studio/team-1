import { getDb } from '../../../lib/cloudflare-d1';
import { employees } from '../../../db/schema';

export const createEmployee = async (
  _: unknown,
  args: { input: { id?: string; email: string; role?: string; locationId?: string; status: string } }
) => {
  const db = getDb();
  const id = args.input.id ?? crypto.randomUUID();
  await db.insert(employees).values({
    id,
    email: args.input.email,
    role: args.input.role ?? 'USER',
    locationId: args.input.locationId ?? null,
    status: args.input.status,
  });
  return {
    id,
    email: args.input.email,
    role: args.input.role ?? 'USER',
    locationId: args.input.locationId ?? null,
    status: args.input.status,
  };
};
