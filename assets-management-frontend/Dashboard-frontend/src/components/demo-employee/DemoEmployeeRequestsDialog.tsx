"use client";

import React from "react";
import { Bell, Check, Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClipboardCheck } from "lucide-react";
import type { AssignmentItem } from "./demo-employee-utils";

export type DemoEmployeeRequestsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingList: unknown[];
  currentEmployeeId: string | null;
  currentPending: unknown;
  isChecked: boolean;
  setIsChecked: (v: boolean) => void;
  setSignAssignment: (a: AssignmentItem | null) => void;
  setSignatureData: (v: string | null) => void;
  setSignatureFileUrl: (v: string | null) => void;
  setIsSignModalOpen: (v: boolean) => void;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
  updatingStatus: boolean;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeRequestsDialog({
  open,
  onOpenChange,
  pendingList,
  currentEmployeeId,
  currentPending,
  isChecked,
  setSignAssignment,
  setSignatureData,
  setSignatureFileUrl,
  setIsSignModalOpen,
  handleApprove,
  handleReject,
  updatingStatus,
  normalizeAssetTag,
}: DemoEmployeeRequestsDialogProps) {
  const openSignModal = (a: AssignmentItem) => {
    setSignAssignment(a);
    setSignatureData(null);
    setSignatureFileUrl(null);
    setIsSignModalOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-medium text-amber-800">
            <Bell className="h-4 w-4" /> Шинэ хүсэлт ({pendingList.length})
          </DialogTitle>
          <DialogDescription>
            Таны руу шилжүүлсэн бүх хөрөнгийн хүсэлт. Хүсэлт бүр дээр нөхцөл
            шалгаж, хүлээн авах эсвэл татгалзах боломжтой.
          </DialogDescription>
        </DialogHeader>
        {pendingList.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            {currentEmployeeId
              ? "Танд одоогоор шинэ хүсэлт байхгүй байна."
              : "Ажилтны мэдээлэл ачаалж байна..."}
          </p>
        ) : (
          <div className="space-y-3 mt-2">
            {(pendingList as AssignmentItem[]).map((pending) => {
              const a = pending;
              const requestedByName = a.requestedBy
                ? [a.requestedBy.firstName, a.requestedBy.lastName]
                    .filter(Boolean)
                    .join(" ") || "Admin"
                : "Admin";
              const isCurrent = currentPending && (currentPending as { id: string }).id === a.id;
              return (
                <div
                  key={a.id}
                  className="flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-lg text-foreground">
                      {normalizeAssetTag(a.asset?.assetTag)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Serial: {a.asset?.serialNumber || "N/A"} | Олгосон:{" "}
                      {new Date(a.assignedAt).toLocaleDateString()}
                      {requestedByName && (
                        <> | Хэн явуулсан: {requestedByName}</>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {!isCurrent ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openSignModal(a)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" /> Нөхцөл шалгах
                      </Button>
                    ) : !isChecked ? (
                      <Button
                        onClick={() => openSignModal(a)}
                        className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                      >
                        <Eye className="h-4 w-4" /> Нөхцөл шалгах
                      </Button>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 py-2 px-3 gap-1">
                        <ClipboardCheck className="h-4 w-4" /> Шалгасан
                      </Badge>
                    )}

                    <Button
                      onClick={() => handleApprove(a.id)}
                      variant="outline"
                      disabled={!isChecked || updatingStatus}
                      className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
                    >
                      <Check className="h-4 w-4" /> Хүлээн авах
                    </Button>
                    <Button
                      onClick={() => handleReject(a.id)}
                      variant="destructive"
                      disabled={updatingStatus}
                      className="disabled:opacity-30"
                    >
                      <X className="h-4 w-4" /> Татгалзах
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
