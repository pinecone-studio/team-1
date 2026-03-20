import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { censusTasks } from "@/schema";
import { getOpenCensusAssetScanStatus } from "../queries/getOpenCensusAssetScanStatus";

export async function registerOpenCensusAssetScan(assetId: string) {
  const status = await getOpenCensusAssetScanStatus(assetId);

  if (status.alreadyRegistered) return true;
  if (!status.canRegister || !status.taskId) {
    throw new Error(
      status.reason || "Энэ хөрөнгийг тооллогод бүртгэх боломжгүй байна.",
    );
  }

  const db = await getDb();
  const now = Date.now();

  await db
    .update(censusTasks)
    .set({
      status: "CONFIRMED",
      reason: null,
      transferredToEmployeeId: null,
      respondedAt: now,
      updatedAt: now,
    })
    .where(eq(censusTasks.id, status.taskId));

  return true;
}
