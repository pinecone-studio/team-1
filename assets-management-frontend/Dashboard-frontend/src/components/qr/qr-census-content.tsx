"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  Package,
  Wrench,
  UserCheck,
  ChevronRight,
  PackageX,
  PackageCheck,
} from "lucide-react";
import Link from "next/link";
import { GetAssetKpisDocument, GetAssetsDocument } from "@/gql/graphql";

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("mn-MN").format(value)}₮`;

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Баталгаажсан",
  AVAILABLE: "Эзэмшигчгүй",
  FOR_SALE: "Зарж болох",
  DAMAGED: "Эвдрэлтэй",
  IN_REPAIR: "Засаж байгаа",
};

function formatDate(ts: number | null | undefined) {
  if (ts == null || Number.isNaN(ts)) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

const KPI_CONFIG = [
  {
    key: "total" as const,
    title: "Нийт хөрөнгө",
    icon: Package,
    iconBg: "bg-sky-50 border-sky-300",
    iconColor: "text-sky-600",
    barColor: "bg-sky-500",
  },
  {
    key: "assigned" as const,
    title: "Баталгаажсан",
    icon: PackageCheck as unknown as typeof Package,
    iconBg: "bg-emerald-50 border-emerald-300",
    iconColor: "text-emerald-600",
    barColor: "bg-emerald-500",
  },
  {
    key: "unassigned" as const,
    title: "Хүлээгдэгдэж буй",
    icon: Clock,
    iconBg: "bg-amber-50 border-amber-300",
    iconColor: "text-amber-600",
    barColor: "bg-amber-500",
  },
  {
    key: "forSale" as const,
    title: "Эвдрэлтэй",
    icon: Wrench,
    iconBg: "bg-yellow-50 border-yellow-300",
    iconColor: "text-yellow-600",
    barColor: "bg-yellow-500",
  },
  {
    key: "broken" as const,
    title: "Баталгаажаагүй",
    icon: PackageX,
    iconBg: "bg-orange-50 border-orange-300",
    iconColor: "text-orange-600",
    barColor: "bg-orange-500",
  },
];

export function QRCensusContent() {
  const [startOpen, setStartOpen] = useState(false);
  const [scope, setScope] = useState<Scope>("ORG");
  const [name, setName] = useState("1-р улирлын тооллого");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<Set<string>>(
    new Set(),
  );
  const [activeCensusId, setActiveCensusId] = useState<string | null>(null);
  const [lastProgress, setLastProgress] = useState<CensusProgress | null>(null);
  const [endDialogOpen, setEndDialogOpen] = useState(false);

  const kpis = kpiData?.assetKpis;
  const totalCount = kpis?.totalCount ?? 0;
  const totalValue = kpis?.totalValue ?? 0;

  const {
    data: openData,
    startPolling,
    stopPolling,
  } = useQuery(OpenCensusProgressDocument, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    // Зөвхөн нээлттэй census байхад л polling (GET хүсэлтийг багасгах)
    const hasOpenCensus =
      activeCensusId != null || openData?.openCensusProgress?.event.id != null;
    if (hasOpenCensus) startPolling(CENSUS_POLL_INTERVAL_MS);
    else stopPolling();

    return () => stopPolling();
  }, [
    activeCensusId,
    openData?.openCensusProgress?.event.id,
    startPolling,
    stopPolling,
  ]);

  const effectiveCensusId =
    activeCensusId ?? openData?.openCensusProgress?.event.id ?? null;

  const progress: CensusProgress | undefined =
    openData?.openCensusProgress?.event.id === effectiveCensusId
      ? (openData.openCensusProgress as unknown as CensusProgress)
      : (lastProgress ?? undefined);

  const { data: taskDetailsData } = useQuery(CensusTaskDetailsDocument, {
    variables: { censusId: effectiveCensusId ?? "" },
    skip: !effectiveCensusId || !endDialogOpen,
    fetchPolicy: "network-only",
  });

  const [startCensus, { loading: starting }] = useMutation(
    StartCensusDocument,
    {
      onCompleted: (res) => {
        const censusProgress = res.startCensus as unknown as CensusProgress;
        setLastProgress(censusProgress);
        setActiveCensusId(censusProgress.event.id);
        setStartOpen(false);
        toast.success("Тооллого эхэллээ. Мэдэгдлүүд илгээгдлээ.");
      },
      onError: () => toast.error("Тооллого эхлүүлэхэд алдаа гарлаа."),
    },
  );

  const [closeCensus, { loading: closing }] = useMutation(CloseCensusDocument, {
    onCompleted: () => {
      toast.success("Census хаагдлаа.");
      setActiveCensusId(null);
      setLastProgress(null);
      setEndDialogOpen(false);
    },
    onError: () => toast.error("Census хаахад алдаа гарлаа."),
  });

  const total = progress?.totalTasks ?? 0;
  const responded = progress?.respondedTasks ?? 0;
  const percent = total > 0 ? Math.round((responded / total) * 100) : 0;

  const verifierRows = progress?.verifierProgress ?? [];
  const doneCount = verifierRows.filter((v) => v.done).length;
  const taskDetails = taskDetailsData?.censusTaskDetails ?? [];

  const sortedEmployees = useMemo(
    () =>
      [...employees].sort((a, b) =>
        (a.firstName ?? a.email ?? "").localeCompare(
          b.firstName ?? b.email ?? "",
        ),
      ),
    [employees],
  );

  const toggleEmployee = (id: string, next: boolean) => {
    setSelectedEmployeeIds((prev) => {
      const n = new Set(prev);
      if (next) n.add(id);
      else n.delete(id);
      return n;
    });
  };

  const handleStart = async () => {
    const createdBy = employees[0]?.id;
    if (!createdBy) {
      toast.error("Employees data олдсонгүй (createdBy хэрэгтэй).");
      return;
    }
    const scopeEmployeeIds =
      scope === "EMPLOYEES" ? Array.from(selectedEmployeeIds) : undefined;
    if (
      scope === "EMPLOYEES" &&
      scopeEmployeeIds &&
      scopeEmployeeIds.length === 0
    ) {
      toast.error("Ажилтан сонгоно уу.");
      return;
    }
    await startCensus({
      variables: {
        input: {
          name,
          scope,
          scopeEmployeeIds,
          createdBy,
        },
      },
    });
  };

  const handleCloseCensus = async () => {
    const closedBy = employees[0]?.id;
    if (!effectiveCensusId || !closedBy) {
      toast.error("Census хаахад шаардлагатай өгөгдөл алга.");
      return;
    }
    await closeCensus({ variables: { censusId: effectiveCensusId, closedBy } });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-[#f5f7fb] p-5 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[36px] font-semibold leading-none text-slate-900">
            Эд хөрөнгийн тооллого
          </h1>
          <p className="mt-5 text-2xl font-semibold text-slate-900">
            {censusName || "1-р улирлын тооллого"}
          </p>
          <p className="mt-1 text-base text-slate-600">
            Байршил: Гурван гол оффис
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 pt-0.5">
          {censusStarted ? (
            <>
              <Button className="h-10 gap-2 rounded-lg bg-[#0b5f8a] px-5 text-[15px] font-medium text-white hover:bg-[#0a5278]">
                Тооллого дуусгах
              </Button>
              <p className="text-sm text-slate-500">
                Эхэлсэн огноо:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </>
          ) : (
            <Button
              className="h-10 gap-2 rounded-lg bg-[#0b5f8a] px-5 text-[15px] font-medium text-white hover:bg-[#0a5278]"
              onClick={() => setIsStartOpen(true)}
            >
              <span className="text-lg leading-none">+</span>
              Тооллого эхлүүлэх
            </Button>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const progress =
            kpi.key === "total"
              ? 100
              : totalCount > 0
                ? Math.min(100, Math.round((kpi.count / totalCount) * 100))
                : 0;
          return (
            <Card
              key={kpi.title}
              className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
            >
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {kpi.title}
                    </p>
                    <p className="mt-2 text-[18px] font-semibold leading-none text-slate-900">
                      {loading ? "—" : formatMoney(kpi.value)}
                    </p>
                  </div>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${kpi.iconColor} ${kpi.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${kpi.iconColor}`} />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-slate-500">
                    {loading ? "—" : `${kpi.count}ш`}
                  </p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-[#168ac2]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Тооллогын явц */}
      <Card className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <CardContent className="space-y-5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-slate-900">
              Тооллогын явц
            </p>
            <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Идэвхтэй
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-end text-sm text-slate-600">
              <span>{loading ? "—" : `${progressPercent}%`}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#168ac2] transition-[width]"
                style={{
                  width: loading ? "0%" : `${progressPercent}%`,
                }}
              />
            </div>
            <Progress value={percent} />

            <div className="grid gap-2">
              <p className="text-sm font-medium text-foreground">
                Employees responded: {doneCount}/{verifierRows.length}
              </p>
              <div className="max-h-[260px] overflow-y-auto rounded-xl border border-slate-200">
                <ul className="divide-y">
                  {verifierRows.map((v) => {
                    const label =
                      [v.employee?.firstName, v.employee?.lastName]
                        .filter(Boolean)
                        .join(" ")
                        .trim() ||
                      v.employee?.email ||
                      v.employee?.id ||
                      "—";
                    const p =
                      v.total > 0
                        ? Math.round((v.responded / v.total) * 100)
                        : 0;
                    return (
                      <li key={v.employee?.id ?? label} className="p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {v.responded}/{v.total}
                            </p>
                          </div>
                          <div className="w-[180px]">
                            <Progress value={p} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Сүүлд шинэчлэгдсэн хөрөнгүүд */}
      <Card className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl font-semibold text-slate-900">
              Сүүлд баталгаажсан хөрөнгүүд
            </p>
            <Link
              href="/qr"
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-800"
            >
              Бүгдийг үзэх
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="rounded-xl bg-slate-50 text-slate-600">
                <tr>
                  <th className="rounded-l-lg px-3 py-2 font-medium">№</th>
                  <th className="px-3 py-2 font-medium">Ангилал</th>
                  <th className="px-3 py-2 font-medium">Хөрөнгийн ID</th>
                  <th className="px-3 py-2 font-medium">Төлөв</th>
                  <th className="rounded-r-lg px-3 py-2 font-medium">
                    Баталгаажсан огноо
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-900">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      Уншиж байна...
                    </td>
                  </tr>
                ) : recentAssets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      Хөрөнгө олдсонгүй
                    </td>
                  </tr>
                ) : (
                  recentAssets.map((asset, idx) => (
                    <tr
                      key={asset.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-3">{idx + 1}</td>
                      <td className="px-3 py-3 font-medium">
                        {asset.category ?? "—"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {asset.assetTag}
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          {STATUS_LABELS[asset.status ?? ""] ??
                            asset.status ??
                            "—"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {formatDate(asset.updatedAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isStartOpen} onOpenChange={setIsStartOpen}>
        <DialogContent className="max-w-xl rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle>Start Census</DialogTitle>
            <DialogDescription>
              Scope сонгоод эхлүүлнэ. Employee scope дээр тодорхой ажилтнууд
              сонгоно.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Тооллогын нэрийг оруулна уу
              </label>
              <input
                placeholder="1-р улирлын тооллого"
                value={censusName}
                onChange={(e) => setCensusName(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-slate-50 px-4 text-base outline-none focus:border-slate-400"
              />
            </div>

            <div className="grid gap-2">
              <Label>Scope</Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant={scope === "ORG" ? "default" : "outline"}
                  className={
                    scope === "ORG" ? "bg-[#0b6fae] hover:bg-[#095f93]" : ""
                  }
                  onClick={() => setScope("ORG")}
                >
                  By Organization
                </Button>
                <Button
                  type="button"
                  variant={scope === "EMPLOYEES" ? "default" : "outline"}
                  className={
                    scope === "EMPLOYEES"
                      ? "bg-[#0b6fae] hover:bg-[#095f93]"
                      : ""
                  }
                  onClick={() => setScope("EMPLOYEES")}
                >
                  By Employees
                </Button>
              </div>
            </div>

            {scope === "EMPLOYEES" ? (
              <div className="grid gap-2">
                <Label>Employees</Label>
                <div className="max-h-[260px] overflow-y-auto rounded-xl border border-slate-200 bg-white">
                  <ul className="divide-y">
                    {sortedEmployees.map((e) => {
                      const checked = selectedEmployeeIds.has(e.id);
                      const label =
                        [e.firstName, e.lastName].filter(Boolean).join(" ") ||
                        e.email ||
                        e.id;
                      return (
                        <li key={e.id} className="flex items-center gap-3 p-3">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(v) =>
                              toggleEmployee(e.id, Boolean(v))
                            }
                          />
                          <span className="text-sm text-foreground">
                            {label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : null}

            {starting ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Алба хэлтэс сонгох
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border bg-slate-50 px-4 text-base outline-none focus:border-slate-400"
                >
                  <option value="">Сонгоно уу</option>
                  <option value="marketing">Маркетингийн алба</option>
                  <option value="finance">Санхүүгийн алба</option>
                  <option value="training">Сургалтын алба</option>
                </select>
              </div>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setStartOpen(false)}
              disabled={starting}
            >
              Болих
            </Button>
            <Button
              className="bg-[#0b6fae] text-white hover:bg-[#095f93]"
              onClick={() => void handleStart()}
              disabled={starting}
            >
              {starting ? "Эхлүүлж байна..." : "Эхлүүлэх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

            {scope === "category" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Ангилал сонгох
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border bg-slate-50 px-4 text-base outline-none focus:border-slate-400"
                >
                  <option value="">Сонгоно уу</option>
                  <option value="it-equipment">IT тоног төхөөрөмж</option>
                  <option value="furniture">Тавилга</option>
                  <option value="appliances">Цахилгаан хэрэгсэл</option>
                </select>
              </div>
            )}

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[860px] text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-3 py-2 font-medium">#</th>
                    <th className="px-3 py-2 font-medium">Employee</th>
                    <th className="px-3 py-2 font-medium">Asset</th>
                    <th className="px-3 py-2 font-medium">Serial</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Reason</th>
                    <th className="px-3 py-2 font-medium">Transferred To</th>
                    <th className="px-3 py-2 font-medium">Responded At</th>
                  </tr>
                </thead>
                <tbody>
                  {taskDetails.map((t, idx) => {
                    const emp =
                      [t.verifier?.firstName, t.verifier?.lastName]
                        .filter(Boolean)
                        .join(" ")
                        .trim() ||
                      t.verifier?.email ||
                      "Unassigned";
                    const toEmp = employees.find(
                      (e) => e.id === t.transferredToEmployeeId,
                    );
                    const toLabel = toEmp
                      ? [toEmp.firstName, toEmp.lastName]
                          .filter(Boolean)
                          .join(" ") ||
                        toEmp.email ||
                        toEmp.id
                      : (t.transferredToEmployeeId ?? "—");
                    return (
                      <tr key={t.id} className="border-t">
                        <td className="px-3 py-2">{idx + 1}</td>
                        <td className="px-3 py-2">{emp}</td>
                        <td className="px-3 py-2">{t.asset.assetTag}</td>
                        <td className="px-3 py-2">
                          {t.asset.serialNumber ?? "—"}
                        </td>
                        <td className="px-3 py-2">{t.status}</td>
                        <td className="px-3 py-2">{t.reason ?? "—"}</td>
                        <td className="px-3 py-2">{toLabel}</td>
                        <td className="px-3 py-2">
                          {t.respondedAt
                            ? new Date(t.respondedAt).toLocaleString()
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                  {taskDetails.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-3 py-8 text-center text-muted-foreground"
                      >
                        Response хараахан ирээгүй байна.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEndDialogOpen(false)}
              disabled={closing}
            >
              Close
            </Button>
            <Button
              className="bg-[#0b6fae] text-white hover:bg-[#095f93]"
              onClick={() => void handleCloseCensus()}
              disabled={closing || !effectiveCensusId}
            >
              {closing ? "Ending..." : "Confirm End Census"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
