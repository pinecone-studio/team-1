"use client";

import React from "react";
import { Check, Eye, ShieldCheck, X } from "lucide-react";
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
import type { DisposalItem } from "./demo-it-utils";

export type DemoITPendingDisposalsCardProps = {
  pendingDisposals: DisposalItem[];
  onSelectDisposal: (item: DisposalItem) => void;
  onOpenAsset: (assetId: string) => void;
  onReject: (id: string) => void;
  approving: boolean;
  rejecting: boolean;
  setIsDisposalChecked: (v: boolean) => void;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoITPendingDisposalsCard({
  pendingDisposals,
  onSelectDisposal,
  onOpenAsset,
  onReject,
  approving,
  rejecting,
  setIsDisposalChecked,
  normalizeAssetTag,
}: DemoITPendingDisposalsCardProps) {
  return (
    <Card className="border border-border/60 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <ShieldCheck className="h-5 w-5" /> Устгах хүсэлтүүд
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {pendingDisposals.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
            Одоогоор хүлээгдэж буй устгах хүсэлт байхгүй. Ажилтан «Миний
            хөрөнгө» → хөрөнгө дээр дарж «Устгах хүсэлт илгээх»-ээр илгээж
            болно.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow className="border-0 bg-[#0b6fae] hover:bg-[#0b6fae]">
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
                    Хэнээс
                  </TableHead>
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    Ирсэн огноо
                  </TableHead>
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    Баталгаажуулах
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border-0">
                {pendingDisposals.map((req, index) => {
                  const r = req as DisposalItem;
                  const assetTag = normalizeAssetTag(r.asset?.assetTag ?? r.assetId);
                  const serial = (r.asset as { serialNumber?: string } | undefined)?.serialNumber ?? "—";
                  const requesterName = r.requestedBy
                    ? [r.requestedBy.firstName, r.requestedBy.lastName]
                        .filter(Boolean)
                        .join(" ") || r.requestedBy.email
                    : "—";

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
                        <button
                          type="button"
                          className="text-left hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAsset(r.assetId);
                          }}
                          title="Хөрөнгийн дэлгэрэнгүй"
                        >
                          {assetTag}
                        </button>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {serial}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {requesterName}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {new Date(r.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="px-3 py-2 md:px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 rounded-md"
                            onClick={() => {
                              setIsDisposalChecked(false);
                              onSelectDisposal(r);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            Дэлгэрэнгүй
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 gap-2 rounded-md bg-[#6b7280] text-white hover:bg-[#5b6473]"
                            onClick={() => {
                              // Logic өөрчлөхгүй: батлахын өмнө dialog (detail) нээнэ
                              setIsDisposalChecked(false);
                              onSelectDisposal(r);
                            }}
                            disabled={approving || rejecting}
                          >
                            <Check className="h-4 w-4" />
                            Батлах
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 rounded-md"
                            onClick={() => onReject(r.id)}
                            disabled={approving || rejecting}
                          >
                            <X className="h-4 w-4" />
                            Цуцлах
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
