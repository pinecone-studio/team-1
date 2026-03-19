"use client";

import { type ComponentType, useMemo, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ArrowRightLeft,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  Filter,
  PackagePlus,
  Undo2,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import { AssetFormDialog } from "@/components/assets/asset-form-dialog";
import {
  AssetTransferDialog,
  type SelectedAsset,
} from "@/components/assets/asset-transfer-dialog";
import { AssignAssetDialog } from "@/components/assets/filter/components/AssignAssetDialog";
import { useAssetsData } from "@/components/assets/filter/useAssetsData";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AssignAssetDocument,
  RequestDisposalDocument,
} from "@/gql/graphql";
import type { Asset } from "@/lib/types";

type ReportTab = "all" | "assign" | "transfer" | "return";

type ReportRow = {
  id: string;
  assetId: string;
  assetName: string;
  category: string;
  subCategory: string;
  status: string;
  location: string;
  owner: string;
  amount: string;
};

type FilterState = {
  assetId: string;
  assetName: string;
  category: string;
  subCategory: string;
  status: string;
  location: string;
  owner: string;
};

const INITIAL_FILTERS: FilterState = {
  assetId: "",
  assetName: "",
  category: "",
  subCategory: "",
  status: "",
  location: "",
  owner: "",
};

const REPORT_TABS: Array<{
  key: ReportTab;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { key: "all", label: "Нийт хөрөнгө", icon: FileText },
  { key: "assign", label: "Хөрөнгө олгох", icon: UserPlus },
  { key: "transfer", label: "Хөрөнгө шилжүүлэх", icon: ArrowRightLeft },
  { key: "return", label: "Хөрөнгө буцаах", icon: Undo2 },
];

const ACTION_CONFIG: Record<
  ReportTab,
  {
    label: string;
    icon: ComponentType<{ className?: string }>;
    dialog?: "assign" | "transfer" | "return";
  }
> = {
  all: { label: "Нийт хөрөнгө", icon: FileText },
  assign: { label: "Хөрөнгө олгох", icon: UserPlus, dialog: "assign" },
  transfer: {
    label: "Хөрөнгө шилжүүлэх",
    icon: ArrowRightLeft,
    dialog: "transfer",
  },
  return: { label: "Хөрөнгө буцаах", icon: Undo2, dialog: "return" },
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("mn-MN").format(value);
}

function normalize(value: string | undefined | null) {
  return (value ?? "").trim().toLowerCase();
}

function formatStatus(status: string) {
  switch (status) {
    case "ASSIGNED":
      return {
        label: "Эзэмшигчтэй",
        className: "border-[#8ac3f3] bg-[#eef7ff] text-[#1967a4]",
      };
    case "AVAILABLE":
      return {
        label: "Эзэмшигчгүй",
        className: "border-[#9ed4aa] bg-[#eefcf0] text-[#2a8d3d]",
      };
    case "IN_REPAIR":
      return {
        label: "Эвдрэлтэй",
        className: "border-[#f0a7a7] bg-[#fff1f1] text-[#da3e3e]",
      };
    case "PENDING_DISPOSAL":
    case "DISPOSED":
      return {
        label: "Зарах болох",
        className: "border-[#f0cf7d] bg-[#fff8e7] text-[#cc8a00]",
      };
    default:
      return {
        label: status || "Тодорхойгүй",
        className: "border-[#d9d9d9] bg-[#f7f7f7] text-[#6b7280]",
      };
  }
}

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function ReportTableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index} className="border-b border-[#edf2f7] bg-white">
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-4 rounded-sm bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-6 bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-28 bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-28 bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-32 bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-24 bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-6 w-20 rounded-full bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-24 bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="h-4 w-24 bg-[#e9eef3]" />
      </TableCell>
      <TableCell className="px-4 py-4">
        <Skeleton className="ml-auto h-4 w-20 bg-[#e9eef3]" />
      </TableCell>
    </TableRow>
  ));
}

