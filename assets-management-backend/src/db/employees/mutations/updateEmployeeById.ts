import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { getEmployeeById } from "../queries";
import { employees } from "@/schema";
import type { Employee, EmployeeUpdate } from "../types";

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
