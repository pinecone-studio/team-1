import { getAssetById } from "@/db/assets/queries";
import { getLocationPath } from "@/db/locations";
import { getEmployeeById } from "@/db/employees";
import { getCategoryById, getSubcategories } from "@/db/categories";
import type { AssetTimelineEvent } from "@/db/assetHistory";
import type { DisposalRequest } from "@/db/disposalRequests";
import type { OffboardingEvent } from "@/db/offboarding";
import {
  getFinancingByAssignment,
  getPaymentsByFinancing,
  getBuyoutPolicyById,
} from "@/db/assignments";
import { and, desc, eq, isNull } from "drizzle-orm";
import { getDb } from "@/db/client";
import { assignments, categories } from "@/schema";

const safeNumber = (val: any) => {
  if (val === null || val === undefined || val === "") return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

const safeFloat = (val: any) => {
  if (val === null || val === undefined || val === "") return null;
  const num = parseFloat(val.toString());
  return isNaN(num) ? null : num;
};

export const typeResolvers = {
  Asset: {
    assignedTo: async (asset: { id: string }) => {
      const db = await getDb();
      const row = await db
        .select({ employeeId: assignments.employeeId })
        .from(assignments)
        .where(
          and(
            eq(assignments.assetId, asset.id),
            isNull(assignments.returnedAt),
          ),
        )
        .orderBy(desc(assignments.assignedAt))
        .limit(1)
        .get();
      return row?.employeeId ?? null;
    },
    status: async (asset: { id: string; status?: string | null }) => {
      const dbStatus = asset.status ?? "AVAILABLE";
      if (
        dbStatus === "PENDING_DISPOSAL" ||
        dbStatus === "DISPOSED" ||
        dbStatus === "DISPOSAL_REQUESTED"
      ) {
        return dbStatus;
      }
      const db = await getDb();
      const row = await db
        .select({ status: assignments.status })
        .from(assignments)
        .where(
          and(
            eq(assignments.assetId, asset.id),
            isNull(assignments.returnedAt),
          ),
        )
        .orderBy(desc(assignments.assignedAt))
        .limit(1)
        .get();
      if (row?.status === "ACTIVE") return "ASSIGNED";
      return dbStatus;
    },
    category: async (asset: {
      categoryId?: string | null;
    }) => {
      const id = asset.categoryId ?? "";
      if (!id) return "";
      const cat = await getCategoryById(id);
      return cat?.name ?? id;
    },
    locationPath: (asset: { locationId?: string | null }) =>
      getLocationPath(asset.locationId),
    purchaseCost: (asset: any) => safeNumber(asset.purchaseCost),
    currentBookValue: (asset: any) => safeNumber(asset.currentBookValue),
    purchaseDate: (asset: any) => safeNumber(asset.purchaseDate),
  },
  Assignment: {
    employee: (assignment: { employeeId: string }) =>
      getEmployeeById(assignment.employeeId),
    asset: (assignment: { assetId: string }) =>
      getAssetById(assignment.assetId),
    assignedAt: (assignment: any) => safeNumber(assignment.assignedAt),
    returnedAt: (assignment: any) => safeNumber(assignment.returnedAt),
    buyoutPolicy: (assignment: { buyoutPolicyId?: string }) =>
      assignment.buyoutPolicyId
        ? getBuyoutPolicyById(assignment.buyoutPolicyId)
        : null,
    financing: (assignment: { id: string }) =>
      getFinancingByAssignment(assignment.id),
    requestedBy: (assignment: { requestedByEmployeeId?: string | null }) =>
      assignment.requestedByEmployeeId
        ? getEmployeeById(assignment.requestedByEmployeeId)
        : null,
  },
  AssignmentBuyoutPolicy: {
    category: async (policy: { categoryId?: string }) => {
      if (!policy.categoryId) return null;
      const db = await getDb();
      return db
        .select()
        .from(categories)
        .where(eq(categories.id, policy.categoryId))
        .get();
    },
  },
  AssignmentFinancing: {
    assignedValue: (f: any) => safeNumber(f.assignedValue),
    paymentPlanMonths: (f: any) => safeNumber(f.paymentPlanMonths),
    interestRate: (f: any) => safeFloat(f.interestRate),
    monthlyPayment: (f: any) => safeNumber(f.monthlyPayment),
    totalPayment: (f: any) => safeNumber(f.totalPayment),
    payments: (f: { id: string }) => getPaymentsByFinancing(f.id),
  },
  AssignmentPayment: {
    amount: (p: any) => safeNumber(p.amount),
    dueDate: (p: any) => safeNumber(p.dueDate),
    paidAt: (p: any) => safeNumber(p.paidAt),
    createdAt: (p: any) => safeNumber(p.createdAt),
  },
  Category: {
    subcategories: (category: { id: string }) => getSubcategories(category.id),
  },
  AssetTimelineEvent: {
    actor: (event: AssetTimelineEvent) =>
      event.actorId ? getEmployeeById(event.actorId) : null,
  },
  DisposalRequest: {
    asset: (dr: DisposalRequest) => getAssetById(dr.assetId),
    requestedBy: (dr: DisposalRequest) => getEmployeeById(dr.requestedBy),
    itApprovedBy: (dr: DisposalRequest) =>
      dr.itApprovedBy ? getEmployeeById(dr.itApprovedBy) : null,
    financeApprovedBy: (dr: DisposalRequest) =>
      dr.financeApprovedBy ? getEmployeeById(dr.financeApprovedBy) : null,
    rejectedBy: (dr: DisposalRequest) =>
      dr.rejectedBy ? getEmployeeById(dr.rejectedBy) : null,
  },
  OffboardingEvent: {
    employee: (oe: OffboardingEvent) => getEmployeeById(oe.employeeId),
    initiatedBy: (oe: OffboardingEvent) => getEmployeeById(oe.initiatedBy),
  },
  MaintenanceTicket: {
    repairCost: (mt: any) => safeNumber(mt.repairCost),
  },
  PurchaseOrder: {
    totalCost: (po: any) => safeNumber(po.totalCost) ?? 0,
  },
  PurchaseRequest: {
    purchaseCost: (pr: any) => safeNumber(pr.purchaseCost),
    purchaseDate: (pr: any) => safeNumber(pr.purchaseDate),
  },
};
