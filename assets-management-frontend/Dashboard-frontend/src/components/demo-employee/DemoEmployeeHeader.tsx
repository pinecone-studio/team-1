"use client";

import React from "react";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { ActiveOffboarding } from "./DemoEmployeeOffboardingCard";

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
  offboardingStarting: boolean;
  onShowOffboardingModal: () => void;
  pendingListLength: number;
  onShowRequestsDialog: () => void;
};

export function DemoEmployeeHeader({
  title,
  employees,
  demoEmployeeId,
  onDemoEmployeeChange,
  currentEmployeeId,
  activeOffboarding,
  offboardingStarting,
  onShowOffboardingModal,
  pendingListLength,
  onShowRequestsDialog,
}: DemoEmployeeHeaderProps) {
  const hasActiveOffboarding = Boolean(activeOffboarding);

  const onBellClick = () => {
    if (pendingListLength === 0) {
      toast.info("Танд одоогоор шинэ хүсэлт байхгүй байна.");
      return;
    }
    onShowRequestsDialog();
  };

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
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={onBellClick}
          >
            <Bell className="h-5 w-5" />
            {pendingListLength > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white font-bold">
                {pendingListLength}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
