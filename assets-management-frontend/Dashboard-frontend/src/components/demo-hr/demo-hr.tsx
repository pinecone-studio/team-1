"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Calendar as CalendarIcon,
  CalendarDays,
  Loader2,
  UserPlus,
  UserCog,
  LogOut,
  Bell,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { toast } from "sonner";
import {
  EmployeesDocument,
  GetActiveOffboardingDocument,
  ApproveReturnRequestDocument,
  RequestRepairDocument,
} from "@/gql/graphql";
import { cn } from "@/lib/utils";

const EMPLOYEE_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Идэвхтэй",
  OFFBOARDING: "Гарах процесс",
  TERMINATED: "Ажлаас гарсан",
};

/** OFFBOARDING ажилтны буцаах хүсэлтийн тоог fetch хийж bell + тоо харуулна */
function OffboardingBell({
  employeeId,
  onOpen,
}: {
  employeeId: string;
  onOpen: () => void;
}) {
  const { data } = useQuery(GetActiveOffboardingDocument, {
    variables: { employeeId },
    skip: !employeeId,
    fetchPolicy: "network-only",
  });
  const count = data?.offboardingEvent?.pendingReturnRequests?.length ?? 0;
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1 relative"
      onClick={onOpen}
    >
      <Bell className="h-4 w-4" />
      Мэдэгдэл
      {count > 0 && (
        <Badge variant="secondary" className="ml-0.5 h-5 min-w-5 px-1 text-xs">
          {count}
        </Badge>
      )}
    </Button>
  );
}

function getWebhookOffboardUrl(): string {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "";
  const base = graphqlUrl.replace(/\/api\/graphql\/?$/, "") || "";
  return base
    ? `${base}/api/webhooks/hr/offboard`
    : "/api/webhooks/hr/offboard";
}

