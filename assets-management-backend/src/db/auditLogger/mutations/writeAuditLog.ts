import { getDb } from "../../client";
import { auditLogs } from "@/schema";

export async function writeAuditLog(
  tableName: string,
  recordId: string,
  action: string,
  actorId: string,
  oldValue?: unknown,
  newValue?: unknown,
): Promise<void> {
  const db = await getDb();
  await db.insert(auditLogs).values({
    id: crypto.randomUUID(),
    tableName,
    recordId,
    action,
    actorId,
    oldValueJson: oldValue !== undefined ? JSON.stringify(oldValue) : null,
    newValueJson: newValue !== undefined ? JSON.stringify(newValue) : null,
    createdAt: Date.now(),
  });
}
