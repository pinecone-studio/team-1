"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import jsPDF from "jspdf";
import { toast } from "sonner";
import {
  GetActiveDisposalsDocument,
  GetDisposalRequestsDocument,
  GetMaintenanceTicketsDocument,
  GetDataWipeTasksDocument,
  GetDashboardDocument,
  ApproveDisposalDocument,
  RejectDisposalDocument,
  UpdateDataWipeTaskDocument,
  UpdateMaintenanceTicketDocument,
  EmployeesDocument,
  UserRole,
} from "@/gql/graphql";
import {
  ensurePdfFonts,
  PDF_FONT_NAME,
  normalizeAssetTag,
  DEMO_IT_APPROVER_INDEX,
} from "./demo-it-utils";
import type { DisposalItem } from "./demo-it-utils";

export function useDemoIT() {
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
  const allMaintenanceTickets = useMemo(() => {
    const tickets = (maintenanceData?.maintenanceTickets ?? []) as Array<any>;
    const employees = employeesData?.employees ?? [];
    const employeeNameById = new Map(
      employees.map((e) => [
        e.id,
        [e.firstName, e.lastName].filter(Boolean).join(" ") || e.email || e.id,
      ]),
    );
    return tickets.map((t) => ({
      ...t,
      reporterName: employeeNameById.get(t.reporterId) ?? "Admin",
    }));
  }, [maintenanceData?.maintenanceTickets, employeesData?.employees]);

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
      asset?: {
        id?: string;
        assetTag?: string;
        category?: string;
      } | null;
      latestAssignment?: {
        id?: string;
        employee?: {
          id?: string;
          firstName?: string;
          lastName?: string;
          department?: string;
          branch?: string;
        } | null;
      } | null;
      latestReturnRequest?: {
        id?: string;
        employee?: {
          id?: string;
          firstName?: string;
          lastName?: string;
          department?: string;
          branch?: string;
        } | null;
      } | null;
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
  const [updateMaintenanceTicket, { loading: updatingMaintenance }] =
    useMutation(UpdateMaintenanceTicketDocument, {
      refetchQueries: [{ query: GetMaintenanceTicketsDocument }],
      awaitRefetchQueries: true,
    });

  const pendingDisposals = disposalsData?.disposalRequests ?? [];

  const handleApprove = async (id: string) => {
    try {
      await approveDisposal({
        variables: { id, approvedBy: demoApproverId || "IT", stage: "IT_APPROVED" },
      });
      toast.success("Устгах хүсэлтийг IT-ээр баталгаажууллаа.");
    } catch (err) {
      toast.error("Баталгаажуулахад алдаа гарлаа.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectDisposal({
        variables: {
          id,
          rejectedBy: demoApproverId || "IT",
          reason: "Татгалзсан",
        },
      });
      toast.error("Устгах хүсэлтийг татгалзлаа.");
    } catch (err) {
      toast.error("Татгалзах үед алдаа гарлаа.");
    }
  };

  const handleApproveMaintenance = async (id: string) => {
    try {
      await updateMaintenanceTicket({
        variables: { id, status: "RESOLVED", resolvedAt: Date.now() },
      });
      toast.success("Засварын хүсэлтийг шийдвэрлэсэн гэж тэмдэглэлээ.");
    } catch {
      toast.error("Засвар батлах үед алдаа гарлаа.");
    }
  };

  const handleRejectMaintenance = async (id: string) => {
    try {
      await updateMaintenanceTicket({
        variables: { id, status: "CLOSED" },
      });
      toast.error("Засварын хүсэлтийг хаалаа.");
    } catch {
      toast.error("Засвар цуцлах үед алдаа гарлаа.");
    }
  };

  const handleSaveSignature = (dataUrl: string) => {
    setSignatureData(dataUrl);
  };

  const handleClearSignature = () => {
    setSignatureData(null);
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
    }
  };

  const handleWipeDone = async (id: string) => {
    try {
      await updateWipeTask({ variables: { id, status: "DONE" } });
      toast.success("Data wipe task дууслаа (DONE).");
      await refetchWipe();
    } catch {
      toast.error("Data wipe task шинэчлэхэд алдаа гарлаа.");
    }
  };

  return {
    selectedDisposal,
    setSelectedDisposal,
    signatureData,
    setSignatureData,
    signatureUploading,
    dataWipeConfirmed,
    setDataWipeConfirmed,
    isDisposalChecked,
    setIsDisposalChecked,
    pendingDisposals,
    allDisposals,
    allMaintenanceTickets,
    wipeTasks,
    itNotifications,
    demoApproverId,
    approving,
    rejecting,
    updatingWipe,
    updatingMaintenance,
    handleApprove,
    handleReject,
    handleApproveMaintenance,
    handleRejectMaintenance,
    handleSaveSignature,
    handleClearSignature,
    uploadApprovalPdf,
    handleWipeDone,
    refetchWipe,
    employeesData,
    normalizeAssetTag,
  };
}
