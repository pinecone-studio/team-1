import {
  adminOverrideDisposal,
  adminOverridePurchase,
  adminOverrideOffboarding,
} from "@/db/admin";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";
import { bumpAssetsCacheVersion } from "@/graphql-gql/cache/assetsListCache";

export const adminMutations = {
  adminOverrideDisposal: (
    _: unknown,
    args: { id: string; status: string },
    ctx: GraphQLContext,
  ) =>
    adminOverrideDisposal(args.id, args.status, "SUPER_ADMIN").then(async (res) => {
      await bumpCacheVersion(ctx, "disposals:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
  adminOverridePurchase: (
    _: unknown,
    args: { token: string; status: string },
    ctx: GraphQLContext,
  ) =>
    adminOverridePurchase(args.token, args.status, "SUPER_ADMIN").then(async (res) => {
      await bumpCacheVersion(ctx, "purchase:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      await bumpAssetsCacheVersion(ctx);
      return res;
    }),
  adminOverrideOffboarding: (
    _: unknown,
    args: { id: string; status: string },
    ctx: GraphQLContext,
  ) =>
    adminOverrideOffboarding(args.id, args.status, "SUPER_ADMIN").then(async (res) => {
      await bumpCacheVersion(ctx, "offboarding:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return res;
    }),
};
