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
import { GetEmployeeAssignmentsDocument } from "@/gql/graphql";
import { useQuery } from "@apollo/client";

export function DemoEmployeeContent({
  title = "Миний хөрөнгө",
}: {
  title?: string;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Жишээ ID - Нэвтэрсэн хэрэглэгчийн ID-аар солино
  const currentEmployeeId = "f2b2c3d4-e5f6-7890-1234-567890abcdef";

  // 1. Pending Query - Нийт хүлээгдэж буй хүсэлтүүд
  const {
    data: pendingData,
    loading: pendingLoading,
    refetch: refetchPending,
  } = useQuery(GetEmployeeAssignmentsDocument, {
    variables: { employeeId: currentEmployeeId, status: "PENDING" },
    skip: !currentEmployeeId,
    fetchPolicy: "network-only",
  });

  // 2. Active Query - Миний эзэмшиж буй хөрөнгө
  const {
    data: activeData,
    loading: activeLoading,
    refetch: refetchActive,
  } = useQuery(GetEmployeeAssignmentsDocument, {
    variables: { employeeId: currentEmployeeId, status: "ACTIVE" },
    skip: !currentEmployeeId,
  });

  // Өгөгдлийн боловсруулалт
  const pendingList = pendingData?.employeeAssignments ?? [];
  const currentPending = pendingList[0] ?? null; // Жагсаалтын хамгийн эхнийх
  const activeAssignments = activeData?.employeeAssignments ?? [];

  // Үйлдэл бүрийн дараа дараагийн хүсэлт рүү шилжих логик
  const handleActionComplete = async () => {
    setIsChecked(false); // Дараагийн хөрөнгөнд зориулж "Шалгасан" төлөвийг reset хийнэ
    await refetchPending();
    await refetchActive();
  };

  const handleApprove = async (id: string) => {
    // Энд Mutation дуудаж баазад ACTIVE болгоно
    toast.success(
      "Хөрөнгийг хүлээн авлаа. Дараагийн хүсэлт рүү шилжиж байна...",
    );
    await handleActionComplete();
  };

  const handleReject = async (id: string) => {
    // Энд Mutation дуудаж баазад REJECTED болгоно
    toast.error("Хөрөнгөөс татгалзлаа.");
    await handleActionComplete();
  };

  const handleVerify = () => {
    setIsChecked(true);
    setIsDialogOpen(false);
    toast.info("Нөхцөл шалгаж дууслаа. Одоо баталгаажуулах боломжтой.");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <div className="relative">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            {pendingList.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white font-bold">
                {pendingList.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* 2. Шинэ хүсэлт (1-ээр гарч ирэх логик) */}
      {currentPending ? (
        <Card className="mt-6 border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-amber-800">
              <Bell className="h-4 w-4" /> Шинэ хүсэлт ({pendingList.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm">
              <div className="space-y-1">
                <p className="font-bold text-lg text-foreground">
                  {currentPending.asset?.assetTag}
                </p>
                <p className="text-sm text-muted-foreground">
                  Serial: {currentPending.asset?.serialNumber || "N/A"} |
                  Олгосон:{" "}
                  {new Date(currentPending.assignedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
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

                <Button
                  onClick={() => handleApprove(currentPending.id)}
                  variant="outline"
                  disabled={!isChecked}
                  className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
                >
                  <Check className="h-4 w-4" /> Хүлээн авах
                </Button>
                <Button
                  onClick={() => handleReject(currentPending.id)}
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
      ) : (
        !pendingLoading && (
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-muted-foreground bg-muted/20">
            Танд одоогоор шинэ хүсэлт байхгүй байна.
          </div>
        )
      )}

      {/* 3. Миний эзэмшиж буй хөрөнгө */}
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
                <TableHead>Serial Number</TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead>Төлөв</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeAssignments.length > 0 ? (
                activeAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-mono text-xs">
                      {assignment.asset?.serialNumber || "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {assignment.asset?.assetTag}
                    </TableCell>
                    <TableCell>
                      {new Date(assignment.assignedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-700 border-emerald-100"
                      >
                        Идэвхтэй
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {activeLoading
                      ? "Ачаалж байна..."
                      : "Бүртгэлтэй хөрөнгө байхгүй."}
                  </TableCell>
                </TableRow>
              )}
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
              {currentPending?.asset?.assetTag} хөрөнгийг хүлээн авахын өмнө
              шалгана уу.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-muted-foreground">Марк/Модель:</div>
              <div className="font-medium">
                {currentPending?.asset?.assetTag}
              </div>
              <div className="text-muted-foreground">Serial No:</div>
              <div className="font-medium">
                {currentPending?.asset?.serialNumber || "N/A"}
              </div>
              <div className="text-muted-foreground">Төлөв:</div>
              <div className="font-medium text-emerald-600">New / Good</div>
            </div>
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700 border border-amber-100">
              * Та "Шалгасан" товчийг дарснаар хөрөнгийн бүрэн бүтэн байдлыг
              баталгаажуулж байгааг анхаарна уу.
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Болих
            </Button>
            <Button
              className="bg-primary text-primary-foreground"
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
