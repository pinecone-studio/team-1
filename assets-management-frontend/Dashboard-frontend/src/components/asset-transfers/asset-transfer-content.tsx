"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GetAssetsDocument,
  EmployeesDocument,
  TransferAssetDocument,
  AssignAssetDocument,
} from "@/gql/graphql";
import { toast } from "sonner";
import { AssetSelectionCard } from "./asset-selection-card";
import { TransferRequestCard } from "./transfer-request-card";

export type TransferAssetItem = {
  id: string;
  serial: string;
  type: string;
  owner: string;
  ownerId: string | null;
  location: string;
  locationType: string;
  roomNumber: string;
};

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

  const { data: assetsData, loading: assetsLoading, refetch: refetchAssets } =
    useQuery(GetAssetsDocument, {
      variables: {
        office: undefined,
        categoryIds: undefined,
        subCategoryIds: undefined,
        locationIds: undefined,
      },
    });
  const { data: employeesData } = useQuery(EmployeesDocument);
  const [transferAssetMutation, { loading: transferLoading }] =
    useMutation(TransferAssetDocument);
  const [assignAssetMutation] = useMutation(AssignAssetDocument);

  const employeeNameById = useMemo(() => {
    const map = new Map<string, string>();
    (employeesData?.employees ?? []).forEach((emp) => {
      map.set(emp.id, `${emp.firstName} ${emp.lastName}`);
    });
    return map;
  }, [employeesData?.employees]);

  const assets: TransferAssetItem[] = useMemo(() => {
    const raw = (assetsData?.assets ?? []) as Array<{
      id: string;
      assetTag: string;
      serialNumber: string;
      category: string;
      locationPath?: string | null;
      assignedTo?: string | null;
    }>;
    return raw.map((a) => {
      const path = (a.locationPath ?? "").trim();
      const parts = path ? path.split(/\s*\/\s*/) : [];
      return {
        id: a.id,
        serial: a.serialNumber ?? "",
        type: typeof a.category === "string" ? a.category : "",
        owner: (a.assignedTo && employeeNameById.get(a.assignedTo)) ?? "—",
        ownerId: a.assignedTo ?? null,
        location: parts[0] ?? "—",
        locationType: parts[1] ?? "—",
        roomNumber: parts[3] ?? parts[2] ?? "—",
      };
    });
  }, [assetsData?.assets, employeeNameById]);

  const employees = useMemo(
    () =>
      (employeesData?.employees ?? []).map((emp) => ({
        id: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
      })),
    [employeesData?.employees],
  );

  // Filter logic
  const filteredAssets = useMemo(() => {
    let list = assets;
    if (assetLocation !== "all")
      list = list.filter((asset) => asset.location === assetLocation);
    if (assetLocationType !== "all")
      list = list.filter((asset) => asset.locationType === assetLocationType);
    if (assetRoomNumber !== "all")
      list = list.filter((asset) => asset.roomNumber === assetRoomNumber);
    const query = assetSearch.trim().toLowerCase();
    if (query)
      list = list.filter((asset) =>
        [asset.id, asset.serial, asset.owner, asset.type, asset.location]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    return list;
  }, [
    assets,
    assetSearch,
    assetLocation,
    assetLocationType,
    assetRoomNumber,
  ]);

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

  const handleSubmit = async () => {
    if (!selectedAssets.length || !selectedEmployeeId) return;
    const toEmployeeId = selectedEmployeeId;
    const toastId = toast.loading("Хүсэлт илгээж байна...");
    let hasError = false;
    for (const asset of selectedAssets) {
      try {
        if (asset.ownerId) {
          await transferAssetMutation({
            variables: {
              assetId: asset.id,
              fromEmployeeId: asset.ownerId,
              toEmployeeId,
              reason: reason || undefined,
            },
          });
        } else {
          await assignAssetMutation({
            variables: {
              assetId: asset.id,
              employeeId: toEmployeeId,
              conditionAtAssign: "GOOD",
            },
          });
        }
      } catch (e) {
        console.error("Transfer/assign failed:", e);
        hasError = true;
      }
    }
    if (hasError) {
      toast.error("Шилжүүлэхэд алдаа гарлаа.", { id: toastId });
    } else {
      toast.success("Амжилттай шилжүүллээ.", { id: toastId });
    }
    setReason("");
    setSelectedAssetIds([]);
    setSelectedEmployeeId(null);
    refetchAssets();
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
            isLoading={transferLoading}
          />
        </div>
      </div>
    </div>
  );
}
