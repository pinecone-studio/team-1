"use client";

import { Package, UserCheck, UserX, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const kpiData = [
  {
    title: "Нийт хөрөнгө",
    value: "1,847,888,999₮",
    subtitle: "2471ш",
    icon: Package,
    iconBg: "bg-[#475569]",
    iconColor: "text-white",
  },
  {
    title: "Эзэмшигчтэй",
    value: "1,247,888,999₮",
    subtitle: "471ш",
    icon: UserCheck,
    iconBg: "bg-[#0891B2]",
    iconColor: "text-white",
  },
  {
    title: "Эзэмшигчгүй",
    value: "7,888,999₮",
    subtitle: "17ш",
    icon: UserX,
    iconBg: "bg-[#16A34A]",
    iconColor: "text-white",
  },
  {
    title: "Зарж болох",
    value: "47,888,999₮",
    subtitle: "56ш",
    icon: DollarSign,
    iconBg: "bg-[#F59E0B]",
    iconColor: "text-white",
  },
];

export function KPICards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold tracking-tight text-foreground pt-[24px]">
                  {kpi.value}
                </p>
                <p className="text-sm text-muted-foreground">{kpi.subtitle}</p>
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
