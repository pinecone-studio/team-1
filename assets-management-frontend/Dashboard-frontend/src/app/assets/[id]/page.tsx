"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import type { AssetFieldsFragment } from "@/gql/graphql";
import {
  GetAssetDocument,
  GetAssetHistoryDocument,
  GetAuditLogsDocument,
  EmployeesDocument,
} from "@/gql/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Эзэмшигчтэй",
  ASSIGN_REQUESTED: "Хүсэлт илгээсэн",
  AVAILABLE: "Эзэмшигчгүй",
  IN_REPAIR: "Засварт",
  DAMAGED: "Эвдрэлтэй",
  DISPOSAL_REQUESTED: "Устгах хүсэлт орсон",
  PENDING_DISPOSAL: "Устгах хүлээгдэж буй",
  DISPOSED: "Устгасан",
  FOR_SALE: "Зарж болох",
};

const AUDIT_ACTION_LABELS: Record<string, string> = {
  REGISTERED: "Бүртгэсэн",
  PURCHASED: "Худалдан авсан",
  ASSET_UPDATED: "Өөрчилсөн",
  ASSET_RETURNED: "Буцаасан",
  RETURNED: "Буцаасан",
  ASSET_DISPOSED: "Устгасан (IT/санхүү)",
  DISPOSED: "Устгасан",
  DISPOSAL_REQUESTED: "Устгах хүсэлт илгээсэн",
  DISPOSAL_IT_APPROVED: "IT баталгаажсан",
  DISPOSAL_FINANCE_APPROVED: "Санхүү баталгаажсан",
  DISPOSAL_REJECTED: "Устгах хүсэлт татгалзсан",
  ASSIGNED: "Олгосон",
  ASSIGNMENT_ACCEPTED: "Эзэмшигч зөвшөөрсөн",
  ASSIGNMENT_REJECTED: "Эзэмшигч татгалзсан",
  TRANSFERRED: "Шилжүүлсэн",
  LOCATION_MOVED: "Байршил солигдсон",
  MAINTENANCE_OPENED: "Засварын дугаар нээгдсэн",
  MAINTENANCE_RESOLVED: "Засвар дууссан",
};

