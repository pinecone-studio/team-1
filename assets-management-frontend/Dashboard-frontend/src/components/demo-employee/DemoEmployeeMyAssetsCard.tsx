"use client";

import React from "react";
import { toast } from "sonner";
import { ArrowRightLeft, Send, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AssignmentItem } from "./demo-employee-utils";

type AssignmentRow = AssignmentItem & { status?: string };

export type DemoEmployeeMyAssetsCardProps = {
  myAssetsList: AssignmentRow[];
  activeLoading: boolean;
  pendingLoading: boolean;
  setSelectedAssignment: (a: AssignmentItem | null) => void;
  selectedAssignment: AssignmentItem | null;
  onOpenAsset: (assetId: string) => void;
  onSendToIt: () => void;
  onSendToFinanceDisposal: () => void;
  onTransferToEmployee: () => void;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeMyAssetsCard({
  myAssetsList,
  activeLoading,
  pendingLoading,
  setSelectedAssignment,
  selectedAssignment,
  onOpenAsset,
  onSendToIt,
  onSendToFinanceDisposal,
  onTransferToEmployee,
  normalizeAssetTag,
}: DemoEmployeeMyAssetsCardProps) {
  const requireSelected = (action: () => void) => {
    if (!selectedAssignment) {
      toast.error("Эхлээд хөрөнгө сонгоно уу.");
      return;
    }
    action();
  };

  const statusLabel = (assetStatus?: string, assignmentStatus?: string) => {
    const s = (assetStatus ?? "").toUpperCase();
    if (s === "PENDING_DISPOSAL")
      return { text: "Устгах хүлээгдэж буй", tone: "amber" as const };
    if (s === "DISPOSED") return { text: "Устгасан", tone: "slate" as const };
    if ((assignmentStatus ?? "").toUpperCase() !== "ACTIVE")
      return { text: "Хүлээгдэж буй", tone: "amber" as const };
    return { text: "Эзэмшигчтэй", tone: "emerald" as const };
  };

  return (
    <Card className="border border-border/60 bg-white mt-10">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-semibold text-foreground">
            Миний хөрөнгүүд
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-[32px] w-fit py-4"
              onClick={() => requireSelected(onSendToIt)}
            >
              <Send className="h-4 w-4" /> IT ажилтан руу явуулах
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-[32px] w-fit py-4"
              onClick={() => requireSelected(onSendToFinanceDisposal)}
            >
              <UserPlus className="h-4 w-4" /> Санхүү руу явуулах (устгах
              хүсэлт)
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-[32px] w-fit py-4"
              onClick={() => requireSelected(onTransferToEmployee)}
            >
              <ArrowRightLeft className="h-4 w-4" /> Ажилтан руу шилжүүлэх
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow className="border-0 bg-[#0f4c6e] hover:bg-[#0b6fae]">
                <TableHead className="h-11 w-[44px] px-3 text-xs font-semibold text-white md:px-4">
                  <input
                    type="checkbox"
                    aria-label="Бүгдийг сонгох"
                    className="h-4 w-4 rounded border-white/70 bg-white/5"
                    disabled
                  />
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  №
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Хөрөнгийн ID
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Серийн дугаар
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Төлөв
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Байршил
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Эзэмшигч
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Үнэ (₮)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-0">
              {myAssetsList.length > 0 ? (
                myAssetsList.map((assignment, index) => {
                  const assetAny = assignment.asset as any;
                  const selected = selectedAssignment?.id === assignment.id;
                  const st = statusLabel(assetAny?.status, assignment.status);

                  return (
                    <TableRow
                      key={assignment.id}
                      className={[
                        "border-b border-border/60 cursor-pointer",
                        index % 2 === 0 ? "bg-white" : "bg-[#fafafa]",
                      ].join(" ")}
                      onClick={() =>
                        setSelectedAssignment(assignment as AssignmentItem)
                      }
                    >
                      <TableCell className="px-3 py-3 md:px-4">
                        <input
                          type="checkbox"
                          aria-label="Сонгох"
                          className="h-4 w-4 rounded border-border"
                          checked={selected}
                          onChange={(e) => {
                            const next = e.target.checked;
                            if (!next) setSelectedAssignment(null);
                            else
                              setSelectedAssignment(
                                assignment as AssignmentItem,
                              );
                          }}
                        />
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm font-medium text-foreground md:px-4">
                        <button
                          type="button"
                          className="text-left hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAsset(assignment.assetId);
                          }}
                          title="Хөрөнгийн дэлгэрэнгүй"
                        >
                          {normalizeAssetTag(assignment.asset?.assetTag)}
                        </button>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {assignment.asset?.serialNumber || "—"}
                      </TableCell>
                      <TableCell className="px-3 py-3 md:px-4">
                        {st.tone === "amber" ? (
                          <Badge
                            variant="secondary"
                            className="border-amber-200 bg-amber-50 text-amber-700"
                          >
                            {st.text}
                          </Badge>
                        ) : st.tone === "slate" ? (
                          <Badge
                            variant="secondary"
                            className="border-slate-200 bg-slate-50 text-slate-700"
                          >
                            {st.text}
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="border-emerald-100 bg-emerald-50 text-emerald-700"
                          >
                            {st.text}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {assetAny?.locationPath ?? assetAny?.locationId ?? "—"}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {assetAny?.assignedEmployeeName ?? "—"}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {assetAny?.purchaseCost != null
                          ? new Intl.NumberFormat("mn-MN").format(
                              assetAny.purchaseCost,
                            )
                          : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="bg-white">
                  <TableCell
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-muted-foreground"
                  >
                    {activeLoading || pendingLoading
                      ? "Ачаалж байна..."
                      : "Бүртгэлтэй хөрөнгө байхгүй."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
