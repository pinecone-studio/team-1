import {
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
} from "@/db/employees";
import type { GraphQLContext } from "@/graphql-gql/context";
import { syncClerkUserRole } from "@/lib/clerk-auth";

type EmployeeInput = Record<string, unknown>;

function requireAuth(ctx: GraphQLContext): void {
  if (!ctx.userId) {
    throw new Error("Unauthorized: Bearer token required (Clerk sign-in).");
  }
}

function getClerkSecretKey(ctx: GraphQLContext): string | undefined {
  return ctx.env.CLERK_SECRET_KEY ?? (typeof process !== "undefined" ? process.env?.CLERK_SECRET_KEY : undefined);
}

export const employeeMutations = {
  createEmployee: (
    _: unknown,
    args: { input: EmployeeInput },
    ctx: GraphQLContext,
  ) => {
    requireAuth(ctx);
    return createEmployee(args.input as never);
  },
  updateEmployee: async (
    _: unknown,
    args: { id: string; input: EmployeeInput },
    ctx: GraphQLContext,
  ) => {
    requireAuth(ctx);
    const updated = await updateEmployeeById(args.id, args.input as never);
    const role = args.input?.role as string | undefined;
    if (role && updated?.clerkId) {
      await syncClerkUserRole(updated.clerkId, role, getClerkSecretKey(ctx));
    }
    return updated;
  },
  deleteEmployee: (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    requireAuth(ctx);
    return deleteEmployeeById(args.id);
  },
};
