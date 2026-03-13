import { getAssets, getAssetById } from "@/db/assets/queries";
import { getEmployees, getEmployeeById } from "@/db/employees";

export const Query = {
  employees: () => getEmployees(),
  employee: (_: unknown, args: { id: string }) => getEmployeeById(args.id),
  assets: () => getAssets(),
  asset: (_: unknown, args: { id: string }) => getAssetById(args.id),
};

