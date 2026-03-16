"use client";

import React, { useMemo, useState } from "react";
import { Check, X, Bell, Eye, ClipboardCheck, Trash2, LogOut, Send, UserPlus, ArrowRightLeft } from "lucide-react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  EmployeesDocument,
  GetEmployeeAssignmentsDocument,
  RequestDisposalDocument,
  GetActiveOffboardingDocument,
  StartOffboardingDocument,
  TransferAssetDocument,
  ReturnAssetDocument,
  AssignAssetDocument,
} from "@/gql/graphql";

type AssignmentItem = {
  id: string;
  assetId: string;
  assignedAt: number;
  asset?: { id: string; assetTag?: string; category?: string; serialNumber?: string } | null;
  financing?: {
    assignedValue?: number | null;
    totalPayment?: number | null;
    monthlyPayment?: number | null;
    paymentPlanMonths?: number | null;
  } | null;
  requestedBy?: { id: string; firstName?: string | null; lastName?: string | null } | null;
};

const DEMO_EMPLOYEE_EMAIL = "tsetsegulziiocherdene@gmail.com";

const UpdateAssignmentStatusDocument = gql`
  mutation UpdateAssignmentStatus($assignmentId: ID!, $status: String!) {
    updateAssignmentStatus(assignmentId: $assignmentId, status: $status) {
      id
      status
    }
  }
`;

