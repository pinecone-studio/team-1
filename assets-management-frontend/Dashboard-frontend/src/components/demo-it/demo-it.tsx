"use client";

import React, { useState } from "react";
import {
  Check,
  ShieldCheck,
  History,
  Search,
  X,
  Eye,
  Wrench,
  Bell,
} from "lucide-react";
import { useQuery, useMutation } from "@apollo/client";
import jsPDF from "jspdf";

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
import SignaturePad from "@/app/esign/_components/SignaturePad";
import DocumentPreview from "@/app/esign/_components/DocumentPreview";
import {
  GetActiveDisposalsDocument,
  GetDisposalRequestsDocument,
  GetMaintenanceTicketsDocument,
  GetDataWipeTasksDocument,
  UpdateDataWipeTaskDocument,
  GetDashboardDocument,
  ApproveDisposalDocument,
  RejectDisposalDocument,
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

const PDF_FONT_REGULAR = "/fonts/NotoSans-Variable.ttf";
const PDF_FONT_BOLD = "/fonts/NotoSans-Variable.ttf";
const PDF_FONT_NAME = "NotoSans";
let cachedPdfFontRegular: string | null = null;
let cachedPdfFontBold: string | null = null;

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

const ensurePdfFonts = async (pdf: jsPDF) => {
  if (!cachedPdfFontRegular) {
    const res = await fetch(PDF_FONT_REGULAR);
    if (!res.ok) throw new Error("PDF font татаж чадсангүй.");
    cachedPdfFontRegular = arrayBufferToBase64(await res.arrayBuffer());
  }
  if (!cachedPdfFontBold) {
    if (PDF_FONT_BOLD === PDF_FONT_REGULAR) {
      cachedPdfFontBold = cachedPdfFontRegular;
    } else {
      const res = await fetch(PDF_FONT_BOLD);
      if (!res.ok) throw new Error("PDF bold font татаж чадсангүй.");
      cachedPdfFontBold = arrayBufferToBase64(await res.arrayBuffer());
    }
  }
  if (!cachedPdfFontRegular || !cachedPdfFontBold) {
    throw new Error("PDF font уншихад алдаа гарлаа.");
  }
  pdf.addFileToVFS("NotoSans-Regular.ttf", cachedPdfFontRegular);
  pdf.addFont("NotoSans-Regular.ttf", PDF_FONT_NAME, "normal");
  pdf.addFileToVFS("NotoSans-Bold.ttf", cachedPdfFontBold);
  pdf.addFont("NotoSans-Bold.ttf", PDF_FONT_NAME, "bold");
};

const normalizeAssetTag = (value?: string | null) => {
  if (!value) return "—";
  const trimmed = value.trim();
  if (trimmed.length <= 3) return trimmed.toUpperCase();
  const parts = trimmed.split("-");
  if (parts.length >= 2) {
    const prefix = parts[0].slice(0, 3).toUpperCase();
    return [prefix, ...parts.slice(1)].join("-");
  }
  return trimmed.slice(0, 3).toUpperCase();
};

type DisposalItem = {
  id: string;
  assetId: string;
  method: string;
  reason?: string | null;
  status: string;
  createdAt: number;
  asset?: { id?: string; assetTag?: string; category?: string } | null;
  requestedBy?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
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
  const [selectedDisposal, setSelectedDisposal] = useState<DisposalItem | null>(
    null,
  );
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [signatureUploading, setSignatureUploading] = useState(false);
  const [dataWipeConfirmed, setDataWipeConfirmed] = useState(false);
  const [isDisposalChecked, setIsDisposalChecked] = useState(false);

  const { data: disposalsData } = useQuery(GetActiveDisposalsDocument, {
    fetchPolicy: "network-only",
  });
  const { data: employeesData } = useQuery(EmployeesDocument);
  const demoApproverId =
    employeesData?.employees?.[DEMO_IT_APPROVER_INDEX]?.id ?? "";

  const { data: allDisposalsData } = useQuery(GetDisposalRequestsDocument, {
    variables: { status: undefined },
    fetchPolicy: "network-only",
  });
  const allDisposals = (allDisposalsData?.disposalRequests ?? [])
    .slice()
    .sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0));

  const { data: maintenanceData } = useQuery(GetMaintenanceTicketsDocument, {
    variables: { status: undefined },
    fetchPolicy: "network-only",
  });
  const allMaintenanceTickets = (maintenanceData?.maintenanceTickets ??
    []) as MaintenanceItem[];

  const { data: wipeData, refetch: refetchWipe } = useQuery(
    GetDataWipeTasksDocument,
    {
      variables: { status: "PENDING" },
      fetchPolicy: "network-only",
    },
  );
  const wipeTasks =
    (wipeData?.dataWipeTasks ?? []) as Array<{
      id: string;
      assetId: string;
      status: string;
      createdAt: number;
      updatedAt: number;
    }>;

  const { data: dashboardData } = useQuery(GetDashboardDocument, {
    variables: { role: UserRole.ItAdmin },
    fetchPolicy: "network-only",
  });
  const itNotifications = (dashboardData?.dashboard?.itView?.notifications ??
    []) as Array<{
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
        {
          query: GetDisposalRequestsDocument,
          variables: { status: undefined },
        },
        { query: GetDashboardDocument, variables: { role: UserRole.ItAdmin } },
      ],
    },
  );
  const [rejectDisposal, { loading: rejecting }] = useMutation(
    RejectDisposalDocument,
    {
      refetchQueries: [
        { query: GetActiveDisposalsDocument },
        {
          query: GetDisposalRequestsDocument,
          variables: { status: undefined },
        },
        { query: GetDashboardDocument, variables: { role: UserRole.ItAdmin } },
      ],
    },
  );
  const [updateWipeTask, { loading: updatingWipe }] = useMutation(
    UpdateDataWipeTaskDocument,
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

  const handleSaveSignature = (dataUrl: string) => {
    setSignatureData(dataUrl);
  };

  const handleClearSignature = () => {
    setSignatureData(null);
  };

  const dataUrlToBlob = (dataUrl: string) => {
    const [header, data] = dataUrl.split(",");
    const mimeMatch = header.match(/data:(.*);base64/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  };

  const uploadApprovalPdf = async (item: DisposalItem) => {
    if (!signatureData) {
      toast.error("Эхлээд гарын үсгээ зурна уу.");
      return false;
    }

    const bucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;
    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
    const presignUrl =
      process.env.NEXT_PUBLIC_R2_PRESIGN_URL ??
      (graphqlUrl
        ? graphqlUrl.replace(/\/api\/graphql$/, "/api/r2/presign")
        : "/api/r2/presign");

    if (!bucketName || !publicUrl) {
      toast.error("R2 орчны хувьсагч дутуу байна.");
      return false;
    }

    try {
      setSignatureUploading(true);
      toast.loading("Баталгаажуулалтын PDF үүсгэж байна...", {
        id: "disposal-approve-pdf",
      });

      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      await ensurePdfFonts(pdf);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;
      let cursorY = 18;

      const assetName = normalizeAssetTag(item.asset?.assetTag ?? item.assetId);
      const category = item.asset?.category ?? "—";
      const requestedByName = item.requestedBy
        ? [item.requestedBy.firstName, item.requestedBy.lastName]
            .filter(Boolean)
            .join(" ") || item.requestedBy.email
        : "Admin";
      const methodLabel = item.method ?? "—";
      const reasonLabel = item.reason ?? "—";
      const approverName = employeesData?.employees?.[DEMO_IT_APPROVER_INDEX]
        ?.firstName
        ? `${employeesData?.employees?.[DEMO_IT_APPROVER_INDEX]?.firstName ?? ""} ${employeesData?.employees?.[DEMO_IT_APPROVER_INDEX]?.lastName ?? ""}`.trim()
        : "IT Admin";

      pdf.setFillColor(245, 247, 250);
      pdf.rect(0, 0, pageWidth, 34, "F");
      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.setFontSize(18);
      pdf.text("Эвдрэлтэй хөрөнгийн баталгаажуулалт", pageWidth / 2, 20, {
        align: "center",
      });
      pdf.setFontSize(10);
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.text(
        `Огноо: ${new Date().toLocaleDateString("mn-MN")}`,
        pageWidth - margin,
        28,
        { align: "right" },
      );
      cursorY = 42;

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.setFontSize(12);
      pdf.text("1. Хүсэлтийн мэдээлэл", margin, cursorY);
      cursorY += 6;

      const boxTop = cursorY;
      const boxHeight = 44;
      pdf.setDrawColor(210, 214, 220);
      pdf.rect(margin, boxTop, contentWidth, boxHeight);
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.setFontSize(11);

      const leftX = margin + 4;
      const rightX = margin + contentWidth / 2 + 4;
      let rowY = boxTop + 8;
      pdf.text(`Хөрөнгө: ${assetName}`, leftX, rowY);
      pdf.text(`Ангилал: ${category}`, rightX, rowY);
      rowY += 8;
      pdf.text(`Хэнээс: ${requestedByName}`, leftX, rowY);
      pdf.text(`Устгах арга: ${methodLabel}`, rightX, rowY);
      rowY += 8;
      pdf.text(`Шалтгаан: ${reasonLabel}`, leftX, rowY);
      pdf.text(`Хүсэлт №: ${item.id}`, rightX, rowY);
      cursorY = boxTop + boxHeight + 10;

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.setFontSize(12);
      pdf.text("2. Баталгаажуулалт", margin, cursorY);
      cursorY += 6;
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.setFontSize(11);
      const approveText =
        "IT ажилтан хүсэлтийг шалгаж, эвдэрсэн болохыг баталгаажуулсан. Өгөгдөл сэргээх боломжгүй болсон.";
      const approveLines = pdf.splitTextToSize(approveText, contentWidth);
      pdf.text(approveLines, margin, cursorY);
      cursorY += approveLines.length * 5.5 + 8;

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.text("Баталгаажуулсан ажилтан", margin, pageHeight - 20);
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.text(approverName, margin + 54, pageHeight - 20);

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.text("Гарын үсэг", pageWidth - margin - 60, pageHeight - 20);
      pdf.setDrawColor(17, 17, 17);
      pdf.line(
        pageWidth - margin - 60,
        pageHeight - 28,
        pageWidth - margin,
        pageHeight - 28,
      );
      try {
        pdf.addImage(
          signatureData,
          "PNG",
          pageWidth - margin - 60,
          pageHeight - 50,
          60,
          20,
        );
      } catch {
        // ignore if signature image fails to render
      }

      const pdfBlob = pdf.output("blob");
      const key = `disposal-approvals/${item.assetId}/${item.id}-${Date.now()}.pdf`;
      const presignRes = await fetch(presignUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          contentType: "application/pdf",
          bucketName,
        }),
      });
      if (!presignRes.ok) throw new Error("Presign failed");
      const { url } = (await presignRes.json()) as { url: string };

      await fetch(url, {
        method: "PUT",
        body: pdfBlob,
        headers: { "Content-Type": "application/pdf" },
      });

      toast.success("Баталгаажуулалтын PDF хадгалагдлаа.", {
        id: "disposal-approve-pdf",
      });
      return true;
    } catch (err) {
      console.error(err);
      toast.error("PDF хадгалахад алдаа гарлаа.", {
        id: "disposal-approve-pdf",
      });
      return false;
    } finally {
      setSignatureUploading(false);
  const handleWipeDone = async (id: string) => {
    try {
      await updateWipeTask({ variables: { id, status: "DONE" } });
      toast.success("Data wipe task дууслаа (DONE).");
      await refetchWipe();
    } catch {
      toast.error("Data wipe task шинэчлэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
    <ScrollArea className="h-full min-h-0 flex-1 w-full">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground ">
            IT-д илгээгдсэн бүх хүсэлт — устгах хүсэлт, засварын дуудлага
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" /> Түүх
        </Button>
        </div>

      {/* Data wipe tasks */}
      <Card className="mt-4 border-emerald-200 bg-emerald-50/30 shrink-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-emerald-800">
            <ShieldCheck className="h-5 w-5" /> Data wipe tasks ({wipeTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {wipeTasks.length === 0 ? (
            <p className="rounded-lg border border-dashed border-emerald-200 bg-white p-6 text-center text-sm text-muted-foreground">
              PENDING data wipe task байхгүй байна.
            </p>
          ) : (
            <div className="space-y-2">
              {wipeTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border border-emerald-100 bg-white p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-foreground">
                      Asset: {t.assetId}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Task: {t.id} · Status: {t.status}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleWipeDone(t.id)}
                      disabled={updatingWipe}
                    >
                      <Check className="h-3.5 w-3.5" /> Done
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 border-gray-200 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-gray-900">
            <ShieldCheck className="h-5 w-5" /> Устгах хүсэлтүүд (
            {pendingDisposals.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingDisposals.length === 0 ? (
            <p className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
              Одоогоор хүлээгдэж буй устгах хүсэлт байхгүй. Ажилтан «Миний
              хөрөнгө» → хөрөнгө дээр дарж «Устгах хүсэлт илгээх»-ээр илгээж
              болно.
            </p>
          ) : (
            pendingDisposals.map((req) => {
              const r = req as DisposalItem;
              const assetName = r.asset?.assetTag ?? r.assetId;
              const categoryName = r.asset?.category ?? "—";
              const requesterName = r.requestedBy
                ? [r.requestedBy.firstName, r.requestedBy.lastName]
                    .filter(Boolean)
                    .join(" ") || r.requestedBy.email
                : "—";
              return (
                <div
                  key={req.id}
                  className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setIsDisposalChecked(false);
                    setSelectedDisposal(r);
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-sm">
                      {(assetName ?? "?").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">
                        {assetName}{" "}
                        <span className="text-muted-foreground font-normal">
                          ({categoryName})
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Хэнээс:{" "}
                        <span className="font-medium text-foreground">
                          {requesterName}
                        </span>{" "}
                        | Арга: {r.method} |{" "}
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDisposalChecked(false);
                        setSelectedDisposal(r);
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" /> Дэлгэрэнгүй
                    </Button>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-600 border-amber-200"
                    >
                      PENDING
                    </Badge>
                    <Button
                      onClick={() => {
                        setIsDisposalChecked(false);
                        setSelectedDisposal(r);
                      }}
                      className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
                      size="sm"
                      disabled
                    >
                      <Check className="h-4 w-4" /> Батлах (IT)
                    </Button>
                    <Button
                      onClick={() => handleReject(r.id)}
                      variant="outline"
                      className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
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
      <Card className="mt-6 border-gray-200 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-gray-900">
            <Wrench className="h-5 w-5" /> Засварын хүсэлт (
            {allMaintenanceTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allMaintenanceTickets.length === 0 ? (
            <p className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {allMaintenanceTickets.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">
                      {t.assetId}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm">
                      {t.description}
                    </TableCell>
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
                            ? "bg-gray-100 text-gray-700 border-gray-200"
                            : t.status === "RESOLVED" || t.status === "CLOSED"
                              ? "bg-gray-200 text-gray-800 border-gray-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {MAINTENANCE_STATUS_LABELS[t.status] ?? t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(t.createdAt).toLocaleString()}
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
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground text-sm"
                  >
                    Устгах хүсэлт байхгүй байна.
                  </TableCell>
                </TableRow>
              ) : (
                allDisposals.map((req) => {
                  const r = req as DisposalItem;
                  const assetName = r.asset?.assetTag ?? r.assetId;
                  const categoryName = r.asset?.category ?? "—";
                  const requesterName = r.requestedBy
                    ? [r.requestedBy.firstName, r.requestedBy.lastName]
                        .filter(Boolean)
                        .join(" ") || r.requestedBy.email
                    : "—";
                  const statusLabel =
                    DISPOSAL_STATUS_LABELS[r.status] ?? r.status;
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        {assetName}{" "}
                        <span className="text-muted-foreground font-normal">
                          ({categoryName})
                        </span>
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
                                : r.status === "IT_APPROVED" ||
                                    r.status === "FINANCE_APPROVED"
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
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDisposal(null);
            setSignatureData(null);
            setDataWipeConfirmed(false);
            setIsDisposalChecked(false);
          }
        }}
      >
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <DialogTitle>Устгах хүсэлт — баталгаажуулалт</DialogTitle>
            <DialogDescription>
              Эвдрэлтэй гэж баталгаажуулж, гарын үсэг зурна уу.
            </DialogDescription>
          </DialogHeader>
          {selectedDisposal && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 py-4">
              <div className="order-2 lg:order-1 flex justify-center">
                <DocumentPreview
                  signatureData={signatureData}
                  title="Data Wipe Out Confirmation"
                  bodyText="IT ажилтан өгөгдөл сэргээх боломжгүй болсон гэдгийг баталгаажуулж байна. Энэхүү баримт нь дата бүрэн устсан болохыг нотлох зорилготой."
                  waitingLabel="Гарын үсэг хүлээгдэж байна..."
                  signedByLabel="Баталгаажуулсан"
                  dateLabel="Огноо"
                />
              </div>

              <div className="order-1 lg:order-2 space-y-4">
                <div className="rounded-xl border border-muted bg-muted/30 p-4">
                  <h4 className="text-base font-semibold mb-3">
                    Хүсэлтийн мэдээлэл
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-muted-foreground">Хөрөнгө (нэр):</div>
                    <div className="font-medium">
                      {normalizeAssetTag(
                        selectedDisposal.asset?.assetTag ??
                          selectedDisposal.assetId,
                      )}
                    </div>
                    <div className="text-muted-foreground">Ангилал:</div>
                    <div className="font-medium">
                      {selectedDisposal.asset?.category ?? "—"}
                    </div>
                    <div className="text-muted-foreground">
                      Хэнээс ирсэн (ажилтан):
                    </div>
                    <div className="font-medium">
                      {selectedDisposal.requestedBy
                        ? [
                            selectedDisposal.requestedBy.firstName,
                            selectedDisposal.requestedBy.lastName,
                          ]
                            .filter(Boolean)
                            .join(" ") || selectedDisposal.requestedBy.email
                        : "Admin"}
                    </div>
                    {selectedDisposal.requestedBy?.email && (
                      <>
                        <div className="text-muted-foreground">Имэйл:</div>
                        <div className="font-medium text-xs">
                          {selectedDisposal.requestedBy.email}
                        </div>
                      </>
                    )}
                    <div className="text-muted-foreground">Устгах арга:</div>
                    <div className="font-medium">{selectedDisposal.method}</div>
                    {selectedDisposal.reason && (
                      <>
                        <div className="text-muted-foreground">Шалтгаан:</div>
                        <div className="font-medium">
                          {selectedDisposal.reason}
                        </div>
                      </>
                    )}
                    <div className="text-muted-foreground">Төлөв:</div>
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-600 border-amber-200"
                      >
                        {selectedDisposal.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">Илгээсэн огноо:</div>
                    <div className="font-medium">
                      {new Date(selectedDisposal.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <SignaturePad
                  onSave={handleSaveSignature}
                  onClear={handleClearSignature}
                  title="Баталгаажуулах гарын үсэг"
                  clearLabel="Арилгах"
                  saveLabel={
                    signatureUploading
                      ? "PDF үүсгэж байна..."
                      : "Гарын үсэг хадгалах"
                  }
                />
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
                  className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
                  onClick={async () => {
                    const uploaded = await uploadApprovalPdf(selectedDisposal);
                    if (!uploaded) return;
                    await handleApprove(selectedDisposal.id);
                    setSelectedDisposal(null);
                  }}
                  disabled={
                    !signatureData ||
                    signatureUploading ||
                    approving ||
                    rejecting
                  }
                >
                  <Check className="h-4 w-4" /> Батлах (IT)
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
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
  );
}
