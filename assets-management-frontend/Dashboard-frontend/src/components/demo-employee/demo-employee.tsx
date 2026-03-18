"use client";

import React from "react";
import { useDemoEmployee } from "./useDemoEmployee";
import { DemoEmployeeHeader } from "./DemoEmployeeHeader";
import { DemoEmployeeOffboardingModal } from "./DemoEmployeeOffboardingModal";
import { DemoEmployeePendingTransferCard } from "./DemoEmployeePendingTransferCard";
import { DemoEmployeeOffboardingCard } from "./DemoEmployeeOffboardingCard";
import { DemoEmployeeNotificationsCard } from "./DemoEmployeeNotificationsCard";
import { DemoEmployeeRequestsDialog } from "./DemoEmployeeRequestsDialog";
import { DemoEmployeeMyAssetsCard } from "./DemoEmployeeMyAssetsCard";
import { DemoEmployeeSignModal } from "./DemoEmployeeSignModal";
import { DemoEmployeeAssetDetailDialog } from "./DemoEmployeeAssetDetailDialog";
import { DemoEmployeeTransferDialogs } from "./DemoEmployeeTransferDialogs";
import { DemoEmployeeReturnRequestDialog } from "./DemoEmployeeReturnRequestDialog";
import { DEMO_EMPLOYEE_EMAIL } from "./demo-employee-utils";

export function DemoEmployeeContent({
  title = "Миний хөрөнгө",
}: {
  title?: string;
}) {
  const s = useDemoEmployee();

  return (
    <div className="flex flex-col p-6 overflow-visible">
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
        activeOffboarding={s.activeOffboarding}
        offboardingStarting={s.offboardingStarting}
        onShowOffboardingModal={() => s.setShowOffboardingModal(true)}
        pendingListLength={s.pendingList.length}
        onShowRequestsDialog={() => s.setShowRequestsDialog(true)}
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

      <DemoEmployeeAssetDetailDialog
        selectedAssignment={s.selectedAssignment}
        setSelectedAssignment={s.setSelectedAssignment}
        disposalReason={s.disposalReason}
        setDisposalReason={s.setDisposalReason}
        setShowTransferDialog={s.setShowTransferDialog}
        setShowItTransferDialog={s.setShowItTransferDialog}
        setTransferToEmployeeId={s.setTransferToEmployeeId}
        handleRequestDisposal={s.handleRequestDisposal}
        disposalSending={s.disposalSending}
        setTransferReason={s.setTransferReason}
        transferSending={s.transferSending}
        normalizeAssetTag={s.normalizeAssetTag}
      />

      <DemoEmployeeTransferDialogs
        showItTransferDialog={s.showItTransferDialog}
        setShowItTransferDialog={s.setShowItTransferDialog}
        transferToEmployeeId={s.transferToEmployeeId}
        setTransferToEmployeeId={s.setTransferToEmployeeId}
        otherEmployees={s.otherEmployees}
        handleTransferToIt={s.handleTransferToIt}
        transferSending={s.transferSending}
        showTransferDialog={s.showTransferDialog}
        setShowTransferDialog={s.setShowTransferDialog}
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
