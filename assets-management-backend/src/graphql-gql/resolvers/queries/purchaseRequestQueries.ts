import {
  getPurchaseRequestById,
  getPurchaseRequests,
} from "@/db/purchaseRequests";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const purchaseRequestQueries = {
  purchaseRequests: (
    _: unknown,
    args: { status?: "PENDING" | "APPROVED" | "DECLINED" },
    ctx: GraphQLContext,
  ) =>
    cachedJson(ctx, {
      versionKey: "purchase:cache_version",
      keyParts: ["purchaseRequests:list", `status_${args.status ?? ""}`],
      ttlSeconds: 60,
      compute: () => getPurchaseRequests(args.status),
    }),
  purchaseRequest: (_: unknown, args: { id: string }) =>
    getPurchaseRequestById(args.id),
};
