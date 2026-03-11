import { employees } from '@db/schema';
import { eq } from 'drizzle-orm/sql';

export const updateEmployee = async (
  _parent: any,
  { id, input }: any,
  { db }: any,
) => {
  try {
    const result = await db
      .update(employees)
      .set({
        ...input,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(employees.id, id))
      .returning();

    if (result.length === 0) throw new Error('Ажилтан олдсонгүй');
    return result[0];
  } catch (error: any) {
    throw new Error(`Шинэчлэхэд алдаа гарлаа: ${error.message}`);
  }
};
