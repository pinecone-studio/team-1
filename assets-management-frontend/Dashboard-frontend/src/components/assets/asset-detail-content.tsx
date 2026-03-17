"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useRef, useState } from "react";
import type { AssetFieldsFragment } from "@/gql/graphql";
import {
  GetAssetDocument,
  GetAssetHistoryDocument,
  GetAuditLogsDocument,
  GetCategoriesDocument,
  GetLocationsDocument,
  EmployeesDocument,
  UpdateAssetDocument,
} from "@/gql/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Clock, Pencil, X, Check } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Эзэмшигчтэй",
  ASSIGN_REQUESTED: "Хүсэлт илгээсэн",
  AVAILABLE: "Эзэмшигчгүй",
  IN_REPAIR: "Засварт",
  DAMAGED: "Эвдрэлтэй",
  DISPOSAL_REQUESTED: "Устгах хүсэлт орсон",
  PENDING_DISPOSAL: "Устгах хүлээгдэж буй",
  DISPOSED: "Устгасан",
  FOR_SALE: "Зарж болох",
};

const AUDIT_ACTION_LABELS: Record<string, string> = {
  REGISTERED: "Бүртгэсэн",
  PURCHASED: "Худалдан авсан",
  ASSET_UPDATED: "Өөрчилсөн",
  ASSET_RETURNED: "Буцаасан",
  RETURNED: "Буцаасан",
  ASSET_DISPOSED: "Устгасан (IT/санхүү)",
  DISPOSED: "Устгасан",
  DISPOSAL_REQUESTED: "Устгах хүсэлт илгээсэн",
  DISPOSAL_IT_APPROVED: "IT баталгаажсан",
  DISPOSAL_FINANCE_APPROVED: "Санхүү баталгаажсан",
  DISPOSAL_REJECTED: "Устгах хүсэлт татгалзсан",
  ASSIGNED: "Олгосон",
  ASSIGNMENT_ACCEPTED: "Эзэмшигч зөвшөөрсөн",
  ASSIGNMENT_REJECTED: "Эзэмшигч татгалзсан",
  TRANSFERRED: "Шилжүүлсэн",
  LOCATION_MOVED: "Байршил солигдсон",
  MAINTENANCE_OPENED: "Засварын дугаар нээгдсэн",
  MAINTENANCE_RESOLVED: "Засвар дууссан",
};

const STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Эзэмшигчгүй" },
  { value: "ASSIGNED", label: "Эзэмшигчтэй" },
  { value: "FOR_SALE", label: "Зарж болох" },
  { value: "DAMAGED", label: "Эвдрэлтэй" },
  { value: "IN_REPAIR", label: "Засварт" },
  { value: "DISPOSED", label: "Устгасан" },
];

