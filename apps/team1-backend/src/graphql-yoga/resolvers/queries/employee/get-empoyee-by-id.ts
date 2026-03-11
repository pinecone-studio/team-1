import { employees } from '@db/schema';
import { and, eq, isNull } from 'drizzle-orm/sql';

export const getEmployeeById = async (
  _parent: any,
  { id }: { id: string },
  { db }: any,
) => {
  const result = await db
    .select()
    .from(employees)
    .where(and(eq(employees.id, id), isNull(employees.deletedAt)));

  return result[0] || null;
};
