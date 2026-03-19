"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Check, Eye, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

import DocumentPreview from "@/app/esign/_components/DocumentPreview";
import SignaturePad from "@/app/esign/_components/SignaturePad";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  EmployeesDocument,
  GetDisposalRequestsDocument,
  RejectDisposalDocument,
  UserRole,
} from "@/gql/graphql";

type FinanceDisposalItem = any;

function disposalStatusLabel(status: string) {
  switch (status) {
    case "IT_APPROVED":
      return "IT баталгаажсан";
    case "FINANCE_APPROVED":
      return "Санхүү баталгаажсан";
    case "COMPLETED":
      return "Дууссан";
    case "REJECTED":
      return "Татгалзсан";
    default:
      return status;
  }
}

export function DemoFinanceContent({
  title = "Finance Хяналтын самбар",
}: {
  title?: string;
}) {
  const [selectedDisposal, setSelectedDisposal] =
    useState<FinanceDisposalItem | null>(null);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const { data: disposalData, loading } = useQuery(
    GetDisposalRequestsDocument,
    {
      variables: { status: "IT_APPROVED" },
      fetchPolicy: "network-only",
    },
  );

  const { data: employeesData } = useQuery(EmployeesDocument, {
    fetchPolicy: "cache-first",
  });

  const [approveDisposal, { loading: approving }] = useMutation(
    ApproveDisposalDocument,
    {
      refetchQueries: [
        {
          query: GetDisposalRequestsDocument,
          variables: { status: "IT_APPROVED" },
        },
      ],
    },
  );

  const [rejectDisposal, { loading: rejecting }] = useMutation(
    RejectDisposalDocument,
    {
      refetchQueries: [
        {
          query: GetDisposalRequestsDocument,
          variables: { status: "IT_APPROVED" },
        },
      ],
    },
  );

  const pendingDisposals = disposalData?.disposalRequests ?? [];

  const financeApproverId = useMemo(() => {
    const employees = (employeesData?.employees ?? []) as Array<{
      id: string;
      role?: UserRole | null;
    }>;

    return (
      employees.find((employee) => employee.role === UserRole.Finance)?.id ??
      employees.find((employee) => employee.role === UserRole.SuperAdmin)?.id ??
      ""
    );
  }, [employeesData]);

  const handleOpenDetail = (item: FinanceDisposalItem) => {
    setSelectedDisposal(item);
    setSignatureData(null);
  };

  const handleCloseDetail = () => {
    setSelectedDisposal(null);
    setSignatureData(null);
  };

  const handleApproveDisposal = async () => {
    if (!selectedDisposal) return;

    try {
      await approveDisposal({
        variables: {
          id: selectedDisposal.id,
          approvedBy: financeApproverId || "FINANCE",
          stage: "FINANCE_APPROVED",
        },
      });
      toast.success("Хүсэлтийг санхүүгээр баталгаажууллаа.");
      handleCloseDetail();
    } catch {
      toast.error("Баталгаажуулах үед алдаа гарлаа.");
    }
  };

  const handleRejectDisposal = async (id: string) => {
    try {
      await rejectDisposal({
        variables: {
          id,
          rejectedBy: financeApproverId || "FINANCE",
          reason: "Finance-ээс татгалзсан",
        },
      });
      toast.success("Хүсэлтийг татгалзлаа.");
      if (selectedDisposal?.id === id) {
        handleCloseDetail();
      }
    } catch {
      toast.error("Татгалзах үед алдаа гарлаа.");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">
          Санхүү рүү очсон disposal хүсэлтүүдийг шалгаж, гарын үсгээр
          баталгаажуулна.
        </p>
      </div>

      <Card className="border border-border/60 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <ShieldCheck className="h-5 w-5" />
            Finance баталгаажуулах хүсэлтүүд
          </CardTitle>
          <CardDescription>
            Зөвхөн IT-аас дамжсан disposal хүсэлтүүд энд харагдана.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-hidden rounded-2xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow className="border-0 bg-[#0f4c6e] hover:bg-[#0b6fae]">
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    №
                  </TableHead>
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    Asset ID
                  </TableHead>
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    Method
                  </TableHead>
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    Шалтгаан
                  </TableHead>
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    Төлөв
                  </TableHead>
                  <TableHead className="h-11 px-3 text-xs font-semibold text-white md:px-4">
                    Баталгаажуулах
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border-0">
                {!loading && pendingDisposals.length === 0 ? (
                  <TableRow className="bg-white">
                    <TableCell
                      colSpan={6}
                      className="px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                      Finance шатанд ирсэн disposal хүсэлт алга байна.
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingDisposals.map((request, index) => (
                    <TableRow
                      key={request.id}
                      className={[
                        "border-b border-border/60",
                        index % 2 === 0 ? "bg-white" : "bg-[#fafafa]",
                      ].join(" ")}
                    >
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm font-medium text-foreground md:px-4">
                        {request.asset?.assetTag ?? request.assetId}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {request.method}
                      </TableCell>
                      <TableCell className="px-3 py-3 text-sm text-foreground md:px-4">
                        {request.reason ?? "—"}
                      </TableCell>
                      <TableCell className="px-3 py-3 md:px-4">
                        <Badge
                          variant="outline"
                          className="border-blue-200 bg-blue-50 text-blue-700"
                        >
                          {disposalStatusLabel(request.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 py-2 md:px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 rounded-md"
                            onClick={() => handleOpenDetail(request)}
                            disabled={approving || rejecting}
                          >
                            <Eye className="h-4 w-4" />
                            Мэдээлэл шалгах
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 rounded-md"
                            onClick={() => handleRejectDisposal(request.id)}
                            disabled={approving || rejecting}
                          >
                            <X className="h-4 w-4" />
                            Цуцлах
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

      <Dialog
        open={!!selectedDisposal}
        onOpenChange={(open) => !open && handleCloseDetail()}
      >
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <DialogTitle>Finance баталгаажуулалт</DialogTitle>
            <DialogDescription>
              Хүсэлтийн мэдээллийг шалгаад, e-sign зурж баталгаажуулна уу.
            </DialogDescription>
          </DialogHeader>

          {selectedDisposal ? (
            <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="order-2 flex justify-center lg:order-1">
                <DocumentPreview
                  signatureData={signatureData}
                  title="Finance Disposal Approval"
                  bodyText="Санхүүгийн ажилтан энэхүү disposal хүсэлтийг шалгаж баталгаажуулж байна. Энэхүү e-sign нь санхүүгийн зөвшөөрлийг илэрхийлнэ."
                  waitingLabel="Гарын үсэг хүлээгдэж байна..."
                  signedByLabel="Finance баталгаажуулсан"
                  dateLabel="Огноо"
                />
              </div>

              <div className="order-1 space-y-4 lg:order-2">
                <div className="rounded-xl border border-muted bg-muted/30 p-4">
                  <h4 className="mb-3 text-base font-semibold">
                    Хүсэлтийн мэдээлэл
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-muted-foreground">Хөрөнгийн ID:</div>
                    <div className="font-medium">
                      {selectedDisposal.asset?.assetTag ??
                        selectedDisposal.assetId}
                    </div>
                    <div className="text-muted-foreground">Ангилал:</div>
                    <div className="font-medium">
                      {selectedDisposal.asset?.category ?? "—"}
                    </div>
                    <div className="text-muted-foreground">Устгах арга:</div>
                    <div className="font-medium">{selectedDisposal.method}</div>
                    <div className="text-muted-foreground">Шалтгаан:</div>
                    <div className="font-medium">
                      {selectedDisposal.reason ?? "—"}
                    </div>
                    <div className="text-muted-foreground">Илгээсэн:</div>
                    <div className="font-medium">
                      {new Date(selectedDisposal.createdAt).toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">Төлөв:</div>
                    <div>
                      <Badge
                        variant="outline"
                        className="border-blue-200 bg-blue-50 text-blue-700"
                      >
                        {disposalStatusLabel(selectedDisposal.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <SignaturePad
                  onSave={setSignatureData}
                  onClear={() => setSignatureData(null)}
                  title="Finance e-sign"
                  clearLabel="Арилгах"
                  saveLabel="Гарын үсэг хадгалах"
                />
              </div>
            </div>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={handleCloseDetail}>
              Хаах
            </Button>
            <Button
              className="gap-2 bg-gray-900 text-white hover:bg-gray-800"
              onClick={handleApproveDisposal}
              disabled={!signatureData || approving || rejecting}
            >
              <Check className="h-4 w-4" />
              Батлах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
