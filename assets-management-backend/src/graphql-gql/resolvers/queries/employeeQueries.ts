import { getEmployees, getEmployeeById } from "@/db/employees";

export const employeeQueries = {
  employees: () => getEmployees(),
  employee: (_: unknown, args: { id: string }) => getEmployeeById(args.id),
};
