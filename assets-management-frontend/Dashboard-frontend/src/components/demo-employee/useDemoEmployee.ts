"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import jsPDF from "jspdf";
import { toast } from "sonner";
import {
  CreateDataWipeTaskDocument,
  CreateMaintenanceTicketDocument,
  EmployeesDocument,
  GetEmployeeAssignmentsDocument,
  RequestDisposalDocument,
  GetActiveOffboardingDocument,
  StartOffboardingDocument,
  TransferAssetDocument,
  ReturnAssetDocument,
  AssignAssetDocument,
  GetAssetsDocument,
  GetDashboardDocument,
  UserRole,
  CompleteAssetReturnDocument,
  SubmitReturnRequestDocument,
  UpdateEmployeeDocument,
} from "@/gql/graphql";
import {
  DEMO_EMPLOYEE_EMAIL,
  normalizeAssetTag,
  ensurePdfFonts,
  PDF_FONT_NAME,
  UpdateAssignmentStatusDocument,
  dataUrlToBlob,
  type AssignmentItem,
} from "./demo-employee-utils";

export function useDemoEmployee() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<AssignmentItem | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [signAssignment, setSignAssignment] = useState<AssignmentItem | null>(
    null,
  );
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [signatureUploading, setSignatureUploading] = useState(false);
  const [signatureFileUrl, setSignatureFileUrl] = useState<string | null>(null);
  const [signatureProfileSaving, setSignatureProfileSaving] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(true);
  const [disposalReason, setDisposalReason] = useState("");
  const [disposalSending, setDisposalSending] = useState(false);
  const [transferToEmployeeId, setTransferToEmployeeId] = useState<string>("");
  const [transferReason, setTransferReason] = useState("");
  const [transferSending, setTransferSending] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showItTransferDialog, setShowItTransferDialog] = useState(false);
  const [showOffboardingModal, setShowOffboardingModal] = useState(false);
  const [showRequestsDialog, setShowRequestsDialog] = useState(false);
  const [pendingTransferSent, setPendingTransferSent] = useState<{
    toName: string;
    assetTag: string;
  } | null>(null);
  const [showReturnRequestDialog, setShowReturnRequestDialog] = useState(false);
  const [returnRequestAssignment, setReturnRequestAssignment] =
    useState<AssignmentItem | null>(null);
  const [returnCondition, setReturnCondition] = useState("GOOD");
  const [returnConditionDetail, setReturnConditionDetail] = useState("");
  const [returnRequestSending, setReturnRequestSending] = useState(false);
  const [returnInstructionsRead, setReturnInstructionsRead] = useState(false);
  const [selectedReturnAssetIds, setSelectedReturnAssetIds] = useState<
    Set<string>
  >(() => new Set());
  const [bulkReturnInstructionsRead, setBulkReturnInstructionsRead] =
    useState(false);
  const [bulkReturnSending, setBulkReturnSending] = useState(false);
  const [returnPhotoFile, setReturnPhotoFile] = useState<File | null>(null);
  const [expandedNotificationId, setExpandedNotificationId] = useState<
    string | null
  >(null);

  const isDamagedCondition = ["DAMAGED", "NON_FUNCTIONAL", "LOST"].includes(
    returnCondition,
  );

  const { data: employeesData, refetch: refetchEmployees } = useQuery(
    EmployeesDocument,
    { fetchPolicy: "network-only" },
  );
  const [demoEmployeeId, setDemoEmployeeId] = useState<string>("");
  const defaultDemoEmployeeId = useMemo(() => {
    const list = employeesData?.employees ?? [];
    const byEmail =
      list.find(
        (e) => e.email?.toLowerCase() === DEMO_EMPLOYEE_EMAIL.toLowerCase(),
      )?.id ?? "";
    return byEmail || list[0]?.id || "";
  }, [employeesData?.employees]);
  useEffect(() => {
    if (!demoEmployeeId && defaultDemoEmployeeId) {
      setDemoEmployeeId(defaultDemoEmployeeId);
    }
  }, [demoEmployeeId, defaultDemoEmployeeId]);
  const currentEmployeeId = demoEmployeeId || null;
  const currentEmployee = useMemo(
    () =>
      employeesData?.employees?.find((e) => e.id === currentEmployeeId) ??
      null,
    [employeesData?.employees, currentEmployeeId],
  );
  const savedSignatureUrl = currentEmployee?.signUrl ?? null;

  useEffect(() => {
    if (!isSignModalOpen) return;
    if (savedSignatureUrl) {
      setShowSignaturePad(false);
    } else {
      setShowSignaturePad(true);
    }
  }, [isSignModalOpen, savedSignatureUrl]);
  useEffect(() => {
    setSelectedAssignment(null);
    setPendingTransferSent(null);
    setExpandedNotificationId(null);
    setSelectedReturnAssetIds(new Set());
    setBulkReturnInstructionsRead(false);
  }, [currentEmployeeId]);

  const [updateAssignmentStatus, { loading: updatingStatus }] = useMutation(
    UpdateAssignmentStatusDocument,
    {
      refetchQueries: [
        { query: GetAssetsDocument },
        {
          query: GetDashboardDocument,
          variables: {
            role: UserRole.Employee,
            employeeId: currentEmployeeId ?? "",
          },
        },
      ],
      awaitRefetchQueries: true,
    },
  );
  const [requestDisposalMutation] = useMutation(RequestDisposalDocument);
  const [startOffboardingMutation, { loading: offboardingStarting }] =
    useMutation(StartOffboardingDocument);
  const [transferAssetMutation] = useMutation(TransferAssetDocument);
  const [createDataWipeTaskMutation] = useMutation(CreateDataWipeTaskDocument);
  const [createMaintenanceTicketMutation] = useMutation(
    CreateMaintenanceTicketDocument,
  );
  const [returnAssetMutation] = useMutation(ReturnAssetDocument);
  const [assignAssetMutation] = useMutation(AssignAssetDocument);
  const [completeAssetReturnMutation, { loading: completeReturnLoading }] =
    useMutation(CompleteAssetReturnDocument);
  const [submitReturnRequestMutation, { loading: submitReturnRequestLoading }] =
    useMutation(SubmitReturnRequestDocument);
  const [updateEmployeeMutation] = useMutation(UpdateEmployeeDocument);

  const { data: offboardingData, refetch: refetchOffboarding } = useQuery(
    GetActiveOffboardingDocument,
    {
      variables: { employeeId: currentEmployeeId ?? "" },
      skip: !currentEmployeeId,
      fetchPolicy: "network-only",
    },
  );
  const activeOffboarding = offboardingData?.offboardingEvent ?? null;

  const { data: dashboardData } = useQuery(GetDashboardDocument, {
    variables: { role: UserRole.Employee, employeeId: currentEmployeeId ?? "" },
    skip: !currentEmployeeId,
    fetchPolicy: "network-only",
  });
  const OFFBOARDING_TITLE = "Ажлаас гарах — хөрөнгө буцаах";
  const isOffboardingNotification = (n: { title?: string; message?: string }) =>
    n.title === OFFBOARDING_TITLE ||
    (typeof n.message === "string" &&
      (n.message.includes("Буцаах эцсийн хугацаа") ||
        n.message.includes("ажлаас гарах")));
  const MOCK_OFFBOARDING: {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: number;
  } = {
    id: "demo-mock-offboarding",
    title: OFFBOARDING_TITLE,
    message:
      "Таны нэр дээр 1 хөрөнгө бүртгэгдсэн. Буцаах эцсийн хугацаа: ажлаас гарснаас хойш 3 хоногийн дотор. Миний хөрөнгө хэсэгт орж буцаана уу.",
    type: "WARNING",
    isRead: false,
    createdAt: Date.now(),
  };
  const notifications = useMemo(() => {
    type N = {
      id: string;
      title: string;
      message: string;
      type?: string;
      isRead?: boolean;
      createdAt?: number;
      link?: string | null;
    };
    const list = dashboardData?.dashboard?.employeeView?.notifications ?? [];
    const fromApi = ([...list] as N[]).filter(
      (n) =>
        isOffboardingNotification(n) ||
        (typeof n.link === "string" && n.link.startsWith("census:")),
    );
    const offboarding = fromApi.filter((n) => isOffboardingNotification(n));
    const census = fromApi.filter(
      (n) => typeof n.link === "string" && n.link.startsWith("census:"),
    );
    // Census: event бүрээс хамгийн сүүлийн ирсэн 1 мэдэгдлийг л харуулна (давхардлыг арилгана)
    const censusByEventId = new Map<string, N>();
    for (const n of census) {
      const eventId = (n.link ?? "").replace(/^census:/, "") || n.id;
      const existing = censusByEventId.get(eventId);
      if (
        !existing ||
        (n.createdAt ?? 0) > (existing.createdAt ?? 0)
      ) {
        censusByEventId.set(eventId, n);
      }
    }
    const dedupedCensus = Array.from(censusByEventId.values());
    const combined = [...offboarding, ...dedupedCensus].sort(
      (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
    );
    if (combined.length > 0) return combined;
    if (currentEmployeeId) return [MOCK_OFFBOARDING as N];
    return [];
  }, [
    dashboardData?.dashboard?.employeeView?.notifications,
    currentEmployeeId,
  ]);

  const offboardingNotifications = useMemo(() => {
    return notifications.filter((n) => isOffboardingNotification(n));
  }, [notifications]);

  const censusNotifications = useMemo(() => {
    const census = notifications.filter(
      (n) =>
        typeof (n as { link?: string | null }).link === "string" &&
        (n as { link: string }).link.startsWith("census:"),
    );
    const unread = census.filter((n) => (n as { isRead?: boolean }).isRead !== true);
    if (unread.length === 0) return [];
    const sorted = [...unread].sort(
      (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0),
    );
    return [sorted[0]!];
  }, [notifications]);

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

  const {
    data: activeData,
    loading: activeLoading,
    refetch: refetchActive,
  } = useQuery(GetEmployeeAssignmentsDocument, {
    variables: { ...queryVars, status: "ACTIVE" },
    skip: !currentEmployeeId,
    fetchPolicy: "network-only",
  });

  const pendingLoading = loadingAssignRequested || loadingPending;
  // Memo бишээр derived list-уудыг бодож гаргая.
  // Заримдаа Apollo refetch үед arrays ижил refernce-эээр ирэх (or in-place update) тохиолдол
  // гардаг тул `useMemo` stale data өгч, accept болсны дараа UI шууд шинэчлэгдэхгүй мэт харагддаг.
  const pendingList = (() => {
    const a = dataAssignRequested?.employeeAssignments ?? [];
    const b = dataPending?.employeeAssignments ?? [];
    const seen = new Set<string>();
    return [...a, ...b].filter((x) => {
      if (seen.has(x.id)) return false;
      seen.add(x.id);
      return true;
    });
  })();
  const currentPending = pendingList[0] ?? null;
  const activeAssignments = activeData?.employeeAssignments ?? [];
  const myAssetsList = (() => {
    const seen = new Set<string>();
    const list: Array<(typeof activeAssignments)[0] & { status: string }> = [];
    activeAssignments.forEach((a) => {
      seen.add(a.id);
      list.push({ ...a, status: "ACTIVE" });
    });
    pendingList.forEach((a) => {
      if (!seen.has(a.id)) {
        seen.add(a.id);
        list.push({
          ...a,
          status: (a as { status?: string }).status ?? "ASSIGN_REQUESTED",
        });
      }
    });
    return list;
  })();

  const assetsToReturnList = useMemo(() => {
    const fromEvent = (
      activeOffboarding as {
        assetsToReturn?: Array<{
          id: string;
          assetTag?: string;
          serialNumber?: string;
        }>;
      } | null
    )?.assetsToReturn;
    if (fromEvent?.length)
      return fromEvent.map((a) => ({
        id: a.id,
        assetTag: a.assetTag ?? a.id,
        serialNumber: a.serialNumber ?? "—",
      }));
    return null;
  }, [activeOffboarding]);
  const pendingReturnRequestAssetIds = useMemo(() => {
    const list =
      (
        activeOffboarding as {
          pendingReturnRequests?: Array<{ assetId: string }>;
        } | null
      )?.pendingReturnRequests ?? [];
    return new Set(list.map((r) => r.assetId));
  }, [activeOffboarding]);

  const assignmentsToReturn = useMemo(
    () =>
      (
        myAssetsList as Array<
          AssignmentItem & { returnedAt?: number | null }
        >
      ).filter((a) => !a.returnedAt),
    [myAssetsList],
  );
  const eligibleReturnAssignments = useMemo(
    () =>
      assignmentsToReturn.filter(
        (a) => !pendingReturnRequestAssetIds.has(a.assetId),
      ),
    [assignmentsToReturn, pendingReturnRequestAssetIds],
  );

  const toggleReturnSelection = (assetId: string, next: boolean) => {
    setSelectedReturnAssetIds((prev) => {
      const s = new Set(prev);
      if (next) s.add(assetId);
      else s.delete(assetId);
      return s;
    });
  };

  const selectAllEligibleReturns = (next: boolean) => {
    if (!next) {
      setSelectedReturnAssetIds(new Set());
      return;
    }
    setSelectedReturnAssetIds(
      new Set(eligibleReturnAssignments.map((a) => a.assetId)),
    );
  };

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
    } catch {
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
    } catch {
      toast.error("Хүсэлт амжилтгүй боллоо.", { id: "reject" });
      await handleActionComplete();
    }
  };

  const handleSaveSignature = (dataUrl: string) => {
    setSignatureData(dataUrl);
  };

  const loadSignatureFromUrl = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Signature fetch failed");
      const blob = await res.blob();
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });
      setSignatureData(dataUrl);
    } catch {
      toast.error("Хадгалсан гарын үсгийг уншиж чадсангүй.");
    }
  };

  const uploadSignatureImageToR2 = async (dataUrl: string) => {
    const bucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;
    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
    const presignUrl =
      process.env.NEXT_PUBLIC_R2_PRESIGN_URL ??
      (graphqlUrl
        ? graphqlUrl.replace(/\/api\/graphql$/, "/api/r2/presign")
        : "/api/r2/presign");

    if (!bucketName || !publicUrl) {
      throw new Error("R2 env missing");
    }

    const key = `employee-signatures/${currentEmployeeId ?? "employee"}/${Date.now()}.png`;
    const blob = dataUrlToBlob(dataUrl);

    const presignRes = await fetch(presignUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        contentType: blob.type || "image/png",
        bucketName,
      }),
    });
    if (!presignRes.ok) throw new Error("Presign failed");
    const { url } = (await presignRes.json()) as { url: string };

    await fetch(url, {
      method: "PUT",
      body: blob,
      headers: { "Content-Type": blob.type || "image/png" },
    });

    return `${publicUrl}/${key}`;
  };

  const saveSignatureToProfile = async () => {
    if (!signatureData || !currentEmployeeId) {
      toast.error("Гарын үсэг эсвэл ажилтны мэдээлэл алга.");
      return;
    }
    try {
      setSignatureProfileSaving(true);
      toast.loading("Гарын үсгийг хадгалж байна...", {
        id: "save-signature-profile",
      });
      const url = await uploadSignatureImageToR2(signatureData);
      await updateEmployeeMutation({
        variables: {
          id: currentEmployeeId,
          input: { signUrl: url },
        },
      });
      await refetchEmployees();
      toast.success("Гарын үсгийг ажилтны профайлд хадгаллаа.", {
        id: "save-signature-profile",
      });
    } catch (err) {
      console.error(err);
      toast.error("Гарын үсгийг хадгалахад алдаа гарлаа.", {
        id: "save-signature-profile",
      });
    } finally {
      setSignatureProfileSaving(false);
    }
  };

  const uploadSignedPdf = async () => {
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
      toast.loading("Гарын үсэгтэй PDF үүсгэж байна...", {
        id: "signature-upload",
      });

      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      await ensurePdfFonts(pdf);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;
      let cursorY = 18;

      const assetName = normalizeAssetTag(
        signAssignment?.asset?.assetTag ?? signAssignment?.assetId,
      );
      const serial = signAssignment?.asset?.serialNumber ?? "—";
      const category = signAssignment?.asset?.category ?? "—";
      const assignedDate = signAssignment?.assignedAt
        ? new Date(signAssignment.assignedAt).toLocaleDateString("mn-MN")
        : "—";
      const requestedByName = signAssignment?.requestedBy
        ? [
            signAssignment.requestedBy.firstName,
            signAssignment.requestedBy.lastName,
          ]
            .filter(Boolean)
            .join(" ") || "Admin"
        : "Admin";
      const employeeName = employeesData?.employees?.find(
        (e) => e.id === currentEmployeeId,
      )?.firstName
        ? `${employeesData?.employees?.find((e) => e.id === currentEmployeeId)?.firstName ?? ""} ${employeesData?.employees?.find((e) => e.id === currentEmployeeId)?.lastName ?? ""}`.trim()
        : DEMO_EMPLOYEE_EMAIL;

      pdf.setFillColor(245, 247, 250);
      pdf.rect(0, 0, pageWidth, 34, "F");
      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.setFontSize(18);
      pdf.text("Хөрөнгийн ашиглалтын гэрээ", pageWidth / 2, 20, {
        align: "center",
      });
      pdf.setFontSize(10);
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.text(
        `Үүсгэсэн огноо: ${new Date().toLocaleDateString("mn-MN")}`,
        pageWidth - margin,
        28,
        { align: "right" },
      );
      cursorY = 42;

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.setFontSize(12);
      pdf.text("1. Гэрээний зорилго", margin, cursorY);
      cursorY += 6;
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.setFontSize(11);
      const purposeText =
        "Доор гарын үсэг зурж баталгаажуулснаар та энэхүү хөрөнгийг хүлээн авч, гэрээнд заасан нөхцөлийг зөвшөөрч байгаагаа илэрхийлнэ. Цахим гарын үсэг нь гарын үсэгтэй адил хүчинтэй.";
      const purposeLines = pdf.splitTextToSize(purposeText, contentWidth);
      pdf.text(purposeLines, margin, cursorY);
      cursorY += purposeLines.length * 5.5 + 8;

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.setFontSize(12);
      pdf.text("2. Хөрөнгийн дэлгэрэнгүй", margin, cursorY);
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
      pdf.text(`Юу: ${assetName}`, leftX, rowY);
      pdf.text(`Сериал: ${serial}`, rightX, rowY);
      rowY += 8;
      pdf.text(`Ангилал: ${category}`, leftX, rowY);
      pdf.text(`Хэнээс: ${requestedByName}`, rightX, rowY);
      rowY += 8;
      pdf.text(`Олгосон огноо: ${assignedDate}`, leftX, rowY);
      pdf.text(`Хариуцагч: ${employeeName}`, rightX, rowY);
      cursorY = boxTop + boxHeight + 10;

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.setFontSize(12);
      pdf.text("3. Гэрээний нөхцөл", margin, cursorY);
      cursorY += 6;
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.setFontSize(11);
      const terms = [
        "Хөрөнгийг зөвхөн ажлын хэрэгцээнд ашиглана.",
        "Гэмтэл, эвдрэл гарсан тохиолдолд шууд мэдээлнэ.",
        "Хөрөнгийг зөвшөөрөлгүйгээр бусдад шилжүүлэхгүй.",
        "Ажил дууссан үед эсвэл шаардлага гарвал буцаан өгнө.",
      ];
      const termLines = terms.flatMap((t) =>
        pdf.splitTextToSize(`- ${t}`, contentWidth),
      );
      pdf.text(termLines, margin, cursorY);
      cursorY += termLines.length * 5.5 + 8;

      pdf.setFont(PDF_FONT_NAME, "bold");
      pdf.text("Баталгаажуулсан огноо", margin, pageHeight - 20);
      pdf.setFont(PDF_FONT_NAME, "normal");
      pdf.text(
        new Date().toLocaleDateString("mn-MN"),
        margin + 48,
        pageHeight - 20,
      );

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
        // ignore
      }

      const pdfBlob = pdf.output("blob");
      const key = `signatures/${signAssignment?.assetId ?? "asset"}/${signAssignment?.id ?? crypto.randomUUID()}-${Date.now()}.pdf`;

      const presignRes = await fetch(presignUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          contentType: "application/pdf",
          bucketName,
        }),
      });
      if (!presignRes.ok) throw new Error("Presign амжилтгүй");
      const { url } = (await presignRes.json()) as { url: string };
      await fetch(url, {
        method: "PUT",
        body: pdfBlob,
        headers: { "Content-Type": "application/pdf" },
      });
      const fileUrl = `${publicUrl}/${key}`;
      setSignatureFileUrl(fileUrl);
      toast.success("Гэрээ PDF хадгалагдлаа.", { id: "signature-upload" });
      return true;
    } catch (err) {
      console.error(err);
      toast.error("PDF хадгалахад алдаа гарлаа.", { id: "signature-upload" });
      return false;
    } finally {
      setSignatureUploading(false);
    }
  };

  const handleVerify = async () => {
    if (!signatureData) {
      toast.error("Эхлээд гарын үсгээ зурна уу.");
      return;
    }
    const uploaded = await uploadSignedPdf();
    if (!uploaded) return;
    setIsChecked(true);
    setIsSignModalOpen(false);
    toast.info("Нөхцөл шалгаж дууслаа. Одоо баталгаажуулах боломжтой.");
  };

  const handleClearSignature = () => {
    setSignatureData(null);
    setSignatureFileUrl(null);
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
      toast.success(
        "Устгах хүсэлт IT руу амжилттай илгээгдлээ. Дараа нь санхүү баталгаажуулна.",
      );
      setSelectedAssignment(null);
      setDisposalReason("");
      await Promise.all([refetchAssignRequested(), refetchPending(), refetchActive()]);
      await refetchOffboarding();
    } catch {
      toast.error("Устгах хүсэлт илгээхэд алдаа гарлаа.");
    } finally {
      setDisposalSending(false);
    }
  };

  const handleSubmitReturnRequest = async () => {
    if (
      !returnRequestAssignment?.asset?.id ||
      !currentEmployeeId ||
      !returnCondition.trim()
    ) {
      toast.error("Нөхцөл сонгоно уу.");
      return;
    }
    if (!activeOffboarding) {
      toast.error(
        "HR таны ажлаас гарах процессыг эхлүүлээгүй байна (offboarding event байхгүй).",
      );
      return;
    }
    const conditionDetailToSend = returnConditionDetail.trim() || null;
    const photoR2KeyToSend = returnPhotoFile
      ? `demo-photo-${Date.now()}-${returnPhotoFile.name}`
      : null;
    setReturnRequestSending(true);
    try {
      const variables: {
        assetId: string;
        employeeId: string;
        condition: string;
        conditionDetail?: string | null;
        photoR2Key?: string | null;
      } = {
        assetId: returnRequestAssignment.asset.id,
        employeeId: currentEmployeeId,
        condition: returnCondition,
      };
      if (conditionDetailToSend != null)
        variables.conditionDetail = conditionDetailToSend;
      if (photoR2KeyToSend != null) variables.photoR2Key = photoR2KeyToSend;
      await submitReturnRequestMutation({ variables });
      toast.success(
        `${normalizeAssetTag(returnRequestAssignment.asset.assetTag)} буцааж өгөх хүсэлт илгээгдлээ. HR шалгана.`,
      );
      setShowReturnRequestDialog(false);
      setReturnRequestAssignment(null);
      setReturnCondition("GOOD");
      setReturnConditionDetail("");
      setReturnPhotoFile(null);
      await Promise.all([refetchOffboarding(), refetchActive()]);
    } catch {
      toast.error("Буцаах хүсэлт илгээхэд алдаа гарлаа.");
    } finally {
      setReturnRequestSending(false);
    }
  };

  const handleStartOffboarding = async () => {
    if (!currentEmployeeId) return;
    setShowOffboardingModal(false);
    try {
      toast.loading("Ажилаас гарах үйлдэл эхлүүлж байна...", {
        id: "offboard",
      });
      await startOffboardingMutation({
        variables: {
          employeeId: currentEmployeeId,
          initiatedBy: currentEmployeeId,
        },
      });
      toast.success(
        "Ажилаас гарах (offboarding) эхэллээ. Хөрөнгөө буцааж өгнө үү.",
        { id: "offboard" },
      );
      await refetchOffboarding();
    } catch {
      toast.error("Ажилаас гарах эхлүүлэхэд алдаа гарлаа.", { id: "offboard" });
    }
  };

  const otherEmployees = useMemo(() => {
    const list = (employeesData?.employees ?? []) as Array<{
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    }>;
    return list
      .filter((e) => e.id !== currentEmployeeId)
      .map((e) => ({
        id: e.id,
        name:
          [e.firstName, e.lastName].filter(Boolean).join(" ") ||
          e.email ||
          e.id,
      }));
  }, [employeesData?.employees, currentEmployeeId]);

  const handleTransferToEmployee = async () => {
    if (
      !selectedAssignment?.asset?.id ||
      !currentEmployeeId ||
      !transferToEmployeeId
    ) {
      toast.error("Хүлээн авах ажилтан сонгоно уу.");
      return;
    }
    const assetId = selectedAssignment.asset.id;
    const toName =
      otherEmployees.find((e) => e.id === transferToEmployeeId)?.name ??
      transferToEmployeeId;
    setTransferSending(true);
    try {
      await returnAssetMutation({
        variables: {
          assetId,
          conditionAtReturn: transferReason || "Шилжүүлэх",
        },
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
        assetTag: normalizeAssetTag(
          selectedAssignment.asset?.assetTag ?? selectedAssignment.assetId,
        ),
      });
      toast.success(
        `${toName} руу шилжүүлэх хүсэлт илгээгдлээ. Тэр хүн "Шинэ хүсэлт" дээрээ хүлээн авах хүртэл хүлээгдэнэ.`,
      );
      setShowTransferDialog(false);
      setTransferToEmployeeId("");
      setTransferReason("");
      setSelectedAssignment(null);
      await refetchActive();
    } catch {
      toast.error("Шилжүүлэх хүсэлт илгээхэд алдаа гарлаа.");
    } finally {
      setTransferSending(false);
    }
  };

  const handleTransferToIt = async (
    kind: "DATA_WIPE" | "REPAIR",
    opts?: { description?: string },
  ) => {
    if (!selectedAssignment?.asset?.id || !currentEmployeeId) return;
    setTransferSending(true);
    try {
      if (kind === "DATA_WIPE") {
        // Employee-side data wipe request should arrive as a disposal request.
        await requestDisposalMutation({
          variables: {
            assetId: selectedAssignment.asset.id,
            requestedBy: currentEmployeeId,
            method: "DATA_WIPE",
            reason: "Data wipe хүсэлт",
          },
        });
        toast.success("Data wipe (устгах) хүсэлт IT-д илгээгдлээ.");
      } else {
        const description = opts?.description?.trim();
        if (!description) {
          toast.error("Засварын тайлбар заавал бичнэ үү.");
          return;
        }
        await createMaintenanceTicketMutation({
          variables: {
            assetId: selectedAssignment.asset.id,
            reporterId: currentEmployeeId,
            description,
            severity: "MEDIUM",
          },
        });
        toast.success("Засварын хүсэлт IT-д үүслээ.");
      }
      setShowItTransferDialog(false);
      setSelectedAssignment(null);
      refetchActive();
    } catch {
      toast.error("IT хүсэлт үүсгэхэд алдаа гарлаа.");
    } finally {
      setTransferSending(false);
    }
  };

  const handleBulkSubmitReturnRequests = async () => {
    if (!currentEmployeeId) return;
    if (!activeOffboarding) {
      toast.error(
        "HR таны ажлаас гарах процессыг эхлүүлээгүй байна (offboarding event байхгүй).",
      );
      return;
    }
    if (!bulkReturnInstructionsRead) {
      toast.error("Буцаах зааврыг уншсан гэдгээ тэмдэглэнэ үү.");
      return;
    }
    const ids = Array.from(selectedReturnAssetIds);
    if (ids.length === 0) {
      toast.error("Буцаах хөрөнгө сонгоно уу.");
      return;
    }
    setBulkReturnSending(true);
    try {
      for (const assetId of ids) {
        await submitReturnRequestMutation({
          variables: {
            assetId,
            employeeId: currentEmployeeId,
            condition: "GOOD",
            conditionDetail: null,
            photoR2Key: null,
          },
        });
      }
      toast.success(`Буцаах хүсэлт илгээгдлээ: ${ids.length} хөрөнгө.`);
      setSelectedReturnAssetIds(new Set());
      setBulkReturnInstructionsRead(false);
      await refetchOffboarding();
      await refetchActive();
    } catch {
      toast.error("Багцаар буцаах хүсэлт илгээхэд алдаа гарлаа.");
    } finally {
      setBulkReturnSending(false);
    }
  };

  const employeesLoading = !employeesData && !currentEmployeeId;
  const employeeNotFound =
    !!employeesData?.employees &&
    employeesData.employees.length > 0 &&
    !defaultDemoEmployeeId;

  const onOpenReturnRequest = (a: AssignmentItem) => {
    setReturnRequestAssignment(a);
    setReturnCondition("GOOD");
    setReturnConditionDetail("");
    setReturnPhotoFile(null);
    setReturnInstructionsRead(false);
    setShowReturnRequestDialog(true);
  };

  return {
    employeesData,
    demoEmployeeId,
    setDemoEmployeeId,
    currentEmployeeId,
    activeOffboarding,
    pendingList,
    activeAssignments,
    myAssetsList,
    notifications,
    offboardingNotifications,
    censusNotifications,
    expandedNotificationId,
    setExpandedNotificationId,
    bulkReturnInstructionsRead,
    setBulkReturnInstructionsRead,
    selectedReturnAssetIds,
    returnRequestAssignment,
    setReturnRequestAssignment,
    returnCondition,
    setReturnCondition,
    returnConditionDetail,
    setReturnConditionDetail,
    returnInstructionsRead,
    setReturnInstructionsRead,
    isDamagedCondition,
    returnPhotoFile,
    setReturnPhotoFile,
    returnRequestSending,
    showReturnRequestDialog,
    setShowReturnRequestDialog,
    bulkReturnSending,
    submitReturnRequestLoading,
    eligibleReturnAssignmentsLength: eligibleReturnAssignments.length,
    selectAllEligibleReturns,
    assetsToReturnList,
    pendingReturnRequestAssetIds,
    assignmentsToReturn,
    eligibleReturnAssignments,
    toggleReturnSelection,
    onOpenReturnRequest,
    isChecked,
    setIsChecked,
    selectedAssignment,
    setSelectedAssignment,
    isSignModalOpen,
    setIsSignModalOpen,
    signAssignment,
    setSignAssignment,
    signatureData,
    setSignatureData,
    signatureFileUrl,
    setSignatureFileUrl,
    showSignaturePad,
    setShowSignaturePad,
    signatureUploading,
    signatureProfileSaving,
    savedSignatureUrl,
    disposalReason,
    setDisposalReason,
    disposalSending,
    transferToEmployeeId,
    setTransferToEmployeeId,
    transferReason,
    setTransferReason,
    transferSending,
    showTransferDialog,
    setShowTransferDialog,
    showItTransferDialog,
    setShowItTransferDialog,
    showOffboardingModal,
    setShowOffboardingModal,
    showRequestsDialog,
    setShowRequestsDialog,
    pendingTransferSent,
    setPendingTransferSent,
    defaultDemoEmployeeId,
    currentEmployee,
    currentPending,
    employeesLoading,
    employeeNotFound,
    offboardingStarting,
    updatingStatus,
    completeReturnLoading,
    otherEmployees,
    handleApprove,
    handleReject,
    handleBulkSubmitReturnRequests,
    handleSaveSignature,
    loadSignatureFromUrl,
    saveSignatureToProfile,
    handleVerify,
    handleClearSignature,
    handleRequestDisposal,
    handleSubmitReturnRequest,
    handleStartOffboarding,
    handleTransferToEmployee,
    handleTransferToIt,
    handleActionComplete,
    activeLoading,
    pendingLoading,
    normalizeAssetTag,
    DEMO_EMPLOYEE_EMAIL,
    PDF_FONT_NAME,
  };
}
