"use client";

import {
  type ComponentType,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation } from "@apollo/client";
import {
  ArrowRightLeft,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  FileSpreadsheet,
  FileText,
  Search,
  Undo2,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { AssetFormDialog } from "@/components/assets/asset-form-dialog";
import { StatusBadge } from "@/components/assets/filter/StatusBadge";
import {
  AssetTransferDialog,
  type SelectedAsset,
} from "@/components/assets/asset-transfer-dialog";
import { AssignAssetDialog } from "@/components/assets/filter/components/AssignAssetDialog";
import { STATUS_LABELS } from "@/components/assets/filter/constant";
import { useAssetsData } from "@/components/assets/filter/useAssetsData";
import { formatAssetId, formatName } from "@/components/assets/filter/utils";
import { Button } from "@/components/ui/button";
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
import { AssignAssetDocument, RequestDisposalDocument } from "@/gql/graphql";
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

type LocationNode = { name: string; children: Map<string, LocationNode> };

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
}> = [];

function formatMoney(value: number) {
  return new Intl.NumberFormat("mn-MN").format(value);
}

function normalize(value: string | undefined | null) {
  return (value ?? "").trim().toLowerCase();
}

function formatStatusLabel(status: string) {
  const key = (status ?? "").toUpperCase().replace(/-/g, "_");
  return (
    STATUS_LABELS[key as keyof typeof STATUS_LABELS]?.label ?? status ?? "—"
  );
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

function HoverValue({ value }: { value: string }) {
  if (!value) {
    return <span className="block truncate">—</span>;
  }

  return (
    <>
      <span className="block truncate">{value}</span>
      <div className="pointer-events-none absolute left-0 top-full z-50 mt-1 hidden max-w-72 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-lg group-hover:block">
        {value}
      </div>
    </>
  );
}

function buildLocationTree(items: Asset[]) {
  const root = new Map<string, LocationNode>();

  items
    .map((asset) => asset.location)
    .filter(Boolean)
    .forEach((location) => {
      const parts = (location as string)
        .split("/")
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts.length === 0) return;

      let current = root;
      parts.forEach((part) => {
        if (!current.has(part)) {
          current.set(part, { name: part, children: new Map() });
        }
        current = current.get(part)!.children;
      });
    });

  return root;
}

