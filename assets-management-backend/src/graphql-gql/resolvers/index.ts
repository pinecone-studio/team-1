import { mergeResolvers } from "@graphql-tools/merge";
import { Mutation } from "./mutations";
import { Query } from "./queries";
import { assetResolvers } from "./domains/assets";
import { getAssetById } from "@/db/assets/queries";
import { getEmployeeById } from "@/db/employees";
import { getSubcategories } from "@/db/categories";
import type { AssetTimelineEvent } from "@/db/assetHistory";
import type { DisposalRequest } from "@/db/disposalRequests";
import type { OffboardingEvent } from "@/db/offboarding";
import {
  getFinancingByAssignment,
  getPaymentsByFinancing,
  getBuyoutPolicyById,
} from "@/db/assignments";

import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { categories } from "@/schema";

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

const rootResolvers = {
  Query,
  Mutation,
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

export const resolvers = mergeResolvers([rootResolvers, assetResolvers]);
