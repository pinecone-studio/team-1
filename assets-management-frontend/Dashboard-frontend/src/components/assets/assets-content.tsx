"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
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

  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    (categoriesData?.categories ?? []).forEach((category) => {
      map.set(category.id, category.name);
      category.subcategories?.forEach((sub) => map.set(sub.id, sub.name));
    });
    return map;
  }, [categoriesData?.categories]);

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
  }, [mergedAssets, searchQuery, statusFilter, categoryFilter, filterState]);

  const activeTags = useMemo(() => {
    return [
      ...Array.from(filterState.location).map((value) => ({
        group: "location" as const,
        value,
        label: `Байршил: ${value}`,
      })),
      ...Array.from(filterState.roomType).map((value) => ({
        group: "roomType" as const,
        value,
        label: `Өрөөний төрөл: ${value}`,
      })),
      ...Array.from(filterState.room).map((value) => ({
        group: "room" as const,
        value,
        label: `Өрөө: ${value}`,
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
  }, [filterState, categoryNameById]);

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

        <AssetsSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <AssetsGrid
          assets={filteredAssets}
          selectedIds={selectedIds}
          onToggleSelect={(id) => {
            setSelectedIds((prev) => {
              const next = new Set(prev);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            });
          }}
          onSelectAll={() =>
            setSelectedIds(new Set(filteredAssets.map((a) => a.id)))
          }
          onSelectFirstFour={() =>
            setSelectedIds(new Set(filteredAssets.slice(0, 4).map((a) => a.id)))
          }
          onClearSelection={() => setSelectedIds(new Set())}
          onOpenQr={setQrAssets}
          onEdit={setEditAsset}
          onDelete={handleDeleteAsset}
          loading={loading}
          error={error}
          activeTags={activeTags}
          onRemoveTag={removeFilterTag}
        />

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
