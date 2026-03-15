import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { getEmployeeById } from "../queries";
import { employees } from "@/schema";

export async function deleteEmployeeById(id: string): Promise<boolean> {
  const db = await getDb();
  const existing = await getEmployeeById(id);
  if (!existing) return false;

  await db.delete(employees).where(eq(employees.id, id));
  return true;
}
