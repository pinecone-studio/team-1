import { getDb } from "../../client";
import { eq, or } from "drizzle-orm";
import { getEmployeeById } from "../queries";
import { employees } from "@/schema";
import type { Employee, EmployeeCreate } from "../types";

export async function createEmployee(input: EmployeeCreate): Promise<Employee> {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();

  // Friendly pre-checks (avoid opaque D1 constraint errors)
  const existing = await db
    .select({ id: employees.id, email: employees.email, employeeCode: employees.employeeCode })
    .from(employees)
    .where(or(eq(employees.email, input.email), eq(employees.employeeCode, input.employeeCode)))
    .limit(1)
    .get();
  if (existing?.email === input.email) {
    throw new Error("Employee email already exists. Өмнө нь бүртгэгдсэн имэйл байна.");
  }
  if (existing?.employeeCode === input.employeeCode) {
    throw new Error("Employee code already exists. Өмнө нь бүртгэгдсэн employeeCode байна.");
  }

  await db.insert(employees).values({
    id,
    entraId: input.entraId ?? null,
    clerkId: null,
    role: "EMPLOYEE",
    firstName: input.firstName,
    lastName: input.lastName,
    firstNameEng: input.firstNameEng,
    lastNameEng: input.lastNameEng,
    email: input.email,
    imageUrl: input.imageUrl ?? null,
    hireDate: input.hireDate,
    terminationDate: null,
    status: "INACTIVE",
    numberOfVacationDays: input.numberOfVacationDays ?? null,
    github: input.github ?? null,
    department: input.department,
    branch: input.branch,
    employeeCode: input.employeeCode,
    level: input.level,
    isKpi: input.isKpi ?? 0,
    isSalaryCompany: input.isSalaryCompany ?? 1,
    birthDayAndMonth: input.birthDayAndMonth ?? null,
    birthdayPoster: input.birthdayPoster ?? null,
    deletedAt: input.deletedAt ?? null,
    createdAt: now,
    updatedAt: now,
  });

  const created = await getEmployeeById(id);
  if (!created) {
    throw new Error("Failed to create employee");
  }
  return created;
}
