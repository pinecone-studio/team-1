"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client";
import {
  Plus,
  ArrowRightLeft,
  Undo2,
  QrCode,
  UserRoundPlus,
  PackagePlus,
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

  // Идэвхтэй үйлдлийг хянах state
  const [activeAction, setActiveAction] = useState<
    "assign" | "transfer" | "return" | null
  >(null);

  const { assets, visibleAssets, loading, refetch, employeeNameById } =
    useAssetsData("");
  const [assignAssetMutation] = useMutation(AssignAssetDocument);

  // Табын сонголтоос хамаарч датаг шүүх (Дизайн өөрчлөхгүй)
  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      if (statusFilter === "ASSIGNED") return a.status === "ASSIGNED";
      if (statusFilter === "ASSIGNABLE") {
        const status = a.status as unknown as string;
        return status === "AVAILABLE" || status === "FOR_SALE";
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

  const allSelected =
    filteredAssets.length > 0 && selectedIds.size === filteredAssets.length;
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
      toast.success(`${targets.length} хөрөнгө амжилттай илгээгдлээ.`, {
        id: toastId,
      });
      setShowAssignDialog(false);
      setAssignEmployeeId("");
      setSelectedIds(new Set());
      refetch();
    } catch {
      toast.error("Алдаа гарлаа.", { id: toastId });
    } finally {
      setAssigning(false);
    }
  };

  const tabActive =
    "text-black relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black";
  const tabBase =
    "gap-2 bg-transparent border-none shadow-none rounded-none px-3 py-2 text-gray-500 hover:text-black hover:bg-transparent";

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      <div className="space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Эд хөрөнгө / Нийт хөрөнгө
          </h1>
          <div className="flex ">
            <div>
              <Button
                className="gap-2 bg-white text-black border-black hover:bg-gray-100"
                onClick={() => {
                  setActiveAction(null);
                  setStatusFilter("all");
                  setShowAddDialog(true);
                  setSelectedIds(new Set());
                }}
              >
                <Plus className="h-4 w-4" />
                Хөрөнгө нэмэх
              </Button>
            </div>
            <div>
              <Button
                className="gap-2 border hover:bg-gray-200  hover:border-black bg-white text-black border-gray-800"
                onClick={() => {
                  if (selectedIds.size === 0)
                    return toast.error("Хөрөнгө сонгоно уу.");
                  setQrAssets(assets.filter((a) => selectedIds.has(a.id)));
                  setShowQrDialog(true);
                }}
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-wrap gap-4">
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
                  activeAction === "transfer" ? "all" : "ASSIGNED",
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
                className="bg-sky-800 text-white hover:bg-sky-900"
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
      />
    </div>
  );
}
