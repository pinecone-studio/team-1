import {
  createAsset,
  deleteAndArchiveAsset,
  getAssetById,
  getAssets,
  updateAssetById,
  type AssetCreate,
  type AssetUpdate,
} from "@/db/assets";
import {
  createEmployee as createEmployeeInDb,
  deleteEmployeeById,
  getEmployeeById,
  getEmployees,
  updateEmployeeById,
  type EmployeeCreate,
  type EmployeeUpdate,
} from "@/db/employees";

export const resolvers = {
  Query: {
    employees: () => getEmployees(),
    employee: (_: unknown, args: { id: string }) => getEmployeeById(args.id),
    assets: () => getAssets(),
    asset: (_: unknown, args: { id: string }) => getAssetById(args.id),
  },
  Mutation: {
    createEmployee: (_: unknown, args: { input: EmployeeCreate }) =>
      createEmployeeInDb(args.input),
    updateEmployee: (_: unknown, args: { id: string; input: EmployeeUpdate }) =>
      updateEmployeeById(args.id, args.input),
    deleteEmployee: async (_: unknown, args: { id: string }) => {
      return deleteEmployeeById(args.id);
    },
    createAsset: (_: unknown, args: { input: AssetCreate }) =>
      createAsset(args.input),
    updateAsset: (_: unknown, args: { id: string; input: AssetUpdate }) =>
      updateAssetById(args.id, args.input),
    deleteAsset: async (_: unknown, args: { id: string }) => {
      return await deleteAndArchiveAsset(args.id);
    },
  },
};
