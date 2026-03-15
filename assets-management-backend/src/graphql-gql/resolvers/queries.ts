import { getEmployees, getEmployeeById } from "@/db/employees";
import { getAssignments, getAssignmentsByEmployee } from "@/db/assignments";
import {
  getPurchaseRequestById,
  getPurchaseRequests,
} from "@/db/purchaseRequests";
import { getRootCategories } from "@/db/categories";
import { getAssetHistory } from "@/db/assetHistory";
import { getDisposalRequest, getDisposalRequests } from "@/db/disposalRequests";
import { getOffboardingEventByEmployee } from "@/db/offboarding";
import { searchAssetsDB } from "@/db/assets/queries/searchAssets";
import {
  getITDashboardData,
  getEmployeeDashboardData,
  getFinanceDashboardData,
} from "@/db/dashboard";
import { getVendors } from "@/db/vendors";
import { getLocations } from "@/db/locations";
import { getDb } from "@/db/client";

import { eq, desc } from "drizzle-orm";
import { auditLogs, maintenanceTickets } from "@/schema";

export const Query = {
  employees: () => getEmployees(),
  employee: (_: unknown, args: { id: string }) => getEmployeeById(args.id),
  // assets, asset → resolved by domains/assets
  assignments: () => getAssignments(),
  employeeAssignments: (_: unknown, args: { employeeId: string }) =>
    getAssignmentsByEmployee(args.employeeId),
  purchaseRequests: (
    _: unknown,
    args: { status?: "PENDING" | "APPROVED" | "DECLINED" },
  ) => getPurchaseRequests(args.status),
  purchaseRequest: (_: unknown, args: { id: string }) =>
    getPurchaseRequestById(args.id),
  categories: () => getRootCategories(),
  assetHistory: (_: unknown, args: { assetId: string }) =>
    getAssetHistory(args.assetId),
  disposalRequest: (_: unknown, args: { id: string }) =>
    getDisposalRequest(args.id),
  disposalRequests: (_: unknown, args: { status?: string }) =>
    getDisposalRequests(args.status),
  offboardingEvent: (_: unknown, args: { employeeId: string }) =>
    getOffboardingEventByEmployee(args.employeeId),
  searchAssets: (
    _: unknown,
    args: { filter: any; pagination?: any; sort?: any },
  ) => searchAssetsDB(args.filter, args.pagination, args.sort),
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

    // If Super Admin, they might want to see someone specific's employee view too if employeeId is provided
    if (args.role === "SUPER_ADMIN" && args.employeeId) {
      result.employeeView = await getEmployeeDashboardData(args.employeeId);
    }

    return result;
  },
  vendors: () => getVendors(),
  locations: () => getLocations(),
  auditLogs: async (
    _: unknown,
    args: { tableName?: string; recordId?: string },
  ) => {
    const db = await getDb();
    let query = db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt));
    if (args.tableName) {
      query = query.where(eq(auditLogs.tableName, args.tableName)) as any;
    }
    if (args.recordId) {
      query = query.where(eq(auditLogs.recordId, args.recordId)) as any;
    }
    return query.all();
  },
  maintenanceTickets: async (_: unknown, args: { status?: string }) => {
    const db = await getDb();
    let query = db
      .select()
      .from(maintenanceTickets)
      .orderBy(desc(maintenanceTickets.createdAt));
    if (args.status) {
      query = query.where(eq(maintenanceTickets.status, args.status)) as any;
    }
    return query.all();
  },
};
