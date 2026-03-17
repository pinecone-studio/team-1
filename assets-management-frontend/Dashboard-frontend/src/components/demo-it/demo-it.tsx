"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, History, Search, X, Eye, Wrench, Bell } from "lucide-react";
import { useQuery, useMutation } from "@apollo/client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  GetActiveDisposalsDocument,
  GetDisposalRequestsDocument,
  GetMaintenanceTicketsDocument,
  GetDashboardDocument,
  ApproveDisposalDocument,
  RejectDisposalDocument,
  UpdateMaintenanceTicketDocument,
  EmployeesDocument,
  UserRole,
} from "@/gql/graphql";

const DISPOSAL_STATUS_LABELS: Record<string, string> = {
  PENDING: "Хүлээгдэж буй",
  IT_APPROVED: "IT баталгаажсан",
  FINANCE_APPROVED: "Санхүү баталгаажсан",
  COMPLETED: "Дууссан",
  REJECTED: "Татгалзсан",
};

type DisposalItem = {
  id: string;
  assetId: string;
  method: string;
  reason?: string | null;
  status: string;
  createdAt: number;
  asset?: { id?: string; assetTag?: string; category?: string } | null;
  requestedBy?: { id?: string; firstName?: string; lastName?: string; email?: string } | null;
};

const DEMO_IT_APPROVER_INDEX = 0;

type MaintenanceItem = {
  id: string;
  assetId: string;
  reporterId: string;
  description: string;
  severity: string;
  status: string;
  repairCost?: number | null;
  resolvedAt?: number | null;
  createdAt: number;
  updatedAt: number;
};

const MAINTENANCE_STATUS_LABELS: Record<string, string> = {
  OPEN: "Нээлттэй",
  IN_PROGRESS: "Хийгдэж буй",
  RESOLVED: "Шийдвэрлэгдсэн",
  CLOSED: "Хаагдсан",
};

