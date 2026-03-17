import {
  startOffboarding,
  completeAssetReturn,
  submitReturnRequest,
  approveReturnRequest,
  requestRepair,
} from "@/db/offboarding";
import { createDataWipeTask } from "@/db/dataWipeTasks/mutations/createDataWipeTask";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";

export const offboardingMutations = {
  startOffboarding: (
    _: unknown,
    args: { employeeId: string; initiatedBy: string },
    ctx: GraphQLContext,
  ) =>
    startOffboarding(args.employeeId, args.initiatedBy).then(async (res) => {
      await bumpCacheVersion(ctx, "offboarding:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
  submitReturnRequest: (
    _: unknown,
    args: {
      assetId: string;
      employeeId: string;
      condition: string;
      conditionDetail?: string | null;
      photoR2Key?: string | null;
    },
    ctx: GraphQLContext,
  ) =>
    submitReturnRequest(args.assetId, args.employeeId, args.condition, {
      conditionDetail: args.conditionDetail,
      photoR2Key: args.photoR2Key,
    }).then(async (res) => {
      await bumpCacheVersion(ctx, "offboarding:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
  approveReturnRequest: (
    _: unknown,
    args: {
      returnRequestId: string;
      conditionHr: string;
      inspectedBy: string;
    },
    ctx: GraphQLContext,
  ) =>
    approveReturnRequest(
      args.returnRequestId,
      args.conditionHr,
      args.inspectedBy,
    ).then(async (res) => {
      await bumpCacheVersion(ctx, "offboarding:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
  requestRepair: (
    _: unknown,
    args: {
      returnRequestId: string;
      conditionHr: string;
      photoR2Key?: string | null;
      inspectedBy: string;
    },
    ctx: GraphQLContext,
  ) =>
    requestRepair(
      args.returnRequestId,
      args.conditionHr,
      args.inspectedBy,
      args.photoR2Key,
    ).then(async (res) => {
      await bumpCacheVersion(ctx, "offboarding:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
  completeAssetReturn: (
    _: unknown,
    args: {
      assetId: string;
      employeeId: string;
      condition: string;
      inspectedBy: string;
    },
    ctx: GraphQLContext,
  ) =>
    completeAssetReturn(
      args.assetId,
      args.employeeId,
      args.condition,
      args.inspectedBy,
    ).then(async (res) => {
      await bumpCacheVersion(ctx, "offboarding:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
  createDataWipeTask: (_: unknown, args: { assetId: string }, ctx: GraphQLContext) =>
    createDataWipeTask(args.assetId).then(async (res) => {
      await bumpCacheVersion(ctx, "offboarding:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
};
