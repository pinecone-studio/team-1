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
  StartOffboardingDocument,
  CreateEmployeeDocument,
  UpdateEmployeeDocument,
} from "@/gql/graphql";
import type {
  EmployeeCreateInput,
  EmployeeUpdateInput,
} from "@/gql/graphql";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const EMPLOYEE_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Идэвхтэй",
  OFFBOARDING: "Гарах процесс",
  TERMINATED: "Ажлаас гарсан",
};

const ROLE_OPTIONS: { value: string; label: string }[] = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "HR", label: "HR" },
  { value: "IT", label: "IT" },
  { value: "FINANCE", label: "Finance" },
  { value: "EMPLOYEE", label: "Ажилтан" },
];

type NewEmployeeFormState = {
  firstName: string;
  lastName: string;
  firstNameEng: string;
  lastNameEng: string;
  email: string;
  hireDate: string;
  numberOfVacationDays: string;
  github: string;
  department: string;
  branch: string;
  employeeCode: string;
  level: string;
  isKpi: boolean;
  isSalaryCompany: boolean;
  birthDayAndMonth: string;
  birthdayPoster: string;
};

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDefaultNewEmployeeForm(): NewEmployeeFormState {
  return {
    firstName: "",
    lastName: "",
    firstNameEng: "",
    lastNameEng: "",
    email: "",
    hireDate: getTodayDateString(),
    numberOfVacationDays: "",
    github: "",
    department: "",
    branch: "",
    employeeCode: "",
    level: "",
    isKpi: false,
    isSalaryCompany: true,
    birthDayAndMonth: "",
    birthdayPoster: "",
  };
}

