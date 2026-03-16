"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { Plus, ArrowRightLeft, Undo2, QrCode } from "lucide-react";
import {
  AssignAssetDocument,
  CategoriesDocument,
  EmployeesDocument,
  GetAssetsDocument,
  GetLocationsDocument,
} from "@/gql/graphql";
import type { Asset } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AssetFormDialog } from "./asset-form-dialog";
import { AssetTransferDialog } from "./asset-transfer-dialog";

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      stroke="currentColor"
      strokeWidth="1.16667"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.66708 13.3333C6.66702 13.4572 6.70148 13.5787 6.7666 13.6841C6.83172 13.7895 6.92492 13.8746 7.03574 13.93L8.36908 14.5967C8.47074 14.6475 8.58371 14.6714 8.69724 14.6663C8.81077 14.6612 8.92111 14.6271 9.01776 14.5673C9.11442 14.5075 9.19419 14.424 9.24949 14.3247C9.30479 14.2254 9.3338 14.1137 9.33374 14V9.33333C9.33389 9.00292 9.45672 8.68433 9.67841 8.43933L14.4937 3.11333C14.5801 3.01771 14.6368 2.89912 14.6571 2.77192C14.6775 2.64472 14.6605 2.51435 14.6083 2.39658C14.5562 2.27881 14.471 2.17868 14.3631 2.1083C14.2552 2.03792 14.1292 2.0003 14.0004 2H2.00041C1.87148 2.00005 1.74533 2.03748 1.63724 2.10776C1.52915 2.17804 1.44376 2.27815 1.39141 2.39598C1.33906 2.5138 1.322 2.64427 1.34229 2.77159C1.36259 2.89892 1.41936 3.01762 1.50574 3.11333L6.32241 8.43933C6.5441 8.68433 6.66693 9.00292 6.66708 9.33333V13.3333Z" />
    </svg>
  );
}

const STATUS_LABELS: Record<
  string,
  { label: string; className: string }
> = {
  ASSIGNED: { label: "Эзэмшигчтэй", className: "bg-blue-100 text-blue-800" },
  ASSIGN_REQUESTED: {
    label: "Хүсэлт илгээсэн",
    className: "bg-amber-100 text-amber-800",
  },
  AVAILABLE: { label: "Эзэмшигчгүй", className: "bg-green-100 text-green-800" },
  IN_REPAIR: { label: "Засварт", className: "bg-amber-100 text-amber-800" },
  DAMAGED: { label: "Эвдрэлтэй", className: "bg-red-100 text-red-800" },
  DISPOSAL_REQUESTED: {
    label: "Устгах хүсэлт орсон",
    className: "bg-red-100 text-red-800",
  },
  PENDING_DISPOSAL: {
    label: "Устгах хүлээгдэж буй",
    className: "bg-gray-100 text-gray-800",
  },
  DISPOSED: { label: "Устгасан", className: "bg-gray-100 text-gray-600" },
  FOR_SALE: { label: "Зарж болох", className: "bg-yellow-100 text-yellow-800" },
};

