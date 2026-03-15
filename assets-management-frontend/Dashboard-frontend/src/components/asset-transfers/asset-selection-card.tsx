"use client";

import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocationFilter } from "./location-filter";
import { AssetList } from "./asset-list";

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

interface AssetSelectionCardProps {
  assetSearch: string;
  assetLocation: string;
  assetLocationType: string;
  assetRoomNumber: string;
  assetRoomItem: string;
  hoveredLocation: string | null;
  hoveredType: string | null;
  hoveredRoom: string | null;
  showAllAssets: boolean;
  showSelectedOnly: boolean;
  selectedAssetIds: string[];
  filteredAssets: Asset[];
  visibleAssets: Asset[];
  allFilteredSelected: boolean;
  onAssetSearchChange: (search: string) => void;
  onLocationChange: (location: string) => void;
  onTypeChange: (type: string) => void;
  onRoomChange: (room: string) => void;
  onRoomItemChange: (item: string) => void;
  onHoverLocation: (location: string | null) => void;
  onHoverType: (type: string | null) => void;
  onHoverRoom: (room: string | null) => void;
  onShowAllToggle: () => void;
  onShowSelectedToggle: () => void;
  onSelectAll: () => void;
  onToggleAsset: (assetId: string) => void;
  onResetFilters: () => void;
}

export function AssetSelectionCard({
  assetSearch,
  assetLocation,
  assetLocationType,
  assetRoomNumber,
  assetRoomItem,
  hoveredLocation,
  hoveredType,
  hoveredRoom,
  showAllAssets,
  showSelectedOnly,
  selectedAssetIds,
  filteredAssets,
  visibleAssets,
  allFilteredSelected,
  onAssetSearchChange,
  onLocationChange,
  onTypeChange,
  onRoomChange,
  onRoomItemChange,
  onHoverLocation,
  onHoverType,
  onHoverRoom,
  onShowAllToggle,
  onShowSelectedToggle,
  onSelectAll,
  onToggleAsset,
  onResetFilters,
}: AssetSelectionCardProps) {
  return (
    <Card className="h-full rounded-2xl border-border bg-card p-5 lg:min-h-[620px]">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
          1
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Хөрөнгөө сонгоно уу
          </p>
          <p className="text-xs text-muted-foreground">
            Шилжүүлэх хөрөнгөө сонгоно уу
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Хөрөнгийн ID, сериал дугаар, ажилт..."
          value={assetSearch}
          onChange={(event) => onAssetSearchChange(event.target.value)}
        />
      </div>

      {/* Location Filter */}
      <LocationFilter
        assetLocation={assetLocation}
        assetLocationType={assetLocationType}
        assetRoomNumber={assetRoomNumber}
        hoveredLocation={hoveredLocation}
        hoveredType={hoveredType}
        hoveredRoom={hoveredRoom}
        onLocationChange={onLocationChange}
        onTypeChange={onTypeChange}
        onRoomChange={onRoomChange}
        onHoverLocation={onHoverLocation}
        onHoverType={onHoverType}
        onHoverRoom={onHoverRoom}
        onReset={onResetFilters}
      />

      {/* Asset List */}
      <AssetList
        assets={filteredAssets}
        selectedAssetIds={selectedAssetIds}
        visibleAssets={visibleAssets}
        showAllAssets={showAllAssets}
        allFilteredSelected={allFilteredSelected}
        onSelectAll={onSelectAll}
        onToggleShowAll={onShowAllToggle}
        onToggleAsset={onToggleAsset}
        filteredAssetsCount={filteredAssets.length}
      />
    </Card>
  );
}
