"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GetAssetsDocument,
  GetLocationsDocument,
  CategoriesDocument,
  DeleteAssetDocument,
  AssetFieldsFragment,
  AssetFieldsFragmentDoc,
} from "@/gql/graphql";
import type { Asset, AssetCategory } from "@/lib/types";
import { AssetFormDialog } from "./asset-form-dialog";
import { CATEGORY_LABELS } from "./constants";
import { useFragment } from "@/gql/fragment-masking";

type LocationFromApi = {
  id: string;
  name: string;
  parentId?: string | null;
  type: string;
};
const LOCATION_TYPES = ["branch", "roomType", "section", "room"] as const;
function getLeafIdsUnder(
  locId: string,
  locations: LocationFromApi[],
  childrenByParent: Map<string | null, LocationFromApi[]>,
): string[] {
  const loc = locations.find((l) => l.id === locId);
  if (!loc) return [];
  if (loc.type === "room") return [locId];
  const children = childrenByParent.get(locId) ?? [];
  return children.flatMap((c) =>
    getLeafIdsUnder(c.id, locations, childrenByParent),
  );
}

export function AssetsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [assetItems, setAssetItems] = useState<Asset[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editAsset, setEditAsset] = useState<Asset | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [qrAssets, setQrAssets] = useState<Asset[]>([]);

  const [filterState, setFilterState] = useState<Record<string, Set<string>>>({
    locationIds: new Set(),
    category: new Set(),
    subCategory: new Set(),
  });
  const locationsFromApi = (useQuery(GetLocationsDocument).data?.locations ??
    []) as unknown as LocationFromApi[];
  const locationTree = useMemo(() => {
    const list = locationsFromApi;
    const byParent = new Map<string | null, LocationFromApi[]>();
    list.forEach((loc) => {
      const key = loc.parentId ?? null;
      if (!byParent.has(key)) byParent.set(key, []);
      byParent.get(key)!.push(loc);
    });
    LOCATION_TYPES.forEach((t) =>
      byParent.get(t)?.sort((a, b) => a.name.localeCompare(b.name)),
    );
    return { list, byParent };
  }, [locationsFromApi]);
  const resolvedLocationIdsForApi = useMemo(() => {
    const selected = filterState.locationIds;
    if (selected.size === 0) return undefined;
    const leafIds = new Set<string>();
    selected.forEach((id) =>
      getLeafIdsUnder(id, locationTree.list, locationTree.byParent).forEach(
        (lid) => leafIds.add(lid),
      ),
    );
    return Array.from(leafIds);
  }, [filterState.locationIds, locationTree]);
  const { data, loading, error, refetch } = useQuery(GetAssetsDocument, {
    variables: {
      office: undefined,
      categoryIds:
        filterState.category.size > 0
          ? Array.from(filterState.category)
          : undefined,
      subCategoryIds:
        filterState.subCategory.size > 0
          ? Array.from(filterState.subCategory)
          : undefined,
      locationIds: resolvedLocationIdsForApi,
    },
  });
  const { data: categoriesData } = useQuery(CategoriesDocument);
  const [deleteAssetMutation] = useMutation(DeleteAssetDocument);

  const categoryEntries = Object.entries(CATEGORY_LABELS) as Array<
    [AssetCategory, string]
  >;

  const mapGraphqlAssetToLocal = (asset: AssetFieldsFragment): Asset => ({
    imageUrl:
      asset.imageUrl ??
      process.env.NEXT_PUBLIC_ASSET_FALLBACK_IMAGE_URL ??
      undefined,
    id: asset.id,
    assetId: asset.assetTag,
    category: asset.category as AssetCategory,
    mainCategory: undefined,
    location:
      (asset as { locationPath?: string | null }).locationPath ??
      asset.locationId ??
      undefined,
    serialNumber: asset.serialNumber,
    purchaseCost: asset.purchaseCost ?? 0,
    residualValue: 0,
    usefulLife: 0,
    purchaseDate: asset.purchaseDate
      ? new Date(asset.purchaseDate).toISOString()
      : new Date().toISOString(),
    currentBookValue: asset.currentBookValue ?? asset.purchaseCost ?? 0,
    status: asset.status as Asset["status"],
    assignedEmployeeId: asset.assignedTo ?? undefined,
    assignedEmployeeName: undefined,
    createdAt: new Date(asset.createdAt).toISOString(),
    updatedAt: new Date(asset.updatedAt).toISOString(),
  });

  const processedAssets = useMemo(() => {
    if (!data?.assets) return [];

    return data.assets.map((a) => {
      // This "unmasks" the fragment and provides the full object with id, serialNumber, etc.
      const unmaskedAsset = useFragment(AssetFieldsFragmentDoc, a);
      return mapGraphqlAssetToLocal(unmaskedAsset);
    });
  }, [data]);

  const remoteAssets = useMemo(() => {
    if (!data?.assets) return [];

    return data.assets.map((a) => {
      const unmaskedAsset = useFragment(AssetFieldsFragmentDoc, a);
      return mapGraphqlAssetToLocal(unmaskedAsset);
    });
  }, [data?.assets]);
  const mergedAssets = useMemo(() => {
    if (assetItems.length === 0) return remoteAssets;
    const seen = new Set(remoteAssets.map((asset) => asset.id));
    const merged = [...remoteAssets];
    assetItems.forEach((asset) => {
      if (!seen.has(asset.id)) {
        merged.push(asset);
      }
    });
    return merged;
  }, [assetItems, remoteAssets]);

  const filteredAssets = mergedAssets.filter((asset) => {
    const matchesSearch =
      asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assignedEmployeeName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || asset.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || asset.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(filteredAssets.map((asset) => asset.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const selectFirstFour = () => {
    setSelectedIds(
      new Set(filteredAssets.slice(0, 4).map((asset) => asset.id)),
    );
  };

  const getQrUrl = (assetId: string) => {
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://example.com";
    const data = encodeURIComponent(`${base}/assets/${assetId}`);
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${data}`;
  };

  const openQrDialog = (assets: Asset[]) => {
    setQrAssets(assets);
  };

  const openSelectedQr = () => {
    const selected = mergedAssets.filter((asset) => selectedIds.has(asset.id));
    if (selected.length === 0) return;
    openQrDialog(selected);
  };

  const printQrSheet = (assets: Asset[]) => {
    const rows = assets
      .map((asset) => {
        const qrUrl = getQrUrl(asset.id);
        return `
          <div class="item">
            <img src="${qrUrl}" width="200" height="200" alt="QR" />
            <div class="meta">
              <div><span class="label">Asset ID:</span> ${asset.assetId}</div>
              <div><span class="label">Category:</span> ${CATEGORY_LABELS[asset.category]}</div>
              <div><span class="label">Serial:</span> ${asset.serialNumber}</div>
              <div><span class="label">Location:</span> ${asset.location ?? "—"}</div>
            </div>
          </div>`;
      })
      .join("");
    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Asset QR</title>
          <style>
            @page { size: A4; margin: 12mm; }
            body { font-family: Arial, sans-serif; margin: 0; }
            .page { width: 210mm; min-height: 297mm; padding: 12mm; box-sizing: border-box; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10mm; }
            .item { border: 1px solid #ddd; border-radius: 6mm; padding: 6mm; display: flex; gap: 6mm; align-items: center; }
            .meta { font-size: 11pt; line-height: 1.5; }
            .label { color: #555; font-size: 9pt; }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="grid">${rows}</div>
          </div>
        </body>
      </html>`;

    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  };

  const toggleFilter = (
    group: "locationIds" | "category" | "subCategory",
    value: string,
  ) => {
    setFilterState((prev) => {
      const next = { ...prev, [group]: new Set(prev[group]) };
      if (next[group].has(value)) {
        next[group].delete(value);
      } else {
        next[group].add(value);
      }
      return next;
    });
  };

  const removeFilterTag = (
    group: "locationIds" | "category" | "subCategory",
    value: string,
  ) => {
    setFilterState((prev) => {
      const next = { ...prev, [group]: new Set(prev[group]) };
      next[group].delete(value);
      return next;
    });
  };

  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    (categoriesData?.categories ?? []).forEach((category) => {
      map.set(category.id, category.name);
      category.subcategories?.forEach((sub) => map.set(sub.id, sub.name));
    });
    return map;
  }, [categoriesData?.categories]);

  const locationNameById = useMemo(() => {
    const map = new Map<string, string>();
    locationTree.list.forEach((loc) => map.set(loc.id, loc.name));
    return map;
  }, [locationTree.list]);

  const locationStepOptions = useMemo(() => {
    const { list } = locationTree;
    const roots = (locationTree.byParent.get(null) ?? [])
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const selectedIds = filterState.locationIds;
    const step2 = list
      .filter(
        (l) =>
          l.type === "roomType" &&
          (selectedIds.size === 0 ||
            (l.parentId && selectedIds.has(l.parentId))),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    const step3 = list
      .filter(
        (l) =>
          l.type === "section" &&
          (selectedIds.size === 0 ||
            (l.parentId && selectedIds.has(l.parentId))),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    const step4 = list
      .filter(
        (l) =>
          l.type === "room" &&
          (selectedIds.size === 0 ||
            (l.parentId && selectedIds.has(l.parentId))),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    return [
      { label: "Салбар", options: roots },
      { label: "Төрөл", options: step2 },
      { label: "Хэсэг", options: step3 },
      { label: "Өрөө", options: step4 },
    ];
  }, [locationTree, filterState.locationIds]);

  const activeTags = [
    ...Array.from(filterState.locationIds).map((value) => ({
      group: "locationIds" as const,
      value,
      label: `Байршил: ${locationNameById.get(value) ?? value}`,
    })),
    ...Array.from(filterState.category).map((value) => ({
      group: "category" as const,
      value,
      label: `Ангилал: ${categoryNameById.get(value) ?? value}`,
    })),
    ...Array.from(filterState.subCategory).map((value) => ({
      group: "subCategory" as const,
      value,
      label: `Дэд ангилал: ${categoryNameById.get(value) ?? value}`,
    })),
  ];

  return (
    <div className="flex gap-6 p-6">
      <aside className="hidden w-64 shrink-0 rounded-3xl border border-border bg-card p-5 shadow-sm lg:block">
        <h2 className="text-lg font-semibold text-foreground">Шүүлтүүр</h2>
        <div className="mt-4 space-y-6">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Байршил (4 алхам)
            </p>
            {locationStepOptions.map((step, idx) => (
              <div key={idx} className="mt-3">
                <p className="text-xs font-medium text-muted-foreground">
                  {step.label}
                </p>
                <div className="mt-1.5 space-y-1.5 max-h-32 overflow-y-auto">
                  {step.options.map((loc) => (
                    <label
                      key={loc.id}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <input
                        type="checkbox"
                        checked={filterState.locationIds.has(loc.id)}
                        onChange={() => toggleFilter("locationIds", loc.id)}
                      />
                      {loc.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Ангилал</p>
            <div className="mt-2 space-y-4">
              {(categoriesData?.categories ?? []).map((category) => (
                <div key={category.id}>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={filterState.category.has(category.id)}
                      onChange={() => toggleFilter("category", category.id)}
                    />
                    {category.name}
                  </label>
                  {category.subcategories?.length ? (
                    <div className="mt-2 space-y-2 pl-6">
                      {category.subcategories.map((sub) => (
                        <label
                          key={sub.id}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <input
                            type="checkbox"
                            checked={filterState.subCategory.has(sub.id)}
                            onChange={() => toggleFilter("subCategory", sub.id)}
                          />
                          {sub.name}
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0 flex-1 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Эд хөрөнгийн бүртгэл
            </h1>
            <p className="text-muted-foreground">
              Компанийн бүх эд хөрөнгийг удирдаж, хянах
            </p>
          </div>
          <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4" />
            Шинэ хөрөнгө нэмэх
          </Button>
        </div>

        <AssetFormDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddAssets={(assets) =>
            setAssetItems((prev) => [...assets, ...prev])
          }
        />
        <AssetFormDialog
          open={!!editAsset}
          onOpenChange={(open) => {
            if (!open) setEditAsset(null);
          }}
          onAddAssets={() => {}}
          onUpdateAsset={(asset) => {
            setAssetItems((prev) =>
              prev.map((item) => (item.id === asset.id ? asset : item)),
            );
            refetch();
          }}
          mode="edit"
          initialAsset={editAsset}
        />
        <Dialog open={qrAssets.length > 0} onOpenChange={() => setQrAssets([])}>
          <DialogContent className="bg-white sm:max-w-[840px] rounded-3xl p-8 shadow-xl">
            <DialogHeader>
              <DialogTitle>QR код</DialogTitle>
            </DialogHeader>
            {qrAssets.length > 0 && (
              <div className="mx-auto w-full max-w-[720px] rounded-3xl border border-border bg-white p-6">
                <div className="mx-auto aspect-[1/1.414] w-full max-w-[680px] rounded-3xl border border-dashed border-border p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {qrAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex items-center gap-4 rounded-2xl border border-border p-3"
                      >
                        <img
                          src={getQrUrl(asset.id)}
                          alt="QR"
                          className="h-24 w-24"
                        />
                        <div className="text-xs text-muted-foreground">
                          <div className="text-sm font-semibold text-foreground">
                            {asset.assetId}
                          </div>
                          <div>{CATEGORY_LABELS[asset.category]}</div>
                          <div>{asset.serialNumber}</div>
                          <div>{asset.location || "—"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  A4 загвар (210мм × 297мм)
                </p>
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  qrAssets.length ? printQrSheet(qrAssets) : null
                }
              >
                Print
              </Button>
              <Button
                onClick={() =>
                  qrAssets.length ? printQrSheet(qrAssets) : null
                }
              >
                Save PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Эд хөрөнгийн ID, серийн дугаар эсвэл ажилтнаар хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary border-0"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] bg-secondary border-0">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Төлөв" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Бүх төлөв</SelectItem>
                    <SelectItem value="AVAILABLE">Бэлэн</SelectItem>
                    <SelectItem value="ASSIGNED">Хуваарилсан</SelectItem>
                    <SelectItem value="IN_REPAIR">Засварт</SelectItem>
                    <SelectItem value="PENDING_DISPOSAL">
                      Устгал хүлээж буй
                    </SelectItem>
                    <SelectItem value="DISPOSED">Устсан</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[160px] bg-secondary border-0">
                    <SelectValue placeholder="Ангилал" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Бүх ангилал</SelectItem>
                    {categoryEntries.map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Эд хөрөнгө ({filteredAssets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeTags.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Идэвхтэй шүүлт:
                </span>
                {activeTags.map((tag) => (
                  <span
                    key={`${tag.group}-${tag.value}`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/20"
                  >
                    {tag.label}
                    <button
                      type="button"
                      onClick={() => removeFilterTag(tag.group, tag.value)}
                      className="ml-0.5 rounded p-0.5 hover:bg-primary/20 hover:text-primary"
                      aria-label="Шүүлтийг арилгах"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select all
              </Button>
              <Button variant="outline" size="sm" onClick={selectFirstFour}>
                Select 4
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openSelectedQr}
                disabled={selectedIds.size === 0}
              >
                QR Selected
              </Button>
              <span className="text-xs text-muted-foreground">
                Selected: {selectedIds.size}
              </span>
            </div>
            {loading && (
              <div className="py-8 text-center text-muted-foreground">
                Ачаалж байна...
              </div>
            )}
            {error && (
              <div className="py-8 text-center text-destructive">
                {error.message}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="overflow-hidden border-border">
                  <div className="relative h-40 w-full bg-muted/30">
                    <label className="absolute left-2 top-2 flex items-center gap-2 rounded-full bg-white/90 px-2 py-1 text-xs text-foreground shadow">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(asset.id)}
                        onChange={() => toggleSelect(asset.id)}
                      />
                      Select
                    </label>
                    {asset.imageUrl ? (
                      <img
                        src={asset.imageUrl}
                        alt={asset.assetId}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {asset.assetId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {CATEGORY_LABELS[asset.category]}
                        </p>
                      </div>
                      <span className="rounded-full bg-muted px-2 py-1 text-[10px] uppercase text-muted-foreground">
                        {asset.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p>Serial: {asset.serialNumber}</p>
                      <p>Location: {asset.location || "—"}</p>
                      <p>
                        Date:{" "}
                        {new Date(asset.purchaseDate).toLocaleDateString()}
                      </p>
                      <p>Value: ${asset.currentBookValue.toLocaleString()}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-1">
                      <Link href={`/assets/${asset.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openQrDialog([asset])}
                      >
                        QR
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditAsset(asset)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => {
                          if (!window.confirm("Архивлаад устгах уу?")) return;
                          deleteAssetMutation({ variables: { id: asset.id } })
                            .then(() => {
                              setAssetItems((prev) =>
                                prev.filter((item) => item.id !== asset.id),
                              );
                              refetch();
                            })
                            .catch((err) => {
                              console.error("Failed to delete asset:", err);
                            });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredAssets.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  Шүүлтүүрт тохирох эд хөрөнгө олдсонгүй.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
