"use client";

import React from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type WipeTaskItem = {
  id: string;
  assetId: string;
  asset?: {
    id?: string;
    assetTag?: string;
    category?: string;
  } | null;
  latestAssignment?: {
    id?: string;
    employee?: {
      id?: string;
      firstName?: string;
      lastName?: string;
      department?: string;
      branch?: string;
    } | null;
  } | null;
  latestReturnRequest?: {
    id?: string;
    employee?: {
      id?: string;
      firstName?: string;
      lastName?: string;
      department?: string;
      branch?: string;
    } | null;
  } | null;
  status: string;
  createdAt: number;
  updatedAt: number;
};

export type DemoITDataWipeCardProps = {
  wipeTasks: WipeTaskItem[];
  onWipeDone: (id: string) => void;
  updatingWipe: boolean;
};

export function DemoITDataWipeCard({
  wipeTasks,
  onWipeDone,
  updatingWipe,
}: DemoITDataWipeCardProps) {
  return (
    <Card className="mt-4 border-emerald-200 bg-emerald-50/30 shrink-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-emerald-800">
          <ShieldCheck className="h-5 w-5" /> Data wipe tasks (
          {wipeTasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {wipeTasks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-emerald-200 bg-white p-6 text-center text-sm text-muted-foreground">
            PENDING data wipe task байхгүй байна.
          </p>
        ) : (
          <div className="space-y-2">
            {wipeTasks.map((t) => {
              const assetName = t.asset?.assetTag ?? t.assetId;
              const categoryName = t.asset?.category ?? "—";
              const sourceEmployee =
                t.latestReturnRequest?.employee ?? t.latestAssignment?.employee;
              const employeeName =
                [sourceEmployee?.firstName, sourceEmployee?.lastName]
                  .filter(Boolean)
                  .join(" ") || "—";
              const sourceParts = [
                sourceEmployee?.department,
                sourceEmployee?.branch,
              ].filter(Boolean);
              const sourceLabel = sourceParts.length > 0 ? sourceParts.join(" / ") : "—";

              return (
                <div
                  key={t.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border border-emerald-100 bg-white p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="font-medium text-foreground">
                      {assetName}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({categoryName})
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Хэнээс: {employeeName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Хаанаас: {sourceLabel}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Task: {t.id} · Status: {t.status}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => onWipeDone(t.id)}
                      disabled={updatingWipe}
                    >
                      <Check className="h-3.5 w-3.5" /> Done
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
