"use client";

import { useMemo } from "react";
import { ApolloError } from "@apollo/client";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { AssetCard } from "./asset-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORY_LABELS } from "./constants";
import type { Asset } from "@/lib/types";

/** Keys used in filter state; must match assets-content filterState */
export type FilterGroup = "locationIds" | "category" | "subCategory";

type ActiveTag = {
  group: FilterGroup;
  value: string;
  label: string;
};

interface AssetsGridProps {
  assets: Asset[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onSelectFirstFour: () => void;
  onClearSelection: () => void;
  onOpenQr: (assets: Asset[]) => void;
  onOpenAsset: (assetId: string) => void;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  error: ApolloError | undefined;
  activeTags: ActiveTag[];
  onRemoveTag: (group: FilterGroup, value: string) => void;
  /** When true (e.g. category filter active), show only table view */
  showTableOnly?: boolean;
  /** "list" = per-asset cards/table, "byType" = one card per category with count */
  viewMode?: "list" | "byType";
  /** Map category id -> display name (from API); used in by-type view for e.g. "mac monitor" */
  categoryNameById?: Map<string, string>;
}

function categoryLabel(category: string): string {
  return (CATEGORY_LABELS as Record<string, string>)[category] ?? category;
}

export function AssetsGrid({
  assets,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onSelectFirstFour,
  onClearSelection,
  onOpenQr,
  onOpenAsset,
  onEdit,
  onDelete,
  loading,
  error,
  activeTags,
  onRemoveTag,
  showTableOnly = false,
  viewMode = "list",
  categoryNameById,
}: AssetsGridProps) {
  const showTable = showTableOnly && viewMode === "list";
  const showByType = viewMode === "byType";

  const UNKNOWN_CATEGORY_KEY = "__unknown__";
  const categoryDisplayName = (categoryKey: string) => {
    if (categoryKey === UNKNOWN_CATEGORY_KEY) return "Тодорхойгүй";
    return categoryNameById?.get(categoryKey) ?? categoryLabel(categoryKey) ?? categoryKey;
  };

  const assetsByType = useMemo(() => {
    if (!showByType) return [];
    const byCategory = new Map<string, Asset[]>();
    assets.forEach((a) => {
      const raw = a.category ?? "";
      const key = raw.trim() ? raw : UNKNOWN_CATEGORY_KEY;
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key)!.push(a);
    });
    return Array.from(byCategory.entries())
      .map(([category, list]) => ({ category, assets: list }))
      .sort((a, b) =>
        categoryDisplayName(a.category).localeCompare(
          categoryDisplayName(b.category),
        ),
      );
  }, [assets, showByType, categoryNameById]);

  const fallbackImageUrl =
    typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_ASSET_FALLBACK_IMAGE_URL
      ? process.env.NEXT_PUBLIC_ASSET_FALLBACK_IMAGE_URL
      : undefined;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Эд хөрөнгө ({assets.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeTags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeTags.map((tag) => (
              <button
                key={`${tag.group}-${tag.value}`}
                type="button"
                onClick={() => onRemoveTag(tag.group, tag.value)}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-foreground"
              >
                {tag.label} ×
              </button>
            ))}
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={onSelectAll}>
            Select all
          </Button>
          <Button variant="outline" size="sm" onClick={onSelectFirstFour}>
            Select 4
          </Button>
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const selected = assets.filter((asset) =>
                selectedIds.has(asset.id),
              );
              if (selected.length > 0) onOpenQr(selected);
            }}
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
        {showByType ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assetsByType.map(({ category, assets: list }) => {
              const firstWithImage = list.find((a) => a.imageUrl) ?? list[0];
              const imageUrl =
                firstWithImage?.imageUrl ?? fallbackImageUrl ?? undefined;
              const displayName = categoryDisplayName(category);
              return (
                <Card
                  key={category}
                  className="overflow-hidden border-border"
                >
                  <div className="relative h-40 w-full bg-muted/30">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-lg font-bold uppercase tracking-tight text-foreground">
                      {displayName}
                    </p>
                    <p className="mt-1 text-base font-medium text-foreground">
                      {list.length} ширхэг
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : showTable ? (
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-10 text-muted-foreground"></TableHead>
                  <TableHead className="text-muted-foreground">Код</TableHead>
                  <TableHead className="text-muted-foreground">Ангилал</TableHead>
                  <TableHead className="text-muted-foreground">Байршил</TableHead>
                  <TableHead className="text-muted-foreground">Сериал</TableHead>
                  <TableHead className="text-muted-foreground">Төлөв</TableHead>
                  <TableHead className="text-muted-foreground">Огноо</TableHead>
                  <TableHead className="text-muted-foreground">Үнэ</TableHead>
                  <TableHead className="w-32 text-muted-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id} className="border-border">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(asset.id)}
                        onChange={() => onToggleSelect(asset.id)}
                        className="rounded border-border"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {asset.assetId}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {categoryLabel(asset.category)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {asset.location ?? "—"}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {asset.serialNumber}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase text-muted-foreground">
                        {asset.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(asset.purchaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      ${asset.currentBookValue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onOpenAsset(asset.id)}
                          aria-label="Asset detail"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onOpenQr([asset])}
                        >
                          QR
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(asset)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(asset.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                selected={selectedIds.has(asset.id)}
                onToggleSelect={onToggleSelect}
                onOpenQr={onOpenQr}
                onOpenAsset={onOpenAsset}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
        {assets.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              Шүүлтүүрт тохирох эд хөрөнгө олдсонгүй.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
