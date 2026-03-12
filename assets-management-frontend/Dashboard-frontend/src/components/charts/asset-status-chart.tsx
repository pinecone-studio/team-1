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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    location: "Гурван гол",
    main: 45,
    accent: 15,
  },
  {
    location: "Сиэтл оффис",
    main: 48,
    accent: 15,
  },
  {
    location: "Гэгээ нарны зам",
    main: 30,
    accent: 15,
  },
  {
    location: "Гэгээ яармаг",
    main: 60,
    accent: 15,
  },
];

export function AssetStatusChart() {
  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          Хөрөнгийн төлөв байдал /байршлаар/
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-70">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="25%" barGap={4}>
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
                domain={[0, 60]}
                ticks={[0, 15, 30, 45, 60]}
              />
              <ReferenceLine
                y={45}
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
                name="Үндсэн"
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
        </div>
      </CardContent>
    </Card>
  );
}
