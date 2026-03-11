// src/graphql/resolvers/employee.ts
import { employees } from 'db/schema';
import { eq } from 'drizzle-orm';

export const employeeResolvers = {
  Query: {
    employees: async (_parent: any, _args: any, { db }: any) => {
      const data = await db.select().from(employees);

      // Drizzle нь mode: 'timestamp'-ийг Date объект болгож өгдөг.
      // GraphQL String нэхэж байгаа тул .toISOString() хийнэ.
      return data.map((emp: any) => ({
        ...emp,
        hireDate: emp.hireDate.toISOString(),
        createdAt: emp.createdAt.toISOString(),
      }));
    },
  },

  Mutation: {
    createEmployee: async (_parent: any, { input }: any, { db }: any) => {
      const newEmployeeData = {
        ...input,
        id: input.id || crypto.randomUUID(), // ID байхгүй бол үүсгэнэ
        // String огноог Date объект болгоно (Drizzle автоматаар Integer болгож хадгална)
        hireDate: new Date(input.hireDate),
      };

      const [inserted] = await db
        .insert(employees)
        .values(newEmployeeData)
        .returning();

      return {
        ...inserted,
        hireDate: inserted.hireDate.toISOString(),
        createdAt: inserted.createdAt.toISOString(),
      };
    },
  },
};
