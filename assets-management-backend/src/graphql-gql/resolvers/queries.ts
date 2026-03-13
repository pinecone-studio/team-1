import { getAssets, getAssetById } from "@/db/assets/queries";
import { getEmployees, getEmployeeById } from "@/db/employees";
import { getAssignments, getAssignmentsByEmployee } from "@/db/assignments";
import {
  getPurchaseRequestById,
  getPurchaseRequests,
} from "@/db/purchaseRequests";
import { getRootCategories } from "@/db/categories";

export const Query = {
  employees: () => getEmployees(),
  employee: (_: unknown, args: { id: string }) => getEmployeeById(args.id),
  assets: (
    _: unknown,
    args: { office?: string; categoryIds?: string[]; subCategoryIds?: string[] },
  ) => {
    const rawOffice = args.office?.trim();
    const defaultOffice = "Гурван гол";
    const normalizedOffice = rawOffice
      ? rawOffice
          .replace(/^(Gurwan Gol|Gurvan Gol)/i, "Гурван гол")
          .replace(/\s+\d+$/, "")
          .trim()
      : defaultOffice;
    return getAssets(normalizedOffice, args.categoryIds, args.subCategoryIds);
  },
  asset: (_: unknown, args: { id: string }) => getAssetById(args.id),
  assignments: () => getAssignments(),
  employeeAssignments: (_: unknown, args: { employeeId: string }) =>
    getAssignmentsByEmployee(args.employeeId),
  purchaseRequests: (_: unknown, args: { status?: "PENDING" | "APPROVED" | "DECLINED" }) =>
    getPurchaseRequests(args.status),
  purchaseRequest: (_: unknown, args: { id: string }) =>
    getPurchaseRequestById(args.id),
  categories: () => getRootCategories(),
};
