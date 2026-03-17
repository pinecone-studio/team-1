import {
  getITDashboardData,
  getEmployeeDashboardData,
  getFinanceDashboardData,
} from "@/db/dashboard";
import type { GraphQLContext } from "@/graphql-gql/context";
import { cachedJson } from "@/graphql-gql/cache/queryCache";

export const dashboardQueries = {
  dashboard: async (
    _: unknown,
    args: { role: string; employeeId?: string },
    ctx: GraphQLContext,
  ) => {
    return cachedJson(ctx, {
      versionKey: "dashboard:cache_version",
      keyParts: ["dashboard", `role_${args.role}`, `emp_${args.employeeId ?? ""}`],
      ttlSeconds: 60,
      compute: async () => {
        const result: Record<string, unknown> = {};

        if (args.role === "IT_ADMIN" || args.role === "SUPER_ADMIN") {
          result.itView = await getITDashboardData();
        }

        if (args.role === "EMPLOYEE") {
          if (!args.employeeId)
            throw new Error("Employee ID required for employee view");
          result.employeeView = await getEmployeeDashboardData(args.employeeId);
        }

        if (args.role === "FINANCE" || args.role === "SUPER_ADMIN") {
          result.financeView = await getFinanceDashboardData();
        }

        if (args.role === "SUPER_ADMIN" && args.employeeId) {
          result.employeeView = await getEmployeeDashboardData(args.employeeId);
        }

        return result;
      },
    });
  },
};
