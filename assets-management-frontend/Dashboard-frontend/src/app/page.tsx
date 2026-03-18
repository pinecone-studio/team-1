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
import { QRCensusContent } from "@/components/qr/qr-census-content";

export default function DashboardPage() {
  const [activeTitle, setActiveTitle] = useState("Хянах самбар");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-svh overflow-hidden bg-muted/30">
      <SidebarProvider
        className="h-full"
        defaultOpen={true}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        style={
          {
            "--sidebar-width": "240px",
            "--sidebar-width-icon": "72px",
          } as React.CSSProperties
        }
      >
        <DashboardHeader sidebarOpen={sidebarOpen} />

        <AppSidebar
          activeTitle={activeTitle}
          onSelect={setActiveTitle}
          sidebarClassName="top-14 bottom-0 h-[calc(100svh-56px)]"
        />

        <SidebarInset className="h-[calc(100svh-56px)] overflow-y-auto bg-transparent">
          <div className="-mt-2">
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
            {activeTitle === "QR тооллого" ? <QRCensusContent /> : null}

            {activeTitle !== "Хянах самбар" &&
            activeTitle !== "Хөрөнгө" &&
            activeTitle !== "Хөрөнгө хуваарилах" &&
            activeTitle !== "QR тооллого" &&
            activeTitle !== "Ажилтан демо" &&
            activeTitle !== "IT демо" &&
            activeTitle !== "HR демо" ? (
              <div />
            ) : null}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
