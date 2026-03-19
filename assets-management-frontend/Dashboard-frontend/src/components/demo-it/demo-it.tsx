"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDemoIT } from "./useDemoIT";
import { DemoITHeader } from "./DemoITHeader";
import { DemoITDataWipeCard } from "./DemoITDataWipeCard";
import { DemoITPendingDisposalsCard } from "./DemoITPendingDisposalsCard";
import { DemoITMaintenanceCard } from "./DemoITMaintenanceCard";
import { DemoITAllDisposalsCard } from "./DemoITAllDisposalsCard";
import { DemoITDisposalDetailDialog } from "./DemoITDisposalDetailDialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AssetDetailContent } from "@/components/assets/asset-detail-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DISPOSAL_STATUS_LABELS,
  MAINTENANCE_STATUS_LABELS,
} from "./demo-it-utils";

export function DemoITContent({
  title = "IT Хяналтын самбар",
}: {
  title?: string;
}) {
  const s = useDemoIT();
  const [detailAssetId, setDetailAssetId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleCloseDialog = () => {
    s.setSelectedDisposal(null);
    s.setSignatureData(null);
    s.setDataWipeConfirmed(false);
    s.setIsDisposalChecked(false);
  };

  const handleApproveWithPdf = async () => {
    if (!s.selectedDisposal) return;
    const uploaded = await s.uploadApprovalPdf(s.selectedDisposal);
    if (!uploaded) return;
    await s.handleApprove(s.selectedDisposal.id);
    s.setSelectedDisposal(null);
  };

  return (
    <ScrollArea className="h-full min-h-0 flex-1 w-full">
      <div className="flex flex-col gap-4 p-6">
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

        <DemoITHeader
          title={title}
          notificationCount={s.itNotifications.length}
          notificationsOpen={showNotifications}
          onToggleNotifications={() => setShowNotifications((prev) => !prev)}
        />
        {showNotifications ? (
          <Card className="border border-border/60 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">
                IT мэдэгдлүүд ({s.itNotifications.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {s.itNotifications.length === 0 ? (
                <p className="rounded-lg border border-dashed border-gray-200 bg-white p-4 text-sm text-muted-foreground">
                  Шинэ мэдэгдэл алга байна.
                </p>
              ) : (
                <ul className="space-y-3">
                  {s.itNotifications.map((n) => (
                    <li key={n.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      {n.message ? (
                        <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                      ) : null}
                      {n.createdAt ? (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ) : null}
        <DemoITPendingDisposalsCard
          pendingDisposals={s.pendingDisposals}
          onSelectDisposal={s.setSelectedDisposal}
          onOpenAsset={(assetId) => setDetailAssetId(assetId)}
          onReject={s.handleReject}
          approving={s.approving}
          rejecting={s.rejecting}
          setIsDisposalChecked={s.setIsDisposalChecked}
          normalizeAssetTag={s.normalizeAssetTag}
        />
        <DemoITMaintenanceCard
          allMaintenanceTickets={s.allMaintenanceTickets}
          MAINTENANCE_STATUS_LABELS={MAINTENANCE_STATUS_LABELS}
          onOpenAsset={(assetId) => setDetailAssetId(assetId)}
          onApprove={s.handleApproveMaintenance}
          onReject={s.handleRejectMaintenance}
          updatingMaintenance={s.updatingMaintenance}
        />
        <DemoITAllDisposalsCard
          allDisposals={s.allDisposals}
          DISPOSAL_STATUS_LABELS={DISPOSAL_STATUS_LABELS}
          normalizeAssetTag={s.normalizeAssetTag}
          onOpenAsset={(assetId) => setDetailAssetId(assetId)}
        />
        <DemoITDisposalDetailDialog
          selectedDisposal={s.selectedDisposal}
          onClose={handleCloseDialog}
          setSelectedDisposal={s.setSelectedDisposal}
          setSignatureData={s.setSignatureData}
          setDataWipeConfirmed={s.setDataWipeConfirmed}
          setIsDisposalChecked={s.setIsDisposalChecked}
          signatureData={s.signatureData}
          signatureUploading={s.signatureUploading}
          onSaveSignature={s.handleSaveSignature}
          onClearSignature={s.handleClearSignature}
          onApproveWithPdf={handleApproveWithPdf}
          onReject={s.handleReject}
          approving={s.approving}
          rejecting={s.rejecting}
          normalizeAssetTag={s.normalizeAssetTag}
          uploadApprovalPdf={s.uploadApprovalPdf}
        />
      </div>
    </ScrollArea>
  );
}
