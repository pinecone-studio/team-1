"use client";

import React from "react";
import { Check, ShieldCheck, History, X, ChevronRight } from "lucide-react";
import { useQuery, useMutation } from "@apollo/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  GetActiveDisposalsDocument,
  GetDisposalRequestsDocument,
  ApproveDisposalDocument,
  RejectDisposalDocument,
  EmployeesDocument,
} from "@/gql/graphql";

const DEMO_IT_APPROVER_INDEX = 0;

export function DemoITContent({
  title = "IT Хяналтын самбар",
}: {
  title?: string;
}) {
  const { data: pendingData } = useQuery(GetActiveDisposalsDocument, {
    fetchPolicy: "network-only",
  });
  const { data: employeesData } = useQuery(EmployeesDocument);
  const demoApproverId =
    employeesData?.employees?.[DEMO_IT_APPROVER_INDEX]?.id ?? "";
  const { data: approvedData } = useQuery(GetDisposalRequestsDocument, {
    variables: { status: "IT_APPROVED" },
    fetchPolicy: "network-only",
  });
  const pendingRequests = pendingData?.disposalRequests ?? [];
  const approvedRequests = approvedData?.disposalRequests ?? [];
  const [approveDisposal, { loading: approving }] = useMutation(
    ApproveDisposalDocument,
    {
      refetchQueries: [
        { query: GetActiveDisposalsDocument },
        {
          query: GetDisposalRequestsDocument,
          variables: { status: undefined },
        },
      ],
    },
  );
  const [rejectDisposal, { loading: rejecting }] = useMutation(
    RejectDisposalDocument,
    {
      refetchQueries: [
        { query: GetActiveDisposalsDocument },
        {
          query: GetDisposalRequestsDocument,
          variables: { status: undefined },
        },
      ],
    },
  );

  const handleApprove = async (id: string) => {
    if (!demoApproverId) {
      toast.error("Баталгаажуулах ажилтан олдсонгүй.");
      return;
    }
    try {
      await approveDisposal({
        variables: { id, approvedBy: demoApproverId, stage: "IT_APPROVED" },
      });
      toast.success("Устгах хүсэлтийг IT-ээр баталгаажууллаа.");
    } catch (err) {
      toast.error("Баталгаажуулахад алдаа гарлаа.");
    }
  };

  const handleReject = async (id: string) => {
    if (!demoApproverId) {
      toast.error("Татгалзах ажилтан олдсонгүй.");
      return;
    }
    try {
      await rejectDisposal({
        variables: { id, rejectedBy: demoApproverId, reason: "Татгалзсан" },
      });
      toast.error("Устгах хүсэлтийг татгалзлаа.");
    } catch (err) {
      toast.error("Татгалзах үед алдаа гарлаа.");
    }
  };

  return (
    <div className="flex min-h-[calc(100svh-56px)] flex-1 flex-col p-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground italic">
            IT Administrator View — Устгах хүсэлтүүд (ажилтнаас ирсэн)
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="h-4 w-4" /> Түүх
        </Button>
      </div>

      {/* Шинээр ирсэн хүсэлтүүд */}
      <Card className="mt-6 border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold">
            Шинээр ирсэн хүсэлтүүд
          </CardTitle>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Бүгдийг үзэх
            <ChevronRight className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/70 bg-white">
            <div className="grid grid-cols-[36px_2.1fr_2fr_2fr_2.2fr_2fr_1.2fr] items-center gap-4 bg-muted/30 px-4 py-3 text-[15px] font-semibold text-black">
              <div>№</div>
              <div>Хөрөнгийн нэр</div>
              <div>Хөрөнгийн ID</div>
              <div>Эзэмшигч</div>
              <div>Хүсэлтийн төрөл</div>
              <div>Ирсэн огноо</div>
              <div>Баталгаажуулах</div>
            </div>
            <div className="space-y-2 bg-white px-3 py-3">
              {pendingRequests.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/70 bg-white px-4 py-6 text-center text-sm text-muted-foreground">
                  Шинээр ирсэн хүсэлт алга байна.
                </div>
              ) : (
                pendingRequests.map((row, index) => {
                  const assetName = row.asset?.assetTag ?? row.assetId;
                  const ownerName = row.requestedBy
                    ? [row.requestedBy.firstName, row.requestedBy.lastName]
                        .filter(Boolean)
                        .join(" ") || row.requestedBy.email
                    : "—";
                  return (
                    <div
                      key={row.id}
                      className="grid grid-cols-[36px_2.1fr_2fr_2fr_2.2fr_2fr_1.2fr] items-center gap-4 rounded-xl bg-white px-3 py-3 text-sm shadow-[0_1px_0_rgba(15,23,42,0.04)] ring-1 ring-border/60"
                    >
                      <div className="font-semibold text-foreground">
                        {index + 1}
                      </div>
                      <div className="font-medium text-foreground">
                        {assetName}
                      </div>
                      <div className="text-foreground/90">{row.assetId}</div>
                      <div className="text-foreground/90">{ownerName}</div>
                      <div className="text-foreground/90">{row.method}</div>
                      <div className="text-foreground/90">
                        {new Date(row.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400 text-emerald-600 hover:bg-emerald-50"
                          onClick={() => handleApprove(row.id)}
                          disabled={approving || rejecting}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-400 text-rose-600 hover:bg-rose-50"
                          onClick={() => handleReject(row.id)}
                          disabled={approving || rejecting}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Баталгаажсан хүсэлтүүд */}
      <Card className="mt-6 border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold">
            <ShieldCheck className="mr-2 inline h-5 w-5" />
            Баталгаажсан хүсэлтүүд
          </CardTitle>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Бүгдийг үзэх
            <ChevronRight className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border/70 bg-white">
            <div className="grid grid-cols-[36px_2.1fr_2fr_2fr_2.2fr_2fr_1.5fr] items-center gap-4 bg-muted/30 px-4 py-3 text-[15px] font-semibold text-black">
              <div>№</div>
              <div>Хөрөнгийн нэр</div>
              <div>Хөрөнгийн ID</div>
              <div>Эзэмшигч</div>
              <div>Хүсэлтийн төрөл</div>
              <div>Баталгаажсан огноо</div>
              <div>Баталгаажуулсан</div>
            </div>
            <div className="space-y-2 bg-white px-3 py-3">
              {approvedRequests.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/70 bg-white px-4 py-6 text-center text-sm text-muted-foreground">
                  Баталгаажсан хүсэлт алга байна.
                </div>
              ) : (
                approvedRequests.map((row, index) => {
                  const assetName = row.asset?.assetTag ?? row.assetId;
                  const ownerName = row.requestedBy
                    ? [row.requestedBy.firstName, row.requestedBy.lastName]
                        .filter(Boolean)
                        .join(" ") || row.requestedBy.email
                    : "—";
                  return (
                    <div
                      key={row.id}
                      className="grid grid-cols-[36px_2.1fr_2fr_2fr_2.2fr_2fr_1.5fr] items-center gap-4 rounded-xl bg-white px-3 py-3 text-sm shadow-[0_1px_0_rgba(15,23,42,0.04)] ring-1 ring-border/60"
                    >
                      <div className="font-semibold text-foreground">
                        {index + 1}
                      </div>
                      <div className="font-medium text-foreground">
                        {assetName}
                      </div>
                      <div className="text-foreground/90">{row.assetId}</div>
                      <div className="text-foreground/90">{ownerName}</div>
                      <div className="text-foreground/90">{row.method}</div>
                      <div className="text-foreground/90">
                        {new Date(row.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="inline-flex rounded-md border border-blue-300 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          IT баталгаажсан
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
