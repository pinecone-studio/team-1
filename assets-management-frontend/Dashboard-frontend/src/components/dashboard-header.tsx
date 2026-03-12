"use client";

import { BellDot, Package, Search, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-6">
      <div className="flex min-w-0 items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
            <Package className="h-4 w-4 text-gray-900" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            AssetHub
          </span>
        </div>
        {/* <div className="h-16 border-l-4 ml-20.5"></div> */}

        <div className="hidden px-2 md:block pl-32.25">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Хөрөнгө, ажилтан хайх.."
              className="h-9 w-80 bg-muted/50 pl-9 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <BellDot />
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <UserIcon />
        </Button>
        <img src={"2SVG.svg"} alt="" />
      </div>
    </header>
  );
}
