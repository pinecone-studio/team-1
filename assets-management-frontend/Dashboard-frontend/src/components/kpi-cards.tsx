"use client";

import { Package, UserCheck, Wrench } from "lucide-react";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetAssetKpisDocument } from "@/gql/graphql";

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("mn-MN").format(value)}₮`;

const formatPercent = (value: number) => `${Math.round(value)}%`;

export function KPICards() {
  const { data, loading: assetsLoading } = useQuery(GetAssetKpisDocument);

  const kpis = data?.assetKpis;
  const totalAssets = kpis?.totalCount ?? 0;
  const totalValue = kpis?.totalValue ?? 0;
  const assignedPercent =
    totalAssets > 0 ? ((kpis?.assignedCount ?? 0) / totalAssets) * 100 : 0;
  const unassignedPercent =
    totalAssets > 0 ? ((kpis?.unassignedCount ?? 0) / totalAssets) * 100 : 0;
  const sellablePercent =
    totalAssets > 0 ? ((kpis?.forSaleCount ?? 0) / totalAssets) * 100 : 0;
  const brokenPercent =
    totalAssets > 0 ? ((kpis?.brokenCount ?? 0) / totalAssets) * 100 : 0;

  const kpiData = [
    {
      title: "Нийт хөрөнгө",
      value: formatMoney(totalValue),
      subtitle: `${totalAssets} ширхэг`,
      progress: 100,
      icon: Package,
      iconBorder: "border-sky-400",
      iconColor: "text-sky-400",
    },
    {
      title: "Эзэмшигчтэй",
      value: formatMoney(kpis?.assignedValue ?? 0),
      subtitle: formatPercent(assignedPercent),
      progress: assignedPercent,
      icon: UserCheck,
      iconBorder: "border-green-400",
      iconColor: "text-green-400",
    },
    {
      title: "Эзэмшигчгүй",
      value: formatMoney(kpis?.unassignedValue ?? 0),
      subtitle: formatPercent(unassignedPercent),
      progress: unassignedPercent,
      icon: UserCheck,
      iconBorder: "border-orange-400",
      iconColor: "text-orange-400",
    },
    {
      title: "Зарж болох",
      value: formatMoney(kpis?.forSaleValue ?? 0),
      subtitle: formatPercent(sellablePercent),
      progress: sellablePercent,
      icon: UserCheck,
      iconBorder: "border-yellow-400",
      iconColor: "text-yellow-400",
    },
    {
      title: "Эвдрэлтэй",
      value: formatMoney(kpis?.brokenValue ?? 0),
      subtitle: formatPercent(brokenPercent),
      progress: brokenPercent,
      icon: Wrench,
      iconBorder: "border-red-400",
      iconColor: "text-red-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard title */}

      <h2 className="text-xl font-semibold text-foreground ">Хянах самбар</h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} loading={assetsLoading} />
        ))}
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  progress: number;
  icon: any;
  iconBorder?: string;
  iconColor: string;
  loading?: boolean;
}

function KPICard({
  title,
  value,
  subtitle,
  progress,
  icon: Icon,
  iconBorder,
  iconColor,
  loading,
}: KPICardProps) {
  if (loading) {
    return (
      <Card className="rounded-xl border bg-white shadow-sm">
        <CardContent className="space-y-5">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-14 rounded-full" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border bg-white shadow-sm">
      <CardContent className=" space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base text-foreground">{title}</p>

            <p className="text-xl font-bold mt-2.5 ">{value}</p>
          </div>

          <div
            className={`flex items-center justify-center h-9 w-9 rounded-full border bg-white ${iconBorder}`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>{" "}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
