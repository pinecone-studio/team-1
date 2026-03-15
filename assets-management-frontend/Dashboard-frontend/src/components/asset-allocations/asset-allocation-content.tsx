"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@apollo/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AssignAssetDocument,
  AssignmentFieldsFragmentDoc,
  AssetFieldsFragmentDoc,
  GetAssetsDocument,
  EmployeesDocument,
  AssignmentsDocument,
} from "@/gql/graphql";
import { useFragment } from "@/gql";

type AllocationRow = {
  id: string; // Assignment ID
  assetTag: string; // Asset Tag for display
  employeeEmail: string;
  assignedDate: string;
  status: string;
  statusKey: "PENDING" | "ACTIVE" | "RETURNED" | "CANCELLED";
  confirmedDate: string;
  emailStatus: string;
  emailStatusKey: "sent" | "failed" | "pending" | "disabled" | "unknown";
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Хүлээгдэж буй",
  ACTIVE: "Идэвхтэй",
  RETURNED: "Буцаасан",
  CANCELLED: "Цуцлагдсан",
};

const EMAIL_STATUS_LABELS: Record<AllocationRow["emailStatusKey"], string> = {
  sent: "Илгээсэн",
  failed: "Амжилтгүй",
  pending: "Илгээж байна",
  disabled: "Илгээхгүй",
  unknown: "Тодорхойгүй",
};

export function AssetAllocationContent() {
  const [statusTab, setStatusTab] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: employeesData } = useQuery(EmployeesDocument);
  const {
    data: assetsData,
    loading: assetsLoading,
    error: assetsError,
  } = useQuery(GetAssetsDocument);
  const {
    data: assignmentsData,
    loading: assignmentsLoading,
    refetch: refetchAssignments,
  } = useQuery(AssignmentsDocument);
  const [assignAssetMutation] = useMutation(AssignAssetDocument);
  const rows = useMemo<AllocationRow[]>(() => {
    const assignments = assignmentsData?.assignments ?? [];

    return assignments.map((a) => {
      const assignment = useFragment(AssignmentFieldsFragmentDoc, a);
      const asset = assignment.asset
        ? useFragment(AssetFieldsFragmentDoc, assignment.asset)
        : null;

      const statusKey = assignment.status as keyof typeof STATUS_LABELS;

      return {
        id: assignment.id,
        assetTag: asset?.assetTag ?? assignment.assetId,
        employeeEmail: assignment.employee?.email ?? assignment.employeeId,
        assignedAt: assignment.assignedAt,
        assignedDate: new Date(assignment.assignedAt).toLocaleDateString(),
        status: STATUS_LABELS[statusKey] || statusKey,
        statusKey: statusKey as any,
        confirmedDate: assignment.returnedAt
          ? new Date(assignment.returnedAt).toLocaleDateString()
          : "—",
        emailStatus: EMAIL_STATUS_LABELS.disabled,
        emailStatusKey: "disabled",
      };
    });
  }, [assignmentsData]);

  const visibleRows = useMemo(() => {
    if (statusTab === "all") return rows;
    return rows.filter((row) => row.statusKey === statusTab);
  }, [rows, statusTab]);

  const handleSendRequest = async () => {
    if (!selectedEmployee || !selectedAsset) return;

    const assetData = (assetsData?.assets ?? []).find((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);
      return asset?.id === selectedAsset;
    });
    const asset = useFragment(AssetFieldsFragmentDoc, assetData);
    if (!asset) return;

    setSubmitLoading(true);
    setErrorMessage("");
    try {
      await assignAssetMutation({
        variables: {
          assetId: asset.id,
          employeeId: selectedEmployee,
          conditionAtAssign: "GOOD",
        },
      });

      await refetchAssignments();
      setDialogOpen(false);
      setSelectedEmployee("");
      setSelectedAsset("");
      toast.success("Хөрөнгө хуваарилалт амжилттай.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Хүсэлт илгээхэд алдаа гарлаа.";
      console.error(error);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Хөрөнгө хуваарилалт
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            className="bg-muted text-foreground hover:bg-muted/80"
            onClick={() => refetchAssignments()}
            disabled={assignmentsLoading}
          >
            Жагсаалт шинэчлэх
          </Button>
          <Button
            className="gap-2 bg-foreground text-background hover:bg-foreground/90"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Шинэ хуваарилалт
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Tabs value={statusTab} onValueChange={setStatusTab}>
          <TabsList className="rounded-full bg-muted/60 p-1">
            <TabsTrigger value="all" className="rounded-full px-3">
              Бүх хуваарилалт
            </TabsTrigger>
            <TabsTrigger value="ACTIVE" className="rounded-full px-3">
              Идэвхтэй
            </TabsTrigger>
            <TabsTrigger value="RETURNED" className="rounded-full px-3">
              Буцаасан
            </TabsTrigger>
            <TabsTrigger value="PENDING" className="rounded-full px-3">
              Хүлээгдэж буй
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {errorMessage ? (
        <p className="mt-3 text-sm text-destructive">{errorMessage}</p>
      ) : null}

      <Card className="mt-6 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Хөрөнгийн хуваарилалтын жагсаалт
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">
                    Хөрөнгийн ID
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Ажилтан
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Илгээсэн огноо
                  </TableHead>
                  <TableHead className="text-muted-foreground">Төлөв</TableHead>
                  <TableHead className="text-muted-foreground">Имэйл</TableHead>
                  <TableHead className="text-muted-foreground">
                    Баталгаажсан огноо
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.id} className="border-border">
                    <TableCell className="font-medium text-foreground">
                      {row.assetTag}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.employeeEmail}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.assignedDate}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          row.statusKey === "ACTIVE"
                            ? "rounded-full bg-emerald-100 text-emerald-700"
                            : row.statusKey === "RETURNED"
                              ? "rounded-full bg-slate-100 text-slate-700"
                              : "rounded-full bg-amber-100 text-amber-700"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          row.emailStatusKey === "sent"
                            ? "rounded-full bg-emerald-100 text-emerald-700"
                            : row.emailStatusKey === "failed"
                              ? "rounded-full bg-rose-100 text-rose-700"
                              : row.emailStatusKey === "pending"
                                ? "rounded-full bg-sky-100 text-sky-700"
                                : "rounded-full bg-slate-100 text-slate-700"
                        }
                      >
                        {row.emailStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.confirmedDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {assignmentsLoading && (
            <div className="py-4 text-sm text-muted-foreground">
              Ачаалж байна...
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Шинэ хуваарилалт үүсгэх</DialogTitle>
            <DialogDescription>
              Хөрөнгийг ажилтанд хуваарилж, цахим гарын үсгийн хүсэлт илгээнэ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Ажилтан сонгох
              </p>
              <Select
                value={selectedEmployee}
                onValueChange={setSelectedEmployee}
              >
                <SelectTrigger className="w-full bg-muted/40">
                  <SelectValue placeholder="Сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {(employeesData?.employees ?? []).map((employee: any) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} ({employee.email}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Хөрөнгө сонгох
              </p>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger className="w-full bg-muted/40">
                  <SelectValue placeholder="Сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {(assetsData?.assets ?? []).map((a) => {
                    const asset = useFragment(AssetFieldsFragmentDoc, a);
                    if (!asset) return null;
                    return (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.assetTag} - {asset.category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-foreground text-background hover:bg-foreground/90"
              onClick={handleSendRequest}
              disabled={!selectedEmployee || !selectedAsset || submitLoading}
            >
              Баталгаажуулах хүсэлт илгээх
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
