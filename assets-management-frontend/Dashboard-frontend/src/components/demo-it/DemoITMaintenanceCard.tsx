"use client";

import React from "react";
import { Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MaintenanceItem } from "./demo-it-utils";

export type DemoITMaintenanceCardProps = {
  allMaintenanceTickets: MaintenanceItem[];
  MAINTENANCE_STATUS_LABELS: Record<string, string>;
};

export function DemoITMaintenanceCard({
  allMaintenanceTickets,
  MAINTENANCE_STATUS_LABELS,
}: DemoITMaintenanceCardProps) {
  return (
    <Card className="mt-6 border-gray-200 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-gray-900">
          <Wrench className="h-5 w-5" /> Засварын хүсэлт (
          {allMaintenanceTickets.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allMaintenanceTickets.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
            Засварын дуудлага байхгүй байна.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Хөрөнгийн ID</TableHead>
                <TableHead>Тайлбар</TableHead>
                <TableHead>Ноцтой байдал</TableHead>
                <TableHead>Төлөв</TableHead>
                <TableHead>Огноо</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allMaintenanceTickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">
                    {t.assetId}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm">
                    {t.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {t.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        t.status === "OPEN"
                          ? "bg-gray-100 text-gray-700 border-gray-200"
                          : t.status === "RESOLVED" || t.status === "CLOSED"
                            ? "bg-gray-200 text-gray-800 border-gray-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                      }
                    >
                      {MAINTENANCE_STATUS_LABELS[t.status] ?? t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(t.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
