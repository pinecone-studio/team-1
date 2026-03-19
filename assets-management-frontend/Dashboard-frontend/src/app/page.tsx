"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardContent } from "@/components/dashboard-content";
import { AssetsContent } from "@/components/assets/assets-content";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DemoEmployeeContent } from "@/components/demo-employee/demo-employee";
import { DemoITContent } from "@/components/demo-it/demo-it";
import { DemoHRContent } from "@/components/demo-hr/demo-hr";
import { AssetFilter } from "@/components/assets/asset-filter";
import { QRCensusContent } from "@/components/qr/qr-census-content";
import OffboardingContent from "@/components/offboarding/offboarding-content";
import { ReportContent } from "@/components/reports/report-content";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedTitle = useMemo(() => {
    const section = searchParams.get("section");
    if (section === "assets") return "Эд Хөрөнгө";
    return "Хянах самбар";
  }, [searchParams]);

  const [activeTitle, setActiveTitle] = useState(resolvedTitle);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setActiveTitle(resolvedTitle);
  }, [resolvedTitle]);

  const handleOpenAssets = (status: string) => {
    setActiveTitle("Эд Хөрөнгө");

    const params = new URLSearchParams(searchParams.toString());
    params.set("section", "assets");
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    router.replace(`/?${params.toString()}`);
  };

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
            {activeTitle === "Хянах самбар" ? (
              <DashboardContent onOpenAssets={handleOpenAssets} />
            ) : null}
            {activeTitle === "Хөрөнгө" ? <AssetsContent /> : null}
            {activeTitle === "Эд Хөрөнгө" ? <AssetFilter /> : null}
            {activeTitle === "Тайлан" ? <ReportContent /> : null}

            {activeTitle === "Demo Ажилтан" ? <DemoEmployeeContent /> : null}
            {activeTitle === "Demo IT" ? <DemoITContent /> : null}
            {activeTitle === "Demo HR" ? <DemoHRContent /> : null}
            {activeTitle === "Ажлаас гарах явц" ? <OffboardingContent /> : null}
            {activeTitle === "QR тооллого" ? <QRCensusContent /> : null}

            {activeTitle !== "Хянах самбар" &&
            activeTitle !== "Хөрөнгө" &&
            activeTitle !== "Тайлан" &&
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
