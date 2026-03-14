"use client";

import React from "react";
import { Check, ShieldCheck, History, Search, X } from "lucide-react"; // X icon нэмэв

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
import { toast } from "sonner";

export function DemoITContent({
  title = "IT Хяналтын самбар",
}: {
  title?: string;
}) {
  const handleFinalConfirm = (assetId: string) => {
    toast.success(`${assetId} хөрөнгийг амжилттай баталгаажууллаа.`);
  };

  const handleCancelRequest = (assetId: string) => {
    toast.error(`${assetId} хүсэлтийг цуцаллаа.`);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground italic">
            IT Administrator View
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" /> Түүх
        </Button>
      </div>

      {/* 1. Баталгаажуулах хүлээгдэж буй хэсэг */}
      <Card className="mt-6 border-blue-200 bg-blue-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-medium text-blue-800">
            <ShieldCheck className="h-5 w-5" /> Шинэ хүсэлтүүд
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between gap-4 rounded-lg border border-blue-100 bg-white p-4 sm:flex-row sm:items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                G
              </div>
              <div>
                <p className="font-semibold text-foreground italic">
                  MacBook Pro 14" (M3 Max)
                </p>
                <p className="text-xs text-muted-foreground">
                  Ажилтан: <span className="font-medium">Ганбаатар</span> | ID:
                  #ASSET-9921
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-600 border-amber-200"
              >
                Ажилтан зөвшөөрсөн
              </Badge>

              {/* Батлах товч */}
              <Button
                onClick={() => handleFinalConfirm("ASSET-9921")}
                className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
                size="sm"
              >
                <Check className="h-4 w-4" /> Батлах
              </Button>

              {/* Цуцлах товч - БАТЛАХЫН АРД */}
              <Button
                onClick={() => handleCancelRequest("ASSET-9921")}
                variant="outline"
                className="gap-2 border-rose-600 text-rose-600 hover:bg-rose-50"
                size="sm"
              >
                <X className="h-4 w-4" /> Цуцлах
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Жагсаалтын хэсэг */}
      <Card className="mt-6 border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            Системийн бүртгэл
          </CardTitle>
          <div className="relative w-48">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Хайх..."
              className="w-full rounded-md border border-input bg-transparent pl-8 py-1.5 text-xs outline-none"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Хөрөнгө</TableHead>
                <TableHead>Эзэмшигч</TableHead>
                <TableHead>Төлөв</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium italic">
                  Dell 27" Monitor
                </TableCell>
                <TableCell>Дорж П.</TableCell>
                <TableCell>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                    Confirmed
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