function startOfDay(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function DemoHRContent() {
  const [offboardOpen, setOffboardOpen] = useState(false);
  const [newEmployeeOpen, setNewEmployeeOpen] = useState(false);
  const [roleChangeOpen, setRoleChangeOpen] = useState(false);

  const [offboardEmployeeId, setOffboardEmployeeId] = useState<string>("");
  const [offboardDate, setOffboardDate] = useState<Date>(new Date());
  const [offboardDatePickerOpen, setOffboardDatePickerOpen] = useState(false);
  const [offboardSubmitting, setOffboardSubmitting] = useState(false);
  const [selectedEmployeeForRequests, setSelectedEmployeeForRequests] = useState<string | null>(null);
  const [showReturnRequestsModal, setShowReturnRequestsModal] = useState(false);
  /** Хүсэлт бүр дээр HR-ийн шалгасан нөхцөл (GOOD/FAIR/DAMAGED) */
  const [hrConditionByRequestId, setHrConditionByRequestId] = useState<Record<string, string>>({});
  /** Эвдрэлтэй үед HR оруулсан зураг (requestId -> File) */
  const [hrPhotoByRequestId, setHrPhotoByRequestId] = useState<Record<string, File | null>>({});

  const { data, loading, error, refetch } = useQuery(EmployeesDocument, {
    fetchPolicy: "cache-first",
  });

  const { data: offboardingRequestsData, refetch: refetchOffboardingRequests } = useQuery(
    GetActiveOffboardingDocument,
    {
      variables: { employeeId: selectedEmployeeForRequests ?? "" },
      skip: !selectedEmployeeForRequests || selectedEmployeeForRequests === "__mock__",
      fetchPolicy: "cache-first",
    },
  );
  const [approveReturnRequestMutation, { loading: approveLoading }] = useMutation(ApproveReturnRequestDocument);
  const [requestRepairMutation, { loading: repairLoading }] = useMutation(RequestRepairDocument);

  const pendingRequests = offboardingRequestsData?.offboardingEvent?.pendingReturnRequests ?? [];

  const employees = Array.isArray(data?.employees) ? data.employees : [];
  const activeEmployees = employees.filter(
    (e) => e.status !== "TERMINATED" && e.status !== "OFFBOARDING",
  );
  const terminatedEmployees = employees.filter(
    (e) => e.status === "TERMINATED" || e.status === "OFFBOARDING",
  );
  const employeesSorted = [...activeEmployees, ...terminatedEmployees];
  const selectedEmployeeName =
    selectedEmployeeForRequests &&
    employeesSorted.find((e) => e.id === selectedEmployeeForRequests)
      ? `${employeesSorted.find((e) => e.id === selectedEmployeeForRequests)?.firstName ?? ""} ${employeesSorted.find((e) => e.id === selectedEmployeeForRequests)?.lastName ?? ""}`.trim()
      : "";

  const handleApproveReturnRequest = async (
    returnRequestId: string,
    conditionHr: string,
  ) => {
    try {
      await approveReturnRequestMutation({
        variables: {
          returnRequestId,
          conditionHr,
          inspectedBy: "demo-hr",
        },
      });
      toast.success("Буцаах хүсэлт зөвшөөрөгдөж, хөрөнгө боломжтой боллоо. IT data wipe даалгавар үүслээ.");
      await refetchOffboardingRequests();
      await refetch();
    } catch (err) {
      toast.error("Зөвшөөрөхөд алдаа гарлаа.");
    }
  };

  const handleRequestRepair = async (
    returnRequestId: string,
    conditionHr: string,
    photoFile: File | null,
  ) => {
    try {
      const photoR2Key = photoFile ? `demo-hr-photo-${Date.now()}-${photoFile.name}` : null;
      await requestRepairMutation({
        variables: {
          returnRequestId,
          conditionHr,
          photoR2Key,
          inspectedBy: "demo-hr",
        },
      });
      toast.success("Засварын хүсэлт IT руу илгээгдлээ. Хөрөнгийн төлөв: REPAIR_REQUESTED.");
      setHrPhotoByRequestId((prev) => ({ ...prev, [returnRequestId]: null }));
      await refetchOffboardingRequests();
      await refetch();
    } catch (err) {
      toast.error("Засвар хүсэхэд алдаа гарлаа.");
    }
  };

  const handleOffboardSubmit = async () => {
    if (!offboardEmployeeId) {
      toast.error("Ажилтан сонгоно уу.");
      return;
    }

    setOffboardSubmitting(true);
    try {
      const res = await fetch(getWebhookOffboardUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: offboardEmployeeId,
          terminationDate: startOfDay(offboardDate),
          initiatedBy: "demo-hr",
        }),
      });

      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        totalAssets?: number;
      };

      if (!res.ok) {
        toast.error(json.error ?? `Алдаа: ${res.status}`);
        return;
      }

      toast.success(
        `Ажлаас гарах процесс эхэллээ. ${json.totalAssets ?? 0} хөрөнгө буцаах шаардлагатай.`,
      );
      setOffboardOpen(false);
      setOffboardEmployeeId("");
      setOffboardDate(new Date());
      refetch();
    } catch (err) {
      toast.error("Webhook дуудахад алдаа гарлаа.");
    } finally {
      setOffboardSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5.5rem)] min-w-0 flex-1 flex-col p-6">
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-semibold text-foreground">Хүний нөөц</h1>
        <p className="text-muted-foreground mt-1 text-sm italic"></p>
      </div>

      {error && (
        <p className="text-destructive mb-4 shrink-0 text-sm">
          Жагсаалт ачааллахад алдаа гарлаа: {error.message}. GraphQL холболт
          болон NEXT_PUBLIC_GRAPHQL_URL шалгана уу.
        </p>
      )}

      <div className="min-h-0 flex-1 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Ажилчдын жагсаалт
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Идэвхтэй ажилчид дээр, ажлаас гарсангууд доор.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading && (
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Жагсаалт ачааллаж байна...
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setNewEmployeeOpen(true)}
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Шинэ ажилтан бүртгэх
              </Button>
              <Button
                variant="outline"
                onClick={() => setRoleChangeOpen(true)}
                className="gap-2"
              >
                <UserCog className="h-4 w-4" />
                Ажилтны role солих
              </Button>
              <Button
                variant="outline"
                onClick={() => setOffboardOpen(true)}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Ажлаас гаргах
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEmployeeForRequests(
                    employeesSorted.length > 0 ? employeesSorted[0].id : "__mock__",
                  );
                  setShowReturnRequestsModal(true);
                }}
                className="gap-2 border-amber-400 text-amber-800 hover:bg-amber-50"
              >
                <Bell className="h-4 w-4" />
                Буцаах хүсэлтийн жишээ харах
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Нэр</TableHead>
                  <TableHead>И-мэйл</TableHead>
                  <TableHead>Төлөв</TableHead>
                  <TableHead>Ажлаас гарсан огноо</TableHead>
                  <TableHead className="w-[100px]">Буцаах хүсэлт</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && employeesSorted.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground py-8 text-center"
                    >
                      Ажилтан олдсонгүй. Backend-ээс employees ирж байгаа
                      эсэхийг шалгана уу.
                    </TableCell>
                  </TableRow>
                )}
                {!loading &&
                  employeesSorted.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell>
                        {emp.firstName} {emp.lastName}
                      </TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            emp.status === "TERMINATED"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {EMPLOYEE_STATUS_LABELS[emp.status ?? ""] ??
                            emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {emp.terminationDate
                          ? new Date(emp.terminationDate).toLocaleDateString(
                              "mn-MN",
                            )
                          : "—"}
                      </TableCell>
                      <TableCell>
                        {emp.status === "OFFBOARDING" ? (
                          <OffboardingBell
                            employeeId={emp.id}
                            onOpen={() => {
                              setSelectedEmployeeForRequests(emp.id);
                              setShowReturnRequestsModal(true);
                            }}
                          />
                        ) : (
                          "—"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Шинэ ажилтан бүртгэх — placeholder */}
        <Dialog open={newEmployeeOpen} onOpenChange={setNewEmployeeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Шинэ ажилтан бүртгэх</DialogTitle>
              <DialogDescription>
                Энэ хэсэг нь удахгүй нэмэгдэнэ. Одоогоор ажилчдын жагсаалтыг
                харна уу.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewEmployeeOpen(false)}
              >
                Хаах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Ажилтны role солих — placeholder */}
        <Dialog open={roleChangeOpen} onOpenChange={setRoleChangeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ажилтны role солих</DialogTitle>
              <DialogDescription>
                Энэ хэсэг нь удахгүй нэмэгдэнэ. Ажилтан сонгоод role солих
                боломжтой болно.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRoleChangeOpen(false)}
              >
                Хаах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Буцаах хүсэлтүүд — OFFBOARDING ажилтны HR шалгах хүсэлтүүд */}
        <Dialog
          open={showReturnRequestsModal}
          onOpenChange={(open) => {
            setShowReturnRequestsModal(open);
            if (!open) {
              setSelectedEmployeeForRequests(null);
              setHrConditionByRequestId({});
              setHrPhotoByRequestId({});
            }
          }}
        >
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Буцаах хүсэлтүүд — HR шалгах
              </DialogTitle>
              <DialogDescription>
                {selectedEmployeeForRequests === "__mock__"
                  ? "Жишээ (mock): ажилтнаас ирсэн буцаах хүсэлт хэрхэн HR дээр харагдахыг харуулна. Backend deploy хийгээгүй үед ч энэ товчоор харна."
                  : selectedEmployeeName
                    ? `${selectedEmployeeName}-аас ирсэн буцаах хүсэлтүүд. Нөхцөл шалгаад зөв бол зөвшөөрөх (assignment хаагдана, asset AVAILABLE, IT wipe); эвдрэлтэй бол зураг оруулж засвар хүсэх (assignment хаагдана, asset REPAIR_REQUESTED, IT засвар).`
                    : "Ажилтан сонгоно уу."}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              {!selectedEmployeeForRequests ? (
                <p className="text-muted-foreground text-sm">Ажилтан сонгоогүй байна.</p>
              ) : selectedEmployeeForRequests === "__mock__" ? (
                <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-4">
                  <p className="text-muted-foreground text-sm mb-4">
                    Жишээ (mock). Нөхцөл сонгоод, эвдрэлтэй бол зураг оруулж, товчнуудыг туршина уу.
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Хөрөнгө</TableHead>
                        <TableHead>Serial</TableHead>
                        <TableHead>Ажилтны нөхцөл</TableHead>
                        <TableHead>Зураг</TableHead>
                        <TableHead>HR шалгасан нөхцөл</TableHead>
                        <TableHead>Эвдрэлтэй үед зураг</TableHead>
                        <TableHead className="w-[200px]">Үйлдэл</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: "mock-ex-1", assetTag: "Laptop-001", serial: "SN-DEMO-01", conditionEmployee: "DAMAGED: Дэлгэц цуурсан", hasPhoto: true },
                        { id: "mock-ex-2", assetTag: "Mouse-002", serial: "SN-DEMO-02", conditionEmployee: "GOOD", hasPhoto: false },
                      ].map((row) => {
                        const conditionHr = hrConditionByRequestId[row.id] ?? "GOOD";
                        const isDamaged = conditionHr === "DAMAGED";
                        const photoFile = hrPhotoByRequestId[row.id] ?? null;
                        return (
                          <TableRow key={row.id} className="bg-white/80">
                            <TableCell className="font-medium">{row.assetTag}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{row.serial}</TableCell>
                            <TableCell className="text-sm">{row.conditionEmployee}</TableCell>
                            <TableCell className="text-sm">
                              {row.hasPhoto ? <span className="text-amber-600 text-xs">Зураг байна</span> : "—"}
                            </TableCell>
                            <TableCell>
                              <Select value={conditionHr} onValueChange={(v) => setHrConditionByRequestId((prev) => ({ ...prev, [row.id]: v }))}>
                                <SelectTrigger className="w-[120px] h-8"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="GOOD">GOOD — Сайн</SelectItem>
                                  <SelectItem value="FAIR">FAIR — Дунд</SelectItem>
                                  <SelectItem value="DAMAGED">DAMAGED — Эвдрэлтэй</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              {isDamaged ? (
                                <>
                                  <input type="file" accept="image/*" className="text-xs file:mr-1 file:rounded file:border-0 file:bg-amber-100 file:px-2 file:py-0.5 file:text-xs" onChange={(e) => setHrPhotoByRequestId((prev) => ({ ...prev, [row.id]: e.target.files?.[0] ?? null }))} />
                                  {photoFile && <span className="text-xs text-muted-foreground ml-1">{photoFile.name}</span>}
                                </>
                              ) : "—"}
                            </TableCell>
                            <TableCell className="flex flex-wrap gap-1">
                              {!isDamaged ? (
                                <Button variant="outline" size="sm" className="gap-1 text-green-700 border-green-600 hover:bg-green-50" onClick={() => toast.info("Mock: Зөвшөөрөх → AVAILABLE + IT wipe.")}>Зөвшөөрөх (AVAILABLE + wipe)</Button>
                              ) : (
                                <Button variant="outline" size="sm" className="gap-1 text-amber-700 border-amber-600 hover:bg-amber-50" onClick={() => toast.info("Mock: Засвар хүсэх → IT REPAIR_REQUESTED.")}>Засвар хүсэх (IT)</Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <>
                  {pendingRequests.length > 0 ? (
                    <>
                      <div className="rounded-lg border border-green-200 bg-green-50/80 p-3 text-sm text-green-900">
                        <p className="font-medium mb-1">Энэ ажилтнаас ирсэн буцаах хүсэлтүүд (бодит)</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                          <li>Нөхцөл шалгаад «HR шалгасан нөхцөл»-д оруулна (GOOD/FAIR/DAMAGED).</li>
                          <li><strong>Зөв (GOOD/FAIR)</strong> бол «Зөвшөөрөх» дарна → хүсэлт хүлээн авна, assignment хаагдана, asset status AVAILABLE, IT руу wipe даалгавар явна.</li>
                          <li><strong>Эвдрэлтэй (DAMAGED)</strong> бол нөхцөл сонгоод «Эвдрэлтэй үед зураг»-аас зураг оруулж хадгална, «Засвар хүсэх» дарна → assignment хаагдана, asset status REPAIR_REQUESTED, IT руу засварын хүсэлт явна.</li>
                        </ul>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Хөрөнгө</TableHead>
                            <TableHead>Serial</TableHead>
                            <TableHead>Ажилтны нөхцөл</TableHead>
                            <TableHead>Зураг</TableHead>
                            <TableHead>HR шалгасан нөхцөл</TableHead>
                            <TableHead>Эвдрэлтэй үед зураг</TableHead>
                            <TableHead className="w-[200px]">Үйлдэл</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                        {pendingRequests.map((req) => {
                          const conditionHr = hrConditionByRequestId[req.id] ?? "GOOD";
                          const isDamaged = conditionHr === "DAMAGED";
                          const photoFile = hrPhotoByRequestId[req.id] ?? null;
                          return (
                            <TableRow key={req.id}>
                              <TableCell className="font-medium">
                                {req.asset?.assetTag ?? req.assetId}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {req.asset?.serialNumber ?? "—"}
                              </TableCell>
                              <TableCell className="text-sm">
                                {req.conditionEmployee}
                              </TableCell>
                              <TableCell className="text-sm">
                                {"photoR2Key" in req && req.photoR2Key ? (
                                  <span className="text-amber-600 text-xs">Зураг байна</span>
                                ) : (
                                  "—"
                                )}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={conditionHr}
                                  onValueChange={(v) =>
                                    setHrConditionByRequestId((prev) => ({ ...prev, [req.id]: v }))
                                  }
                                >
                                  <SelectTrigger className="w-[120px] h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="GOOD">GOOD — Сайн</SelectItem>
                                    <SelectItem value="FAIR">FAIR — Дунд</SelectItem>
                                    <SelectItem value="DAMAGED">DAMAGED — Эвдрэлтэй</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                {isDamaged ? (
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="text-xs file:mr-1 file:rounded file:border-0 file:bg-amber-100 file:px-2 file:py-0.5 file:text-xs"
                                    onChange={(e) =>
                                      setHrPhotoByRequestId((prev) => ({
                                        ...prev,
                                        [req.id]: e.target.files?.[0] ?? null,
                                      }))
                                    }
                                  />
                                ) : (
                                  "—"
                                )}
                                {photoFile && (
                                  <span className="text-xs text-muted-foreground ml-1">
                                    {photoFile.name}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="flex flex-wrap gap-1">
                                {!isDamaged ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 text-green-700 border-green-600 hover:bg-green-50"
                                    disabled={approveLoading || repairLoading}
                                    onClick={() =>
                                      handleApproveReturnRequest(req.id, conditionHr)
                                    }
                                  >
                                    Зөвшөөрөх (AVAILABLE + wipe)
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 text-amber-700 border-amber-600 hover:bg-amber-50"
                                    disabled={approveLoading || repairLoading}
                                    onClick={() =>
                                      handleRequestRepair(req.id, conditionHr, photoFile)
                                    }
                                  >
                                    Засвар хүсэх (IT)
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    </>
                  ) : (
                    /* Бодит хүсэлт байхгүй үед бодит урсгалтай ижил UI (нөхцөл, зураг, товч) mock-оор */
                    <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-4">
                      <p className="text-sm font-medium text-amber-900 mb-1">
                        {(selectedEmployeeName || "Энэ ажилтан")}-аас ирсэн буцаах хүсэлтүүд
                      </p>
                      <p className="text-muted-foreground text-xs mb-3">
                        Одоогоор энэ ажилтан буцаах хүсэлт илгээгээгүй байна. Ажилтан Demo Employee хуудсаас «Буцааж өгөх хүсэлт илгээх» дарсны дараа энд харагдана. Доор жишээ (mock) — нөхцөл сонгоод товчнуудыг туршина уу.
                      </p>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Хөрөнгө</TableHead>
                            <TableHead>Serial</TableHead>
                            <TableHead>Ажилтны нөхцөл</TableHead>
                            <TableHead>Зураг</TableHead>
                            <TableHead>HR шалгасан нөхцөл</TableHead>
                            <TableHead>Эвдрэлтэй үед зураг</TableHead>
                            <TableHead className="w-[200px]">Үйлдэл</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              id: "mock-req-1",
                              assetTag: "Laptop-001 (mock)",
                              serial: "SN-DEMO-01",
                              conditionEmployee: "DAMAGED: Дэлгэц цуурсан",
                              hasPhoto: true,
                            },
                            {
                              id: "mock-req-2",
                              assetTag: "Mouse-002 (mock)",
                              serial: "SN-DEMO-02",
                              conditionEmployee: "GOOD",
                              hasPhoto: false,
                            },
                          ].map((row) => {
                            const conditionHr = hrConditionByRequestId[row.id] ?? "GOOD";
                            const isDamaged = conditionHr === "DAMAGED";
                            const photoFile = hrPhotoByRequestId[row.id] ?? null;
                            return (
                              <TableRow key={row.id} className="bg-white/80">
                                <TableCell className="font-medium">{row.assetTag}</TableCell>
                                <TableCell className="text-muted-foreground text-sm">{row.serial}</TableCell>
                                <TableCell className="text-sm">{row.conditionEmployee}</TableCell>
                                <TableCell className="text-sm">
                                  {row.hasPhoto ? (
                                    <span className="text-amber-600 text-xs">Зураг байна</span>
                                  ) : (
                                    "—"
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={conditionHr}
                                    onValueChange={(v) =>
                                      setHrConditionByRequestId((prev) => ({ ...prev, [row.id]: v }))
                                    }
                                  >
                                    <SelectTrigger className="w-[120px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="GOOD">GOOD — Сайн</SelectItem>
                                      <SelectItem value="FAIR">FAIR — Дунд</SelectItem>
                                      <SelectItem value="DAMAGED">DAMAGED — Эвдрэлтэй</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  {isDamaged ? (
                                    <>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="text-xs file:mr-1 file:rounded file:border-0 file:bg-amber-100 file:px-2 file:py-0.5 file:text-xs"
                                        onChange={(e) =>
                                          setHrPhotoByRequestId((prev) => ({
                                            ...prev,
                                            [row.id]: e.target.files?.[0] ?? null,
                                          }))
                                        }
                                      />
                                      {photoFile && (
                                        <span className="text-xs text-muted-foreground ml-1">{photoFile.name}</span>
                                      )}
                                    </>
                                  ) : (
                                    "—"
                                  )}
                                </TableCell>
                                <TableCell className="flex flex-wrap gap-1">
                                  {!isDamaged ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1 text-green-700 border-green-600 hover:bg-green-50"
                                      onClick={() => toast.info("Mock: бодит хүсэлт байхгүй тул үйлдэл хийгдэхгүй. Зөвшөөрөх → AVAILABLE + IT wipe.")}
                                    >
                                      Зөвшөөрөх (AVAILABLE + wipe)
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1 text-amber-700 border-amber-600 hover:bg-amber-50"
                                      onClick={() => toast.info("Mock: бодит хүсэлт байхгүй тул үйлдэл хийгдэхгүй. Засвар хүсэх → IT руу REPAIR_REQUESTED.")}
                                    >
                                      Засвар хүсэх (IT)
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Ажлаас гаргах — ажилтан сонгох, огноо, process эхлүүлэх */}
        <Dialog open={offboardOpen} onOpenChange={setOffboardOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ажлаас гаргах процесс эхлүүлэх</DialogTitle>
              <DialogDescription>
                Ажлаас гаргах ажилтанг сонгоод огноо тохируулж, процесс
                эхлүүлнэ.
              </DialogDescription>
            </DialogHeader>
            <div className="grid w-full grid-cols-1 gap-4 py-4">
              <div className="grid w-full gap-2">
                <label className="text-sm font-medium">
                  Ажлаас гаргах ажилтан
                </label>
                <Select
                  value={offboardEmployeeId}
                  onValueChange={setOffboardEmployeeId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ажилтан сонгох..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activeEmployees.length === 0 ? (
                      <SelectItem value="__none" disabled>
                        Идэвхтэй ажилтан байхгүй
                      </SelectItem>
                    ) : (
                      activeEmployees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.firstName} {emp.lastName} ({emp.email})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full gap-2">
                <label className="text-sm font-medium">
                  Ажлаас гарах огноо
                </label>
                <Popover
                  open={offboardDatePickerOpen}
                  onOpenChange={setOffboardDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                      {offboardDate.toLocaleDateString("mn-MN")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={offboardDate}
                      onSelect={(date) => {
                        if (date) {
                          setOffboardDate(date);
                          setOffboardDatePickerOpen(false);
                        }
                      }}
                      disabled={(date) =>
                        startOfDay(date) < startOfDay(new Date())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOffboardOpen(false)}
                disabled={offboardSubmitting}
              >
                Цуцлах
              </Button>
              <Button
                onClick={handleOffboardSubmit}
                disabled={
                  !offboardEmployeeId ||
                  offboardSubmitting ||
                  activeEmployees.length === 0
                }
                className="gap-2"
              >
                {offboardSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                Process эхлүүлэх
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
