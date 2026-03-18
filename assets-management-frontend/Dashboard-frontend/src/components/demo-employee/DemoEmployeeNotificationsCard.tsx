"use client";

import React from "react";
import { Bell, ChevronDown, ChevronUp, ClipboardCheck } from "lucide-react";
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
import type { AssignmentItem } from "./demo-employee-utils";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type?: string;
  isRead?: boolean;
  createdAt?: number;
};

type AssetReturnItem = {
  id: string;
  assetTag?: string;
  serialNumber: string;
};

export type DemoEmployeeNotificationsCardProps = {
  notifications: NotificationItem[];
  expandedNotificationId: string | null;
  setExpandedNotificationId: (id: string | null) => void;
  bulkReturnInstructionsRead: boolean;
  setBulkReturnInstructionsRead: (v: boolean) => void;
  handleBulkSubmitReturnRequests: () => void;
  bulkReturnSending: boolean;
  submitReturnRequestLoading: boolean;
  selectedReturnAssetIds: Set<string>;
  eligibleReturnAssignmentsLength: number;
  selectAllEligibleReturns: (next: boolean) => void;
  assetsToReturnList: AssetReturnItem[] | null;
  myAssetsList: Array<unknown>;
  pendingReturnRequestAssetIds: Set<string>;
  toggleReturnSelection: (assetId: string, next: boolean) => void;
  onOpenReturnRequest: (a: AssignmentItem) => void;
  completeReturnLoading: boolean;
  activeOffboarding: unknown;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeNotificationsCard({
  notifications,
  expandedNotificationId,
  setExpandedNotificationId,
  bulkReturnInstructionsRead,
  setBulkReturnInstructionsRead,
  handleBulkSubmitReturnRequests,
  bulkReturnSending,
  submitReturnRequestLoading,
  selectedReturnAssetIds,
  eligibleReturnAssignmentsLength,
  selectAllEligibleReturns,
  assetsToReturnList,
  myAssetsList,
  pendingReturnRequestAssetIds,
  toggleReturnSelection,
  onOpenReturnRequest,
  completeReturnLoading,
  activeOffboarding,
  normalizeAssetTag,
}: DemoEmployeeNotificationsCardProps) {
  if (notifications.length === 0 || activeOffboarding) return null;

  const displayList =
    assetsToReturnList ??
    (myAssetsList as AssignmentItem[]).map((a) => ({
      id: a.assetId,
      assetTag: a.asset?.assetTag ?? a.assetId,
      serialNumber: a.asset?.serialNumber ?? "—",
    }));

  return (
    <Card className="mt-6 min-h-0 shrink-0 border-amber-200 bg-amber-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-amber-800 flex items-center gap-2">
          <Bell className="h-4 w-4" /> Мэдэгдлүүд
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 min-h-[120px]">
        <ul className="space-y-3">
          {notifications.map((n) => {
            const isExpanded = expandedNotificationId === n.id;
            const receivedDate =
              n.createdAt != null ? new Date(n.createdAt) : null;
            const dateLabel = receivedDate
              ? `${receivedDate.getFullYear()} оны ${receivedDate.getMonth() + 1} сарын ${receivedDate.getDate()}`
              : "";
            return (
              <li
                key={n.id}
                className={`rounded-lg border p-4 text-sm min-h-0 overflow-visible ${n.isRead ? "border-gray-200 bg-white" : "border-amber-300 bg-amber-50"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{n.title}</p>
                    {dateLabel && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Ирсэн огноо: {dateLabel}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 gap-1 text-amber-700 hover:text-amber-800"
                    onClick={() =>
                      setExpandedNotificationId(isExpanded ? null : n.id)
                    }
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    Дэлгэрэнгүй
                  </Button>
                </div>
                {isExpanded && (
                  <div className="mt-4 space-y-4 border-t border-amber-200 pt-4">
                    <p className="text-sm font-medium text-amber-900">
                      Буцаах эцсийн хугацаа:{" "}
                      {n.message.includes("Буцаах эцсийн хугацаа:")
                        ? (n.message
                            .split("Буцаах эцсийн хугацаа:")[1]
                            ?.split(".")[0]
                            ?.trim() ?? "—")
                        : "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Хөрөнгийн жагсаалт — доорх хөрөнгө бүр дээр буцаах хүсэлт
                      илгээнэ үү.
                    </p>
                    <div className="rounded-lg border border-amber-200 bg-white/70 p-3 text-sm text-amber-900">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={bulkReturnInstructionsRead}
                            onChange={(e) =>
                              setBulkReturnInstructionsRead(e.target.checked)
                            }
                            className="rounded border-amber-600"
                          />
                          <span>
                            Би буцаах зааврыг уншсан. Гэмтэл, дутуу байвал
                            нөхцөл болон зургийг оруулна.
                          </span>
                        </label>
                        <Button
                          size="sm"
                          className="gap-2 bg-amber-700 hover:bg-amber-800 text-white"
                          onClick={handleBulkSubmitReturnRequests}
                          disabled={
                            bulkReturnSending ||
                            submitReturnRequestLoading ||
                            !bulkReturnInstructionsRead ||
                            selectedReturnAssetIds.size === 0 ||
                            !activeOffboarding
                          }
                          title={
                            !activeOffboarding
                              ? "HR таны offboarding процессыг эхлүүлсний дараа багцаар илгээх боломжтой."
                              : undefined
                          }
                        >
                          Багцаар буцаах хүсэлт илгээх (
                          {selectedReturnAssetIds.size})
                        </Button>
                      </div>
                      {!activeOffboarding ? (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Анхаар: HR таны ажлаас гарах процессыг эхлүүлээгүй
                          байна (offboarding event байхгүй).
                        </p>
                      ) : null}
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
                                selectedReturnAssetIds.size ===
                                  eligibleReturnAssignmentsLength
                              }
                              onChange={(e) =>
                                selectAllEligibleReturns(e.target.checked)
                              }
                              className="rounded border-amber-600"
                            />
                          </TableHead>
                          <TableHead>Хөрөнгө</TableHead>
                          <TableHead>Serial</TableHead>
                          <TableHead>Үйлдэл</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayList.map((item) => {
                          const canReturn = myAssetsList.some(
                            (m) => (m as AssignmentItem).assetId === item.id,
                          );
                          const hasPendingRequest =
                            pendingReturnRequestAssetIds.has(item.id);
                          const assignmentForDialog = myAssetsList.find(
                            (m) => (m as AssignmentItem).assetId === item.id,
                          ) as AssignmentItem | undefined;
                          return (
                            <TableRow key={item.id}>
                              <TableCell>
                                <input
                                  type="checkbox"
                                  aria-label="Хөрөнгө сонгох"
                                  checked={selectedReturnAssetIds.has(item.id)}
                                  onChange={(e) =>
                                    toggleReturnSelection(
                                      item.id,
                                      e.target.checked,
                                    )
                                  }
                                  disabled={!canReturn || hasPendingRequest}
                                  className="rounded border-amber-600"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {normalizeAssetTag(item.assetTag)}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {item.serialNumber}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1.5 border-amber-600 text-amber-700 hover:bg-amber-100"
                                  onClick={() => {
                                    if (hasPendingRequest) return;
                                    onOpenReturnRequest(
                                      assignmentForDialog ?? ({
                                        id: item.id,
                                        assetId: item.id,
                                        assignedAt: 0,
                                        asset: {
                                          id: item.id,
                                          assetTag: item.assetTag,
                                          serialNumber: item.serialNumber,
                                        },
                                      } as AssignmentItem),
                                    );
                                  }}
                                  disabled={
                                    completeReturnLoading ||
                                    submitReturnRequestLoading ||
                                    !canReturn ||
                                    hasPendingRequest
                                  }
                                >
                                  <ClipboardCheck className="h-3.5 w-3.5" />{" "}
                                  {hasPendingRequest
                                    ? "HR шалгах хүлээгдэж буй"
                                    : canReturn
                                      ? "Буцааж өгөх хүсэлт илгээх"
                                      : "Буцаасан"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    {myAssetsList.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Таны нэр дээр буцаах хөрөнгө бүртгэгдээгүй байна.
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
