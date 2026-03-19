"use client";

import React, { useState } from "react";
import { useDemoEmployee } from "./useDemoEmployee";
import { DemoEmployeeHeader } from "./DemoEmployeeHeader";
import { DemoEmployeeOffboardingModal } from "./DemoEmployeeOffboardingModal";
import { DemoEmployeePendingTransferCard } from "./DemoEmployeePendingTransferCard";
import { DemoEmployeeOffboardingCard } from "./DemoEmployeeOffboardingCard";
import { DemoEmployeeNotificationsCard } from "./DemoEmployeeNotificationsCard";
import { DemoEmployeeRequestsDialog } from "./DemoEmployeeRequestsDialog";
import { DemoEmployeeMyAssetsCard } from "./DemoEmployeeMyAssetsCard";
import { DemoEmployeeSignModal } from "./DemoEmployeeSignModal";
import { DemoEmployeeTransferDialogs } from "./DemoEmployeeTransferDialogs";
import { DemoEmployeeReturnRequestDialog } from "./DemoEmployeeReturnRequestDialog";
import { DEMO_EMPLOYEE_EMAIL } from "./demo-employee-utils";
import { DemoEmployeeIncomingRequestsCard } from "./DemoEmployeeIncomingRequestsCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AssetDetailContent } from "@/components/assets/asset-detail-content";

