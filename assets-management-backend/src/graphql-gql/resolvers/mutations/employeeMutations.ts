import {
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
} from "@/db/employees";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";

type EmployeeInput = Record<string, unknown>;

export const employeeMutations = {
  createEmployee: async (_: unknown, args: { input: EmployeeInput }, ctx: GraphQLContext) => {
    const res = await createEmployee(args.input as never);
    await bumpCacheVersion(ctx, "employees:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  updateEmployee: async (_: unknown, args: { id: string; input: EmployeeInput }, ctx: GraphQLContext) => {
    const res = await updateEmployeeById(args.id, args.input as never);
    await bumpCacheVersion(ctx, "employees:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
  deleteEmployee: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    const res = await deleteEmployeeById(args.id);
    await bumpCacheVersion(ctx, "employees:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return res;
  },
};
