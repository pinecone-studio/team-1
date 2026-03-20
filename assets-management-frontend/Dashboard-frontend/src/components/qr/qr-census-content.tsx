"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CategoriesDocument,
  CensusTaskDetailsDocument,
  CloseCensusDocument,
  EmployeesDocument,
  OpenCensusProgressDocument,
  StartCensusDocument,
} from "@/gql/graphql";

type Scope = "ORG" | "EMPLOYEES";
type CoverageMode = "ALL_ORG" | "BY_DEPARTMENT" | "BY_CATEGORY";

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
  const [name, setName] = useState("1-р улирлын тооллого");
  const [coverageMode, setCoverageMode] = useState<CoverageMode | "">("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lastProgress, setLastProgress] = useState<any>(null);
  const [endDialogOpen, setEndDialogOpen] = useState(false);

  const { data: employeesData, refetch: refetchEmployees } =
    useQuery(EmployeesDocument);
  const employees = employeesData?.employees ?? [];
  const { data: categoriesData } = useQuery(CategoriesDocument);

  const {
    data: openData,
    startPolling,
    stopPolling,
    refetch: refetchOpenCensus,
  } = useQuery(OpenCensusProgressDocument, {
    fetchPolicy: "network-only",
  });

  const openProgress = openData?.openCensusProgress ?? null;
  const effectiveCensusId =
    openProgress?.event?.id ?? lastProgress?.event?.id ?? null;
  const progress = openProgress ?? lastProgress ?? undefined;

  useEffect(() => {
    startPolling(CENSUS_POLL_INTERVAL_MS);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  // Stop polling when there's no active census
  useEffect(() => {
    if (!effectiveCensusId) {
      stopPolling();
    } else {
      startPolling(CENSUS_POLL_INTERVAL_MS);
    }
  }, [effectiveCensusId, startPolling, stopPolling]);

  useEffect(() => {
    if (openProgress?.event?.id) {
      setLastProgress(openProgress);
      return;
    }

    // Census was closed - clear state
    if (openData && openProgress == null) {
      setLastProgress(null);
      setEndDialogOpen(false);
    }
  }, [openProgress, openData]);

  const { data: taskDetailsData } = useQuery(CensusTaskDetailsDocument, {
    variables: { censusId: effectiveCensusId ?? "" },
    skip: !effectiveCensusId || !endDialogOpen,
    fetchPolicy: "network-only",
  });

  const [startCensus, { loading: starting }] = useMutation(StartCensusDocument);

  const [closeCensus, { loading: closing }] = useMutation(CloseCensusDocument, {
    refetchQueries: [
      {
        query: OpenCensusProgressDocument,
        fetchPolicy: "network-only",
      },
    ],
    onError: (error) => {
      console.error("Close census error:", error);
      toast.error("Census хаахад алдаа гарлаа.");
    },
  });

  const total = progress?.totalTasks ?? 0;
  const responded = progress?.respondedTasks ?? 0;
  const unassigned = progress?.unassignedTasks ?? 0;
  const pending = Math.max(0, total - responded);
  const percent = total > 0 ? Math.round((responded / total) * 100) : 0;
  const verifierRows = progress?.verifierProgress ?? [];
  const doneCount = verifierRows.filter((v: any) => v.done).length;
  const taskDetails = taskDetailsData?.censusTaskDetails ?? [];
  const departmentOptions = useMemo(
    () =>
      Array.from(
        new Set(
          employees
            .map((employee) => employee.department?.trim())
            .filter((department): department is string => Boolean(department)),
        ),
      ).sort((left, right) => left.localeCompare(right)),
    [employees],
  );
  const categoryOptions = useMemo(() => {
    const rows = categoriesData?.categories ?? [];
    const flattened = rows.flatMap((category) => [
      { id: category.id, name: category.name },
      ...(category.subcategories ?? []).map((sub) => ({
        id: sub.id,
        name: sub.name,
      })),
    ]);
    const byId = new Map<string, { id: string; name: string }>();
    for (const item of flattened) {
      if (!item.id || !item.name) continue;
      byId.set(item.id, item);
    }
    return Array.from(byId.values()).sort((left, right) =>
      left.name.localeCompare(right.name),
    );
  }, [categoriesData?.categories]);

  const handleStart = async () => {
    let createdBy = employees[0]?.id;
    if (!createdBy) {
      const latest = await refetchEmployees();
      createdBy = latest.data?.employees?.[0]?.id;
    }
    if (!createdBy) createdBy = "SYSTEM_CENSUS_ACTOR";
    const safeName = name.trim() || "Шинэ тооллого";
    const safeCoverageMode: CoverageMode = coverageMode || "ALL_ORG";

    if (safeCoverageMode === "BY_DEPARTMENT" && !selectedDepartment) {
      toast.error("Алба, хэлтэс сонгоно уу.");
      return;
    }
    if (safeCoverageMode === "BY_CATEGORY" && !selectedCategory) {
      toast.error("Ангилал сонгоно уу.");
      return;
    }

    let scope: Scope = "ORG";
    let scopeEmployeeIds: string[] | undefined;
    let department: string | undefined;
    let categoryId: string | undefined;
    if (safeCoverageMode === "BY_DEPARTMENT") {
      scope = "EMPLOYEES";
      department = selectedDepartment;
      scopeEmployeeIds = employees
        .filter((employee) => employee.department === selectedDepartment)
        .map((employee) => employee.id);

      if (scopeEmployeeIds.length === 0) {
        toast.error("Сонгосон албанд ажилтан олдсонгүй.");
        return;
      }
    }

    if (safeCoverageMode === "BY_CATEGORY") {
      scope = "ORG";
      categoryId = selectedCategory;
    }

    const applyStarted = (started: any) => {
      if (!started?.event?.id) return false;
      setLastProgress(started);
      setStartOpen(false);
      toast.success("Тооллого эхэллээ.");
      return true;
    };

    try {
      const advancedResult = await startCensus({
        variables: {
          input: {
            name: safeName,
            scope,
            createdBy,
            scopeEmployeeIds,
          },
        },
      });
      if (applyStarted(advancedResult.data?.startCensus)) return;
    } catch (error: any) {
      const msg =
        error?.graphQLErrors?.[0]?.message ||
        error?.networkError?.message ||
        error?.message ||
        "";

      const isInputSchemaMismatch =
        msg.includes("coverageMode") ||
        msg.includes("department") ||
        msg.includes("categoryId") ||
        msg.includes("StartCensusInput");

      if (isInputSchemaMismatch) {
        try {
          const legacyResult = await startCensus({
            variables: {
              input: {
                name: safeName,
                scope,
                scopeEmployeeIds,
                createdBy,
              },
            },
          });
          if (applyStarted(legacyResult.data?.startCensus)) return;
        } catch (legacyError: any) {
          const legacyMessage =
            legacyError?.graphQLErrors?.[0]?.message ||
            legacyError?.networkError?.message ||
            legacyError?.message ||
            "Тооллого эхлүүлэхэд алдаа гарлаа.";
          toast.error(legacyMessage);
        }
      }

      const latestOpen = await refetchOpenCensus();
      const fallback = latestOpen.data?.openCensusProgress;
      if (fallback?.event?.id) {
        setLastProgress(fallback);
        setStartOpen(false);
        toast.info("Нээлттэй тооллого руу шилжүүллээ.");
        return;
      }

      if (!isInputSchemaMismatch) {
        toast.error(msg || "Тооллого эхлүүлэхэд алдаа гарлаа.");
      }
    }
  };

  const handleCloseCensus = async () => {
    const closedBy = employees[0]?.id;
    if (!effectiveCensusId || !closedBy) {
      toast.error("Census хаахад шаардлагатай өгөгдөл алга.");
      return;
    }

    try {
      await closeCensus({
        variables: { censusId: effectiveCensusId, closedBy },
      });
      const result = await refetchOpenCensus();

      // Only clear state after successful close
      setLastProgress(null);
      setEndDialogOpen(false);
      toast.success("Census хаагдлаа.");

      // Add a small delay to ensure state is updated before any polling resumes
      setTimeout(() => {
        if (!result.data?.openCensusProgress) {
          // If there's no open census, reset the state
          setLastProgress(null);
        }
      }, 500);
    } catch (error) {
      console.error("Error closing census:", error);
      toast.error("Census хаахад алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <div className="flex min-h-[calc(100svh-140px)] flex-1 flex-col bg-[#f3f4f6] p-5 md:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] font-semibold leading-none text-slate-900">
            Хөрөнгийн тооллого
          </h1>
          {effectiveCensusId ? (
            <>
              <p className="mt-5 text-[18px] font-semibold text-slate-900">
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
                className="h-10 gap-2 rounded-lg bg-[#0f4c6e] px-5 text-[15px] font-medium text-white hover:bg-[#0a5278]"
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
                    {verifierRows.map((v: any) => {
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
        <DialogContent
          showCloseButton={false}
          className="w-[min(96vw,980px)] border-0 bg-transparent p-0 shadow-none"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Тооллого эхлүүлэх
              </h2>
              <button
                type="button"
                onClick={() => setStartOpen(false)}
                className="inline-flex h-6 w-6 items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-1.5">
                <Label className="text-xs text-slate-700">
                  Тооллогын нэрийг оруулна уу
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 rounded-md border-slate-200 bg-[#f3f4f6] text-sm"
                />
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs text-slate-700">
                  Цар хүрээ сонгох
                </Label>
                <Select
                  value={coverageMode}
                  onValueChange={(value) => {
                    setCoverageMode(value as CoverageMode);
                    setSelectedDepartment("");
                    setSelectedCategory("");
                  }}
                >
                  <SelectTrigger className="h-10 rounded-md border-slate-200 bg-[#f3f4f6] text-sm">
                    <SelectValue placeholder="Сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL_ORG">Байгууллага бүхлдээ</SelectItem>
                    <SelectItem value="BY_DEPARTMENT">
                      Алба, хэлтсээр
                    </SelectItem>
                    <SelectItem value="BY_CATEGORY">Ангиллаар</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {coverageMode === "BY_DEPARTMENT" ? (
                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-700">
                    Алба, хэлтэс сонгох
                  </Label>
                  <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger className="h-10 rounded-md border-slate-200 bg-[#f3f4f6] text-sm">
                      <SelectValue placeholder="Алба, хэлтэс сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentOptions.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              {coverageMode === "BY_CATEGORY" ? (
                <div className="grid gap-1.5">
                  <Label className="text-xs text-slate-700">
                    Ангилал сонгох
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="h-10 rounded-md border-slate-200 bg-[#f3f4f6] text-sm">
                      <SelectValue placeholder="Ангилал сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setStartOpen(false)}
                disabled={starting}
                className="h-9 border-[#0b5f8a] px-4 text-xs text-slate-700"
              >
                Болих
              </Button>
              <Button
                className="h-9 bg-[#0b5f8a] px-4 text-xs text-white hover:bg-[#0a5278]"
                onClick={() => void handleStart()}
                disabled={starting}
              >
                {starting ? "Түр хүлээнэ үү..." : "Тооллого эхлүүлэх"}
              </Button>
            </div>
          </div>
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
