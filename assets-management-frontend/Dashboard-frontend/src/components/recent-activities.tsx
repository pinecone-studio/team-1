"use client";

import { Monitor, Laptop, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    icon: Laptop,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "MacBook Pro-г John Smith-д хуваарилсан",
    code: "AST-001892",
    time: "2 minutes ago",
  },
  {
    id: 2,
    icon: Monitor,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Dell дэлгэцийг Sarah Johnson бүцаан өгсөн",
    code: "AST-001456",
    time: "15 minutes ago",
  },
  {
    id: 3,
    icon: FileCheck,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "IT хэлтсийн тоологч баталгаажуулалт дууссан",
    code: "CEN-2024-03",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: FileCheck,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Маркетингийн хэлтсийн тоологч баталгаажуулалт дууссан",
    code: "CEN-2024-04",
    time: "5 hours ago",
  },
  {
    id: 5,
    icon: FileCheck,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    title: "Маркетингийн хэлтсийн тоологч баталгаажуулалт дууссан",
    code: "CEN-2024-04",
    time: "5 hours ago",
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Сүүлд хийгдсэн үйлдлүүд
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-4 py-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.iconBg}`}
                >
                  <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-tight text-foreground">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {activity.code}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
