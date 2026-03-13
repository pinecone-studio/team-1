import { Mutation } from "./mutations";
import { Query } from "./queries";
import { getAssetById } from "@/db/assets/queries";
import { getEmployeeById } from "@/db/employees";
import { getSubcategories } from "@/db/categories";

export const resolvers = {
  Query,
  Mutation,
  Asset: {
    category: (asset: { subCategoryId?: string | null; categoryId?: string | null }) =>
      asset.subCategoryId ?? asset.categoryId ?? "",
  },
  Assignment: {
    employee: (assignment: { employeeId: string }) =>
      getEmployeeById(assignment.employeeId),
    asset: (assignment: { assetId: string }) => getAssetById(assignment.assetId),
  },
  Category: {
    subcategories: (category: { id: string }) => getSubcategories(category.id),
  },
};
