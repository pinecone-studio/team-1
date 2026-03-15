import { getDb } from "../../client";
import { getEmployeeById } from "../queries";
import { employees } from "@/schema";
import type { Employee, EmployeeCreate } from "../types";

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
