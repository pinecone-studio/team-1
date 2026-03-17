import {
  requestDisposal as requestDisposalDb,
  approveDisposalRequest,
  rejectDisposalRequest,
  uploadDataWipeCertificate as uploadDataWipeCertificateDb,
  completeDisposal as completeDisposalDb,
} from "@/db/disposalRequests";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";

export const disposalMutations = {
  requestDisposal: async (
    _: unknown,
    args: {
      assetId: string;
      requestedBy: string;
      method: string;
      reason?: string | null;
    },
    ctx: GraphQLContext,
  ) => {
    const res = await requestDisposalDb(
      args.assetId,
      args.requestedBy,
      args.method,
      args.reason ?? undefined,
    );
    await bumpCacheVersion(ctx, "disposals:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  approveDisposal: async (
    _: unknown,
    args: {
      id: string;
      approvedBy: string;
      stage: "IT_APPROVED" | "FINANCE_APPROVED";
    },
    ctx: GraphQLContext,
  ) => {
    const res = await approveDisposalRequest(args.id, args.approvedBy, args.stage);
    await bumpCacheVersion(ctx, "disposals:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  rejectDisposal: async (
    _: unknown,
    args: { id: string; rejectedBy: string; reason?: string | null },
    ctx: GraphQLContext,
  ) => {
    const res = await rejectDisposalRequest(args.id, args.rejectedBy, args.reason ?? undefined);
    await bumpCacheVersion(ctx, "disposals:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  uploadDataWipeCertificate: async (
    _: unknown,
    args: { id: string; fileKey: string; uploadedBy: string },
    ctx: GraphQLContext,
  ) => {
    const res = await uploadDataWipeCertificateDb(args.id, args.fileKey, args.uploadedBy);
    await bumpCacheVersion(ctx, "disposals:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  completeDisposal: async (
    _: unknown,
    args: {
      id: string;
      certifiedBy: string;
      writeOffValue?: number | null;
      recipient?: string | null;
    },
    ctx: GraphQLContext,
  ) => {
    const res = await completeDisposalDb(
      args.id,
      args.certifiedBy,
      args.writeOffValue ?? undefined,
      args.recipient ?? undefined,
    );
    await bumpCacheVersion(ctx, "disposals:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
};
