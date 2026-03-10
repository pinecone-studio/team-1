"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { assetsByCategory, assetsByMonth, depreciationData } from "@/lib/mock-data"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"




type CategoryDatum = { category: string; count: number }

const COLORS = [
  "oklch(0.7 0.15 160)",   // primary/teal
  "oklch(0.65 0.18 250)",  // blue
  "oklch(0.75 0.15 85)",   // yellow
  "oklch(0.6 0.2 330)",    // pink
  "oklch(0.7 0.18 30)",    // orange
  "oklch(0.55 0.12 200)",  // cyan
]

export function AssetTrendChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Эд хөрөнгийн хандлага</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assetsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.005 270)" />
              <XAxis 
                dataKey="month" 
                stroke="oklch(0.45 0 0)"
                tick={{ fill: "oklch(0.45 0 0)" }}
              />
              <YAxis 
                stroke="oklch(0.45 0 0)"
                tick={{ fill: "oklch(0.45 0 0)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.9 0.005 270)",
                  borderRadius: "8px",
                  color: "oklch(0.145 0.005 270)",
                }}
              />
              <Bar dataKey="added" name="Нэмэгдсэн" fill="oklch(0.45 0.15 160)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="disposed" name="Устсан" fill="oklch(0.5 0.2 25)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function CategoryDistributionChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Ангиллаар</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetsByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
                nameKey="category"
              >
                {assetsByCategory.map((_: CategoryDatum, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.9 0.005 270)",
                  borderRadius: "8px",
                  color: "oklch(0.145 0.005 270)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {assetsByCategory.map((item: CategoryDatum, index: number) => (
            <div key={item.category} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-muted-foreground">
                {item.category}: {item.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DepreciationChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Элэгдлийн тойм</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={depreciationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.005 270)" />
              <XAxis 
                dataKey="month" 
                stroke="oklch(0.45 0 0)"
                tick={{ fill: "oklch(0.45 0 0)" }}
              />
              <YAxis 
                stroke="oklch(0.45 0 0)"
                tick={{ fill: "oklch(0.45 0 0)" }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.9 0.005 270)",
                  borderRadius: "8px",
                  color: "oklch(0.145 0.005 270)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Дансны үнэ"]}
              />
              <defs>
                <linearGradient id="depreciationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.5 0.18 250)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.5 0.18 250)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.5 0.18 250)"
                strokeWidth={2}
                fill="url(#depreciationGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function CensusProgressChart() {
  const censusData = [
    { name: "Баталгаажсан", value: 972, color: "oklch(0.7 0.15 160)" },
    { name: "Хүлээгдэж буй", value: 260, color: "oklch(0.75 0.15 85)" },
    { name: "Зөрүүтэй", value: 15, color: "oklch(0.55 0.22 25)" },
  ]

  const total = censusData.reduce((acc, item) => acc + item.value, 0)
  const verifiedPercent = Math.round((censusData[0].value / total) * 100)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Тооллогын баталгаажуулалт</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="h-[180px] w-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={censusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {censusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-card-foreground">{verifiedPercent}%</p>
              <p className="text-sm text-muted-foreground">Дууссан</p>
            </div>
            <div className="space-y-2">
              {censusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
