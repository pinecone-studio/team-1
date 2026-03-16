import { getDb } from "../../client";
import { notifications } from "@/schema";

export interface CreateNotificationInput {
  employeeId?: string;
  role?: "IT_ADMIN" | "FINANCE" | "EMPLOYEE";
  title: string;
  message: string;
  type?: "INFO" | "WARNING" | "URGENT";
  link?: string;
}

export async function createNotification(input: CreateNotificationInput) {
  const db = await getDb();
  const id = crypto.randomUUID();

  await db
    .insert(notifications)
    .values({
      id,
      employeeId: input.employeeId ?? null,
      role: input.role ?? null,
      title: input.title,
      message: input.message,
      type: input.type ?? "INFO",
      link: input.link ?? null,
      isRead: 0,
      createdAt: Date.now(),
    })
    .execute();

  return id;
}
