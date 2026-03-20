import { and, desc, eq, isNull } from "drizzle-orm";
import { getDb } from "../../client";
import { assignments, assets, censusEvents, censusTasks } from "@/schema";

type ScopeFilter = {
  coverageMode?: string | null;
};

export type OpenCensusAssetScanStatus = {
  censusId?: string | null;
  censusName?: string | null;
  coverageMode?: string | null;
  assetId: string;
  taskId?: string | null;
  taskStatus?: string | null;
  canRegister: boolean;
  alreadyRegistered: boolean;
  isUnassignedAsset: boolean;
  reason?: string | null;
};

function readCoverageMode(scopeFilter?: string | null, scope?: string | null) {
  const fallback = scope === "ORG" ? "ALL_ORG" : null;
  if (!scopeFilter) return fallback;

  try {
    const parsed = JSON.parse(scopeFilter) as ScopeFilter;
    return parsed.coverageMode ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getOpenCensusAssetScanStatus(
  assetId: string,
): Promise<OpenCensusAssetScanStatus> {
  const db = await getDb();

  const openEvent = await db
    .select({
      id: censusEvents.id,
      name: censusEvents.name,
      scope: censusEvents.scope,
      scopeFilter: censusEvents.scopeFilter,
    })
    .from(censusEvents)
    .where(isNull(censusEvents.closedAt))
    .orderBy(desc(censusEvents.startedAt))
    .limit(1)
    .get();

  if (!openEvent) {
    return {
      assetId,
      canRegister: false,
      alreadyRegistered: false,
      isUnassignedAsset: false,
      reason: "Тооллого эхлээгүй байна.",
    };
  }

  const coverageMode = readCoverageMode(openEvent.scopeFilter, openEvent.scope);

  const asset = await db
    .select({ id: assets.id })
    .from(assets)
    .where(and(eq(assets.id, assetId), isNull(assets.deletedAt)))
    .get();

  if (!asset?.id) {
    return {
      censusId: openEvent.id,
      censusName: openEvent.name,
      coverageMode,
      assetId,
      canRegister: false,
      alreadyRegistered: false,
      isUnassignedAsset: false,
      reason: "Хөрөнгө олдсонгүй.",
    };
  }

  const task = await db
    .select({
      id: censusTasks.id,
      status: censusTasks.status,
      verifierId: censusTasks.verifierId,
    })
    .from(censusTasks)
    .where(
      and(
        eq(censusTasks.censusId, openEvent.id),
        eq(censusTasks.assetId, assetId),
      ),
    )
    .get();

  const activeAssignment = await db
    .select({ id: assignments.id })
    .from(assignments)
    .where(
      and(
        eq(assignments.assetId, assetId),
        isNull(assignments.returnedAt),
        isNull(assignments.deletedAt),
      ),
    )
    .get();

  const isUnassignedAsset = !activeAssignment?.id;
  const alreadyRegistered = Boolean(task?.id && task.status !== "PENDING");

  let reason = "Энэ хөрөнгийг scan-аар тооллогод бүртгэж болно.";

  if (coverageMode !== "ALL_ORG") {
    reason = 'QR scan зөвхөн "Байгууллага бүхлээр" тооллогод ажиллана.';
  } else if (!task?.id) {
    reason = "Энэ хөрөнгө нээлттэй тооллогод хамрагдаагүй байна.";
  } else if (!isUnassignedAsset || task.verifierId) {
    reason = "Зөвхөн эзэмшигчгүй хөрөнгийг эндээс бүртгэнэ.";
  } else if (alreadyRegistered) {
    reason = "Энэ хөрөнгө аль хэдийн тооллогод бүртгэгдсэн байна.";
  }

  return {
    censusId: openEvent.id,
    censusName: openEvent.name,
    coverageMode,
    assetId,
    taskId: task?.id ?? null,
    taskStatus: task?.status ?? null,
    canRegister:
      coverageMode === "ALL_ORG" &&
      Boolean(task?.id) &&
      isUnassignedAsset &&
      !task?.verifierId &&
      task?.status === "PENDING",
    alreadyRegistered,
    isUnassignedAsset,
    reason,
  };
}
