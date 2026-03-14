import { Mutation } from "./mutations";
import { Query } from "./queries";
import { getAssetById } from "@/db/assets/queries";
import { getEmployeeById } from "@/db/employees";
import { getSubcategories } from "@/db/categories";
import type { AssetTimelineEvent } from "@/db/assetHistory";
import type { DisposalRequest } from "@/db/disposalRequests";
import type { OffboardingEvent } from "@/db/offboarding";
import { getDb } from "@/db/client";

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


export const resolvers = {
  Query,
  Mutation,
  Asset: {
    category: (asset: { subCategoryId?: string | null; categoryId?: string | null }) =>
      asset.subCategoryId ?? asset.categoryId ?? "",
    purchaseCost: (asset: any) => safeNumber(asset.purchaseCost),
    currentBookValue: (asset: any) => safeNumber(asset.currentBookValue),
    purchaseDate: (asset: any) => safeNumber(asset.purchaseDate),
  },
  Assignment: {
    employee: (assignment: { employeeId: string }) =>
      getEmployeeById(assignment.employeeId),
    asset: (assignment: { assetId: string }) => getAssetById(assignment.assetId),
    assignedAt: (assignment: any) => safeNumber(assignment.assignedAt),
    returnedAt: (assignment: any) => safeNumber(assignment.returnedAt),
    assignedValue: (assignment: any) => safeNumber(assignment.assignedValue),
    paymentPlanMonths: (assignment: any) => safeNumber(assignment.paymentPlanMonths),
    interestRate: (assignment: any) => safeFloat(assignment.interestRate),
    monthlyPayment: (assignment: any) => safeNumber(assignment.monthlyPayment),
    totalPayment: (assignment: any) => safeNumber(assignment.totalPayment),
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


