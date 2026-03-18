"use client";

import React from "react";
import { Check, Eye, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AssignmentItem } from "./demo-employee-utils";

export type DemoEmployeeIncomingRequestsCardProps = {
  pendingList: AssignmentItem[];
  currentPending: AssignmentItem | null;
  isChecked: boolean;
  onConditionCheck: (a: AssignmentItem) => void;
  onOpenAsset: (assetId: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  updatingStatus: boolean;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeIncomingRequestsCard({
  pendingList,
  currentPending,
  isChecked,
  onConditionCheck,
  onOpenAsset,
  onApprove,
  onReject,
  updatingStatus,
  normalizeAssetTag,
}: DemoEmployeeIncomingRequestsCardProps) {
  return (
    <Card className="border border-border/60 bg-white mt-10">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Танд ирсэн хүсэлтүүд
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow className="border-0 bg-[#f3f3f3] hover:bg-[#f3f3f3]">
                <TableHead className="h-11 px-3 text-xs font-semibold text-[#111111] md:px-4">
                  №
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-[#111111] md:px-4">
                  Хөрөнгийн нэр
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-[#111111] md:px-4">
                  Серийн дугаар
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-[#111111] md:px-4">
                  Илгээсэн
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-[#111111] md:px-4">
                  Шилжүүлгийн төрөл
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-[#111111] md:px-4">
                  Баталгаажуулах
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-0">
              {pendingList.length === 0 ? (
                <TableRow className="bg-white hover:bg-white">
                  <TableCell
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    Одоогоор танд ирсэн хүсэлт байхгүй байна.
                  </TableCell>
                </TableRow>
              ) : (
                pendingList.map((a, index) => {
                  const requestedByName = a.requestedBy
                    ? [a.requestedBy.firstName, a.requestedBy.lastName]
                        .filter(Boolean)
                        .join(" ") || "Админ хэрэглэгч"
                    : "Админ хэрэглэгч";
                  const isCurrent = currentPending?.id === a.id;

                  return (
                    <TableRow
                      key={a.id}
                      className={[
                        "border-b border-border/60",
                        index % 2 === 0 ? "bg-white" : "bg-[#fafafa]",
                      ].join(" ")}
                    >
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm font-medium text-foreground md:px-4">
                        <button
                          type="button"
                          className="text-left hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAsset(a.assetId);
                          }}
                          title="Хөрөнгийн дэлгэрэнгүй"
                        >
                          {normalizeAssetTag(a.asset?.assetTag) || "—"}
                        </button>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {a.asset?.serialNumber || "—"}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {requestedByName}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        Хөрөнгө шилжүүлэх
                      </TableCell>
                      <TableCell className="px-3 py-2 md:px-4">
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className={[
                              "h-8 gap-2 rounded-md",
                              isCurrent && !isChecked
                                ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                            ].join(" ")}
                            onClick={() => onConditionCheck(a)}
                          >
                            <Eye className="h-4 w-4" />
                            Нөхцөл шалгах
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 rounded-md border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-40"
                            onClick={() => onApprove(a.id)}
                            disabled={!isCurrent || !isChecked || updatingStatus}
                          >
                            <Check className="h-4 w-4" />
                            Хүлээн авах
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 rounded-md border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-40"
                            onClick={() => onReject(a.id)}
                            disabled={!isCurrent || updatingStatus}
                          >
                            <X className="h-4 w-4" />
                            Татгалзах
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

