"use client";

import React from "react";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ITNotificationItem = {
  id: string;
  title: string;
  message: string;
  type?: string;
  link?: string | null;
  createdAt?: number;
};

export type DemoITNotificationsCardProps = {
  itNotifications: ITNotificationItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  approving: boolean;
  rejecting: boolean;
  demoApproverId: string;
};

function linkMatchesDisposal(link: string | null | undefined): boolean {
  if (!link) return false;
  return link.toLowerCase().includes("disposal");
}

export function DemoITNotificationsCard({
  itNotifications,
  onApprove,
  onReject,
  approving,
  rejecting,
  demoApproverId,
}: DemoITNotificationsCardProps) {
  if (itNotifications.length === 0) return null;

  return (
    <Card className="mt-6 border-gray-200 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-gray-900">
          <Bell className="h-5 w-5" /> Ажилтнаас ирсэн мэдэгдэл (
          {itNotifications.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-3">
          {itNotifications.map((n) => {
            const isDisposal = linkMatchesDisposal(n.link);
            const dateLabel =
              n.createdAt != null
                ? new Date(n.createdAt).toLocaleString()
                : "";
            return (
              <li
                key={n.id}
                className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4"
              >
                <div>
                  <p className="font-medium text-foreground">{n.title}</p>
                  {n.message && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {n.message}
                    </p>
                  )}
                  {dateLabel && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {dateLabel}
                    </p>
                  )}
                </div>
                {isDisposal && (
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="gap-1.5 bg-gray-900 text-white hover:bg-gray-800"
                      onClick={() => onApprove(n.id)}
                      disabled={approving || rejecting || !demoApproverId}
                    >
                      <Check className="h-3.5 w-3.5" /> Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 border-gray-300 text-gray-700 hover:bg-gray-100"
                      onClick={() => onReject(n.id)}
                      disabled={approving || rejecting || !demoApproverId}
                    >
                      <X className="h-3.5 w-3.5" /> Decline
                    </Button>
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
