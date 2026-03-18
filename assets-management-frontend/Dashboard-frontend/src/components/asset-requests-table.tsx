"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ArrowRight, Check, X } from "lucide-react";
import { toast } from "sonner";

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
import {
  ApproveDisposalDocument,
  AssignmentsDocument,
  EmployeesDocument,
  GetAssetsDocument,
  GetDisposalRequestsDocument,
  RejectDisposalDocument,
  UpdateAssignmentStatusDocument,
  UserRole,
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

const formatEmployeeName = (
  employee?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } | null,
) => {
  if (!employee) return "Тодорхойгүй";
  const fullName = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return fullName || employee.email || "Тодорхойгүй";
};

function AssetRequestsTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow
          key={index}
          className="border-0 bg-white hover:bg-white"
        >
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
  const { data: employeesData, loading: employeesLoading } = useQuery(
    EmployeesDocument,
    {
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
  const [updateAssignmentStatus, { loading: updatingAssignment }] = useMutation(
    UpdateAssignmentStatusDocument,
    {
      refetchQueries: [
        { query: AssignmentsDocument },
        {
          query: GetDisposalRequestsDocument,
          variables: { status: "PENDING" },
        },
      ],
    },
  );
  const [approveDisposal, { loading: approvingDisposal }] = useMutation(
    ApproveDisposalDocument,
    {
      refetchQueries: [
        { query: AssignmentsDocument },
        {
          query: GetDisposalRequestsDocument,
          variables: { status: "PENDING" },
        },
      ],
    },
  );
  const [rejectDisposal, { loading: rejectingDisposal }] = useMutation(
    RejectDisposalDocument,
    {
      refetchQueries: [
        { query: AssignmentsDocument },
        {
          query: GetDisposalRequestsDocument,
          variables: { status: "PENDING" },
        },
      ],
    },
  );

  const rows = useMemo(() => {
    const employees = (employeesData as any)?.employees ?? [];
    const assets = (assetsData as any)?.assets ?? [];
    const assignments = (assignmentsData as any)?.assignments ?? [];
    const disposals = (disposalsData as any)?.disposalRequests ?? [];

    const employeeNameById = new Map(
      employees.map((employee: any) => [
        employee.id,
        formatEmployeeName({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
        }),
      ]),
    );

    const assetById = new Map(
      assets.map((asset: any) => [
        asset.id,
        {
          assetTag: asset.assetTag,
          category: asset.category,
        },
      ]),
    );

    const transferRows: AssetRequestRow[] = assignments
      .filter((assignment: any) => assignment.status === "ASSIGN_REQUESTED")
      .map((assignment: any) => {
        const asset = assignment.asset ?? assetById.get(assignment.assetId);
        return {
          id: assignment.id,
          assetName: asset?.assetTag ?? assignment.assetId,
          assetCode: asset?.serialNumber ?? assignment.assetId,
          previousUser: formatEmployeeName(assignment.requestedBy),
          nextUser: formatEmployeeName(assignment.employee),
          requestType: "Хөрөнгө шилжүүлэх",
          sortTime: assignment.assignedAt ?? 0,
          sourceType: "transfer",
        };
      });

    const disposalRows: AssetRequestRow[] = disposals.map((disposal: any) => ({
      id: disposal.id,
      assetName: disposal.asset?.assetTag ?? disposal.assetId,
      assetCode: disposal.asset?.id ?? disposal.assetId,
      previousUser: formatEmployeeName(disposal.requestedBy),
      nextUser: "Админ хэрэглэгч",
      requestType: "Хөрөнгө буцаах",
      sortTime: disposal.createdAt ?? 0,
      sourceType: "disposal",
    }));

    return [...transferRows, ...disposalRows]
      .sort((a, b) => b.sortTime - a.sortTime)
      .slice(0, 5);
  }, [assetsData, assignmentsData, disposalsData, employeesData]);

  const approverId = useMemo(() => {
    const employees = (employeesData as any)?.employees ?? [];
    return (
      employees.find((employee: any) => employee.role === UserRole.ItAdmin)
        ?.id ??
      employees.find((employee: any) => employee.role === UserRole.SuperAdmin)
        ?.id ??
      employees[0]?.id ??
      ""
    );
  }, [employeesData]);

  const isLoading =
    assignmentsLoading || assetsLoading || employeesLoading || disposalsLoading;
  const actionLoading =
    updatingAssignment || approvingDisposal || rejectingDisposal;

  const handleApprove = async (row: AssetRequestRow) => {
    if (!approverId) {
      toast.error("Зөвшөөрөх ажилтан олдсонгүй.");
      return;
    }

    try {
      if (row.sourceType === "transfer") {
        await updateAssignmentStatus({
          variables: { assignmentId: row.id, status: "ACTIVE" },
        });
        toast.success("Шилжүүлэх хүсэлтийг зөвшөөрлөө.");
        return;
      }

      await approveDisposal({
        variables: { id: row.id, approvedBy: approverId, stage: "IT_APPROVED" },
      });
      toast.success("Буцаах хүсэлтийг зөвшөөрлөө.");
    } catch {
      toast.error("Зөвшөөрөх үед алдаа гарлаа.");
    }
  };

  const handleReject = async (row: AssetRequestRow) => {
    if (!approverId) {
      toast.error("Татгалзах ажилтан олдсонгүй.");
      return;
    }

    try {
      if (row.sourceType === "transfer") {
        await updateAssignmentStatus({
          variables: { assignmentId: row.id, status: "REJECTED" },
        });
        toast.success("Шилжүүлэх хүсэлтийг татгалзлаа.");
        return;
      }

      await rejectDisposal({
        variables: { id: row.id, rejectedBy: approverId, reason: "Татгалзсан" },
      });
      toast.success("Буцаах хүсэлтийг татгалзлаа.");
    } catch {
      toast.error("Татгалзах үед алдаа гарлаа.");
    }
  };

  return (
    <Card className="border-0 bg-transparent p-0 shadow-none">
      <CardHeader className="flex-row items-center justify-between gap-3 px-0 pb-3 pt-0">
        <CardTitle className="text-[18px] font-semibold tracking-[-0.02em] text-[#111111]">
          Хөрөнгийн хүсэлтүүд
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            className="h-auto gap-2 rounded-full px-0 py-1 text-[13px] font-medium text-[#6b6b6b] hover:bg-transparent hover:text-[#111111]"
          >
            Бүгдийг үзэх
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0 pt-0">
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
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-[#49d36f] bg-white text-[#2fc85a] shadow-none hover:bg-white hover:text-[#2fc85a]"
                          onClick={() => handleApprove(request)}
                          disabled={actionLoading}
                        >
                          <Check className="h-4 w-4 stroke-[2.4]" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-[#ffb0b0] bg-white text-[#ff6f6f] shadow-none hover:bg-white hover:text-[#ff6f6f]"
                          onClick={() => handleReject(request)}
                          disabled={actionLoading}
                        >
                          <X className="h-4 w-4 stroke-[2.4]" />
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
    </Card>
  );
}
