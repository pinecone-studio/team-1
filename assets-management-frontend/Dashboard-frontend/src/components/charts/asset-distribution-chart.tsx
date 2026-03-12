"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Сандал", value: 456, color: "#475569" },
  { name: "IMAC", value: 189, color: "#0891B2" },
  { name: "Монитор", value: 89, color: "#16A34A" },
  { name: "Macbook", value: 32, color: "#E11D48" },
  { name: "Magic keyboard", value: 145, color: "#fb923c" },
  { name: "Бусад", value: 56, color: "#FECDD3" },
];

export function AssetDistributionChart() {
  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          Хөрөнгийн тархалт /ангиллаар/
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-70 flex items-center">
          <div className="w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 flex flex-col gap-2 pl-4">
            {data.map((item) => (
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
        </div>
      </CardContent>
    </Card>
  );
}
