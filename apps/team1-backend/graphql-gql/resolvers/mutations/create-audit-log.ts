import { getDb } from '../../../lib/cloudflare-d1';
import { auditLogs } from '../../../db/schema';

export const createAuditLog = async (
  _: unknown,
  args: {
    input: {
      id?: string;
      assetId: string;
      action: string;
      actorId: string;
      locationId?: string;
      detailsJson?: string;
      createdAt: string;
    };
  }
) => {
  const db = getDb();
  const id = args.input.id ?? crypto.randomUUID();
  await db.insert(auditLogs).values({
    id,
    assetId: args.input.assetId,
    action: args.input.action,
    actorId: args.input.actorId,
    locationId: args.input.locationId ?? null,
    detailsJson: args.input.detailsJson ?? null,
    createdAt: args.input.createdAt,
  });
  return { id, ...args.input };
};
