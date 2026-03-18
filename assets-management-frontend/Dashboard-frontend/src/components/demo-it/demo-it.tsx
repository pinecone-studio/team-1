"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDemoIT } from "./useDemoIT";
import { DemoITHeader } from "./DemoITHeader";
import { DemoITDataWipeCard } from "./DemoITDataWipeCard";
import { DemoITNotificationsCard } from "./DemoITNotificationsCard";
import { DemoITPendingDisposalsCard } from "./DemoITPendingDisposalsCard";
import { DemoITMaintenanceCard } from "./DemoITMaintenanceCard";
import { DemoITAllDisposalsCard } from "./DemoITAllDisposalsCard";
import { DemoITDisposalDetailDialog } from "./DemoITDisposalDetailDialog";
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
        <DemoITHeader title={title} />
        <DemoITDataWipeCard
          wipeTasks={s.wipeTasks}
          onWipeDone={s.handleWipeDone}
          updatingWipe={s.updatingWipe}
        />
        {/* <DemoITNotificationsCard
          itNotifications={s.itNotifications}
          onApprove={s.handleApprove}
          onReject={s.handleReject}
          approving={s.approving}
          rejecting={s.rejecting}
          demoApproverId={s.demoApproverId}
        /> */}
        <DemoITPendingDisposalsCard
          pendingDisposals={s.pendingDisposals}
          onSelectDisposal={s.setSelectedDisposal}
          onReject={s.handleReject}
          approving={s.approving}
          rejecting={s.rejecting}
          setIsDisposalChecked={s.setIsDisposalChecked}
          normalizeAssetTag={s.normalizeAssetTag}
        />
        <DemoITMaintenanceCard
          allMaintenanceTickets={s.allMaintenanceTickets}
          MAINTENANCE_STATUS_LABELS={MAINTENANCE_STATUS_LABELS}
        />
        <DemoITAllDisposalsCard
          allDisposals={s.allDisposals}
          DISPOSAL_STATUS_LABELS={DISPOSAL_STATUS_LABELS}
          normalizeAssetTag={s.normalizeAssetTag}
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