export default function AssetDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: assetData, loading: assetLoading } = useQuery(
    GetAssetDocument,
    {
      variables: { id },
      skip: !id,
    },
  );
  const { data: historyData } = useQuery(GetAssetHistoryDocument, {
    variables: { assetId: id },
    skip: !id,
  });
  const { data: auditData } = useQuery(GetAuditLogsDocument, {
    variables: { recordId: id, tableName: "assets" },
    skip: !id,
  });
  const { data: employeesData } = useQuery(EmployeesDocument, { skip: !id });

  const asset = assetData?.asset;
  const history = historyData?.assetHistory ?? [];
  const auditLogs = auditData?.auditLogs ?? [];

  const actorNameById = useMemo(() => {
    const map = new Map<string, string>();
    const employees = (employeesData?.employees ?? []) as Array<{
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    }>;
    employees.forEach((e) => {
      const name =
        [e.firstName, e.lastName].filter(Boolean).join(" ") || e.email || e.id;
      map.set(e.id, name);
    });
    return map;
  }, [employeesData?.employees]);

  if (!id) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-muted-foreground">Хөрөнгийн ID олдсонгүй.</p>
      </div>
    );
  }

  if (assetLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-muted-foreground">Ачаалж байна...</p>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-destructive">Хөрөнгө олдсонгүй.</p>
      </div>
    );
  }

  const a = asset as AssetFieldsFragment;
  const statusLabel =
    STATUS_LABELS[a.status?.toUpperCase?.() ?? ""] ?? a.status ?? "—";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Зураг + үндсэн мэдээлэл */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Хөрөнгийн дэлгэрэнгүй</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-6">
          <div className="shrink-0">
            {a.imageUrl ? (
              <div className="relative w-48 h-48 rounded-lg overflow-hidden border bg-muted">
                <img
                  src={a.imageUrl}
                  alt={a.assetTag ?? ""}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-lg border bg-muted flex items-center justify-center text-muted-foreground text-sm">
                Зураг байхгүй
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm flex-1 min-w-0">
            <div>
              <p className="text-muted-foreground">Нэр (таг)</p>
              <p className="font-medium">{a.assetTag ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Сериал дугаар</p>
              <p className="font-medium">{a.serialNumber ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Төлөв</p>
              <Badge variant="secondary">{statusLabel}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Ангилал</p>
              <p className="font-medium">{a.category ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Худалдан авсан өртөг (₮)</p>
              <p className="font-medium">
                {a.purchaseCost != null
                  ? Number(a.purchaseCost).toLocaleString()
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Одоогийн дансны үнэ (₮)</p>
              <p className="font-medium">
                {a.currentBookValue != null
                  ? Number(a.currentBookValue).toLocaleString()
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Байршил</p>
              <p className="font-medium">
                {a.locationPath && !/^[0-9a-f-]{20,}$/i.test(a.locationPath)
                  ? a.locationPath
                  : "—"}
              </p>
            </div>
            {a.notes && (
              <div className="col-span-2">
                <p className="text-muted-foreground">Тэмдэглэл</p>
                <p className="font-medium">{a.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Хөрөнгийн түүх — хэн бүртгэсэн, олгосон, шилжүүлсэн */}
      <Card>
        <CardHeader>
          <CardTitle>Түүх (хэн бүртгэсэн, олгосон, шилжүүлсэн)</CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">Түүх олдсонгүй.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((event) => (
                <li
                  key={event.id}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm border-b pb-2 last:border-0"
                >
                  <span className="font-medium text-muted-foreground shrink-0">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                  <span className="font-medium">
                    {AUDIT_ACTION_LABELS[event.eventType] ?? event.eventType}
                  </span>
                  <span>{event.description}</span>
                  {event.actor && (
                    <span className="text-muted-foreground">
                      —{" "}
                      {[
                        (
                          event.actor as {
                            firstName?: string;
                            lastName?: string;
                          }
                        ).firstName,
                        (
                          event.actor as {
                            firstName?: string;
                            lastName?: string;
                          }
                        ).lastName,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Audit log — бүх үйлдлийн бүртгэл */}
      <Card>
        <CardHeader>
          <CardTitle>Audit log (үйлдлийн бүртгэл)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Хэн ямар үйлдэл хийсэн, өмнөх/шинэ утга. Бүртгэл, хэн рүү шилжүүлсэн, устгах хүсэлт, IT/санхүүгийн баталгаа зэрэг бүгд энд харагдана.
          </p>
        </CardHeader>
        <CardContent>
          {auditLogs.length === 0 ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Энэ хөрөнгийн үйлдлийн бүртгэл одоогоор хоосон.</p>
              <p>
                Шинэ хөрөнгө нэмэх, засах, ажилтан олгох, шилжүүлэх, устгах хүсэлт илгээх, IT/санхүү баталгаажуулах зэрэг үйлдлүүд хийгдэх тусам энд бүртгэгдэнэ. Дээрх &quot;Түүх&quot; хэсэгт assignments/transfers-ийн түүх харагдана.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Огноо</TableHead>
                  <TableHead>Үйлдэл</TableHead>
                  <TableHead>Хэн</TableHead>
                  <TableHead>Өмнөх</TableHead>
                  <TableHead>Шинэ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {AUDIT_ACTION_LABELS[log.action] ?? log.action}
                    </TableCell>
                    <TableCell className="text-sm">
                      {actorNameById.get(log.actorId) ?? log.actorId}
                    </TableCell>
                    <TableCell
                      className="text-xs max-w-45 truncate"
                      title={log.oldValueJson ?? undefined}
                    >
                      {log.oldValueJson ?? "—"}
                    </TableCell>
                    <TableCell
                      className="text-xs max-w-45 truncate"
                      title={log.newValueJson ?? undefined}
                    >
                      {log.newValueJson ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
