import { getDb } from "@/db/client";
import { auditLogs } from "@/schema";

type AuditAction = "CREATE" | "UPDATE" | "DELETE";

export async function writeAuditLog({
  tableName,
  recordId,
  action,
  oldValue,
  newValue,
  actorId,
}: {
  tableName: string;
  recordId: string;
  action: AuditAction;
  oldValue?: unknown;
  newValue?: unknown;
  actorId: string;
}) {
  const db = await getDb();

  await db.insert(auditLogs).values({
    id: crypto.randomUUID(),
    tableName,
    recordId,
    action,
    oldValueJson: oldValue ? JSON.stringify(oldValue) : null,
    newValueJson: newValue ? JSON.stringify(newValue) : null,
    actorId,
  });
}
