"use client";

import {
  UserPlus,
  RotateCcw,
  ArrowLeftRight,
  ClipboardCheck,
} from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AssignmentsDocument,
  type AssignmentFieldsFragment,
} from "@/gql/graphql";

type ActivityType = "assigned" | "returned" | "transferred" | "verified";

/* DATE FORMATTER */
const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hour}:${minute}`;
};

/* ICON PICKER */
const pickActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "assigned":
      return {
        icon: UserPlus,
        iconColor: "text-green-500",
      };

    case "returned":
      return {
        icon: RotateCcw,
        iconColor: "text-orange-500",
      };

    case "transferred":
      return {
        icon: ArrowLeftRight,
        iconColor: "text-blue-500",
      };

    case "verified":
      return {
        icon: ClipboardCheck,
        iconColor: "text-blue-500",
      };

    default:
      return {
        icon: UserPlus,
        iconColor: "text-gray-500",
      };
  }
};

export function RecentActivities() {
  const { data: assignmentsData, loading } = useQuery(AssignmentsDocument, {});

  const activities = useMemo(() => {
    const raw = assignmentsData?.assignments ?? [];
    const assignments = raw as AssignmentFieldsFragment[];

    const sorted = [...assignments].sort((a, b) => {
      const timeA = a.returnedAt ?? a.assignedAt;
      const timeB = b.returnedAt ?? b.assignedAt;
      return timeB - timeA;
    });

    return sorted.slice(0, 20).map((assignment) => {
      const employeeName = assignment.employee
        ? `${assignment.employee.firstName} ${assignment.employee.lastName}`.trim()
        : "Тодорхойгүй";

      const asset =
        assignment.asset as { category?: string } | null | undefined;
      const assetName = asset?.category ?? "Хөрөнгө";

      const timeStamp = assignment.returnedAt ?? assignment.assignedAt;

      let type: ActivityType = "assigned";
      if (assignment.returnedAt) type = "returned";

      let title = `${assetName}-г ${employeeName}-д хуваарилсан`;
      if (type === "returned") {
        title = `${assetName}-г ${employeeName} буцаан өгсөн`;
      }

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
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-4/5 rounded-full" />
                    <Skeleton className="h-3 w-28 rounded-full" />
                  </div>
                </div>
              ))
            ) : activities.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Өгөгдөл алга
              </div>
            ) : (
              activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <Icon
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
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
