import { createClerkClient, verifyToken } from "@clerk/backend";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { eq, isNull } from "drizzle-orm";
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
 * Email matching is case-insensitive so DB "User@Co.com" matches Clerk "user@co.com".
 *
 * Clerk дээрээс email авах нь:
 * - Clerk Dashboard → Configure → Email, phone, username: "Email address" идэвхтэй байх (Sign-up/Sign-in).
 * - Нэвтэрсэн хэрэглэгчийн User объект дээр primaryEmailAddress эсвэл emailAddresses байна.
 * - Доорх код: users.getUser(clerkId) → user.primaryEmailAddress.emailAddress эсвэл emailAddresses[0].
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
    // Clerk-ээс primary email: primaryEmailAddress эсвэл emailAddresses array-аас
    const primaryEmail =
      (user as { primaryEmailAddress?: { emailAddress?: string } }).primaryEmailAddress?.emailAddress
      ?? user.emailAddresses?.find((e: { id: string }) => e.id === user.primaryEmailAddressId)?.emailAddress
      ?? user.emailAddresses?.[0]?.emailAddress;
    if (!primaryEmail || typeof primaryEmail !== "string") return;
    const now = Date.now();
    const candidates = await db
      .select({ id: employees.id, email: employees.email })
      .from(employees)
      .where(isNull(employees.clerkId))
      .all();
    const match = candidates.find(
      (r) => r.email && primaryEmail && r.email.toLowerCase() === primaryEmail.toLowerCase(),
    );
    if (!match) return;
    await db
      .update(employees)
      .set({
        clerkId,
        status: "ACTIVE",
        updatedAt: now,
      })
      .where(eq(employees.id, match.id));
  } catch (err) {
    if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
      console.warn("[syncEmployeeClerkId]", err);
    }
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
