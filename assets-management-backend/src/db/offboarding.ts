import { and, eq, isNull } from "drizzle-orm";
import {
    employees,
    assignments,
    assets,
    offboardingEvents,
} from "../../drizzle/schema";
import { getDb } from "./client";
import { writeAuditLog } from "./auditLogger";
import { getAssetById } from "./assets/queries";

export type OffboardingEvent = typeof offboardingEvents.$inferSelect;

// ─── Queries ────────────────────────────────────────────────────────────────

export async function getOffboardingEvent(id: string): Promise<OffboardingEvent | undefined> {
    const db = await getDb();
    return db.select().from(offboardingEvents).where(eq(offboardingEvents.id, id)).get();
}

export async function getOffboardingEventByEmployee(
    employeeId: string,
): Promise<OffboardingEvent | undefined> {
    const db = await getDb();
    return db
        .select()
        .from(offboardingEvents)
        .where(eq(offboardingEvents.employeeId, employeeId))
        .get();
}

// ─── Mutations ──────────────────────────────────────────────────────────────

/**
 * HR / IT triggers offboarding.
 * - Marks the employee as TERMINATED
 * - Finds all open assignment rows
 * - Sets each assigned asset to RETURNED
 * - Creates an offboarding_events row tracking progress
 */
export async function startOffboarding(
    employeeId: string,
    initiatedBy: string,
): Promise<OffboardingEvent> {
    const db = await getDb();
    const now = Date.now();

    const employee = await db
        .select()
        .from(employees)
        .where(eq(employees.id, employeeId))
        .get();
    if (!employee) throw new Error(`Employee ${employeeId} not found`);
    if (employee.status === "TERMINATED") throw new Error("Employee is already terminated");

    // Get all open (not yet returned) assignments for this employee
    const openAssignments = await db
        .select()
        .from(assignments)
        .where(and(eq(assignments.employeeId, employeeId), isNull(assignments.returnedAt)))
        .all();

    const totalAssets = openAssignments.length;

    // Terminate the employee
    await db
        .update(employees)
        .set({ status: "TERMINATED", terminationDate: now, updatedAt: now })
        .where(eq(employees.id, employeeId));

    // Mark every assigned asset as RETURNED (pending physical inspection)
    for (const a of openAssignments) {
        await db
            .update(assets)
            .set({ status: "RETURNED", updatedAt: now })
            .where(eq(assets.id, a.assetId));
    }

    // Create the offboarding tracking record
    const id = crypto.randomUUID();
    await db.insert(offboardingEvents).values({
        id,
        employeeId,
        initiatedBy,
        status: "IN_PROGRESS",
        totalAssets,
        returnedAssets: 0,
        createdAt: now,
        updatedAt: now,
    });

    await writeAuditLog(
        "employees",
        employeeId,
        "OFFBOARDING_STARTED",
        initiatedBy,
        { status: employee.status },
        { status: "TERMINATED", totalAssetsToReturn: totalAssets },
    );

    const created = await getOffboardingEvent(id);
    if (!created) throw new Error("Failed to create offboarding event");
    return created;
}

/**
 * IT Admin physically inspects and closes each asset return.
 * - Closes the open assignment row (returnedAt + conditionAtReturn)
 * - Decides next asset status based on condition:
 *     GOOD / OK → AVAILABLE
 *     DAMAGED / BROKEN → DISPOSAL_REQUESTED
 * - Increments returnedAssets counter; auto-completes offboarding when all done
 */
export async function completeAssetReturn(
    assetId: string,
    employeeId: string,
    condition: string,
    inspectedBy: string,
): Promise<typeof assets.$inferSelect> {
    const db = await getDb();
    const now = Date.now();

    // Close the open assignment
    const openAssignment = await db
        .select()
        .from(assignments)
        .where(and(eq(assignments.assetId, assetId), isNull(assignments.returnedAt)))
        .get();

    if (openAssignment) {
        await db
            .update(assignments)
            .set({ returnedAt: now, conditionAtReturn: condition, updatedAt: now })
            .where(eq(assignments.id, openAssignment.id));
    }

    // Decide next asset status from physical inspection
    const badConditions = ["DAMAGED", "BROKEN", "DESTROYED", "FAULTY"];
    const nextStatus = badConditions.includes(condition.toUpperCase())
        ? "DISPOSAL_REQUESTED"
        : "AVAILABLE";

    await db
        .update(assets)
        .set({ status: nextStatus, assignedTo: null, updatedAt: now })
        .where(eq(assets.id, assetId));

    await writeAuditLog(
        "assets",
        assetId,
        "ASSET_RETURNED",
        inspectedBy,
        { status: "RETURNED" },
        { status: nextStatus, condition },
    );

    // Increment the offboarding counter and potentially auto-complete it
    const event = await db
        .select()
        .from(offboardingEvents)
        .where(eq(offboardingEvents.employeeId, employeeId))
        .get();

    if (event) {
        const newReturnedCount = (event.returnedAssets ?? 0) + 1;
        const allDone = newReturnedCount >= (event.totalAssets ?? 0);

        await db
            .update(offboardingEvents)
            .set({
                returnedAssets: newReturnedCount,
                status: allDone ? "COMPLETED" : "IN_PROGRESS",
                completedAt: allDone ? now : null,
                updatedAt: now,
            })
            .where(eq(offboardingEvents.id, event.id));

        if (allDone) {
            await writeAuditLog(
                "offboarding_events",
                event.id,
                "OFFBOARDING_COMPLETED",
                inspectedBy,
                { status: "IN_PROGRESS" },
                { status: "COMPLETED" },
            );
        }
    }

    const updated = await getAssetById(assetId);
    if (!updated) throw new Error("Asset not found after return");
    return updated;
}
