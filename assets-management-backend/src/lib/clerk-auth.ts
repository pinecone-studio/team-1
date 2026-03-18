import { createClerkClient, verifyToken } from "@clerk/backend";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { eq, and, isNull } from "drizzle-orm";
import type * as schema from "@/schema";
import { employees } from "@/schema";

/**
 * Extract Clerk userId from request Authorization: Bearer <token>.
 * Returns null if no token, invalid token, or missing secretKey.
 */
export async function getUserIdFromRequest(
  request: Request,
  secretKey: string | undefined,
): Promise<string | null> {
  if (!secretKey) return null;
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  if (!token) return null;
  try {
    const result = await verifyToken(token, { secretKey });
    const data = result.data as { sub?: string } | null | undefined;
    if (result.error || !data?.sub) return null;
    return data.sub;
  } catch {
    return null;
  }
}

/**
 * After Clerk login: find employee by email (from Clerk user), set clerkId and status ACTIVE.
 * Called when context has userId so that first-time login links the employee record.
 */
export async function syncEmployeeClerkId(
  db: DrizzleD1Database<typeof schema>,
  clerkId: string,
  secretKey: string | undefined,
): Promise<void> {
  if (!secretKey) return;
  try {
    const clerk = createClerkClient({ secretKey });
    const user = await clerk.users.getUser(clerkId);
    const primaryEmail = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? user.emailAddresses[0]?.emailAddress;
    if (!primaryEmail) return;
    const now = Date.now();
    await db
      .update(employees)
      .set({
        clerkId,
        status: "ACTIVE",
        updatedAt: now,
      })
      .where(
        and(eq(employees.email, primaryEmail), isNull(employees.clerkId)),
      );
  } catch {
    // Clerk API or DB error — ignore; user may already be linked or not in DB yet
  }
}

const ALLOWED_ROLES = [
  "SUPER_ADMIN",
  "HR",
  "IT",
  "EMPLOYEE",
  "FINANCE",
] as const;

/**
 * Sync role to Clerk user publicMetadata when HR changes role in DB.
 * Frontend can read via useUser().user?.publicMetadata?.role.
 */
export async function syncClerkUserRole(
  clerkId: string,
  role: string,
  secretKey: string | undefined,
): Promise<void> {
  if (!secretKey) return;
  if (!ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])) return;
  try {
    const clerk = createClerkClient({ secretKey });
    await clerk.users.updateUserMetadata(clerkId, {
      publicMetadata: { role },
    });
  } catch {
    // Clerk API error — log or ignore
  }
}
