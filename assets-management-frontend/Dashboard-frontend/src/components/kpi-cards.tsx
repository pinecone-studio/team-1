"use client";

import { Package, UserCheck, UserX, DollarSign } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { AssetsDocument } from "@/gql/graphql";

const formatMoney = (value: number) =>
  new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    maximumFractionDigits: 0,
  }).format(value);

const formatCount = (value: number) => `${value}ш`;

export function KPICards() {
  const { data, loading } = useQuery(AssetsDocument);

  const kpiData = useMemo(() => {
    const assets = data?.assets ?? [];

    const sumValue = (items: typeof assets) =>
      items.reduce((acc, asset) => {
        const value = asset.currentBookValue ?? asset.purchaseCost ?? 0;
        return acc + value;
      }, 0);

    const assigned = assets.filter((asset) => Boolean(asset.assignedTo));
    const unassigned = assets.filter((asset) => !asset.assignedTo);
    const sellable = assets.filter((asset) => asset.status === "AVAILABLE");

    return [
      {
        title: "Нийт хөрөнгө",
        value: formatMoney(sumValue(assets)),
        subtitle: formatCount(assets.length),
        icon: Package,
        iconBg: "bg-[#475569]",
        iconColor: "text-white",
      },
      {
        title: "Эзэмшигчтэй",
        value: formatMoney(sumValue(assigned)),
        subtitle: formatCount(assigned.length),
        icon: UserCheck,
        iconBg: "bg-[#0891B2]",
        iconColor: "text-white",
      },
      {
        title: "Эзэмшигчгүй",
        value: formatMoney(sumValue(unassigned)),
        subtitle: formatCount(unassigned.length),
        icon: UserX,
        iconBg: "bg-[#16A34A]",
        iconColor: "text-white",
      },
      {
        title: "Зарж болох",
        value: formatMoney(sumValue(sellable)),
        subtitle: formatCount(sellable.length),
        icon: DollarSign,
        iconBg: "bg-[#F59E0B]",
        iconColor: "text-white",
      },
    ];
  }, [data?.assets]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold tracking-tight text-foreground pt-[24px]">
                  {loading ? "—" : kpi.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {loading ? "" : kpi.subtitle}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.iconBg}`}
              >
                <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
