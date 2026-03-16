import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { assets, maintenanceTickets } from "@/schema";

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
    await db
      .update(assets)
      .set({ status: "AVAILABLE", updatedAt: now })
      .where(eq(assets.id, ticket.assetId))
      .execute();
  }

  return ticket;
}
