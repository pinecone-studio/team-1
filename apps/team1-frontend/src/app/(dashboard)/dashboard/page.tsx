import { 
  Package, 
  UserCheck, 
  Wrench, 
  AlertTriangle,
} from "lucide-react"


import { MetricCard } from "../../_components/Dashbord/metric-card"
import { AssetTrendChart, CategoryDistributionChart, CensusProgressChart, DepreciationChart } from "../../_components/Dashbord/charts"
import { QuickActions } from "../../_components/Dashbord/quick-actions"
import { RecentAssets } from "../../_components/Dashbord/recent-assets"
import { dashboardMetrics } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your asset management system
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Assets"
          value={dashboardMetrics.totalAssets.toLocaleString()}
          subtitle={`+${dashboardMetrics.recentlyAdded} this month`}
          icon={Package}
          trend={{ value: 8.2, positive: true }}
        />
        <MetricCard
          title="Assigned Assets"
          value={dashboardMetrics.assignedAssets.toLocaleString()}
          subtitle={`${Math.round((dashboardMetrics.assignedAssets / dashboardMetrics.totalAssets) * 100)}% utilization`}
          icon={UserCheck}
        />
        <MetricCard
          title="Assets in Repair"
          value={dashboardMetrics.assetsInRepair}
          subtitle="Avg. 5 days repair time"
          icon={Wrench}
          trend={{ value: 12, positive: false }}
        />
        <MetricCard
          title="Pending Disposal"
          value={dashboardMetrics.pendingDisposal}
          subtitle="Awaiting approval"
          icon={AlertTriangle}
        />
      </div>

      {/* Charts and actions row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AssetTrendChart />
        </div>
        <QuickActions />
      </div>

      {/* Second row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryDistributionChart />
        <CensusProgressChart />
      </div>

      {/* Third row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DepreciationChart />
        <RecentAssets />
      </div>
    </div>
  )
}
