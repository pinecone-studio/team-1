import { and, desc, eq, inArray, isNull, or } from "drizzle-orm";
import { getDb } from "../../client";
import { createNotification } from "../../notifications";
import {
  assets,
  assignments,
  censusEvents,
  censusTasks,
  employees,
} from "@/schema";
import type { CensusScope } from "../types";

export async function startCensus(input: {
  name: string;
  scope: CensusScope;
  scopeEmployeeIds?: string[] | null;
  createdBy: string;
  coverageMode?: string | null;
  department?: string | null;
  categoryId?: string | null;
}) {
  const db = await getDb();
  const now = Date.now();

  // Ensure there is only one open census at a time.
  // If one is already open, return it instead of creating a new event.
  const existingOpen = await db
    .select({ id: censusEvents.id })
    .from(censusEvents)
    .where(isNull(censusEvents.closedAt))
    .orderBy(desc(censusEvents.startedAt))
    .limit(1)
    .get();

  if (existingOpen?.id) {
    return { id: existingOpen.id, totalTasks: 0, notifiedEmployees: 0 };
  }

  let resolvedCreatedBy = input.createdBy;

  const explicitCreator = await db
    .select({ id: employees.id })
    .from(employees)
    .where(eq(employees.id, input.createdBy))
    .get();

  if (!explicitCreator?.id) {
    const fallbackCreator = await db
      .select({ id: employees.id })
      .from(employees)
      .limit(1)
      .get();

    if (fallbackCreator?.id) {
      resolvedCreatedBy = fallbackCreator.id;
    } else {
      const systemEmployeeId = crypto.randomUUID();
      await db.insert(employees).values({
        id: systemEmployeeId,
        clerkId: null,
        role: "IT_ADMIN",
        firstName: "System",
        lastName: "Census",
        firstNameEng: "System",
        lastNameEng: "Census",
        email: `system-census-${systemEmployeeId.slice(0, 8)}@local`,
        hireDate: now,
        status: "ACTIVE",
        department: "IT",
        branch: "HQ",
        employeeCode: `SYS-${systemEmployeeId.slice(0, 6).toUpperCase()}`,
        level: "SYSTEM",
        isKpi: 0,
        isSalaryCompany: 1,
        createdAt: now,
        updatedAt: now,
      });
      resolvedCreatedBy = systemEmployeeId;
    }
  }

  const censusId = crypto.randomUUID();
  let effectiveEmployeeIds = input.scopeEmployeeIds ?? null;
  if (input.department) {
    const departmentEmployeeRows = await db
      .select({ id: employees.id })
      .from(employees)
      .where(
        and(
          eq(employees.department, input.department),
          isNull(employees.deletedAt),
        ),
      )
      .all();

    const departmentEmployeeIds = departmentEmployeeRows.map(
      (row: any) => row.id,
    );
    effectiveEmployeeIds =
      effectiveEmployeeIds && effectiveEmployeeIds.length > 0
        ? effectiveEmployeeIds.filter((id) =>
            departmentEmployeeIds.includes(id),
          )
        : departmentEmployeeIds;
  }

  const scopeFilter = JSON.stringify({
    coverageMode: input.coverageMode ?? null,
    department: input.department ?? null,
    categoryId: input.categoryId ?? null,
    employeeIds:
      input.scope === "EMPLOYEES" ? (effectiveEmployeeIds ?? []) : [],
  });

  await db.insert(censusEvents).values({
    id: censusId,
    name: input.name,
    scope: input.scope,
    scopeFilter,
    createdBy: resolvedCreatedBy,
    startedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  // Collect assets according to scope.
  const categoryCondition = input.categoryId
    ? or(
        eq(assets.categoryId, input.categoryId),
        eq(assets.mainCategoryId, input.categoryId),
      )
    : null;

  let assetRows: Array<{ id: string }> = [];
  if (input.scope === "EMPLOYEES") {
    if ((effectiveEmployeeIds?.length ?? 0) > 0) {
      assetRows = await db
        .select({ id: assets.id })
        .from(assets)
        .innerJoin(
          assignments,
          and(
            eq(assignments.assetId, assets.id),
            inArray(assignments.employeeId, effectiveEmployeeIds as string[]),
            isNull(assignments.returnedAt),
            isNull(assignments.deletedAt),
          ),
        )
        .where(
          categoryCondition
            ? and(isNull(assets.deletedAt), categoryCondition)
            : isNull(assets.deletedAt),
        )
        .all();
    }
  } else {
    assetRows = await db
      .select({ id: assets.id })
      .from(assets)
      .where(
        categoryCondition
          ? and(isNull(assets.deletedAt), categoryCondition)
          : isNull(assets.deletedAt),
      )
      .all();
  }

  const assetIds = Array.from(new Set(assetRows.map((r) => r.id)));
  if (assetIds.length === 0) {
    return { id: censusId, totalTasks: 0, notifiedEmployees: 0 };
  }

  // Resolve current owner (assignment) for each asset.
  const ownerRows = await db
    .select({
      assetId: assignments.assetId,
      employeeId: assignments.employeeId,
    })
    .from(assignments)
    .where(
      and(
        inArray(assignments.assetId, assetIds),
        isNull(assignments.returnedAt),
        isNull(assignments.deletedAt),
      ),
    )
    .all();

  const ownerByAssetId = new Map<string, string>();
  for (const r of ownerRows) {
    if (!ownerByAssetId.has(r.assetId))
      ownerByAssetId.set(r.assetId, r.employeeId);
  }

  // Create tasks (verifierId null for unassigned assets).
  await db
    .insert(censusTasks)
    .values(
      assetIds.map((assetId) => ({
        id: crypto.randomUUID(),
        censusId,
        assetId,
        verifierId: ownerByAssetId.get(assetId) ?? null,
        status: "PENDING",
        createdAt: now,
        updatedAt: now,
      })),
    )
    .execute();

  // Notify only employees who have assigned assets.
  const verifierIds = Array.from(
    new Set(
      assetIds
        .map((id) => ownerByAssetId.get(id))
        .filter((v): v is string => !!v),
    ),
  );

  const creator = await db
    .select({
      firstName: employees.firstName,
      lastName: employees.lastName,
      email: employees.email,
    })
    .from(employees)
    .where(eq(employees.id, resolvedCreatedBy))
    .get();

  const startedBy =
    [creator?.firstName, creator?.lastName].filter(Boolean).join(" ").trim() ||
    creator?.email ||
    resolvedCreatedBy;
  const scopeLabel =
    input.coverageMode === "BY_DEPARTMENT"
      ? `Алба, хэлтэс: ${input.department ?? "—"}`
      : input.coverageMode === "BY_CATEGORY"
        ? `Ангилал ID: ${input.categoryId ?? "—"}`
        : input.scope === "EMPLOYEES"
          ? `Сонгосон ажилтнууд (${effectiveEmployeeIds?.length ?? 0})`
          : "Байгууллага бүхлээр";

  await Promise.all(
    verifierIds.map((employeeId) =>
      createNotification({
        employeeId,
        title: `Census: ${input.name}`,
        message: `Тооллого эхэллээ. Эхлүүлсэн: ${startedBy}. Цар хүрээ: ${scopeLabel}.`,
        type: "WARNING",
        link: `census:${censusId}`,
      }),
    ),
  );

  return {
    id: censusId,
    totalTasks: assetIds.length,
    notifiedEmployees: verifierIds.length,
  };
}
