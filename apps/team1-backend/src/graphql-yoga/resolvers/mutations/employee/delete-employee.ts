import { employees } from '@db/schema';
import { eq } from 'drizzle-orm/sql';

export const deleteEmployee = async (
  _parent: any,
  { id }: { id: string },
  { db }: any,
) => {
  try {
    const result = await db
      .update(employees)
      .set({
        deletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(employees.id, id))
      .returning();

    if (result.length === 0) throw new Error('Ажилтан олдсонгүй');
    return result[0];
  } catch (error: any) {
    throw new Error(`Устгахад алдаа гарлаа: ${error.message}`);
  }
};
