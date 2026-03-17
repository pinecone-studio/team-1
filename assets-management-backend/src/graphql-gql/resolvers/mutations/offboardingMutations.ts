import {
  startOffboarding,
  completeAssetReturn,
  submitReturnRequest,
  approveReturnRequest,
  requestRepair,
} from "@/db/offboarding";
import { createDataWipeTask } from "@/db/dataWipeTasks/mutations/createDataWipeTask";

export const offboardingMutations = {
  startOffboarding: (
    _: unknown,
    args: { employeeId: string; initiatedBy: string },
  ) => startOffboarding(args.employeeId, args.initiatedBy),
  submitReturnRequest: (
    _: unknown,
    args: {
      assetId: string;
      employeeId: string;
      condition: string;
      conditionDetail?: string | null;
      photoR2Key?: string | null;
    },
  ) =>
    submitReturnRequest(args.assetId, args.employeeId, args.condition, {
      conditionDetail: args.conditionDetail,
      photoR2Key: args.photoR2Key,
    }),
  approveReturnRequest: (
    _: unknown,
    args: {
      returnRequestId: string;
      conditionHr: string;
      inspectedBy: string;
    },
  ) =>
    approveReturnRequest(
      args.returnRequestId,
      args.conditionHr,
      args.inspectedBy,
    ),
  requestRepair: (
    _: unknown,
    args: {
      returnRequestId: string;
      conditionHr: string;
      photoR2Key?: string | null;
      inspectedBy: string;
    },
  ) =>
    requestRepair(
      args.returnRequestId,
      args.conditionHr,
      args.inspectedBy,
      args.photoR2Key,
    ),
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
  createDataWipeTask: (_: unknown, args: { assetId: string }) =>
    createDataWipeTask(args.assetId),
};
