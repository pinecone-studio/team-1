import { createVendor, updateVendor, deleteVendor } from "@/db/vendors";
import { createLocation, updateLocation, deleteLocation } from "@/db/locations";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/db/categories";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";

type CreateVendorInput = Parameters<typeof createVendor>[0];
type UpdateVendorInput = Parameters<typeof updateVendor>[1];
type CreateLocationInput = Parameters<typeof createLocation>[0];
type UpdateLocationInput = Parameters<typeof updateLocation>[1];

export const catalogMutations = {
  createVendor: async (
    _: unknown,
    args: { input: CreateVendorInput },
    ctx: GraphQLContext,
  ) => {
    const res = await createVendor(args.input);
    await bumpCacheVersion(ctx, "catalog:cache_version");
    return res;
  },
  updateVendor: async (
    _: unknown,
    args: { id: string; input: UpdateVendorInput },
    ctx: GraphQLContext,
  ) => {
    const res = await updateVendor(args.id, args.input);
    await bumpCacheVersion(ctx, "catalog:cache_version");
    return res;
  },
  deleteVendor: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    const res = await deleteVendor(args.id);
    await bumpCacheVersion(ctx, "catalog:cache_version");
    return res;
  },

  createLocation: async (
    _: unknown,
    args: { input: CreateLocationInput },
    ctx: GraphQLContext,
  ) => {
    const res = await createLocation(args.input);
    await bumpCacheVersion(ctx, "catalog:cache_version");
    return res;
  },
  updateLocation: async (
    _: unknown,
    args: { id: string; input: UpdateLocationInput },
    ctx: GraphQLContext,
  ) => {
    const res = await updateLocation(args.id, args.input);
    await bumpCacheVersion(ctx, "catalog:cache_version");
    return res;
  },
  deleteLocation: async (
    _: unknown,
    args: { id: string },
    ctx: GraphQLContext,
  ) => {
    const res = await deleteLocation(args.id);
    await bumpCacheVersion(ctx, "catalog:cache_version");
    return res;
  },

  createCategory: (
    _: unknown,
    args: { name: string; parentId?: string },
    ctx: GraphQLContext,
  ) =>
    createCategory(args.name, args.parentId).then(async (res) => {
      await bumpCacheVersion(ctx, "catalog:cache_version");
      return res;
    }),
  updateCategory: (
    _: unknown,
    args: { id: string; name?: string; parentId?: string },
    ctx: GraphQLContext,
  ) =>
    updateCategory(args.id, args.name, args.parentId).then(async (res) => {
      await bumpCacheVersion(ctx, "catalog:cache_version");
      return res;
    }),
  deleteCategory: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    const res = await deleteCategory(args.id);
    await bumpCacheVersion(ctx, "catalog:cache_version");
    return res;
  },
};