function getDemoNewEmployeeForm(): NewEmployeeFormState {
  return {
    ...getDefaultNewEmployeeForm(),
    firstName: "Бат",
    lastName: "Дорж",
    firstNameEng: "Bat",
    lastNameEng: "Dorj",
    email: "bat.dorj@company.mn",
    numberOfVacationDays: "21",
    github: "batdorj",
    department: "IT",
    branch: "Улаанбаатар",
    employeeCode: "EMP-DEMO",
    level: "Senior",
    isKpi: true,
    isSalaryCompany: true,
    birthDayAndMonth: "05-15",
    birthdayPoster: "",
  };
}

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
  const [selectedEmployeeForRequests, setSelectedEmployeeForRequests] =
    useState<string | null>(null);
  const [showReturnRequestsModal, setShowReturnRequestsModal] = useState(false);
  /** Хүсэлт бүр дээр HR-ийн шалгасан нөхцөл (GOOD/FAIR/DAMAGED) */
  const [hrConditionByRequestId, setHrConditionByRequestId] = useState<
    Record<string, string>
  >({});
  /** Эвдрэлтэй үед HR оруулсан зураг (requestId -> File) */
  const [hrPhotoByRequestId, setHrPhotoByRequestId] = useState<
    Record<string, File | null>
  >({});

  const [createEmployeeMutation, { loading: createEmployeeLoading }] =
    useMutation(CreateEmployeeDocument);
  const [updateEmployeeMutation, { loading: updateRoleLoading }] =
    useMutation(UpdateEmployeeDocument);

  const [roleChangeEmployeeId, setRoleChangeEmployeeId] = useState<string>("");
  const [roleChangeRole, setRoleChangeRole] = useState<string>("EMPLOYEE");

  const [newEmployeeForm, setNewEmployeeForm] =
    useState<NewEmployeeFormState>(() => getDefaultNewEmployeeForm());

  const { data, loading, error, refetch } = useQuery(EmployeesDocument, {
    fetchPolicy: "network-only",
  });

  const { data: offboardingRequestsData, refetch: refetchOffboardingRequests } =
    useQuery(GetActiveOffboardingDocument, {
      variables: { employeeId: selectedEmployeeForRequests ?? "" },
      skip:
        !selectedEmployeeForRequests ||
        selectedEmployeeForRequests === "__mock__",
      fetchPolicy: "network-only",
    });
  const [approveReturnRequestMutation, { loading: approveLoading }] =
    useMutation(ApproveReturnRequestDocument);
  const [requestRepairMutation, { loading: repairLoading }] = useMutation(
    RequestRepairDocument,
  );
  const [startOffboardingMutation] = useMutation(StartOffboardingDocument);

  const pendingRequests =
    offboardingRequestsData?.offboardingEvent?.pendingReturnRequests ?? [];

  const employees = Array.isArray(data?.employees) ? data.employees : [];
  const activeEmployees = employees.filter(
    (e) => e.status !== "TERMINATED" && e.status !== "OFFBOARDING",
  );
  const terminatedEmployees = employees.filter(
    (e) => e.status === "TERMINATED" || e.status === "OFFBOARDING",
  );
  const employeesSorted = [...activeEmployees, ...terminatedEmployees];
  const hrActorId =
    employeesSorted.find((e) => e.role === "HR")?.id ??
    employeesSorted.find((e) => e.role === "SUPER_ADMIN")?.id ??
    employeesSorted[0]?.id ??
    "";
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
      toast.success(
        "Буцаах хүсэлт зөвшөөрөгдөж, хөрөнгө боломжтой боллоо. IT data wipe даалгавар үүслээ.",
      );
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
      const photoR2Key = photoFile
        ? `demo-hr-photo-${Date.now()}-${photoFile.name}`
        : null;
      await requestRepairMutation({
        variables: {
          returnRequestId,
          conditionHr,
          photoR2Key,
          inspectedBy: "demo-hr",
        },
      });
      toast.success(
        "Засварын хүсэлт IT руу илгээгдлээ. Хөрөнгийн төлөв: REPAIR_REQUESTED.",
      );
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
    if (!hrActorId) {
      toast.error("HR actor олдсонгүй (employees list хоосон байна).");
      return;
    }

    setOffboardSubmitting(true);
    try {
      const res = await startOffboardingMutation({
        variables: {
          employeeId: offboardEmployeeId,
          initiatedBy: hrActorId,
          terminationDate: startOfDay(offboardDate),
        },
      });
      toast.success(
        `Ажлаас гарах процесс эхэллээ. (Event: ${res.data?.startOffboarding?.id ?? "—"})`,
      );
      setOffboardOpen(false);
      setOffboardEmployeeId("");
      setOffboardDate(new Date());
      refetch();
    } catch (err) {
      toast.error("Ажлаас гаргах процесст алдаа гарлаа.");
    } finally {
      setOffboardSubmitting(false);
    }
  };

  const handleCreateEmployee = async () => {
    const d = newEmployeeForm;
    if (
      !d.firstName?.trim() ||
      !d.lastName?.trim() ||
      !d.firstNameEng?.trim() ||
      !d.lastNameEng?.trim() ||
      !d.email?.trim() ||
      !d.hireDate ||
      !d.department?.trim() ||
      !d.branch?.trim() ||
      !d.employeeCode?.trim() ||
      !d.level?.trim()
    ) {
      toast.error("Заавал бөглөх талбаруудыг бүгдийг оруулна уу.");
      return;
    }
    const hireDateTs = new Date(d.hireDate).getTime();
    if (Number.isNaN(hireDateTs)) {
      toast.error("Ажилд орсон огноо буруу байна.");
      return;
    }
    const input: EmployeeCreateInput = {
      firstName: d.firstName.trim(),
      lastName: d.lastName.trim(),
      firstNameEng: d.firstNameEng.trim(),
      lastNameEng: d.lastNameEng.trim(),
      email: d.email.trim(),
      hireDate: hireDateTs,
      numberOfVacationDays: d.numberOfVacationDays ? parseInt(d.numberOfVacationDays, 10) : undefined,
      github: d.github.trim() || undefined,
      department: d.department.trim(),
      branch: d.branch.trim(),
      employeeCode: d.employeeCode.trim(),
      level: d.level.trim(),
      isKpi: d.isKpi ? 1 : 0,
      isSalaryCompany: d.isSalaryCompany ? 1 : 0,
      birthDayAndMonth: d.birthDayAndMonth.trim() || undefined,
      birthdayPoster: d.birthdayPoster.trim() || undefined,
    };
    try {
      await createEmployeeMutation({ variables: { input } });
      toast.success("Шинэ ажилтан амжилттай бүртгэгдлээ. И-мэйлээр нэвтрэхэд төлөв ACTIVE болно.");
      setNewEmployeeOpen(false);
      setNewEmployeeForm(getDefaultNewEmployeeForm());
      refetch();
    } catch (err) {
      toast.error("Ажилтан бүртгэхэд алдаа гарлаа. Нэвтэрсэн эсэх, Bearer token шалгана уу.");
    }
  };

  const handleRoleChangeSubmit = async () => {
    if (!roleChangeEmployeeId) {
      toast.error("Ажилтан сонгоно уу.");
      return;
    }
    try {
      await updateEmployeeMutation({
        variables: {
          id: roleChangeEmployeeId,
          input: { role: roleChangeRole } as EmployeeUpdateInput,
        },
      });
      toast.success(
        "Role амжилттай солигдлоо. Clerk дээрх publicMetadata-д бас шинэчлэгдсэн.",
      );
      setRoleChangeOpen(false);
      setRoleChangeEmployeeId("");
      setRoleChangeRole("EMPLOYEE");
      refetch();
    } catch (err) {
      toast.error("Role солиход алдаа гарлаа.");
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
                    employeesSorted.length > 0
                      ? employeesSorted[0].id
                      : "__mock__",
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

        {/* Шинэ ажилтан бүртгэх */}
        <Dialog
          open={newEmployeeOpen}
          onOpenChange={(open) => {
            setNewEmployeeOpen(open);
            if (open) setNewEmployeeForm(getDefaultNewEmployeeForm());
          }}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Шинэ ажилтан бүртгэх</DialogTitle>
              <DialogDescription>
                И-мэйлээр бүртгэсний дараа тухайн хүн нэвтэрч ороход төлөв
                ACTIVE болж, clerkId холбогдоно. Ажилд орсон огноо default-аар
                өнөөдөр.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Нэр (монгол)</Label>
                <Input
                  id="firstName"
                  value={newEmployeeForm.firstName}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, firstName: e.target.value }))
                  }
                  placeholder="Жишээ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Овог (монгол)</Label>
                <Input
                  id="lastName"
                  value={newEmployeeForm.lastName}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, lastName: e.target.value }))
                  }
                  placeholder="Жишээ"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstNameEng">Нэр (англи)</Label>
                <Input
                  id="firstNameEng"
                  value={newEmployeeForm.firstNameEng}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, firstNameEng: e.target.value }))
                  }
                  placeholder="First"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastNameEng">Овог (англи)</Label>
                <Input
                  id="lastNameEng"
                  value={newEmployeeForm.lastNameEng}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, lastNameEng: e.target.value }))
                  }
                  placeholder="Last"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">И-мэйл *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployeeForm.email}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="email@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Ажилд орсон огноо *</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={newEmployeeForm.hireDate}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, hireDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfVacationDays">Чөлөөний өдрийн тоо</Label>
                <Input
                  id="numberOfVacationDays"
                  type="number"
                  min={0}
                  value={newEmployeeForm.numberOfVacationDays}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({
                      ...p,
                      numberOfVacationDays: e.target.value,
                    }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={newEmployeeForm.github}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, github: e.target.value }))
                  }
                  placeholder="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Алба *</Label>
                <Input
                  id="department"
                  value={newEmployeeForm.department}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, department: e.target.value }))
                  }
                  placeholder="IT"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Салбар *</Label>
                <Input
                  id="branch"
                  value={newEmployeeForm.branch}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, branch: e.target.value }))
                  }
                  placeholder="Улаанбаатар"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeCode">Ажилтны код *</Label>
                <Input
                  id="employeeCode"
                  value={newEmployeeForm.employeeCode}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, employeeCode: e.target.value }))
                  }
                  placeholder="EMP001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Түвшин *</Label>
                <Input
                  id="level"
                  value={newEmployeeForm.level}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, level: e.target.value }))
                  }
                  placeholder="Junior / Senior"
                />
              </div>
              <div className="flex items-center space-x-2 sm:col-span-2">
                <Checkbox
                  id="isKpi"
                  checked={newEmployeeForm.isKpi}
                  onCheckedChange={(checked) =>
                    setNewEmployeeForm((p) => ({ ...p, isKpi: !!checked }))
                  }
                />
                <Label htmlFor="isKpi" className="cursor-pointer">
                  KPI-тэй эсэх
                </Label>
              </div>
              <div className="flex items-center space-x-2 sm:col-span-2">
                <Checkbox
                  id="isSalaryCompany"
                  checked={newEmployeeForm.isSalaryCompany}
                  onCheckedChange={(checked) =>
                    setNewEmployeeForm((p) => ({ ...p, isSalaryCompany: !!checked }))
                  }
                />
                <Label htmlFor="isSalaryCompany" className="cursor-pointer">
                  Цалингийн компани (төлөвлөгөөнд багтах)
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDayAndMonth">Төрсөн сар/өдөр (MM-DD)</Label>
                <Input
                  id="birthDayAndMonth"
                  value={newEmployeeForm.birthDayAndMonth}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({
                      ...p,
                      birthDayAndMonth: e.target.value,
                    }))
                  }
                  placeholder="01-15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdayPoster">Төрсөн өдрийн poster</Label>
                <Input
                  id="birthdayPoster"
                  value={newEmployeeForm.birthdayPoster}
                  onChange={(e) =>
                    setNewEmployeeForm((p) => ({ ...p, birthdayPoster: e.target.value }))
                  }
                  placeholder="URL эсвэл тэмдэглэл"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setNewEmployeeForm(getDemoNewEmployeeForm())}
                >
                  Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setNewEmployeeForm(getDefaultNewEmployeeForm())}
                >
                  Цэвлэх
                </Button>
              </div>
              <DialogFooter className="border-0 p-0">
                <Button
                  variant="outline"
                  onClick={() => setNewEmployeeOpen(false)}
                >
                  Хаах
                </Button>
                <Button
                  onClick={handleCreateEmployee}
                  disabled={createEmployeeLoading}
                >
                  {createEmployeeLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Бүртгэж байна...
                    </>
                  ) : (
                    "Бүртгэх"
                  )}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        {/* Ажилтны role солих */}
        <Dialog
          open={roleChangeOpen}
          onOpenChange={(open) => {
            setRoleChangeOpen(open);
            if (!open) {
              setRoleChangeEmployeeId("");
              setRoleChangeRole("EMPLOYEE");
            }
          }}
        >
          <DialogContent className="sm:min-w-[380px]">
            <DialogHeader>
              <DialogTitle>Ажилтны role солих</DialogTitle>
              <DialogDescription>
                Ажилтан сонгоод шинэ role сонгоод OK дарна. DB болон Clerk-ийн
                publicMetadata дээр шинэчлэгдэнэ.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Ажилтан</Label>
                <Select
                  value={roleChangeEmployeeId || undefined}
                  onValueChange={setRoleChangeEmployeeId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ажилтан сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeesSorted.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} ({emp.email}) — {emp.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={roleChangeRole}
                  onValueChange={setRoleChangeRole}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRoleChangeOpen(false)}
              >
                Хаах
              </Button>
              <Button
                onClick={handleRoleChangeSubmit}
                disabled={updateRoleLoading || !roleChangeEmployeeId}
              >
                {updateRoleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Хадгалж байна...
                  </>
                ) : (
                  "OK"
                )}
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
                <p className="text-muted-foreground text-sm">
                  Ажилтан сонгоогүй байна.
                </p>
              ) : selectedEmployeeForRequests === "__mock__" ? (
                <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-4">
                  <p className="text-muted-foreground text-sm mb-4">
                    Жишээ (mock). Нөхцөл сонгоод, эвдрэлтэй бол зураг оруулж,
                    товчнуудыг туршина уу.
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
                          id: "mock-ex-1",
                          assetTag: "Laptop-001",
                          serial: "SN-DEMO-01",
                          conditionEmployee: "DAMAGED: Дэлгэц цуурсан",
                          hasPhoto: true,
                        },
                        {
                          id: "mock-ex-2",
                          assetTag: "Mouse-002",
                          serial: "SN-DEMO-02",
                          conditionEmployee: "GOOD",
                          hasPhoto: false,
                        },
                      ].map((row) => {
                        const conditionHr =
                          hrConditionByRequestId[row.id] ?? "GOOD";
                        const isDamaged = conditionHr === "DAMAGED";
                        const photoFile = hrPhotoByRequestId[row.id] ?? null;
                        return (
                          <TableRow key={row.id} className="bg-white/80">
                            <TableCell className="font-medium">
                              {row.assetTag}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {row.serial}
                            </TableCell>
                            <TableCell className="text-sm">
                              {row.conditionEmployee}
                            </TableCell>
                            <TableCell className="text-sm">
                              {row.hasPhoto ? (
                                <span className="text-amber-600 text-xs">
                                  Зураг байна
                                </span>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={conditionHr}
                                onValueChange={(v) =>
                                  setHrConditionByRequestId((prev) => ({
                                    ...prev,
                                    [row.id]: v,
                                  }))
                                }
                              >
                                <SelectTrigger className="w-[120px] h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="GOOD">
                                    GOOD — Сайн
                                  </SelectItem>
                                  <SelectItem value="FAIR">
                                    FAIR — Дунд
                                  </SelectItem>
                                  <SelectItem value="DAMAGED">
                                    DAMAGED — Эвдрэлтэй
                                  </SelectItem>
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
                                    <span className="text-xs text-muted-foreground ml-1">
                                      {photoFile.name}
                                    </span>
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
                                  onClick={() =>
                                    toast.info(
                                      "Mock: Зөвшөөрөх → AVAILABLE + IT wipe.",
                                    )
                                  }
                                >
                                  Зөвшөөрөх (AVAILABLE + wipe)
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1 text-amber-700 border-amber-600 hover:bg-amber-50"
                                  onClick={() =>
                                    toast.info(
                                      "Mock: Засвар хүсэх → IT REPAIR_REQUESTED.",
                                    )
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
                </div>
              ) : (
                <>
                  {pendingRequests.length > 0 ? (
                    <>
                      <div className="rounded-lg border border-green-200 bg-green-50/80 p-3 text-sm text-green-900">
                        <p className="font-medium mb-1">
                          Энэ ажилтнаас ирсэн буцаах хүсэлтүүд (бодит)
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                          <li>
                            Нөхцөл шалгаад «HR шалгасан нөхцөл»-д оруулна
                            (GOOD/FAIR/DAMAGED).
                          </li>
                          <li>
                            <strong>Зөв (GOOD/FAIR)</strong> бол «Зөвшөөрөх»
                            дарна → хүсэлт хүлээн авна, assignment хаагдана,
                            asset status AVAILABLE, IT руу wipe даалгавар явна.
                          </li>
                          <li>
                            <strong>Эвдрэлтэй (DAMAGED)</strong> бол нөхцөл
                            сонгоод «Эвдрэлтэй үед зураг»-аас зураг оруулж
                            хадгална, «Засвар хүсэх» дарна → assignment
                            хаагдана, asset status REPAIR_REQUESTED, IT руу
                            засварын хүсэлт явна.
                          </li>
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
                            const conditionHr =
                              hrConditionByRequestId[req.id] ?? "GOOD";
                            const isDamaged = conditionHr === "DAMAGED";
                            const photoFile =
                              hrPhotoByRequestId[req.id] ?? null;
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
                                    <span className="text-amber-600 text-xs">
                                      Зураг байна
                                    </span>
                                  ) : (
                                    "—"
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={conditionHr}
                                    onValueChange={(v) =>
                                      setHrConditionByRequestId((prev) => ({
                                        ...prev,
                                        [req.id]: v,
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="w-[120px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="GOOD">
                                        GOOD — Сайн
                                      </SelectItem>
                                      <SelectItem value="FAIR">
                                        FAIR — Дунд
                                      </SelectItem>
                                      <SelectItem value="DAMAGED">
                                        DAMAGED — Эвдрэлтэй
                                      </SelectItem>
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
                                        handleApproveReturnRequest(
                                          req.id,
                                          conditionHr,
                                        )
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
                                        handleRequestRepair(
                                          req.id,
                                          conditionHr,
                                          photoFile,
                                        )
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
                        {selectedEmployeeName || "Энэ ажилтан"}-аас ирсэн буцаах
                        хүсэлтүүд
                      </p>
                      <p className="text-muted-foreground text-xs mb-3">
                        Одоогоор энэ ажилтан буцаах хүсэлт илгээгээгүй байна.
                        Доор жишээ (mock) — нөхцөл сонгоод товчнуудыг туршина уу.
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
                            const conditionHr =
                              hrConditionByRequestId[row.id] ?? "GOOD";
                            const isDamaged = conditionHr === "DAMAGED";
                            const photoFile =
                              hrPhotoByRequestId[row.id] ?? null;
                            return (
                              <TableRow key={row.id} className="bg-white/80">
                                <TableCell className="font-medium">
                                  {row.assetTag}
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                  {row.serial}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {row.conditionEmployee}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {row.hasPhoto ? (
                                    <span className="text-amber-600 text-xs">
                                      Зураг байна
                                    </span>
                                  ) : (
                                    "—"
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={conditionHr}
                                    onValueChange={(v) =>
                                      setHrConditionByRequestId((prev) => ({
                                        ...prev,
                                        [row.id]: v,
                                      }))
                                    }
                                  >
                                    <SelectTrigger className="w-[120px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="GOOD">
                                        GOOD — Сайн
                                      </SelectItem>
                                      <SelectItem value="FAIR">
                                        FAIR — Дунд
                                      </SelectItem>
                                      <SelectItem value="DAMAGED">
                                        DAMAGED — Эвдрэлтэй
                                      </SelectItem>
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
                                            [row.id]:
                                              e.target.files?.[0] ?? null,
                                          }))
                                        }
                                      />
                                      {photoFile && (
                                        <span className="text-xs text-muted-foreground ml-1">
                                          {photoFile.name}
                                        </span>
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
                                      onClick={() =>
                                        toast.info(
                                          "Mock: бодит хүсэлт байхгүй тул үйлдэл хийгдэхгүй. Зөвшөөрөх → AVAILABLE + IT wipe.",
                                        )
                                      }
                                    >
                                      Зөвшөөрөх (AVAILABLE + wipe)
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1 text-amber-700 border-amber-600 hover:bg-amber-50"
                                      onClick={() =>
                                        toast.info(
                                          "Mock: бодит хүсэлт байхгүй тул үйлдэл хийгдэхгүй. Засвар хүсэх → IT руу REPAIR_REQUESTED.",
                                        )
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
