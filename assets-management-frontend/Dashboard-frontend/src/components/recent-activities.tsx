"use client";

import {
  UserPlus,
  RotateCcw,
  ArrowLeftRight,
  ClipboardCheck,
  DollarSign,
  BadgeCheck,
} from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AssignmentsDocument,
  type AssignmentFieldsFragment,
  AssignmentFieldsFragmentDoc,
  AssetFieldsFragmentDoc,
  EmployeesDocument,
  GetAuditLogsDocument,
} from "@/gql/graphql";
import { useFragment } from "@/gql";

type ActivityType =
  | "assigned"
  | "returned"
  | "transferred"
  | "verified"
  | "asset_status_changed"
  | "asset_price_changed";

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
    case "asset_status_changed":
      return {
        icon: BadgeCheck,
        iconColor: "text-indigo-500",
      };
    case "asset_price_changed":
      return {
        icon: DollarSign,
        iconColor: "text-emerald-600",
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
  const { data: auditData, loading: auditLoading } = useQuery(
    GetAuditLogsDocument,
    {
      variables: { tableName: "assets" },
      fetchPolicy: "network-only",
    },
  );
  const { data: employeesData } = useQuery(EmployeesDocument, {
    fetchPolicy: "cache-first",
  });

  const activities = useMemo(() => {
    const employeeNameById = new Map<string, string>();
    (employeesData?.employees ?? []).forEach((e) => {
      const name =
        [e.firstName, e.lastName].filter(Boolean).join(" ") || e.email || e.id;
      employeeNameById.set(e.id, name);
    });

    const raw = assignmentsData?.assignments ?? [];
    const assignments = (raw as AssignmentFieldsFragment[]).filter((a: any) => {
      const assignment = useFragment(AssignmentFieldsFragmentDoc, a);
      const asset = assignment.asset
        ? useFragment(AssetFieldsFragmentDoc, assignment.asset)
        : null;
      return asset && !asset?.deletedAt;
    });

    const sorted = [...assignments].sort((a, b) => {
      const timeA = a.returnedAt ?? a.assignedAt;
      const timeB = b.returnedAt ?? b.assignedAt;
      return timeB - timeA;
    });

    const assignmentActivities = sorted.slice(0, 20).map((assignment) => {
      const employeeName = assignment.employee
        ? `${assignment.employee.firstName} ${assignment.employee.lastName}`.trim()
        : "Admin";

      const asset = assignment.asset as
        | { category?: string }
        | null
        | undefined;
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
        ts: timeStamp,
        ...pickActivityIcon(type),
      };
    });

    type Audit = {
      id: string;
      recordId: string;
      action: string;
      actorId: string;
      oldValueJson?: string | null;
      newValueJson?: string | null;
      createdAt: number;
    };

    const safeJson = (value?: string | null) => {
      if (!value) return null;
      try {
        return JSON.parse(value) as any;
      } catch {
        return null;
      }
    };

    const auditLogs = (auditData?.auditLogs ?? []) as Audit[];
    const assetAuditActivities = auditLogs
      .filter((l) => l.action === "ASSET_UPDATED")
      .map((l) => {
        const oldV = safeJson(l.oldValueJson) ?? {};
        const newV = safeJson(l.newValueJson) ?? {};
        const assetTag = oldV.assetTag ?? oldV.assetId ?? l.recordId;
        const actor = employeeNameById.get(l.actorId) ?? "Admin";

        const oldStatus = oldV.status;
        const nextStatus = newV.status;
        const statusChanged =
          typeof nextStatus === "string" &&
          typeof oldStatus === "string" &&
          nextStatus !== oldStatus;

        const oldPurchaseCost =
          typeof oldV.purchaseCost === "number" ? oldV.purchaseCost : null;
        const nextPurchaseCost =
          typeof newV.purchaseCost === "number" ? newV.purchaseCost : null;
        const priceChanged =
          nextPurchaseCost != null && nextPurchaseCost !== oldPurchaseCost;

        let type: ActivityType | null = null;
        let title = "";
        if (statusChanged) {
          type = "asset_status_changed";
          title = `${actor} нь ${assetTag} хөрөнгийн төлөвийг ${oldStatus} → ${nextStatus} болгож өөрчилсөн`;
        } else if (priceChanged) {
          type = "asset_price_changed";
          title = `${actor} нь ${assetTag} хөрөнгийн үнийг ${oldPurchaseCost ?? 0}₮ → ${nextPurchaseCost}₮ болгож өөрчилсөн`;
        } else if (typeof nextStatus === "string") {
          type = "asset_status_changed";
          title = `${actor} нь ${assetTag} хөрөнгийн төлөвийг ${nextStatus} болгож өөрчилсөн`;
        } else if (nextPurchaseCost != null) {
          type = "asset_price_changed";
          title = `${actor} нь ${assetTag} хөрөнгийн үнийг ${nextPurchaseCost}₮ болгож өөрчилсөн`;
        }

        if (!type || !title) return null;

        return {
          id: l.id,
          title,
          time: formatDateTime(l.createdAt),
          ts: l.createdAt,
          ...pickActivityIcon(type),
        };
      })
      .filter(Boolean) as Array<{
      id: string;
      title: string;
      time: string;
      ts: number;
      icon: any;
      iconColor: string;
    }>;

    const combined = [...assetAuditActivities, ...assignmentActivities]
      .sort((a, b) => (b.ts ?? 0) - (a.ts ?? 0))
      .slice(0, 20);

    return combined;
  }, [
    assignmentsData?.assignments,
    auditData?.auditLogs,
    employeesData?.employees,
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Сүүлд хийгдсэн үйлдлүүд
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-80 px-6">
          <div className="space-y-5 py-2">
            {loading || auditLoading ? (
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
                      <Icon className={`h-5 w-5 ${activity.iconColor}`} />
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
