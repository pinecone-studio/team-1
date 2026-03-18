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

type EmployeeOption = { id: string; name: string };

export type DemoEmployeeTransferDialogsProps = {
  showItTransferDialog: boolean;
  setShowItTransferDialog: (v: boolean) => void;
  transferToEmployeeId: string;
  setTransferToEmployeeId: (v: string) => void;
  otherEmployees: EmployeeOption[];
  handleTransferToIt: () => void;
  transferSending: boolean;
  showTransferDialog: boolean;
  setShowTransferDialog: (v: boolean) => void;
  transferReason: string;
  setTransferReason: (v: string) => void;
  handleTransferToEmployee: () => void;
};

export function DemoEmployeeTransferDialogs({
  showItTransferDialog,
  setShowItTransferDialog,
  transferToEmployeeId,
  setTransferToEmployeeId,
  otherEmployees,
  handleTransferToIt,
  transferSending,
  showTransferDialog,
  setShowTransferDialog,
  transferReason,
  setTransferReason,
  handleTransferToEmployee,
}: DemoEmployeeTransferDialogsProps) {
  return (
    <>
      <Dialog
        open={showItTransferDialog}
        onOpenChange={setShowItTransferDialog}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>IT ажилтан сонгох</DialogTitle>
            <DialogDescription>
              Хөрөнгийг ямар IT ажилтан руу шилжүүлэх вэ?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select
              value={transferToEmployeeId || undefined}
              onValueChange={setTransferToEmployeeId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="IT ажилтан сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {otherEmployees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowItTransferDialog(false)}
            >
              Цуцлах
            </Button>
            <Button
              onClick={handleTransferToIt}
              disabled={!transferToEmployeeId || transferSending}
            >
              {transferSending ? "Шилжүүлж байна..." : "Шилжүүлэх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Ажилтан руу шилжүүлэх</DialogTitle>
            <DialogDescription>
              Сонгосон ажилтан таны хөрөнгийг &quot;Шинэ хүсэлт&quot; дээрээ
              хүлээн авах/татгалзах хүртэл pending байна.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">
                Хүлээн авах ажилтан
              </label>
              <Select
                value={transferToEmployeeId || undefined}
                onValueChange={setTransferToEmployeeId}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Ажилтан сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  {otherEmployees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">
                Шалтгаан (заавал биш)
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Жишээ: алба солигдсон"
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowTransferDialog(false)}
            >
              Цуцлах
            </Button>
            <Button
              onClick={handleTransferToEmployee}
              disabled={!transferToEmployeeId || transferSending}
            >
              {transferSending ? "Шилжүүлж байна..." : "Шилжүүлэх"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
