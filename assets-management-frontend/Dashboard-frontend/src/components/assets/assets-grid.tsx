"use client";

import { ApolloError } from "@apollo/client";
import { AssetCard } from "./asset-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Asset } from "@/lib/types";

const FILTERS = {
  location: ["Гурван гол", "Gallery", "Tokyo", "Sednay"],
  roomType: ["Анги", "Оффис", "Агуулах"],
  room: ["301", "302", "303", "304"],
};

type FilterGroup = keyof typeof FILTERS | "category" | "subCategory";

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
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  error: ApolloError | undefined;
  activeTags: ActiveTag[];
  onRemoveTag: (group: FilterGroup, value: string) => void;
}

export function AssetsGrid({
  assets,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onSelectFirstFour,
  onClearSelection,
  onOpenQr,
  onEdit,
  onDelete,
  loading,
  error,
  activeTags,
  onRemoveTag,
}: AssetsGridProps) {
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              selected={selectedIds.has(asset.id)}
              onToggleSelect={onToggleSelect}
              onOpenQr={onOpenQr}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
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
