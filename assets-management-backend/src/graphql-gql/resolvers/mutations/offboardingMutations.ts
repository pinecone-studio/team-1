import { startOffboarding, completeAssetReturn } from "@/db/offboarding";

export const offboardingMutations = {
  startOffboarding: (
    _: unknown,
    args: { employeeId: string; initiatedBy: string },
  ) => startOffboarding(args.employeeId, args.initiatedBy),
  completeAssetReturn: (
    _: unknown,
    args: {
      assetId: string;
      employeeId: string;
      condition: string;
      inspectedBy: string;
    },
  ) =>
    completeAssetReturn(
      args.assetId,
      args.employeeId,
      args.condition,
      args.inspectedBy,
    ),
};
