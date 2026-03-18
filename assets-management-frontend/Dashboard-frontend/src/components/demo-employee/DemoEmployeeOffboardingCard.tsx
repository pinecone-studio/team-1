"use client";

import React from "react";
import { LogOut } from "lucide-react";
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
import { ClipboardCheck } from "lucide-react";
import { normalizeAssetTag, type AssignmentItem } from "./demo-employee-utils";

type ActiveOffboarding = {
  deadline?: number;
  returnedAssets?: number;
  totalAssets?: number;
};

export type DemoEmployeeOffboardingCardProps = {
  activeOffboarding: ActiveOffboarding | null;
  bulkReturnInstructionsRead: boolean;
  onBulkReturnInstructionsReadChange: (v: boolean) => void;
  onBulkSubmitReturnRequests: () => void;
  bulkReturnSending: boolean;
  submitReturnRequestLoading: boolean;
  selectedReturnAssetIds: Set<string>;
  eligibleReturnAssignmentsLength: number;
  selectAllEligibleReturns: (next: boolean) => void;
  assignmentsToReturn: (AssignmentItem & { returnedAt?: number | null })[];
  pendingReturnRequestAssetIds: Set<string>;
  toggleReturnSelection: (assetId: string, next: boolean) => void;
  onOpenReturnRequest: (a: AssignmentItem) => void;
  completeReturnLoading: boolean;
};

export function DemoEmployeeOffboardingCard({
  activeOffboarding,
  bulkReturnInstructionsRead,
  onBulkReturnInstructionsReadChange,
  onBulkSubmitReturnRequests,
  bulkReturnSending,
  submitReturnRequestLoading,
  selectedReturnAssetIds,
  eligibleReturnAssignmentsLength,
  selectAllEligibleReturns,
  assignmentsToReturn,
  pendingReturnRequestAssetIds,
  toggleReturnSelection,
  onOpenReturnRequest,
  completeReturnLoading,
}: DemoEmployeeOffboardingCardProps) {
  if (!activeOffboarding) return null;

  const deadline = activeOffboarding.deadline;
  const returnedAssets = activeOffboarding.returnedAssets;
  const totalAssets = activeOffboarding.totalAssets;

  return (
    <Card className="mt-6 border-amber-300 bg-amber-50/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-amber-900 flex items-center gap-2">
          <LogOut className="h-4 w-4" /> Ажлаас гарах — хөрөнгө буцаах
        </CardTitle>
        <p className="text-sm text-amber-800">
          Буцаах эцсийн хугацаа (ажлаас гарснаас хойш 3 хоногийн дотор):{" "}
          {deadline != null
            ? new Date(deadline).toLocaleDateString("mn-MN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "—"}
          . Хөрөнгө бүр дээр &quot;Буцааж өгөх хүсэлт гаргах&quot; дарах эсвэл
          олон хөрөнгө сонгоод багцаар илгээнэ үү.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-3 rounded-lg border border-amber-200 bg-white/70 p-3 text-sm text-amber-900">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={bulkReturnInstructionsRead}
                onChange={(e) =>
                  onBulkReturnInstructionsReadChange(e.target.checked)
                }
                className="rounded border-amber-600"
              />
              <span>
                Би буцаах зааврыг уншсан. Гэмтэл, дутуу байвал нөхцөл болон
                зургийг оруулна.
              </span>
            </label>
            <Button
              size="sm"
              className="gap-2 bg-amber-700 hover:bg-amber-800 text-white"
              onClick={onBulkSubmitReturnRequests}
              disabled={
                bulkReturnSending ||
                submitReturnRequestLoading ||
                !bulkReturnInstructionsRead ||
                selectedReturnAssetIds.size === 0
              }
            >
              {bulkReturnSending ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Илгээж байна...
                </span>
              ) : null}
              Багцаар буцаах хүсэлт илгээх ({selectedReturnAssetIds.size})
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[44px]">
                <input
                  type="checkbox"
                  aria-label="Бүгдийг сонгох"
                  checked={
                    eligibleReturnAssignmentsLength > 0 &&
                    selectedReturnAssetIds.size === eligibleReturnAssignmentsLength
                  }
                  onChange={(e) => selectAllEligibleReturns(e.target.checked)}
                  className="rounded border-amber-600"
                />
              </TableHead>
              <TableHead>Хөрөнгө</TableHead>
              <TableHead>Serial</TableHead>
              <TableHead>Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignmentsToReturn.map((assignment) => {
              const a = assignment as AssignmentItem;
              const hasPendingRequest = pendingReturnRequestAssetIds.has(
                a.assetId,
              );
              return (
                <TableRow key={a.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      aria-label="Хөрөнгө сонгох"
                      checked={selectedReturnAssetIds.has(a.assetId)}
                      onChange={(e) =>
                        toggleReturnSelection(a.assetId, e.target.checked)
                      }
                      disabled={hasPendingRequest}
                      className="rounded border-amber-600"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {normalizeAssetTag(a.asset?.assetTag ?? a.assetId)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {a.asset?.serialNumber ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 border-amber-600 text-amber-700 hover:bg-amber-100"
                      onClick={() => {
                        if (hasPendingRequest) return;
                        onOpenReturnRequest(a);
                      }}
                      disabled={completeReturnLoading || hasPendingRequest}
                    >
                      <ClipboardCheck className="h-3.5 w-3.5" />{" "}
                      {hasPendingRequest
                        ? "HR шалгах хүлээгдэж буй"
                        : "Буцааж өгөх хүсэлт гаргах"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {returnedAssets != null && totalAssets != null && (
          <p className="mt-3 text-xs text-muted-foreground">
            Буцаасан: {returnedAssets} / {totalAssets}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
