"use client";

import { Monitor, Laptop, FileCheck } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssignmentsDocument } from "@/gql/graphql";

const getRelativeTime = (timestamp: number) => {
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "Дөнгөж сая";
  if (diffMinutes < 60) return `${diffMinutes} минутын өмнө`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} цагийн өмнө`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} өдрийн өмнө`;
};

const pickActivityIcon = (type: "assigned" | "returned") => {
  if (type === "returned") {
    return { icon: Monitor, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" };
  }
  return { icon: Laptop, iconBg: "bg-blue-100", iconColor: "text-blue-600" };
};

export function RecentActivities() {
  const { data: assignmentsData, loading } = useQuery(AssignmentsDocument);

  const activities = useMemo(() => {
    const assignments = assignmentsData?.assignments ?? [];
    const sorted = [...assignments].sort((a, b) => {
      const timeA = a.returnedAt ?? a.assignedAt;
      const timeB = b.returnedAt ?? b.assignedAt;
      return timeB - timeA;
    });

    return sorted.slice(0, 8).map((assignment) => {
      const employeeName = assignment.employee
        ? `${assignment.employee.firstName} ${assignment.employee.lastName}`.trim()
        : "Тодорхойгүй";
      const assetName = assignment.asset?.category ?? "Хөрөнгө";
      const code = assignment.asset?.assetTag ?? assignment.assetId;
      const isReturned = Boolean(assignment.returnedAt);
      const timeStamp = assignment.returnedAt ?? assignment.assignedAt;
      const type = isReturned ? "returned" : "assigned";

      const title = isReturned
        ? `${assetName}-г ${employeeName} буцаан өгсөн`
        : `${assetName}-г ${employeeName}-д хуваарилсан`;

      return {
        id: assignment.id,
        title,
        code,
        time: getRelativeTime(timeStamp),
        ...pickActivityIcon(type),
      };
    });
  }, [assignmentsData?.assignments]);

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
            {loading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Уншиж байна...
              </div>
            ) : activities.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Өгөгдөл алга
              </div>
            ) : (
              activities.map((activity) => (
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
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
