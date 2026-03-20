"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CensusProgressDocument,
  EmployeeCensusTasksDocument,
  EmployeesDocument,
  OpenCensusProgressDocument,
  SubmitCensusResponsesDocument,
} from "@/gql/graphql";

type NotAvailableReason = "BROKEN" | "LOST" | "TRANSFERRED";
type ResponseStatus = "CONFIRMED" | "NOT_AVAILABLE";

export function CensusResponseDialog({
  open,
  onOpenChange,
  censusId,
  employeeId,
  notificationId,
  onMarkRead,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  censusId: string;
  employeeId: string;
  notificationId?: string | null;
  onMarkRead?: (id: string) => Promise<unknown> | void;
}) {
  const [local, setLocal] = useState<
    Record<
      string,
      {
        status: "CONFIRMED" | "NOT_AVAILABLE";
        reason?: NotAvailableReason;
        transferredToEmployeeId?: string;
      }
    >
  >({});

  const { data: progressData } = useQuery(CensusProgressDocument, {
    variables: { censusId },
    skip: !open,
    fetchPolicy: "network-only",
  });

  const {
    data: tasksData,
    loading: tasksLoading,
    refetch,
  } = useQuery(EmployeeCensusTasksDocument, {
    variables: { censusId, employeeId },
    skip: !open,
    fetchPolicy: "network-only",
  });

  const { data: employeesData } = useQuery(EmployeesDocument, { skip: !open });
  const employees = employeesData?.employees ?? [];

  const tasks = tasksData?.employeeCensusTasks ?? [];

  const defaults = useMemo(() => {
    const next: typeof local = {};
    for (const t of tasks) {
      if (t.status === "CONFIRMED" || t.status === "NOT_AVAILABLE") continue;
      next[t.assetId] = { status: "CONFIRMED" };
    }
    return next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length]);

  const model = { ...defaults, ...local };

  const [submit, { loading: submitting }] = useMutation(
    SubmitCensusResponsesDocument,
    {
      refetchQueries: [
        { query: CensusProgressDocument, variables: { censusId } },
        { query: OpenCensusProgressDocument },
        {
          query: EmployeeCensusTasksDocument,
          variables: { censusId, employeeId },
        },
      ],
      awaitRefetchQueries: true,
      onCompleted: async () => {
        toast.success("Тооллогын хариуг илгээлээ.");
        await refetch();
        if (notificationId && onMarkRead) {
          await onMarkRead(notificationId);
        }
        onOpenChange(false);
      },
      onError: () => toast.error("Илгээхэд алдаа гарлаа."),
    },
  );

  const canSubmit = tasks.length > 0;

  const handleSubmit = async () => {
    const responses = tasks.map((t) => {
      const row = model[t.assetId] ?? { status: "CONFIRMED" as const };
      if (row.status === "NOT_AVAILABLE" && !row.reason) {
        throw new Error("Шалтгаан сонгоно уу.");
      }
      if (
        row.status === "NOT_AVAILABLE" &&
        row.reason === "TRANSFERRED" &&
        !row.transferredToEmployeeId
      ) {
        throw new Error("Шилжүүлэх ажилтан сонгоно уу.");
      }
      return {
        assetId: t.assetId,
        status: row.status,
        reason: row.status === "NOT_AVAILABLE" ? (row.reason ?? null) : null,
        transferredToEmployeeId:
          row.status === "NOT_AVAILABLE" && row.reason === "TRANSFERRED"
            ? (row.transferredToEmployeeId ?? null)
            : null,
      };
    });

    await submit({ variables: { censusId, employeeId, responses } });
  };

  const title = progressData?.censusProgress?.event?.name ?? "Census";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,760px)] max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col max-h-[90vh]">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Тооллогын баталгаажуулалт</DialogTitle>
            <DialogDescription>
              {title} — өөрт олгогдсон хөрөнгүүдээ шалгана уу.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 pb-4">
            {tasksLoading ? (
              <p className="text-sm text-muted-foreground py-10">
                Уншиж байна…
              </p>
            ) : tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10">
                Энэ тооллогод танд баталгаажуулах хөрөнгө алга байна.
              </p>
            ) : (
              <div className="space-y-4">
                {tasks.map((t) => {
                  const row = model[t.assetId] ?? {
                    status: "CONFIRMED" as const,
                  };
                  return (
                    <div
                      key={t.id}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {t.asset.assetTag}{" "}
                            <span className="text-xs font-normal text-muted-foreground">
                              ({t.asset.category ?? "—"})
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            S/N: {t.asset.serialNumber ?? "—"} • AssetID:{" "}
                            {t.assetId}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Одоогийн төлөв: {t.asset.status ?? "—"}
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <RadioGroup
                        value={row.status}
                        onValueChange={(v) =>
                          setLocal((prev) => ({
                            ...prev,
                            [t.assetId]: { status: v as ResponseStatus },
                          }))
                        }
                        className="grid gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="CONFIRMED" id={`${t.id}-ok`} />
                          <Label htmlFor={`${t.id}-ok`}>
                            Байгаа (баталгаажуулах)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="NOT_AVAILABLE"
                            id={`${t.id}-na`}
                          />
                          <Label htmlFor={`${t.id}-na`}>
                            Байхгүй / боломжгүй
                          </Label>
                        </div>
                      </RadioGroup>

                      {row.status === "NOT_AVAILABLE" ? (
                        <div className="mt-3 space-y-3">
                          <div className="grid gap-2">
                            <Label className="text-xs text-muted-foreground">
                              Шалтгаан
                            </Label>
                            <Select
                              value={row.reason ?? ""}
                              onValueChange={(v) =>
                                setLocal((prev) => ({
                                  ...prev,
                                  [t.assetId]: {
                                    ...row,
                                    reason: v as NotAvailableReason,
                                  },
                                }))
                              }
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue placeholder="Сонгоно уу" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BROKEN">Эвдэрсэн</SelectItem>
                                <SelectItem value="LOST">Алдагдсан</SelectItem>
                                <SelectItem value="TRANSFERRED">
                                  Өөр ажилтанд шилжүүлсэн
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {row.reason === "TRANSFERRED" ? (
                            <div className="grid gap-2">
                              <Label className="text-xs text-muted-foreground">
                                Шилжүүлсэн ажилтан
                              </Label>
                              <Select
                                value={row.transferredToEmployeeId ?? ""}
                                onValueChange={(v) =>
                                  setLocal((prev) => ({
                                    ...prev,
                                    [t.assetId]: {
                                      ...row,
                                      transferredToEmployeeId: v,
                                    },
                                  }))
                                }
                              >
                                <SelectTrigger className="h-9">
                                  <SelectValue placeholder="Ажилтан сонгох" />
                                </SelectTrigger>
                                <SelectContent>
                                  {employees
                                    .filter((e) => e.id !== employeeId)
                                    .map((e) => (
                                      <SelectItem key={e.id} value={e.id}>
                                        {[e.firstName, e.lastName]
                                          .filter(Boolean)
                                          .join(" ") ||
                                          e.email ||
                                          e.id}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <DialogFooter className="px-6 pb-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Хаах
            </Button>
            <Button
              className="bg-[#0b6fae] text-white hover:bg-[#095f93]"
              onClick={() => {
                void handleSubmit().catch((error: unknown) => {
                  const message =
                    error instanceof Error ? error.message : "Шалгана уу.";
                  toast.error(message);
                });
              }}
              disabled={!canSubmit || submitting}
            >
              {submitting ? "Илгээж байна..." : "Илгээх"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
