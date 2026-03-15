import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { notifications } from "@/schema";

export async function markNotificationAsRead(id: string) {
  const db = await getDb();
  await db
    .update(notifications)
    .set({ isRead: 1 })
    .where(eq(notifications.id, id))
    .execute();
}
