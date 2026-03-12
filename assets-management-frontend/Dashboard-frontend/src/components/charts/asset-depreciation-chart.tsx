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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "1-р сар", depreciation: 120, trend: 450 },
  { month: "2-р сар", depreciation: 150, trend: 460 },
  { month: "3-р сар", depreciation: 180, trend: 470 },
  { month: "4-р сар", depreciation: 200, trend: 480 },
  { month: "5-р сар", depreciation: 220, trend: 490 },
  { month: "6-р с", depreciation: 250, trend: 500 },
];

export function AssetDepreciationChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Хөрөнгийн элэгдэл /сараар/
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
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
                domain={[0, 600]}
                ticks={[0, 150, 300, 450, 600]}
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
        </div>
      </CardContent>
    </Card>
  );
}
