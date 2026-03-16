import {
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
} from "@/db/employees";

type EmployeeInput = Record<string, unknown>;

export const employeeMutations = {
  createEmployee: (_: unknown, args: { input: EmployeeInput }) =>
    createEmployee(args.input as never),
  updateEmployee: (_: unknown, args: { id: string; input: EmployeeInput }) =>
    updateEmployeeById(args.id, args.input as never),
  deleteEmployee: (_: unknown, args: { id: string }) =>
    deleteEmployeeById(args.id),
};
