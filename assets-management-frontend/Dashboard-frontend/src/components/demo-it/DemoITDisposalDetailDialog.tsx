"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignaturePad from "@/app/esign/_components/SignaturePad";
import DocumentPreview from "@/app/esign/_components/DocumentPreview";
import type { DisposalItem } from "./demo-it-utils";

export type DemoITDisposalDetailDialogProps = {
  selectedDisposal: DisposalItem | null;
  onClose: () => void;
  setSelectedDisposal: (v: DisposalItem | null) => void;
  setSignatureData: (v: string | null) => void;
  setDataWipeConfirmed: (v: boolean) => void;
  setIsDisposalChecked: (v: boolean) => void;
  signatureData: string | null;
  signatureUploading: boolean;
  onSaveSignature: (dataUrl: string) => void;
  onClearSignature: () => void;
  onApproveWithPdf: () => Promise<void>;
  onReject: (id: string) => void;
  approving: boolean;
  rejecting: boolean;
  normalizeAssetTag: (value?: string | null) => string;
  uploadApprovalPdf: (item: DisposalItem) => Promise<boolean>;
};

export function DemoITDisposalDetailDialog({
  selectedDisposal,
  onClose,
  signatureData,
  signatureUploading,
  onSaveSignature,
  onClearSignature,
  onApproveWithPdf,
  onReject,
  approving,
  rejecting,
  normalizeAssetTag,
}: DemoITDisposalDetailDialogProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={!!selectedDisposal} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle>Устгах хүсэлт — баталгаажуулалт</DialogTitle>
          <DialogDescription>
            Эвдрэлтэй гэж баталгаажуулж, гарын үсэг зурна уу.
          </DialogDescription>
        </DialogHeader>
        {selectedDisposal && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 py-4">
            <div className="order-2 lg:order-1 flex justify-center">
              <DocumentPreview
                signatureData={signatureData}
                title="Data Wipe Out Confirmation"
                bodyText="IT ажилтан өгөгдөл сэргээх боломжгүй болсон гэдгийг баталгаажуулж байна. Энэхүү баримт нь дата бүрэн устсан болохыг нотлох зорилготой."
                waitingLabel="Гарын үсэг хүлээгдэж байна..."
                signedByLabel="Баталгаажуулсан"
                dateLabel="Огноо"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-4">
              <div className="rounded-xl border border-muted bg-muted/30 p-4">
                <h4 className="text-base font-semibold mb-3">
                  Хүсэлтийн мэдээлэл
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-muted-foreground">Хөрөнгө (нэр):</div>
                  <div className="font-medium">
                    {normalizeAssetTag(
                      selectedDisposal.asset?.assetTag ??
                        selectedDisposal.assetId,
                    )}
                  </div>
                  <div className="text-muted-foreground">Ангилал:</div>
                  <div className="font-medium">
                    {selectedDisposal.asset?.category ?? "—"}
                  </div>
                  <div className="text-muted-foreground">
                    Хэнээс ирсэн (ажилтан):
                  </div>
                  <div className="font-medium">
                    {selectedDisposal.requestedBy
                      ? [
                          selectedDisposal.requestedBy.firstName,
                          selectedDisposal.requestedBy.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ") || selectedDisposal.requestedBy.email
                      : "Admin"}
                  </div>
                  {selectedDisposal.requestedBy?.email && (
                    <>
                      <div className="text-muted-foreground">Имэйл:</div>
                      <div className="font-medium text-xs">
                        {selectedDisposal.requestedBy.email}
                      </div>
                    </>
                  )}
                  <div className="text-muted-foreground">Устгах арга:</div>
                  <div className="font-medium">{selectedDisposal.method}</div>
                  {selectedDisposal.reason && (
                    <>
                      <div className="text-muted-foreground">Шалтгаан:</div>
                      <div className="font-medium">
                        {selectedDisposal.reason}
                      </div>
                    </>
                  )}
                  <div className="text-muted-foreground">Төлөв:</div>
                  <div>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-600 border-amber-200"
                    >
                      {selectedDisposal.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">Илгээсэн огноо:</div>
                  <div className="font-medium">
                    {new Date(selectedDisposal.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <SignaturePad
                onSave={onSaveSignature}
                onClear={onClearSignature}
                title="Баталгаажуулах гарын үсэг"
                clearLabel="Арилгах"
                saveLabel={
                  signatureUploading
                    ? "PDF үүсгэж байна..."
                    : "Гарын үсэг хадгалах"
                }
              />
            </div>
          </div>
        )}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose}>
            Хаах
          </Button>
          {selectedDisposal && (
            <>
              <Button
                className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
                onClick={async () => {
                  await onApproveWithPdf();
                }}
                disabled={
                  !signatureData ||
                  signatureUploading ||
                  approving ||
                  rejecting
                }
              >
                <Check className="h-4 w-4" /> Батлах (IT)
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={async () => {
                  await onReject(selectedDisposal.id);
                  onClose();
                }}
                disabled={approving || rejecting}
              >
                <X className="h-4 w-4" /> Цуцлах
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
