import { getAssignments, getAssignmentsByEmployee } from "@/db/assignments";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const assignmentQueries = {
  assignments: (_: unknown, __: unknown, ctx: GraphQLContext) =>
    cachedJson(ctx, {
      versionKey: "assignments:cache_version",
      keyParts: ["assignments:list"],
      ttlSeconds: 60,
      compute: () => getAssignments(),
    }),
  employeeAssignments: (
    _: unknown,
    args: { employeeId: string; status?: string },
    ctx: GraphQLContext,
  ) =>
    cachedJson(ctx, {
      versionKey: "assignments:cache_version",
      keyParts: [
        "assignments:byEmployee",
        `emp_${args.employeeId}`,
        `status_${args.status ?? ""}`,
      ],
      ttlSeconds: 60,
      compute: () => getAssignmentsByEmployee(args.employeeId, args.status),
    }),
};
