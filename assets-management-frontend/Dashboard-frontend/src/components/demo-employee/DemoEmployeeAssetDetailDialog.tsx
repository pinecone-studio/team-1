"use client";

import React from "react";
import { Send, Trash2, UserPlus, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AssignmentItem } from "./demo-employee-utils";

export type DemoEmployeeAssetDetailDialogProps = {
  selectedAssignment: AssignmentItem | null;
  setSelectedAssignment: (a: AssignmentItem | null) => void;
  disposalReason: string;
  setDisposalReason: (v: string) => void;
  setShowTransferDialog: (v: boolean) => void;
  setShowItTransferDialog: (v: boolean) => void;
  setTransferToEmployeeId: (v: string) => void;
  handleRequestDisposal: () => void;
  disposalSending: boolean;
  setTransferReason: (v: string) => void;
  transferSending: boolean;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeAssetDetailDialog({
  selectedAssignment,
  setSelectedAssignment,
  disposalReason,
  setDisposalReason,
  setShowTransferDialog,
  setShowItTransferDialog,
  setTransferToEmployeeId,
  handleRequestDisposal,
  disposalSending,
  setTransferReason,
  transferSending,
  normalizeAssetTag,
}: DemoEmployeeAssetDetailDialogProps) {
  const open = !!selectedAssignment;

  const onClose = () => {
    setSelectedAssignment(null);
    setDisposalReason("");
    setShowTransferDialog(false);
    setShowItTransferDialog(false);
    setTransferToEmployeeId("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Хөрөнгийн дэлгэрэнгүй</DialogTitle>
          <DialogDescription>
            {normalizeAssetTag(selectedAssignment?.asset?.assetTag)} —
            эзэмшиж буй хөрөнгийн мэдээлэл. Устгах хүсэлт илгээх бол IT хэсэгт
            харагдана.
          </DialogDescription>
        </DialogHeader>
        {selectedAssignment?.asset && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-muted-foreground">Нэр:</div>
              <div className="font-medium">
                {normalizeAssetTag(selectedAssignment.asset.assetTag)}
              </div>
              <div className="text-muted-foreground">Serial:</div>
              <div className="font-medium">
                {selectedAssignment.asset.serialNumber || "—"}
              </div>
              <div className="text-muted-foreground">Ангилал:</div>
              <div className="font-medium">
                {selectedAssignment.asset.category || "—"}
              </div>
              <div className="text-muted-foreground">Олгосон огноо:</div>
              <div className="font-medium">
                {new Date(selectedAssignment.assignedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Устгах шалтгаан (заавал биш)
              </label>
              <textarea
                className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Жишээ: эвдрэлтэй, ашиглахаа больсон..."
                value={disposalReason}
                onChange={(e) => setDisposalReason(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 border-t pt-4 mt-4">
          <p className="text-xs font-medium text-muted-foreground">
            Үйлдлүүд
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setTransferToEmployeeId("");
                setShowItTransferDialog(true);
              }}
              disabled={transferSending}
            >
              <Send className="h-3.5 w-3.5" /> IT ажилтан руу явуулах
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleRequestDisposal}
              disabled={disposalSending}
              title="Устгах хүсэлт илгээснээр эхлээд IT, дараа нь санхүү баталгаажуулна"
            >
              <UserPlus className="h-3.5 w-3.5" /> Санхүү рүү явуулах (устгах
              хүсэлт)
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setTransferToEmployeeId("");
                setTransferReason("");
                setShowTransferDialog(true);
              }}
              disabled={transferSending}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" /> Ажилтан руу шилжүүлэх
            </Button>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedAssignment(null);
              setDisposalReason("");
            }}
          >
            Хаах
          </Button>
          <Button
            className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleRequestDisposal}
            disabled={disposalSending}
          >
            <Trash2 className="h-4 w-4" /> Устгах хүсэлт илгээх (Demo IT руу)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
