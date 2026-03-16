"use client";

import { UserPlus, RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AssignmentsDocument } from "@/gql/graphql";

type ActivityType = "assigned" | "returned";

/* ----- DATE FORMATTER ----- */
const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minute}`;
};

const pickActivityIcon = (type: ActivityType) => {
  if (type === "returned") {
    return {
      icon: RotateCcw,
      iconColor: "text-orange-500",
    };
  }

  return {
    icon: UserPlus,
    iconColor: "text-green-500",
  };
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

    return sorted.slice(0, 20).map((assignment) => {
      const employeeName = assignment.employee
        ? `${assignment.employee.firstName} ${assignment.employee.lastName}`.trim()
        : "Тодорхойгүй";

      const assetName = assignment.asset?.category ?? "Хөрөнгө";

      const isReturned = Boolean(assignment.returnedAt);

      const timeStamp = assignment.returnedAt ?? assignment.assignedAt;

      const type: ActivityType = isReturned ? "returned" : "assigned";

      const title = isReturned
        ? `${assetName}-г ${employeeName} буцаан өгсөн`
        : `${assetName}-г ${employeeName}-д хуваарилсан`;

      const time = formatDateTime(timeStamp);

      return {
        id: assignment.id,
        title,
        time,
        ...pickActivityIcon(type),
      };
    });
  }, [assignmentsData?.assignments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Сүүлд хийгдсэн үйлдлүүд
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-6">
          <div className="space-y-5 py-2">
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
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center">
                    <activity.icon
                      className={`h-5 w-5 ${activity.iconColor}`}
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>

                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
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
