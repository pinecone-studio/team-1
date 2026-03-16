import { getDb } from "../../client";
import { employees } from "@/schema";
import type { Employee } from "../types";

export async function getEmployees(): Promise<Employee[]> {
  const db = await getDb();
  return db.select().from(employees).all();
}

/** Returns first employee id for system audit actor when no user context (e.g. asset registration). */
export async function getFirstEmployeeId(): Promise<string | null> {
  const db = await getDb();
  const row = await db.select({ id: employees.id }).from(employees).limit(1).get();
  return row?.id ?? null;
}
