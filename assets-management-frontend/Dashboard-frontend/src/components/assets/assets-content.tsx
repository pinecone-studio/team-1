"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
  GetAssetsDocument,
  CategoriesDocument,
  DeleteAssetDocument,
  AssetFieldsFragment,
  AssetFieldsFragmentDoc,
} from "@/gql/graphql";
import type { Asset, AssetCategory } from "@/lib/types";
import { AssetFormDialog } from "./asset-form-dialog";
import { CATEGORY_LABELS } from "./constants";
import { useFragment } from "@/gql/fragment-masking";
import { AssetsSidebar } from "./assets-sidebar";
import { AssetsSearchBar } from "./assets-search-bar";
import { AssetsGrid } from "./assets-grid";
import { QrDialog } from "./qr-dialog";

const FILTERS = {
  location: ["Гурван гол", "Gallery", "Tokyo", "Sednay"],
  roomType: ["Анги", "Оффис", "Агуулах"],
  room: ["301", "302", "303", "304"],
};

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
    location: new Set(["Гурван гол"]),
    roomType: new Set(),
    room: new Set(),
    category: new Set(),
    subCategory: new Set(),
  });

  const { data, loading, error, refetch } = useQuery(GetAssetsDocument, {
    variables: {
      office: Array.from(filterState.location)[0] ?? "Гурван гол",
      categoryIds: Array.from(filterState.category),
      subCategoryIds: Array.from(filterState.subCategory),
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
    location: asset.locationId ?? undefined,
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

  const filteredAssets = useMemo(() => {
    return mergedAssets.filter((asset) => {
      const locationParts = (asset.location ?? "")
        .split(" / ")
        .map((part) => part.trim())
        .filter(Boolean);
      const locationValue = locationParts[0] ?? "";
      const roomTypeValue = locationParts[1] ?? "";
      const roomValue = locationParts[2] ?? "";

      const matchesSearch =
        asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || asset.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || asset.category === categoryFilter;
      const locationMatch =
        filterState.location.size === 0 ||
        Array.from(filterState.location).some(
          (v) => locationValue.toLowerCase() === v.toLowerCase(),
        );

      const roomTypeAliases: Record<string, string[]> = {
        Анги: ["Анги", "Classroom"],
        Оффис: ["Оффис", "Office"],
        Агуулах: ["Агуулах", "Warehouse"],
      };

      const roomTypeMatch =
        filterState.roomType.size === 0 ||
        Array.from(filterState.roomType).some((v) =>
          (roomTypeAliases[v] ?? [v]).some(
            (a) => roomTypeValue.toLowerCase() === a.toLowerCase(),
          ),
        );
      const roomMatch =
        filterState.room.size === 0 ||
        Array.from(filterState.room).some(
          (v) => roomValue === v || roomValue.includes(v),
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        locationMatch &&
        roomTypeMatch &&
        roomMatch
      );
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
    group: keyof typeof FILTERS | "category" | "subCategory",
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
    group: keyof typeof FILTERS | "category" | "subCategory",
    value: string,
  ) => {
    setFilterState((prev) => {
      const next = { ...prev, [group]: new Set(prev[group]) };
      next[group].delete(value);
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

  return (
    <div className="flex gap-6 p-6">
      <AssetsSidebar filterState={filterState} onToggleFilter={toggleFilter} />
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
          onOpenChange={(open) => !open && setEditAsset(null)}
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

        <QrDialog
          open={qrAssets.length > 0}
          assets={qrAssets}
          onOpenChange={() => setQrAssets([])}
        />
      </div>
    </div>
  );
}
