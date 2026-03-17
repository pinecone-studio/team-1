import {
  assignAssetToEmployee,
  returnAssetFromEmployee,
  transferAsset as transferAssetDb,
  updateAssignmentStatus as updateAssignmentStatusDb,
} from "@/db/assignments";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";
import { bumpAssetsCacheVersion } from "@/graphql-gql/cache/assetsListCache";

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
      requestedByEmployeeId?: string | null;
    },
    ctx: GraphQLContext,
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
      args.requestedByEmployeeId ?? undefined,
    ).then(async (res) => {
      await bumpCacheVersion(ctx, "assignments:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      await bumpAssetsCacheVersion(ctx);
      return res;
    }),
  returnAsset: (
    _: unknown,
    args: { assetId: string; conditionAtReturn?: string | null },
    ctx: GraphQLContext,
  ) =>
    returnAssetFromEmployee(
      args.assetId,
      args.conditionAtReturn ?? undefined,
    ).then(async (res) => {
      await bumpCacheVersion(ctx, "assignments:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      await bumpAssetsCacheVersion(ctx);
      return res;
    }),
  transferAsset: (
    _: unknown,
    args: {
      assetId: string;
      fromEmployeeId: string;
      toEmployeeId: string;
      reason?: string;
      conditionNoted?: string;
    },
    ctx: GraphQLContext,
  ) =>
    transferAssetDb(
      args.assetId,
      args.fromEmployeeId,
      args.toEmployeeId,
      args.reason,
      args.conditionNoted,
    ).then(async (res) => {
      await bumpCacheVersion(ctx, "assignments:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      await bumpAssetsCacheVersion(ctx);
      return res;
    }),
  updateAssignmentStatus: (
    _: unknown,
    args: { assignmentId: string; status: string },
    ctx: GraphQLContext,
  ) =>
    updateAssignmentStatusDb(args.assignmentId, args.status).then(async (res) => {
      await bumpCacheVersion(ctx, "assignments:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
};
