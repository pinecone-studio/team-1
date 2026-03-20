import { and, eq } from "drizzle-orm";
import { getDb } from "../../client";
import { censusTasks, notifications, transfers } from "@/schema";

export type CensusResponseInput = {
  assetId: string;
  status: "CONFIRMED" | "NOT_AVAILABLE";
  reason?: "BROKEN" | "LOST" | "TRANSFERRED" | null;
  transferredToEmployeeId?: string | null;
};

export async function submitCensusResponses(input: {
  censusId: string;
  employeeId: string;
  responses: CensusResponseInput[];
}) {
  const db = await getDb();
  const now = Date.now();

  for (const r of input.responses) {
    await db
      .update(censusTasks)
      .set({
        status: r.status,
        reason: r.reason ?? null,
        transferredToEmployeeId: r.transferredToEmployeeId ?? null,
        respondedAt: now,
        updatedAt: now,
      })
      .where(
        and(
          eq(censusTasks.censusId, input.censusId),
          eq(censusTasks.assetId, r.assetId),
          eq(censusTasks.verifierId, input.employeeId),
        ),
      );

    // Optional: if TRANSFERRED, create a transfer record draft (no auto-approval here).
    if (r.status === "NOT_AVAILABLE" && r.reason === "TRANSFERRED" && r.transferredToEmployeeId) {
      await db.insert(transfers).values({
        id: crypto.randomUUID(),
        assetId: r.assetId,
        fromEmployeeId: input.employeeId,
        toEmployeeId: r.transferredToEmployeeId,
        reason: "Census reported transfer",
        approvedBy: null,
        conditionNoted: null,
        transferredAt: now,
        createdAt: now,
      });
    }
  }

  await db
    .update(notifications)
    .set({ isRead: 1 })
    .where(
      and(
        eq(notifications.employeeId, input.employeeId),
        eq(notifications.link, `census:${input.censusId}`),
      ),
    );

  return true;
}
