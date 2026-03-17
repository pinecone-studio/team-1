import {
  getOffboardingEventByEmployee,
  getPendingReturnRequestsByEventId,
} from "@/db/offboarding";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const offboardingQueries = {
  offboardingEvent: (_: unknown, args: { employeeId: string }, ctx: GraphQLContext) =>
    cachedJson(ctx, {
      versionKey: "offboarding:cache_version",
      keyParts: ["offboarding:event", `emp_${args.employeeId}`],
      ttlSeconds: 60,
      compute: () => getOffboardingEventByEmployee(args.employeeId),
    }),
  pendingReturnRequests: (
    _: unknown,
    args: { offboardingEventId: string },
    ctx: GraphQLContext,
  ) =>
    cachedJson(ctx, {
      versionKey: "offboarding:cache_version",
      keyParts: ["offboarding:pendingReturns", `event_${args.offboardingEventId}`],
      ttlSeconds: 60,
      compute: () => getPendingReturnRequestsByEventId(args.offboardingEventId),
    }),
};
