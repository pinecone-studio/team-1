"use client";

import React from "react";
import { Check, Eye, ShieldCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DisposalItem } from "./demo-it-utils";

export type DemoITPendingDisposalsCardProps = {
  pendingDisposals: DisposalItem[];
  onSelectDisposal: (item: DisposalItem) => void;
  onReject: (id: string) => void;
  approving: boolean;
  rejecting: boolean;
  setIsDisposalChecked: (v: boolean) => void;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoITPendingDisposalsCard({
  pendingDisposals,
  onSelectDisposal,
  onReject,
  approving,
  rejecting,
  setIsDisposalChecked,
  normalizeAssetTag,
}: DemoITPendingDisposalsCardProps) {
  return (
    <Card className="mt-6 border-gray-200 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-gray-900">
          <ShieldCheck className="h-5 w-5" /> Устгах хүсэлтүүд (
          {pendingDisposals.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingDisposals.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
            Одоогоор хүлээгдэж буй устгах хүсэлт байхгүй. Ажилтан «Миний
            хөрөнгө» → хөрөнгө дээр дарж «Устгах хүсэлт илгээх»-ээр илгээж
            болно.
          </p>
        ) : (
          pendingDisposals.map((req) => {
            const r = req as DisposalItem;
            const assetName = r.asset?.assetTag ?? r.assetId;
            const categoryName = r.asset?.category ?? "—";
            const requesterName = r.requestedBy
              ? [r.requestedBy.firstName, r.requestedBy.lastName]
                  .filter(Boolean)
                  .join(" ") || r.requestedBy.email
              : "—";
            const displayAsset = normalizeAssetTag(assetName);
            return (
              <div
                key={req.id}
                className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setIsDisposalChecked(false);
                  onSelectDisposal(r);
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-sm">
                    {(assetName ?? "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">
                      {displayAsset}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({categoryName})
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Хэнээс:{" "}
                      <span className="font-medium text-foreground">
                        {requesterName}
                      </span>{" "}
                      | Арга: {r.method} |{" "}
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDisposalChecked(false);
                      onSelectDisposal(r);
                    }}
                  >
                    <Eye className="h-3.5 w-3.5" /> Дэлгэрэнгүй
                  </Button>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-600 border-amber-200"
                  >
                    PENDING
                  </Badge>
                  <Button
                    onClick={() => {
                      setIsDisposalChecked(false);
                      onSelectDisposal(r);
                    }}
                    className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
                    size="sm"
                    disabled
                  >
                    <Check className="h-4 w-4" /> Батлах (IT)
                  </Button>
                  <Button
                    onClick={() => onReject(r.id)}
                    variant="outline"
                    className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                    size="sm"
                    disabled={approving || rejecting}
                  >
                    <X className="h-4 w-4" /> Цуцлах
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