function getStatusBadge(status: string) {
  const upper = (status ?? "").toUpperCase().replace(/-/g, "_");
  const config = STATUS_LABELS[upper] ?? {
    label: status ?? "—",
    className: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

export function AssetFilter() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [qrAssets, setQrAssets] = useState<Asset[]>([]);
  const [assignEmployeeId, setAssignEmployeeId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const selectAllRef = useRef<HTMLInputElement>(null);
  const qrPrintRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, error, refetch } = useQuery(GetAssetsDocument, {
    variables: {
      office: undefined,
      categoryIds: undefined,
      subCategoryIds: undefined,
      locationIds: undefined,
    },
  });
  const { data: categoriesData } = useQuery(CategoriesDocument);
  const { data: employeesData } = useQuery(EmployeesDocument);
  const { data: locationsData } = useQuery(GetLocationsDocument);
  const [assignAssetMutation] = useMutation(AssignAssetDocument);

  const employeeNameById = useMemo(() => {
    const map = new Map<string, string>();
    const employees = (employeesData?.employees ?? []) as Array<{
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    }>;
    employees.forEach((e) => {
      const name =
        [e.firstName, e.lastName].filter(Boolean).join(" ") ||
        e.email ||
        e.id;
      map.set(e.id, name);
    });
    return map;
  }, [employeesData?.employees]);

  const mainCategoryBySubName = useMemo(() => {
    const map = new Map<string, string>();
    (categoriesData?.categories ?? []).forEach((main) => {
      main.subcategories?.forEach((sub) => map.set(sub.name, main.name));
    });
    return map;
  }, [categoriesData?.categories]);

  const locationPathById = useMemo(() => {
    const map = new Map<string, string>();
    const locations = (locationsData?.locations ?? []) as Array<{
      id: string;
      name: string;
      parentId?: string | null;
    }>;
    const byId = new Map(locations.map((l) => [l.id, l]));

    const buildPath = (id: string): string => {
      const cached = map.get(id);
      if (cached) return cached;
      const node = byId.get(id);
      if (!node) return id;
      const parent = node.parentId ? buildPath(node.parentId) : "";
      const path = parent ? `${parent} / ${node.name}` : node.name;
      map.set(id, path);
      return path;
    };
    locations.forEach((l) => buildPath(l.id));
    return map;
  }, [locationsData?.locations]);

  const assets: Asset[] = useMemo(() => {
    if (!data?.assets) return [];
    const mapped = (data.assets as Array<any>).map((a) => {
      const categoryName = typeof a.category === "string" ? a.category : "";
      const rawLocationPath = (a.locationPath ?? "").trim();
      const friendlyLocation =
        rawLocationPath && !/^[0-9a-f-]{20,}$/i.test(rawLocationPath)
          ? rawLocationPath
          : a.locationId
          ? locationPathById.get(a.locationId) ?? undefined
          : undefined;

      return {
        id: a.id,
        assetId: a.assetTag,
        category: categoryName as Asset["category"],
        mainCategory: mainCategoryBySubName.get(categoryName),
        location: friendlyLocation,
        serialNumber: a.serialNumber,
        purchaseCost: a.purchaseCost ?? 0,
        residualValue: 0,
        usefulLife: 0,
        purchaseDate: a.purchaseDate
          ? new Date(a.purchaseDate).toISOString()
          : new Date().toISOString(),
        currentBookValue: a.currentBookValue ?? a.purchaseCost ?? 0,
        status: a.status as Asset["status"],
        assignedEmployeeId: a.assignedTo ?? undefined,
        assignedEmployeeName: a.assignedTo
          ? employeeNameById.get(a.assignedTo)
          : undefined,
        imageUrl: a.imageUrl ?? undefined,
        notes: a.notes ?? undefined,
        createdAt: new Date(a.createdAt).toISOString(),
        updatedAt: new Date(a.updatedAt).toISOString(),
      } as Asset;
    });
    return mapped.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [data?.assets, mainCategoryBySubName, employeeNameById, locationPathById]);

  const visibleAssets = useMemo(() => {
    if (!statusFilter || statusFilter === "all") return assets;
    const target = statusFilter.toUpperCase();
    return assets.filter((a) => {
      const s = (a.status ?? "").toUpperCase().replace(/-/g, "_");
      return s === target;
    });
  }, [assets, statusFilter]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === visibleAssets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(visibleAssets.map((a) => a.id)));
    }
  };

  const allSelected =
    visibleAssets.length > 0 && selectedIds.size === visibleAssets.length;
  const someSelected = selectedIds.size > 0;

  useEffect(() => {
    const el = selectAllRef.current;
    if (el) el.indeterminate = someSelected && !allSelected;
  }, [someSelected, allSelected]);

  const openQrForSelected = () => {
    if (selectedIds.size === 0) {
      toast.error("Та эхлээд QR гаргах хөрөнгөө сонгоно уу.");
      return;
    }
    const list = visibleAssets.filter((a) => selectedIds.has(a.id));
    if (list.length === 0) {
      toast.error("Сонгосон хөрөнгө олдсонгүй. Дахин оролдоно уу.");
      return;
    }
    setQrAssets(list);
    setShowQrDialog(true);
  };

  const openQrForSingle = (asset: Asset) => {
    setQrAssets([asset]);
    setShowQrDialog(true);
  };

  const handleAssignSubmit = async () => {
    if (!assignEmployeeId || selectedIds.size === 0) return;
    setAssigning(true);
    const toastId = toast.loading("Хуваарилах хүсэлт илгээж байна...");
    try {
      const targets = visibleAssets.filter((a) => selectedIds.has(a.id));
      for (const asset of targets) {
        await assignAssetMutation({
          variables: {
            assetId: asset.id,
            employeeId: assignEmployeeId,
            conditionAtAssign: "GOOD",
          },
        });
      }
      toast.success(
        `${targets.length} хөрөнгө амжилттай хуваарилах хүсэлт илгээгдлээ.`,
        { id: toastId },
      );
      setShowAssignDialog(false);
      setAssignEmployeeId("");
      setSelectedIds(new Set());
      refetch();
    } catch {
      toast.error("Хуваарилах хүсэлт илгээхэд алдаа гарлаа.", {
        id: toastId,
      });
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Эд хөрөнгө / Нийт хөрөнгө
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="default"
          className="gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Хөрөнгө нэмэх
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setShowTransferDialog(true)}
        >
          <ArrowRightLeft className="h-4 w-4" />
          Хөрөнгө шилжүүлэх
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            if (selectedIds.size === 0) {
              toast.error("Эхлээд хуваарилах хөрөнгөө сонгоно уу.");
              return;
            }
            setShowAssignDialog(true);
          }}
        >
          <ArrowRightLeft className="h-4 w-4" />
          Хөрөнгө хуваарилах
        </Button>
        <Button variant="outline" className="gap-2" onClick={openQrForSelected}>
          <QrCode className="h-4 w-4" />
          Сонгосон хөрөнгийн QR (A4)
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/?title=Хөрөнгө буцаах">
            <Undo2 className="h-4 w-4" />
            Хөрөнгө буцаах
          </Link>
        </Button>
      </div>

      <AssetFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddAssets={() => {
          refetch();
        }}
      />

      <AssetTransferDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
        selectedAssets={visibleAssets
          .filter((a) => selectedIds.has(a.id))
          .map((a) => ({ id: a.id, assetTag: a.assetId }))}
        onRemoveAsset={(id) =>
          setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          })
        }
        onSuccess={() => {
          refetch();
          setSelectedIds(new Set());
        }}
      />

      {/* Хуваарилах (Assign) modal */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Хөрөнгө хуваарилах</DialogTitle>
            <DialogDescription>
              Сонгосон хөрөнгийг ажилтанд хуваарилах хүсэлт илгээнэ.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm font-medium text-foreground">
                Сонгогдсон хөрөнгө
              </p>
              <div className="mt-2 flex flex-wrap gap-2 rounded-md border border-input bg-muted/30 p-2 min-h-[52px]">
                {Array.from(selectedIds).length === 0 ? (
                  <span className="text-sm text-muted-foreground py-1">
                    Хөрөнгө сонгоогүй байна. Хүснэгтээс сонгоно уу.
                  </span>
                ) : (
                  visibleAssets
                    .filter((a) => selectedIds.has(a.id))
                    .map((asset) => (
                      <span
                        key={asset.id}
                        className="inline-flex items-center gap-1 rounded-md bg-background px-2 py-1 text-sm border border-border"
                      >
                        {asset.assetId}
                      </span>
                    ))
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                Ажилтан сонгох
              </p>
              <Select
                value={assignEmployeeId || undefined}
                onValueChange={setAssignEmployeeId}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(employeeNameById.entries()).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAssignDialog(false)}
            >
              Цуцлах
            </Button>
            <Button
              type="button"
              disabled={
                assigning ||
                !assignEmployeeId ||
                Array.from(selectedIds).length === 0
              }
              onClick={handleAssignSubmit}
            >
              {assigning ? "Илгээж байна..." : "Хүсэлт илгээх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assets table */}
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-0 bg-sky-800 hover:bg-sky-800">
              <TableHead className="w-12 font-medium border-0 text-white">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={selectAll}
                    className="h-4 w-4 rounded border-2 border-white bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-2"
                  />
                </label>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <span className="flex items-center gap-1">
                  № <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <span className="flex items-center gap-1">
                  Хөрөнгийн ID <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <span className="flex items-center gap-1">
                  Хөрөнгийн нэр <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <span className="flex items-center gap-1">
                  Ангилал <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <span className="flex items-center gap-1">
                  Дэд ангилал <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <div className="relative flex flex-col gap-1">
                  <button
                    type="button"
                    className="flex items-center gap-1 cursor-pointer select-none leading-none"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(
                        "status-filter-select",
                      ) as HTMLSelectElement | null;
                      el?.focus();
                      el?.click();
                    }}
                  >
                    Төлөв
                    <FilterIcon className="h-3 w-3" />
                  </button>
                  <select
                    id="status-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="absolute inset-x-0 top-0 h-7 w-24 opacity-0 cursor-pointer"
                  >
                    <option value="">Төлөв</option>
                    <option value="all">Бүгд</option>
                    <option value="ASSIGNED">Эзэмшигчтэй</option>
                    <option value="AVAILABLE">Эзэмшигчгүй</option>
                    <option value="FOR_SALE">Зарж болох</option>
                    <option value="DAMAGED">Эвдрэлтэй</option>
                  </select>
                </div>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <span className="flex items-center gap-1">
                  Байршил <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium border-0 text-white">
                <span className="flex items-center gap-1">
                  Эзэмшигч <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium text-right border-0 text-white">
                <span className="flex items-center justify-end gap-1">
                  Үнэ (₮) <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="font-medium text-right border-0 text-white">
                QR
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={12}
                  className="py-12 text-center font-medium text-black"
                >
                  Ачаалж байна...
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell
                  colSpan={12}
                  className="py-12 text-center font-medium text-destructive"
                >
                  {error.message}
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && visibleAssets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={12}
                  className="py-12 text-center font-medium text-black"
                >
                  Хөрөнгө олдсонгүй.
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              visibleAssets.map((asset, index) => (
                <TableRow key={asset.id} className="border-border">
                  <TableCell className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(asset.id)}
                      onChange={() => toggleSelect(asset.id)}
                      className="h-4 w-4 rounded border-border"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    <Link
                      href={`/assets/${asset.id}`}
                      className="text-black hover:underline"
                      title="Дэлгэрэнгүй үзэх, бүтэн түүх"
                    >
                      {asset.assetId}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {asset.category ?? asset.assetId}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {asset.mainCategory ?? "—"}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {asset.category ?? "—"}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {getStatusBadge(asset.status)}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {asset.location ?? "—"}
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {asset.assignedEmployeeName ??
                      asset.assignedEmployeeId ??
                      "—"}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-black">
                    {asset.currentBookValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="xs"
                      className="gap-1"
                      onClick={() => openQrForSingle(asset)}
                    >
                      <QrCode className="h-3 w-3" />
                      QR харах
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* QR dialog – A4 хэвлэх/ PDF */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>QR код хэвлэх / PDF болгох</DialogTitle>
            <DialogDescription>
              Сонгосон хөрөнгийн QR кодуудыг A4 хэмжээтэй хуудсан дээр харах,
              хэвлэх эсвэл browser‑ийн Print → Save as PDF‑ээр PDF болгон
              хадгалах боломжтой.
            </DialogDescription>
          </DialogHeader>
          <div
            ref={qrPrintRef}
            className="mt-4 bg-white p-4 border border-border rounded-lg shadow-sm"
          >
            {qrAssets.length === 1 ? (
              qrAssets.map((asset) => {
                const origin =
                  typeof window !== "undefined" ? window.location.origin : "";
                const qrUrl = `${origin}/assets/${asset.id}`;
                return (
                  <div
                    key={asset.id}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                        qrUrl,
                      )}`}
                      alt={`${asset.assetId} QR`}
                      className="h-48 w-48 rounded-md border border-border bg-white object-contain"
                    />
                  </div>
                );
              })
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {qrAssets.map((asset, index) => {
                  const origin =
                    typeof window !== "undefined" ? window.location.origin : "";
                  const qrUrl = `${origin}/assets/${asset.id}`;
                  const label =
                    asset.assetId || asset.serialNumber || `#${index + 1}`;
                  return (
                    <div
                      key={asset.id}
                      className="flex flex-col items-center justify-center rounded-md border border-border/60 bg-white px-2 py-2"
                    >
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                          qrUrl,
                        )}`}
                        alt={`${label} QR`}
                        className="h-20 w-20 rounded bg-white object-contain"
                      />
                      <span className="mt-1 text-[11px] text-muted-foreground text-center truncate w-full">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">
              PDF болгох бол хэвлэх цонхноос <b>“Save as PDF”</b> сонгоно уу.
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowQrDialog(false)}
              >
                Хаах
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  if (!qrPrintRef.current) return;
                  const content = qrPrintRef.current.innerHTML;
                  const printWindow = window.open(
                    "",
                    "_blank",
                    "width=1024,height=768",
                  );
                  if (!printWindow) return;
                  printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8">
                        <title>QR код — хөрөнгө</title>
                        <style>
                          @page { size: A4; margin: 16mm; }
                          body {
                            font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
                            color: #171717;
                            background: #fff;
                            padding: 24px;
                            max-width: 210mm;
                            margin: 0 auto;
                          }
                        </style>
                      </head>
                      <body>${content}</body>
                    </html>
                  `);
                  printWindow.document.close();
                  printWindow.focus();
                  setTimeout(() => printWindow.print(), 300);
                }}
              >
                Хэвлэх (A4)
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

