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
  otherEmployees: EmployeeOption[];
  handleTransferToIt: (
    kind: "DATA_WIPE" | "REPAIR",
    opts?: { description?: string },
  ) => void;
  transferSending: boolean;
  showTransferDialog: boolean;
  setShowTransferDialog: (v: boolean) => void;
  transferToEmployeeId: string;
  setTransferToEmployeeId: (v: string) => void;
  transferReason: string;
  setTransferReason: (v: string) => void;
  handleTransferToEmployee: () => void;
};

export function DemoEmployeeTransferDialogs({
  showItTransferDialog,
  setShowItTransferDialog,
  otherEmployees,
  handleTransferToIt,
  transferSending,
  showTransferDialog,
  setShowTransferDialog,
  transferToEmployeeId,
  setTransferToEmployeeId,
  transferReason,
  setTransferReason,
  handleTransferToEmployee,
}: DemoEmployeeTransferDialogsProps) {
  const [repairDescription, setRepairDescription] = React.useState("");

  return (
    <>
      <Dialog
        open={showItTransferDialog}
        onOpenChange={setShowItTransferDialog}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>IT хүсэлт үүсгэх</DialogTitle>
            <DialogDescription>
              Ямар төрлийн хүсэлт илгээх вэ?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-2">
            <label className="text-sm font-medium">
              Засварын тайлбар (засвар сонговол заавал)
            </label>
            <textarea
              className="w-full min-h-[88px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              placeholder="Жишээ: дэлгэц асахгүй байна"
              value={repairDescription}
              onChange={(e) => setRepairDescription(e.target.value)}
              disabled={transferSending}
            />
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setShowItTransferDialog(false);
                setRepairDescription("");
              }}
            >
              Цуцлах
            </Button>
            <Button
              variant="outline"
              onClick={() => handleTransferToIt("DATA_WIPE")}
              disabled={transferSending}
            >
              {transferSending ? "Илгээж байна..." : "Data wipe"}
            </Button>
            <Button
              onClick={() =>
                handleTransferToIt("REPAIR", { description: repairDescription })
              }
              disabled={transferSending || repairDescription.trim().length === 0}
            >
              {transferSending ? "Илгээж байна..." : "Засвар"}
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
