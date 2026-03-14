import { eq } from "drizzle-orm";

import { getDb } from "./client";
import { employees } from "@/schema";

export type Employee = typeof employees.$inferSelect;
export type EmployeeUpdate = Partial<typeof employees.$inferInsert>;
export type EmployeeCreate = Pick<
  typeof employees.$inferInsert,
  | "entraId"
  | "firstName"
  | "lastName"
  | "firstNameEng"
  | "lastNameEng"
  | "email"
  | "hireDate"
  | "department"
  | "branch"
  | "employeeCode"
  | "level"
> &
  Partial<
    Omit<
      typeof employees.$inferInsert,
      | "id"
      | "entraId"
      | "firstName"
      | "lastName"
      | "firstNameEng"
      | "lastNameEng"
      | "email"
      | "hireDate"
      | "department"
      | "branch"
      | "employeeCode"
      | "level"
      | "createdAt"
      | "updatedAt"
    >
  >;

export async function getEmployees(): Promise<Employee[]> {
  const db = await getDb();
  return db.select().from(employees).all();
}

export async function getEmployeeById(
  id: string,
): Promise<Employee | undefined> {
  const db = await getDb();
  return db.select().from(employees).where(eq(employees.id, id)).get();
}

export async function updateEmployeeById(
  id: string,
  updates: EmployeeUpdate,
): Promise<Employee | undefined> {
  const { id: _id, createdAt: _createdAt, ...safeUpdates } = updates;
  const db = await getDb();

  await db
    .update(employees)
    .set({ ...safeUpdates, updatedAt: Date.now() })
    .where(eq(employees.id, id));

  return getEmployeeById(id);
}

export async function createEmployee(input: EmployeeCreate): Promise<Employee> {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();

  await db.insert(employees).values({
    id,
    entraId: input.entraId,
    firstName: input.firstName,
    lastName: input.lastName,
    firstNameEng: input.firstNameEng,
    lastNameEng: input.lastNameEng,
    email: input.email,
    imageUrl: input.imageUrl,
    hireDate: input.hireDate,
    terminationDate: input.terminationDate,
    status: input.status ?? "ACTIVE",
    numberOfVacationDays: input.numberOfVacationDays,
    github: input.github,
    department: input.department,
    branch: input.branch,
    employeeCode: input.employeeCode,
    level: input.level,
    isKpi: input.isKpi ?? 0,
    isSalaryCompany: input.isSalaryCompany ?? 1,
    birthDayAndMonth: input.birthDayAndMonth,
    birthdayPoster: input.birthdayPoster,
    deletedAt: input.deletedAt,
    createdAt: now,
    updatedAt: now,
  });

  const created = await getEmployeeById(id);
  if (!created) {
    throw new Error("Failed to create employee");
  }
  return created;
}

export async function deleteEmployeeById(id: string): Promise<boolean> {
  const db = await getDb();
  const existing = await getEmployeeById(id);
  if (!existing) return false;

  await db.delete(employees).where(eq(employees.id, id));
  return true;
}
