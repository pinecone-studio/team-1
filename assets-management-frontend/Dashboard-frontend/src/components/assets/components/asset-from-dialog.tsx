"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Asset, AssetCategory } from "@/lib/types";
import {
  CATEGORY_LABELS,
  LOCATION_OPTIONS,
  MAIN_CATEGORY_OPTIONS,
  ROOM_OPTIONS_BY_TYPE,
  ROOM_TYPE_OPTIONS,
  getRoomTypeLabel,
} from "./constants";

type AssetFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAssets: (assets: Asset[]) => void;
};

export function AssetFormDialog({
  open,
  onOpenChange,
  onAddAssets,
}: AssetFormDialogProps) {
  const [assetId, setAssetId] = useState("");
  const [assetCategory, setAssetCategory] = useState<AssetCategory | "">("");
  const [mainCategory, setMainCategory] = useState("");
  const [location, setLocation] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [locationStep, setLocationStep] = useState<
    "location" | "roomType" | "roomNumber"
  >("location");
  const [locationOpen, setLocationOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [serialItems, setSerialItems] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [assetImage, setAssetImage] = useState<File | null>(null);
  const [assetImagePreview, setAssetImagePreview] = useState<string | null>(
    null,
  );
  const [assetIdAuto, setAssetIdAuto] = useState(true);
  const usedAssetIdsRef = useRef(new Set<string>());
  const lastIdSeedRef = useRef("");

  const roomTypeLabel = getRoomTypeLabel(roomType);
  const locationDisplay = roomNumber
    ? `${location} / ${roomTypeLabel} / ${roomNumber}`
    : roomType
      ? `${location} / ${roomTypeLabel}`
      : location;
  const locationPlaceholder =
    locationStep === "location"
      ? "Байршил сонгох"
      : locationStep === "roomType"
        ? "Өрөөний төрөл сонгох"
        : "Өрөө сонгох";

  const categoryEntries = Object.entries(CATEGORY_LABELS) as Array<
    [AssetCategory, string]
  >;
  const filteredLocations = LOCATION_OPTIONS.filter((item) =>
    item.toLowerCase().includes(locationFilter.trim().toLowerCase()),
  );

  const createUniqueCode = (prefix: string, usedSet: Set<string>) => {
    let nextCode = "";
    let attempt = 0;

    while (!nextCode || usedSet.has(nextCode)) {
      const rand =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID().split("-")[0]
          : Math.random().toString(36).slice(2, 8);
      const stamp = Date.now().toString(36).slice(-4);
      nextCode = `${prefix}-${rand}-${stamp}`.toUpperCase();
      attempt += 1;
      if (attempt > 10) break;
    }

    usedSet.add(nextCode);
    return nextCode;
  };

  const createLocalId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  };

  const getUniqueAssetId = (base: string) => {
    const trimmed = base.trim().toUpperCase();
    if (!trimmed) {
      return createUniqueCode("ASSET", usedAssetIdsRef.current);
    }
    if (!usedAssetIdsRef.current.has(trimmed)) {
      usedAssetIdsRef.current.add(trimmed);
      return trimmed;
    }
    return createUniqueCode(trimmed, usedAssetIdsRef.current);
  };

  const resetForm = () => {
    setAssetId("");
    setAssetCategory("");
    setMainCategory("");
    setLocation("");
    setLocationFilter("");
    setRoomType("");
    setRoomNumber("");
    setLocationStep("location");
    setLocationOpen(false);
    setSerialNumber("");
    setSerialItems([]);
    setNote("");
    setPurchaseDate("");
    setPurchasePrice("");
    setAssetImage(null);
    setAssetImagePreview(null);
    setAssetIdAuto(true);
  };

  const handleAddSerial = () => {
    const nextSerial = serialNumber.trim();
    if (!nextSerial) return;
    setSerialItems((prev) =>
      prev.includes(nextSerial) ? prev : [...prev, nextSerial],
    );
    setSerialNumber("");
  };

  const handleAddAsset = () => {
    if (!assetId || !assetCategory || !purchaseDate) return;

    const serialList =
      serialItems.length > 0
        ? serialItems
        : serialNumber.trim()
          ? [serialNumber.trim()]
          : [];

    if (serialList.length === 0) return;

    const purchaseCost = Number(purchasePrice) || 0;
    const year = purchaseDate.slice(0, 4);
    const autoSeed = `${assetCategory}-${year}`;
    const baseId = assetIdAuto ? autoSeed : assetId;
    const resolvedLocation = [location, roomTypeLabel || roomType, roomNumber]
      .filter(Boolean)
      .join(" / ");

    const nextAssets: Asset[] = serialList.map((serial, index) => {
      const candidateId =
        serialList.length === 1
          ? baseId
          : `${baseId}-${String(index + 1).padStart(2, "0")}`;
      const uniqueAssetId = getUniqueAssetId(candidateId);

      return {
        id: createLocalId(),
        assetId: uniqueAssetId,
        category: assetCategory,
        mainCategory: mainCategory || undefined,
        location: resolvedLocation || undefined,
        serialNumber: serial,
        purchaseCost,
        residualValue: 0,
        usefulLife: 0,
        purchaseDate,
        currentBookValue: purchaseCost,
        status: "AVAILABLE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    onAddAssets(nextAssets);
    onOpenChange(false);
    resetForm();
  };

  useEffect(() => {
    if (!open) return;
    if (!purchaseDate) {
      const today = new Date();
      const yyyy = String(today.getFullYear());
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      setPurchaseDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [open, purchaseDate]);

  useEffect(() => {
    if (!assetCategory || !purchaseDate || !assetIdAuto) return;
    const year = purchaseDate.slice(0, 4);
    const seed = `${assetCategory}-${year}`;
    if (lastIdSeedRef.current === seed && assetId) return;
    const nextId = createUniqueCode(seed, usedAssetIdsRef.current);
    lastIdSeedRef.current = seed;
    setAssetId(nextId);
  }, [assetCategory, assetIdAuto, assetId, purchaseDate]);

  useEffect(() => {
    if (!assetImage) {
      setAssetImagePreview(null);
      return;
    }
    const nextUrl = URL.createObjectURL(assetImage);
    setAssetImagePreview(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [assetImage]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[760px] rounded-3xl p-8 shadow-xl mb-6 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[24px] font-semibold">
            Шинэ хөрөнгө нэмэх
          </DialogTitle>
          <DialogDescription className="text-[16px]">
            Системд шинэ хөрөнгө бүртгэх
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">Ангилал</p>
              <Select value={mainCategory} onValueChange={setMainCategory}>
                <SelectTrigger className="h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0">
                  <SelectValue placeholder="Category сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {MAIN_CATEGORY_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Дэд ангилал
              </p>
              <Select
                value={assetCategory}
                onValueChange={(value) =>
                  setAssetCategory(value as AssetCategory)
                }
              >
                <SelectTrigger className="h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0">
                  <SelectValue placeholder="Ангилал сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {categoryEntries.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">Байршил</p>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLocationOpen((prev) => !prev)}
                  className="flex h-12 w-full items-center justify-between rounded-2xl border-0 bg-gray-100 px-4 text-base text-foreground shadow-none"
                >
                  <span
                    className={locationDisplay ? "" : "text-muted-foreground"}
                  >
                    {locationDisplay || locationPlaceholder}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {locationOpen && (
                  <div className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-white p-2 shadow-lg">
                    {locationStep === "location" && (
                      <>
                        <Input
                          value={locationFilter}
                          onChange={(event) =>
                            setLocationFilter(event.target.value)
                          }
                          placeholder="Байршил хайх..."
                          className="mb-2 h-9 rounded-xl border border-border bg-muted/30 text-sm shadow-none focus:ring-0"
                        />
                        {filteredLocations.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setLocation(item);
                              setLocationFilter("");
                              setRoomType("");
                              setRoomNumber("");
                              setLocationStep("roomType");
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-base hover:bg-muted/50"
                          >
                            {item}
                          </button>
                        ))}
                        {filteredLocations.length === 0 && (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            Байршил олдсонгүй
                          </div>
                        )}
                      </>
                    )}
                    {locationStep === "roomType" && (
                      <>
                        {ROOM_TYPE_OPTIONS.map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              setRoomType(item.value);
                              setRoomNumber("");
                              setLocationStep("roomNumber");
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-base hover:bg-muted/50"
                          >
                            {item.label}
                          </button>
                        ))}
                      </>
                    )}
                    {locationStep === "roomNumber" && (
                      <>
                        {(ROOM_OPTIONS_BY_TYPE[roomType] ?? []).map((room) => (
                          <button
                            key={room}
                            type="button"
                            onClick={() => {
                              setRoomNumber(room);
                              setLocationOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-base hover:bg-muted/50"
                          >
                            {room}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Худалдан авсан огноо
              </p>
              <Input
                type="date"
                value={purchaseDate}
                onChange={(event) => setPurchaseDate(event.target.value)}
                placeholder="yyyy.mm.dd"
                className="date-input-right h-12 rounded-2xl border-0 bg-gray-100 pr-12 text-base shadow-none focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">
              Серийн дугаар
            </p>
            <div className="relative">
              <Input
                value={serialNumber}
                onChange={(event) => setSerialNumber(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddSerial();
                  }
                }}
                placeholder="SN123456789"
                className="h-12 rounded-2xl border-0 bg-gray-100 pr-20 text-base shadow-none focus:ring-0"
              />
              <Button
                type="button"
                onClick={handleAddSerial}
                disabled={!serialNumber.trim()}
                className="absolute right-2 top-1/2 h-9 -translate-y-1/2 rounded-xl px-4"
              >
                Add
              </Button>
            </div>
            {serialItems.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {serialItems.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-foreground"
                  >
                    <span>{item}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5 rounded-full text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setSerialItems((prev) =>
                          prev.filter((_, idx) => idx !== index),
                        );
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Хөрөнгийн ID
              </p>
              <Input
                value={assetId}
                onChange={(event) => {
                  setAssetId(event.target.value);
                  setAssetIdAuto(false);
                }}
                placeholder="LAP-2024-013"
                className="h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0 w-full"
              />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Худалдан авсан үнэ ($)
              </p>
              <Input
                type="number"
                min={0}
                value={purchasePrice}
                onChange={(event) => setPurchasePrice(event.target.value)}
                placeholder="1500"
                className="h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Тэмдэглэл</p>
            <Input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Нэмэлт тайлбар оруулах"
              className="h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">
              Хөрөнгийн зураг
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setAssetImage(event.target.files?.[0] ?? null)
                }
                className="h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0"
              />
            </div>
            {assetImagePreview ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
                <img
                  src={assetImagePreview}
                  alt="Хөрөнгийн зураг"
                  className="h-44 w-full object-cover"
                />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Зураг сонговол энд preview харагдана.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="h-12 rounded-2xl px-6 text-lg"
            onClick={() => onOpenChange(false)}
          >
            Цуцлах
          </Button>
          <Button
            onClick={handleAddAsset}
            disabled={!assetId || !assetCategory || !purchaseDate}
            className="h-12 rounded-2xl px-6 text-lg"
          >
            Хөрөнгө нэмэх
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
