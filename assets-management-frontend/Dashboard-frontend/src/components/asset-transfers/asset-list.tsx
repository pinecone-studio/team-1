"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Asset {
  id: string;
  serial: string;
  type: string;
  owner: string;
  location: string;
  locationType: string;
  roomNumber: string;
  roomItem?: string;
}

interface AssetListProps {
  assets: Asset[];
  selectedAssetIds: string[];
  visibleAssets: Asset[];
  showAllAssets: boolean;
  allFilteredSelected: boolean;
  onSelectAll: () => void;
  onToggleShowAll: () => void;
  onToggleAsset: (assetId: string) => void;
  filteredAssetsCount: number;
}

export function AssetList({
  assets,
  selectedAssetIds,
  visibleAssets,
  showAllAssets,
  allFilteredSelected,
  onSelectAll,
  onToggleShowAll,
  onToggleAsset,
  filteredAssetsCount,
}: AssetListProps) {
  return (
    <div className="mt-4 space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            disabled={filteredAssetsCount === 0}
          >
            {allFilteredSelected ? "Бүгдийг цуцлах" : "Select all"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={selectedAssetIds.length === 0}
          >
            {selectedAssetIds.length > 0
              ? `Checked (${selectedAssetIds.length})`
              : "Checked"}
          </Button>
        </div>
        {filteredAssetsCount > 5 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleShowAll}
          >
            {showAllAssets ? "Багаар харах" : "Бүгдийг харах"}
          </Button>
        )}
      </div>

      {/* Asset Items */}
      <div className="space-y-2">
        {visibleAssets.map((asset) => {
          const isSelected = selectedAssetIds.includes(asset.id);
          return (
            <label
              key={asset.id}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-background p-4 text-left shadow-sm transition hover:border-foreground/20",
                isSelected ? "border-foreground/40 bg-muted/50" : "",
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-border text-foreground"
                  checked={isSelected}
                  onChange={() => onToggleAsset(asset.id)}
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {asset.id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {asset.serial}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {asset.owner}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                    Байршил: {asset.location} · {asset.locationType}
                    {asset.locationType === "Анги" && asset.roomNumber
                      ? ` · ${asset.roomNumber}`
                      : ""}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground">
                {asset.type}
              </span>
            </label>
          );
        })}
      </div>

      {/* Info Message */}
      {!showAllAssets && filteredAssetsCount > 5 && (
        <p className="text-xs text-muted-foreground">
          Нийт {filteredAssetsCount} хөрөнгө байна. (Бүгдийг харах) дээр дарж
          бүгдийг үзнэ үү.
        </p>
      )}
    </div>
  );
}
