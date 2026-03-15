import { getAssignments, getAssignmentsByEmployee } from "@/db/assignments";

export const assignmentQueries = {
  assignments: () => getAssignments(),
  employeeAssignments: (
    _: unknown,
    args: { employeeId: string; status?: string },
  ) => getAssignmentsByEmployee(args.employeeId, args.status),
};
