"use client";

import React, { useState } from "react";
import { Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MaintenanceItem } from "./demo-it-utils";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type DemoITMaintenanceCardProps = {
  allMaintenanceTickets: MaintenanceItem[];
  MAINTENANCE_STATUS_LABELS: Record<string, string>;
  onOpenAsset: (assetId: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  updatingMaintenance: boolean;
};

export function DemoITMaintenanceCard({
  allMaintenanceTickets,
  MAINTENANCE_STATUS_LABELS,
  onOpenAsset,
  onApprove,
  onReject,
  updatingMaintenance,
}: DemoITMaintenanceCardProps) {
  const [detailTicket, setDetailTicket] = useState<MaintenanceItem | null>(null);

  return (
    <>
      <Card className="border border-border/60 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Wrench className="h-5 w-5" /> Засварлах хүсэлтүүд
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {allMaintenanceTickets.length === 0 ? (
            <p className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
              Засварын дуудлага байхгүй байна.
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
                      Тайлбар
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
                  {allMaintenanceTickets.map((t, index) => (
                    <TableRow
                      key={t.id}
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
                            onOpenAsset(t.assetId);
                          }}
                          title="Хөрөнгийн дэлгэрэнгүй"
                        >
                          {t.assetId}
                        </button>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {(t as any)?.asset?.serialNumber ??
                          (t as any)?.serialNumber ??
                          "—"}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {(t as any)?.reporterName ??
                          (t as any)?.reporter?.email ??
                          (t as any)?.reporterId ??
                          "Admin"}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        <div className="flex items-center gap-2">
                          <span className="line-clamp-1 max-w-[220px]">
                            {t.description}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-[#0b6fae] hover:bg-[#e9f3fb] hover:text-[#0b6fae]"
                            onClick={() => setDetailTicket(t)}
                          >
                            Дэлгэрэнгүй
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {new Date(t.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="px-3 py-2 md:px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            className="h-8 gap-2 rounded-md bg-[#0b6fae] text-white hover:bg-[#095f93]"
                            onClick={() => onApprove(t.id)}
                            disabled={
                              updatingMaintenance ||
                              t.status === "RESOLVED" ||
                              t.status === "CLOSED"
                            }
                            title={`Status: ${MAINTENANCE_STATUS_LABELS[t.status] ?? t.status}`}
                          >
                            <Check className="h-4 w-4" />
                            Батлах
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 rounded-md"
                            onClick={() => onReject(t.id)}
                            disabled={
                              updatingMaintenance || t.status === "CLOSED"
                            }
                          >
                            <X className="h-4 w-4" />
                            Цуцлах
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={detailTicket != null}
        onOpenChange={(open) => !open && setDetailTicket(null)}
      >
        <DialogContent className="max-w-[min(92vw,560px)]">
          <DialogHeader>
            <DialogTitle>Засварын хүсэлтийн дэлгэрэнгүй</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {detailTicket
                ? `Хүсэлт: ${detailTicket.id}`
                : "Засварын хүсэлтийн мэдээлэл"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Хөрөнгийн ID:</span>{" "}
              {detailTicket?.assetId ?? "—"}
            </div>
            <div>
              <span className="font-medium">Хүсэлт илгээгч:</span>{" "}
              {(detailTicket as any)?.reporterName ??
                (detailTicket as any)?.reporter?.email ??
                (detailTicket as any)?.reporterId ??
                "Admin"}
            </div>
            <div>
              <span className="font-medium">Төлөв:</span>{" "}
              {detailTicket
                ? (MAINTENANCE_STATUS_LABELS[detailTicket.status] ??
                  detailTicket.status)
                : "—"}
            </div>
            <div>
              <span className="font-medium">Ирсэн огноо:</span>{" "}
              {detailTicket ? new Date(detailTicket.createdAt).toLocaleString() : "—"}
            </div>
            <div className="rounded-md border bg-muted/20 p-3">
              <p className="mb-1 font-medium">Ирсэн тайлбар / comment</p>
              <p className="whitespace-pre-wrap wrap-break-word text-foreground">
                {detailTicket?.description ?? "Тайлбар байхгүй."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
