import { and, eq, inArray, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { createNotification } from "../../notifications";
import { getOffboardingEvent } from "../queries";
import { assets, assignments, employees, offboardingEvents } from "@/schema";
import type { OffboardingEvent } from "../types";

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export async function startOffboarding(
  employeeId: string,
  initiatedBy: string,
  options?: { terminationDate?: number },
): Promise<OffboardingEvent> {
  const db = await getDb();
  const now = Date.now();
  const effectiveTermination = options?.terminationDate ?? now;
  const deadline = effectiveTermination + THREE_DAYS_MS;

  const employee = await db
    .select()
    .from(employees)
    .where(eq(employees.id, employeeId))
    .get();
  if (!employee) throw new Error(`Employee ${employeeId} not found`);
  if (employee.status === "TERMINATED")
    throw new Error("Employee is already terminated");
  if (employee.status === "OFFBOARDING")
    throw new Error("Employee is already in offboarding process");

  const openAssignments = await db
    .select()
    .from(assignments)
    .where(
      and(
        eq(assignments.employeeId, employeeId),
        isNull(assignments.returnedAt),
      ),
    )
    .all();

  const totalAssets = openAssignments.length;
  const assetIds = openAssignments.map((a) => a.assetId);

  await db
    .update(employees)
    .set({
      status: "OFFBOARDING",
      terminationDate: effectiveTermination,
      updatedAt: now,
    })
    .where(eq(employees.id, employeeId));

  for (const a of openAssignments) {
    await db
      .update(assets)
      .set({ status: "RETURNING", updatedAt: now })
      .where(eq(assets.id, a.assetId));
  }

  const id = crypto.randomUUID();
  await db.insert(offboardingEvents).values({
    id,
    employeeId,
    initiatedBy,
    status: "IN_PROGRESS",
    totalAssets,
    returnedAssets: 0,
    assetIdsJson: JSON.stringify(assetIds),
    deadline,
    createdAt: now,
    updatedAt: now,
  });

  const deadlineLabel = new Date(deadline).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let message: string;
  if (assetIds.length > 0) {
    const assetRows = await db
      .select({ assetTag: assets.assetTag, serialNumber: assets.serialNumber })
      .from(assets)
      .where(inArray(assets.id, assetIds))
      .all();
    const assetList = assetRows
      .map((r) => `${r.assetTag} (${r.serialNumber})`)
      .join(", ");
    message = `Таны нэр дээр ${totalAssets} хөрөнгө бүртгэгдсэн. Буцаах эцсийн хугацаа: ${deadlineLabel}. Хөрөнгө: ${assetList}. Миний хөрөнгө хэсэгт орж буцаана уу.`;
  } else {
    message = `Та ажлаас гарах процесс эхэллээ. Буцаах эцсийн хугацаа: ${deadlineLabel}. Таны нэр дээр олгогдсон хөрөнгө байхгүй тул буцаах зүйл байхгүй.`;
  }
  await createNotification({
    employeeId,
    title: "Ажлаас гарах — хөрөнгө буцаах",
    message,
    type: "WARNING",
    link: "/",
  });

  await writeAuditLog(
    "employees",
    employeeId,
    "OFFBOARDING_STARTED",
    initiatedBy,
    { status: employee.status },
    { status: "OFFBOARDING", totalAssetsToReturn: totalAssets },
  );

  const created = await getOffboardingEvent(id);
  if (!created) throw new Error("Failed to create offboarding event");
  return created;
}