export function DemoEmployeeContent({
  title = "Миний хөрөнгө",
}: {
  title?: string;
}) {
  const s = useDemoEmployee();
  const [detailAssetId, setDetailAssetId] = useState<string | null>(null);
  const [showDisposalDialog, setShowDisposalDialog] = useState(false);

  const openSignModal = (a: any) => {
    s.setSignAssignment(a);
    s.setSignatureData(null);
    s.setSignatureFileUrl(null);
    s.setIsSignModalOpen(true);
  };

  const offboardingNotificationId =
    s.notifications?.find(
      (n: any) =>
        n?.title === "Ажлаас гарах — хөрөнгө буцаах" ||
        (typeof n?.message === "string" &&
          (n.message.includes("Буцаах эцсийн хугацаа") ||
            n.message.includes("ажлаас гарах"))),
    )?.id ?? null;

  return (
    <div className="flex flex-col p-6 overflow-visible">
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
      {s.employeeNotFound && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Демо ажилтан олдсонгүй: <strong>{DEMO_EMPLOYEE_EMAIL}</strong>{" "}
          имэйлтэй ажилтан өгөгдлийн санд байх ёстой.
        </div>
      )}

      <DemoEmployeeHeader
        title={title}
        employees={s.employeesData?.employees}
        demoEmployeeId={s.demoEmployeeId}
        onDemoEmployeeChange={s.setDemoEmployeeId}
        currentEmployeeId={s.currentEmployeeId}
        activeOffboarding={s.activeOffboarding ? { deadline: (s.activeOffboarding as { deadline?: number }).deadline, returnedAssets: (s.activeOffboarding as { returnedAssets?: number }).returnedAssets, totalAssets: (s.activeOffboarding as { totalAssets?: number }).totalAssets } : null}
        offboardingCreatedAt={(s.activeOffboarding as { createdAt?: number })?.createdAt}
        offboardingStarting={s.offboardingStarting}
        onShowOffboardingModal={() => s.setShowOffboardingModal(true)}
        onOpenOffboarding={() => {
          if (offboardingNotificationId) {
            s.setExpandedNotificationId(offboardingNotificationId);
          }
          document
            .getElementById("demo-employee-notifications-card-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        pendingList={s.pendingList as any}
        currentPending={s.currentPending as any}
        isChecked={s.isChecked}
        onConditionCheck={openSignModal}
        onApprove={s.handleApprove}
        onReject={s.handleReject}
        updatingStatus={s.updatingStatus}
        normalizeAssetTag={s.normalizeAssetTag}
      />

      <DemoEmployeeOffboardingModal
        open={s.showOffboardingModal}
        onOpenChange={s.setShowOffboardingModal}
        activeAssignments={s.activeAssignments}
        onStartOffboarding={s.handleStartOffboarding}
        offboardingStarting={s.offboardingStarting}
      />

      {s.pendingTransferSent && (
        <DemoEmployeePendingTransferCard
          toName={s.pendingTransferSent.toName}
          assetTag={s.pendingTransferSent.assetTag}
          onDismiss={() => s.setPendingTransferSent(null)}
        />
      )}

      <div id="demo-employee-offboarding-section" className="scroll-mt-4">
        <DemoEmployeeOffboardingCard
          activeOffboarding={
          s.activeOffboarding
            ? {
                deadline: (s.activeOffboarding as { deadline?: number })
                  .deadline,
                returnedAssets: (s.activeOffboarding as { returnedAssets?: number })
                  .returnedAssets,
                totalAssets: (s.activeOffboarding as { totalAssets?: number })
                  .totalAssets,
              }
            : null
        }
        bulkReturnInstructionsRead={s.bulkReturnInstructionsRead}
        onBulkReturnInstructionsReadChange={s.setBulkReturnInstructionsRead}
        onBulkSubmitReturnRequests={s.handleBulkSubmitReturnRequests}
        bulkReturnSending={s.bulkReturnSending}
        submitReturnRequestLoading={s.submitReturnRequestLoading}
        selectedReturnAssetIds={s.selectedReturnAssetIds}
        eligibleReturnAssignmentsLength={s.eligibleReturnAssignmentsLength}
        selectAllEligibleReturns={s.selectAllEligibleReturns}
        assignmentsToReturn={s.assignmentsToReturn}
        pendingReturnRequestAssetIds={s.pendingReturnRequestAssetIds}
        toggleReturnSelection={s.toggleReturnSelection}
        onOpenReturnRequest={s.onOpenReturnRequest}
        completeReturnLoading={s.completeReturnLoading}
      />
      </div>

      {/* Offboarding байхгүй үед “шар” мэдэгдлийн card-ууд (өмнөх шиг). */}
      {!s.activeOffboarding && (
        <DemoEmployeeNotificationsCard
          notifications={s.notifications}
          expandedNotificationId={s.expandedNotificationId}
          setExpandedNotificationId={s.setExpandedNotificationId}
          bulkReturnInstructionsRead={s.bulkReturnInstructionsRead}
          setBulkReturnInstructionsRead={s.setBulkReturnInstructionsRead}
          handleBulkSubmitReturnRequests={s.handleBulkSubmitReturnRequests}
          bulkReturnSending={s.bulkReturnSending}
          submitReturnRequestLoading={s.submitReturnRequestLoading}
          selectedReturnAssetIds={s.selectedReturnAssetIds}
          eligibleReturnAssignmentsLength={s.eligibleReturnAssignmentsLength}
          selectAllEligibleReturns={s.selectAllEligibleReturns}
          assetsToReturnList={s.assetsToReturnList}
          myAssetsList={s.myAssetsList}
          pendingReturnRequestAssetIds={s.pendingReturnRequestAssetIds}
          toggleReturnSelection={s.toggleReturnSelection}
          onOpenReturnRequest={s.onOpenReturnRequest}
          completeReturnLoading={s.completeReturnLoading}
          activeOffboarding={s.activeOffboarding}
          normalizeAssetTag={s.normalizeAssetTag}
        />
      )}

      {/* Offboarding-оос бусад ерөнхий “ирсэн хүсэлтүүд” UI (зураг дээрхтэй адил). */}
      <DemoEmployeeIncomingRequestsCard
        pendingList={s.pendingList as any}
        currentPending={s.currentPending as any}
        isChecked={s.isChecked}
        onConditionCheck={openSignModal}
        onOpenAsset={() => {}}
        onApprove={s.handleApprove}
        onReject={s.handleReject}
        updatingStatus={s.updatingStatus}
        normalizeAssetTag={s.normalizeAssetTag}
      />

      <DemoEmployeeRequestsDialog
        open={s.showRequestsDialog}
        onOpenChange={s.setShowRequestsDialog}
        pendingList={s.pendingList}
        currentEmployeeId={s.currentEmployeeId}
        currentPending={s.currentPending}
        isChecked={s.isChecked}
        setIsChecked={s.setIsChecked}
        setSignAssignment={s.setSignAssignment}
        setSignatureData={s.setSignatureData}
        setSignatureFileUrl={s.setSignatureFileUrl}
        setIsSignModalOpen={s.setIsSignModalOpen}
        handleApprove={s.handleApprove}
        handleReject={s.handleReject}
        updatingStatus={s.updatingStatus}
        normalizeAssetTag={s.normalizeAssetTag}
      />

      <DemoEmployeeMyAssetsCard
        myAssetsList={s.myAssetsList}
        activeLoading={s.activeLoading}
        pendingLoading={s.pendingLoading}
        setSelectedAssignment={s.setSelectedAssignment}
        selectedAssignment={s.selectedAssignment}
        onOpenAsset={(assetId) => setDetailAssetId(assetId)}
        onSendToIt={() => {
          s.setTransferToEmployeeId("");
          s.setTransferReason("");
          s.setShowItTransferDialog(true);
        }}
        onSendToFinanceDisposal={() => {
          setShowDisposalDialog(true);
        }}
        onTransferToEmployee={() => {
          s.setTransferToEmployeeId("");
          s.setTransferReason("");
          s.setShowTransferDialog(true);
        }}
        normalizeAssetTag={s.normalizeAssetTag}
      />

      <DemoEmployeeSignModal
        open={s.isSignModalOpen}
        onOpenChange={s.setIsSignModalOpen}
        signAssignment={s.signAssignment}
        setSignAssignment={s.setSignAssignment}
        signatureData={s.signatureData}
        setSignatureData={s.setSignatureData}
        signatureFileUrl={s.signatureFileUrl}
        setSignatureFileUrl={s.setSignatureFileUrl}
        showSignaturePad={s.showSignaturePad}
        setShowSignaturePad={s.setShowSignaturePad}
        savedSignatureUrl={s.savedSignatureUrl}
        loadSignatureFromUrl={s.loadSignatureFromUrl}
        handleSaveSignature={s.handleSaveSignature}
        handleClearSignature={s.handleClearSignature}
        signatureUploading={s.signatureUploading}
        signatureProfileSaving={s.signatureProfileSaving}
        saveSignatureToProfile={s.saveSignatureToProfile}
        handleVerify={s.handleVerify}
        employeesData={s.employeesData}
        currentEmployeeId={s.currentEmployeeId}
        DEMO_EMPLOYEE_EMAIL={s.DEMO_EMPLOYEE_EMAIL}
        normalizeAssetTag={s.normalizeAssetTag}
        PDF_FONT_NAME={s.PDF_FONT_NAME}
      />

      <Dialog open={showDisposalDialog} onOpenChange={setShowDisposalDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Устгах хүсэлт илгээх</DialogTitle>
            <DialogDescription>
              {s.selectedAssignment?.asset
                ? `${s.normalizeAssetTag(s.selectedAssignment.asset.assetTag)} — устгах хүсэлт IT руу очиж, дараа нь санхүү баталгаажуулна.`
                : "Эхлээд хүсэлт илгээх хөрөнгөө сонгоно уу."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-2">
            <label className="text-sm font-medium">
              Устгах шалтгаан (заавал биш)
            </label>
            <textarea
              className="w-full min-h-[96px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              placeholder="Жишээ: эвдрэлтэй, ашиглахаа больсон..."
              value={s.disposalReason}
              onChange={(e) => s.setDisposalReason(e.target.value)}
              disabled={!s.selectedAssignment}
            />
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowDisposalDialog(false)}
            >
              Хаах
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              disabled={!s.selectedAssignment || s.disposalSending}
              onClick={async () => {
                await s.handleRequestDisposal();
                setShowDisposalDialog(false);
              }}
            >
              {s.disposalSending ? "Илгээж байна..." : "Илгээх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DemoEmployeeTransferDialogs
        showItTransferDialog={s.showItTransferDialog}
        setShowItTransferDialog={s.setShowItTransferDialog}
        otherEmployees={s.otherEmployees}
        handleTransferToIt={s.handleTransferToIt}
        transferSending={s.transferSending}
        showTransferDialog={s.showTransferDialog}
        setShowTransferDialog={s.setShowTransferDialog}
        transferToEmployeeId={s.transferToEmployeeId}
        setTransferToEmployeeId={s.setTransferToEmployeeId}
        transferReason={s.transferReason}
        setTransferReason={s.setTransferReason}
        handleTransferToEmployee={s.handleTransferToEmployee}
      />

      <DemoEmployeeReturnRequestDialog
        open={s.showReturnRequestDialog}
        onOpenChange={s.setShowReturnRequestDialog}
        returnRequestAssignment={s.returnRequestAssignment}
        setShowReturnRequestDialog={s.setShowReturnRequestDialog}
        setReturnRequestAssignment={s.setReturnRequestAssignment}
        returnCondition={s.returnCondition}
        setReturnCondition={s.setReturnCondition}
        returnConditionDetail={s.returnConditionDetail}
        setReturnConditionDetail={s.setReturnConditionDetail}
        returnInstructionsRead={s.returnInstructionsRead}
        setReturnInstructionsRead={s.setReturnInstructionsRead}
        isDamagedCondition={s.isDamagedCondition}
        returnPhotoFile={s.returnPhotoFile}
        setReturnPhotoFile={s.setReturnPhotoFile}
        handleSubmitReturnRequest={s.handleSubmitReturnRequest}
        returnRequestSending={s.returnRequestSending}
        normalizeAssetTag={s.normalizeAssetTag}
      />
    </div>
  );
}
