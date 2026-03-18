"use client";

import React from "react";
import { Search } from "lucide-react";
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

export type DemoITAllDisposalsCardProps = {
  allDisposals: DisposalItem[];
  DISPOSAL_STATUS_LABELS: Record<string, string>;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoITAllDisposalsCard({
  allDisposals,
  DISPOSAL_STATUS_LABELS,
  normalizeAssetTag,
}: DemoITAllDisposalsCardProps) {
  return (
    <Card className="mt-6 border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Устгах хүсэлт — бараа, хэнээс, баталгаажуулсан
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
              <TableHead>Хөрөнгө (нэр / ангилал)</TableHead>
              <TableHead>Хэнээс ирсэн</TableHead>
              <TableHead>Устгах арга</TableHead>
              <TableHead>Огноо</TableHead>
              <TableHead>Баталгаажуулсан</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allDisposals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground text-sm"
                >
                  Устгах хүсэлт байхгүй байна.
                </TableCell>
              </TableRow>
            ) : (
              allDisposals.map((req) => {
                const r = req as DisposalItem;
                const assetName = r.asset?.assetTag ?? r.assetId;
                const categoryName = r.asset?.category ?? "—";
                const requesterName = r.requestedBy
                  ? [r.requestedBy.firstName, r.requestedBy.lastName]
                      .filter(Boolean)
                      .join(" ") || r.requestedBy.email
                  : "—";
                const statusLabel =
                  DISPOSAL_STATUS_LABELS[r.status] ?? r.status;
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">
                      {normalizeAssetTag(assetName)}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({categoryName})
                      </span>
                    </TableCell>
                    <TableCell>{requesterName}</TableCell>
                    <TableCell className="text-sm">{r.method}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          r.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : r.status === "REJECTED"
                              ? "bg-rose-100 text-rose-700 border-rose-200"
                              : r.status === "IT_APPROVED" ||
                                  r.status === "FINANCE_APPROVED"
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : "bg-amber-100 text-amber-600 border-amber-200"
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
      </CardContent>
    </Card>
  );
}
