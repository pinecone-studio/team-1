import { employees } from '@db/schema';

export const createEmployee = async (
  _parent: any,
  { input }: any,
  { db }: any,
) => {
  try {
    // 1. Огноонуудыг хөрвүүлэх (Drizzle mode: 'timestamp' учраас)
    const hireDateObj = new Date(input.hireDate);

    // Хөрвүүлэлт зөв болсон эсэхийг шалгах (Invalid Date биш байгааг)
    if (isNaN(hireDateObj.getTime())) {
      throw new Error('hireDate буруу форматтай байна.');
    }

    const newEmployee = {
      id: input.id || crypto.randomUUID(),
      ...input,
      // Энд String биш, заавал Date объект дамжуулна
      hireDate: hireDateObj,
      terminationDate: input.terminationDate
        ? new Date(input.terminationDate)
        : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Drizzle-д очих дата:', newEmployee);

    const result = await db.insert(employees).values(newEmployee).returning();
    return result[0];
  } catch (error: any) {
    console.error('❌ Resolver Error:', error);
    // Энэ мессежийг Playground дээрээ харна
    throw new Error(`Баазын алдаа: ${error.message}`);
  }
};
