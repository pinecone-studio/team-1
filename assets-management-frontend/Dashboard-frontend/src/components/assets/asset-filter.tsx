"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { Plus, ArrowRightLeft, Undo2, QrCode } from "lucide-react";
import { useQuery } from "@apollo/client";
import {
  GetAssetsDocument,
  CategoriesDocument,
  EmployeesDocument,
  GetLocationsDocument,
  AssignAssetDocument,
} from "@/gql/graphql";
import type { Asset } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getAssetQrImageUrl } from "@/lib/asset-qr";
import { AssetFormDialog } from "./asset-form-dialog";
import { AssetTransferDialog } from "./asset-transfer-dialog";
import { AssetDetailContent } from "./asset-detail-content";
import { CATEGORY_LABELS } from "./constants";

/** A4 хуудсан дээр 7 багана, ~4 эгнээ (хэвлэх layout-тай таарна) */
const QR_TILES_PER_A4_PAGE = 28;

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
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
  RETURNED: { label: "Буцаасан", className: "bg-gray-100 text-gray-600" },
  FOR_SALE: { label: "Зарж болох", className: "bg-yellow-100 text-yellow-800" },
};

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

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
  const [detailAssetId, setDetailAssetId] = useState<string | null>(null);
  const [assignEmployeeId, setAssignEmployeeId] = useState<string>("");
  const [assigning, setAssigning] = useState(false);
  // "" = бүх төлөв (filter хийгдээгүй)
  const [statusFilter, setStatusFilter] = useState<string>("");
  const selectAllRef = useRef<HTMLInputElement>(null);
  const qrPrintRef = useRef<HTMLDivElement | null>(null);
  const qrPages = useMemo(() => {
    const pages: Asset[][] = [];
    for (let i = 0; i < qrAssets.length; i += QR_TILES_PER_A4_PAGE) {
      pages.push(qrAssets.slice(i, i + QR_TILES_PER_A4_PAGE));
    }
    return pages.length > 0 ? pages : [[]];
  }, [qrAssets]);
  const singleQrAsset = qrAssets.length === 1 ? qrAssets[0] : null;

  const assetsQueryVariables = useMemo(
    () => ({
      office: undefined as undefined,
      categoryIds: undefined as undefined,
      subCategoryIds: undefined as undefined,
      locationIds: undefined as undefined,
    }),
    [],
  );
  const { data, loading, error, refetch } = useQuery(GetAssetsDocument, {
    variables: assetsQueryVariables,
    fetchPolicy: "cache-first",
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
        [e.firstName, e.lastName].filter(Boolean).join(" ") || e.email || e.id;
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
    const mapped = (
      data.assets as Array<{
        id: string;
        assetTag: string;
        category: string;
        locationId?: string | null;
        locationPath?: string | null;
        serialNumber: string;
        purchaseCost?: number | null;
        purchaseDate?: number | null;
        currentBookValue?: number | null;
        status: string;
        assignedTo?: string | null;
        imageUrl?: string | null;
        notes?: string | null;
        createdAt: number;
        updatedAt: number;
      }>
    ).map((a) => {
      const categoryName = typeof a.category === "string" ? a.category : "";
      const rawLocationPath = (a.locationPath ?? "").trim();
      const friendlyLocation =
        rawLocationPath && !/^[0-9a-f-]{20,}$/i.test(rawLocationPath)
          ? rawLocationPath
          : a.locationId
            ? (locationPathById.get(a.locationId) ?? undefined)
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
      };
    });
    // Шинээр нэмэгдсэн хөрөнгүүдийг дээр нь гаргах
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

  const openQrForSelected = () => {
    if (selectedIds.size === 0) {
      toast.error("Та эхлээд QR гаргах хөрөнгөө сонгоно уу.");
      return;
    }
    const list = assets.filter((a) => selectedIds.has(a.id));
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

  const handlePrintQr = () => {
    const tiles = qrAssets
      .map((asset, index) => {
        const qrImgSrc = getAssetQrImageUrl(asset.id, 140);
        const label =
          escapeHtml(asset.assetId || "") ||
          escapeHtml(asset.serialNumber || "") ||
          `#${index + 1}`;
        return `
          <div class="qr-tile">
            <img class="qr-img" src="${qrImgSrc}" alt="${label} QR" />
            <div class="qr-code-label">${label}</div>
          </div>`;
      })
      .join("");
    const printWindow = window.open("", "_blank", "width=1424,height=768");
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
            .qr-grid {
              display: grid;
              grid-template-columns: repeat(7, minmax(0, 1fr));
              gap: 10px;
            }
            .qr-tile {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 4px;
              border-radius: 6px;
              break-inside: avoid;
            }
            .qr-img {
              width: 80px;
              height: 80px;
              border-radius: 6px;
              border: 1px solid #e5e5e5;
              object-fit: contain;
              background: #fff;
            }
            .qr-code-label {
              margin-top: 2px;
              font-size: 10px;
              color: #4b5563;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="qr-grid">
            ${tiles}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  };

  const handleOpenQrPdfPreview = () => {
    const tiles = qrAssets
      .map((asset, index) => {
        const qrImgSrc = getAssetQrImageUrl(asset.id, 140);
        const label =
          escapeHtml(asset.assetId || "") ||
          escapeHtml(asset.serialNumber || "") ||
          `#${index + 1}`;
        return `
          <div class="qr-tile">
            <img class="qr-img" src="${qrImgSrc}" alt="${label} QR" />
            <div class="qr-code-label">${label}</div>
          </div>`;
      })
      .join("");
    const previewWindow = window.open("", "_blank", "width=1024,height=768");
    if (!previewWindow) return;
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>QR код — хөрөнгө (PDF)</title>
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
            .qr-grid {
              display: grid;
              grid-template-columns: repeat(7, minmax(0, 1fr));
              gap: 10px;
            }
            .qr-tile {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 4px;
              border-radius: 6px;
              break-inside: avoid;
            }
            .qr-img {
              width: 80px;
              height: 80px;
              border-radius: 6px;
              border: 1px solid #e5e5e5;
              object-fit: contain;
              background: #fff;
            }
            .qr-code-label {
              margin-top: 2px;
              font-size: 10px;
              color: #4b5563;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="qr-grid">
            ${tiles}
          </div>
        </body>
      </html>
    `);
    previewWindow.document.close();
    previewWindow.focus();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === assets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(assets.map((a) => a.id)));
    }
  };

  const allSelected = assets.length > 0 && selectedIds.size === assets.length;
  const someSelected = selectedIds.size > 0;

  useEffect(() => {
    const el = selectAllRef.current;
    if (el) el.indeterminate = someSelected && !allSelected;
  }, [someSelected, allSelected]);

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
        <Button variant="outline" className="gap-2" onClick={openQrForSelected}>
          <QrCode className="h-4 w-4" />
          Сонгосон хөрөнгийн QR (A4)
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
        selectedAssets={assets
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

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Хөрөнгө хуваарилах</DialogTitle>
            <DialogDescription>
              Сонгосон хөрөнгийг ажилтанд хуваарилах хүсэлт илгээнэ.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {(() => {
              const selectedAssetsList = assets.filter((a) =>
                selectedIds.has(a.id),
              );
              const primaryAsset = selectedAssetsList[0];
              const employeeName =
                assignEmployeeId &&
                employeeNameById.get(assignEmployeeId || "");

              return (
                <>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Сонгогдсон хөрөнгө
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 rounded-md border border-input bg-muted/30 p-2 min-h-[52px]">
                      {selectedAssetsList.length === 0 ? (
                        <span className="text-sm text-muted-foreground py-1">
                          Хөрөнгө сонгоогүй байна. Хүснэгтээс сонгоно уу.
                        </span>
                      ) : (
                        selectedAssetsList.map((asset) => (
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
                        {Array.from(employeeNameById.entries()).map(
                          ([id, name]) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {primaryAsset && (
                    <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Олголтын урьдчилсан мэдээлэл
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <span className="text-muted-foreground">Ажилтан</span>
                        <span className="font-medium">
                          {employeeName || "—"}
                        </span>
                        <span className="text-muted-foreground">Хөрөнгө</span>
                        <span className="font-medium">
                          {primaryAsset.assetId}
                        </span>
                        <span className="text-muted-foreground">
                          Сериал дугаар
                        </span>
                        <span className="font-medium">
                          {primaryAsset.serialNumber}
                        </span>
                        <span className="text-muted-foreground">Үнэ</span>
                        <span className="font-medium">
                          {(
                            primaryAsset.currentBookValue ||
                            primaryAsset.purchaseCost ||
                            0
                          ).toLocaleString()}
                          ₮
                        </span>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
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
              onClick={async () => {
                if (!assignEmployeeId || selectedIds.size === 0) return;
                setAssigning(true);
                const toastId = toast.loading(
                  "Хуваарилах хүсэлт илгээж байна...",
                );
                try {
                  const targets = assets.filter((a) => selectedIds.has(a.id));
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
              }}
            >
              Хүсэлт илгээх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent
          className={
            singleQrAsset
              ? "w-full max-w-xl overflow-hidden"
              : "max-w-7xl w-[98vw] max-h-[92vh] flex flex-col overflow-hidden"
          }
        >
          <div className="flex flex-col flex-1 min-h-0">
            <DialogHeader className="shrink-0">
              <DialogTitle>
                {singleQrAsset ? "QR код" : "QR код хэвлэх / PDF болгох"}
              </DialogTitle>
              <DialogDescription>
                {singleQrAsset
                  ? "Сонгосон нэг хөрөнгийн QR кодыг томоор харуулж байна."
                  : "Сонгосон хөрөнгийн QR кодуудыг A4 хэмжээтэй хуудсан дээр харах, хэвлэх эсвэл browser-ийн `Print → Save as PDF`-ээр PDF болгон хадгалах боломжтой."}
              </DialogDescription>
            </DialogHeader>
            {qrAssets.length > 1 && (
              <p className="text-sm text-muted-foreground mt-1 shrink-0">
                Нийт <strong>{qrAssets.length}</strong> хөрөнгө · 1 A4 хуудасанд{" "}
                <strong>{QR_TILES_PER_A4_PAGE}</strong> ширхэг · нийт A4 дээр{" "}
                <strong>
                  {Math.ceil(qrAssets.length / QR_TILES_PER_A4_PAGE)}
                </strong>{" "}
                хуудас гарна.
              </p>
            )}
            <div
              ref={qrPrintRef}
              className={
                singleQrAsset
                  ? "mt-4 flex-1 min-h-0 overflow-auto bg-transparent p-0"
                  : "mt-4 bg-white p-4 border border-border rounded-lg shadow-sm flex-1 min-h-0 overflow-auto"
              }
            >
              {singleQrAsset ? (
                <div className="flex justify-center py-2">
                  <div className="w-full max-w-md rounded-3xl border border-border/70 bg-white p-8 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={getAssetQrImageUrl(singleQrAsset.id, 420)}
                        alt={`${singleQrAsset.assetId || singleQrAsset.serialNumber || singleQrAsset.id} QR`}
                        className="h-[320px] w-[320px] rounded-2xl bg-white object-contain"
                      />
                      <div className="mt-5 space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {singleQrAsset.assetId ||
                            singleQrAsset.serialNumber ||
                            singleQrAsset.id}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {CATEGORY_LABELS[singleQrAsset.category]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {singleQrAsset.serialNumber || "Serial байхгүй"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {singleQrAsset.location || "Байршилгүй"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 py-2">
                  {qrPages.map((pageAssets, pageIndex) => {
                    const pageNumber = pageIndex + 1;
                    return (
                      <div key={pageNumber} className="mx-auto w-fit">
                        <div className="mb-2 text-xs text-muted-foreground">
                          A4 · Хуудас {pageNumber} / {qrPages.length}
                        </div>
                        <div className="w-[794px] h-[1123px] bg-white border border-border shadow-sm rounded-md overflow-hidden print:shadow-none print:border-0 print:rounded-none print:break-after-page last:print:break-after-auto">
                          <div className="h-full w-full p-8">
                            <div className="grid grid-cols-7 grid-rows-4 gap-2 h-full">
                              {Array.from(
                                { length: QR_TILES_PER_A4_PAGE },
                                (_, i) => pageAssets[i] ?? null,
                              ).map((asset, index) => {
                                if (!asset) {
                                  return (
                                    <div
                                      key={`empty-${pageNumber}-${index}`}
                                      className="rounded-md border border-transparent"
                                    />
                                  );
                                }
                                const label =
                                  asset.assetId ||
                                  asset.serialNumber ||
                                  `#${pageIndex * QR_TILES_PER_A4_PAGE + index + 1}`;
                                return (
                                  <div
                                    key={asset.id}
                                    className="flex flex-col items-center justify-center rounded-md border border-border/60 bg-white p-2 min-h-0"
                                  >
                                    <img
                                      src={getAssetQrImageUrl(asset.id, 180)}
                                      alt={`${label} QR`}
                                      className="h-16 w-16 rounded bg-white object-contain shrink-0"
                                    />
                                    <span className="mt-1 text-[10px] text-muted-foreground text-center truncate w-full leading-tight">
                                      {label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between shrink-0">
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowQrDialog(false)}>
                Хаах
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleOpenQrPdfPreview}
              >
                PDF файл болгох
              </Button>
              <Button onClick={handlePrintQr} className="gap-2">
                Хэвлэх (A4)
              </Button>
            </div>
          </DialogFooter>
          {!singleQrAsset ? (
            <div className="text-xs text-muted-foreground shrink-0">
              PDF болгох бол доорх <b>“PDF файл болгох”</b> товчийг дарж,
              нээгдсэн цонхноос <b>Save as PDF</b> сонгоно уу.
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!detailAssetId}
        onOpenChange={(open) => !open && setDetailAssetId(null)}
      >
        <DialogContent className="">
          <DialogTitle className="sr-only">Хөрөнгийн дэлгэрэнгүй</DialogTitle>
          <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1">
            {detailAssetId && (
              <AssetDetailContent
                assetId={detailAssetId}
                onClose={() => setDetailAssetId(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border border-border overflow-hidden min-h-[520px]">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="border-0 bg-sky-800 hover:bg-sky-800 h-11">
              <TableHead className="w-12 h-11 font-medium border-0 text-white align-middle">
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
              <TableHead className="h-11 font-medium border-0 text-white align-middle w-12">
                <span className="flex items-center gap-1">
                  № <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium border-0 text-white align-middle min-w-[100px]">
                <span className="flex items-center gap-1">
                  Хөрөнгийн ID <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium border-0 text-white align-middle min-w-[100px]">
                <span className="flex items-center gap-1">
                  Хөрөнгийн нэр <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium border-0 text-white align-middle min-w-[80px]">
                <span className="flex items-center gap-1">
                  Ангилал <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium border-0 text-white align-middle min-w-[80px]">
                <span className="flex items-center gap-1">
                  Дэд ангилал <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium border-0 text-white w-[140px] min-w-[140px] p-1 align-middle">
                <Select
                  value={statusFilter || "all"}
                  onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}
                >
                  <SelectTrigger className="h-8 w-full cursor-pointer border-0 bg-transparent text-white hover:bg-white/10 focus:ring-0 focus:ring-offset-0 gap-1 px-2  [&>svg]:text-white">
                    <span className="flex items-center gap-1">
                      Төлөв
                      <FilterIcon className="h-3 w-3 " />
                    </span>
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    align="start"
                    sideOffset={4}
                    className="z-[100] max-h-[var(--radix-select-content-available-height)]"
                  >
                    <SelectItem value="all">Бүгд</SelectItem>
                    <SelectItem value="ASSIGNED">Эзэмшигчтэй</SelectItem>
                    <SelectItem value="AVAILABLE">Эзэмшигчгүй</SelectItem>
                    <SelectItem value="FOR_SALE">Зарж болох</SelectItem>
                    <SelectItem value="DAMAGED">Эвдрэлтэй</SelectItem>
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="h-11 font-medium border-0 text-white align-middle min-w-[90px]">
                <span className="flex items-center gap-1">
                  Байршил <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium border-0 text-white align-middle min-w-[90px]">
                <span className="flex items-center gap-1">
                  Эзэмшигч <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium text-right border-0 text-white align-middle w-24">
                <span className="flex items-center justify-end gap-1">
                  Үнэ (₮) <FilterIcon />
                </span>
              </TableHead>
              <TableHead className="h-11 font-medium text-right border-0 text-white align-middle w-14">
                QR
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow className="h-32">
                <TableCell
                  colSpan={12}
                  className="h-32 py-12 text-center font-medium text-black align-middle"
                >
                  Ачаалж байна...
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow className="h-32">
                <TableCell
                  colSpan={12}
                  className="h-32 py-12 text-center font-medium text-destructive align-middle"
                >
                  {error.message}
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && visibleAssets.length === 0 && (
              <TableRow className="h-32">
                <TableCell
                  colSpan={12}
                  className="h-32 py-12 text-center font-medium text-black align-middle"
                >
                  Хөрөнгө олдсонгүй.
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              visibleAssets.map((asset, index) => (
                <TableRow key={asset.id} className="border-border h-12">
                  <TableCell className="w-12 py-2 align-middle">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(asset.id)}
                      onChange={() => toggleSelect(asset.id)}
                      className="h-4 w-4 rounded border-border"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    <button
                      type="button"
                      onClick={() => setDetailAssetId(asset.id)}
                      className="text-black hover:underline text-left"
                      title="Дэлгэрэнгүй үзэх, бүтэн түүх (бүртгэл, шилжүүлэлт, IT баталгаа г.м)"
                    >
                      {asset.assetId}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetailAssetId(asset.id)}
                      className="ml-2 text-xs text-muted-foreground hover:underline"
                      title="Бүтэн түүх: бүртгэгдсэн, хэн рүү шилжсэн, IT админ баталсан г.м"
                    >
                      Түүх
                    </button>
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    {asset.category ?? asset.assetId}
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    {asset.mainCategory ?? "—"}
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    {asset.category ?? "—"}
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    {getStatusBadge(asset.status)}
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    {asset.location ?? "—"}
                  </TableCell>
                  <TableCell className="font-medium text-black py-2 align-middle">
                    {asset.assignedEmployeeName ??
                      asset.assignedEmployeeId ??
                      "—"}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-black py-2 align-middle">
                    {asset.currentBookValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right py-2 align-middle">
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
    </div>
  );
}
