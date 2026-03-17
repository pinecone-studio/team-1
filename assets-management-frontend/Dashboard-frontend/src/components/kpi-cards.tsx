"use client";

import { Package, UserCheck, UserX, DollarSign, Wrench } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { GetAssetsDocument, AssetFieldsFragmentDoc } from "@/gql/graphql";
import { useFragment } from "@/gql/fragment-masking";

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("mn-MN").format(value)}₮`;

const formatPercent = (value: number) => `${Math.round(value)}%`;

export function KPICards() {
  const { data: assetsData, loading: assetsLoading } =
    useQuery(GetAssetsDocument);

  const kpiData = useMemo(() => {
    const assets = assetsData?.assets ?? [];

    const sumValue = (items: typeof assets) =>
      items.reduce((acc, a) => {
        const asset = useFragment(AssetFieldsFragmentDoc, a);
        return acc + (asset.currentBookValue ?? asset.purchaseCost ?? 0);
      }, 0);

    const totalAssets = assets.length;
    const totalValue = sumValue(assets);

    const assignedAssets = assets.filter((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);
      return !!asset.assignedTo;
    });

    const unassignedAssets = assets.filter((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);
      return !asset.assignedTo;
    });

    const sellableAssets = assets.filter((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);
      return asset.status === "AVAILABLE";
    });

    const brokenAssets = assets.filter((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);
      return asset.status === "IN_REPAIR" || asset.status === "DAMAGED";
    });

    const assignedPercent =
      totalAssets > 0 ? (assignedAssets.length / totalAssets) * 100 : 0;

    const unassignedPercent =
      totalAssets > 0 ? (unassignedAssets.length / totalAssets) * 100 : 0;

    const sellablePercent =
      totalAssets > 0 ? (sellableAssets.length / totalAssets) * 100 : 0;

    const brokenPercent =
      totalAssets > 0 ? (brokenAssets.length / totalAssets) * 100 : 0;

    return [
      {
        title: "Нийт хөрөнгө",
        value: formatMoney(totalValue),
        subtitle: "100%",
        progress: 100,
        icon: Package,
        iconBorder: "border-sky-400",
        iconColor: "text-sky-400",
      },
      {
        title: "Эзэмшигчтэй",
        value: formatMoney(sumValue(assignedAssets)),
        subtitle: formatPercent(assignedPercent),
        progress: assignedPercent,
        icon: UserCheck,
        iconBorder: "border-green-400",
        iconColor: "text-green-400",
      },
      {
        title: "Эзэмшигчгүй",
        value: formatMoney(sumValue(unassignedAssets)),
        subtitle: formatPercent(unassignedPercent),
        progress: unassignedPercent,
        icon: UserCheck,
        iconBorder: "border-orange-400",
        iconColor: "text-orange-400",
      },
      {
        title: "Зарж болох",
        value: formatMoney(sumValue(sellableAssets)),
        subtitle: formatPercent(sellablePercent),
        progress: sellablePercent,
        icon: UserCheck,
        iconBorder: "border-yellow-400",
        iconColor: "text-yellow-400",
      },
      {
        title: "Эвдрэлтэй",
        value: formatMoney(sumValue(brokenAssets)),
        subtitle: formatPercent(brokenPercent),
        progress: brokenPercent,
        icon: Wrench,
        iconBorder: "border-red-400",
        iconColor: "text-red-400",
      },
    ];
  }, [assetsData?.assets]);

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
  return (
    <Card className="rounded-xl border bg-white shadow-sm">
      <CardContent className=" space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base text-foreground">{title}</p>

            <p className="text-xl font-bold mt-2.5 ">{loading ? "—" : value}</p>
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
