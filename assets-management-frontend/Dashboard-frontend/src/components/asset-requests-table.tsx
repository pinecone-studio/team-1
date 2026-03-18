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
          className="border-0 bg-[#f7f7f7] hover:bg-[#f7f7f7]"
        >
          <TableCell className="rounded-l-2xl px-3 py-3.75 md:px-4">
            <Skeleton className="h-4 w-6 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.75 md:px-4">
            <Skeleton className="h-4 w-32 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.75 md:px-4">
            <Skeleton className="h-4 w-24 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.75 md:px-4">
            <Skeleton className="h-4 w-28 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.75 md:px-4">
            <Skeleton className="h-4 w-28 bg-[#ececec]" />
          </TableCell>
          <TableCell className="px-3 py-3.75 md:px-4">
            <Skeleton className="h-4 w-32 bg-[#ececec]" />
          </TableCell>
          <TableCell className="rounded-r-2xl px-3 py-3.75 md:px-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9.5 w-9.5 rounded-full bg-[#ececec]" />
              <Skeleton className="h-9.5 w-9.5 rounded-full bg-[#ececec]" />
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
    <Card className="gap-4 rounded-[22px] border border-[#ececec] bg-[#ffffff] py-5 shadow-[0_2px_8px_rgba(15,23,42,0.03),0_14px_34px_rgba(15,23,42,0.04)]">
      <CardHeader className="items-center px-6 pb-0">
        <CardTitle className="text-[18px] font-semibold tracking-[-0.03em] text-[#242424] md:text-[19px]">
          Хөрөнгийн хүсэлтүүд
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            className="h-auto gap-2 rounded-full px-1 py-1 text-[13px] font-medium text-[#6b6b6b] hover:bg-transparent hover:text-[#222222]"
          >
            Бүгдийг үзэх
            <ArrowRight className="h-3.75 w-3.75" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-6 pt-1">
        <div className="overflow-hidden rounded-[18px] bg-[#fbfbfb] p-1.5">
          <Table className="border-separate border-spacing-y-2.5">
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
              <TableRow className="border-0 bg-[#f5f5f5] hover:bg-[#f5f5f5]">
                <TableHead className="h-auto rounded-l-[14px] px-3 py-3.25 text-[13px] font-semibold text-[#202020] md:px-4 md:text-[14px]">
                  №
                </TableHead>
                <TableHead className="h-auto px-3 py-3.25 text-[13px] font-semibold text-[#202020] md:px-4 md:text-[14px]">
                  Хөрөнгийн нэр
                </TableHead>
                <TableHead className="h-auto px-3 py-3.25 text-[13px] font-semibold text-[#202020] md:px-4 md:text-[14px]">
                  Хөрөнгийн ID
                </TableHead>
                <TableHead className="h-auto px-3 py-3.25 text-[13px] font-semibold text-[#202020] md:px-4 md:text-[14px]">
                  Өмнөх хэрэглэгч
                </TableHead>
                <TableHead className="h-auto px-3 py-3.25 text-[13px] font-semibold text-[#202020] md:px-4 md:text-[14px]">
                  Шинэ хэрэглэгч
                </TableHead>
                <TableHead className="h-auto px-3 py-3.25 text-[13px] font-semibold text-[#202020] md:px-4 md:text-[14px]">
                  Шилжүүлгийн төрөл
                </TableHead>
                <TableHead className="h-auto rounded-r-[14px] px-3 py-3.25 text-[13px] font-semibold text-[#202020] md:px-4 md:text-[14px]">
                  Төлөв
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <AssetRequestsTableSkeleton />
              ) : rows.length === 0 ? (
                <TableRow className="border-0 bg-[#f7f7f7] hover:bg-[#f7f7f7]">
                  <TableCell
                    colSpan={7}
                    className="rounded-2xl px-4 py-6 text-center text-[14px] text-[#6b6b6b]"
                  >
                    Одоогоор харагдах хүсэлт алга байна.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((request, index) => (
                  <TableRow
                    key={request.id}
                    className="border-0 bg-[#f7f7f7] hover:bg-[#f7f7f7]"
                  >
                    <TableCell className="rounded-l-2xl px-3 py-3.75 text-[14px] font-medium text-[#1f1f1f] md:px-4 md:text-[15px]">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-3 py-3.75 text-[14px] font-medium tracking-[-0.015em] text-[#222222] md:px-4 md:text-[15px]">
                      {request.assetName}
                    </TableCell>
                    <TableCell className="px-3 py-3.75 text-[14px] font-medium tracking-[-0.015em] text-[#333333] md:px-4 md:text-[15px]">
                      {request.assetCode}
                    </TableCell>
                    <TableCell className="px-3 py-3.75 text-[14px] font-normal text-[#2f2f2f] md:px-4 md:text-[15px]">
                      {request.previousUser}
                    </TableCell>
                    <TableCell className="px-3 py-3.75 text-[14px] font-normal text-[#2f2f2f] md:px-4 md:text-[15px]">
                      {request.nextUser}
                    </TableCell>
                    <TableCell className="px-3 py-3.75 text-[14px] font-normal text-[#2f2f2f] md:px-4 md:text-[15px]">
                      {request.requestType}
                    </TableCell>
                    <TableCell className="rounded-r-2xl px-3 py-3.75 md:px-4">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-9.5 rounded-full border-[#50d77a] bg-white text-[#2fc85a] shadow-none hover:bg-[#f6fff8] hover:text-[#29bf52]"
                          onClick={() => handleApprove(request)}
                          disabled={actionLoading}
                        >
                          <Check className="h-4.25 w-4.25 stroke-[2.2]" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-9.5 rounded-full border-[#ffb5b5] bg-white text-[#ff6f6f] shadow-none hover:bg-[#fff8f8] hover:text-[#ff6363]"
                          onClick={() => handleReject(request)}
                          disabled={actionLoading}
                        >
                          <X className="h-4.25 w-4.25 stroke-[2.2]" />
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
