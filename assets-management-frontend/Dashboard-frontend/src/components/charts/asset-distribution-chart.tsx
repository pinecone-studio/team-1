"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetsDocument } from "@/gql/graphql";

const COLORS = ["#475569", "#0891B2", "#16A34A", "#E11D48", "#fb923c", "#FECDD3"];
const OTHER_LABEL = "Бусад";

export function AssetDistributionChart() {
  const { data: assetsData, loading } = useQuery(AssetsDocument);

  const chartData = useMemo(() => {
    const assets = assetsData?.assets ?? [];
    const counts = new Map<string, number>();

    assets.forEach((asset) => {
      const key = asset.category || OTHER_LABEL;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5);
    const rest = sorted.slice(5);
    const restTotal = rest.reduce((acc, [, value]) => acc + value, 0);

    const base = top.map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));

    if (restTotal > 0) {
      base.push({
        name: OTHER_LABEL,
        value: restTotal,
        color: COLORS[COLORS.length - 1],
      });
    }

    return base;
  }, [assetsData?.assets]);

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          Хөрөнгийн тархалт /ангиллаар/
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-70 flex items-center">
          {loading ? (
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
              Уншиж байна...
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
              Өгөгдөл алга
            </div>
          ) : (
            <>
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 flex flex-col gap-2 pl-4">
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
