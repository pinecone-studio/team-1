"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AssignmentItem } from "./demo-employee-utils";

export type DemoEmployeeReturnRequestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnRequestAssignment: AssignmentItem | null;
  setShowReturnRequestDialog: (v: boolean) => void;
  setReturnRequestAssignment: (a: AssignmentItem | null) => void;
  returnCondition: string;
  setReturnCondition: (v: string) => void;
  returnConditionDetail: string;
  setReturnConditionDetail: (v: string) => void;
  returnInstructionsRead: boolean;
  setReturnInstructionsRead: (v: boolean) => void;
  isDamagedCondition: boolean;
  returnPhotoFile: File | null;
  setReturnPhotoFile: (f: File | null) => void;
  handleSubmitReturnRequest: () => void;
  returnRequestSending: boolean;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeReturnRequestDialog({
  open,
  onOpenChange,
  returnRequestAssignment,
  setShowReturnRequestDialog,
  setReturnRequestAssignment,
  returnCondition,
  setReturnCondition,
  returnConditionDetail,
  setReturnConditionDetail,
  returnInstructionsRead,
  setReturnInstructionsRead,
  isDamagedCondition,
  returnPhotoFile,
  setReturnPhotoFile,
  handleSubmitReturnRequest,
  returnRequestSending,
  normalizeAssetTag,
}: DemoEmployeeReturnRequestDialogProps) {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setShowReturnRequestDialog(false);
      setReturnRequestAssignment(null);
      setReturnCondition("GOOD");
      setReturnConditionDetail("");
      setReturnInstructionsRead(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Буцааж өгөх хүсэлт гаргах</DialogTitle>
          <DialogDescription>
            {normalizeAssetTag(returnRequestAssignment?.asset?.assetTag) ??
              "Хөрөнгө"}{" "}
            — зааврыг уншиж, нөхцөлөө сонгоно уу.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-sm text-amber-900">
            <p className="font-medium mb-2">Буцаах заавар</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Хөрөнгийг цэвэр, бүрэн бүтэн буцаана.</li>
              <li>Гэмтэл, дутуу байвал нөхцөл болон зургийг оруулна.</li>
            </ul>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={returnInstructionsRead}
              onChange={(e) => setReturnInstructionsRead(e.target.checked)}
              className="rounded border-amber-600"
            />
            <span className="text-sm">
              Би буцаах зааврыг уншсан, дагаж байна.
            </span>
          </label>
          <div>
            <label className="text-sm font-medium">
              Нөхцөл (condition) — заавал
            </label>
            <Select
              value={returnCondition}
              onValueChange={(v) => {
                setReturnCondition(v);
                if (!["DAMAGED", "NON_FUNCTIONAL", "LOST"].includes(v))
                  setReturnPhotoFile(null);
              }}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Нөхцөл сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GOOD">GOOD — Сайн</SelectItem>
                <SelectItem value="FAIR">FAIR — Дунд</SelectItem>
                <SelectItem value="DAMAGED">DAMAGED — Эвдрэлтэй</SelectItem>
                <SelectItem value="NON_FUNCTIONAL">
                  NON_FUNCTIONAL — Ажиллахгүй
                </SelectItem>
                <SelectItem value="LOST">LOST — Алдагдсан</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">
              Нөхцөлийн дэлгэрэнгүй (заавал биш)
            </label>
            <textarea
              className="mt-1 w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              placeholder="Нөхцөлөө товч тайлбарлана уу. HR шалгахад тусална."
              value={returnConditionDetail}
              onChange={(e) => setReturnConditionDetail(e.target.value)}
            />
          </div>
          {isDamagedCondition && (
            <div>
              <label className="text-sm font-medium">
                Зураг оруулах (заавал биш)
              </label>
              <p className="text-muted-foreground text-xs mt-0.5 mb-1">
                Эвдрэлтэй бол гэмтлийн зураг оруулбал HR/IT шалгахад тусална.
              </p>
              <input
                type="file"
                accept="image/*"
                className="mt-1 w-full text-sm file:mr-2 file:rounded-md file:border-0 file:bg-amber-100 file:px-3 file:py-1.5 file:text-amber-800"
                onChange={(e) =>
                  setReturnPhotoFile(e.target.files?.[0] ?? null)
                }
              />
              {returnPhotoFile && (
                <p className="text-muted-foreground text-xs mt-1">
                  {returnPhotoFile.name} сонгогдсон.
                </p>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => handleOpenChange(false)}
          >
            Цуцлах
          </Button>
          <Button
            onClick={handleSubmitReturnRequest}
            disabled={
              !returnInstructionsRead ||
              !returnCondition.trim() ||
              returnRequestSending
            }
            className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
          >
            {returnRequestSending
              ? "Илгээж байна..."
              : "Буцааж өгөх хүсэлт илгээх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
