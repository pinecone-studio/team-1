import { getDb } from "../../client";
import { assignments } from "@/schema";

export async function getAssignments() {
  const db = await getDb();
  return db.select().from(assignments).all();
}
