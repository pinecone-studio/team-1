"use client";

import React, { useMemo, useState } from "react";
import { Bell, Check, Eye, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { ActiveOffboarding } from "./DemoEmployeeOffboardingCard";
import type { AssignmentItem } from "./demo-employee-utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type EmployeeOption = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};

export type DemoEmployeeHeaderProps = {
  title: string;
  employees: EmployeeOption[] | undefined;
  demoEmployeeId: string;
  onDemoEmployeeChange: (id: string) => void;
  currentEmployeeId: string | null;
  activeOffboarding: ActiveOffboarding | null;
  offboardingCreatedAt?: number | null;
  offboardingStarting: boolean;
  onShowOffboardingModal: () => void;
  onOpenOffboarding?: () => void;
  pendingList: AssignmentItem[];
  currentPending: AssignmentItem | null;
  isChecked: boolean;
  onConditionCheck: (a: AssignmentItem) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  updatingStatus: boolean;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeHeader({
  title,
  employees,
  demoEmployeeId,
  onDemoEmployeeChange,
  currentEmployeeId,
  activeOffboarding,
  offboardingCreatedAt,
  offboardingStarting,
  onShowOffboardingModal,
  onOpenOffboarding,
  pendingList,
  currentPending,
  isChecked,
  onConditionCheck,
  onApprove,
  onReject,
  updatingStatus,
  normalizeAssetTag,
}: DemoEmployeeHeaderProps) {
  const hasActiveOffboarding = Boolean(activeOffboarding);

  const [open, setOpen] = useState(false);
  const pendingCount = pendingList.length;
  const totalNotificationCount = pendingCount + (hasActiveOffboarding ? 1 : 0);

  const formatAgo = (ts?: number | null) => {
    if (!ts) return "";
    const diffMs = Date.now() - ts;
    if (!Number.isFinite(diffMs) || diffMs < 0) return "";
    const mins = Math.max(1, Math.round(diffMs / (60 * 1000)));
    if (mins < 60) return `${mins} минутын өмнө`;
    const hours = Math.round(mins / 60);
    if (hours < 24) return `${hours} цагийн өмнө`;
    const days = Math.round(hours / 24);
    return `${days} өдрийн өмнө`;
  };

  const pendingItems = useMemo(() => {
    return pendingList.slice(0, 10);
  }, [pendingList]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {employees?.length ? (
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <span className="text-xs text-muted-foreground">
              Demo ажилтан сонгох:
            </span>
            <Select value={demoEmployeeId} onValueChange={onDemoEmployeeChange}>
              <SelectTrigger className="h-8 w-[280px]">
                <SelectValue placeholder="Ажилтан сонгох..." />
              </SelectTrigger>
              <SelectContent>
                {(employees as EmployeeOption[]).map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {[e.firstName, e.lastName].filter(Boolean).join(" ") ||
                      e.email ||
                      e.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {currentEmployeeId && !hasActiveOffboarding && (
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onShowOffboardingModal}
            disabled={offboardingStarting}
          >
            <LogOut className="h-4 w-4" />
            Ажилаас гарах (Offboarding)
          </Button>
        )}
        {hasActiveOffboarding && (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Offboarding эхэлсэн
          </Badge>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setOpen((v) => !v)}
              >
                <Bell className="h-5 w-5" />
                {totalNotificationCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {totalNotificationCount}
                  </span>
                )}
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={10}
            className="w-[465px] max-w-[calc(100vw-1rem)] rounded-2xl border border-slate-100 bg-white p-0 shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <p className="text-[18px] font-semibold text-slate-900">Мэдэгдэл</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="max-h-[520px] overflow-y-auto overflow-x-hidden px-6 pb-6">
              {totalNotificationCount === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                  Танд одоогоор шинэ хүсэлт байхгүй байна.
                </div>
              ) : (
                <div className="space-y-4">
                  {hasActiveOffboarding && (
                    <div>
                      <div className="flex items-start gap-3 w-fit">
                        <Bell className="mt-1 h-4 w-4 shrink-0 text-slate-600" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-semibold text-slate-900">
                            Танд шинэ хүсэлт ирлээ ({totalNotificationCount})
                          </p>
                          <p className="mt-1 text-sm text-slate-700 wrap-break-word">
                            HR-ээс таны ажлаас гарах процесс эхэллээ. Хөрөнгөө буцааж өгнө үү.
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-2 rounded-md border-[#EAB308] bg-amber-50 text-[#EAB308] hover:bg-amber-100 text-xs font-medium"
                              onClick={() => {
                                setOpen(false);
                                onOpenOffboarding?.();
                              }}
                            >
                              <Eye className="h-4 w-4" />
                              Дэлгэрэнгүй
                            </Button>
                          </div>
                          {formatAgo(offboardingCreatedAt) ? (
                            <p className="mt-3 text-xs text-slate-500">
                              {formatAgo(offboardingCreatedAt)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {pendingItems.length > 0 && (
                        <div className="mt-4 h-px w-full bg-slate-200" />
                      )}
                    </div>
                  )}
                  {pendingItems.map((a, idx) => {
                    const isCurrent = currentPending?.id === a.id;
                    const assetTag = normalizeAssetTag(a.asset?.assetTag) || a.assetId;
                    const requestedByName = a.requestedBy
                      ? [a.requestedBy.firstName, a.requestedBy.lastName]
                          .filter(Boolean)
                          .join(" ") || "Админ хэрэглэгч"
                      : "Админ хэрэглэгч";
                    const timeLabel = formatAgo(a.assignedAt);

                    return (
                      <div key={a.id}>
                        <div className="flex items-start gap-3 w-fit">
                          <Bell className="mt-1 h-4 w-4 text-slate-600" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[15px] font-semibold text-slate-900">
                              Танд шинэ хүсэлт ирлээ ({totalNotificationCount})
                            </p>
                            <p className="mt-1 text-sm text-slate-700">
                              <span className="wrap-break-word">
                                {requestedByName}-с {assetTag} хөрөнгийг шилжүүлэх хүсэлт ирлээ
                              </span>
                            </p>
                            <div className="mt-3 flex  items-center gap-2 mr-10">
                              <Button
                                variant="outline"
                                size="sm"
                                className={[
                                  "h-8 gap-2 rounded-md border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-medium",
                                  !isCurrent ? "opacity-90" : "",
                                ].join(" ")}
                                onClick={() => onConditionCheck(a)}
                              >
                                <Eye className="h-4 w-4" />
                                Нөхцөл шалгах
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-2 rounded-md border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-40 text-xs font-medium"
                                onClick={() => onApprove(a.id)}
                                disabled={!isCurrent || !isChecked || updatingStatus}
                              >
                                <Check className="h-4 w-4" />
                                Хүлээн авах
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-2 rounded-md border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-40 text-xs font-medium"
                                onClick={() => onReject(a.id)}
                                disabled={!isCurrent || updatingStatus}
                              >
                                <X className="h-4 w-4" />
                                Татгалзах
                              </Button>
                            </div>
                            {timeLabel ? (
                              <p className="mt-3 text-xs text-slate-500">{timeLabel}</p>
                            ) : null}
                          </div>
                        </div>
                        {idx < pendingItems.length - 1 ? (
                          <div className="mt-4 h-px w-full bg-slate-200" />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
