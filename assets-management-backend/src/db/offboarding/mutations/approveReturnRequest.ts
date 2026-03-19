import { eq } from "drizzle-orm";
import { getDb } from "../../client";
import { getAssetById } from "../../assets/queries";
import { completeAssetReturn } from "./completeAssetReturn";
import { createDataWipeTask } from "../../dataWipeTasks/mutations/createDataWipeTask";
import { offboardingReturnRequests } from "@/schema";

export async function approveReturnRequest(
  returnRequestId: string,
  conditionHr: string,
  inspectedBy: string,
) {
  const db = await getDb();
  const now = Date.now();

  // Demo-friendly: allow generic inspector labels like "HR".
  const fkInspectedBy = inspectedBy === "HR" ? null : inspectedBy;

  const req = await db
    .select()
    .from(offboardingReturnRequests)
    .where(eq(offboardingReturnRequests.id, returnRequestId))
    .get();

  if (!req) throw new Error("Return request not found");
  if (req.status !== "PENDING_HR")
    throw new Error("Return request is not pending HR approval");

  const asset = await completeAssetReturn(
    req.assetId,
    req.employeeId,
    conditionHr,
    inspectedBy,
  );

  await createDataWipeTask(req.assetId);

  await db
    .update(offboardingReturnRequests)
    .set({
      status: "APPROVED_AVAILABLE",
      conditionHr,
      inspectedBy: fkInspectedBy,
      updatedAt: now,
    })
    .where(eq(offboardingReturnRequests.id, returnRequestId));

  return asset;
}
