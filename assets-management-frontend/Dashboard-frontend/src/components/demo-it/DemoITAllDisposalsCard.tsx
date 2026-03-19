"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DisposalItem } from "./demo-it-utils";
import { ShieldCheck } from "lucide-react";

export type DemoITAllDisposalsCardProps = {
  allDisposals: DisposalItem[];
  DISPOSAL_STATUS_LABELS: Record<string, string>;
  normalizeAssetTag: (value?: string | null) => string;
  onOpenAsset: (assetId: string) => void;
};

export function DemoITAllDisposalsCard({
  allDisposals,
  DISPOSAL_STATUS_LABELS,
  normalizeAssetTag,
  onOpenAsset,
}: DemoITAllDisposalsCardProps) {
  return (
    <Card className="border border-border/60 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <ShieldCheck className="h-5 w-5" /> Баталгаажсан хүсэлтүүд
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow className="border-0 bg-[#0f4c6e] hover:bg-[#0b6fae]">
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  №
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Хөрөнгийн нэр
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Хөрөнгийн ID
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Хэнээс
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Төрөл
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Ирсэн огноо
                </TableHead>
                <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                  Баталгаажуулсан
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-0">
              {allDisposals.length === 0 ? (
                <TableRow className="bg-white">
                  <TableCell
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    Баталгаажсан хүсэлт байхгүй байна.
                  </TableCell>
                </TableRow>
              ) : (
                allDisposals.map((req, index) => {
                  const r = req as DisposalItem;
                  const assetName = r.asset?.assetTag ?? r.assetId;
                  const requesterName = r.requestedBy
                    ? [r.requestedBy.firstName, r.requestedBy.lastName]
                        .filter(Boolean)
                        .join(" ") || r.requestedBy.email
                    : "—";
                  const statusLabel =
                    DISPOSAL_STATUS_LABELS[r.status] ?? r.status;

                  return (
                    <TableRow
                      key={r.id}
                      className={[
                        "border-b border-border/60",
                        index % 2 === 0 ? "bg-white" : "bg-[#fafafa]",
                      ].join(" ")}
                    >
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm font-medium text-foreground md:px-4">
                        {r.asset?.category ?? "—"}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        <button
                          type="button"
                          className="text-left hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAsset(r.assetId);
                          }}
                          title="Хөрөнгийн дэлгэрэнгүй"
                        >
                          {normalizeAssetTag(assetName)}
                        </button>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {requesterName}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        Хөрөнгө устгах
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-3 py-3 md:px-4">
                        <Badge
                          variant="outline"
                          className={
                            r.status === "IT_APPROVED"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : r.status === "FINANCE_APPROVED"
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : r.status === "COMPLETED"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : r.status === "REJECTED"
                                    ? "bg-rose-50 text-rose-700 border-rose-200"
                                    : "bg-slate-50 text-slate-700 border-slate-200"
                          }
                        >
                          {statusLabel}
                        </Badge>
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
