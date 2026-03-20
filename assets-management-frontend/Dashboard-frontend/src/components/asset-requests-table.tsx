"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAssetId } from "@/components/assets/filter/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AssignmentsDocument,
  GetAssetsDocument,
  GetDisposalRequestsDocument,
} from "@/gql/graphql";

type AssetRequestRow = {
  id: string;
  assetName: string;
  assetCode: string;
  previousUser: string;
  nextUser: string;
  requestType: string;
  sortTime: number;
  sourceType: "transfer" | "disposal";
};

type AssetLite = {
  id: string;
  assetTag?: string | null;
  serialNumber?: string | null;
  category?: string | null;
};

type AssignmentLite = {
  id: string;
  status?: string | null;
  assetId: string;
  asset?: AssetLite | null;
  requestedBy?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } | null;
  employee?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } | null;
  assignedAt?: number | null;
};

type DisposalLite = {
  id: string;
  assetId: string;
  asset?: AssetLite | null;
  requestedBy?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } | null;
  createdAt?: number | null;
};

const formatEmployeeName = (
  employee?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } | null,
) => {
  if (!employee) return "Admin";
  const fullName = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return fullName || employee.email || "Admin";
};

function AssetRequestsTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="border-0 bg-white hover:bg-white">
          <TableCell className="rounded-l-2xl px-3 py-3.5 md:px-4">
            <Skeleton className="h-4 w-6 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.5 md:px-4">
            <Skeleton className="h-4 w-32 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.5 md:px-4">
            <Skeleton className="h-4 w-24 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.5 md:px-4">
            <Skeleton className="h-4 w-28 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.5 md:px-4">
            <Skeleton className="h-4 w-28 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.5 md:px-4">
            <Skeleton className="h-4 w-32 bg-[#ececec]" />
          </TableCell>
          <TableCell className="rounded-r-2xl px-3 py-3.5 md:px-4">
            <div className="flex items-center justify-end gap-3">
              <Skeleton className="h-8 w-8 rounded-full bg-[#ececec]" />
              <Skeleton className="h-8 w-8 rounded-full bg-[#ececec]" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export function AssetRequestsTable() {
  const [detailRow, setDetailRow] = useState<AssetRequestRow | null>(null);
  const [showAllOpen, setShowAllOpen] = useState(false);

  const { data: assignmentsData, loading: assignmentsLoading } = useQuery(
    AssignmentsDocument,
    {
      fetchPolicy: "network-only",
    },
  );
  const { data: assetsData, loading: assetsLoading } = useQuery(
    GetAssetsDocument,
    {
      variables: {
        office: undefined,
        categoryIds: undefined,
        subCategoryIds: undefined,
        locationIds: undefined,
      },
      fetchPolicy: "cache-first",
    },
  );
  const { data: disposalsData, loading: disposalsLoading } = useQuery(
    GetDisposalRequestsDocument,
    {
      variables: { status: "PENDING" },
      fetchPolicy: "network-only",
    },
  );

  const allRows = useMemo(() => {
    const assets = (assetsData?.assets ?? []) as AssetLite[];
    const assignments = (assignmentsData?.assignments ??
      []) as AssignmentLite[];
    const disposals = (disposalsData?.disposalRequests ?? []) as DisposalLite[];

    const assetById = new Map(
      assets.map((asset) => [
        asset.id,
        {
          assetTag: asset.assetTag,
          serialNumber: asset.serialNumber,
          category: asset.category,
        },
      ]),
    );

    const transferRows: AssetRequestRow[] = assignments
      .filter((assignment) => assignment.status === "ASSIGN_REQUESTED")
      .map((assignment) => {
        const asset = assignment.asset ?? assetById.get(assignment.assetId);
        return {
          id: assignment.id,
          assetName: formatAssetId(asset?.assetTag ?? assignment.assetId),
          assetCode: asset?.serialNumber ?? assignment.assetId,
          previousUser: formatEmployeeName(assignment.requestedBy),
          nextUser: formatEmployeeName(assignment.employee),
          requestType: "Хөрөнгө шилжүүлэх",
          sortTime: assignment.assignedAt ?? 0,
          sourceType: "transfer",
        };
      });

    const disposalRows: AssetRequestRow[] = disposals.map((disposal) => ({
      id: disposal.id,
      assetName: formatAssetId(disposal.asset?.assetTag ?? disposal.assetId),
      assetCode: disposal.asset?.id ?? disposal.assetId,
      previousUser: formatEmployeeName(disposal.requestedBy),
      nextUser: "Админ хэрэглэгч",
      requestType: "Хөрөнгө буцаах",
      sortTime: disposal.createdAt ?? 0,
      sourceType: "disposal",
    }));

    return [...transferRows, ...disposalRows].sort(
      (a, b) => b.sortTime - a.sortTime,
    );
  }, [assetsData, assignmentsData, disposalsData]);

  const rows = useMemo(() => allRows.slice(0, 5), [allRows]);

  const isLoading = assignmentsLoading || assetsLoading || disposalsLoading;

  const detailTitle = useMemo(() => {
    if (!detailRow) return "";
    return `${detailRow.assetCode} — Төлөвийн дэлгэрэнгүй`;
  }, [detailRow]);

  const detailMessage = useMemo(() => {
    if (!detailRow) return "";

    // Minimal “who/where” explanation based on the row fields we already have.
    if (detailRow.sourceType === "transfer") {
      return `${detailRow.previousUser}-аас ${detailRow.nextUser}-руу шилжүүлэх хүсэлт. Одоогоор баталгаажуулаагүй байна.`;
    }

    // disposal
    return `${detailRow.previousUser} устгах хүсэлт илгээсэн. Одоогоор IT баталгаажуулах хүлээгдэж байна.`;
  }, [detailRow]);

  return (
    <Card className="border bg-white p-0 shadow-none">
      <CardHeader className="flex-row items-center justify-between  px-3  pt-2">
        <CardTitle className="text-[18px] font-semibold tracking-[-0.02em] pl-3 pt-2 text-[#111111]">
          Хөрөнгийн хүсэлтүүд
        </CardTitle>
        <CardAction className="pl-2">
          <Button
            variant="ghost"
            className="h-auto gap-2.5 rounded-full px-3 pt-1.5 text-[13px] font-medium text-[#6b6b6b] hover:bg-transparent hover:text-[#111111]"
            onClick={() => setShowAllOpen(true)}
          >
            Бүгдийг үзэх
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-4 pb-3">
        <div className="overflow-hidden rounded-2xl border border-[#efefef] bg-white">
          <Table>
            <colgroup>
              <col className="w-13" />
              <col className="w-[19%]" />
              <col className="w-[17%]" />
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[20%]" />
              <col className="w-30" />
            </colgroup>
            <TableHeader>
              <TableRow className="border-0 bg-[#f3f3f3] hover:bg-[#f3f3f3]">
                <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                  №
                </TableHead>
                <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                  Хөрөнгийн нэр
                </TableHead>
                <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                  Хөрөнгийн ID
                </TableHead>
                <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                  Өмнөх хэрэглэгч
                </TableHead>
                <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                  Шинэ хэрэглэгч
                </TableHead>
                <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                  Шилжүүлгийн төрөл
                </TableHead>
                <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                  Төлөв
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <AssetRequestsTableSkeleton />
              ) : rows.length === 0 ? (
                <TableRow className="border-0 bg-white hover:bg-white">
                  <TableCell
                    colSpan={7}
                    className="px-4 py-8 text-center text-[14px] text-[#6b6b6b]"
                  >
                    Одоогоор харагдах хүсэлт алга байна.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((request, index) => (
                  <TableRow
                    key={request.id}
                    className={[
                      "border-b border-[#efefef] hover:bg-inherit",
                      index % 2 === 0 ? "bg-white" : "bg-[#fafafa]",
                    ].join(" ")}
                  >
                    <TableCell className="px-3 py-3.5 text-[14px] font-medium text-[#111111] md:px-4">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 text-[14px] font-medium text-[#111111] md:px-4">
                      {request.assetName}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 text-[14px] font-medium text-[#111111] md:px-4">
                      {request.assetCode}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 text-[14px] font-normal text-[#111111] md:px-4">
                      {request.previousUser}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 text-[14px] font-normal text-[#111111] md:px-4">
                      {request.nextUser}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 text-[14px] font-normal text-[#111111] md:px-4">
                      {request.requestType}
                    </TableCell>
                    <TableCell className="px-3 py-3.5 md:px-4">
                      <div className="flex items-center justify-end gap-3">
                        <Button
                          variant="ghost"
                          className="h-8 rounded-full px-3 text-[12px] font-semibold text-[#0b6fae] hover:bg-[#e9f3fb] hover:text-[#0b6fae]"
                          onClick={() => setDetailRow(request)}
                        >
                          Дэлгэрэнгүй
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={showAllOpen} onOpenChange={setShowAllOpen}>
        <DialogContent className="w-[calc(100vw-24px)] max-w-none sm:w-[min(98vw,1320px)]">
          <DialogHeader>
            <DialogTitle>Бүх хөрөнгийн хүсэлтүүд</DialogTitle>
            <DialogDescription className="text-[13px] leading-5">
              Нийт {allRows.length} хүсэлт байна.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-auto rounded-2xl border border-[#efefef] bg-white">
            <Table>
              <colgroup>
                <col className="w-13" />
                <col className="w-[19%]" />
                <col className="w-[17%]" />
                <col className="w-[18%]" />
                <col className="w-[18%]" />
                <col className="w-[20%]" />
                <col className="w-30" />
              </colgroup>
              <TableHeader>
                <TableRow className="border-0 bg-[#f3f3f3] hover:bg-[#f3f3f3]">
                  <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                    №
                  </TableHead>
                  <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                    Хөрөнгийн нэр
                  </TableHead>
                  <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                    Хөрөнгийн ID
                  </TableHead>
                  <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                    Өмнөх хэрэглэгч
                  </TableHead>
                  <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                    Шинэ хэрэглэгч
                  </TableHead>
                  <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                    Шилжүүлгийн төрөл
                  </TableHead>
                  <TableHead className="h-auto px-3 py-3 text-[13px] font-semibold text-[#111111] md:px-4">
                    Төлөв
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="[&_tr:last-child]:border-0">
                {isLoading ? (
                  <AssetRequestsTableSkeleton />
                ) : allRows.length === 0 ? (
                  <TableRow className="border-0 bg-white hover:bg-white">
                    <TableCell
                      colSpan={7}
                      className="px-4 py-8 text-center text-[14px] text-[#6b6b6b]"
                    >
                      Одоогоор харагдах хүсэлт алга байна.
                    </TableCell>
                  </TableRow>
                ) : (
                  allRows.map((request, index) => (
                    <TableRow
                      key={`all-${request.id}`}
                      className={[
                        "border-b border-[#efefef] hover:bg-inherit",
                        index % 2 === 0 ? "bg-white" : "bg-[#fafafa]",
                      ].join(" ")}
                    >
                      <TableCell className="px-3 py-3.5 text-[14px] font-medium text-[#111111] md:px-4">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-3 py-3.5 text-[14px] font-medium text-[#111111] md:px-4">
                        {request.assetName}
                      </TableCell>
                      <TableCell className="px-3 py-3.5 text-[14px] font-medium text-[#111111] md:px-4">
                        {request.assetCode}
                      </TableCell>
                      <TableCell className="px-3 py-3.5 text-[14px] font-normal text-[#111111] md:px-4">
                        {request.previousUser}
                      </TableCell>
                      <TableCell className="px-3 py-3.5 text-[14px] font-normal text-[#111111] md:px-4">
                        {request.nextUser}
                      </TableCell>
                      <TableCell className="px-3 py-3.5 text-[14px] font-normal text-[#111111] md:px-4">
                        {request.requestType}
                      </TableCell>
                      <TableCell className="px-3 py-3.5 md:px-4">
                        <div className="flex items-center justify-end gap-3">
                          <Button
                            variant="ghost"
                            className="h-8 rounded-full px-3 text-[12px] font-semibold text-[#0b6fae] hover:bg-[#e9f3fb] hover:text-[#0b6fae]"
                            onClick={() => setDetailRow(request)}
                          >
                            Дэлгэрэнгүй
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={detailRow != null}
        onOpenChange={(open) => !open && setDetailRow(null)}
      >
        <DialogContent className="max-w-[min(92vw,560px)]">
          <DialogHeader>
            <DialogTitle>{detailTitle}</DialogTitle>
            <DialogDescription className="text-[13px] leading-5">
              {detailMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
