import {
  createMaintenanceTicket,
  updateMaintenanceTicket,
} from "@/db/maintenance";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";

type CreateMaintenanceTicketInput = Parameters<typeof createMaintenanceTicket>[0];

export const maintenanceMutations = {
  createMaintenanceTicket: async (
    _: unknown,
    args: CreateMaintenanceTicketInput,
    ctx: GraphQLContext,
  ) => {
    const res = await createMaintenanceTicket(args);
    await bumpCacheVersion(ctx, "maintenance:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  updateMaintenanceTicket: async (
    _: unknown,
    args: {
      id: string;
      status: string;
      repairCost?: number;
      resolvedAt?: number;
    },
    ctx: GraphQLContext,
  ) => {
    const res = await updateMaintenanceTicket(args.id, args);
    await bumpCacheVersion(ctx, "maintenance:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
};
