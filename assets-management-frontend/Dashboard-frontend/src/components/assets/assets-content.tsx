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
import { AssetsGrid, type FilterGroup } from "./assets-grid";
import { AssetsSearchBar } from "./assets-search-bar";
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
  const [filterState, setFilterState] = useState<
    Record<FilterGroup, Set<string>>
  >({
    locationIds: new Set(),
    category: new Set(),
    subCategory: new Set(),
  });
  const [viewMode, setViewMode] = useState<"list" | "byType">("list");
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

  const toggleFilter = (group: FilterGroup, value: string) => {
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

  const toggleFilterLocationByIds = (ids: string[]) => {
    setFilterState((prev) => {
      const next = new Set(prev.locationIds);
      const anySelected = ids.some((id) => next.has(id));
      ids.forEach((id) => (anySelected ? next.delete(id) : next.add(id)));
      return { ...prev, locationIds: next };
    });
  };

  const removeFilterTag = (group: FilterGroup, value: string) => {
    setFilterState((prev) => {
      const next = { ...prev, [group]: new Set(prev[group]) };
      if (group === "locationIds" && value.startsWith("locationName:")) {
        const name = value.slice("locationName:".length);
        locationTree.list
          .filter((loc) => loc.name === name)
          .forEach((loc) => next.locationIds.delete(loc.id));
      } else {
        next[group].delete(value);
      }
      return next;
    });
  };

  const handleDeleteAsset = (id: string) => {
    if (!window.confirm("Архивлаад устгах уу?")) return;
    deleteAssetMutation({ variables: { id } })
      .then(() => {
        setAssetItems((prev) => prev.filter((item) => item.id !== id));
        refetch();
      })
      .catch((err) => console.error("Failed to delete asset:", err));
  };

  const locationNameById = useMemo(() => {
    const map = new Map<string, string>();
    locationTree.list.forEach((loc) => map.set(loc.id, loc.name));
    return map;
  }, [locationTree.list]);

  /** Нэрээр нэгтгэсэн байршлын сонголт — нэг нэр нэг checkbox (ижил нэртэй бүх ID орно) */
  const locationOptionsByName = useMemo(() => {
    const byName = new Map<string, string[]>();
    locationTree.list.forEach((loc) => {
      const n = loc.name;
      if (!byName.has(n)) byName.set(n, []);
      byName.get(n)!.push(loc.id);
    });
    return Array.from(byName.entries())
      .map(([name, ids]) => ({ name, ids }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [locationTree.list]);

  const activeTags: { group: FilterGroup; value: string; label: string }[] = [
    /* Байршил: нэрээр нэг tag (олон ID нэг нэр дор) */
    ...(() => {
      const byName = new Map<string, string[]>();
      filterState.locationIds.forEach((id) => {
        const name = locationNameById.get(id) ?? id;
        if (!byName.has(name)) byName.set(name, []);
        byName.get(name)!.push(id);
      });
      return Array.from(byName.entries()).map(([name, ids]) => ({
        group: "locationIds" as FilterGroup,
        value: `locationName:${name}`,
        label: `Байршил: ${name}`,
      }));
    })(),
    ...Array.from(filterState.category).map((value) => ({
      group: "category" as FilterGroup,
      value,
      label: `Ангилал: ${categoryNameById.get(value) ?? value}`,
    })),
    ...Array.from(filterState.subCategory).map((value) => ({
      group: "subCategory" as FilterGroup,
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
              Байршил (нэрээр)
            </p>
            <div className="mt-1.5 space-y-1.5 max-h-48 overflow-y-auto">
              {locationOptionsByName.map((opt) => (
                <label
                  key={opt.name}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <input
                    type="checkbox"
                    checked={opt.ids.some((id) =>
                      filterState.locationIds.has(id),
                    )}
                    onChange={() => toggleFilterLocationByIds(opt.ids)}
                  />
                  {opt.name}
                </label>
              ))}
            </div>
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
          onAddAssets={(assets) => {
            setAssetItems((prev) => [...assets, ...prev]);
            refetch().then(() => {
              setAssetItems((prev) =>
                prev.filter((item) => !assets.some((a) => a.id === item.id)),
              );
            });
          }}
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

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            Жагсаалт
          </Button>
          <Button
            variant={viewMode === "byType" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("byType")}
          >
            Төрлөөр
          </Button>
        </div>

        <AssetsGrid
          assets={filteredAssets}
          selectedIds={selectedIds}
          onToggleSelect={(id: string) => {
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
          showTableOnly={
            filterState.category.size > 0 || filterState.subCategory.size > 0
          }
          viewMode={viewMode}
          categoryNameById={categoryNameById}
        />
      </div>
    </div>
  );
}
