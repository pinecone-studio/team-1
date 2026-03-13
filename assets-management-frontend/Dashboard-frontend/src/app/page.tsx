"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardContent } from "@/components/dashboard-content";
import { AssetsContent } from "@/components/assets/assets-content";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import OffboardingContent from "@/components/offboarding/offboarding-content";

export default function DashboardPage() {
  const [activeTitle, setActiveTitle] = useState("Хянах самбар");

  return (
    <div className="h-svh overflow-hidden bg-muted/30">
      <DashboardHeader />

      <SidebarProvider className="min-h-0 h-[calc(100svh-3.5rem)]">
        <AppSidebar
          activeTitle={activeTitle}
          onSelect={setActiveTitle}
          sidebarClassName="top-14 bottom-0"
        />

        <SidebarInset className="min-h-0 bg-transparent">
          {activeTitle === "Хянах самбар" ? <DashboardContent /> : null}
          {activeTitle === "Хөрөнгө" ? <AssetsContent /> : null}
          {activeTitle === "Ажлаас гарах" ? <OffboardingContent /> : null}

          {activeTitle !== "Хянах самбар" &&
          activeTitle !== "Хөрөнгө" &&
          activeTitle !== "Ажлаас гарах" ? (
            <div className="min-h-0 flex flex-1 overflow-auto p-6">
              <div className="w-full rounded-xl bg-white" />
            </div>
          ) : null}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
