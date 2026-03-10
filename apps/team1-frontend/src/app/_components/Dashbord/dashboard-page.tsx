import {
  AssetTrendChart,
  CategoryDistributionChart,
  CensusProgressChart,
  DepreciationChart,
} from "@/app/_components/Dashbord/charts"
import { MetricCard } from "@/app/_components/Dashbord/metric-card"
import { QuickActions } from "@/app/_components/Dashbord/quick-actions"
import { RecentAssets } from "@/app/_components/Dashbord/recent-assets"
import { currentUser, dashboardMetrics } from "@/lib/mock-data"
import type { UserRole } from "@/lib/types"
import {
  AlertTriangle,
  CheckCircle2,
  Package,
  TrendingUp,
  UserCheck,
  Wallet,
} from "lucide-react"

export function DashboardPage() {
  const roleLabels: Record<UserRole, string> = {
    admin: "Админ",
    hr_manager: "ХН менежер",
    it_admin: "ИТ админ",
    it_manager: "ИТ менежер",
    finance: "Санхүү",
    finance_manager: "Санхүүгийн менежер",
    employee: "Ажилтан",
  }
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Тавтай морил</p>
          <h1 className="text-2xl font-semibold">Эд хөрөнгийн самбар</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{currentUser.name}</p>
          <p className="text-xs text-muted-foreground">
            Албан тушаал: {roleLabels[currentUser.role]}
          </p>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Нийт эд хөрөнгө"
          value={dashboardMetrics.totalAssets}
          subtitle="Бүх хэлтэст"
          icon={Package}
          trend={{ value: 6, positive: true }}
        />
        <MetricCard
          title="Хуваарилсан эд хөрөнгө"
          value={dashboardMetrics.assignedAssets}
          subtitle="Ашиглагдаж буй"
          icon={CheckCircle2}
          trend={{ value: 3, positive: true }}
        />
        <MetricCard
          title="Засварт байгаа"
          value={dashboardMetrics.assetsInRepair}
          subtitle="Анхаарах шаардлагатай"
          icon={AlertTriangle}
          trend={{ value: 4, positive: false }}
        />
        <MetricCard
          title="Устгал хүлээж буй"
          value={dashboardMetrics.pendingDisposal}
          subtitle="Баталгаажуулалт хүлээж буй"
          icon={UserCheck}
          trend={{ value: 2, positive: false }}
        />
        <MetricCard
          title="Тооллогын явц"
          value={`${dashboardMetrics.censusProgress}%`}
          subtitle="Баталгаажуулалтын мөчлөг"
          icon={TrendingUp}
          trend={{ value: 8, positive: true }}
        />
        <MetricCard
          title="Элэгдлийн нийт"
          value={currency.format(dashboardMetrics.depreciationTotal)}
          subtitle="Одоогийн дансны үнэ"
          icon={Wallet}
          trend={{ value: 5, positive: false }}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AssetTrendChart />
        </div>
        <CensusProgressChart />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <CategoryDistributionChart />
        <DepreciationChart />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentAssets />
        </div>
        <QuickActions />
      </section>
    </div>
  )
}
