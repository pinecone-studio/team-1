"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@apollo/client";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Loader2,
  Package,
} from "lucide-react";

import {
  EmployeesDocument,
  GetActiveOffboardingDocument,
  GetEmployeeAssignmentsDocument,
  type EmployeesQuery,
  type GetActiveOffboardingQuery,
  type GetEmployeeAssignmentsQuery,
} from "@/gql/graphql";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type EmployeeItem = EmployeesQuery["employees"][number];
type OffboardingEventItem = NonNullable<GetActiveOffboardingQuery["offboardingEvent"]>;
type AssignmentItem = GetEmployeeAssignmentsQuery["employeeAssignments"][number];

type AssetViewItem = {
  id: string;
  assetTag: string;
  serialNumber: string;
  imageUrl?: string | null;
};

function formatDate(value?: number | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getName(employee: EmployeeItem): string {
  const fullName = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
  return fullName || employee.email || "Нэргүй ажилтан";
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "NA";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function mergeAsset(
  assetId: string,
  eventAssetsById: Map<string, OffboardingEventItem["assetsToReturn"][number]>,
  assignmentByAssetId: Map<string, AssignmentItem>,
): AssetViewItem {
  const fromEvent = eventAssetsById.get(assetId);
  const fromAssignment = assignmentByAssetId.get(assetId)?.asset;

  return {
    id: assetId,
    assetTag: fromAssignment?.assetTag ?? fromEvent?.assetTag ?? assetId,
    serialNumber: fromAssignment?.serialNumber ?? fromEvent?.serialNumber ?? "—",
    imageUrl: fromAssignment?.imageUrl,
  };
}

function AssetSection({
  title,
  icon,
  assets,
  employee,
  emptyText,
}: {
  title: string;
  icon: ReactNode;
  assets: AssetViewItem[];
  employee: EmployeeItem;
  emptyText: string;
}) {
  const employeeName = getName(employee);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        {icon}
        <span>{title}</span>
      </div>

      {assets.length === 0 ? (
        <div className="rounded-xl border bg-white/60 px-4 py-3 text-sm text-slate-500">
          {emptyText}
        </div>
      ) : null}

      {assets.map((asset) => (
        <div
          key={asset.id}
          className="rounded-xl border bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-slate-50">
                {asset.imageUrl ? (
                  <img
                    src={asset.imageUrl}
                    alt={asset.assetTag}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <Package className="h-4 w-4" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {asset.assetTag}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {asset.serialNumber}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="text-right">
                <p className="text-[11px] text-slate-500">Эзэмшигч</p>
              </div>
              <Avatar className="h-7 w-7">
                <AvatarImage src={employee.imageUrl ?? undefined} />
                <AvatarFallback className="text-[10px]">
                  {getInitials(employeeName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OffboardingEmployeeCard({
  employee,
  defaultExpanded,
}: {
  employee: EmployeeItem;
  defaultExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const { data: eventData, loading: eventLoading, error: eventError } = useQuery(
    GetActiveOffboardingDocument,
    {
      variables: { employeeId: employee.id },
      fetchPolicy: "network-only",
    },
  );

  const { data: assignmentData, loading: assignmentLoading } = useQuery(
    GetEmployeeAssignmentsDocument,
    {
      variables: { employeeId: employee.id },
      fetchPolicy: "network-only",
    },
  );

  if (eventLoading || assignmentLoading) {
    return (
      <Card className="border-slate-200 bg-white/90">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            {getName(employee)}-ийн мэдээлэл ачааллаж байна...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (eventError) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="p-4 text-sm text-destructive">
          {getName(employee)}-ийн offboarding мэдээлэл уншихад алдаа гарлаа:{" "}
          {eventError.message}
        </CardContent>
      </Card>
    );
  }

  const event = eventData?.offboardingEvent;
  if (!event) {
    return null;
  }

  const assignments = assignmentData?.employeeAssignments ?? [];

  const eventAssetsById = new Map(
    event.assetsToReturn.map((asset) => [asset.id, asset]),
  );
  const eventAssetIds = new Set(Array.from(eventAssetsById.keys()));

  const assignmentByAssetId = new Map<string, AssignmentItem>();
  assignments.forEach((assignment) => {
    if (!assignment.assetId || !eventAssetIds.has(assignment.assetId)) return;
    assignmentByAssetId.set(assignment.assetId, assignment);
  });

  const returnedAssetIds = new Set(
    assignments
      .filter(
        (assignment) =>
          eventAssetIds.has(assignment.assetId) &&
          (assignment.returnedAt != null || assignment.status === "RETURNED"),
      )
      .map((assignment) => assignment.assetId),
  );

  const pendingAssets = event.assetsToReturn
    .filter((asset) => !returnedAssetIds.has(asset.id))
    .map((asset) => mergeAsset(asset.id, eventAssetsById, assignmentByAssetId));

  const returnedAssets = event.assetsToReturn
    .filter((asset) => returnedAssetIds.has(asset.id))
    .map((asset) => mergeAsset(asset.id, eventAssetsById, assignmentByAssetId));

  const totalAssets =
    event.totalAssets > 0 ? event.totalAssets : event.assetsToReturn.length;
  const returnedCount = Math.min(
    totalAssets,
    Math.max(event.returnedAssets ?? 0, returnedAssets.length),
  );
  const progress = totalAssets > 0 ? Math.round((returnedCount / totalAssets) * 100) : 0;
  const roleLabel = employee.level || employee.role || "—";

  return (
    <Card className="border-slate-200 bg-white/90 shadow-sm">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900">
              {getName(employee)}
            </h3>
            <p className="truncate text-sm text-slate-500">
              {employee.department} · {roleLabel} · Ажлаас гарах өдөр:{" "}
              {formatDate(employee.terminationDate ?? event.deadline)}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">{progress}%</p>
              <div className="mt-1 h-1.5 w-36 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {expanded ? (
          <div className="space-y-4">
            <AssetSection
              title="Буцаах хөрөнгүүд"
              icon={<Clock3 className="h-4 w-4" />}
              assets={pendingAssets}
              employee={employee}
              emptyText="Буцаах хөрөнгө үлдээгүй байна."
            />
            <AssetSection
              title="Буцаасан хөрөнгүүд"
              icon={<CheckCircle2 className="h-4 w-4" />}
              assets={returnedAssets}
              employee={employee}
              emptyText="Буцаасан хөрөнгө одоогоор алга."
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function OffboardingContent() {
  const { data, loading, error } = useQuery(EmployeesDocument, {
    fetchPolicy: "network-only",
  });

  const offboardingEmployees = useMemo(
    () =>
      (data?.employees ?? [])
        .filter((employee) => employee.status === "OFFBOARDING")
        .sort(
          (a, b) =>
            (b.terminationDate ?? b.updatedAt ?? 0) -
            (a.terminationDate ?? a.updatedAt ?? 0),
        ),
    [data?.employees],
  );

  return (
    <div className="min-h-[calc(100vh-5.5rem)] bg-slate-100 p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-slate-900">Ажлаас гарах явц</h1>
      </div>

      {loading ? (
        <Card className="border-slate-200 bg-white/90">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Ажлаас гарах процессын мэдээлэл ачааллаж байна...
            </div>
          </CardContent>
        </Card>
      ) : null}

      {error ? (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4 text-sm text-destructive">
            Ажилтны жагсаалт уншихад алдаа гарлаа: {error.message}
          </CardContent>
        </Card>
      ) : null}

      {!loading && !error && offboardingEmployees.length === 0 ? (
        <Card className="border-slate-200 bg-white/90">
          <CardContent className="p-6 text-sm text-slate-500">
            OFFBOARDING төлөвтэй ажилтан одоогоор алга байна.
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-4">
        {offboardingEmployees.map((employee, index) => (
          <OffboardingEmployeeCard
            key={employee.id}
            employee={employee}
            defaultExpanded={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
