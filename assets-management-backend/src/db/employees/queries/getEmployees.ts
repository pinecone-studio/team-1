import { getDb } from "../../client";
import { employees } from "@/schema";
import type { Employee } from "../types";

export async function getEmployees(): Promise<Employee[]> {
  const db = await getDb();
  return db.select().from(employees).all();
}
