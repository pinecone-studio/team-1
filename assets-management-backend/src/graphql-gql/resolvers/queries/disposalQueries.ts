import { getDisposalRequest, getDisposalRequests } from "@/db/disposalRequests";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const disposalQueries = {
  disposalRequest: (_: unknown, args: { id: string }) =>
    getDisposalRequest(args.id),
  disposalRequests: (_: unknown, args: { status?: string }, ctx: GraphQLContext) =>
    cachedJson(ctx, {
      versionKey: "disposals:cache_version",
      keyParts: ["disposals:list", `status_${args.status ?? ""}`],
      ttlSeconds: 120,
      compute: () => getDisposalRequests(args.status),
    }),
};
