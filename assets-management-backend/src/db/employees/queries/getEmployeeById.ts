import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { employees } from "@/schema";
import type { Employee } from "../types";

export async function getEmployeeById(
  id: string,
): Promise<Employee | undefined> {
  const db = await getDb();
  return db.select().from(employees).where(eq(employees.id, id)).get();
}
