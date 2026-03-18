"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useMemo, useState, useEffect } from "react";
import type { AssetFieldsFragment } from "@/gql/graphql";
import {
  GetAssetDocument,
  GetAssetHistoryDocument,
  GetAssetKpisDocument,
  GetAssetsDocument,
  UpdateAssetDocument,
  DeleteAssetDocument,
  GetLocationsDocument,
} from "@/gql/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import {
  Box,
  Pencil,
  X,
  History,
  Check,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { CATEGORY_LABELS, SUB_CATEGORIES_BY_MAIN } from "./constants";

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Эзэмшигчтэй",
  AVAILABLE: "Эзэмшигчгүй",
  FOR_SALE: "Зарж болох",
  DAMAGED: "Эвдрэлтэй",
};

const HISTORY_EVENT_LABELS: Record<string, string> = {
  ASSIGNED: "Олгосон",
  RETURNED: "Буцаасан",
  TRANSFERRED: "Шилжүүлсэн",
  CREATED: "Бүртгэсэн",
  PURCHASED: "Худалдан авсан",
  REGISTERED: "Бүртгэсэн",
  UPDATED: "Шинэчлэгдсэн",
  ASSET_UPDATED: "Шинэчлэгдсэн",
};

const STATUS_BADGE_CLASSES: Record<string, string> = {
  ASSIGNED: "border-blue-100 bg-blue-50/60 text-blue-600",
  AVAILABLE: "border-green-100 bg-green-50/60 text-green-600",
  FOR_SALE: "border-yellow-100 bg-yellow-50/60 text-yellow-700",
  DAMAGED: "border-red-100 bg-red-50/60 text-red-600",
};

const STATUS_DOT_CLASSES: Record<string, string> = {
  ASSIGNED: "bg-blue-500",
  AVAILABLE: "bg-green-500",
  FOR_SALE: "bg-yellow-500",
  DAMAGED: "bg-red-500",
};

const MAIN_CATEGORY_BY_SUB: Record<string, string> = Object.entries(
  SUB_CATEGORIES_BY_MAIN,
).reduce(
  (acc, [main, subs]) => {
    subs.forEach((sub) => {
      acc[sub] = main;
    });
    return acc;
  },
  {} as Record<string, string>,
);

