"use client";

import { useMemo, useState } from "react";
import { AssetSelectionCard } from "./asset-selection-card";
import { TransferRequestCard } from "./transfer-request-card";

const assets = [
  {
    id: "MAC-2026-001",
    serial: "C02XG0FDJGH5",
    type: "LAPTOP",
    owner: "John Smith",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "301",
  },
];

const employees = [
  { id: "emp-01", name: "John Smith" },
  { id: "emp-02", name: "Emily Johnson" },
  { id: "emp-03", name: "Bob Wilson" },
  { id: "emp-04", name: "Diana Evans" },
];

export function AssetTransferContent() {
  // Search and Filter States
  const [assetSearch, setAssetSearch] = useState("");
  const [assetLocation, setAssetLocation] = useState<string>("all");
  const [assetLocationType, setAssetLocationType] = useState<string>("all");
  const [assetRoomNumber, setAssetRoomNumber] = useState<string>("all");
  const [assetRoomItem, setAssetRoomItem] = useState<string>("all");

  // UI States
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [showAllAssets, setShowAllAssets] = useState(false);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  // Selection States
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [reason, setReason] = useState("");

  // Filter logic
  const filteredAssets = useMemo(() => {
    const query = assetSearch.trim().toLowerCase();
    const locationFiltered =
      assetLocation === "all"
        ? assets
        : assets.filter((asset) => asset.location === assetLocation);

    if (!query) return locationFiltered;
    return locationFiltered.filter((asset) =>
      [asset.id, asset.serial, asset.owner, asset.type, asset.location]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [assetSearch, assetLocation]);

  const filteredSelectedAssets = filteredAssets.filter((asset) =>
    selectedAssetIds.includes(asset.id),
  );

  const displayAssets = showSelectedOnly
    ? filteredSelectedAssets
    : filteredAssets;
  const visibleAssets = showAllAssets
    ? displayAssets
    : displayAssets.slice(0, 5);

  const allFilteredSelected =
    filteredAssets.length > 0 &&
    filteredAssets.every((asset) => selectedAssetIds.includes(asset.id));

  const selectedAssets = assets.filter((asset) =>
    selectedAssetIds.includes(asset.id),
  );

  const handleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedAssetIds((prev) =>
        prev.filter((id) => !filteredAssets.some((a) => a.id === id)),
      );
    } else {
      const filteredIds = filteredAssets.map((a) => a.id);
      setSelectedAssetIds((prev) => {
        const next = new Set(prev);
        filteredIds.forEach((id) => next.add(id));
        return Array.from(next);
      });
    }
  };

  const handleToggleAsset = (assetId: string) => {
    setSelectedAssetIds((prev) =>
      prev.includes(assetId)
        ? prev.filter((id) => id !== assetId)
        : [...prev, assetId],
    );
  };

  const handleResetFilters = () => {
    setAssetLocation("all");
    setAssetLocationType("all");
    setAssetRoomNumber("all");
    setAssetRoomItem("all");
  };

  const handleSubmit = () => {
    if (!selectedAssets.length || !selectedEmployeeId) return;
    // Handle submission logic here
    setReason("");
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Хөрөнгө шилжүүлэх
        </h1>
        <p className="text-sm text-muted-foreground">
          Хөрөнгө сонгож, шинэ эзэмшигчид шилжүүлэх хүсэлт илгээнэ.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="grid items-stretch gap-3 lg:mx-auto lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-4">
          <AssetSelectionCard
            assetSearch={assetSearch}
            assetLocation={assetLocation}
            assetLocationType={assetLocationType}
            assetRoomNumber={assetRoomNumber}
            assetRoomItem={assetRoomItem}
            hoveredLocation={hoveredLocation}
            hoveredType={hoveredType}
            hoveredRoom={hoveredRoom}
            showAllAssets={showAllAssets}
            showSelectedOnly={showSelectedOnly}
            selectedAssetIds={selectedAssetIds}
            filteredAssets={filteredAssets}
            visibleAssets={visibleAssets}
            allFilteredSelected={allFilteredSelected}
            onAssetSearchChange={setAssetSearch}
            onLocationChange={setAssetLocation}
            onTypeChange={setAssetLocationType}
            onRoomChange={setAssetRoomNumber}
            onRoomItemChange={setAssetRoomItem}
            onHoverLocation={setHoveredLocation}
            onHoverType={setHoveredType}
            onHoverRoom={setHoveredRoom}
            onShowAllToggle={() => setShowAllAssets((prev) => !prev)}
            onShowSelectedToggle={() => setShowSelectedOnly((prev) => !prev)}
            onSelectAll={handleSelectAll}
            onToggleAsset={handleToggleAsset}
            onResetFilters={handleResetFilters}
          />

          <TransferRequestCard
            selectedAssets={selectedAssets}
            selectedEmployeeId={selectedEmployeeId}
            reason={reason}
            employees={employees}
            onEmployeeChange={setSelectedEmployeeId}
            onReasonChange={setReason}
            onSubmit={handleSubmit}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
