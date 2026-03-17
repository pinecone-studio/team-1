import { createNotification, markNotificationAsRead } from "@/db/notifications";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";

type CreateNotificationInput = Parameters<typeof createNotification>[0];

export const notificationMutations = {
  sendNotification: async (
    _: unknown,
    args: { input: CreateNotificationInput },
    ctx: GraphQLContext,
  ) => {
    const res = await createNotification(args.input);
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  markNotificationAsRead: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    await markNotificationAsRead(args.id);
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return true;
  },
};
