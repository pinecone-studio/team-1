"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AssignmentItem } from "./demo-employee-utils";

type AssignmentRow = AssignmentItem & { status?: string };

export type DemoEmployeeMyAssetsCardProps = {
  myAssetsList: AssignmentRow[];
  activeLoading: boolean;
  pendingLoading: boolean;
  setSelectedAssignment: (a: AssignmentItem | null) => void;
  normalizeAssetTag: (value?: string | null) => string;
};

export function DemoEmployeeMyAssetsCard({
  myAssetsList,
  activeLoading,
  pendingLoading,
  setSelectedAssignment,
  normalizeAssetTag,
}: DemoEmployeeMyAssetsCardProps) {
  return (
    <Card className="mt-6 border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Миний эзэмшиж буй хөрөнгө
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Идэвхтэй болон таны руу шилжүүлсэн хүлээгдэж буй хөрөнгө энд
          харагдана.
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serial Number</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>Огноо</TableHead>
              <TableHead>Төлөв</TableHead>
              <TableHead>Хэн явуулсан</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myAssetsList.length > 0 ? (
              myAssetsList.map((assignment) => {
                const isPending = assignment.status !== "ACTIVE";
                const a = assignment as AssignmentItem;
                const requestedByName = a.requestedBy
                  ? [a.requestedBy.firstName, a.requestedBy.lastName]
                      .filter(Boolean)
                      .join(" ") || "—"
                  : "—";
                return (
                  <TableRow
                    key={assignment.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() =>
                      setSelectedAssignment(assignment as AssignmentItem)
                    }
                  >
                    <TableCell className="font-mono text-xs">
                      {assignment.asset?.serialNumber || "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {normalizeAssetTag(assignment.asset?.assetTag)}
                    </TableCell>
                    <TableCell>
                      {new Date(assignment.assignedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {isPending ? (
                        <Badge
                          variant="secondary"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          Хүлээгдэж буй
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-emerald-50 text-emerald-700 border-emerald-100"
                        >
                          Идэвхтэй
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {isPending ? requestedByName : "—"}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  {activeLoading || pendingLoading
                    ? "Ачаалж байна..."
                    : "Бүртгэлтэй хөрөнгө байхгүй."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
