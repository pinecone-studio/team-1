"use client";

import React, { useState } from "react";
import { Check, X, Bell, Eye, ClipboardCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function DemoEmployeeContent({
  title = "Миний хөрөнгө",
}: {
  title?: string;
}) {
  // Шалгасан эсэхийг хянах state
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApprove = (assetId: string) => {
    toast.success(
      `${assetId} хөрөнгийг хүлээн авлаа. PDF гэрээ үүсэж байна...`,
    );
  };

  const handleReject = (assetId: string) => {
    toast.error(`${assetId} хөрөнгөөс татгалзлаа.`);
  };

  const handleVerify = () => {
    setIsChecked(true);
    setIsDialogOpen(false);
    toast.info(
      "Хөрөнгийн нөхцөлийг шалгаж дууслаа. Одоо баталгаажуулах боломжтой.",
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {/* <p className="text-sm text-muted-foreground">
            Танд ирсэн хөрөнгө болон хүсэлтүүд
          </p> */}
        </div>
        <div className="relative">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
              1
            </span>
          </Button>
        </div>
      </div>

      {/* 2. Pending Request Card */}
      <Card className="mt-6 border-amber-200 bg-amber-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-amber-800">
            <Bell className="h-4 w-4" /> Шинэ хөрөнгө хүлээн авах хүсэлт
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm">
            <div className="space-y-1">
              <p className="font-semibold text-foreground italic">
                MacBook Pro 14" (M3 Max)
              </p>
              <p className="text-sm text-muted-foreground">
                ID: #ASSET-9921 | 2026.03.14
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Нөхцөл шалгах товч */}
              {!isChecked ? (
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Eye className="h-4 w-4" /> Нөхцөл шалгах
                </Button>
              ) : (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 py-2 px-3 gap-1">
                  <ClipboardCheck className="h-4 w-4" /> Шалгасан
                </Badge>
              )}

              {/* Зөвшөөрөх, Татгалзах - isChecked үнэн үед л идэвхжнэ */}
              <Button
                onClick={() => handleApprove("ASSET-9921")}
                variant="outline"
                disabled={!isChecked}
                className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
              >
                <Check className="h-4 w-4" /> Хүлээн авах
              </Button>
              <Button
                onClick={() => handleReject("ASSET-9921")}
                variant="destructive"
                disabled={!isChecked}
                className="disabled:opacity-30"
              >
                <X className="h-4 w-4" /> Татгалзах
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. My Assets Table (Хэвээрээ) */}
      <Card className="mt-6 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Миний эзэмшиж буй хөрөнгө
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Хөрөнгийн ID</TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead>Төлөв</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#DEV-202</TableCell>
                <TableCell>Dell 27" Monitor</TableCell>
                <TableCell>
                  <Badge variant="secondary">Баталгаажсан</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 4. Нөхцөл шалгах Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Хөрөнгийн нөхцөл шалгах</DialogTitle>
            <DialogDescription>
              #ASSET-9921 дугаартай хөрөнгийн одоогийн байдал
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-muted-foreground">Төхөөрөмжийн төлөв:</div>
              <div className="font-medium text-emerald-600">Шинэ (New)</div>
              <div className="text-muted-foreground">Дагалдах хэрэгсэл:</div>
              <div className="font-medium">Цэнэглэгч, Хайрцаг, Mouse</div>
              <div className="text-muted-foreground">Тэмдэглэл:</div>
              <div className="font-medium">
                Дэлгэц дээр хамгаалалтын наалттай.
              </div>
            </div>
            <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
              * Та "Шалгасан" товчийг дарснаар хөрөнгийн физик нөхцөлийг хүлээн
              зөвшөөрч байгааг анхаарна уу.
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Болих
            </Button>
            <Button
              className="bg-foreground text-background"
              onClick={handleVerify}
            >
              Шалгасан
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
