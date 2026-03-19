"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import {
  ArrowRightLeft,
  QrCode,
  UserRoundPlus,
  PackagePlus,
  FileSpreadsheet,
  Package,
} from "lucide-react";
import { AssignAssetDocument } from "@/gql/graphql";
import type { Asset } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AssetFormDialog } from "../asset-form-dialog";
import { AssetTransferDialog } from "../asset-transfer-dialog";
import { AssetDetailContent } from "../asset-detail-content";

import { openQrPdfPreviewWindow, openQrPrintWindow } from "./qrPrint";
import { useAssetsData } from "./useAssetsData";
import { cn } from "@/lib/utils";
import { AssignAssetDialog } from "./components/AssignAssetDialog";
import { QrDialog } from "./components/QrDialog";
import { AssetsTable } from "./components/AssetsTable";
import { STATUS_LABELS } from "./constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function formatStatusLabel(status: string) {
  const key = (status ?? "").toUpperCase().replace(/-/g, "_");
  return (
    STATUS_LABELS[key as keyof typeof STATUS_LABELS]?.label ?? status ?? ""
  );
}

export function AssetFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [qrAssets, setQrAssets] = useState<Asset[]>([]);
  const [assignEmployeeId, setAssignEmployeeId] = useState<string>("");
  const [assigning, setAssigning] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const selectAllRef = useRef<HTMLInputElement>(null);

  // Идэвхтэй үйлдлийг хянах state
  const [activeAction, setActiveAction] = useState<
    "assign" | "transfer" | "return" | null
  >(null);

  const { assets, loading, refetch, employeeNameById, employeeStatusById } =
    useAssetsData("");
  const [assignAssetMutation] = useMutation(AssignAssetDocument);

  // Табын сонголтоос хамаарч датаг шүүх (Дизайн өөрчлөхгүй)
  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      if (statusFilter === "ASSIGNED") return a.status === "ASSIGNED";
      if (statusFilter === "TRANSFERABLE") {
        const status = a.status as unknown as string;
        return (
          status === "ASSIGNED" ||
          status === "AVAILABLE" ||
          status === "FOR_SALE"
        );
      }
      if (statusFilter === "ASSIGNABLE") {
        const status = a.status as unknown as string;
        return status === "AVAILABLE" || status === "FOR_SALE";
      }
      if (statusFilter === "BROKEN") {
        const status = a.status as unknown as string;
        return ["DAMAGED", "DISPOSAL_REQUESTED", "PENDING_DISPOSAL", "DISPOSED"].includes(
          status,
        );
      }
      if (statusFilter && statusFilter !== "all") {
        return a.status === statusFilter;
      }
      return true;
    });
  }, [assets, statusFilter]);

  // Сонгосон хөрөнгө болон идэвхтэй табаас хамаарч товчны нэрийг тодорхойлох
  const actionLabel = useMemo(() => {
    const count = selectedIds.size;
    if (activeAction === "assign") return `Хөрөнгө олгох (${count})`;
    if (activeAction === "transfer") return `Хөрөнгө шилжүүлэх (${count})`;
    if (activeAction === "return") return `Хөрөнгө буцаах (${count})`;
    return "Үйлдэл сонгоно уу";
  }, [activeAction, selectedIds.size]);

  const [detailAssetId, setDetailAssetId] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredAssets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAssets.map((a) => a.id)));
    }
  };

  const exportRows = (type: "excel" | "pdf" | "word") => {
    const exportTarget =
      selectedIds.size > 0
        ? filteredAssets.filter((asset) => selectedIds.has(asset.id))
        : filteredAssets;

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

    const lines = exportTarget.map((asset, index) =>
      [
        index + 1,
        asset.assetId ?? "",
        asset.category ?? "",
        asset.mainCategory ?? "",
        asset.category ?? "",
        formatStatusLabel(asset.status),
        asset.location ?? "",
        asset.assignedEmployeeName ?? "",
        (asset.currentBookValue ?? 0).toLocaleString("mn-MN"),
      ]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(","),
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

  const allSelected =
    filteredAssets.length > 0 && selectedIds.size === filteredAssets.length;
  const someSelected = selectedIds.size > 0;

  useEffect(() => {
    const el = selectAllRef.current;
    if (el) el.indeterminate = someSelected && !allSelected;
  }, [someSelected, allSelected]);

  useEffect(() => {
    const rawStatus = searchParams.get("status");
    if (!rawStatus) return;

    const nextStatus = rawStatus.toUpperCase();
    const allowedStatuses = new Set([
      "ASSIGNED",
      "AVAILABLE",
      "FOR_SALE",
      "BROKEN",
    ]);

    setActiveAction(null);
    setSelectedIds(new Set());
    setStatusFilter(allowedStatuses.has(nextStatus) ? nextStatus : "all");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    router.replace(`/?${params.toString()}`);
  }, [router, searchParams]);

  const handleAssignSubmit = async () => {
    if (!assignEmployeeId || selectedIds.size === 0) return;

    const employeeStatus = (
      employeeStatusById.get(assignEmployeeId) ?? ""
    ).toLowerCase();

    if (employeeStatus === "offboarding") {
      toast.error("Гарах процесс хийж буй ажилтанд хөрөнгө оноох боломжгүй");
      return;
    }

    setAssigning(true);
    const toastId = toast.loading("Хуваарилах хүсэлт илгээж байна...");
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
      toast.success(`${targets.length} хөрөнгө амжилттай илгээгдлээ.`, {
        id: toastId,
      });
      setShowAssignDialog(false);
      setAssignEmployeeId("");
      setSelectedIds(new Set());
      refetch();
    } catch {
      toast.error(
        employeeStatus === "offboarding"
          ? "Гарах процесс хийж буй ажилтанд хөрөнгө оноох боломжгүй"
          : "Алдаа гарлаа.",
        { id: toastId },
      );
    } finally {
      setAssigning(false);
    }
  };

  const tabActive =
    "text-black relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black";
  const tabBase =
    "gap-2 bg-transparent border-none shadow-none rounded-none px-3 py-2 text-[15px] font-medium text-gray-500 hover:text-black hover:bg-transparent";

  return (
    <div className="flex-1 overflow-auto p-6 space-t-6">
      <div className="space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Эд хөрөнгө / Нийт хөрөнгө
          </h1>
          <div className="flex items-center gap-3">
            {/* Хөрөнгө нэмэх */}
            <Button
              className=" gap-2 rounded-sm bg-[#0f4c6e]   px-3 text-white hover:bg-[#0c3c57]"
              onClick={() => {
                setActiveAction(null);
                setStatusFilter("all");
                setShowAddDialog(true);
                setSelectedIds(new Set());
              }}
            >
              <PackagePlus className="h-4 w-4" />
              Хөрөнгө нэмэх
            </Button>

            {/* QR харах */}
            <Button
              className=" gap-2 rounded-sm border border-[#cfd8e3] bg-white px-3 text-[#111827] hover:bg-[#f1f5f9]"
              onClick={() => {
                if (selectedIds.size === 0)
                  return toast.error("Хөрөнгө сонгоно уу.");

                setQrAssets(assets.filter((a) => selectedIds.has(a.id)));
                setShowQrDialog(true);
              }}
            >
              <QrCode className="h-4 w-4" />
              QR харах
            </Button>

            {/* Экспорт */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className=" gap-2 rounded-sm border border-[#cfd8e3] bg-white px-3 text-[#111827] hover:bg-[#f1f5f9]">
                  <FileSpreadsheet className="h-4 w-4" />
                  Экспортлох
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40 rounded-xl border border-[#e2e8f0] bg-white p-1 shadow-md"
              >
                <DropdownMenuItem
                  className="rounded-lg px-2 py-2 hover:bg-gray-100"
                  onClick={() => exportRows("excel")}
                >
                  MS-Excel
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="rounded-lg px-2 py-2 hover:bg-gray-100"
                  onClick={() => exportRows("pdf")}
                >
                  PDF
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="rounded-lg px-2 py-2 hover:bg-gray-100"
                  onClick={() => exportRows("word")}
                >
                  MS-Word
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex  flex-wrap pb-3 gap-6">
            <Button
              variant="ghost"
              className={cn(
                tabBase,
                activeAction === null && statusFilter === "all" && tabActive,
              )}
              onClick={() => {
                setActiveAction(null);
                setStatusFilter("all");
                setSelectedIds(new Set());
              }}
            >
              <Package className="h-4 w-4" />
              Нийт хөрөнгө
            </Button>

            <Button
              variant="ghost"
              className={cn(tabBase, activeAction === "assign" && tabActive)}
              onClick={() => {
                setActiveAction(activeAction === "assign" ? null : "assign");
                setStatusFilter(
                  activeAction === "assign" ? "all" : "ASSIGNABLE",
                );
                setSelectedIds(new Set());
              }}
            >
              <UserRoundPlus className="h-4 w-4" />
              Хөрөнгө олгох
            </Button>

            <Button
              variant="ghost"
              className={cn(tabBase, activeAction === "transfer" && tabActive)}
              onClick={() => {
                setActiveAction(
                  activeAction === "transfer" ? null : "transfer",
                );
                setStatusFilter(
                  activeAction === "transfer" ? "all" : "TRANSFERABLE",
                );
                setSelectedIds(new Set());
              }}
            >
              <ArrowRightLeft className="h-4 w-4" />
              Хөрөнгө шилжүүлэх
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {/* Зөвхөн хөрөнгө сонгосон үед харагдах Үйлдлийн товч */}
            {activeAction && someSelected && (
              <Button
                className="bg-sky-900 text-white hover:bg-sky-950"
                onClick={() => {
                  if (activeAction === "assign") setShowAssignDialog(true);
                  if (activeAction === "transfer") setShowTransferDialog(true);
                  if (activeAction === "return")
                    toast.info("Буцаах функц удахгүй");
                }}
              >
                <PackagePlus />
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={!!detailAssetId}
        onOpenChange={(open) => !open && setDetailAssetId(null)}
      >
        <DialogContent
          showCloseButton={false}
          className="w-[min(92vw,760px)] max-h-[90vh] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-0 shadow-[0_32px_90px_rgba(15,23,42,0.18)]"
        >
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

      <AssetFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddAssets={() => {
          setStatusFilter("ASSIGNABLE");
          setActiveAction("assign");
          refetch();
        }}
      />

      <AssetTransferDialog
        open={showTransferDialog}
        onOpenChange={setShowTransferDialog}
        selectedAssets={assets
          .filter((a) => selectedIds.has(a.id))
          .map((a) => ({ id: a.id, assetTag: a.assetId }))}
        onRemoveAsset={(id) => toggleSelect(id)}
        onSuccess={() => {
          refetch();
          setSelectedIds(new Set());
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

      <QrDialog
        open={showQrDialog}
        onOpenChange={setShowQrDialog}
        assets={qrAssets}
        onPrint={() => openQrPrintWindow(qrAssets)}
        onOpenPdfPreview={() => openQrPdfPreviewWindow(qrAssets)}
      />

      <AssetsTable
        allAssets={assets}
        assets={filteredAssets}
        loading={loading}
        selectedIds={selectedIds}
        selectAllRef={selectAllRef}
        allSelected={allSelected}
        onSelectAll={selectAll}
        onToggleSelect={toggleSelect}
        onOpenAsset={(assetId) => setDetailAssetId(assetId)}
        onOpenQrForSingle={(a) => {
          setQrAssets([a]);
          setShowQrDialog(true);
        }}
        onOpenAsset={(assetId) => setDetailAssetId(assetId)}
      />
    </div>
  );
}
