"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import type { CensusProgress } from "@/gql/graphql";
import {
  CensusTaskDetailsDocument,
  CloseCensusDocument,
  EmployeesDocument,
  OpenCensusProgressDocument,
  StartCensusDocument,
} from "@/gql/graphql";

type Scope = "ORG" | "EMPLOYEES";

const CENSUS_POLL_INTERVAL_MS = 8000;

function formatDate(value?: number | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

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

  const { data: employeesData } = useQuery(EmployeesDocument);
  const employees = employeesData?.employees ?? [];

  const {
    data: openData,
    startPolling,
    stopPolling,
    refetch: refetchOpenCensus,
  } = useQuery(OpenCensusProgressDocument, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
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
      ? openData.openCensusProgress
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
        const censusProgress = res.startCensus;
        setLastProgress(censusProgress);
        setActiveCensusId(censusProgress.event.id);
        setStartOpen(false);
        toast.success("Тооллого эхэллээ. Мэдэгдлүүд илгээгдлээ.");
      },
      onError: () => toast.error("Тооллого эхлүүлэхэд алдаа гарлаа."),
    },
  );

  const [closeCensus, { loading: closing }] = useMutation(CloseCensusDocument, {
    onError: () => toast.error("Census хаахад алдаа гарлаа."),
  });

  const total = progress?.totalTasks ?? 0;
  const responded = progress?.respondedTasks ?? 0;
  const unassigned = progress?.unassignedTasks ?? 0;
  const pending = Math.max(0, total - responded);
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
      const set = new Set(prev);
      if (next) set.add(id);
      else set.delete(id);
      return set;
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
    if (scope === "EMPLOYEES" && scopeEmployeeIds.length === 0) {
      toast.error("Ажилтан сонгоно уу.");
      return;
    }

    await startCensus({
      variables: {
        input: { name, scope, scopeEmployeeIds, createdBy },
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
    await refetchOpenCensus();
    stopPolling();
    setActiveCensusId(null);
    setLastProgress(null);
    setEndDialogOpen(false);
    toast.success("Census хаагдлаа.");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-[#f5f7fb] p-5 md:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[36px] font-semibold leading-none text-slate-900">
            Эд хөрөнгийн тооллого
          </h1>
          {effectiveCensusId ? (
            <>
              <p className="mt-5 text-2xl font-semibold text-slate-900">
                {progress?.event.name ?? name}
              </p>
              <p className="mt-1 text-base text-slate-600">
                Байршил: Гурван гол оффис
              </p>
            </>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-3 pt-0.5">
          {!effectiveCensusId ? (
            <Button
              className="h-10 gap-2 rounded-lg bg-[#0b5f8a] px-5 text-[15px] font-medium text-white hover:bg-[#0a5278]"
              onClick={() => setStartOpen(true)}
            >
              Тооллого эхлүүлэх
            </Button>
          ) : (
            <>
              <Button
                className="h-10 gap-2 rounded-lg bg-[#0b5f8a] px-5 text-[15px] font-medium text-white hover:bg-[#0a5278]"
                onClick={() => setEndDialogOpen(true)}
              >
                Тооллого дуусгах
              </Button>
              <p className="text-sm text-slate-500">
                Эхэлсэн огноо: {formatDate(progress?.event.startedAt)}
              </p>
            </>
          )}
        </div>
      </div>

      {effectiveCensusId ? (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-900">
                  Нийт хөрөнгө
                </p>
                <p className="mt-2 text-[32px] font-semibold leading-none text-slate-900">
                  {total.toLocaleString("mn-MN")}
                </p>
                <p className="mt-3 text-sm text-slate-500">100%</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-900">
                  Баталгаажсан
                </p>
                <p className="mt-2 text-[32px] font-semibold leading-none text-slate-900">
                  {responded.toLocaleString("mn-MN")}
                </p>
                <p className="mt-3 text-sm text-slate-500">{percent}%</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-900">
                  Хүлээгдэж буй
                </p>
                <p className="mt-2 text-[32px] font-semibold leading-none text-slate-900">
                  {pending.toLocaleString("mn-MN")}
                </p>
                <p className="mt-3 text-sm text-slate-500">{100 - percent}%</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-900">Эвдрэлтэй</p>
                <p className="mt-2 text-[32px] font-semibold leading-none text-slate-900">
                  0
                </p>
                <p className="mt-3 text-sm text-slate-500">0%</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-900">
                  Баталгаажаагүй
                </p>
                <p className="mt-2 text-[32px] font-semibold leading-none text-slate-900">
                  {unassigned.toLocaleString("mn-MN")}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  {total > 0 ? Math.round((unassigned / total) * 100) : 0}%
                </p>
              </CardContent>
            </Card>
          </div>

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
                  <span>{percent}%</span>
                </div>
                <Progress value={percent} className="h-3" />
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Баталгаажсан: {responded.toLocaleString("mn-MN")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Хүлээгдэж буй: {pending.toLocaleString("mn-MN")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Баталгаажаагүй: {unassigned.toLocaleString("mn-MN")}
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <p className="text-sm font-medium text-foreground">
                  Ажилтан бүрийн явц: {doneCount}/{verifierRows.length}
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
            </CardContent>
          </Card>
        </>
      ) : null}

      <Dialog open={startOpen} onOpenChange={setStartOpen}>
        <DialogContent className="max-w-[min(92vw,620px)]">
          <DialogHeader>
            <DialogTitle>Start Census</DialogTitle>
            <DialogDescription>
              Scope сонгоод эхлүүлнэ. Employee scope дээр тодорхой ажилтнууд
              сонгоно.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Нэр</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
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
                            onCheckedChange={(value) =>
                              toggleEmployee(e.id, Boolean(value))
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
                <p className="text-xs text-muted-foreground">Initializing...</p>
                <Progress value={40} />
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

      <Dialog open={endDialogOpen} onOpenChange={setEndDialogOpen}>
        <DialogContent className="w-[min(94vw,980px)] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Census summary</DialogTitle>
            <DialogDescription>
              Progress болон ажилтан бүрийн asset response дэлгэрэнгүй.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 overflow-y-auto pr-1">
            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {responded}/{total} responses
                </span>
                <span className="font-medium">{percent}%</span>
              </div>
              <Progress value={percent} />
            </div>

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
                    const employeeLabel =
                      [t.verifier?.firstName, t.verifier?.lastName]
                        .filter(Boolean)
                        .join(" ")
                        .trim() ||
                      t.verifier?.email ||
                      "Unassigned";
                    const target = employees.find(
                      (e) => e.id === t.transferredToEmployeeId,
                    );
                    const targetLabel = target
                      ? [target.firstName, target.lastName]
                          .filter(Boolean)
                          .join(" ") ||
                        target.email ||
                        target.id
                      : (t.transferredToEmployeeId ?? "—");

                    return (
                      <tr key={t.id} className="border-t">
                        <td className="px-3 py-2">{idx + 1}</td>
                        <td className="px-3 py-2">{employeeLabel}</td>
                        <td className="px-3 py-2">{t.asset.assetTag}</td>
                        <td className="px-3 py-2">
                          {t.asset.serialNumber ?? "—"}
                        </td>
                        <td className="px-3 py-2">{t.status}</td>
                        <td className="px-3 py-2">{t.reason ?? "—"}</td>
                        <td className="px-3 py-2">{targetLabel}</td>
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