export function AssetDetailContent({
  assetId,
  onClose,
}: {
  assetId: string;
  onClose?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [hasInitializedEdit, setHasInitializedEdit] = useState(false);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(
    null,
  );
  const [editData, setEditData] = useState({
    assetTag: "",
    serialNumber: "",
    status: "",
    locationId: "",
    salePrice: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [optimisticBookValue, setOptimisticBookValue] = useState<
    number | null
  >(null);

  const { data, loading, refetch } = useQuery(GetAssetDocument, {
    variables: { id: assetId },
    skip: !assetId,
    fetchPolicy: "cache-and-network",
  });
  const { data: historyData } = useQuery(GetAssetHistoryDocument, {
    variables: { assetId },
    skip: !assetId,
  });
  const { data: locationsData } = useQuery(GetLocationsDocument);
  const client = useApolloClient();
  const [updateAsset] = useMutation(UpdateAssetDocument, {
    refetchQueries: [
      { query: GetAssetDocument, variables: { id: assetId } },
      { query: GetAssetKpisDocument },
      { query: GetAssetsDocument },
    ],
    awaitRefetchQueries: true,
  });
  const [deleteAsset, { loading: deleting }] = useMutation(
    DeleteAssetDocument,
    {
      refetchQueries: [
        { query: GetAssetKpisDocument },
        { query: GetAssetsDocument },
      ],
      awaitRefetchQueries: true,
    },
  );

  const asset = data?.asset as
    | (AssetFieldsFragment & { locationPath?: string })
    | undefined;

  const locationOptions = useMemo(() => {
    return (locationsData?.locations ?? []).map((loc: any) => ({
      id: loc.id.toString(),
      name: loc.name,
    }));
  }, [locationsData]);

  const handleEditToggle = () => {
    if (!asset) return;
    const bookValue =
      optimisticBookValue ?? asset.currentBookValue ?? undefined;
    setEditData({
      assetTag: asset.assetTag ?? "",
      serialNumber: asset.serialNumber ?? "",
      status: asset.status ?? "AVAILABLE",
      locationId: asset.locationId ?? "",
      salePrice: bookValue?.toString() ?? "",
      notes: asset.notes ?? "",
    });
    setIsEditing(true);
  };

  useEffect(() => {
    setHasInitializedEdit(false);
    setIsEditing(false);
    setOptimisticBookValue(null);
  }, [assetId]);

  useEffect(() => {
    if (!asset || hasInitializedEdit) return;
    setEditData({
      assetTag: asset.assetTag ?? "",
      serialNumber: asset.serialNumber ?? "",
      status: asset.status ?? "AVAILABLE",
      locationId: asset.locationId ?? "",
      salePrice: asset.currentBookValue?.toString() ?? "",
      notes: asset.notes ?? "",
    });
    setHasInitializedEdit(true);
  }, [asset, hasInitializedEdit]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAsset({
        variables: {
          id: assetId,
          input: {
            assetTag: editData.assetTag,
            serialNumber: editData.serialNumber,
            status: editData.status,
            locationId: editData.locationId,
            currentBookValue: parseFloat(editData.salePrice) || 0,
            notes: editData.notes,
          },
        },
      });
      const savedBookValue = parseFloat(editData.salePrice) || 0;
      setOptimisticBookValue(savedBookValue);
      await refetch();
      await client.refetchQueries({
        include: [GetAssetsDocument, GetAssetKpisDocument],
      });
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Энэ хөрөнгийг устгах уу? Энэ үйлдлийг буцааж болохгүй.",
      )
    )
      return;
    try {
      const result = await deleteAsset({ variables: { id: assetId } });
      if (result.data?.deleteAsset) {
        onClose?.();
      } else {
        window.alert(
          "Хөрөнгийг устгаж чадсангүй. Хөрөнгө одоогоор эзэмшигчтэй эсвэл холбоотой үйлдэлтэй байж болно.",
        );
      }
    } catch (e) {
      console.error("Failed to delete asset:", e);
      window.alert("Хөрөнгийг устгахад алдаа гарлаа.");
    }
  };

  if (loading)
    return <div className="p-10 text-center text-gray-400">Уншиж байна...</div>;
  if (!asset) return null;

  const categoryKey = asset.category ?? "";
  const subCategoryLabel =
    (CATEGORY_LABELS as Record<string, string>)[categoryKey] ||
    categoryKey ||
    "—";
  const mainCategoryLabel = MAIN_CATEGORY_BY_SUB[categoryKey] || "—";

  return (
    <div className="bg-white rounded-[24px] max-w-4xl w-full mx-auto shadow-xl border border-gray-100 overflow-hidden">
      <Tabs defaultValue="details" className="w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 pt-[20px] border-b border-gray-100">
          <TabsList className="bg-transparent h-12 p-0 gap-5">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black text-gray-400 font-semibold h-full px-1 gap-2 transition-all bg-transparent shadow-none text-[13px]"
            >
              <Box className="h-4 w-4" /> Хөрөнгийн дэлгэрэнгүй
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black text-gray-400 font-semibold h-full px-1 gap-2 transition-all bg-transparent shadow-none text-[13px]"
            >
              <History className="h-4 w-4" /> Хөрөнгийн түүх
            </TabsTrigger>
          </TabsList>

          {/* Buttons: Close + Устгах + Edit/Save */}
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-gray-300 hover:text-black hover:bg-transparent transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg text-[12px] h-8 gap-2 font-medium px-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {deleting ? "..." : "Устгах"}
              </Button>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditToggle}
                  className="rounded-lg border-gray-200 text-[12px] h-8 gap-2 font-medium px-3 hover:bg-gray-50 transition-colors"
                >
                  Засварлах <Pencil className="h-3.5 w-3.5" />
                </Button>
              ) : (
              <>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="h-8 text-[12px]"
                >
                  Цуцлах
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg h-8 px-4 gap-1.5 font-semibold text-[12px]"
                >
                  {saving ? "..." : "Хадгалах"}{" "}
                  <Check className="h-3.5 w-3.5" />
                </Button>
              </div>
              </>
              )}
            </div>
          </div>
        </div>

        {/* Details Content */}
        <TabsContent value="details" className="p-8 m-0">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="w-44 h-44 shrink-0 rounded-[22px] border border-gray-200 bg-white p-4 flex items-center justify-center shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
              {asset.imageUrl ? (
                <img
                  src={asset.imageUrl}
                  className="max-h-full object-contain"
                  alt="Asset"
                />
              ) : (
                <Box className="h-12 w-12 text-gray-200" />
              )}
            </div>

            {/* Fields Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Нэр
                </Label>
                {isEditing ? (
                  <div className="relative group">
                    <Input
                      value={editData.assetTag}
                      onChange={(e) =>
                        setEditData({ ...editData, assetTag: e.target.value })
                      }
                      className="h-9 text-[14px] pr-8 focus:ring-1 focus:ring-black"
                    />
                    <X
                      className="absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer"
                      onClick={() => setEditData({ ...editData, assetTag: "" })}
                    />
                  </div>
                ) : (
                  <div className="text-[15px] font-semibold text-gray-900">
                    {asset.assetTag || "—"}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Серийн дугаар
                </Label>
                {isEditing ? (
                  <div className="relative">
                    <Input
                      value={editData.serialNumber}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          serialNumber: e.target.value,
                        })
                      }
                      className="h-9 text-[14px] pr-8 focus:ring-1 focus:ring-black"
                    />
                    <X
                      className="absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer"
                      onClick={() =>
                        setEditData({ ...editData, serialNumber: "" })
                      }
                    />
                  </div>
                ) : (
                  <div className="text-[15px] font-semibold text-gray-900">
                    {asset.serialNumber || "—"}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Төлөв
                </Label>
                {isEditing ? (
                  <Select
                    value={editData.status}
                    onValueChange={(v) =>
                      setEditData({ ...editData, status: v })
                    }
                  >
                    <SelectTrigger
                      className={`h-9 text-[14px] font-medium focus:ring-1 focus:ring-black ${
                        STATUS_BADGE_CLASSES[editData.status] ??
                        "border-gray-100 bg-white text-gray-800"
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_LABELS).map(([k, v]) => (
                        <SelectItem key={k} value={k}>
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                STATUS_DOT_CLASSES[k] ?? "bg-gray-400"
                              }`}
                            />
                            {v}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="pt-0.5">
                    <Badge
                      variant="outline"
                      className={`rounded-lg px-3 py-0.5 font-semibold text-[11px] ${
                        STATUS_BADGE_CLASSES[asset.status ?? ""] ??
                        "border-gray-100 bg-gray-50 text-gray-500"
                      }`}
                    >
                      {STATUS_LABELS[asset.status ?? ""] || asset.status}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Байршил
                </Label>
                {isEditing ? (
                  <Select
                    value={editData.locationId}
                    onValueChange={(v) =>
                      setEditData({ ...editData, locationId: v })
                    }
                  >
                    <SelectTrigger className="h-9 text-[14px] focus:ring-1 focus:ring-black">
                      <SelectValue placeholder="Сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-[14px] font-medium text-gray-800 leading-tight">
                    {asset.locationPath || "—"}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Ангилал
                </Label>
                <div className="text-[14px] font-medium text-gray-800 leading-tight">
                  {mainCategoryLabel}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Дэд ангилал
                </Label>
                <div className="text-[14px] font-medium text-gray-800 leading-tight">
                  {subCategoryLabel}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Худалдаж авсан үнэ
                </Label>
                <div className="text-[16px] font-semibold text-gray-900">
                  {asset.purchaseCost
                    ? Number(asset.purchaseCost).toLocaleString() + "₮"
                    : "—"}
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Зарах үнэ
                </Label>
                {isEditing ? (
                  <div className="relative">
                    <Input
                      value={editData.salePrice}
                      onChange={(e) =>
                        setEditData({ ...editData, salePrice: e.target.value })
                      }
                      className="h-9 text-[14px] font-semibold pr-8 focus:ring-1 focus:ring-black"
                    />
                    <X
                      className="absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer"
                      onClick={() =>
                        setEditData({ ...editData, salePrice: "" })
                      }
                    />
                  </div>
                ) : (
                  <div className="text-[16px] font-semibold text-gray-900">
                    {(optimisticBookValue ??
                      asset.currentBookValue ??
                      null) != null
                      ? Number(
                          optimisticBookValue ?? asset.currentBookValue,
                        ).toLocaleString() + "₮"
                      : "—"}
                  </div>
                )}
              </div>

              <div className="space-y-1 pt-1 md:col-start-2">
                <Label className="text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center">
                  Тэмдэглэл
                </Label>
                {isEditing ? (
                  <div className="relative">
                    <Input
                      value={editData.notes}
                      onChange={(e) =>
                        setEditData({ ...editData, notes: e.target.value })
                      }
                      className="h-9 text-[14px] pr-8 italic text-gray-500 focus:ring-1 focus:ring-black"
                    />
                    <X
                      className="absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer"
                      onClick={() => setEditData({ ...editData, notes: "" })}
                    />
                  </div>
                ) : (
                  <div className="text-[13px] text-gray-500 italic leading-relaxed">
                    {asset.notes || "Demo asset"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* History Content */}
        <TabsContent
          value="history"
          className="m-0 border-t border-gray-50 max-h-[420px] overflow-y-auto bg-white"
        >
          <div className="p-6 space-y-4">
            {historyData?.assetHistory?.length ? (
              historyData.assetHistory.map((h: any) => {
                const actorName = h.actor
                  ? `${h.actor.lastName?.[0] ?? ""}.${h.actor.firstName ?? ""}`
                  : "—";
                const eventLabel =
                  HISTORY_EVENT_LABELS[h.eventType] ?? h.eventType ?? "—";
                const when = new Date(h.timestamp);
                const formatted = `${when.toLocaleDateString()} ${when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
                const isOpen = expandedHistoryId === h.id;
                return (
                  <div
                    key={h.id}
                    className="border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between"
                  >
                    <div className="text-[16px] font-semibold text-gray-900">
                      {eventLabel}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center text-[11px] text-gray-500">
                          {h.actor?.imageUrl ? (
                            <img
                              src={h.actor.imageUrl}
                              alt={actorName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            actorName.slice(0, 1)
                          )}
                        </div>
                        <div className="leading-tight">
                          <div className="text-[15px] font-semibold text-gray-900">
                            {actorName}
                          </div>
                          <div className="text-[13px] text-gray-500">
                            {formatted}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedHistoryId(isOpen ? null : h.id)
                        }
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50"
                        aria-label="Дэлгэрэнгүй"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-32 flex items-center justify-center text-gray-300 italic text-[13px]">
                Түүх олдсонгүй.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}