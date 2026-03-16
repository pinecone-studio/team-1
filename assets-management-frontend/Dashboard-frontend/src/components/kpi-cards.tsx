"use client";

import { Package, UserCheck, UserX, DollarSign } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { GetAssetsDocument, EmployeesDocument, CategoriesDocument, AssetFieldsFragmentDoc } from "@/gql/graphql";
import { useFragment } from "@/gql/fragment-masking";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    maximumFractionDigits: 0,
  }).format(value);

const formatCount = (value: number) => `${value}ш`;

export function KPICards() {
  const { data: assetsData, loading: assetsLoading } = useQuery(GetAssetsDocument);

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

    return [
      {
        title: "Нийт хөрөнгө",
        value: formatMoney(totalValue),
        subtitle: formatCount(totalAssets),
        icon: Package,
        iconBg: "bg-[#475569]",
        iconColor: "text-white",
      },
      {
        title: "Эзэмшигчтэй",
        value: formatMoney(sumValue(assignedAssets)),
        subtitle: formatCount(assignedAssets.length),
        icon: UserCheck,
        iconBg: "bg-[#0891B2]",
        iconColor: "text-white",
      },
      {
        title: "Эзэмшигчгүй",
        value: formatMoney(sumValue(unassignedAssets)),
        subtitle: formatCount(unassignedAssets.length),
        icon: UserX,
        iconBg: "bg-[#16A34A]",
        iconColor: "text-white",
      },
      {
        title: "Зарж болох",
        value: formatMoney(sumValue(sellableAssets)),
        subtitle: formatCount(sellableAssets.length),
        icon: DollarSign,
        iconBg: "bg-[#F59E0B]",
        iconColor: "text-white",
      },
    ];
  }, [assetsData?.assets]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, idx) => (
        <KPICard
          key={kpi.title}
          {...kpi}
          loading={assetsLoading}
          delay={idx * 100}
        />
      ))}
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  loading?: boolean;
  delay?: number;
}

function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  loading,
}: KPICardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight text-foreground pt-[24px]">
              {loading ? "—" : value}
            </p>
            <p className="text-sm text-muted-foreground">
              {loading ? "" : subtitle}
            </p>
          </div>
          <div className={`rounded-xl p-2 ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
