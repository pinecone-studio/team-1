import { getAssetById, getAssetsByIds } from "@/db/assets/queries";
import { getLocationPath } from "@/db/locations";
import { getEmployeeById } from "@/db/employees";
import { getCategoryById, getSubcategories } from "@/db/categories";
import type { AssetTimelineEvent } from "@/db/assetHistory";
import type { DisposalRequest } from "@/db/disposalRequests";
import { getPendingReturnRequestsByEventId } from "@/db/offboarding";
import type { OffboardingEvent } from "@/db/offboarding";
import {
  getFinancingByAssignment,
  getPaymentsByFinancing,
  getBuyoutPolicyById,
} from "@/db/assignments";
import { and, desc, eq, isNull } from "drizzle-orm";
import { getDb } from "@/db/client";
import { assignments, categories } from "@/schema";

const safeNumber = (val: unknown) => {
  if (val === null || val === undefined || val === "") return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

const safeFloat = (val: unknown) => {
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
        dbStatus === "DISPOSAL_REQUESTED" ||
        dbStatus === "RETURNING" ||
        dbStatus === "REPAIR_REQUESTED" ||
        dbStatus === "IN_REPAIR"
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
    purchaseCost: (asset: unknown) =>
      safeNumber((asset as { purchaseCost?: unknown }).purchaseCost),
    currentBookValue: (asset: unknown) =>
      safeNumber((asset as { currentBookValue?: unknown }).currentBookValue),
    purchaseDate: (asset: unknown) =>
      safeNumber((asset as { purchaseDate?: unknown }).purchaseDate),
  },
  Assignment: {
    employee: (assignment: { employeeId: string }) =>
      getEmployeeById(assignment.employeeId),
    asset: (assignment: { assetId: string }) =>
      getAssetById(assignment.assetId),
    assignedAt: (assignment: unknown) =>
      safeNumber((assignment as { assignedAt?: unknown }).assignedAt),
    returnedAt: (assignment: unknown) =>
      safeNumber((assignment as { returnedAt?: unknown }).returnedAt),
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
    assignedValue: (f: unknown) =>
      safeNumber((f as { assignedValue?: unknown }).assignedValue),
    paymentPlanMonths: (f: unknown) =>
      safeNumber((f as { paymentPlanMonths?: unknown }).paymentPlanMonths),
    interestRate: (f: unknown) =>
      safeFloat((f as { interestRate?: unknown }).interestRate),
    monthlyPayment: (f: unknown) =>
      safeNumber((f as { monthlyPayment?: unknown }).monthlyPayment),
    totalPayment: (f: unknown) =>
      safeNumber((f as { totalPayment?: unknown }).totalPayment),
    payments: (f: { id: string }) => getPaymentsByFinancing(f.id),
  },
  AssignmentPayment: {
    amount: (p: unknown) => safeNumber((p as { amount?: unknown }).amount),
    dueDate: (p: unknown) => safeNumber((p as { dueDate?: unknown }).dueDate),
    paidAt: (p: unknown) => safeNumber((p as { paidAt?: unknown }).paidAt),
    createdAt: (p: unknown) =>
      safeNumber((p as { createdAt?: unknown }).createdAt),
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
    assetsToReturn: async (oe: OffboardingEvent) => {
      try {
        const ids = JSON.parse(oe.assetIdsJson || "[]") as string[];
        return ids.length ? await getAssetsByIds(ids) : [];
      } catch {
        return [];
      }
    },
    pendingReturnRequests: (oe: OffboardingEvent) =>
      getPendingReturnRequestsByEventId(oe.id),
  },
  OffboardingReturnRequest: {
    asset: (r: { assetId: string }) => getAssetById(r.assetId),
    employee: (r: { employeeId: string }) => getEmployeeById(r.employeeId),
  },
  DataWipeTask: {},
  MaintenanceTicket: {
    repairCost: (mt: unknown) =>
      safeNumber((mt as { repairCost?: unknown }).repairCost),
  },
  PurchaseOrder: {
    totalCost: (po: unknown) =>
      safeNumber((po as { totalCost?: unknown }).totalCost) ?? 0,
  },
  PurchaseRequest: {
    purchaseCost: (pr: unknown) =>
      safeNumber((pr as { purchaseCost?: unknown }).purchaseCost),
    purchaseDate: (pr: unknown) =>
      safeNumber((pr as { purchaseDate?: unknown }).purchaseDate),
  },
};
