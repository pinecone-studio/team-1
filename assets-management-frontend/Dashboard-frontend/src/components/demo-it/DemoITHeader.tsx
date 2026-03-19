"use client";

import React from "react";
import { Bell, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DemoITHeaderProps = {
  title: string;
  notificationCount?: number;
  notificationsOpen?: boolean;
  onToggleNotifications?: () => void;
};

export function DemoITHeader({
  title,
  notificationCount = 0,
  notificationsOpen = false,
  onToggleNotifications,
}: DemoITHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">
          IT-д илгээгдсэн бүх хүсэлт — устгах хүсэлт, засварын дуудлага
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={notificationsOpen ? "default" : "outline"}
          size="sm"
          className="relative gap-2"
          onClick={onToggleNotifications}
        >
          <Bell className="h-4 w-4" /> Мэдэгдэл
          {notificationCount > 0 ? (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          ) : null}
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" /> Түүх
        </Button>
      </div>
    </div>
  );
}
