"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRightLeft,
  Clock3,
  History,
  Package,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AssignAssetDocument,
  AssetFieldsFragmentDoc,
  EmployeesDocument,
  EmployeeFieldsFragment,
  GetAssetDocument,
  GetAssetHistoryDocument,
  GetAssetsDocument,
  OpenCensusAssetScanStatusDocument,
  RegisterOpenCensusAssetScanDocument,
  TransferAssetDocument,
} from "@/gql/graphql";
import { useFragment } from "@/gql/fragment-masking";

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Эзэмшигчтэй",
  AVAILABLE: "Эзэмшигчгүй",
  FOR_SALE: "Зарж болох",
  DAMAGED: "Эвдрэлтэй",
};

const HISTORY_EVENT_LABELS: Record<string, string> = {
  ASSIGNED: "Олгосон",
  RETURNED: "Буцаасан",
  TRANSFERRED: "Шилжүүлсэн",
  CREATED: "Бүртгэсэн",
  PURCHASED: "Худалдан авсан",
  REGISTERED: "Бүртгэсэн",
  UPDATED: "Шинэчлэгдсэн",
  ASSET_UPDATED: "Шинэчлэгдсэн",
};

const ASSET_FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" rx="48" fill="url(#bg)"/>
      <rect x="140" y="132" width="360" height="240" rx="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="16"/>
      <rect x="180" y="176" width="280" height="152" rx="18" fill="#e2e8f0"/>
      <circle cx="228" cy="232" r="28" fill="#94a3b8"/>
      <path d="M196 312l68-64 54 44 42-32 84 52H196z" fill="#64748b"/>
      <rect x="192" y="420" width="256" height="28" rx="14" fill="#cbd5e1"/>
      <rect x="236" y="468" width="168" height="24" rx="12" fill="#e2e8f0"/>
    </svg>
  `);

const formatDate = (value?: number | string | null) => {
  if (!value) return "—";
  const date = new Date(typeof value === "number" ? value : `${value}`);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("mn-MN", { dateStyle: "medium" }).format(date);
};

const formatDateTime = (value?: number | string | null) => {
  if (!value) return "—";
  const date = new Date(typeof value === "number" ? value : `${value}`);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("mn-MN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatCurrency = (value?: number | null) => {
  if (value == null) return "—";
  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function QRAssetPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const assetId = (params?.id as string) ?? "";
  const fromQrScan = searchParams.get("source") === "qrscan";

  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [condition, setCondition] = useState("GOOD");
  const [reason, setReason] = useState("");

  const { data, loading, refetch } = useQuery(GetAssetDocument, {
    variables: { id: assetId },
    skip: !assetId,
    fetchPolicy: "cache-and-network",
  });
  const { data: employeesData, loading: employeesLoading } =
    useQuery(EmployeesDocument);
  const { data: historyData, loading: historyLoading } = useQuery(
    GetAssetHistoryDocument,
    {
      variables: { assetId },
      skip: !assetId,
      fetchPolicy: "cache-and-network",
    },
  );
  const {
    data: scanStatusData,
    loading: scanStatusLoading,
    refetch: refetchScanStatus,
  } = useQuery(OpenCensusAssetScanStatusDocument, {
    variables: { assetId },
    skip: !assetId || !fromQrScan,
    fetchPolicy: "network-only",
  });

  const [assignAsset, { loading: assigning }] = useMutation(
    AssignAssetDocument,
    {
      refetchQueries: [
        { query: GetAssetDocument, variables: { id: assetId } },
        { query: GetAssetsDocument },
      ],
      awaitRefetchQueries: true,
    },
  );
  const [transferAsset, { loading: transferring }] = useMutation(
    TransferAssetDocument,
    {
      refetchQueries: [
        { query: GetAssetDocument, variables: { id: assetId } },
        { query: GetAssetsDocument },
      ],
      awaitRefetchQueries: true,
    },
  );
  const [registerOpenCensusAssetScan, { loading: registeringToCensus }] =
    useMutation(RegisterOpenCensusAssetScanDocument, {
      onCompleted: async () => {
        toast.success("Хөрөнгийг тооллогод амжилттай бүртгэлээ.");
        await refetchScanStatus();
      },
      onError: (error) =>
        toast.error(error.message || "Тооллогод бүртгэх үед алдаа гарлаа."),
    });

  const asset = useFragment(AssetFieldsFragmentDoc, data?.asset);
  const scanStatus = scanStatusData?.openCensusAssetScanStatus ?? null;
  const employees = useMemo(
    () =>
      (employeesData?.employees ?? []).map((employee) => ({
        id: employee.id,
        name:
          [employee.firstName, employee.lastName].filter(Boolean).join(" ") ||
          employee.email ||
          employee.id,
      })),
    [employeesData?.employees],
  );

  const currentOwner = useMemo(
    () => employees.find((employee) => employee.id === asset?.assignedTo),
    [asset?.assignedTo, employees],
  );
  const historyItems = useMemo(
    () =>
      [...(historyData?.assetHistory ?? [])].sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp),
      ),
    [historyData?.assetHistory],
  );

  const isBusy = assigning || transferring;
  const canSubmit = Boolean(asset && selectedEmployeeId && condition.trim());
  const canAssign = canSubmit && !asset?.assignedTo;
  const canTransfer = canSubmit && Boolean(asset?.assignedTo);
  const canRegisterToCensus = Boolean(scanStatus?.canRegister);

  const resetForm = () => {
    setSelectedEmployeeId("");
    setCondition("GOOD");
    setReason("");
  };

  const handleAssign = async () => {
    if (!asset || !selectedEmployeeId) return;

    try {
      await assignAsset({
        variables: {
          assetId: asset.id,
          employeeId: selectedEmployeeId,
          conditionAtAssign: condition.trim() || undefined,
        },
      });
      toast.success("Хөрөнгийг амжилттай хуваариллаа.");
      resetForm();
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Хуваарилах үед алдаа гарлаа.");
    }
  };

  const handleTransfer = async () => {
    if (!asset || !selectedEmployeeId || !asset.assignedTo) return;

    try {
      await transferAsset({
        variables: {
          assetId: asset.id,
          fromEmployeeId: asset.assignedTo,
          toEmployeeId: selectedEmployeeId,
          reason: reason.trim() || undefined,
          conditionNoted: condition.trim() || undefined,
        },
      });
      toast.success("Хөрөнгө шилжүүлэх хүсэлтийг амжилттай илгээлээ.");
      resetForm();
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Шилжүүлэх үед алдаа гарлаа.");
    }
  };

  const handleRegisterToCensus = async () => {
    if (!assetId) return;
    await registerOpenCensusAssetScan({ variables: { assetId } });
  };

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Хөрөнгийн мэдээлэл ачаалж байна...
        </p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center p-6">
        <Card className="w-full max-w-lg rounded-3xl border border-border/60">
          <CardContent className="py-10 text-center">
            <p className="text-lg font-semibold text-foreground">
              Хөрөнгийн мэдээлэл олдсонгүй
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              QR кодоор ирсэн `id` буруу эсвэл хөрөнгө бүртгэлгүй байна.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
          QR Asset View
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {asset.assetTag || asset.id}
        </h1>
        <p className="text-sm text-muted-foreground">
          QR уншуулсны дараах хөрөнгийн дэлгэрэнгүй болон үйлдлийн хэсэг
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-foreground">
            {STATUS_LABELS[asset.status] || asset.status || "—"}
          </span>
          <span className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground">
            {currentOwner?.name || "Хуваарилагдаагүй"}
          </span>
          <span className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground">
            {asset.category || "—"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
        <Card className="order-2 rounded-3xl border border-border/60 lg:order-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Package className="h-5 w-5" />
              Хөрөнгийн дэлгэрэнгүй
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-5">
            <div className="rounded-3xl border border-border/60 bg-muted/20 p-3 sm:p-5">
              <div className="grid items-start gap-4 sm:gap-5 md:grid-cols-[140px_1fr]">
                <div className="relative mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-2xl border border-border/60 bg-background sm:max-w-[160px] md:mx-0">
                  <Image
                    src={asset.imageUrl || ASSET_FALLBACK_IMAGE}
                    alt={asset.assetTag || asset.id}
                    fill
                    sizes="(max-width: 640px) 140px, 160px"
                    className="object-cover"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">System ID</p>
                    <p className="mt-1 break-all text-sm font-semibold">
                      {asset.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Assigned employee ID
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold">
                      {asset.assignedTo || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location ID</p>
                    <p className="mt-1 break-all text-sm font-semibold">
                      {asset.locationId || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Last updated
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {formatDate(asset.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Asset tag",
                  value: asset.assetTag || "—",
                  breakAll: false,
                },
                {
                  label: "Төлөв",
                  value: STATUS_LABELS[asset.status] || asset.status || "—",
                  breakAll: false,
                },
                {
                  label: "Сериал дугаар",
                  value: asset.serialNumber || "—",
                  breakAll: true,
                },
                {
                  label: "Ангилал",
                  value: asset.category || "—",
                  breakAll: false,
                },
                {
                  label: "Байршил",
                  value: asset.locationPath || "—",
                  breakAll: false,
                },
                {
                  label: "Эзэмшигч",
                  value: currentOwner?.name || "Хуваарилагдаагүй",
                  breakAll: false,
                },
                {
                  label: "Худалдан авсан огноо",
                  value: formatDate(asset.purchaseDate),
                  breakAll: false,
                },
                {
                  label: "Өртөг",
                  value: formatCurrency(asset.purchaseCost),
                  breakAll: false,
                },
                {
                  label: "Үүсгэсэн огноо",
                  value: formatDate(asset.createdAt),
                  breakAll: false,
                },
                {
                  label: "Сүүлд шинэчилсэн",
                  value: formatDate(asset.updatedAt),
                  breakAll: false,
                },
              ].map((field) => (
                <div
                  key={field.label}
                  className="rounded-2xl border border-border/60 bg-muted/30 p-3 sm:p-4"
                >
                  <p className="text-xs text-muted-foreground">{field.label}</p>
                  <p
                    className={`mt-1 text-sm font-semibold sm:text-base ${
                      field.breakAll ? "break-all" : "break-words"
                    }`}
                  >
                    {field.value}
                  </p>
                </div>
              ))}
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-3 sm:col-span-2 sm:p-4">
                <p className="text-xs text-muted-foreground">Тэмдэглэл</p>
                <p className="mt-1 break-words text-sm font-semibold sm:text-base">
                  {asset.notes || "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="order-1 rounded-3xl border border-border/60 lg:order-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl">Үйлдэл хийх</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-3 text-sm sm:p-4">
              <p className="font-medium text-foreground">Одоогийн төлөв</p>
              <p className="mt-1 text-muted-foreground">
                Эзэмшигч: {currentOwner?.name || "Хуваарилагдаагүй"}
              </p>
              <p className="mt-1 text-muted-foreground">
                {fromQrScan
                  ? scanStatusLoading
                    ? "Тооллогын төлөв шалгаж байна..."
                    : scanStatus?.reason || "Тооллогын мэдээлэл олдсонгүй."
                  : asset.assignedTo
                    ? "Энэ хөрөнгийг шинэ ажилтан руу шилжүүлэх боломжтой."
                    : "Энэ хөрөнгө одоогоор эзэмшигчгүй тул шууд хуваарилах боломжтой."}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employee">Ажилтан сонгох</Label>
              <Select
                value={selectedEmployeeId}
                onValueChange={setSelectedEmployeeId}
                disabled={employeesLoading || isBusy}
              >
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Ажилтан сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Хөрөнгийн төлөв / condition</Label>
              <Input
                id="condition"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
                placeholder="Жишээ: GOOD"
                disabled={isBusy}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Тайлбар / шалтгаан</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Шилжүүлэх эсвэл хуваарилах тайлбар"
                disabled={isBusy}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {fromQrScan ? (
                <>
                  <Button
                    onClick={() => void handleRegisterToCensus()}
                    disabled={!canRegisterToCensus || registeringToCensus}
                    className="h-11 w-full gap-2"
                    variant="secondary"
                  >
                    <UserPlus className="h-4 w-4" />
                    {registeringToCensus
                      ? "Бүртгэж байна..."
                      : scanStatus?.alreadyRegistered
                        ? "Тооллогод бүртгэгдсэн"
                        : "Тооллогод бүртгэх"}
                  </Button>
                  <Button
                    onClick={() => router.push("/qrscan")}
                    className="h-11 w-full gap-2"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    Дахин QR уншуулах
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleAssign}
                    disabled={!canAssign || isBusy}
                    className="h-11 w-full gap-2"
                    variant="secondary"
                  >
                    <UserPlus className="h-4 w-4" />
                    {assigning ? "Хуваарилж байна..." : "Хуваарилах"}
                  </Button>
                  <Button
                    onClick={handleTransfer}
                    disabled={!canTransfer || isBusy}
                    className="h-11 w-full gap-2"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    {transferring ? "Шилжүүлж байна..." : "Шилжүүлэх"}
                  </Button>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-dashed border-border/70 p-4 text-xs text-muted-foreground">
              {fromQrScan
                ? scanStatus?.alreadyRegistered
                  ? "Энэ хөрөнгө нээлттэй тооллогод аль хэдийн бүртгэгдсэн байна."
                  : scanStatus?.reason || "Тооллогын мэдээлэл олдсонгүй."
                : asset.assignedTo
                  ? "`Шилжүүлэх` товч нь одоогийн эзэмшигчээс сонгосон ажилтан руу transfer request илгээнэ. `Хуваарилах` товч энэ үед идэвхгүй байна."
                  : "`Хуваарилах` товч нь эзэмшигчгүй хөрөнгийг сонгосон ажилтанд assign хийнэ. `Шилжүүлэх` товч энэ үед идэвхгүй байна."}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <History className="h-5 w-5" />
            Audit Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Audit log ачаалж байна...
            </div>
          ) : historyItems.length ? (
            <div className="space-y-4">
              {historyItems.map((item) => {
                const actor = item.actor as EmployeeFieldsFragment | null;
                const actorName = actor
                  ? [actor.firstName, actor.lastName].filter(Boolean).join(" ")
                  : "Систем";
                const actorMeta = actor
                  ? [actor.role, actor.department, actor.branch, actor.email]
                      .filter(Boolean)
                      .join(" • ")
                  : "System event";

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border/60 bg-muted/20 p-3 sm:p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">
                          {HISTORY_EVENT_LABELS[item.eventType] ||
                            item.eventType ||
                            "—"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description || "Тайлбар бүртгэгдээгүй."}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        <span>{formatDateTime(item.timestamp)}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-xl border border-border/50 bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">
                          Log ID
                        </p>
                        <p className="mt-1 break-all text-sm font-medium">
                          {item.id}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">
                          Event time
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {formatDateTime(item.timestamp)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">
                          Actor
                        </p>
                        <p className="mt-1 text-sm font-medium">{actorName}</p>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-background p-3">
                        <p className="text-[11px] text-muted-foreground">
                          Actor info
                        </p>
                        <p className="mt-1 break-words text-sm font-medium">
                          {actorMeta || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Энэ хөрөнгөн дээр audit log олдсонгүй.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
