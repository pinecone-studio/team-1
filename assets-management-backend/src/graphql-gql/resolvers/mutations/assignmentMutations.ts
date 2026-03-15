import {
  assignAssetToEmployee,
  returnAssetFromEmployee,
  transferAsset as transferAssetDb,
} from "@/db/assignments";

export const assignmentMutations = {
  assignAsset: (
    _: unknown,
    args: {
      assetId: string;
      employeeId: string;
      conditionAtAssign?: string | null;
      accessoriesJson?: string | null;
      buyoutPolicyId?: string | null;
      assignedValue?: number | null;
      paymentPlanMonths?: number | null;
      interestRate?: number | null;
    },
  ) =>
    assignAssetToEmployee(
      args.assetId,
      args.employeeId,
      args.conditionAtAssign ?? undefined,
      args.accessoriesJson ?? undefined,
      args.buyoutPolicyId ?? undefined,
      {
        assignedValue: args.assignedValue ?? undefined,
        paymentPlanMonths: args.paymentPlanMonths ?? undefined,
        interestRate: args.interestRate ?? undefined,
      },
    ),
  returnAsset: (
    _: unknown,
    args: { assetId: string; conditionAtReturn?: string | null },
  ) =>
    returnAssetFromEmployee(
      args.assetId,
      args.conditionAtReturn ?? undefined,
    ),
  transferAsset: (
    _: unknown,
    args: {
      assetId: string;
      fromEmployeeId: string;
      toEmployeeId: string;
      reason?: string;
      conditionNoted?: string;
    },
  ) =>
    transferAssetDb(
      args.assetId,
      args.fromEmployeeId,
      args.toEmployeeId,
      args.reason,
      args.conditionNoted,
    ),
};
