import {
  createEmployee,
  deleteEmployeeById,
  updateEmployeeById,
} from "@/db/employees";
import type { GraphQLContext } from "@/graphql-gql/context";
import { syncClerkUserRole } from "@/lib/clerk-auth";

type EmployeeInput = Record<string, unknown>;

function requireAuth(ctx: GraphQLContext): void {
  if (ctx.env?.DISABLE_AUTH === "1") return;
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
    // Demo/temporary: employee creation is allowed without Clerk auth.
    return createEmployee(args.input as never);
  },
  updateEmployee: async (
    _: unknown,
    args: { id: string; input: EmployeeInput },
    ctx: GraphQLContext,
  ) => {
    // Allow unauthenticated signature/image URL saves (demo/temporary).
    let allowUnauthed = false;
    if (ctx.env?.DISABLE_AUTH !== "1" && !ctx.userId) {
      const entries = Object.entries(args.input ?? {}).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => v !== undefined,
      );
      const keys = entries.map(([k]) => k);
      const allowed = new Set(["signUrl", "imageUrl"]);
      const onlyAllowedKeys = keys.length > 0 && keys.every((k) => allowed.has(k));
      if (!onlyAllowedKeys) {
        throw new Error("Unauthorized: Bearer token required (Clerk sign-in).");
      }
      allowUnauthed = true;
    }

    // Auth required for sensitive updates when not disabled.
    if (!allowUnauthed) {
      requireAuth(ctx);
    }
    const updated = await updateEmployeeById(args.id, args.input as never);
    const role = args.input?.role as string | undefined;
    if (role && updated?.clerkId && ctx.env?.DISABLE_AUTH !== "1") {
      await syncClerkUserRole(updated.clerkId, role, getClerkSecretKey(ctx));
    }
    return updated;
  },
  deleteEmployee: (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    requireAuth(ctx);
    return deleteEmployeeById(args.id);
  },
};
