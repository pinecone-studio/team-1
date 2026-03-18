"use client";

import { KPICards } from "@/components/kpi-cards";

import { AssetDistributionChart } from "@/components/charts/asset-distribution-chart";

import { RecentActivities } from "@/components/recent-activities";
import { AssetRequestsTable } from "@/components/asset-requests-table";

export function DashboardContent() {
  return (
    <div className="flex min-h-0 flex-1 flex-col p-6">
      <div className="flex flex-col gap-6">
        <KPICards />

        <div className="grid gap-6 lg:grid-cols-2">
          <AssetDistributionChart />
          <RecentActivities />
        </div>

        <AssetRequestsTable />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* <AssetDepreciationChart /> */}
        </div>
      </div>
    </div>
  );
}
