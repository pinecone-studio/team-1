"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

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

type AllocationRow = {
  id: string;
  employeeEmail: string;
  assignedDate: string;
  status: string;
  statusKey: "pending" | "approved" | "rejected";
  confirmedDate: string;
  emailStatus: string;
  emailStatusKey: "sent" | "failed" | "pending" | "disabled" | "unknown";
};

const employees = [
  { name: "Sarah Johnson", email: "sarah.johnson@company.com" },
  { name: "Michael Chen", email: "michael.chen@company.com" },
  { name: "Emily Davis", email: "emily.davis@company.com" },
  { name: "Lisa Anderson", email: "lisa.anderson@company.com" },
  { name: "Батцоо Жаргал", email: "battsooj1010@gmail.com" },
];

const assets = [
  { id: "LAP-2024-001", label: "Laptop - LAP-2024-001" },
  { id: "MON-2024-003", label: "Monitor - MON-2024-003" },
  { id: "KEY-2024-006", label: "Keyboard - KEY-2024-006" },
  { id: "TAB-2024-009", label: "Tablet - TAB-2024-009" },
];

const STATUS_LABELS: Record<AllocationRow["statusKey"], string> = {
  pending: "Хүлээгдэж буй",
  approved: "Зөвшөөрсөн",
  rejected: "Буцаасан",
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
  const [rows, setRows] = useState<AllocationRow[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadRows = async () => {
    setListLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`/api/allocation-requests`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "List fetch failed");
      }
      const data = (await res.json()) as Array<{
        id: string;
        assetId: string;
        employeeEmail: string;
        status: "PENDING" | "APPROVED" | "REJECTED";
        emailStatus?: "SENT" | "FAILED" | "PENDING" | "DISABLED" | "UNKNOWN";
        requestedAt: number;
        respondedAt: number | null;
      }>;

      if (!Array.isArray(data)) {
        throw new Error("Жагсаалтын өгөгдөл буруу форматтай байна.");
      }

      const mapped: AllocationRow[] = data.map((item) => {
        const statusKey: AllocationRow["statusKey"] =
          item.status === "APPROVED"
            ? "approved"
            : item.status === "REJECTED"
              ? "rejected"
              : "pending";

        const emailStatusKey: AllocationRow["emailStatusKey"] =
          item.emailStatus === "SENT"
            ? "sent"
            : item.emailStatus === "FAILED"
              ? "failed"
              : item.emailStatus === "DISABLED"
                ? "disabled"
              : item.emailStatus === "PENDING"
                ? "pending"
                : "unknown";

        return {
          id: item.assetId,
          employeeEmail: item.employeeEmail,
          assignedDate: new Date(item.requestedAt).toLocaleDateString(),
          statusKey,
          status: STATUS_LABELS[statusKey],
          emailStatusKey,
          emailStatus: EMAIL_STATUS_LABELS[emailStatusKey],
          confirmedDate: item.respondedAt
            ? new Date(item.respondedAt).toLocaleDateString()
            : "-",
        };
      });

      setRows(mapped);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Жагсаалт ачаалж чадсангүй.";
      console.error(error);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setListLoading(false);
    }
  };

  const visibleRows = useMemo(() => {
    if (statusTab === "all") return rows;
    return rows.filter((row) => row.statusKey === statusTab);
  }, [rows, statusTab]);

  const handleSendRequest = async () => {
    if (!selectedEmployee || !selectedAsset) return;

    const asset = assets.find((item) => item.id === selectedAsset);
    if (!asset) return;

    setSubmitLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`/api/allocation-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeEmail: selectedEmployee,
          assetId: asset.id,
        }),
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Create request failed");
      }
      const data = (await res.json()) as {
        token: string;
      };

      const approveUrl = `${window.location.origin}/api/allocation-requests?token=${data.token}&action=approve`;
      const rejectUrl = `${window.location.origin}/api/allocation-requests?token=${data.token}&action=reject`;
      const subject = encodeURIComponent("Хөрөнгө хуваарилалтын баталгаажуулалт");
      const body = encodeURIComponent(
        `Сайн байна уу,\n\n` +
          `Хөрөнгө хуваарилалтын хүсэлт үүсгэлээ.\n` +
          `Хөрөнгө: ${asset.id}\n` +
          `Ажилтан: ${selectedEmployee}\n\n` +
          `Зөвшөөрөх: ${approveUrl}\n` +
          `Зөвшөөрөхгүй: ${rejectUrl}`,
      );

      window.location.href = `mailto:${selectedEmployee}?subject=${subject}&body=${body}`;
      await loadRows();
      setDialogOpen(false);
      setSelectedEmployee("");
      setSelectedAsset("");
      toast.success("Зөвшөөрөх/зөвшөөрөхгүй линктэй имэйл нээлээ.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Хүсэлт илгээхэд алдаа гарлаа.";
      console.error(error);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Хөрөнгө хуваарилалт
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            className="bg-muted text-foreground hover:bg-muted/80"
            onClick={loadRows}
            disabled={listLoading}
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
            <TabsTrigger value="pending" className="rounded-full px-3">
              Хүлээгдэж буй
            </TabsTrigger>
            <TabsTrigger value="approved" className="rounded-full px-3">
              Зөвшөөрсөн
            </TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-full px-3">
              Буцаасан
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
                      {row.id}
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
                          row.statusKey === "approved"
                            ? "rounded-full bg-emerald-100 text-emerald-700"
                            : row.statusKey === "rejected"
                              ? "rounded-full bg-rose-100 text-rose-700"
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
          {listLoading && (
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
                  {employees.map((employee) => (
                    <SelectItem key={employee.email} value={employee.email}>
                      {employee.email}
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
                  {assets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.label}
                    </SelectItem>
                  ))}
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
