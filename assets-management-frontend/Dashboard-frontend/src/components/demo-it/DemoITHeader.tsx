"use client";

import React from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DemoITHeaderProps = {
  title: string;
};

export function DemoITHeader({ title }: DemoITHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">
          IT-д илгээгдсэн бүх хүсэлт — устгах хүсэлт, засварын дуудлага
        </p>
      </div>
      <Button variant="outline" size="sm" className="gap-2">
        <History className="h-4 w-4" /> Түүх
      </Button>
    </div>
  );
}
