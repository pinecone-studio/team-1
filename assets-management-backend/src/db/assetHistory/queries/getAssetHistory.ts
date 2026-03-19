import { and, eq, inArray, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import {
  assetMovements,
  assets,
  assignments,
  auditLogs,
  disposalRecords,
  maintenanceTickets,
  transfers,
  employees,
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
    db
      .select()
      .from(auditLogs)
      .where(
        eq(auditLogs.recordId, assetId),
      )
      .all(),
  ]);
  const assetAuditRows = auditRows.filter((r) => r.tableName === "assets");

  // Pre-resolve employee names referenced from assignments/transfers/audit newValueJson.
  // This avoids showing raw employee IDs in the UI description.
  const referencedEmployeeIds = new Set<string>();

  for (const a of assignmentRows) referencedEmployeeIds.add(a.employeeId);
  for (const t of transferRows) {
    referencedEmployeeIds.add(t.fromEmployeeId);
    referencedEmployeeIds.add(t.toEmployeeId);
  }

  for (const al of assetAuditRows) {
    if (!al.newValueJson) continue;
    try {
      const newVal = JSON.parse(al.newValueJson) as Record<string, unknown>;
      const action = al.action;
      if (action === "ASSIGNED" && typeof newVal.employeeId === "string") {
        referencedEmployeeIds.add(newVal.employeeId);
      }
      if (
        action === "TRANSFERRED" &&
        typeof newVal.fromEmployeeId === "string" &&
        typeof newVal.toEmployeeId === "string"
      ) {
        referencedEmployeeIds.add(newVal.fromEmployeeId);
        referencedEmployeeIds.add(newVal.toEmployeeId);
      }
    } catch {
      // ignore parse errors
    }
  }

  const employeeNameById = new Map<string, string>();
  if (referencedEmployeeIds.size > 0) {
    const employeeRows = await db
      .select({ id: employees.id, firstName: employees.firstName, lastName: employees.lastName, email: employees.email })
      .from(employees)
      .where(inArray(employees.id, Array.from(referencedEmployeeIds)))
      .all();
    for (const e of employeeRows) {
      const name = [e.firstName, e.lastName].filter(Boolean).join(" ").trim() || e.email || e.id;
      employeeNameById.set(e.id, name);
    }
  }

  const describeEmployee = (id: unknown) => {
    if (typeof id !== "string") return "—";
    return employeeNameById.get(id) ?? id;
  };

  const events: AssetTimelineEvent[] = [];

  if (assetRow) {
    // UX: "Худалдан авсан" түүхийг анхдагчаар харуулахгүй.
    events.push({
      id: `${assetId}:REGISTERED`,
      eventType: "REGISTERED",
      description: `Бүртгэгдсэн: ${assetRow.assetTag} (S/N: ${assetRow.serialNumber})`,
      actorId: null,
      timestamp: new Date(assetRow.createdAt).toISOString(),
    });
  }

  for (const a of assignmentRows) {
    events.push({
      id: `${a.id}:ASSIGNED`,
      eventType: "ASSIGNED",
      description: `Олгосон — нөхцөл: ${a.conditionAtAssign}`,
      actorId: a.employeeId,
      timestamp: new Date(a.assignedAt).toISOString(),
    });

    if (a.returnedAt) {
      events.push({
        id: `${a.id}:RETURNED`,
        eventType: "RETURNED",
        description: `Буцаасан${a.conditionAtReturn ? ` — нөхцөл: ${a.conditionAtReturn}` : ""}`,
        actorId: a.employeeId,
        timestamp: new Date(a.returnedAt).toISOString(),
      });
    }
  }

  for (const t of transferRows) {
    events.push({
      id: `${t.id}:TRANSFERRED`,
      eventType: "TRANSFERRED",
      description: `Шилжүүлсэн${t.reason ? ` — шалтгаан: ${t.reason}` : ""}`,
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

  for (const al of assetAuditRows) {
    // Duplicates:
    // - REGISTERED / ASSIGNED / TRANSFERRED / PURCHASED are already represented by
    //   assetRow/assignmentRows/transferRows derived events above.
    // - auditLogs for these actions would otherwise show the same event twice.
    if (
      al.action === "REGISTERED" ||
      al.action === "PURCHASED" ||
      al.action === "ASSIGNED" ||
      al.action === "TRANSFERRED"
    ) {
      continue;
    }

    let description = al.action;
    try {
      const newVal = al.newValueJson ? JSON.parse(al.newValueJson) as Record<string, unknown> : null;
      if (newVal) {
        if (al.action === "TRANSFERRED" && newVal.fromEmployeeId && newVal.toEmployeeId) {
          description = `Шилжүүлсэн: ${describeEmployee(newVal.fromEmployeeId)} → ${describeEmployee(newVal.toEmployeeId)}${newVal.reason ? ` (${newVal.reason})` : ""}`;
        } else if (al.action === "ASSIGNED" && newVal.employeeId) {
          description = `Олгосон: ${describeEmployee(newVal.employeeId)}`;
        } else if (al.action === "DISPOSAL_REQUESTED") {
          description = `Устгах хүсэлт илгээсэн${newVal.method ? ` (${newVal.method})` : ""}`;
        } else if (al.action === "DISPOSAL_IT_APPROVED") {
          description = "IT админ баталгаажсан";
        } else if (al.action === "DISPOSAL_FINANCE_APPROVED") {
          description = "Санхүүгийн баталгаажсан";
        } else if (al.action === "DISPOSAL_REJECTED") {
          description = "Устгах хүсэлт татгалзсан";
        } else if (al.action === "ASSET_DISPOSED") {
          description = "Устгасан (IT/санхүү)";
        } else if (al.action === "ASSET_RETURNED") {
          if (newVal.offboardingInspection) {
            const who =
              typeof newVal.inspectedBy === "string" ? newVal.inspectedBy : "HR";
            description = `Ажлаас гарах — HR шалгалт (${who}), хөрөнгийн төлөв: ${String(newVal.status ?? "")}`;
          } else {
            description = "Эзэмшигчээс буцаасан";
          }
        } else if (al.action === "OFFBOARDING_EMPLOYEE_SUBMITTED_RETURN") {
          description =
            typeof newVal.messageMn === "string"
              ? newVal.messageMn
              : "Ажилтан буцаах хүсэлт илгээсэн (HR хүлээгдэж байна)";
        } else if (al.action === "OFFBOARDING_HR_RECEIVED_RETURN") {
          description =
            typeof newVal.messageMn === "string"
              ? newVal.messageMn
              : "HR буцаагдсан хөрөнгийг хүлээн авч шалгасан";
          if (typeof newVal.inspectedBy === "string" && newVal.inspectedBy) {
            description += ` (${newVal.inspectedBy})`;
          }
        } else if (al.action === "OFFBOARDING_HR_UPDATED_RETURN_STATUS") {
          description =
            typeof newVal.messageMn === "string"
              ? newVal.messageMn
              : "HR буцаах хүсэлтийн төлөв болон хөрөнгийн статусыг шинэчилсэн";
          if (typeof newVal.inspectedBy === "string" && newVal.inspectedBy) {
            description += ` (${newVal.inspectedBy})`;
          }
        } else if (
          al.action === "REPAIR_REQUESTED" &&
          newVal.offboardingReturnRequestId
        ) {
          description =
            typeof newVal.messageMn === "string"
              ? newVal.messageMn
              : "HR засварын хүсэлт (ажлаас гарах)";
        } else if (al.action === "REGISTERED") {
          description = `Бүртгэгдсэн: ${newVal.assetTag ?? ""} (S/N: ${newVal.serialNumber ?? ""})`;
        } else if (al.action === "ASSIGNMENT_ACCEPTED") {
          description = "Эзэмшигч зөвшөөрсөн";
        } else if (al.action === "ASSIGNMENT_REJECTED") {
          description = "Эзэмшигч татгалзсан";
        } else if (al.action === "ASSET_DELETE_REQUESTED") {
          description = "Устгах үйлдэл эхэлсэн";
        } else if (al.action === "ASSET_DELETED") {
          description = "Хөрөнгө устгасан";
        } else if (al.action === "ASSET_DELETE_FAILED") {
          description = `Устгах үйлдэл амжилтгүй${newVal.error ? `: ${newVal.error}` : ""}`;
        }
      }
    } catch {
      // keep description as al.action
    }
    events.push({
      id: `${al.id}:AUDIT`,
      eventType: al.action,
      description,
      actorId: al.actorId,
      timestamp: new Date(Number(al.createdAt)).toISOString(),
    });
  }

  events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return events;
}
