"use client";

import React from "react";
import { Check, X, Bell } from "lucide-react"; // Шинэ icon-ууд

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
import { toast } from "sonner"; // Мэдэгдэл харуулахад

interface DemoEmployeeContentProps {
  title?: string;
}

export function DemoEmployeeContent({
  title = "Миний хөрөнгө",
}: DemoEmployeeContentProps) {
  // Хөрөнгө хүлээн авах функц
  const handleApprove = (assetId: string) => {
    toast.success(`${assetId} дугаартай хөрөнгийг хүлээн авлаа.`);
    // Энд backend mutation дуудна
  };

  // Татгалзах функц
  const handleReject = (assetId: string) => {
    toast.error(`${assetId} дугаартай хөрөнгөөс татгалзлаа.`);
    // Энд backend mutation дуудна
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      {/* 1. Header хэсэг - Мэдэгдлийн хэсэгтэй */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Танд ирсэн хөрөнгө болон хүсэлтүүд
          </p>
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

      {/* 2. Хүлээгдэж буй хүсэлтийн карт (Анхаарал татах хэсэг) */}
      <Card className="mt-6 border-amber-200 bg-amber-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-amber-800">
            <Bell className="h-4 w-4" /> Шинэ хөрөнгө хүлээн авах хүсэлт
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-white p-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                MacBook Pro 14" (M3 Max)
              </p>
              <p className="text-sm text-muted-foreground">
                ID: #ASSET-9921 | Огноо: 2026.03.14
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleApprove("ASSET-9921")}
                variant="outline"
                className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Check className="h-4 w-4" /> Хүлээн авах
              </Button>
              <Button
                onClick={() => handleReject("ASSET-9921")}
                variant="destructive"
              >
                <X className="h-4 w-4" /> Татгалзах
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Миний эзэмшиж буй хөрөнгийн жагсаалт */}
      <Card className="mt-6 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Миний эзэмшиж буй хөрөнгө
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-[120px]">Хөрөнгийн ID</TableHead>
                  <TableHead>Төрөл / Нэр</TableHead>
                  <TableHead>Хүлээн авсан</TableHead>
                  <TableHead>Төлөв</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border">
                  <TableCell className="font-medium text-foreground">
                    #DEV-202
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    Dell 27" Monitor
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    2025.12.01
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-full bg-emerald-100 text-emerald-700">
                      Баталгаажсан
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