function HeaderFilter({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-white"
        >
          <Filter className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 rounded-2xl p-4">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-[#111827]">{label}</div>
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="h-10"
          />
          <Button
            type="button"
            variant="outline"
            className="h-9 w-full"
            onClick={() => onChange("")}
          >
            Цэвэрлэх
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ReportContent() {
  const { assets, loading, refetch, employeeNameById } = useAssetsData("");
  const [activeTab, setActiveTab] = useState<ReportTab>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [assignEmployeeId, setAssignEmployeeId] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [assigning, setAssigning] = useState(false);

  const [assignAssetMutation] = useMutation(AssignAssetDocument);
  const [requestDisposalMutation, { loading: requestingDisposal }] =
    useMutation(RequestDisposalDocument);

  const filteredAssets = useMemo(() => {
    const byTab = assets.filter((asset) => {
      if (activeTab === "assign") return asset.status === "AVAILABLE";
      if (activeTab === "transfer") return asset.status === "ASSIGNED";
      if (activeTab === "return") {
        return ["ASSIGNED", "PENDING_DISPOSAL", "DISPOSED"].includes(
          asset.status,
        );
      }
      return true;
    });

    return byTab.filter((asset) => {
      const statusLabel = formatStatus(asset.status).label;
      return (
        normalize(asset.assetId).includes(normalize(filters.assetId)) &&
        normalize(asset.category).includes(normalize(filters.assetName)) &&
        normalize(asset.mainCategory).includes(normalize(filters.category)) &&
        normalize(asset.category).includes(normalize(filters.subCategory)) &&
        normalize(asset.location).includes(normalize(filters.location)) &&
        normalize(asset.assignedEmployeeName).includes(normalize(filters.owner)) &&
        normalize(statusLabel).includes(normalize(filters.status))
      );
    });
  }, [activeTab, assets, filters]);

  const rows = useMemo<ReportRow[]>(
    () =>
      filteredAssets.map((asset) => ({
        id: asset.id,
        assetId: asset.assetId,
        assetName: asset.category,
        category: asset.mainCategory ?? "IT тоног төхөөрөмж",
        subCategory: asset.category,
        status: asset.status,
        location: asset.location ?? "Тодорхойгүй",
        owner: asset.assignedEmployeeName ?? "Админ хэрэглэгч",
        amount: formatMoney(asset.currentBookValue ?? asset.purchaseCost ?? 0),
      })),
    [filteredAssets],
  );

  const selectedAssets = useMemo(
    () => assets.filter((asset) => selectedIds.has(asset.id)),
    [assets, selectedIds],
  );

  const selectedTransferAssets = useMemo<SelectedAsset[]>(
    () =>
      selectedAssets.map((asset) => ({
        id: asset.id,
        assetTag: asset.assetId,
      })),
    [selectedAssets],
  );

  const allSelected =
    rows.length > 0 && rows.every((row) => selectedIds.has(row.id));
  const activeActionConfig = ACTION_CONFIG[activeTab];

  const openAction = (
    tab: ReportTab,
    dialog: "assign" | "transfer" | "return",
  ) => {
    setActiveTab(tab);

    if (selectedIds.size === 0) {
      toast.info("Эхлээд хүснэгтээс хөрөнгө сонгоно уу.");
      return;
    }

    if (dialog === "assign") {
      setShowAssignDialog(true);
      return;
    }

    if (dialog === "transfer") {
      setShowTransferDialog(true);
      return;
    }

    setShowReturnDialog(true);
  };

  const handleActionSelect = (tab: ReportTab) => {
    const config = ACTION_CONFIG[tab];

    if (!config.dialog) {
      setActiveTab("all");
      return;
    }

    openAction(tab, config.dialog);
  };

  const toggleSelectAll = (checked: boolean) => {
    if (!checked) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(new Set(rows.map((row) => row.id)));
  };

  const toggleRow = (rowId: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(rowId);
      else next.delete(rowId);
      return next;
    });
  };

  const exportRows = (type: "excel" | "pdf" | "word") => {
    const exportTarget =
      selectedIds.size > 0
        ? rows.filter((row) => selectedIds.has(row.id))
        : rows;

    const header = [
      "№",
      "Хөрөнгийн ID",
      "Хөрөнгийн нэр",
      "Ангилал",
      "Дэд ангилал",
      "Төлөв",
      "Байршил",
      "Эзэмшигч",
      "Үнэ",
    ];

    const lines = exportTarget.map((row, index) =>
      [
        index + 1,
        row.assetId,
        row.assetName,
        row.category,
        row.subCategory,
        formatStatus(row.status).label,
        row.location,
        row.owner,
        row.amount,
      ].join(","),
    );

    const csv = [header.join(","), ...lines].join("\n");

    if (type === "excel") {
      downloadFile("asset-report.csv", csv, "text/csv;charset=utf-8;");
      return;
    }

    if (type === "pdf") {
      downloadFile(
        "asset-report.txt",
        [header.join(" | "), ...lines].join("\n"),
        "text/plain;charset=utf-8;",
      );
      return;
    }

    downloadFile(
      "asset-report.doc",
      [header.join("\t"), ...lines].join("\n"),
      "application/msword",
    );
  };

  const handleAssignSubmit = async () => {
    if (!assignEmployeeId || selectedAssets.length === 0) {
      toast.error("Хөрөнгө болон ажилтан сонгоно уу.");
      return;
    }

    const toastId = toast.loading("Хөрөнгө олголт илгээж байна...");

    try {
      setAssigning(true);
      for (const asset of selectedAssets) {
        await assignAssetMutation({
          variables: {
            assetId: asset.id,
            employeeId: assignEmployeeId,
            conditionAtAssign: "GOOD",
          },
        });
      }

      toast.success(`${selectedAssets.length} хөрөнгө амжилттай олголоо.`, {
        id: toastId,
      });
      setAssignEmployeeId("");
      setShowAssignDialog(false);
      setSelectedIds(new Set());
      await refetch();
    } catch {
      toast.error("Хөрөнгө олгох үед алдаа гарлаа.", { id: toastId });
    } finally {
      setAssigning(false);
    }
  };

  const handleReturnSubmit = async () => {
    if (selectedAssets.length === 0) {
      toast.error("Буцаах хөрөнгө сонгоно уу.");
      return;
    }

    const toastId = toast.loading("Буцаах хүсэлт илгээж байна...");

    try {
      for (const asset of selectedAssets) {
        const requestedBy =
          asset.assignedEmployeeId ??
          Array.from(employeeNameById.keys())[0] ??
          "";

        if (!requestedBy) {
          throw new Error("Missing requester");
        }

        await requestDisposalMutation({
          variables: {
            assetId: asset.id,
            requestedBy,
            method: "RECYCLE",
            reason: returnReason.trim() || undefined,
          },
        });
      }

      toast.success(
        `${selectedAssets.length} хөрөнгийн буцаах хүсэлт амжилттай илгээгдлээ.`,
        { id: toastId },
      );
      setReturnReason("");
      setShowReturnDialog(false);
      setSelectedIds(new Set());
      await refetch();
    } catch {
      toast.error("Буцаах хүсэлт илгээх үед алдаа гарлаа.", { id: toastId });
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[#f8fafc] p-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-2">
            <h1 className="text-[38px] font-bold tracking-[-0.03em] text-[#111827]">
              Эд хөрөнгө / Нийт хөрөнгө
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="h-11 gap-2 rounded-xl bg-[#0d5f8f] px-5 text-[15px] font-medium text-white hover:bg-[#0a5179]"
              onClick={() => setShowAddDialog(true)}
            >
              <PackagePlus className="h-4 w-4" />
              Хөрөнгө нэмэх
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 gap-2 rounded-xl border-[#cfd8e3] bg-white px-5 text-[15px] font-medium text-[#111827] hover:bg-[#f8fafc]"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Экспортлох
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 rounded-xl border border-[#e2e8f0] bg-white p-1"
              >
                <DropdownMenuItem onClick={() => exportRows("excel")}>
                  MS-Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportRows("pdf")}>
                  PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportRows("word")}>
                  MS-World
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-11 gap-2 rounded-xl bg-[#0d5f8f] px-5 text-[15px] font-medium text-white hover:bg-[#0a5179]">
                <activeActionConfig.icon className="h-4 w-4" />
                {activeActionConfig.label}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-52 rounded-xl border border-[#e2e8f0] bg-white p-1"
            >
              {REPORT_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <DropdownMenuItem
                    key={tab.key}
                    onClick={() => handleActionSelect(tab.key)}
                    className="gap-2 rounded-lg px-3 py-2"
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        <div className="flex flex-wrap items-center gap-6 border-b border-[#dbe3ec] pb-4">
          {REPORT_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "inline-flex items-center gap-2 border-b-2 pb-3 text-[17px] transition-colors",
                  isActive
                    ? "border-[#111827] font-semibold text-[#111827]"
                    : "border-transparent text-[#374151] hover:text-[#111827]",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#d9e4ee] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          {/* <div className="flex items-center justify-between border-b border-[#edf2f7] px-4 py-3">
            <div className="text-sm font-medium text-[#334155]">
              {selectedIds.size > 0
                ? `${selectedIds.size} хөрөнгө сонгогдсон`
                : `${rows.length} мөр харагдаж байна`}
            </div>
            <Button
              type="button"
              variant="ghost"
              className="h-auto px-0 py-0 text-sm text-[#64748b] hover:bg-transparent"
              onClick={() => setFilters(INITIAL_FILTERS)}
            >
              Шүүлтүүр цэвэрлэх
            </Button>
          </div> */}

          <Table>
            <TableHeader>
              <TableRow className="border-0 bg-[#0d5f8f] hover:bg-[#0d5f8f]">
                <TableHead className="w-12 px-4 py-4 text-white">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(value) => toggleSelectAll(Boolean(value))}
                    className="border-white data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-[#0d5f8f]"
                  />
                </TableHead>
                <TableHead className="w-14 px-4 py-4 text-[14px] font-medium text-white">
                  №
                </TableHead>
                <TableHead className="px-4 py-4 text-[14px] font-medium text-white">
                  <div className="flex items-center gap-2">
                    Хөрөнгийн ID
                    <HeaderFilter
                      label="Хөрөнгийн ID"
                      value={filters.assetId}
                      placeholder="ID-аар хайх"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, assetId: value }))
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="px-4 py-4 text-[14px] font-medium text-white">
                  <div className="flex items-center gap-2">
                    Хөрөнгийн нэр
                    <HeaderFilter
                      label="Хөрөнгийн нэр"
                      value={filters.assetName}
                      placeholder="Нэрээр хайх"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, assetName: value }))
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="px-4 py-4 text-[14px] font-medium text-white">
                  <div className="flex items-center gap-2">
                    Ангилал
                    <HeaderFilter
                      label="Ангилал"
                      value={filters.category}
                      placeholder="Ангиллаар хайх"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, category: value }))
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="px-4 py-4 text-[14px] font-medium text-white">
                  <div className="flex items-center gap-2">
                    Дэд ангилал
                    <HeaderFilter
                      label="Дэд ангилал"
                      value={filters.subCategory}
                      placeholder="Дэд ангиллаар хайх"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, subCategory: value }))
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="px-4 py-4 text-[14px] font-medium text-white">
                  <div className="flex items-center gap-2">
                    Төлөв
                    <HeaderFilter
                      label="Төлөв"
                      value={filters.status}
                      placeholder="Төлвөөр хайх"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, status: value }))
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="px-4 py-4 text-[14px] font-medium text-white">
                  <div className="flex items-center gap-2">
                    Байршил
                    <HeaderFilter
                      label="Байршил"
                      value={filters.location}
                      placeholder="Байршлаар хайх"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, location: value }))
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="px-4 py-4 text-[14px] font-medium text-white">
                  <div className="flex items-center gap-2">
                    Эзэмшигч
                    <HeaderFilter
                      label="Эзэмшигч"
                      value={filters.owner}
                      placeholder="Эзэмшигчээр хайх"
                      onChange={(value) =>
                        setFilters((prev) => ({ ...prev, owner: value }))
                      }
                    />
                  </div>
                </TableHead>
                <TableHead className="px-4 py-4 text-right text-[14px] font-medium text-white">
                  Үнэ
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <ReportTableSkeleton />
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="px-4 py-12 text-center text-[15px] text-[#64748b]"
                  >
                    Харагдах хөрөнгө алга байна.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => {
                  const badge = formatStatus(row.status);
                  return (
                    <TableRow
                      key={row.id}
                      className="border-b border-[#edf2f7] hover:bg-[#f8fbff]"
                    >
                      <TableCell className="px-4 py-4">
                        <Checkbox
                          checked={selectedIds.has(row.id)}
                          onCheckedChange={(value) =>
                            toggleRow(row.id, Boolean(value))
                          }
                        />
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[15px] font-medium text-[#0f172a]">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[15px] font-medium text-[#0f172a]">
                        {row.assetId}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[15px] text-[#0f172a]">
                        {row.assetName}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[15px] text-[#0f172a]">
                        {row.category}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[15px] text-[#0f172a]">
                        {row.subCategory}
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[13px] font-medium ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[15px] text-[#0f172a]">
                        {row.location}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-[15px] text-[#0f172a]">
                        {row.owner}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-right text-[15px] font-medium text-[#0f172a]">
                        {row.amount}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AssetFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddAssets={() => {
          refetch();
          setShowAddDialog(false);
        }}
      />

      <AssignAssetDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        assets={assets}
        selectedIds={selectedIds}
        employeeNameById={employeeNameById}
        assignEmployeeId={assignEmployeeId}
        onAssignEmployeeIdChange={setAssignEmployeeId}
        submitting={assigning}
        onSubmit={handleAssignSubmit}
      />

      <AssetTransferDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
        selectedAssets={selectedTransferAssets}
        onSuccess={() => {
          refetch();
          setSelectedIds(new Set());
        }}
      />

      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Хөрөнгө буцаах</DialogTitle>
            <DialogDescription>
              Сонгосон хөрөнгүүдэд буцаах хүсэлт үүсгэнэ.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3">
              <div className="mb-2 text-sm font-medium text-[#0f172a]">
                Сонгосон хөрөнгө
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedAssets.map((asset: Asset) => (
                  <span
                    key={asset.id}
                    className="rounded-md border border-[#dbe3ec] bg-white px-2.5 py-1 text-sm text-[#0f172a]"
                  >
                    {asset.assetId}
                  </span>
                ))}
              </div>
            </div>

            <Textarea
              value={returnReason}
              onChange={(event) => setReturnReason(event.target.value)}
              placeholder="Буцаах шалтгаан"
              className="min-h-28"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowReturnDialog(false)}
            >
              Цуцлах
            </Button>
            <Button
              type="button"
              onClick={handleReturnSubmit}
              disabled={requestingDisposal}
            >
              Хүсэлт илгээх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