export function DemoITContent({
  title = "IT Хяналтын самбар",
}: {
  title?: string;
}) {
  const [selectedDisposal, setSelectedDisposal] = useState<DisposalItem | null>(null);

  const { data: disposalsData } = useQuery(
    GetActiveDisposalsDocument,
    { fetchPolicy: "cache-first" },
  );
  const { data: employeesData } = useQuery(EmployeesDocument);
  const demoApproverId = employeesData?.employees?.[DEMO_IT_APPROVER_INDEX]?.id ?? "";

  const { data: allDisposalsData } = useQuery(GetDisposalRequestsDocument, {
    variables: { status: undefined },
    fetchPolicy: "cache-first",
  });
  const allDisposals = allDisposalsData?.disposalRequests ?? [];

  const { data: maintenanceData } = useQuery(GetMaintenanceTicketsDocument, {
    variables: { status: undefined },
    fetchPolicy: "cache-first",
  });
  const allMaintenanceTickets = (maintenanceData?.maintenanceTickets ?? []) as MaintenanceItem[];

  const { data: dashboardData } = useQuery(GetDashboardDocument, {
    variables: { role: UserRole.ItAdmin },
    fetchPolicy: "cache-first",
  });
  const itNotifications =
    (dashboardData?.dashboard?.itView?.notifications ?? []) as Array<{
      id: string;
      title: string;
      message: string;
      type?: string;
      link?: string | null;
      createdAt?: number;
    }>;

  const [approveDisposal, { loading: approving }] = useMutation(
    ApproveDisposalDocument,
    {
      refetchQueries: [
        { query: GetActiveDisposalsDocument },
        { query: GetDisposalRequestsDocument, variables: { status: undefined } },
        { query: GetDashboardDocument, variables: { role: UserRole.ItAdmin } },
      ],
    },
  );
  const [rejectDisposal, { loading: rejecting }] = useMutation(
    RejectDisposalDocument,
    {
      refetchQueries: [
        { query: GetActiveDisposalsDocument },
        { query: GetDisposalRequestsDocument, variables: { status: undefined } },
        { query: GetDashboardDocument, variables: { role: UserRole.ItAdmin } },
      ],
    },
  );

  const [updateMaintenanceTicket, { loading: updatingMaintenance }] = useMutation(
    UpdateMaintenanceTicketDocument,
    {
      refetchQueries: [
        { query: GetMaintenanceTicketsDocument, variables: { status: undefined } },
        { query: GetDashboardDocument, variables: { role: UserRole.ItAdmin } },
      ],
    },
  );

  const pendingDisposals = disposalsData?.disposalRequests ?? [];

  const handleApprove = async (id: string) => {
    if (!demoApproverId) {
      toast.error("Баталгаажуулах ажилтан олдсонгүй.");
      return;
    }
    try {
      await approveDisposal({
        variables: { id, approvedBy: demoApproverId, stage: "IT_APPROVED" },
      });
      toast.success("Устгах хүсэлтийг IT-ээр баталгаажууллаа.");
    } catch (err) {
      toast.error("Баталгаажуулахад алдаа гарлаа.");
    }
  };

  const handleReject = async (id: string) => {
    if (!demoApproverId) {
      toast.error("Татгалзах ажилтан олдсонгүй.");
      return;
    }
    try {
      await rejectDisposal({
        variables: { id, rejectedBy: demoApproverId, reason: "Татгалзсан" },
      });
      toast.error("Устгах хүсэлтийг татгалзлаа.");
    } catch (err) {
      toast.error("Татгалзах үед алдаа гарлаа.");
    }
  };

  return (
    <ScrollArea className="h-full min-h-0 flex-1 w-full">
      <div className="flex flex-col gap-4 p-6 pb-10 min-h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground italic">
            IT-д илгээгдсэн бүх хүсэлт — устгах хүсэлт, засварын дуудлага
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" /> Түүх
        </Button>
      </div>

      {/* Ажилтнаас ирсэн мэдэгдэл — хэнээс ирсэн, Accept/Decline */}
      {itNotifications.length > 0 && (
        <Card className="mt-4 border-violet-200 bg-violet-50/30 shrink-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-violet-800">
              <Bell className="h-5 w-5" /> Ажилтнаас ирсэн мэдэгдэл ({itNotifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-3">
                {itNotifications.map((n) => {
                  const disposalId = n.link?.match(/\/disposal\/([^/]+)/)?.[1];
                  const isDisposal = Boolean(disposalId);
                  const maintenanceId = n.link?.match(/\/maintenance\/([^/]+)/)?.[1];
                  const isMaintenance = Boolean(maintenanceId);
                  return (
                    <div
                      key={n.id}
                      className="rounded-lg border border-violet-100 bg-white p-3 text-sm"
                    >
                      <p className="font-medium text-foreground">{n.title}</p>
                      <p className="mt-1 text-muted-foreground">{n.message}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Хэнээс ирсэн: Ажилтан (системийн мэдэгдэл)
                      </p>
                      {n.createdAt && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Илгээсэн огноо: {new Date(n.createdAt).toLocaleString()}
                        </p>
                      )}
                      {(isDisposal || isMaintenance) && (
                        <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            className="gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              if (disposalId) handleApprove(disposalId);
                              if (maintenanceId)
                                updateMaintenanceTicket({
                                  variables: { id: maintenanceId, status: "IN_PROGRESS" },
                                });
                            }}
                            disabled={approving || rejecting || updatingMaintenance}
                          >
                            <Check className="h-3.5 w-3.5" /> Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 border-rose-600 text-rose-600 hover:bg-rose-50"
                            onClick={() => {
                              if (disposalId) handleReject(disposalId);
                              if (maintenanceId)
                                updateMaintenanceTicket({
                                  variables: { id: maintenanceId, status: "CLOSED" },
                                });
                            }}
                            disabled={approving || rejecting || updatingMaintenance}
                          >
                            <X className="h-3.5 w-3.5" /> Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Устгах хүсэлтүүд (PENDING) — ажилтан "Миний хөрөнгө" дээрээс илгээсэн */}
      <Card className="mt-6 border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-blue-800">
            <ShieldCheck className="h-5 w-5" /> Устгах хүсэлтүүд ({pendingDisposals.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingDisposals.length === 0 ? (
            <p className="rounded-lg border border-dashed border-blue-200 bg-white p-6 text-center text-sm text-muted-foreground">
              Одоогоор хүлээгдэж буй устгах хүсэлт байхгүй. Ажилтан «Миний хөрөнгө» → хөрөнгө дээр дарж «Устгах хүсэлт илгээх»-ээр илгээж болно.
            </p>
          ) : (
            pendingDisposals.map((req) => {
              const r = req as DisposalItem;
              const assetName = r.asset?.assetTag ?? r.assetId;
              const categoryName = r.asset?.category ?? "—";
              const requesterName = r.requestedBy
                ? [r.requestedBy.firstName, r.requestedBy.lastName].filter(Boolean).join(" ") || r.requestedBy.email
                : "—";
              return (
              <div
                key={req.id}
                className="flex flex-col justify-between gap-4 rounded-lg border border-blue-100 bg-white p-4 sm:flex-row sm:items-center shadow-sm cursor-pointer hover:bg-blue-50/50 transition-colors"
                onClick={() => setSelectedDisposal(r)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                    {(assetName ?? "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">
                      {assetName} <span className="text-muted-foreground font-normal">({categoryName})</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Хэнээс: <span className="font-medium text-foreground">{requesterName}</span> | Арга: {r.method} | {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDisposal(r);
                    }}
                  >
                    <Eye className="h-3.5 w-3.5" /> Дэлгэрэнгүй
                  </Button>
                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                    PENDING
                  </Badge>
                  <Button
                    onClick={() => handleApprove(r.id)}
                    className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
                    size="sm"
                    disabled={approving || rejecting}
                  >
                    <Check className="h-4 w-4" /> Батлах (IT)
                  </Button>
                  <Button
                    onClick={() => handleReject(r.id)}
                    variant="outline"
                    className="gap-2 border-rose-600 text-rose-600 hover:bg-rose-50"
                    size="sm"
                    disabled={approving || rejecting}
                  >
                    <X className="h-4 w-4" /> Цуцлах
                  </Button>
                </div>
              </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Засварын дуудлага — IT-д ирсэн бүх засварын хүсэлт */}
      <Card className="mt-6 border-amber-200 bg-amber-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-amber-800">
            <Wrench className="h-5 w-5" /> Засварын дуудлага ({allMaintenanceTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allMaintenanceTickets.length === 0 ? (
            <p className="rounded-lg border border-dashed border-amber-200 bg-white p-6 text-center text-sm text-muted-foreground">
              Засварын дуудлага байхгүй байна.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Хөрөнгийн ID</TableHead>
                  <TableHead>Тайлбар</TableHead>
                  <TableHead>Ноцтой байдал</TableHead>
                  <TableHead>Төлөв</TableHead>
                  <TableHead>Огноо</TableHead>
                  <TableHead className="text-right">Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allMaintenanceTickets.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">{t.assetId}</TableCell>
                    <TableCell className="max-w-xs truncate text-sm">{t.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {t.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          t.status === "OPEN"
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : t.status === "RESOLVED" || t.status === "CLOSED"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                        }
                      >
                        {MAINTENANCE_STATUS_LABELS[t.status] ?? t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(t.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {t.status === "OPEN" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            className="gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() =>
                              updateMaintenanceTicket({
                                variables: { id: t.id, status: "IN_PROGRESS" },
                              })
                            }
                            disabled={updatingMaintenance}
                          >
                            <Check className="h-3.5 w-3.5" /> Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 border-rose-600 text-rose-600 hover:bg-rose-50"
                            onClick={() =>
                              updateMaintenanceTicket({
                                variables: { id: t.id, status: "CLOSED" },
                              })
                            }
                            disabled={updatingMaintenance}
                          >
                            <X className="h-3.5 w-3.5" /> Decline
                          </Button>
                        </div>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Бүх устгах хүсэлт — бараа, хэнээс, баталгаажуулсан */}
      <Card className="mt-6 border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Устгах хүсэлт — бараа, хэнээс, баталгаажуулсан
          </CardTitle>
          <div className="relative w-48">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Хайх..."
              className="w-full rounded-md border border-input bg-transparent pl-8 py-1.5 text-xs outline-none"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Хөрөнгө (нэр / ангилал)</TableHead>
                <TableHead>Хэнээс ирсэн</TableHead>
                <TableHead>Устгах арга</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead>Баталгаажуулсан</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDisposals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-sm">
                    Устгах хүсэлт байхгүй байна.
                  </TableCell>
                </TableRow>
              ) : (
                allDisposals.map((req) => {
                  const r = req as DisposalItem;
                  const assetName = r.asset?.assetTag ?? r.assetId;
                  const categoryName = r.asset?.category ?? "—";
                  const requesterName = r.requestedBy
                    ? [r.requestedBy.firstName, r.requestedBy.lastName].filter(Boolean).join(" ") || r.requestedBy.email
                    : "—";
                  const statusLabel = DISPOSAL_STATUS_LABELS[r.status] ?? r.status;
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        {assetName} <span className="text-muted-foreground font-normal">({categoryName})</span>
                      </TableCell>
                      <TableCell>{requesterName}</TableCell>
                      <TableCell className="text-sm">{r.method}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            r.status === "COMPLETED"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : r.status === "REJECTED"
                                ? "bg-rose-100 text-rose-700 border-rose-200"
                                : r.status === "IT_APPROVED" || r.status === "FINANCE_APPROVED"
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-amber-100 text-amber-600 border-amber-200"
                          }
                        >
                          {statusLabel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Устгах хүсэлтийн дэлгэрэнгүй — мэдээлэл шалгах dialog */}
      <Dialog
        open={!!selectedDisposal}
        onOpenChange={(open) => !open && setSelectedDisposal(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Устгах хүсэлтийн дэлгэрэнгүй</DialogTitle>
            <DialogDescription>
              Ажилтанаас ирсэн устгах хүсэлтийн мэдээлэл. Шалгаад Батлах эсвэл Цуцлах товчоор шийднэ үү.
            </DialogDescription>
          </DialogHeader>
          {selectedDisposal && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-muted-foreground">Хөрөнгө (нэр):</div>
                <div className="font-medium">{selectedDisposal.asset?.assetTag ?? selectedDisposal.assetId}</div>
                <div className="text-muted-foreground">Ангилал:</div>
                <div className="font-medium">{selectedDisposal.asset?.category ?? "—"}</div>
                <div className="text-muted-foreground">Хэнээс ирсэн (ажилтан):</div>
                <div className="font-medium">
                  {selectedDisposal.requestedBy
                    ? [selectedDisposal.requestedBy.firstName, selectedDisposal.requestedBy.lastName].filter(Boolean).join(" ") || selectedDisposal.requestedBy.email
                    : "—"}
                </div>
                {selectedDisposal.requestedBy?.email && (
                  <>
                    <div className="text-muted-foreground">Имэйл:</div>
                    <div className="font-medium text-xs">{selectedDisposal.requestedBy.email}</div>
                  </>
                )}
                <div className="text-muted-foreground">Устгах арга:</div>
                <div className="font-medium">{selectedDisposal.method}</div>
                {selectedDisposal.reason && (
                  <>
                    <div className="text-muted-foreground">Шалтгаан:</div>
                    <div className="font-medium">{selectedDisposal.reason}</div>
                  </>
                )}
                <div className="text-muted-foreground">Төлөв:</div>
                <div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                    {selectedDisposal.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground">Илгээсэн огноо:</div>
                <div className="font-medium">
                  {new Date(selectedDisposal.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setSelectedDisposal(null)}>
              Хаах
            </Button>
            {selectedDisposal && (
              <>
                <Button
                  className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={async () => {
                    await handleApprove(selectedDisposal.id);
                    setSelectedDisposal(null);
                  }}
                  disabled={approving || rejecting}
                >
                  <Check className="h-4 w-4" /> Батлах (IT)
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-rose-600 text-rose-600 hover:bg-rose-50"
                  onClick={async () => {
                    await handleReject(selectedDisposal.id);
                    setSelectedDisposal(null);
                  }}
                  disabled={approving || rejecting}
                >
                  <X className="h-4 w-4" /> Цуцлах
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </ScrollArea>
  );
}
