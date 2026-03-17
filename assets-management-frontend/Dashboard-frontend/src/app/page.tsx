"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardContent } from "@/components/dashboard-content";
import { AssetsContent } from "@/components/assets/assets-content";
import { AssetAllocationContent } from "@/components/asset-allocations/asset-allocation-content";
import { AssetTransferContent } from "@/components/asset-transfers/asset-transfer-content";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DemoEmployeeContent } from "@/components/demo-employee/demo-employee";
import { DemoITContent } from "@/components/demo-it/demo-it";
import { DemoHRContent } from "@/components/demo-hr/demo-hr";
import { AssetFilter } from "@/components/assets/asset-filter";

export default function DashboardPage() {
  const [activeTitle, setActiveTitle] = useState("Хянах самбар");

  return (
    <div className="min-h-svh bg-muted/30">
      <DashboardHeader />

      <SidebarProvider className="min-h-svh">
        <AppSidebar
          activeTitle={activeTitle}
          onSelect={setActiveTitle}
          sidebarClassName="top-14 bottom-0"
        />

        <SidebarInset className="min-h-0 bg-transparent">
          {activeTitle === "Хянах самбар" ? <DashboardContent /> : null}
          {activeTitle === "Хөрөнгө" ? <AssetsContent /> : null}
          {activeTitle === "Эд Хөрөнгө" ? <AssetFilter /> : null}
          {/* {activeTitle === "Хөрөнгө хуваарилах" ? (
            <AssetAllocationContent />
          ) : null}
          {activeTitle === "Хөрөнгө шилжүүлэх" ? (
            <AssetTransferContent />
          ) : null} */}
          {activeTitle === "Demo Ажилтан" ? <DemoEmployeeContent /> : null}
          {activeTitle === "Demo IT" ? <DemoITContent /> : null}
          {activeTitle === "Demo HR" ? <DemoHRContent /> : null}

          {activeTitle !== "Хянах самбар" &&
          activeTitle !== "Хөрөнгө" &&
          activeTitle !== "Хөрөнгө хуваарилах" &&
          activeTitle !== "Ажилтан демо" &&
          activeTitle !== "IT демо" &&
          activeTitle !== "HR демо" ? (
            <div className="min-h-0 flex flex-1 overflow-auto p-6">
              <div className="w-full rounded-xl bg-white" />
            </div>
          ) : null}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
