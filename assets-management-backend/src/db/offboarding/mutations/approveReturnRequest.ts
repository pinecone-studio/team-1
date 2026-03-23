import { eq, or } from "drizzle-orm";
import { getDb } from "../../client";
import { writeAuditLog } from "../../auditLogger";
import { completeAssetReturn } from "./completeAssetReturn";
import { createDataWipeTask } from "../../dataWipeTasks/mutations/createDataWipeTask";
import { employees, offboardingReturnRequests } from "@/schema";

export async function approveReturnRequest(
  returnRequestId: string,
  conditionHr: string,
  inspectedBy: string,
) {
  const db = await getDb();
  const now = Date.now();

  const inspector =
    inspectedBy === "HR"
      ? null
      : ((await db
          .select({ id: employees.id })
          .from(employees)
          .where(
            or(
              eq(employees.id, inspectedBy),
              eq(employees.entraId, inspectedBy),
              eq(employees.email, inspectedBy),
            ),
          )
          .limit(1)
          .get()) ?? null);
  const fkInspectedBy = inspector?.id ?? null;

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

  const hrActorId = fkInspectedBy;

  await writeAuditLog(
    "assets",
    req.assetId,
    "OFFBOARDING_HR_RECEIVED_RETURN",
    hrActorId,
    { returnRequestStatus: "PENDING_HR" },
    {
      returnRequestId,
      inspectedBy,
      messageMn: "HR буцаагдсан хөрөнгийг хүлээн авч шалгасан",
    },
  );

  await writeAuditLog(
    "assets",
    req.assetId,
    "OFFBOARDING_HR_UPDATED_RETURN_STATUS",
    hrActorId,
    {
      returnRequestStatus: "PENDING_HR",
      assetStatus: "RETURNING",
    },
    {
      returnRequestStatus: "APPROVED_AVAILABLE",
      assetStatus: asset.status,
      conditionHr,
      inspectedBy,
      messageMn:
        "HR буцаах хүсэлтийн төлөв болон хөрөнгийн статусыг шинэчилсэн (баталгаажуулсан)",
    },
  );

  return asset;
}
