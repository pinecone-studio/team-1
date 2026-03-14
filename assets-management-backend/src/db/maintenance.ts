import { eq } from "drizzle-orm";

import { getDb } from "./client";
import { createNotification } from "./notifications";
import { getAssetById } from "./assets/queries";
import { assets, maintenanceTickets } from "@/schema";

export async function createMaintenanceTicket(input: {
  assetId: string;
  reporterId: string;
  description: string;
  severity: string;
  vendorId?: string;
  repairCost?: number;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  const now = Date.now();

  await db
    .insert(maintenanceTickets)
    .values({
      id,
      assetId: input.assetId,
      reporterId: input.reporterId,
      description: input.description,
      severity: input.severity,
      status: "OPEN",
      vendorId: input.vendorId ?? null,
      repairCost: input.repairCost ?? 0,
      createdAt: now,
      updatedAt: now,
    })
    .execute();

  // Update asset status to IN_MAINTENANCE
  await db
    .update(assets)
    .set({ status: "IN_MAINTENANCE", updatedAt: now })
    .where(eq(assets.id, input.assetId))
    .execute();

  const asset = await getAssetById(input.assetId);
  if (asset) {
    await createNotification({
      role: "IT_ADMIN",
      title: "New Maintenance Ticket",
      message: `Maintenance requested for ${asset.assetTag}: ${input.description}`,
      type: "WARNING",
      link: `/maintenance/${id}`,
    });
  }

  return db
    .select()
    .from(maintenanceTickets)
    .where(eq(maintenanceTickets.id, id))
    .get();
}

export async function updateMaintenanceTicket(
  id: string,
  input: {
    status: string;
    repairCost?: number;
    resolvedAt?: number;
  },
) {
  const db = await getDb();
  const now = Date.now();

  await db
    .update(maintenanceTickets)
    .set({
      status: input.status,
      repairCost: input.repairCost,
      resolvedAt: input.resolvedAt,
      updatedAt: now,
    })
    .where(eq(maintenanceTickets.id, id))
    .execute();

  const ticket = await db
    .select()
    .from(maintenanceTickets)
    .where(eq(maintenanceTickets.id, id))
    .get();

  if (ticket && input.status === "RESOLVED") {
    // Set asset back to AVAILABLE or keep as is? Usually AVAILABLE or ASSIGNED if it was assigned.
    // Simplifying to AVAILABLE for now if resolved.
    await db
      .update(assets)
      .set({ status: "AVAILABLE", updatedAt: now })
      .where(eq(assets.id, ticket.assetId))
      .execute();
  }

  return ticket;
}
