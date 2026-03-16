import {
  getITDashboardData,
  getEmployeeDashboardData,
  getFinanceDashboardData,
} from "@/db/dashboard";

export const dashboardQueries = {
  dashboard: async (
    _: unknown,
    args: { role: string; employeeId?: string },
  ) => {
    const result: any = {};

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
};
