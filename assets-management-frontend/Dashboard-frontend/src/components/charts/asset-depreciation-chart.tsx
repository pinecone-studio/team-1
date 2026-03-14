"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Line,
  ComposedChart,
} from "recharts";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetsDocument } from "@/gql/graphql";

const MONTH_LABELS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

const getMonthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

export function AssetDepreciationChart() {
  const { data: assetsData, loading } = useQuery(AssetsDocument);

  const chartData = useMemo(() => {
    const assets = assetsData?.assets ?? [];
    const now = new Date();
    const months: { key: string; label: string }[] = [];

    for (let i = 5; i >= 0; i -= 1) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: getMonthKey(date),
        label: MONTH_LABELS[date.getMonth()],
      });
    }

    const buckets = new Map(
      months.map((month) => [month.key, { month: month.label, depreciation: 0 }]),
    );

    assets.forEach((asset) => {
      const rawDate = asset.purchaseDate ?? asset.createdAt;
      if (!rawDate) return;
      const date = new Date(rawDate);
      const key = getMonthKey(date);
      const bucket = buckets.get(key);
      if (!bucket) return;

      const purchaseCost = asset.purchaseCost ?? 0;
      const currentValue = asset.currentBookValue ?? purchaseCost;
      const depreciation = Math.max(0, purchaseCost - currentValue);
      bucket.depreciation += depreciation;
    });

    let runningTotal = 0;
    return months.map((month) => {
      const bucket = buckets.get(month.key);
      const depreciation = bucket?.depreciation ?? 0;
      runningTotal += depreciation;
      return {
        month: month.label,
        depreciation,
        trend: runningTotal,
      };
    });
  }, [assetsData?.assets]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Хөрөнгийн элэгдэл /сараар/
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Уншиж байна...
            </div>
          ) : chartData.every((item) => item.depreciation === 0) ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Өгөгдөл алга
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="depreciation"
                  name="Элэгдэл"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
                <Line
                  type="monotone"
                  dataKey="trend"
                  name="Хуримтлагдсан"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", strokeWidth: 0, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
