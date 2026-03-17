import { getRootCategories } from "@/db/categories";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const categoryQueries = {
  categories: (_: unknown, __: unknown, ctx: GraphQLContext) =>
    cachedJson(ctx, {
      versionKey: "catalog:cache_version",
      keyParts: ["categories:list"],
      ttlSeconds: 600,
      compute: () => getRootCategories(),
    }),
};
