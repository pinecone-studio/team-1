import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { createNotification } from "../../notifications";
import { getAssetById } from "../../assets/queries";
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
