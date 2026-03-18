"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { normalizeAssetTag, type AssignmentItem } from "./demo-employee-utils";

export type DemoEmployeeOffboardingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeAssignments: unknown[];
  onStartOffboarding: () => void;
  offboardingStarting: boolean;
};

export function DemoEmployeeOffboardingModal({
  open,
  onOpenChange,
  activeAssignments,
  onStartOffboarding,
  offboardingStarting,
}: DemoEmployeeOffboardingModalProps) {
  const list = activeAssignments as AssignmentItem[];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Ажилаас гарах (Offboarding)</DialogTitle>
          <DialogDescription>
            Эзэмшиж буй хөрөнгө болон төлбөрийн үлдэгдлийг шалгана уу. Гарахыг
            баталгаажуулбал offboarding эхэлнэ.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {list.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Таны нэр дээр идэвхтэй хөрөнгө байхгүй байна.
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Хөрөнгө</TableHead>
                    <TableHead>Сериал</TableHead>
                    <TableHead>Огноо</TableHead>
                    <TableHead>Төлбөрийн үлдэгдэл</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((assignment) => {
                    const a = assignment as AssignmentItem;
                    const fin = a.financing;
                    const hasBalance =
                      fin &&
                      (Number(fin.totalPayment) > 0 ||
                        Number(fin.assignedValue) > 0);
                    const balanceText = hasBalance
                      ? `${(fin.totalPayment ?? fin.assignedValue ?? 0).toLocaleString()} ₮`
                      : "Үлдэгдэл байхгүй";
                    return (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">
                          {normalizeAssetTag(a.asset?.assetTag ?? a.assetId)}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {a.asset?.serialNumber ?? "—"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(a.assignedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell
                          className={
                            hasBalance
                              ? "font-medium text-amber-700"
                              : "text-muted-foreground"
                          }
                        >
                          {balanceText}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Цуцлах
          </Button>
          <Button
            onClick={onStartOffboarding}
            disabled={offboardingStarting}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Гарах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
