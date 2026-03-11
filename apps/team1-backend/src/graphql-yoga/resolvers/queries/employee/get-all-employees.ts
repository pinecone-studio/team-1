import { employees } from '@db/schema';
import { isNull } from 'drizzle-orm/sql';

export const getAllEmployees = async (
  _parent: any,
  _args: any,
  { db }: any,
) => {
  return await db.select().from(employees).where(isNull(employees.deletedAt));
};
