"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
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
  SubmitReturnRequestDocument,
  type EmployeesQuery,
  type GetActiveOffboardingQuery,
  type GetEmployeeAssignmentsQuery,
} from "@/gql/graphql";
import { AssetDetailContent } from "@/components/assets/asset-detail-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type EmployeeItem = EmployeesQuery["employees"][number];
type EventItem = NonNullable<GetActiveOffboardingQuery["offboardingEvent"]>;
type AssignmentItem =
  GetEmployeeAssignmentsQuery["employeeAssignments"][number];
type AssetItem = EventItem["assetsToReturn"][number];

type AssetRowItem = {
  id: string;
  assetTag: string;
  serialNumber: string;
  imageUrl?: string | null;
  conditionStatus: "GOOD" | "DAMAGED" | "UNKNOWN";
};

function getConditionLabel(value: string): string {
  if (value === "GOOD") return "Сайн";
  if (value === "FAIR") return "Дунд";
  if (value === "DAMAGED") return "Эвдэрсэн";
  if (value === "LOST") return "Алга болгосон";
  return "Сонгоогүй";
}

function getConditionTone(value: string): string {
  if (value === "GOOD") return "border-emerald-300 bg-emerald-50 text-emerald-700";
  if (value === "FAIR") return "border-amber-300 bg-amber-50 text-amber-700";
  if (value === "DAMAGED") return "border-red-300 bg-red-50 text-red-700";
  if (value === "LOST") return "border-slate-300 bg-slate-100 text-slate-700";
  return "border-slate-200 bg-white text-slate-700";
}

