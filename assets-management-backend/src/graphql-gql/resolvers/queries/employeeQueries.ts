import { getEmployees, getEmployeeById } from "@/db/employees";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const employeeQueries = {
  employees: (_: unknown, __: unknown, ctx: GraphQLContext) =>
    cachedJson(ctx, {
      versionKey: "employees:cache_version",
      keyParts: ["employees:list"],
      ttlSeconds: 300,
      compute: () => getEmployees(),
    }),
  employee: (_: unknown, args: { id: string }) => getEmployeeById(args.id),
};
