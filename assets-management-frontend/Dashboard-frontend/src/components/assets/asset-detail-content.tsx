"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useMemo, useState, useEffect } from "react";
import type { AssetFieldsFragment } from "@/gql/graphql";
import { toast } from "sonner";
import {
  AssignAssetDocument,
  DeleteAssetDocument,
  EmployeesDocument,
  GetAssetDocument,
  GetAssetHistoryDocument,
  GetAssetKpisDocument,
  GetAssetsDocument,
  GetLocationsDocument,
  ReturnAssetDocument,
  TransferAssetDocument,
  UpdateAssetDocument,
} from "@/gql/graphql";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Box,
  Pencil,
  X,
  History,
  Check,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { CATEGORY_LABELS, SUB_CATEGORIES_BY_MAIN } from "./constants";
import { cn } from "@/lib/utils";

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

const STATUS_BADGE_CLASSES: Record<string, string> = {
  ASSIGNED: "border-blue-100 bg-blue-50/60 text-blue-600",
  AVAILABLE: "border-green-100 bg-green-50/60 text-green-600",
  FOR_SALE: "border-yellow-100 bg-yellow-50/60 text-yellow-700",
  DAMAGED: "border-red-100 bg-red-50/60 text-red-600",
};

const STATUS_DOT_CLASSES: Record<string, string> = {
  ASSIGNED: "bg-blue-500",
  AVAILABLE: "bg-green-500",
  FOR_SALE: "bg-yellow-500",
  DAMAGED: "bg-red-500",
};

const MAIN_CATEGORY_BY_SUB: Record<string, string> = Object.entries(
  SUB_CATEGORIES_BY_MAIN,
).reduce(
  (acc, [main, subs]) => {
    subs.forEach((sub) => {
      acc[sub] = main;
    });
    return acc;
  },
  {} as Record<string, string>,
);

const FIELD_LABEL_CLASS =
  "text-[13px] font-medium leading-5 tracking-normal text-slate-500";
const FIELD_BOX_CLASS =
  "flex min-h-11 items-center rounded-lg border border-slate-200 bg-white px-3.5 text-[15px] font-medium text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)]";
const FIELD_INPUT_CLASS =
  "h-11 rounded-lg border-slate-200 bg-white px-3.5 text-[15px] text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-200";
const FIELD_SELECT_TRIGGER_CLASS = cn(FIELD_INPUT_CLASS, "w-full");
const FIELD_SELECT_CONTENT_CLASS =
  "z-[70] rounded-lg border border-slate-200 bg-white shadow-[0_20px_48px_rgba(15,23,42,0.12)]";
const FIELD_NATIVE_SELECT_OVERLAY_CLASS =
  "absolute inset-0 h-full w-full cursor-pointer opacity-0";

function formatCurrency(value: number | null | undefined) {
  if (value == null) return "—";
  return `${Number(value).toLocaleString()}₮`;
}

function formatNumberInput(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString();
}

function parseNumberInput(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function getInitials(value: string) {
  const parts = value
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return "?";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 text-[13px] font-semibold",
        STATUS_BADGE_CLASSES[status] ??
          "border-slate-200 bg-slate-50 text-slate-600",
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          STATUS_DOT_CLASSES[status] ?? "bg-slate-400",
        )}
      />
      {STATUS_LABELS[status] || status || "—"}
    </span>
  );
}

function AssetDetailSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-[28px] bg-white">
      <div className="border-b border-slate-200 px-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6 pb-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="flex items-center gap-2 pb-3">
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-5">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-11 w-full rounded-lg" />
                </div>
              ))}
              <div className="space-y-2 sm:col-span-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <Skeleton className="h-4 w-32" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssetDetailContent({
  assetId,
  onClose,
  offboardingConfirmMode = false,
  onOffboardingConfirmed,
}: {
  assetId: string;
  onClose?: () => void;
  offboardingConfirmMode?: boolean;
  onOffboardingConfirmed?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isStatusEditing, setIsStatusEditing] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<string | null>(null);
  const [hasInitializedEdit, setHasInitializedEdit] = useState(false);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(
    null,
  );
  const [editData, setEditData] = useState({
    assetTag: "",
    serialNumber: "",
    status: "",
    mainCategory: "",
    category: "",
    locationId: "",
    assignedEmployeeId: "",
    purchaseCost: "",
    salePrice: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [optimisticBookValue, setOptimisticBookValue] = useState<number | null>(
    null,
  );

  const { data, loading, refetch } = useQuery(GetAssetDocument, {
    variables: { id: assetId },
    skip: !assetId,
    fetchPolicy: "cache-and-network",
  });
  const { data: historyData } = useQuery(GetAssetHistoryDocument, {
    variables: { assetId },
    skip: !assetId,
  });
  const { data: locationsData } = useQuery(GetLocationsDocument);
  const { data: employeesData } = useQuery(EmployeesDocument);
  const client = useApolloClient();
  const [updateAsset] = useMutation(UpdateAssetDocument, {
    refetchQueries: [
      { query: GetAssetDocument, variables: { id: assetId } },
      { query: GetAssetKpisDocument },
      { query: GetAssetsDocument },
    ],
    awaitRefetchQueries: true,
  });
  const [deleteAsset, { loading: deleting }] = useMutation(
    DeleteAssetDocument,
    {
      refetchQueries: [
        { query: GetAssetKpisDocument },
        { query: GetAssetsDocument },
      ],
      awaitRefetchQueries: true,
    },
  );
  const [assignAsset, { loading: assigning }] = useMutation(
    AssignAssetDocument,
    {
      refetchQueries: [
        { query: GetAssetDocument, variables: { id: assetId } },
        { query: GetAssetKpisDocument },
        { query: GetAssetsDocument },
      ],
      awaitRefetchQueries: true,
    },
  );
  const [returnAsset, { loading: returning }] = useMutation(
    ReturnAssetDocument,
    {
      refetchQueries: [
        { query: GetAssetDocument, variables: { id: assetId } },
        { query: GetAssetKpisDocument },
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
        { query: GetAssetKpisDocument },
        { query: GetAssetsDocument },
      ],
      awaitRefetchQueries: true,
    },
  );

  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [assignEmployeeId, setAssignEmployeeId] = useState("");
  const [transferToEmployeeId, setTransferToEmployeeId] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("AVAILABLE");
  const [confirmLocationId, setConfirmLocationId] = useState("");
  const [confirmSendTo, setConfirmSendTo] = useState<"HR" | "IT" | "Agniruu">(
    "HR",
  );
  const [confirming, setConfirming] = useState(false);
  const actionLoading = assigning || returning || transferring;

  const asset = data?.asset as
    | (AssetFieldsFragment & { locationPath?: string })
    | undefined;
  const historyItems = (historyData?.assetHistory ?? []) as Array<{
    id: string;
    eventType: string;
    description: string;
    timestamp: string;
    actor?: {
      firstName?: string | null;
      lastName?: string | null;
      imageUrl?: string | null;
    } | null;
  }>;

  const locationOptions = useMemo(() => {
    return (
      (locationsData?.locations ?? []) as Array<{ id: string; name: string }>
    ).map((loc) => ({
      id: loc.id.toString(),
      name: loc.name,
    }));
  }, [locationsData]);
  const employeeOptions = useMemo(() => {
    return (employeesData?.employees ?? []).map((employee) => ({
      id: employee.id,
      name:
        [employee.firstName, employee.lastName].filter(Boolean).join(" ") ||
        employee.email ||
        employee.id,
    }));
  }, [employeesData]);

  const mainCategoryOptions = useMemo(
    () => Object.keys(SUB_CATEGORIES_BY_MAIN),
    [],
  );

  const subCategoryOptions = useMemo(() => {
    return SUB_CATEGORIES_BY_MAIN[editData.mainCategory] ?? [];
  }, [editData.mainCategory]);

  const handleEditToggle = () => {
    if (!asset) return;
    setIsStatusEditing(false);
    const bookValue =
      optimisticBookValue ?? asset.currentBookValue ?? undefined;
    setEditData({
      assetTag: asset.assetTag ?? "",
      serialNumber: asset.serialNumber ?? "",
      status: asset.status ?? "AVAILABLE",
      mainCategory: MAIN_CATEGORY_BY_SUB[asset.category ?? ""] || "",
      category: asset.category ?? "",
      locationId: asset.locationId ?? "",
      assignedEmployeeId: asset.assignedTo ?? "",
      purchaseCost: formatNumberInput(asset.purchaseCost?.toString() ?? ""),
      salePrice: formatNumberInput(bookValue?.toString() ?? ""),
      notes: asset.notes ?? "",
    });
    setIsEditing(true);
  };

  useEffect(() => {
    setHasInitializedEdit(false);
    setIsEditing(false);
    setIsStatusEditing(false);
    setOptimisticStatus(null);
    setOptimisticBookValue(null);
  }, [assetId]);

  useEffect(() => {
    if (!asset || hasInitializedEdit) return;
    setEditData({
      assetTag: asset.assetTag ?? "",
      serialNumber: asset.serialNumber ?? "",
      status: asset.status ?? "AVAILABLE",
      mainCategory: MAIN_CATEGORY_BY_SUB[asset.category ?? ""] || "",
      category: asset.category ?? "",
      locationId: asset.locationId ?? "",
      assignedEmployeeId: asset.assignedTo ?? "",
      purchaseCost: formatNumberInput(asset.purchaseCost?.toString() ?? ""),
      salePrice: formatNumberInput(asset.currentBookValue?.toString() ?? ""),
      notes: asset.notes ?? "",
    });
    setHasInitializedEdit(true);
  }, [asset, hasInitializedEdit]);

  useEffect(() => {
    if (!asset) return;
    setConfirmStatus(asset.status ?? "ASSIGNED");
    setConfirmLocationId(asset.locationId ?? "");
    setConfirmSendTo("HR");
  }, [asset]);

  const handleSave = async () => {
    const hasSalePriceInput = editData.salePrice.trim().length > 0;
    const parsedSalePrice = hasSalePriceInput
      ? parseNumberInput(editData.salePrice)
      : undefined;
    if (hasSalePriceInput && editData.status !== "FOR_SALE") {
      toast.error(
        "`Зарах үнэ` оруулах бол төлөвийг `Зарж болох` гэж сонгоно уу.",
      );
      return;
    }
    if (
      editData.status === "FOR_SALE" &&
      (!parsedSalePrice || parsedSalePrice <= 0)
    ) {
      toast.error("`Зарж болох` төлөвт заавал `Зарах үнэ` оруулна.");
      return;
    }
    if (editData.status === "ASSIGNED" && !editData.assignedEmployeeId) {
      toast.error("`Эзэмшигчтэй` болгох бол ажилтан сонгоно уу.");
      return;
    }

    const hasPurchaseCostInput = editData.purchaseCost.trim().length > 0;
    const parsedPurchaseCost = hasPurchaseCostInput
      ? parseNumberInput(editData.purchaseCost)
      : undefined;

    setSaving(true);
    try {
      // Rule:
      // - If user changed "Худалдаж авсан үнэ" input -> update purchaseCost only.
      // - If user changed "Зарах үнэ" input (FOR_SALE only) -> update currentBookValue only.
      // - Do not overwrite fields with 0 when input is empty.
      const nextPurchaseCost = parsedPurchaseCost;
      const nextCurrentBookValue =
        editData.status === "FOR_SALE" ? parsedSalePrice : undefined;
      await updateAsset({
        variables: {
          id: assetId,
          input: {
            assetTag: editData.assetTag,
            serialNumber: editData.serialNumber,
            status: editData.status,
            mainCategory: editData.mainCategory,
            category: editData.category,
            locationId: editData.locationId,
            purchaseCost: nextPurchaseCost,
            currentBookValue: nextCurrentBookValue,
            notes: editData.notes,
          },
        },
      });
      if (editData.status === "ASSIGNED" && editData.assignedEmployeeId) {
        await assignAsset({
          variables: {
            assetId,
            employeeId: editData.assignedEmployeeId,
            conditionAtAssign: "GOOD",
          },
        });
      } else if (asset?.assignedTo && editData.status !== "ASSIGNED") {
        await returnAsset({
          variables: {
            assetId,
          },
        });
      }
      if (editData.status === "FOR_SALE" && nextCurrentBookValue != null) {
        // Keep UI coherent for sale price display.
        setOptimisticBookValue(nextCurrentBookValue);
      } else if (nextPurchaseCost != null) {
        setOptimisticBookValue(nextPurchaseCost);
      }
      await refetch();
      await client.refetchQueries({
        include: [GetAssetsDocument, GetAssetKpisDocument],
      });
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusQuickSave = async (nextStatus: string) => {
    if (!asset) return;
    const currentStatus = optimisticStatus ?? asset.status ?? "";
    if (nextStatus === currentStatus) {
      setIsStatusEditing(false);
      return;
    }

    if (nextStatus === "FOR_SALE" && (!salePriceValue || salePriceValue <= 0)) {
      setIsStatusEditing(false);
      handleEditToggle();
      setEditData((prev) => ({ ...prev, status: "FOR_SALE" }));
      toast.error("`Зарж болох` сонгохын тулд `Зарах үнэ` заавал оруулна.");
      return;
    }

    setOptimisticStatus(nextStatus);
    setIsStatusEditing(false);
    try {
      await updateAsset({
        variables: {
          id: assetId,
          input: {
            status: nextStatus,
          },
        },
        awaitRefetchQueries: false,
      });
    } catch (e) {
      console.error(e);
      setOptimisticStatus(null);
    }
  };

  const handleOffboardingConfirm = async () => {
    if (!asset) return;
    setConfirming(true);
    const nextStatus =
      confirmStatus === "ASSIGNED" ? "AVAILABLE" : confirmStatus;
    const routingNote = `Offboarding баталгаажуулалт -> ${confirmSendTo}`;
    const currentNotes = (asset.notes ?? "").trim();
    const nextNotes = currentNotes
      ? `${currentNotes}\n${routingNote}`
      : routingNote;

    try {
      await updateAsset({
        variables: {
          id: assetId,
          input: {
            status: nextStatus,
            locationId: confirmLocationId || undefined,
            notes: nextNotes,
          },
        },
      });
      await refetch();
      await client.refetchQueries({
        include: [GetAssetsDocument, GetAssetKpisDocument],
      });
      toast.success("Хөрөнгө амжилттай баталгаажлаа.");
      onOffboardingConfirmed?.();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Баталгаажуулах үед алдаа гарлаа.");
    } finally {
      setConfirming(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm("Энэ хөрөнгийг устгах уу? Энэ үйлдлийг буцааж болохгүй.")
    )
      return;
    try {
      const result = await deleteAsset({ variables: { id: assetId } });
      if (result.data?.deleteAsset) {
        onClose?.();
      } else {
        toast.error(
          "Хөрөнгийг устгаж чадсангүй. Хөрөнгө одоогоор эзэмшигчтэй эсвэл холбоотой үйлдэлтэй байж болно.",
        );
      }
    } catch (e) {
      console.error("Failed to delete asset:", e);
      toast.error("Хөрөнгийг устгахад алдаа гарлаа.");
    }
  };

  const handleReturnAsset = async () => {
    try {
      await returnAsset({
        variables: { assetId, conditionAtReturn: "GOOD" },
      });
      toast.success("Хөрөнгө амжилттай буцаагдалаа.");
      await refetch();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Хөрөнгө буцаах үед алдаа гарлаа.");
    }
  };

  const handleAssignConfirm = async () => {
    if (!assignEmployeeId) {
      toast.error("Ажилтан сонгоно уу.");
      return;
    }
    try {
      await assignAsset({
        variables: {
          assetId,
          employeeId: assignEmployeeId,
          conditionAtAssign: "GOOD",
        },
      });
      toast.success("Хөрөнгө амжилттай олголоо.");
      setShowAssignDialog(false);
      setAssignEmployeeId("");
      await refetch();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Хөрөнгө олгоход алдаа гарлаа.");
    }
  };

  const handleTransferConfirm = async () => {
    if (!asset?.assignedTo || !transferToEmployeeId) {
      toast.error("Шилжүүлэх ажилтан сонгоно уу.");
      return;
    }
    try {
      await transferAsset({
        variables: {
          assetId,
          fromEmployeeId: asset.assignedTo,
          toEmployeeId: transferToEmployeeId,
          reason: "Шилжүүлсэн",
        },
      });
      toast.success("Хөрөнгө амжилттай шилжүүллээ.");
      setShowTransferDialog(false);
      setTransferToEmployeeId("");
      await refetch();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Хөрөнгө шилжүүлэхэд алдаа гарлаа.");
    }
  };

  if (loading) return <AssetDetailSkeleton />;
  if (!asset) return null;

  const categoryKey = asset.category ?? "";
  const subCategoryLabel =
    (CATEGORY_LABELS as Record<string, string>)[categoryKey] ||
    categoryKey ||
    "—";
  const mainCategoryLabel = MAIN_CATEGORY_BY_SUB[categoryKey] || "—";
  const isModal = Boolean(onClose);
  const salePriceValue = optimisticBookValue ?? asset.currentBookValue ?? null;
  const resolvedStatus = optimisticStatus ?? asset.status ?? "";
  const ownerName = asset.assignedTo?.trim() || "Admin";
  const ownerInitials = getInitials(ownerName);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[28px] bg-white",
        !isModal &&
          "mx-auto border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)]",
      )}
    >
      <Tabs defaultValue="details" className="w-full gap-0">
        <div className="border-b border-slate-200 px-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList variant="line" className="h-auto gap-6 p-0">
              <TabsTrigger
                value="details"
                className="gap-2 rounded-none px-0 py-3 text-[14px] font-semibold text-slate-500 data-active:text-slate-950 after:-bottom-px after:h-0.5"
              >
                <Box className="h-4 w-4" />
                Хөрөнгийн дэлгэрэнгүй
              </TabsTrigger>
              {!offboardingConfirmMode ? (
                <TabsTrigger
                  value="history"
                  className="gap-2 rounded-none px-0 py-3 text-[14px] font-semibold text-slate-500 data-active:text-slate-950 after:-bottom-px after:h-0.5"
                >
                  <History className="h-4 w-4" />
                  Хөрөнгийн түүх
                </TabsTrigger>
              ) : null}
            </TabsList>

            <div className="flex items-center gap-2 pb-3">
              {!isEditing && !offboardingConfirmMode && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEditToggle}
                  className="h-9 rounded-lg border-slate-300 px-3 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  Засварлах
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              )}
              {isEditing && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    className="h-9 rounded-lg px-3 text-[13px] text-slate-600"
                  >
                    Цуцлах
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={saving}
                    className="h-9 rounded-lg px-4 text-[13px] font-semibold"
                  >
                    {saving ? "..." : "Хадгалах"}
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="h-9 w-9 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              {isModal && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-9 w-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <X className="h-4.5 w-4.5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <TabsContent value="details" className="m-0 px-6 pb-6 pt-5">
          {isEditing ? (
            <div className="grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)]">
              <div className="flex h-[158px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:w-[160px]">
                {asset.imageUrl ? (
                  <img
                    src={asset.imageUrl}
                    className="max-h-full w-full object-contain"
                    alt={asset.assetTag || "Asset"}
                  />
                ) : (
                  <Box className="h-12 w-12 text-slate-300" />
                )}
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className={FIELD_LABEL_CLASS}>Нэр</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Input
                        value={editData.assetTag}
                        onChange={(e) =>
                          setEditData({ ...editData, assetTag: e.target.value })
                        }
                        className={cn(FIELD_INPUT_CLASS, "pr-9")}
                      />
                      <X
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-slate-300"
                        onClick={() =>
                          setEditData({ ...editData, assetTag: "" })
                        }
                      />
                    </div>
                  ) : (
                    <div className={FIELD_BOX_CLASS}>
                      {asset.assetTag || "—"}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className={FIELD_LABEL_CLASS}>Серийн дугаар</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Input
                        value={editData.serialNumber}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            serialNumber: e.target.value,
                          })
                        }
                        className={cn(FIELD_INPUT_CLASS, "pr-9")}
                      />
                      <X
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-slate-300"
                        onClick={() =>
                          setEditData({ ...editData, serialNumber: "" })
                        }
                      />
                    </div>
                  ) : (
                    <div className={FIELD_BOX_CLASS}>
                      {asset.serialNumber || "—"}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className={FIELD_LABEL_CLASS}>Төлөв</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Input
                        readOnly
                        value={STATUS_LABELS[editData.status] || "Төлөв сонгох"}
                        className={cn(
                          FIELD_INPUT_CLASS,
                          "cursor-pointer pr-10 font-medium",
                        )}
                      />
                      <select
                        value={editData.status}
                        onChange={(event) =>
                          setEditData({
                            ...editData,
                            status: event.target.value,
                            assignedEmployeeId:
                              event.target.value === "ASSIGNED"
                                ? editData.assignedEmployeeId
                                : "",
                          })
                        }
                        className={FIELD_NATIVE_SELECT_OVERLAY_CLASS}
                      >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  ) : (
                    <div className={FIELD_BOX_CLASS}>
                      <StatusChip status={asset.status ?? ""} />
                    </div>
                  )}
                </div>

                {isEditing && editData.status === "ASSIGNED" ? (
                  <div className="space-y-1.5">
                    <Label className={FIELD_LABEL_CLASS}>Ажилтан</Label>
                    <Select
                      value={editData.assignedEmployeeId || undefined}
                      onValueChange={(value) =>
                        setEditData({ ...editData, assignedEmployeeId: value })
                      }
                    >
                      <SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}>
                        <SelectValue placeholder="Ажилтан сонгох" />
                      </SelectTrigger>
                      <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                        {employeeOptions.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                <div className="space-y-1.5">
                  <Label className={FIELD_LABEL_CLASS}>Байршил</Label>
                  {isEditing ? (
                    <Select
                      value={editData.locationId}
                      onValueChange={(value) =>
                        setEditData({ ...editData, locationId: value })
                      }
                    >
                      <SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}>
                        <SelectValue placeholder="Сонгох" />
                      </SelectTrigger>
                      <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                        {locationOptions.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>
                            {loc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div
                      className={cn(
                        FIELD_BOX_CLASS,
                        "wrap-break-word leading-6",
                      )}
                    >
                      {asset.locationPath || "—"}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className={FIELD_LABEL_CLASS}>Ангилал</Label>
                  {isEditing ? (
                    <Select
                      value={editData.mainCategory}
                      onValueChange={(value) => {
                        const nextCategory =
                          SUB_CATEGORIES_BY_MAIN[value]?.[0] ?? "";
                        setEditData({
                          ...editData,
                          mainCategory: value,
                          category: nextCategory,
                        });
                      }}
                    >
                      <SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}>
                        <SelectValue placeholder="Ангилал сонгох" />
                      </SelectTrigger>
                      <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                        {mainCategoryOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className={FIELD_BOX_CLASS}>{mainCategoryLabel}</div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className={FIELD_LABEL_CLASS}>Дэд ангилал</Label>
                  {isEditing ? (
                    <Select
                      value={editData.category}
                      onValueChange={(value) =>
                        setEditData({ ...editData, category: value })
                      }
                      disabled={subCategoryOptions.length === 0}
                    >
                      <SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}>
                        <SelectValue placeholder="Дэд ангилал сонгох" />
                      </SelectTrigger>
                      <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                        {subCategoryOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {CATEGORY_LABELS[option] ?? option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className={FIELD_BOX_CLASS}>{subCategoryLabel}</div>
                  )}
                </div>

                {resolvedStatus !== "FOR_SALE" ? (
                  <div className="space-y-1.5">
                    <Label className={FIELD_LABEL_CLASS}>
                      Худалдаж авсан үнэ
                    </Label>
                    {isEditing ? (
                      <div className="relative">
                        <Input
                          value={editData.purchaseCost}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              purchaseCost: formatNumberInput(e.target.value),
                            })
                          }
                          inputMode="numeric"
                          className={cn(
                            FIELD_INPUT_CLASS,
                            "pr-9 font-semibold",
                          )}
                        />
                        <X
                          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-slate-300"
                          onClick={() =>
                            setEditData({ ...editData, purchaseCost: "" })
                          }
                        />
                      </div>
                    ) : (
                      <div className={cn(FIELD_BOX_CLASS, "font-semibold")}>
                        {formatCurrency(asset.purchaseCost)}
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="space-y-1.5">
                  <Label className={FIELD_LABEL_CLASS}>
                    {resolvedStatus === "FOR_SALE" ? "Зарах үнэ" : "Зарах үнэ"}
                  </Label>
                  {isEditing ? (
                    <div className="relative">
                      <Input
                        value={editData.salePrice}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            salePrice: formatNumberInput(e.target.value),
                          })
                        }
                        inputMode="numeric"
                        className={cn(FIELD_INPUT_CLASS, "pr-9 font-semibold")}
                      />
                      <X
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-slate-300"
                        onClick={() =>
                          setEditData({ ...editData, salePrice: "" })
                        }
                      />
                    </div>
                  ) : (
                    <div className={cn(FIELD_BOX_CLASS, "font-semibold")}>
                      {formatCurrency(salePriceValue)}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <Label className={FIELD_LABEL_CLASS}>Тэмдэглэл</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Input
                        value={editData.notes}
                        onChange={(e) =>
                          setEditData({ ...editData, notes: e.target.value })
                        }
                        className={cn(FIELD_INPUT_CLASS, "pr-9")}
                      />
                      <X
                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-slate-300"
                        onClick={() => setEditData({ ...editData, notes: "" })}
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        FIELD_BOX_CLASS,
                        "min-h-[48px] items-start py-3 text-slate-500",
                      )}
                    >
                      {asset.notes || "Тэмдэглэл байхгүй"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-7">
              <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-[106px] w-[106px] items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    {asset.imageUrl ? (
                      <img
                        src={asset.imageUrl}
                        className="h-full w-full object-contain"
                        alt={asset.assetTag || "Asset"}
                      />
                    ) : (
                      <Box className="h-10 w-10 text-slate-300" />
                    )}
                  </div>
                </div>

                {!offboardingConfirmMode ? (
                  <div className="flex min-w-[150px] flex-col items-center gap-2 pt-1">
                    <p className="text-[18px] font-semibold text-slate-500">
                      Эзэмшигч
                    </p>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700">
                      {ownerInitials}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-x-12 gap-y-7 border-b border-slate-200 pb-6 md:grid-cols-2">
                <div className="flex items-center">
                  <p className="min-w-[145px] text-[18px] text-slate-500">
                    Серийн дугаар
                  </p>
                  <p className="text-[17px] font-semibold text-slate-950">
                    {asset.serialNumber || "—"}
                  </p>
                </div>

                {!offboardingConfirmMode ? (
                  <div className="flex items-center">
                    <p className="min-w-[145px] text-[18px] text-slate-500">
                      Ангилал
                    </p>
                    <p className="text-[17px] font-semibold text-black">
                      {mainCategoryLabel}
                    </p>
                  </div>
                ) : null}

                {!offboardingConfirmMode ? (
                  <div className="flex items-center ">
                    <p className="min-w-[145px] text-[18px] text-slate-500">
                      Дэд ангилал
                    </p>
                    <p className="text-[17px] font-semibold text-slate-950">
                      {subCategoryLabel}
                    </p>
                  </div>
                ) : null}

                <div className="flex items-center ">
                  <p className="min-w-[145px] text-[18px] text-slate-500">
                    Авсан үнэ
                  </p>
                  <p className="text-[17px] font-semibold text-slate-950">
                    {formatCurrency(asset.purchaseCost)}
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="min-w-[145px] text-[18px] text-slate-500">
                    Төлөв
                  </p>
                  <div className="flex items-center gap-4">
                    {offboardingConfirmMode ? (
                      <button
                        type="button"
                        onClick={() => setConfirmStatus("AVAILABLE")}
                        className="inline-flex h-10 min-w-[220px] items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-[16px] font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        {confirmStatus === "AVAILABLE"
                          ? "Эзэмшигчгүй"
                          : `${STATUS_LABELS[confirmStatus] ?? confirmStatus} -> Эзэмшигчгүй`}
                      </button>
                    ) : isStatusEditing ? (
                      <Select
                        open={isStatusEditing}
                        onOpenChange={setIsStatusEditing}
                        value={resolvedStatus || "AVAILABLE"}
                        onValueChange={(value) => {
                          void handleStatusQuickSave(value);
                        }}
                      >
                        <SelectContent className="z-90 rounded-xl border border-slate-200 bg-white p-1 shadow-[0_14px_32px_rgba(15,23,42,0.12)]">
                          {Object.entries(STATUS_LABELS).map(([key, label]) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className="rounded-md px-3 py-2 text-[16px] font-semibold text-slate-900"
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <StatusChip status={resolvedStatus} />
                    )}
                    {!offboardingConfirmMode ? (
                      <button
                        type="button"
                        onClick={() => setIsStatusEditing(true)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
                        aria-label="Төлөв засах"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                    ) : null}
                  </div>
                </div>

                {!offboardingConfirmMode ? (
                  <div className="flex items-center ">
                    <p className="min-w-[145px] text-[18px] text-slate-500">
                      Зарах үнэ
                    </p>
                    <p className="text-[17px] font-semibold text-slate-950">
                      {salePriceValue ? formatCurrency(salePriceValue) : "-"}
                    </p>
                  </div>
                ) : null}

                {offboardingConfirmMode ? (
                  <div className="flex items-center">
                    <p className="min-w-[145px] text-[18px] text-slate-500">
                      Байршил
                    </p>
                    <div className="w-full max-w-[260px]">
                      <Select
                        value={confirmLocationId || undefined}
                        onValueChange={setConfirmLocationId}
                      >
                        <SelectTrigger className="h-10 rounded-lg border-slate-200">
                          <SelectValue placeholder="Байршил сонгох" />
                        </SelectTrigger>
                        <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                          {locationOptions.map((loc) => (
                            <SelectItem key={loc.id} value={loc.id}>
                              {loc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : null}

                {offboardingConfirmMode ? (
                  <div className="flex items-center">
                    <p className="min-w-[145px] text-[18px] text-slate-500">
                      Хэнд явуулах
                    </p>
                    <div className="w-full max-w-[260px]">
                      <Select
                        value={confirmSendTo}
                        onValueChange={(value) =>
                          setConfirmSendTo(value as "HR" | "IT" | "Agniruu")
                        }
                      >
                        <SelectTrigger className="h-10 rounded-lg border-slate-200">
                          <SelectValue placeholder="Хэнд явуулах" />
                        </SelectTrigger>
                        <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Agniruu">Agniruu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : null}

                {!offboardingConfirmMode ? (
                  <div className="flex items-start  md:col-span-2">
                    <p className="min-w-[145px] pt-0.5 text-[18px] text-slate-500">
                      Байршил
                    </p>
                    <p className="text-[17px] font-semibold leading-relaxed text-slate-950">
                      {asset.locationPath || "—"}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
                {offboardingConfirmMode ? (
                  <div className="flex w-full justify-end">
                    <Button
                      type="button"
                      disabled={confirming}
                      onClick={handleOffboardingConfirm}
                      className="h-12 rounded-xl bg-[#0b4d78] px-9 text-[18px] text-white hover:bg-[#0a4166]"
                    >
                      {confirming ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
                    </Button>
                  </div>
                ) : asset.assignedTo ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={actionLoading}
                      onClick={handleReturnAsset}
                      className="h-14 rounded-xl border-slate-300 px-8 text-[18px] text-slate-800 hover:bg-slate-50"
                    >
                      {returning ? "Буцааж байна..." : "Хөрөнгө буцаах"}
                    </Button>
                    <Button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => {
                        setTransferToEmployeeId("");
                        setShowTransferDialog(true);
                      }}
                      className="h-14 rounded-xl bg-[#0b4d78] px-9 text-[18px] text-white hover:bg-[#0a4166]"
                    >
                      {transferring ? "Шилжүүлж байна..." : "Хөрөнгө шилжүүлэх"}
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    disabled={actionLoading}
                    onClick={() => {
                      setAssignEmployeeId("");
                      setShowAssignDialog(true);
                    }}
                    className="h-14 rounded-xl bg-[#0b4d78] px-9 text-[18px] text-white hover:bg-[#0a4166]"
                  >
                    {assigning ? "Олгож байна..." : "Хөрөнгө олгох"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {!offboardingConfirmMode ? (
          <TabsContent
            value="history"
            className="m-0 max-h-[420px] overflow-y-auto border-t border-slate-100 bg-white"
          >
            <div className="space-y-4 p-6">
              {historyItems.length ? (
                historyItems.map((h) => {
                  const actorName = h.actor
                    ? `${h.actor.lastName?.[0] ?? ""}.${h.actor.firstName ?? ""}`
                    : "—";
                  const eventLabel =
                    HISTORY_EVENT_LABELS[h.eventType] ?? h.eventType ?? "—";
                  const when = new Date(h.timestamp);
                  const formatted = `${when.toLocaleDateString()} ${when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
                  const isOpen = expandedHistoryId === h.id;
                  return (
                    <div
                      key={h.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4"
                    >
                      <div className="text-[16px] font-semibold text-slate-900">
                        {eventLabel}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-[11px] text-slate-500">
                            {h.actor?.imageUrl ? (
                              <img
                                src={h.actor.imageUrl}
                                alt={actorName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              actorName.slice(0, 1)
                            )}
                          </div>
                          <div className="leading-tight">
                            <div className="text-[15px] font-semibold text-slate-900">
                              {actorName}
                            </div>
                            <div className="text-[13px] text-slate-500">
                              {formatted}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedHistoryId(isOpen ? null : h.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                          aria-label="Дэлгэрэнгүй"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-32 items-center justify-center text-[13px] italic text-slate-300">
                  Түүх олдсонгүй.
                </div>
              )}
            </div>
          </TabsContent>
        ) : null}
      </Tabs>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Хөрөнгө олгох</DialogTitle>
            <DialogDescription>
              Хөрөнгийг ямар ажилтанд олгох вэ?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select
              value={assignEmployeeId || undefined}
              onValueChange={setAssignEmployeeId}
            >
              <SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}>
                <SelectValue placeholder="Ажилтан сонгоно уу" />
              </SelectTrigger>
              <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                {employeeOptions.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAssignDialog(false)}>
              Цуцлах
            </Button>
            <Button
              onClick={handleAssignConfirm}
              disabled={!assignEmployeeId || assigning}
            >
              {assigning ? "Олгож байна..." : "Олгох"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Хөрөнгө шилжүүлэх</DialogTitle>
            <DialogDescription>
              Хөрөнгийг ямар ажилтан руу шилжүүлэх вэ?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select
              value={transferToEmployeeId || undefined}
              onValueChange={setTransferToEmployeeId}
            >
              <SelectTrigger className={FIELD_SELECT_TRIGGER_CLASS}>
                <SelectValue placeholder="Ажилтан сонгоно уу" />
              </SelectTrigger>
              <SelectContent className={FIELD_SELECT_CONTENT_CLASS}>
                {employeeOptions
                  .filter((emp) => emp.id !== asset.assignedTo)
                  .map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowTransferDialog(false)}
            >
              Цуцлах
            </Button>
            <Button
              onClick={handleTransferConfirm}
              disabled={!transferToEmployeeId || transferring}
            >
              {transferring ? "Шилжүүлж байна..." : "Шилжүүлэх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
