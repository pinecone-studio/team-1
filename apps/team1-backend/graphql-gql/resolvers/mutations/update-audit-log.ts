import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/cloudflare-d1';
import { auditLogs } from '../../../db/schema';

const compact = (input: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));

export const updateAuditLog = async (
  _: unknown,
  args: {
    id: string;
    input: {
      assetId?: string;
      action?: string;
      actorId?: string;
      locationId?: string;
      detailsJson?: string;
      createdAt?: string;
    };
  }
) => {
  const db = getDb();
  const update = compact(args.input);
  if (Object.keys(update).length === 0) return null;
  await db.update(auditLogs).set(update).where(eq(auditLogs.id, args.id));
  return (await db.select().from(auditLogs).where(eq(auditLogs.id, args.id)))[0] ?? null;
};
