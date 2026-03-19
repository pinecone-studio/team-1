import { getDb } from "../../client";
import { getEmployeeById } from "../queries";
import { employees } from "@/schema";
import type { Employee, EmployeeCreate } from "../types";

export async function createEmployee(input: EmployeeCreate): Promise<Employee> {
  const db = await getDb();
  const now = Date.now();
  const id = crypto.randomUUID();
  const employeeCode =
    input.employeeCode?.trim() ||
    `EMP-${now.toString(36).toUpperCase()}`;

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
    status: "ACTIVE",
    numberOfVacationDays: input.numberOfVacationDays ?? null,
    github: input.github ?? null,
    department: input.department,
    branch: input.branch,
    employeeCode,
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
