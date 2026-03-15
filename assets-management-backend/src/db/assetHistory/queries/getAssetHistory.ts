import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import {
  assetMovements,
  assets,
  assignments,
  auditLogs,
  disposalRecords,
  maintenanceTickets,
  transfers,
} from "@/schema";
import type { AssetTimelineEvent } from "../types";

export async function getAssetHistory(
  assetId: string,
): Promise<AssetTimelineEvent[]> {
  const db = await getDb();

  const [
    assetRow,
    assignmentRows,
    transferRows,
    movementRows,
    ticketRows,
    disposalRows,
    auditRows,
  ] = await Promise.all([
    db.select().from(assets).where(eq(assets.id, assetId)).get(),
    db.select().from(assignments).where(eq(assignments.assetId, assetId)).all(),
    db.select().from(transfers).where(eq(transfers.assetId, assetId)).all(),
    db
      .select()
      .from(assetMovements)
      .where(eq(assetMovements.assetId, assetId))
      .all(),
    db
      .select()
      .from(maintenanceTickets)
      .where(eq(maintenanceTickets.assetId, assetId))
      .all(),
    db
      .select()
      .from(disposalRecords)
      .where(eq(disposalRecords.assetId, assetId))
      .all(),
    db.select().from(auditLogs).where(eq(auditLogs.recordId, assetId)).all(),
  ]);

  const events: AssetTimelineEvent[] = [];

  if (assetRow) {
    if (assetRow.purchaseDate) {
      events.push({
        id: `${assetId}:PURCHASED`,
        eventType: "PURCHASED",
        description: `Asset purchased${assetRow.purchaseCost != null ? ` for ${assetRow.purchaseCost}` : ""}`,
        actorId: null,
        timestamp: new Date(assetRow.purchaseDate).toISOString(),
      });
    }
    events.push({
      id: `${assetId}:REGISTERED`,
      eventType: "REGISTERED",
      description: `Asset registered with tag ${assetRow.assetTag} (S/N: ${assetRow.serialNumber})`,
      actorId: null,
      timestamp: new Date(assetRow.createdAt).toISOString(),
    });
  }

  for (const a of assignmentRows) {
    events.push({
      id: `${a.id}:ASSIGNED`,
      eventType: "ASSIGNED",
      description: `Assigned to employee ${a.employeeId} — condition: ${a.conditionAtAssign}`,
      actorId: a.employeeId,
      timestamp: new Date(a.assignedAt).toISOString(),
    });

    if (a.returnedAt) {
      events.push({
        id: `${a.id}:RETURNED`,
        eventType: "RETURNED",
        description: `Returned by employee ${a.employeeId}${a.conditionAtReturn ? ` — condition: ${a.conditionAtReturn}` : ""}`,
        actorId: a.employeeId,
        timestamp: new Date(a.returnedAt).toISOString(),
      });
    }
  }

  for (const t of transferRows) {
    events.push({
      id: `${t.id}:TRANSFERRED`,
      eventType: "TRANSFERRED",
      description: `Transferred from ${t.fromEmployeeId} to ${t.toEmployeeId}${t.reason ? ` — reason: ${t.reason}` : ""}`,
      actorId: t.approvedBy ?? t.fromEmployeeId,
      timestamp: new Date(t.transferredAt).toISOString(),
    });
  }

  for (const m of movementRows) {
    events.push({
      id: `${m.id}:LOCATION_MOVED`,
      eventType: "LOCATION_MOVED",
      description: `Moved from location ${m.fromLocationId} to ${m.toLocationId}${m.reason ? ` — reason: ${m.reason}` : ""}`,
      actorId: m.movedBy,
      timestamp: new Date(m.movedAt).toISOString(),
    });
  }

  for (const mt of ticketRows) {
    events.push({
      id: `${mt.id}:MAINTENANCE_OPENED`,
      eventType: "MAINTENANCE_OPENED",
      description: `Maintenance ticket opened — ${mt.description} (severity: ${mt.severity})`,
      actorId: mt.reporterId,
      timestamp: new Date(mt.createdAt).toISOString(),
    });

    if (mt.resolvedAt) {
      events.push({
        id: `${mt.id}:MAINTENANCE_RESOLVED`,
        eventType: "MAINTENANCE_RESOLVED",
        description: `Maintenance ticket resolved${mt.repairCost != null ? ` — repair cost: ${mt.repairCost}` : ""}`,
        actorId: mt.reporterId,
        timestamp: new Date(mt.resolvedAt).toISOString(),
      });
    }
  }

  for (const d of disposalRows) {
    events.push({
      id: `${d.id}:DISPOSED`,
      eventType: "DISPOSED",
      description: `Asset disposed via ${d.method}${d.recipient ? ` — recipient: ${d.recipient}` : ""}${d.writeOffValue != null ? ` (write-off value: ${d.writeOffValue})` : ""}`,
      actorId: d.certifiedBy,
      timestamp: new Date(d.disposedAt).toISOString(),
    });
  }

  for (const al of auditRows) {
    events.push({
      id: `${al.id}:AUDIT_LOG`,
      eventType: "AUDIT_LOG",
      description: `${al.action} on ${al.tableName}`,
      actorId: al.actorId,
      timestamp: new Date(al.createdAt).toISOString(),
    });
  }

  events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return events;
}
