import { getVendors } from "@/db/vendors";
import { getLocations } from "@/db/locations";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const catalogQueries = {
  vendors: (_: unknown, __: unknown, ctx: GraphQLContext) =>
    cachedJson(ctx, {
      versionKey: "catalog:cache_version",
      keyParts: ["vendors:list"],
      ttlSeconds: 600,
      compute: () => getVendors(),
    }),
  locations: (_: unknown, __: unknown, ctx: GraphQLContext) =>
    cachedJson(ctx, {
      versionKey: "catalog:cache_version",
      keyParts: ["locations:list"],
      ttlSeconds: 600,
      compute: () => getLocations(),
    }),
};
