"use client";

import { useRouter } from "next/navigation";
import {
  type LucideIcon,
  Package,
  UserCheck,
  Wrench,
  UserRoundX,
  CircleDollarSign,
} from "lucide-react";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetAssetsDocument, type AssetFieldsFragment } from "@/gql/graphql";

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("mn-MN").format(value)}₮`;

const formatPercent = (value: number) => `${Math.round(value)}%`;

export function KPICards({
  onOpenAssets,
}: {
  onOpenAssets?: (status: string) => void;
}) {
  const router = useRouter();
  const { data, loading: assetsLoading } = useQuery(GetAssetsDocument, {
    variables: {
      office: undefined,
      categoryIds: undefined,
      subCategoryIds: undefined,
      locationIds: undefined,
    },
  });

  const normalizedAssets =
    data?.assets?.map((rawAsset) => {
      const asset = rawAsset as unknown as AssetFieldsFragment;
      const currentBookValue =
        asset.currentBookValue ?? asset.purchaseCost ?? 0;

      return {
        status: asset.status,
        currentBookValue,
      };
    }) ?? [];

  const totalAssets = normalizedAssets.length;
  const totalValue = normalizedAssets.reduce(
    (sum, asset) => sum + asset.currentBookValue,
    0,
  );

  const assignedAssets = normalizedAssets.filter(
    (asset) => asset.status === "ASSIGNED",
  );
  const unassignedAssets = normalizedAssets.filter(
    (asset) => asset.status === "AVAILABLE",
  );
  const sellableAssets = normalizedAssets.filter(
    (asset) => asset.status === "FOR_SALE",
  );
  const brokenAssets = normalizedAssets.filter((asset) =>
    ["DAMAGED", "DISPOSAL_REQUESTED", "PENDING_DISPOSAL", "DISPOSED"].includes(
      asset.status ?? "",
    ),
  );

  const assignedValue = assignedAssets.reduce(
    (sum, asset) => sum + asset.currentBookValue,
    0,
  );
  const unassignedValue = unassignedAssets.reduce(
    (sum, asset) => sum + asset.currentBookValue,
    0,
  );
  const sellableValue = sellableAssets.reduce(
    (sum, asset) => sum + asset.currentBookValue,
    0,
  );
  const brokenValue = brokenAssets.reduce(
    (sum, asset) => sum + asset.currentBookValue,
    0,
  );

  const assignedPercent =
    totalAssets > 0 ? (assignedAssets.length / totalAssets) * 100 : 0;
  const unassignedPercent =
    totalAssets > 0 ? (unassignedAssets.length / totalAssets) * 100 : 0;
  const sellablePercent =
    totalAssets > 0 ? (sellableAssets.length / totalAssets) * 100 : 0;
  const brokenPercent =
    totalAssets > 0 ? (brokenAssets.length / totalAssets) * 100 : 0;

  const valuePercentOfTotal = (value: number) =>
    totalValue > 0 ? (value / totalValue) * 100 : 0;

  const assignedValuePercent = valuePercentOfTotal(assignedValue);
  const unassignedValuePercent = valuePercentOfTotal(unassignedValue);
  const forSaleValuePercent = valuePercentOfTotal(sellableValue);
  const brokenValuePercent = valuePercentOfTotal(brokenValue);

  const kpiData = [
    {
      title: "Нийт хөрөнгө",
      value: formatMoney(totalValue),
      subtitle: `${totalAssets} ширхэг`,
      progress: 100,
      icon: Package,
      iconBorder: "border-sky-400",
      iconColor: "text-sky-400",
      targetStatus: "all",
    },
    {
      title: "Эзэмшигчтэй",
      value: formatMoney(assignedValue),
      valueSuffix: `/${assignedValuePercent.toFixed(1)}%`,
      subtitle: formatPercent(assignedPercent),
      progress: assignedPercent,
      icon: UserCheck,
      iconBorder: "border-green-400",
      iconColor: "text-green-400",
      targetStatus: "ASSIGNED",
    },
    {
      title: "Эзэмшигчгүй",
      value: formatMoney(unassignedValue),
      valueSuffix: `/${unassignedValuePercent.toFixed(1)}%`,
      subtitle: formatPercent(unassignedPercent),
      progress: unassignedPercent,
      icon: UserRoundX,
      iconBorder: "border-orange-400",
      iconColor: "text-orange-400",
      targetStatus: "AVAILABLE",
    },
    {
      title: "Зарж болох",
      value: formatMoney(sellableValue),
      valueSuffix: `/${forSaleValuePercent.toFixed(1)}%`,
      subtitle: formatPercent(sellablePercent),
      progress: sellablePercent,
      icon: CircleDollarSign,
      iconBorder: "border-yellow-400",
      iconColor: "text-yellow-400",
      targetStatus: "FOR_SALE",
    },
    {
      title: "Эвдрэлтэй",
      value: formatMoney(brokenValue),
      valueSuffix: `/${brokenValuePercent.toFixed(1)}%`,
      subtitle: formatPercent(brokenPercent),
      progress: brokenPercent,
      icon: Wrench,
      iconBorder: "border-red-400",
      iconColor: "text-red-400",
      targetStatus: "BROKEN",
    },
  ];

  const handleOpenAssets = (status: string) => {
    onOpenAssets?.(status);
    const params = new URLSearchParams({ section: "assets" });
    if (status !== "all") {
      params.set("status", status);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard title */}

      <h2 className="text-xl font-semibold text-foreground ">Хянах самбар</h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kpiData.map((kpi) => (
          <KPICard
            key={kpi.title}
            {...kpi}
            loading={assetsLoading}
            onOpen={() => handleOpenAssets(kpi.targetStatus)}
          />
        ))}
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  valueSuffix?: string;
  subtitle: string;
  secondary?: string;
  progress: number;
  icon: LucideIcon;
  iconBorder?: string;
  iconColor: string;
  loading?: boolean;
  onOpen?: () => void;
}

function KPICard({
  title,
  value,
  valueSuffix,
  subtitle,
  secondary,
  progress,
  icon: Icon,
  iconBorder,
  iconColor,
  loading,
  onOpen,
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
    <Card
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen?.();
        }
      }}
      className="cursor-pointer rounded-xl border bg-white shadow-sm transition-colors hover:border-black"
    >
      <CardContent className=" space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-base text-foreground">{title}</p>

            <p className="mt-2.5 flex items-baseline gap-1">
              <span className="text-xl font-bold">{value}</span>
              {valueSuffix ? (
                <span className="text-[11px] font-medium text-slate-400">
                  {valueSuffix}
                </span>
              ) : null}
            </p>
          </div>

          <div
            className={`flex items-center justify-center h-9 w-9 rounded-full border bg-white ${iconBorder}`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>{" "}
          {secondary ? (
            <p className="mb-2 text-[11px] text-slate-400">{secondary}</p>
          ) : null}
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