export function DemoEmployeeContent({
  title = "Миний хөрөнгө",
}: {
  title?: string;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);
  const [disposalReason, setDisposalReason] = useState("");
  const [disposalSending, setDisposalSending] = useState(false);
  const [transferToEmployeeId, setTransferToEmployeeId] = useState<string>("");
  const [transferReason, setTransferReason] = useState("");
  const [transferSending, setTransferSending] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showItTransferDialog, setShowItTransferDialog] = useState(false);
  const [showOffboardingModal, setShowOffboardingModal] = useState(false);
  const [showRequestsDialog, setShowRequestsDialog] = useState(false);
  /** Илгээгдсэн шилжүүлэлт хүлээгдэж буй (цаад хүн хүлээн авах хүртэл) */
  const [pendingTransferSent, setPendingTransferSent] = useState<{ toName: string; assetTag: string } | null>(null);

  const { data: employeesData } = useQuery(EmployeesDocument, {
    fetchPolicy: "network-only",
  });
  const currentEmployeeId = useMemo(
    () =>
      employeesData?.employees?.find(
        (e) => e.email?.toLowerCase() === DEMO_EMPLOYEE_EMAIL.toLowerCase(),
      )?.id ?? null,
    [employeesData],
  );

  const [updateAssignmentStatus, { loading: updatingStatus }] = useMutation(
    UpdateAssignmentStatusDocument,
  );
  const [requestDisposalMutation] = useMutation(RequestDisposalDocument);
  const [startOffboardingMutation, { loading: offboardingStarting }] = useMutation(StartOffboardingDocument);
  const [transferAssetMutation] = useMutation(TransferAssetDocument);
  const [returnAssetMutation] = useMutation(ReturnAssetDocument);
  const [assignAssetMutation] = useMutation(AssignAssetDocument);

  const { data: offboardingData, refetch: refetchOffboarding } = useQuery(GetActiveOffboardingDocument, {
    variables: { employeeId: currentEmployeeId ?? "" },
    skip: !currentEmployeeId,
  });
  const activeOffboarding = offboardingData?.offboardingEvent ?? null;

  // 1. Хүлээгдэж буй хүсэлтүүд (PENDING болон ASSIGN_REQUESTED аль аль нь)
  const queryVars = { employeeId: currentEmployeeId ?? "" };
  const {
    data: dataAssignRequested,
    loading: loadingAssignRequested,
    refetch: refetchAssignRequested,
  } = useQuery(GetEmployeeAssignmentsDocument, {
    variables: { ...queryVars, status: "ASSIGN_REQUESTED" },
    skip: !currentEmployeeId,
    fetchPolicy: "network-only",
  });
  const {
    data: dataPending,
    loading: loadingPending,
    refetch: refetchPending,
  } = useQuery(GetEmployeeAssignmentsDocument, {
    variables: { ...queryVars, status: "PENDING" },
    skip: !currentEmployeeId,
    fetchPolicy: "network-only",
  });

  // 2. Active Query - Миний эзэмшиж буй хөрөнгө
  const {
    data: activeData,
    loading: activeLoading,
    refetch: refetchActive,
  } = useQuery(GetEmployeeAssignmentsDocument, {
    variables: { ...queryVars, status: "ACTIVE" },
    skip: !currentEmployeeId,
  });

  const pendingLoading = loadingAssignRequested || loadingPending;
  const pendingList = useMemo(() => {
    const a = dataAssignRequested?.employeeAssignments ?? [];
    const b = dataPending?.employeeAssignments ?? [];
    const seen = new Set<string>();
    return [...a, ...b].filter((x) => {
      if (seen.has(x.id)) return false;
      seen.add(x.id);
      return true;
    });
  }, [dataAssignRequested?.employeeAssignments, dataPending?.employeeAssignments]);
  const currentPending = pendingList[0] ?? null;
  const activeAssignments = activeData?.employeeAssignments ?? [];
  /** Миний эзэмшиж буй хөрөнгө: идэвхтэй + хүлээгдэж буй (pending) бүгд */
  const myAssetsList = useMemo(() => {
    const seen = new Set<string>();
    const list: Array<typeof activeAssignments[0] & { status: string }> = [];
    activeAssignments.forEach((a) => {
      seen.add(a.id);
      list.push({ ...a, status: "ACTIVE" });
    });
    pendingList.forEach((a) => {
      if (!seen.has(a.id)) {
        seen.add(a.id);
        list.push({ ...a, status: (a as { status?: string }).status ?? "ASSIGN_REQUESTED" });
      }
    });
    return list;
  }, [activeAssignments, pendingList]);

  // Үйлдэл бүрийн дараа дараагийн хүсэлт рүү шилжих логик
  const handleActionComplete = async () => {
    setIsChecked(false);
    await Promise.all([
      refetchAssignRequested(),
      refetchPending(),
      refetchActive(),
    ]);
  };

  const handleApprove = async (id: string) => {
    try {
      toast.loading("Хүлээн авч байна...", { id: "approve" });
      await updateAssignmentStatus({
        variables: { assignmentId: id, status: "ACTIVE" },
      });
      toast.success(
        "Хөрөнгийг хүлээн авлаа. Дараагийн хүсэлт рүү шилжиж байна...",
        { id: "approve" },
      );
      await handleActionComplete();
    } catch (err) {
      toast.error("Хүсэлт амжилтгүй боллоо.", { id: "approve" });
      await handleActionComplete();
    }
  };

  const handleReject = async (id: string) => {
    try {
      toast.loading("Татгалзаж байна...", { id: "reject" });
      await updateAssignmentStatus({
        variables: { assignmentId: id, status: "REJECTED" },
      });
      toast.error("Хөрөнгөөс татгалзлаа.", { id: "reject" });
      await handleActionComplete();
    } catch (err) {
      toast.error("Хүсэлт амжилтгүй боллоо.", { id: "reject" });
      await handleActionComplete();
    }
  };

  const handleVerify = () => {
    setIsChecked(true);
    setIsDialogOpen(false);
    toast.info("Нөхцөл шалгаж дууслаа. Одоо баталгаажуулах боломжтой.");
  };

  const handleRequestDisposal = async () => {
    if (!selectedAssignment?.asset?.id || !currentEmployeeId) return;
    setDisposalSending(true);
    try {
      await requestDisposalMutation({
        variables: {
          assetId: selectedAssignment.asset.id,
          requestedBy: currentEmployeeId,
          method: "RECYCLE",
          reason: disposalReason || undefined,
        },
      });
      toast.success("Устгах хүсэлт IT руу амжилттай илгээгдлээ. Дараа нь санхүү баталгаажуулна.");
      setSelectedAssignment(null);
      setDisposalReason("");
    } catch (err) {
      toast.error("Устгах хүсэлт илгээхэд алдаа гарлаа.");
    } finally {
      setDisposalSending(false);
    }
  };

  const handleStartOffboarding = async () => {
    if (!currentEmployeeId) return;
    setShowOffboardingModal(false);
    try {
      toast.loading("Ажилаас гарах үйлдэл эхлүүлж байна...", { id: "offboard" });
      await startOffboardingMutation({
        variables: { employeeId: currentEmployeeId, initiatedBy: currentEmployeeId },
      });
      toast.success("Ажилаас гарах (offboarding) эхэллээ. Хөрөнгөө буцааж өгнө үү.", { id: "offboard" });
      await refetchOffboarding();
    } catch (err) {
      toast.error("Ажилаас гарах эхлүүлэхэд алдаа гарлаа.", { id: "offboard" });
    }
  };

  const otherEmployees = useMemo(() => {
    const list = (employeesData?.employees ?? []) as Array<{ id: string; firstName?: string | null; lastName?: string | null; email?: string | null }>;
    return list.filter((e) => e.id !== currentEmployeeId).map((e) => ({
      id: e.id,
      name: [e.firstName, e.lastName].filter(Boolean).join(" ") || e.email || e.id,
    }));
  }, [employeesData?.employees, currentEmployeeId]);

  const handleTransferToEmployee = async () => {
    if (!selectedAssignment?.asset?.id || !currentEmployeeId || !transferToEmployeeId) {
      toast.error("Хүлээн авах ажилтан сонгоно уу.");
      return;
    }
    const assetId = selectedAssignment.asset.id;
    const toName = otherEmployees.find((e) => e.id === transferToEmployeeId)?.name ?? transferToEmployeeId;
    setTransferSending(true);
    try {
      await returnAssetMutation({
        variables: { assetId, conditionAtReturn: transferReason || "Шилжүүлэх" },
      });
      await assignAssetMutation({
        variables: {
          assetId,
          employeeId: transferToEmployeeId,
          conditionAtAssign: "GOOD",
        },
      });
      setPendingTransferSent({
        toName,
        assetTag: selectedAssignment.asset?.assetTag ?? selectedAssignment.assetId,
      });
      toast.success(
        `${toName} руу шилжүүлэх хүсэлт илгээгдлээ. Тэр хүн "Шинэ хүсэлт" дээрээ хүлээн авах хүртэл хүлээгдэнэ.`,
      );
      setShowTransferDialog(false);
      setTransferToEmployeeId("");
      setTransferReason("");
      setSelectedAssignment(null);
      await refetchActive();
    } catch (err) {
      toast.error("Шилжүүлэх хүсэлт илгээхэд алдаа гарлаа.");
    } finally {
      setTransferSending(false);
    }
  };

  const handleTransferToIt = async () => {
    if (!selectedAssignment?.asset?.id || !currentEmployeeId || !transferToEmployeeId) {
      toast.error("IT ажилтан сонгоно уу.");
      return;
    }
    setTransferSending(true);
    try {
      await transferAssetMutation({
        variables: {
          assetId: selectedAssignment.asset.id,
          fromEmployeeId: currentEmployeeId,
          toEmployeeId: transferToEmployeeId,
          reason: "IT ажилтан руу шилжүүлсэн",
        },
      });
      toast.success("Хөрөнгө IT ажилтан руу амжилттай шилжүүлэгдлээ.");
      setShowItTransferDialog(false);
      setTransferToEmployeeId("");
      setSelectedAssignment(null);
      refetchActive();
    } catch (err) {
      toast.error("IT руу шилжүүлэхэд алдаа гарлаа.");
    } finally {
      setTransferSending(false);
    }
  };

  const employeesLoading = !employeesData && !currentEmployeeId;
  const employeeNotFound =
    employeesData?.employees && employeesData.employees.length > 0 && !currentEmployeeId;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      {employeeNotFound && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Демо ажилтан олдсонгүй: <strong>{DEMO_EMPLOYEE_EMAIL}</strong> имэйлтэй ажилтан өгөгдлийн санд байх ёстой.
        </div>
      )}
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <div className="flex items-center gap-2">
          {currentEmployeeId && !activeOffboarding && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowOffboardingModal(true)}
              disabled={offboardingStarting}
            >
              <LogOut className="h-4 w-4" />
              Ажилаас гарах (Offboarding)
            </Button>
          )}
          {activeOffboarding && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              Offboarding эхэлсэн
            </Badge>
          )}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => {
                if (pendingList.length === 0) {
                  toast.info("Танд одоогоор шинэ хүсэлт байхгүй байна.");
                  return;
                }
                setShowRequestsDialog(true);
              }}
            >
              <Bell className="h-5 w-5" />
              {pendingList.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white font-bold">
                  {pendingList.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Гарах (Offboarding) modal — хөрөнгө болон төлбөрийн үлдэгдэл */}
      <Dialog open={showOffboardingModal} onOpenChange={setShowOffboardingModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ажилаас гарах (Offboarding)</DialogTitle>
            <DialogDescription>
              Эзэмшиж буй хөрөнгө болон төлбөрийн үлдэгдлийг шалгана уу. Гарахыг баталгаажуулбал offboarding эхэлнэ.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {activeAssignments.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Таны нэр дээр идэвхтэй хөрөнгө байхгүй байна.
              </p>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Хөрөнгө</TableHead>
                      <TableHead>Сериал</TableHead>
                      <TableHead>Огноо</TableHead>
                      <TableHead>Төлбөрийн үлдэгдэл</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeAssignments.map((assignment) => {
                      const a = assignment as AssignmentItem;
                      const fin = a.financing;
                      const hasBalance = fin && (Number(fin.totalPayment) > 0 || Number(fin.assignedValue) > 0);
                      const balanceText = hasBalance
                        ? `${(fin.totalPayment ?? fin.assignedValue ?? 0).toLocaleString()} ₮`
                        : "Үлдэгдэл байхгүй";
                      return (
                        <TableRow key={a.id}>
                          <TableCell className="font-medium">
                            {a.asset?.assetTag ?? a.assetId}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {a.asset?.serialNumber ?? "—"}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(a.assignedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className={hasBalance ? "font-medium text-amber-700" : "text-muted-foreground"}>
                            {balanceText}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowOffboardingModal(false)}>
              Цуцлах
            </Button>
            <Button
              onClick={handleStartOffboarding}
              disabled={offboardingStarting}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Гарах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Илгээгч тал: хүлээгдэж буй шилжүүлэлт (цаад хүн хүлээн авах хүртэл) */}
      {pendingTransferSent && (
        <Card className="mt-6 border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-blue-800">
                Хүлээгдэж буй шилжүүлэлт
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 h-8"
                onClick={() => setPendingTransferSent(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-blue-700">
              <span className="font-medium">{pendingTransferSent.assetTag}</span> хөрөнгийг{" "}
              <span className="font-medium">{pendingTransferSent.toName}</span> руу шилжүүлэх хүсэлт илгээгдсэн. Тэр хүн
              &quot;Шинэ хүсэлт&quot; дээрээ хүлээн авах хүртэл хүлээгдэнэ.
            </p>
          </CardHeader>
        </Card>
      )}

      {/* 2. Шинэ хүсэлт — хүлээн авагч тал: таны руу шилжүүлсэн бүх хүсэлт энд харагдана (modal) */}
      <Dialog open={showRequestsDialog} onOpenChange={setShowRequestsDialog}>
        <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-medium text-amber-800">
              <Bell className="h-4 w-4" /> Шинэ хүсэлт ({pendingList.length})
            </DialogTitle>
            <DialogDescription>
              Таны руу шилжүүлсэн бүх хөрөнгийн хүсэлт. Хүсэлт бүр дээр нөхцөл
              шалгаж, хүлээн авах эсвэл татгалзах боломжтой.
            </DialogDescription>
          </DialogHeader>
          {pendingList.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {currentEmployeeId
                ? "Танд одоогоор шинэ хүсэлт байхгүй байна."
                : "Ажилтны мэдээлэл ачаалж байна..."}
            </p>
          ) : (
            <div className="space-y-3 mt-2">
              {pendingList.map((pending) => {
                const a = pending as AssignmentItem;
                const requestedByName = a.requestedBy
                  ? [a.requestedBy.firstName, a.requestedBy.lastName]
                      .filter(Boolean)
                      .join(" ") || "—"
                  : "—";
                const isCurrent = currentPending && currentPending.id === a.id;
                return (
                  <div
                    key={a.id}
                    className="flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-lg text-foreground">
                        {a.asset?.assetTag}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Serial: {a.asset?.serialNumber || "N/A"} | Олгосон:{" "}
                        {new Date(a.assignedAt).toLocaleDateString()}
                        {requestedByName && (
                          <>
                            {" "}
                            | Хэн явуулсан: {requestedByName}
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {!isCurrent ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAssignment(a);
                            setIsChecked(false);
                            setIsDialogOpen(true);
                          }}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" /> Нөхцөл шалгах
                        </Button>
                      ) : !isChecked ? (
                        <Button
                          onClick={() => setIsDialogOpen(true)}
                          className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          <Eye className="h-4 w-4" /> Нөхцөл шалгах
                        </Button>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 py-2 px-3 gap-1">
                          <ClipboardCheck className="h-4 w-4" /> Шалгасан
                        </Badge>
                      )}

                      <Button
                        onClick={() => handleApprove(a.id)}
                        variant="outline"
                        disabled={!isChecked || updatingStatus}
                        className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
                      >
                        <Check className="h-4 w-4" /> Хүлээн авах
                      </Button>
                      <Button
                        onClick={() => handleReject(a.id)}
                        variant="destructive"
                        disabled={updatingStatus}
                        className="disabled:opacity-30"
                      >
                        <X className="h-4 w-4" /> Татгалзах
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 3. Миний эзэмшиж буй хөрөнгө (идэвхтэй + хүлээгдэж буй) */}
      <Card className="mt-6 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Миний эзэмшиж буй хөрөнгө
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Идэвхтэй болон таны руу шилжүүлсэн хүлээгдэж буй хөрөнгө энд харагдана.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial Number</TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Хэн явуулсан</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myAssetsList.length > 0 ? (
                myAssetsList.map((assignment) => {
                  const isPending = assignment.status !== "ACTIVE";
                  const a = assignment as AssignmentItem;
                  const requestedByName = a.requestedBy
                    ? [a.requestedBy.firstName, a.requestedBy.lastName].filter(Boolean).join(" ") || "—"
                    : "—";
                  return (
                    <TableRow
                      key={assignment.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedAssignment(assignment as AssignmentItem)}
                    >
                      <TableCell className="font-mono text-xs">
                        {assignment.asset?.serialNumber || "N/A"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {assignment.asset?.assetTag}
                      </TableCell>
                      <TableCell>
                        {new Date(assignment.assignedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {isPending ? (
                          <Badge
                            variant="secondary"
                            className="bg-amber-50 text-amber-700 border-amber-200"
                          >
                            Хүлээгдэж буй
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 border-emerald-100"
                          >
                            Идэвхтэй
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {isPending ? requestedByName : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {(activeLoading || pendingLoading)
                      ? "Ачаалж байна..."
                      : "Бүртгэлтэй хөрөнгө байхгүй."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 4. Нөхцөл шалгах Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Хөрөнгийн нөхцөл шалгах</DialogTitle>
            <DialogDescription>
              {currentPending?.asset?.assetTag} хөрөнгийг хүлээн авахын өмнө
              шалгана уу.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-muted-foreground">Марк/Модель:</div>
              <div className="font-medium">
                {currentPending?.asset?.assetTag}
              </div>
              <div className="text-muted-foreground">Serial No:</div>
              <div className="font-medium">
                {currentPending?.asset?.serialNumber || "N/A"}
              </div>
              <div className="text-muted-foreground">Төлөв:</div>
              <div className="font-medium text-emerald-600">New / Good</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700 border border-amber-100">
              * Та "Шалгасан" товчийг дарснаар хөрөнгийн бүрэн бүтэн байдлыг
              баталгаажуулж байгааг анхаарна уу.
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Болих
            </Button>
            <Button
              className="bg-primary text-primary-foreground"
              onClick={handleVerify}
            >
              Шалгасан
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Хөрөнгийн дэлгэрэнгүй + Устгах хүсэлт */}
      <Dialog
        open={!!selectedAssignment}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAssignment(null);
            setDisposalReason("");
            setShowTransferDialog(false);
            setShowItTransferDialog(false);
            setTransferToEmployeeId("");
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Хөрөнгийн дэлгэрэнгүй</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.asset?.assetTag} — эзэмшиж буй хөрөнгийн мэдээлэл. Устгах хүсэлт илгээх бол IT хэсэгт харагдана.
            </DialogDescription>
          </DialogHeader>
          {selectedAssignment?.asset && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-muted-foreground">Нэр:</div>
                <div className="font-medium">{selectedAssignment.asset.assetTag}</div>
                <div className="text-muted-foreground">Serial:</div>
                <div className="font-medium">{selectedAssignment.asset.serialNumber || "—"}</div>
                <div className="text-muted-foreground">Ангилал:</div>
                <div className="font-medium">{selectedAssignment.asset.category || "—"}</div>
                <div className="text-muted-foreground">Олгосон огноо:</div>
                <div className="font-medium">
                  {new Date(selectedAssignment.assignedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Устгах шалтгаан (заавал биш)</label>
                <textarea
                  className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  placeholder="Жишээ: эвдрэлтэй, ашиглахаа больсон..."
                  value={disposalReason}
                  onChange={(e) => setDisposalReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 border-t pt-4 mt-4">
            <p className="text-xs font-medium text-muted-foreground">Үйлдлүүд</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setTransferToEmployeeId("");
                  setShowItTransferDialog(true);
                }}
                disabled={transferSending}
              >
                <Send className="h-3.5 w-3.5" /> IT ажилтан руу явуулах
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleRequestDisposal}
                disabled={disposalSending}
                title="Устгах хүсэлт илгээснээр эхлээд IT, дараа нь санхүү баталгаажуулна"
              >
                <UserPlus className="h-3.5 w-3.5" /> Санхүү рүү явуулах (устгах хүсэлт)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setTransferToEmployeeId("");
                  setTransferReason("");
                  setShowTransferDialog(true);
                }}
                disabled={transferSending}
              >
                <ArrowRightLeft className="h-3.5 w-3.5" /> Ажилтан руу шилжүүлэх
              </Button>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedAssignment(null);
                setDisposalReason("");
              }}
            >
              Хаах
            </Button>
            <Button
              className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleRequestDisposal}
              disabled={disposalSending}
            >
              <Trash2 className="h-4 w-4" /> Устгах хүсэлт илгээх (Demo IT руу)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* IT ажилтан руу шилжүүлэх — ажилтан сонгох */}
      <Dialog open={showItTransferDialog} onOpenChange={setShowItTransferDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>IT ажилтан сонгох</DialogTitle>
            <DialogDescription>
              Хөрөнгийг ямар IT ажилтан руу шилжүүлэх вэ?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={transferToEmployeeId || undefined} onValueChange={setTransferToEmployeeId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="IT ажилтан сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {otherEmployees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowItTransferDialog(false)}>
              Цуцлах
            </Button>
            <Button onClick={handleTransferToIt} disabled={!transferToEmployeeId || transferSending}>
              {transferSending ? "Шилжүүлж байна..." : "Шилжүүлэх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ажилтан руу шилжүүлэх — ажилтан сонгох */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ажилтан руу шилжүүлэх</DialogTitle>
            <DialogDescription>
              Сонгосон ажилтан таны хөрөнгийг "Шинэ хүсэлт" дээрээ хүлээн авах/татгалзах хүртэл pending байна.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Хүлээн авах ажилтан</label>
              <Select value={transferToEmployeeId || undefined} onValueChange={setTransferToEmployeeId}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Ажилтан сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  {otherEmployees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Шалтгаан (заавал биш)</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Жишээ: алба солигдсон"
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowTransferDialog(false)}>
              Цуцлах
            </Button>
            <Button onClick={handleTransferToEmployee} disabled={!transferToEmployeeId || transferSending}>
              {transferSending ? "Шилжүүлж байна..." : "Шилжүүлэх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
