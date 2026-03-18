"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { Plus, ArrowRightLeft, Undo2, QrCode } from "lucide-react";
import { AssignAssetDocument } from "@/gql/graphql";
import type { Asset } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AssetFormDialog } from "../asset-form-dialog";
import { AssetTransferDialog } from "../asset-transfer-dialog";
import { AssetsTable } from "./components/AssetsTable";
import { AssignAssetDialog } from "./components/AssignAssetDialog";
import { QrDialog } from "./components/QrDialog";
import { openQrPdfPreviewWindow, openQrPrintWindow } from "./qrPrint";
import { useAssetsData } from "./useAssetsData";
import { cn } from "@/lib/utils";

export function AssetFilter() {
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
  const [activeAction, setActiveAction] = useState<
    "add" | "transfer" | "assign" | "return" | null
  >(null);
  const { assets, visibleAssets, loading, refetch, employeeNameById } =
    useAssetsData("");
  const [assignAssetMutation] = useMutation(AssignAssetDocument);
  const [actionMode, setActionMode] = useState<
    "assign" | "transfer" | "return" | null
  >(null);
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

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      if (statusFilter === "ASSIGNED") {
        return a.status === "ASSIGNED";
      }

      if (statusFilter === "ASSIGNABLE") {
        return a.status === "AVAILABLE" || a.status === "FOR_SALE";
      }

      return true;
    });
  }, [assets, statusFilter]);

  const openQrForSingle = (asset: Asset) => {
    setQrAssets([asset]);
    setShowQrDialog(true);
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

  const handleAssignSubmit = async () => {
    if (!assignEmployeeId || selectedIds.size === 0) return;
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

  const activeBtn =
    "bg-black text-white border border-black " +
    "transition-all duration-200 " +
    "hover:!bg-white hover:!text-black hover:!border-black";

  const actionLabel =
    actionMode === "assign"
      ? "Хөрөнгө олгох"
      : actionMode === "transfer"
        ? "Хөрөнгө шилжүүлэх"
        : actionMode === "return"
          ? "Хөрөнгө буцаах"
          : "Үйлдэл сонгоно уу";

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Эд хөрөнгө / Нийт хөрөнгө
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Nemeh */}
          <Button
            variant={activeAction === "add" ? "default" : "outline"}
            className="gap-2"
            onClick={() => {
              setActiveAction("add");
              setStatusFilter("all");
              setShowAddDialog(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Хөрөнгө нэмэх
          </Button>

          {/* Shiljuuleh */}
          <Button
            variant={activeAction === "transfer" ? "default" : "outline"}
            className={cn(
              "gap-2 transition-all duration-200",
              activeAction === "transfer" && activeBtn,
            )}
            onClick={() => {
              if (activeAction === "transfer") {
                setActiveAction(null);
                setStatusFilter("all");
                return;
              }

              setActiveAction("transfer");
              setStatusFilter("ASSIGNED");
            }}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Хөрөнгө шилжүүлэх
          </Button>

          {/* huviarlah */}
          <Button
            className={cn(
              "gap-2 transition-all duration-200",
              activeAction === "assign" && activeBtn,
            )}
            variant={activeAction === "assign" ? "default" : "outline"}
            onClick={() => {
              if (activeAction === "assign") {
                setActiveAction(null);
                setStatusFilter("all");
                return;
              }

              setActiveAction("assign");
              setStatusFilter("ASSIGNABLE");
            }}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Хөрөнгө олгох
          </Button>

          {/* butsaah */}
          <Button
            variant={activeAction === "return" ? "default" : "outline"}
            onClick={() => {
              if (activeAction === "return") {
                setActiveAction(null);
                setStatusFilter("all");
                return;
              }

              setActiveAction("return");
              setStatusFilter("ASSIGNED");
            }}
            className={cn(
              "gap-2 transition-all duration-200",
              activeAction === "return" && activeBtn,
            )}
          >
            <Undo2 className="h-4 w-4" />
            Хөрөнгө буцаах
          </Button>

          <Button
            variant="outline"
            className="gap-2"
            onClick={openQrForSelected}
          >
            <QrCode className="h-4 w-4" />
            Сонгосон хөрөнгийн QR (A4)
          </Button>
        </div>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            if (!actionMode) {
              toast.error("Үйлдэл сонгоно уу.");
              return;
            }

            if (selectedIds.size === 0) {
              toast.error("Эхлээд хөрөнгө сонгоно уу.");
              return;
            }

            if (actionMode === "assign") {
              setShowAssignDialog(true);
            }

            if (actionMode === "transfer") {
              setShowTransferDialog(true);
            }

            if (actionMode === "return") {
              toast.info("Буцаах функц удахгүй");
            }
          }}
        >
          {actionLabel}
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
        onOpenQrForSingle={openQrForSingle}
      />
    </div>
  );
}