export function AssetDetailContent({
  assetId,
  className,
  onSaved,
}: {
  assetId: string;
  className?: string;
  onSaved?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editAssetTag, setEditAssetTag] = useState("");
  const [editSerialNumber, setEditSerialNumber] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editMainCategory, setEditMainCategory] = useState("");
  const [editSubCategory, setEditSubCategory] = useState("");
  const [editLocationId, setEditLocationId] = useState<string>("");
  const [editPurchaseCost, setEditPurchaseCost] = useState("");
  const [editSalePrice, setEditSalePrice] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const editBaselineRef = useRef<{
    assetTag: string;
    serialNumber: string;
    status: string;
    mainCategory: string;
    subCategory: string;
    locationId: string;
    purchaseCost: number | null;
    salePrice: number | null;
    notes: string;
  } | null>(null);

  const { data: assetData, loading: assetLoading, refetch } = useQuery(
    GetAssetDocument,
    { variables: { id: assetId }, skip: !assetId },
  );
  const { data: historyData } = useQuery(GetAssetHistoryDocument, {
    variables: { assetId },
    skip: !assetId,
  });
  const { data: auditData } = useQuery(GetAuditLogsDocument, {
    variables: { recordId: assetId, tableName: "assets" },
    skip: !assetId,
  });
  const { data: categoriesData } = useQuery(GetCategoriesDocument, {
    skip: !assetId,
  });
  const { data: locationsData } = useQuery(GetLocationsDocument, {
    skip: !assetId,
  });
  const { data: employeesData } = useQuery(EmployeesDocument, {
    skip: !assetId,
  });

  const [updateAssetMutation] = useMutation(UpdateAssetDocument);

  const asset = assetData?.asset as
    | (AssetFieldsFragment & { locationPath?: string | null })
    | undefined;
  const history = historyData?.assetHistory ?? [];
  const auditLogs = auditData?.auditLogs ?? [];

  // ---- Derived values (MUST be before any early returns; keep hook order stable)
  const a = asset;
  const statusLabel = useMemo(() => {
    if (!a) return "—";
    return (
      STATUS_LABELS[a.status?.toUpperCase?.() ?? ""] ?? a.status ?? "—"
    );
  }, [a]);

  const locationDisplay = useMemo(() => {
    if (!a) return "—";
    const rawLocation = a.locationPath?.trim() ?? "";
    return rawLocation && !/^[0-9a-f-]{20,}$/i.test(rawLocation)
      ? rawLocation
      : "—";
  }, [a]);

  const purchasePrice = useMemo(() => {
    if (!a) return "—";
    return a.purchaseCost != null
      ? Number(a.purchaseCost).toLocaleString() + "₮"
      : "—";
  }, [a]);

  const categoryTree = useMemo(() => {
    const cats = (categoriesData?.categories ?? []) as Array<{
      id: string;
      name: string;
      parentId?: string | null;
      subcategories?: Array<{ id: string; name: string; parentId?: string | null }>;
    }>;
    const mains = cats
      .map((c) => c.name)
      .filter(Boolean)
      .sort((x, y) => x.localeCompare(y));
    const subsByMain = new Map<string, string[]>();
    cats.forEach((c) => {
      const subs = (c.subcategories ?? [])
        .map((s) => s.name)
        .filter(Boolean)
        .sort((x, y) => x.localeCompare(y));
      subsByMain.set(c.name, subs);
    });
    return { mains, subsByMain };
  }, [categoriesData?.categories]);

  const subCategoryOptions = useMemo(() => {
    if (editMainCategory && categoryTree.subsByMain.has(editMainCategory)) {
      return categoryTree.subsByMain.get(editMainCategory) ?? [];
    }
    const all = new Set<string>();
    categoryTree.subsByMain.forEach((subs) => subs.forEach((s) => all.add(s)));
    return Array.from(all).sort((x, y) => x.localeCompare(y));
  }, [categoryTree, editMainCategory]);

  const locationOptions = useMemo(() => {
    const locs = (locationsData?.locations ?? []) as Array<{
      id: string;
      name: string;
      parentId?: string | null;
      type: string;
    }>;
    const byId = new Map(locs.map((l) => [l.id, l]));
    const pathById = new Map<string, string>();
    const buildPath = (id: string) => {
      if (pathById.has(id)) return pathById.get(id)!;
      const parts: string[] = [];
      let cur: string | null | undefined = id;
      const seen = new Set<string>();
      while (cur) {
        if (seen.has(cur)) break;
        seen.add(cur);
        const row = byId.get(cur);
        if (!row) break;
        parts.push(row.name);
        cur = row.parentId ?? null;
      }
      parts.reverse();
      const p = parts.length ? parts.join(" / ") : id;
      pathById.set(id, p);
      return p;
    };
    const opts = locs
      .map((l) => ({ id: l.id, label: buildPath(l.id) }))
      .sort((x, y) => x.label.localeCompare(y.label));

    const currentLocationId = a?.locationId ?? "";
    if (
      currentLocationId &&
      !opts.some((o) => o.id === currentLocationId)
    ) {
      opts.unshift({ id: currentLocationId, label: locationDisplay });
    }
    return opts;
  }, [locationsData?.locations, a?.locationId, locationDisplay]);

  const startEditing = () => {
    if (!a) return;
    setEditAssetTag(a.assetTag ?? "");
    setEditSerialNumber(a.serialNumber ?? "");
    setEditStatus(a.status ?? "AVAILABLE");
    setEditPurchaseCost(
      a.purchaseCost != null ? String(a.purchaseCost) : "",
    );
    setEditSalePrice(
      a.currentBookValue != null ? String(a.currentBookValue) : "",
    );
    setEditNotes(a.notes ?? "");

    // Category/subCategory-г categories tree дээрээс тааруулж seed хийе.
    const subName = a.category ?? "";
    let mainName = "";
    if (subName && (categoriesData?.categories ?? []).length > 0) {
      const cats = (categoriesData?.categories ?? []) as Array<{
        name: string;
        subcategories?: Array<{ name: string }>;
      }>;
      const parent = cats.find((c) =>
        (c.subcategories ?? []).some((s) => s.name === subName),
      );
      if (parent?.name) mainName = parent.name;
    }
    setEditMainCategory(mainName);
    setEditSubCategory(subName);

    setEditLocationId(a.locationId ?? "");
    editBaselineRef.current = {
      assetTag: a.assetTag ?? "",
      serialNumber: a.serialNumber ?? "",
      status: a.status ?? "AVAILABLE",
      mainCategory: mainName,
      subCategory: subName,
      locationId: a.locationId ?? "",
      purchaseCost: a.purchaseCost != null ? Number(a.purchaseCost) : null,
      salePrice: a.currentBookValue != null ? Number(a.currentBookValue) : null,
      notes: a.notes ?? "",
    };
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveEditing = async () => {
    const purchaseCost = editPurchaseCost.trim()
      ? parseFloat(editPurchaseCost)
      : undefined;
    if (purchaseCost !== undefined && isNaN(purchaseCost)) return;
    const salePrice = editSalePrice.trim()
      ? parseFloat(editSalePrice)
      : undefined;
    if (salePrice !== undefined && isNaN(salePrice)) return;

    // Зөвхөн "Зарах үнэ" өөрчлөгдвөл автоматаар "FOR_SALE" төлөвт шилжүүлнэ.
    const base = editBaselineRef.current;
    const basePurchase = base?.purchaseCost ?? null;
    const baseSale = base?.salePrice ?? null;
    const nextPurchase = purchaseCost ?? null;
    const nextSale = salePrice ?? null;
    const changed = {
      assetTag: (editAssetTag ?? "").trim() !== (base?.assetTag ?? "").trim(),
      serialNumber:
        (editSerialNumber ?? "").trim() !== (base?.serialNumber ?? "").trim(),
      status: (editStatus ?? "") !== (base?.status ?? ""),
      mainCategory:
        (editMainCategory ?? "").trim() !== (base?.mainCategory ?? "").trim(),
      subCategory:
        (editSubCategory ?? "").trim() !== (base?.subCategory ?? "").trim(),
      locationId: (editLocationId ?? "") !== (base?.locationId ?? ""),
      purchaseCost: nextPurchase !== basePurchase,
      salePrice: nextSale !== baseSale,
      notes: (editNotes ?? "").trim() !== (base?.notes ?? "").trim(),
    };
    const onlySalePriceChanged =
      changed.salePrice &&
      !changed.assetTag &&
      !changed.serialNumber &&
      !changed.status &&
      !changed.mainCategory &&
      !changed.subCategory &&
      !changed.locationId &&
      !changed.purchaseCost &&
      !changed.notes;
    const statusForSave =
      onlySalePriceChanged && nextSale != null ? "FOR_SALE" : editStatus;

    setSaving(true);
    try {
      await updateAssetMutation({
        variables: {
          id: assetId,
          input: {
            assetTag: editAssetTag.trim() || undefined,
            serialNumber: editSerialNumber.trim() || undefined,
            status: statusForSave || undefined,
            purchaseCost,
            currentBookValue: salePrice,
            mainCategory: editMainCategory.trim() || undefined,
            category: editSubCategory.trim() || undefined,
            locationId: editLocationId || undefined,
            notes: editNotes.trim() || undefined,
          },
        },
      });
      await refetch();
      setIsEditing(false);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  const actorNameById = useMemo(() => {
    const map = new Map<string, string>();
    const employees = (employeesData?.employees ?? []) as Array<{
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    }>;
    employees.forEach((e) => {
      const name =
        [e.firstName, e.lastName].filter(Boolean).join(" ") || e.email || e.id;
      map.set(e.id, name);
    });
    return map;
  }, [employeesData?.employees]);

  if (!assetId) {
    return (
      <div className={className}>
        <p className="text-muted-foreground">Хөрөнгийн ID олдсонгүй.</p>
      </div>
    );
  }

  if (assetLoading) {
    return (
      <div className={className}>
        <p className="text-muted-foreground">Ачаалж байна...</p>
      </div>
    );
  }

  if (!a) {
    return (
      <div className={className}>
        <p className="text-destructive">Хөрөнгө олдсонгүй.</p>
      </div>
    );
  }

  const rightFields = (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Нэр</Label>
        <div className="relative">
          <Input
            value={isEditing ? editAssetTag : a.assetTag ?? ""}
            onChange={(e) => setEditAssetTag(e.target.value)}
            disabled={!isEditing}
            className="pr-9"
            placeholder="Нэр"
          />
          {isEditing && editAssetTag ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setEditAssetTag("")}
              aria-label="Clear name"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Серийн дугаар</Label>
        <div className="relative">
          <Input
            value={isEditing ? editSerialNumber : a.serialNumber ?? ""}
            onChange={(e) => setEditSerialNumber(e.target.value)}
            disabled={!isEditing}
            className="pr-9"
            placeholder="Серийн дугаар"
          />
          {isEditing && editSerialNumber ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setEditSerialNumber("")}
              aria-label="Clear serial number"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Төлөв</Label>
        <Select
          value={isEditing ? editStatus : a.status ?? ""}
          onValueChange={setEditStatus}
          disabled={!isEditing}
        >
          <SelectTrigger>
            <SelectValue placeholder="Төлөв" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Байршил</Label>
        {isEditing ? (
          <Select value={editLocationId} onValueChange={setEditLocationId}>
            <SelectTrigger>
              <SelectValue placeholder="Байршил" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input value={locationDisplay} disabled />
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Ангилал</Label>
        {isEditing ? (
          <Select
            value={editMainCategory}
            onValueChange={(v) => {
              setEditMainCategory(v);
              // main солигдоход sub-г цэвэрлэж/эхний утга онооно
              const nextSubs = categoryTree.subsByMain.get(v) ?? [];
              setEditSubCategory(nextSubs[0] ?? "");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Ангилал" />
            </SelectTrigger>
            <SelectContent>
              {categoryTree.mains.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input value={editMainCategory || "—"} disabled />
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Дэд ангилал</Label>
        {isEditing ? (
          <Select value={editSubCategory} onValueChange={setEditSubCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Дэд ангилал" />
            </SelectTrigger>
            <SelectContent>
              {subCategoryOptions.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input value={a.category ?? "—"} disabled />
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Худалдаж авсан үнэ</Label>
        {isEditing ? (
          <Input
            type="number"
            value={editPurchaseCost}
            onChange={(e) => setEditPurchaseCost(e.target.value)}
            placeholder="0"
          />
        ) : (
          <div className="font-semibold text-foreground">{purchasePrice}</div>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Зарах үнэ</Label>
        <div className="relative w-[220px]">
          <Input
            type="number"
            value={isEditing ? editSalePrice : (a.currentBookValue != null ? String(a.currentBookValue) : "")}
            onChange={(e) => setEditSalePrice(e.target.value)}
            disabled={!isEditing}
            className="pr-9"
            placeholder="—"
          />
          {isEditing && editSalePrice ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setEditSalePrice("")}
              aria-label="Clear sale price"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="col-span-2 space-y-1.5">
        <Label className="text-muted-foreground">Тэмдэглэл</Label>
        <div className="relative">
          <Input
            value={isEditing ? editNotes : a.notes ?? ""}
            onChange={(e) => setEditNotes(e.target.value)}
            disabled={!isEditing}
            className="pr-9"
            placeholder="Төлбөрийн нөхцлөө оруулна уу"
          />
          {isEditing && editNotes ? (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setEditNotes("")}
              aria-label="Clear notes"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      <Tabs defaultValue="details" className="w-full">
        <TabsList variant="line" className="w-full justify-start border-b rounded-none h-auto p-0 gap-0 bg-transparent">
          <TabsTrigger value="details" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
            <Package className="h-4 w-4" />
            Хөрөнгийн дэлгэрэнгүй
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
            <Clock className="h-4 w-4" />
            Хөрөнгийн түүх
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              {a.imageUrl ? (
                <div className="relative w-full md:w-[260px] h-[160px] rounded-xl overflow-hidden border bg-muted flex items-center justify-center">
                  <img
                    src={a.imageUrl}
                    alt={a.assetTag ?? ""}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full md:w-[260px] h-[160px] rounded-xl border bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Зураг байхгүй
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-end mb-4">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelEditing}
                      disabled={saving}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Цуцлах
                    </Button>
                    <Button
                      size="sm"
                      onClick={saveEditing}
                      disabled={saving}
                      className="gap-2"
                    >
                      <Pencil className="h-4 w-4" />
                      {saving ? "Хадгалж байна..." : "Хадгалах"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={startEditing}
                  >
                    <Pencil className="h-4 w-4" />
                    Засварлах
                  </Button>
                )}
              </div>
              {rightFields}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Түүх (хэн бүртгэсэн, олгосон, шилжүүлсэн)</CardTitle>
            </CardHeader>
            <CardContent>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">Түүх олдсонгүй.</p>
            ) : (
              <ul className="space-y-3">
                {history.map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm border-b pb-2 last:border-0"
                  >
                    <span className="font-medium text-muted-foreground shrink-0">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                    <span className="font-medium">
                      {AUDIT_ACTION_LABELS[event.eventType] ?? event.eventType}
                    </span>
                    <span>{event.description}</span>
                    {event.actor && (
                      <span className="text-muted-foreground">
                        —{" "}
                        {[
                          (event.actor as { firstName?: string; lastName?: string }).firstName,
                          (event.actor as { firstName?: string; lastName?: string }).lastName,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit log (үйлдлийн бүртгэл)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Хэн ямар үйлдэл хийсэн, өмнөх/шинэ утга. Бүртгэл, хэн рүү шилжүүлсэн, устгах хүсэлт, IT/санхүүгийн баталгаа зэрэг бүгд энд харагдана.
            </p>
          </CardHeader>
          <CardContent>
            {auditLogs.length === 0 ? (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Энэ хөрөнгийн үйлдлийн бүртгэл одоогоор хоосон.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Огноо</TableHead>
                    <TableHead>Үйлдэл</TableHead>
                    <TableHead>Хэн</TableHead>
                    <TableHead>Өмнөх</TableHead>
                    <TableHead>Шинэ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {AUDIT_ACTION_LABELS[log.action] ?? log.action}
                      </TableCell>
                      <TableCell className="text-sm">
                        {actorNameById.get(log.actorId) ?? log.actorId}
                      </TableCell>
                      <TableCell
                        className="text-xs max-w-45 truncate"
                        title={log.oldValueJson ?? undefined}
                      >
                        {log.oldValueJson ?? "—"}
                      </TableCell>
                      <TableCell
                        className="text-xs max-w-45 truncate"
                        title={log.newValueJson ?? undefined}
                      >
                        {log.newValueJson ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
