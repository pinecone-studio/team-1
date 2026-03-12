import { employees } from '@db/schema';
import { eq } from 'drizzle-orm/sql';

export const syncClerkId = async (
  _parent: any,
  { email, clerkId }: { email: string; clerkId: string },
  { db }: any,
) => {
  try {
    // 1. Тухайн имэйлтэй ажилтан байгаа эсэхийг шалгах
    const [existingEmployee] = await db
      .select()
      .from(employees)
      .where(eq(employees.email, email));

    if (!existingEmployee) {
      throw new Error('Энэ имэйлтэй ажилтан системд бүртгэлгүй байна.');
    }

    // 2. Clerk ID-г нь шинэчлэх (Update)
    const [updatedEmployee] = await db
      .update(employees)
      .set({
        clerkId: clerkId,
        updatedAt: new Date(),
      })
      .where(eq(employees.email, email))
      .returning();

    console.log('✅ Clerk ID амжилттай холбогдлоо:', updatedEmployee.email);

    return updatedEmployee;
  } catch (error: any) {
    console.error('❌ Sync Error:', error);
    throw new Error(`Clerk ID холбоход алдаа гарлаа: ${error.message}`);
  }
};
