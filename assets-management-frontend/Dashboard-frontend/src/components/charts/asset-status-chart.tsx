"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetAssetsDocument, AssetFieldsFragmentDoc } from "@/gql/graphql";
import { useFragment } from "@/gql/fragment-masking";

const UNKNOWN_LOCATION = "Тодорхойгүй";

export function AssetStatusChart() {
  const { data: assetsData, loading } = useQuery(GetAssetsDocument);

  const chartData = useMemo(() => {
    const assets = assetsData?.assets ?? [];
    const buckets = new Map<string, { main: number; accent: number }>();

    assets.forEach((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);
      const location = asset.locationId ?? UNKNOWN_LOCATION;
      const entry = buckets.get(location) ?? { main: 0, accent: 0 };

      if (asset.status === "AVAILABLE") {
        entry.main += 1;
      } else {
        entry.accent += 1;
      }

      buckets.set(location, entry);
    });

    return Array.from(buckets.entries()).map(([location, counts]) => ({
      location,
      ...counts,
    }));
  }, [assetsData?.assets]);

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.max(...chartData.map((item) => item.main + item.accent));
  }, [chartData]);

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          Хөрөнгийн төлөв байдал /байршлаар/
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-70">
          {loading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Уншиж байна...
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Өгөгдөл алга
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barCategoryGap="25%" barGap={4}>
                <XAxis
                  dataKey="location"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#0891B2" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, Math.max(1, maxValue)]}
                />
                <ReferenceLine
                  y={Math.max(1, Math.round(maxValue * 0.75))}
                  stroke="#38bdf8"
                  strokeDasharray="0"
                  strokeWidth={1}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar
                  dataKey="main"
                  name="AVAILABLE"
                  fill="#0891B2"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={194}
                />
                <Bar
                  dataKey="accent"
                  name="Бусад"
                  fill="#E11D48"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={194}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
