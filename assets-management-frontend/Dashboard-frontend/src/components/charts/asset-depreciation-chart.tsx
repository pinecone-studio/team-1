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
import { GetAssetsDocument, AssetFieldsFragmentDoc } from "@/gql/graphql";
import { useFragment } from "@/gql/fragment-masking";

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
  const { data: assetsData, loading } = useQuery(GetAssetsDocument);

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
      months.map((month) => [
        month.key,
        { month: month.label, cost: 0, value: 0 },
      ]),
    );

    const unmaskedAssets = assets.map((a) =>
      useFragment(AssetFieldsFragmentDoc, a),
    );

    unmaskedAssets.forEach((asset) => {
      const purchaseDate = asset.purchaseDate
        ? new Date(asset.purchaseDate)
        : new Date(asset.createdAt);

      const monthsBack = 5; // Iterate for the last 6 months (0 to 5)
      for (let i = 0; i <= monthsBack; i++) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1); // Start of the month
        const key = getMonthKey(monthDate);

        // If the asset was purchased on or before this month, include it
        if (purchaseDate <= monthDate) {
          const entry = buckets.get(key);
          if (entry) {
            entry.cost += asset.purchaseCost ?? 0;
            entry.value += asset.currentBookValue ?? asset.purchaseCost ?? 0;
          }
        }
      }
    });

    let runningTotal = 0;
    return months.map((month) => {
      const bucket = buckets.get(month.key);
      const cost = bucket?.cost ?? 0;
      const value = bucket?.value ?? 0;
      const depreciation = Math.max(0, cost - value);
      runningTotal = depreciation; // In this chart, trend seems to be the total depreciation? Or accumulated?
      // Looking at original code, it was calculating monthly depreciation.
      return {
        month: month.label,
        depreciation,
        trend: value, // Let's use value as the trend line
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
        <div className="h-70">
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