function getUniqueOptions(values: Array<string | undefined | null>) {
  return [
    ...new Set(values.filter((value): value is string => Boolean(value))),
  ];
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
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [expandedLocations, setExpandedLocations] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const handleHeaderClick = (key: string) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  const [assignAssetMutation] = useMutation(AssignAssetDocument);
  const [requestDisposalMutation, { loading: requestingDisposal }] =
    useMutation(RequestDisposalDocument);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (openFilter !== "location") {
      setExpandedLocations([]);
    }
  }, [openFilter]);

  const tabAssets = useMemo(() => {
    return assets.filter((asset) => {
      if (activeTab === "assign") return asset.status === "AVAILABLE";
      if (activeTab === "transfer") return asset.status === "ASSIGNED";
      if (activeTab === "return") {
        return ["ASSIGNED", "PENDING_DISPOSAL", "DISPOSED"].includes(
          asset.status,
        );
      }
      return true;
    });
  }, [activeTab, assets]);

  const categoryOptions = useMemo(
    () => getUniqueOptions(tabAssets.map((asset) => asset.mainCategory)),
    [tabAssets],
  );

  const subCategoryOptions = useMemo(
    () => getUniqueOptions(tabAssets.map((asset) => asset.category)),
    [tabAssets],
  );

  const statusOptions = useMemo(
    () => getUniqueOptions(tabAssets.map((asset) => asset.status)),
    [tabAssets],
  );

  const locationTree = useMemo(() => buildLocationTree(tabAssets), [tabAssets]);

  const filteredAssets = useMemo(() => {
    return tabAssets.filter((asset) => {
      const location = asset.location ?? "";
      const locationMatch =
        !filters.location ||
        location === filters.location ||
        location.startsWith(`${filters.location} /`);

      return (
        normalize(asset.assetId).includes(normalize(filters.assetId)) &&
        normalize(asset.category).includes(normalize(filters.assetName)) &&
        (!filters.category || asset.mainCategory === filters.category) &&
        (!filters.subCategory || asset.category === filters.subCategory) &&
        (!filters.status || asset.status === filters.status) &&
        locationMatch &&
        normalize(asset.assignedEmployeeName).includes(normalize(filters.owner))
      );
    });
  }, [filters, tabAssets]);

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

  const visibleSelectedCount = rows.filter((row) =>
    selectedIds.has(row.id),
  ).length;
  const allSelected = rows.length > 0 && visibleSelectedCount === rows.length;
  const someSelected = visibleSelectedCount > 0 && !allSelected;

  useEffect(() => {
    const el = selectAllRef.current;
    if (el) el.indeterminate = someSelected;
  }, [someSelected]);

  const isLocationSelected = (path: string) =>
    filters.location === path || filters.location.startsWith(`${path} /`);

  const isExpanded = (path: string) => expandedLocations.includes(path);

  const toggleExpanded = (path: string) => {
    setExpandedLocations((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  const renderLocationNode = (
    current: LocationNode,
    parentPath: string,
    depth: number,
  ) => {
    const path = parentPath ? `${parentPath} / ${current.name}` : current.name;
    const hasChildren = current.children.size > 0;
    const expanded = isExpanded(path);

    return (
      <div key={path} className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className={`flex-1 rounded py-1 text-left ${
              isLocationSelected(path)
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-100"
            }`}
            style={{ paddingLeft: 8 + depth * 12, paddingRight: 8 }}
            onClick={() => {
              setFilters((prev) => ({ ...prev, location: path }));
              setOpenFilter(null);
            }}
          >
            {current.name}
          </button>
          {hasChildren ? (
            <button
              type="button"
              className="rounded p-1 hover:bg-gray-100"
              onClick={() => toggleExpanded(path)}
            >
              {expanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          ) : null}
        </div>

        {hasChildren && expanded ? (
          <div className="mt-1 flex flex-col gap-1">
            {Array.from(current.children.values()).map((child) =>
              renderLocationNode(child, path, depth + 1),
            )}
          </div>
        ) : null}
      </div>
    );
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
        formatStatusLabel(row.status),
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
            <h1 className="text-[25px] font-bold tracking-[-0.03em] text-[#111827]">
              Тайлан
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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

        <div className="overflow-hidden rounded-2xl border border-[#d9e4ee] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          <div
            className="rounded-md font-inter h-full overflow-auto"
            onClick={() => setOpenFilter(null)}
          >
            <Table className="table-fixed w-full border-separate  border-spacing-y-2">
              <TableHeader>
                <TableRow className="bg-[#0f4c6e] text-white hover:bg-[#0f4c6e]!">
                  <TableHead className="w-10 text-white">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      className="h-4 w-4 rounded border-white"
                    />
                  </TableHead>
                  <TableHead className="w-10 text-white">№</TableHead>

                  <TableHead className="truncate text-white min-w-[140px]">
                    <div
                      className="flex items-center justify-between gap-2 cursor-pointer select-none group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeaderClick("assetId");
                      }}
                    >
                      {openFilter === "assetId" ? (
                        <div
                          className="relative w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            autoFocus
                            placeholder="ID-аар хайх.."
                            value={filters.assetId}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                assetId: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setOpenFilter(null);
                              }
                            }}
                            className="w-full rounded border border-blue-500 bg-white py-1 pl-2 pr-8 text-sm text-black outline-none shadow-sm"
                          />
                          <Search className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`truncate ${filters.assetId ? "font-bold text-white" : "text-white"}`}
                          >
                            {filters.assetId || "Хөрөнгийн ID"}
                          </span>
                          <div className="flex items-center gap-2">
                            {filters.assetId ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFilters((prev) => ({
                                    ...prev,
                                    assetId: "",
                                  }));
                                }}
                                className="rounded-full p-1 transition-colors hover:bg-white/20"
                              >
                                <X className="h-3 w-3 text-white" />
                              </button>
                            ) : (
                              <Search className="h-3 w-3 text-white/70 group-hover:text-white" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableHead>

                  <TableHead className="text-white relative min-w-[150px]">
                    <div
                      className="flex items-center justify-between gap-2 cursor-pointer select-none group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeaderClick("assetName");
                      }}
                    >
                      {openFilter === "assetName" ? (
                        <div
                          className="relative w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            autoFocus
                            placeholder="Нэрээр хайх.."
                            value={filters.assetName}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                assetName: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setOpenFilter(null);
                              }
                            }}
                            className="w-full rounded border border-blue-500 bg-white py-1 pl-2 pr-8 text-sm text-black outline-none shadow-sm"
                          />
                          <Search className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`truncate ${filters.assetName ? "font-bold text-white" : "text-white"}`}
                          >
                            {filters.assetName || "Хөрөнгийн нэр"}
                          </span>
                          <div className="flex items-center gap-2">
                            {filters.assetName ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFilters((prev) => ({
                                    ...prev,
                                    assetName: "",
                                  }));
                                }}
                                className="rounded-full p-1 transition-colors hover:bg-white/20"
                              >
                                <X className="h-3 w-3 text-white" />
                              </button>
                            ) : (
                              <Search className="h-3 w-3 text-white/70 group-hover:text-white" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableHead>

                  <TableHead className="text-white relative">
                    <div
                      className="flex items-center gap-1 cursor-pointer select-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeaderClick("category");
                      }}
                    >
                      <span className="truncate">Ангилал</span>
                      <ChevronsUpDown className="h-3 w-3" />
                    </div>

                    {openFilter === "category" && (
                      <div
                        ref={filterRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-0 top-full z-[9999] mt-1 w-44 rounded bg-white p-2 shadow"
                      >
                        <div className="flex flex-col gap-1 text-xs text-black">
                          <button
                            type="button"
                            className={`rounded px-2 py-1 text-left ${
                              filters.category === ""
                                ? "bg-gray-200 text-black"
                                : "hover:bg-gray-300"
                            }`}
                            onClick={() => {
                              setFilters((prev) => ({ ...prev, category: "" }));
                              setOpenFilter(null);
                            }}
                          >
                            Бүгд
                          </button>
                          {categoryOptions.map((category) => (
                            <button
                              key={category}
                              type="button"
                              className={`rounded px-2 py-1 text-left ${
                                filters.category === category
                                  ? "bg-gray-200 text-black"
                                  : "hover:bg-gray-300"
                              }`}
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  category,
                                }));
                                setOpenFilter(null);
                              }}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </TableHead>

                  <TableHead className="text-white relative">
                    <div
                      className="flex items-center gap-1 cursor-pointer select-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeaderClick("subCategory");
                      }}
                    >
                      <span className="truncate">Дэд ангилал</span>
                      <ChevronsUpDown className="h-3 w-3" />
                    </div>

                    {openFilter === "subCategory" && (
                      <div
                        ref={filterRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-0 top-full z-[9999] mt-1 w-44 rounded bg-white p-2 shadow"
                      >
                        <div className="flex flex-col gap-1 text-xs text-black">
                          <button
                            type="button"
                            className={`rounded px-2 py-1 text-left ${
                              filters.subCategory === ""
                                ? "bg-gray-200 text-black"
                                : "hover:bg-gray-300"
                            }`}
                            onClick={() => {
                              setFilters((prev) => ({
                                ...prev,
                                subCategory: "",
                              }));
                              setOpenFilter(null);
                            }}
                          >
                            Бүгд
                          </button>
                          {subCategoryOptions.map((subCategory) => (
                            <button
                              key={subCategory}
                              type="button"
                              className={`rounded px-2 py-1 text-left ${
                                filters.subCategory === subCategory
                                  ? "bg-gray-200 text-black"
                                  : "hover:bg-gray-300"
                              }`}
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  subCategory,
                                }));
                                setOpenFilter(null);
                              }}
                            >
                              {subCategory}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </TableHead>

                  <TableHead className="text-white relative">
                    <div
                      className="flex items-center gap-1 cursor-pointer select-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeaderClick("status");
                      }}
                    >
                      <span>Төлөв</span>
                      <ChevronsUpDown className="h-3 w-3" />
                    </div>

                    {openFilter === "status" && (
                      <div
                        ref={filterRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-0 top-full z-[9999] mt-1 w-44 rounded bg-white p-2 shadow"
                      >
                        <div className="flex flex-col gap-1 text-xs text-black">
                          <button
                            type="button"
                            className={`rounded px-2 py-1 text-left ${
                              filters.status === ""
                                ? "bg-gray-200 text-black"
                                : "hover:bg-gray-300"
                            }`}
                            onClick={() => {
                              setFilters((prev) => ({ ...prev, status: "" }));
                              setOpenFilter(null);
                            }}
                          >
                            Бүгд
                          </button>
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              type="button"
                              className={`rounded px-2 py-1 text-left ${
                                filters.status === status
                                  ? "bg-gray-200 text-black"
                                  : "hover:bg-gray-300"
                              }`}
                              onClick={() => {
                                setFilters((prev) => ({
                                  ...prev,
                                  status,
                                }));
                                setOpenFilter(null);
                              }}
                            >
                              {formatStatusLabel(status)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </TableHead>

                  <TableHead className="text-white relative">
                    <div
                      className="flex items-center gap-1 cursor-pointer select-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeaderClick("location");
                      }}
                    >
                      <span className="truncate">Байршил</span>
                      <ChevronsUpDown className="h-3 w-3" />
                    </div>

                    {openFilter === "location" && (
                      <div
                        ref={filterRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-0 top-full z-[9999] mt-1 w-64 rounded bg-white p-2 shadow"
                      >
                        <div className="max-h-64 overflow-auto flex flex-col gap-1 text-xs text-black">
                          <button
                            type="button"
                            className={`rounded px-2 py-1 text-left ${
                              filters.location === ""
                                ? "bg-gray-200 text-black"
                                : "hover:bg-gray-300"
                            }`}
                            onClick={() => {
                              setFilters((prev) => ({ ...prev, location: "" }));
                              setOpenFilter(null);
                            }}
                          >
                            Бүгд
                          </button>
                          {Array.from(locationTree.values()).map((node) =>
                            renderLocationNode(node, "", 0),
                          )}
                        </div>
                      </div>
                    )}
                  </TableHead>

                  <TableHead className="text-white relative min-w-[150px]">
                    <div
                      className="flex items-center justify-between gap-2 cursor-pointer select-none group px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeaderClick("owner");
                      }}
                    >
                      {openFilter === "owner" ? (
                        <div
                          className="relative w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            autoFocus
                            placeholder="Эзэмшигч хайх.."
                            value={filters.owner}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                owner: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setOpenFilter(null);
                              }
                            }}
                            className="w-full rounded border border-blue-500 bg-white py-1 pl-2 pr-8 text-sm font-normal text-black outline-none shadow-sm"
                          />
                          <Search className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`truncate text-sm ${filters.owner ? "font-bold text-white" : "text-white"}`}
                          >
                            {filters.owner || "Эзэмшигч"}
                          </span>
                          <div className="flex items-center gap-2">
                            {filters.owner ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFilters((prev) => ({
                                    ...prev,
                                    owner: "",
                                  }));
                                }}
                                className="rounded-full p-1 transition-colors hover:bg-white/20"
                              >
                                <X className="h-3 w-3 text-white" />
                              </button>
                            ) : (
                              <Search className="h-3 w-3 text-white/70 transition-opacity group-hover:text-white" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableHead>

                  <TableHead className="text-white text-center">Үнэ</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <ReportTableSkeleton />
                ) : rows.length === 0 ? (
                  <TableRow className="bg-white">
                    <TableCell
                      colSpan={10}
                      className="py-8 text-center text-sm text-muted-foreground"
                    >
                      Утга олдсонгүй.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      className="bg-white shadow-sm hover:bg-gray-50"
                    >
                      <TableCell className="py-2 rounded-l-md">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(row.id)}
                          onChange={(e) => toggleRow(row.id, e.target.checked)}
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell className="py-2 font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="py-2 w-27">
                        <span
                          className="block truncate text-sm font-medium text-black"
                          title={row.assetId}
                        >
                          {formatAssetId(row.assetId)}
                        </span>
                      </TableCell>
                      <TableCell className="group relative py-2 max-w-40">
                        <HoverValue value={row.assetName} />
                      </TableCell>
                      <TableCell className="group relative py-2 max-w-35">
                        <HoverValue value={row.category} />
                      </TableCell>
                      <TableCell className="group relative py-2 max-w-35">
                        <HoverValue value={row.subCategory} />
                      </TableCell>
                      <TableCell className="py-2">
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell className="group relative py-2 max-w-40">
                        <HoverValue value={row.location} />
                      </TableCell>
                      <TableCell className="group relative py-2 max-w-35 text-left pl-6">
                        <HoverValue value={formatName(row.owner)} />
                      </TableCell>
                      <TableCell className="py-2 text-center font-medium tabular-nums">
                        {row.amount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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