function getEmployeeName(employee: EmployeeItem): string {
  const full = `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
  return full || employee.email || employee.id;
}

function getEmployeeSubtitle(employee: EmployeeItem): string {
  return employee.level || employee.department || employee.role || "Ажилтан";
}

function formatDate(value?: number | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("mn-MN");
}

function parseConditionStatus(
  value?: string | null,
): "GOOD" | "DAMAGED" | "UNKNOWN" {
  const raw = value?.trim();
  if (!raw) return "UNKNOWN";

  // Handles values like "DAMAGED", "DAMAGED: cracked screen", "good", etc.
  const keyword = raw.split(":")[0]?.trim().toUpperCase();
  if (keyword === "GOOD" || keyword === "FAIR") return "GOOD";
  if (
    keyword === "DAMAGED" ||
    keyword === "NON_FUNCTIONAL" ||
    keyword === "LOST"
  ) {
    return "DAMAGED";
  }
  return "UNKNOWN";
}

function mergeAssetData(
  asset: AssetItem,
  assignmentByAssetId: Map<string, AssignmentItem>,
  pendingRequestByAssetId: Map<
    string,
    EventItem["pendingReturnRequests"][number]
  >,
): AssetRowItem {
  const assignment = assignmentByAssetId.get(asset.id);
  const pendingRequest = pendingRequestByAssetId.get(asset.id);
  const conditionStatus = parseConditionStatus(
    pendingRequest?.conditionEmployee ?? assignment?.conditionAtReturn,
  );
  return {
    id: assignment?.asset?.id ?? pendingRequest?.asset?.id ?? asset.id,
    assetTag: assignment?.asset?.assetTag ?? asset.assetTag ?? asset.id,
    serialNumber: assignment?.asset?.serialNumber ?? asset.serialNumber ?? "—",
    imageUrl: assignment?.asset?.imageUrl,
    conditionStatus,
  };
}

function AssetRow({
  asset,
  onOpenAsset,
  showReturnCheckbox = false,
  checked = false,
  onReturnedCheckChange,
}: {
  asset: AssetRowItem;
  onOpenAsset: (assetId: string) => void;
  showReturnCheckbox?: boolean;
  checked?: boolean;
  onReturnedCheckChange?: (next: boolean) => void;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3 ${
        checked ? "bg-sky-50 ring-1 ring-sky-200" : "bg-[#f3f4f6]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {showReturnCheckbox ? (
          <input
            type="checkbox"
            className="h-4 w-4 shrink-0 rounded border-slate-400"
            checked={checked}
            onChange={(event) => onReturnedCheckChange?.(event.target.checked)}
            aria-label={`${asset.assetTag} сонгох`}
          />
        ) : null}
        <button
          type="button"
          className="flex min-w-0 items-center gap-3 text-left"
          onClick={() => onOpenAsset(asset.id)}
        >
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white p-1">
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
            <p className="block max-w-full truncate text-left text-base font-semibold text-slate-900 underline-offset-2 hover:text-sky-700 hover:underline md:text-lg">
              {asset.assetTag}
            </p>
            <p className="text-xs text-slate-500 md:text-sm">
              {asset.serialNumber}
            </p>
            {asset.conditionStatus === "DAMAGED" ? (
              <p className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 md:text-sm">
                Эвдрэлтэй
              </p>
            ) : asset.conditionStatus === "GOOD" ? (
              <p className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 md:text-sm">
                Хэвийн
              </p>
            ) : (
              <p className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 md:text-sm">
                Тодорхойгүй
              </p>
            )}
          </div>
        </button>
      </div>

    </div>
  );
}

function OffboardingEmployeeCard({
  employee,
  onOpenAsset,
}: {
  employee: EmployeeItem;
  onOpenAsset: (assetId: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [checkedPendingAssetIds, setCheckedPendingAssetIds] = useState<
    Set<string>
  >(new Set());
  const [showReturnedDialog, setShowReturnedDialog] = useState(false);
  const [returnCondition, setReturnCondition] = useState("");
  const [returnComment, setReturnComment] = useState("");
  const [sendingToHr, setSendingToHr] = useState(false);

  const {
    data: eventData,
    loading: eventLoading,
    error: eventError,
    refetch: refetchEvent,
  } = useQuery(GetActiveOffboardingDocument, {
    variables: { employeeId: employee.id },
    fetchPolicy: "network-only",
  });
  const {
    data: assignmentsData,
    loading: assignmentsLoading,
    refetch: refetchAssignments,
  } = useQuery(GetEmployeeAssignmentsDocument, {
    variables: { employeeId: employee.id },
    fetchPolicy: "network-only",
  });
  const [submitReturnRequestMutation] = useMutation(SubmitReturnRequestDocument);

  if (eventLoading || assignmentsLoading) {
    return (
      <Card className="rounded-2xl border border-slate-200 bg-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            {getEmployeeName(employee)}-ийн мэдээлэл ачааллаж байна...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (eventError) {
    return (
      <Card className="rounded-2xl border border-red-200 bg-red-50">
        <CardContent className="p-4 text-sm text-red-700">
          {getEmployeeName(employee)}-ийн offboarding мэдээлэл уншихад алдаа
          гарлаа: {eventError.message}
        </CardContent>
      </Card>
    );
  }

  const event = eventData?.offboardingEvent;
  if (!event) return null;

  const assignments = assignmentsData?.employeeAssignments ?? [];
  const relevantAssignments = assignments.filter((a) =>
    event.assetsToReturn.some((asset) => asset.id === a.assetId),
  );

  const latestAssignmentByAssetId = new Map<string, AssignmentItem>();
  relevantAssignments.forEach((assignment) => {
    const current = latestAssignmentByAssetId.get(assignment.assetId);
    if (!current || assignment.assignedAt > current.assignedAt) {
      latestAssignmentByAssetId.set(assignment.assetId, assignment);
    }
  });

  const pendingReturnRequestAssetIds = new Set(
    (event.pendingReturnRequests ?? []).map((request) => request.assetId),
  );
  const pendingRequestByAssetId = new Map(
    (event.pendingReturnRequests ?? []).map((request) => [
      request.assetId,
      request,
    ]),
  );

  const pendingAssets: AssetRowItem[] = [];
  const returnedAssets: AssetRowItem[] = [];

  event.assetsToReturn.forEach((asset) => {
    const merged = mergeAssetData(
      asset,
      latestAssignmentByAssetId,
      pendingRequestByAssetId,
    );
    const latest = latestAssignmentByAssetId.get(asset.id);
    const returned =
      latest?.returnedAt != null ||
      latest?.status === "RETURNED" ||
      pendingReturnRequestAssetIds.has(asset.id);
    if (returned) {
      returnedAssets.push(merged);
    } else {
      pendingAssets.push(merged);
    }
  });

  const totalAssets =
    event.totalAssets > 0 ? event.totalAssets : event.assetsToReturn.length;
  const returnedCount = Math.min(
    totalAssets,
    Math.max(event.returnedAssets ?? 0, returnedAssets.length),
  );
  const progress =
    totalAssets > 0 ? Math.round((returnedCount / totalAssets) * 100) : 0;

  const handlePendingCheckChange = (asset: AssetRowItem, next: boolean) => {
    setCheckedPendingAssetIds((prev) => {
      const updated = new Set(prev);
      if (next) updated.add(asset.id);
      else updated.delete(asset.id);
      return updated;
    });
  };

  const selectedPendingAssets = pendingAssets.filter((asset) =>
    checkedPendingAssetIds.has(asset.id),
  );

  const handleSendToHr = async () => {
    if (selectedPendingAssets.length === 0) {
      toast.error("Буцаах хөрөнгө сонгоно уу.");
      return;
    }
    if (!returnCondition.trim()) {
      toast.error("Нөхцөл сонгоно уу.");
      return;
    }

    setSendingToHr(true);
    try {
      const settled = await Promise.allSettled(
        selectedPendingAssets.map((asset) =>
          submitReturnRequestMutation({
            variables: {
              assetId: asset.id,
              employeeId: employee.id,
              condition: returnCondition,
              conditionDetail: returnComment.trim() || null,
              photoR2Key: null,
            },
          }),
        ),
      );

      const successCount = settled.filter(
        (result) => result.status === "fulfilled",
      ).length;
      const failedCount = settled.length - successCount;

      if (successCount > 0) {
        toast.success(
          `HR руу буцаах хүсэлт илгээгдлээ (${successCount} хөрөнгө).`,
        );
        setShowReturnedDialog(false);
        setReturnCondition("");
        setReturnComment("");
        setCheckedPendingAssetIds(new Set());
        await Promise.all([refetchEvent(), refetchAssignments()]);
      }

      if (failedCount > 0) {
        toast.error(`${failedCount} хөрөнгө дээр хүсэлт илгээхэд алдаа гарлаа.`);
      }
    } catch (error) {
      toast.error("HR руу илгээх үед алдаа гарлаа.");
    } finally {
      setSendingToHr(false);
    }
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)]">
      <CardContent className="p-4 md:p-5">
        <Dialog open={showReturnedDialog} onOpenChange={setShowReturnedDialog}>
          <DialogContent className="w-[min(96vw,1120px)] max-w-[96vw]">
            <DialogTitle className="sr-only">Хөрөнгө буцаах</DialogTitle>

            <div className="mt-4 grid gap-4 md:grid-cols-[260px_minmax(0,1fr)]">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">
                  Нөхцөл сонгох
                </p>
                <Select
                  value={returnCondition || undefined}
                  onValueChange={setReturnCondition}
                >
                  <SelectTrigger
                    className={`w-full border ${getConditionTone(returnCondition)}`}
                  >
                    <SelectValue placeholder="Нөхцөл сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GOOD">Сайн</SelectItem>
                    <SelectItem value="FAIR">Дунд</SelectItem>
                    <SelectItem value="DAMAGED">Эвдэрсэн</SelectItem>
                    <SelectItem value="LOST">Алга болгосон</SelectItem>
                  </SelectContent>
                </Select>
                <p
                  className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${getConditionTone(returnCondition)}`}
                >
                  Сонгосон: {getConditionLabel(returnCondition)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">
                  Тайлбар (заавал биш)
                </p>
              <textarea
                className="h-10 w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400"
                placeholder="Нэмэлт тайлбар бичиж болно..."
                value={returnComment}
                onChange={(event) => setReturnComment(event.target.value)}
              />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Сонгосон хөрөнгүүд
              </p>
              {selectedPendingAssets.length === 0 ? (
                <p className="text-xs text-slate-500">Сонголт хийгдээгүй байна.</p>
              ) : (
                <div className="overflow-x-auto pb-1">
                  <div className="flex min-w-max gap-3">
                  {selectedPendingAssets.map((item) => (
                    <div
                      key={item.id}
                      className="flex min-w-[320px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3"
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.assetTag}
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
                          {item.assetTag}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          ID: {item.id}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          Serial: {item.serialNumber}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          Нөхцөл:{" "}
                          {item.conditionStatus === "GOOD"
                            ? "Хэвийн"
                            : item.conditionStatus === "DAMAGED"
                              ? "Эвдрэлтэй"
                              : "Тодорхойгүй"}
                        </p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowReturnedDialog(false)}
              >
                Хаах
              </Button>
              <Button
                className="bg-sky-600 text-white hover:bg-sky-700"
                disabled={
                  sendingToHr ||
                  selectedPendingAssets.length === 0 ||
                  !returnCondition.trim()
                }
                onClick={handleSendToHr}
              >
                {sendingToHr ? "Илгээж байна..." : "HR руу явуулах"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
              {getEmployeeName(employee)}
            </h2>
            <p className="mt-1 text-sm text-slate-500 md:text-base">
              {getEmployeeSubtitle(employee)} · хөрөнгө буцаах сүүлийн хугацаа:{" "}
              {formatDate(event.deadline ?? employee.terminationDate)}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 md:justify-end md:gap-5">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-slate-900">
                {progress}%
              </span>
              <Progress
                value={progress}
                className="h-2 w-36 bg-slate-200 md:w-48 [&_[data-slot=progress-indicator]]:bg-[#1a93cf]"
              />
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {expanded ? (
          <div className="mt-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-slate-900" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Буцаах хөрөнгүүд
                  </h3>
                </div>
                <Button
                  type="button"
                  className="rounded-lg bg-sky-600 px-4 text-white hover:bg-sky-700 disabled:bg-slate-300"
                  disabled={selectedPendingAssets.length === 0}
                  onClick={() => {
                    setReturnCondition("");
                    setReturnComment("");
                    setShowReturnedDialog(true);
                  }}
                >
                  Хөрөнгө буцаах
                </Button>
              </div>
              <div className="space-y-2">
                {pendingAssets.length === 0 ? (
                  <p className="rounded-xl bg-[#f3f4f6] px-4 py-3 text-sm text-slate-500">
                    Буцаах хөрөнгө үлдээгүй байна.
                  </p>
                ) : (
                  pendingAssets.map((asset) => (
                    <AssetRow
                      key={asset.id}
                      asset={asset}
                      onOpenAsset={onOpenAsset}
                      showReturnCheckbox
                      checked={checkedPendingAssetIds.has(asset.id)}
                      onReturnedCheckChange={(next) =>
                        handlePendingCheckChange(asset, next)
                      }
                    />
                  ))
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-slate-900" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Буцаасан хөрөнгүүд
                  </h3>
                </div>
              </div>
              <div className="space-y-2">
                {returnedAssets.length === 0 ? (
                  <p className="rounded-xl bg-[#f3f4f6] px-4 py-3 text-sm text-slate-500">
                    Буцаасан хөрөнгө одоогоор алга.
                  </p>
                ) : (
                  returnedAssets.map((asset) => (
                    <AssetRow
                      key={asset.id}
                      asset={asset}
                      onOpenAsset={onOpenAsset}
                    />
                  ))
                )}
              </div>
            </div>
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
  const [detailAssetId, setDetailAssetId] = useState<string | null>(null);

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
    <div className="min-h-[calc(100vh-5.5rem)] p-4 md:p-6">
      <Dialog
        open={!!detailAssetId}
        onOpenChange={(open) => {
          if (!open) {
            setDetailAssetId(null);
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="w-[min(92vw,760px)] max-h-[90vh] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-0 shadow-[0_32px_90px_rgba(15,23,42,0.18)]"
        >
          <DialogTitle className="sr-only">Хөрөнгийн дэлгэрэнгүй</DialogTitle>
          <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1">
            {detailAssetId ? (
              <AssetDetailContent
                assetId={detailAssetId}
                onOffboardingConfirmed={() => {
                  setDetailAssetId(null);
                }}
                onClose={() => {
                  setDetailAssetId(null);
                }}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <h1 className="mb-6 text-xl font-semibold text-slate-900">
        Ажлаас гарах явц
      </h1>

      {loading ? (
        <Card className="rounded-2xl border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Offboarding мэдээлэл ачааллаж байна...
            </div>
          </CardContent>
        </Card>
      ) : null}

      {error ? (
        <Card className="rounded-2xl border border-red-200 bg-red-50">
          <CardContent className="p-4 text-sm text-red-700">
            Offboarding мэдээлэл уншихад алдаа гарлаа: {error.message}
          </CardContent>
        </Card>
      ) : null}

      {!loading && !error && offboardingEmployees.length === 0 ? (
        <Card className="rounded-2xl border border-slate-200 bg-white">
          <CardContent className="p-4 text-sm text-slate-500">
            OFFBOARDING төлөвтэй ажилтан одоогоор алга байна.
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-5">
        {offboardingEmployees.map((employee) => (
          <OffboardingEmployeeCard
            key={employee.id}
            employee={employee}
            onOpenAsset={setDetailAssetId}
          />
        ))}
      </div>
    </div>
  );
}
