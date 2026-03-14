"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
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
import {
  AssignAssetDocument,
  CreateAssetDocument,
  EmployeesDocument,
  ReturnAssetDocument,
  UpdateAssetDocument,
  AssetFieldsFragmentDoc,
} from "@/gql/graphql";
import { useFragment } from "@/gql";
import type { Asset, AssetCategory } from "@/lib/types";
import {
  CATEGORY_LABELS,
  LOCATION_OPTIONS,
  MAIN_CATEGORY_OPTIONS,
  ROOM_OPTIONS_BY_TYPE,
  ROOM_TYPE_OPTIONS,
  getRoomTypeLabel,
} from "./constants";

type AssetDialogMode = "create" | "edit";

type AssetFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAssets: (assets: Asset[]) => void;
  onUpdateAsset?: (asset: Asset) => void;
  mode?: AssetDialogMode;
  initialAsset?: Asset | null;
};

export function AssetFormDialog({
  open,
  onOpenChange,
  onAddAssets,
  onUpdateAsset,
  mode = "create",
  initialAsset = null,
}: AssetFormDialogProps) {
  const [assetId, setAssetId] = useState("");
  const [assetCategory, setAssetCategory] = useState<AssetCategory | "">("");
  const [mainCategory, setMainCategory] = useState("");
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [hoveredRoomType, setHoveredRoomType] = useState<string | null>(null);
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploadStatus, setImageUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [assetIdAuto, setAssetIdAuto] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [assignedEmployeeId, setAssignedEmployeeId] = useState<string>("");
  const usedAssetIdsRef = useRef(new Set<string>());
  const lastIdSeedRef = useRef("");
  const [createAssetMutation] = useMutation(CreateAssetDocument);
  const [updateAssetMutation] = useMutation(UpdateAssetDocument);
  const [assignAssetMutation] = useMutation(AssignAssetDocument);
  const [returnAssetMutation] = useMutation(ReturnAssetDocument);
  const { data: employeesData } = useQuery(EmployeesDocument, {
    skip: mode !== "edit",
  });

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

  const resolvedInitialLocation = useMemo(() => {
    if (!initialAsset?.location) return null;
    const parts = initialAsset.location.split(" / ").map((part) => part.trim());
    if (parts.length === 1) {
      return { location: parts[0], roomType: "", roomNumber: "" };
    }
    if (parts.length === 2) {
      const match = ROOM_TYPE_OPTIONS.find(
        (option) => option.label === parts[1] || option.value === parts[1],
      );
      return {
        location: parts[0],
        roomType: match?.value ?? parts[1],
        roomNumber: "",
      };
    }
    const match = ROOM_TYPE_OPTIONS.find(
      (option) => option.label === parts[1] || option.value === parts[1],
    );
    return {
      location: parts[0],
      roomType: match?.value ?? parts[1],
      roomNumber: parts[2],
    };
  }, [initialAsset?.location]);

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

  const mapGraphqlAssetToLocal = (asset: any): Asset => {
    const data = useFragment(AssetFieldsFragmentDoc, asset);
    if (!data) {
      throw new Error("Asset data is missing");
    }
    return {
      imageUrl:
        data.imageUrl ??
        process.env.NEXT_PUBLIC_ASSET_FALLBACK_IMAGE_URL ??
        undefined,
      id: data.id,
      assetId: data.assetTag,
      category: data.category as AssetCategory,
      mainCategory: undefined,
      location: data.locationId ?? undefined,
      serialNumber: data.serialNumber,
      purchaseCost: data.purchaseCost ?? 0,
      residualValue: 0,
      usefulLife: 0,
      purchaseDate: data.purchaseDate
        ? new Date(data.purchaseDate).toISOString()
        : new Date().toISOString(),
      currentBookValue: data.currentBookValue ?? data.purchaseCost ?? 0,
      status: data.status as Asset["status"],
      assignedEmployeeId: data.assignedTo ?? undefined,
      assignedEmployeeName: undefined,
      createdAt: new Date(data.createdAt).toISOString(),
      updatedAt: new Date(data.updatedAt).toISOString(),
    };
  };

  const resetForm = () => {
    setAssetId("");
    setAssetCategory("");
    setMainCategory("");
    setLocation("");
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
    setImageUrl(null);
    setImageUploadStatus("idle");
    setImageUploadError(null);
    setAssetIdAuto(true);
    setAssignedEmployeeId("");
  };

  const fillDemoData = () => {
    const today = new Date();
    const yyyy = String(today.getFullYear());
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    setAssetCategory("MONITOR");
    setMainCategory("shiree");
    setAssetIdAuto(true);
    setSerialItems(["SN-DEMO-001", "SN-DEMO-002"]);
    setSerialNumber("");
    setPurchaseDate(`${yyyy}-${mm}-${dd}`);
    setPurchasePrice("1200");
    setLocation("Гурван гол");
    setRoomType("office");
    setRoomNumber("3 давхрын заал");
    setLocationStep("roomNumber");
    setNote("Demo asset");
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
    if (!assetId || !assetCategory || !purchaseDate || isSaving) return;
    if (imageUploadStatus === "uploading") return;

    const serialList = [...serialItems];
    const pendingSerial = serialNumber.trim();
    if (pendingSerial && !serialList.includes(pendingSerial)) {
      serialList.push(pendingSerial);
    }

    if (serialList.length === 0) return;

    const purchaseCost = Number(purchasePrice) || 0;
    const year = purchaseDate.slice(0, 4);
    const autoSeed = `${assetCategory}-${year}`;
    const baseId = assetIdAuto ? autoSeed : assetId;
    const resolvedLocation = [location, roomTypeLabel || roomType, roomNumber]
      .filter(Boolean)
      .join(" / ");

    const purchaseTimestamp = Number.isNaN(Date.parse(purchaseDate))
      ? undefined
      : Date.parse(purchaseDate);

    const fallbackImageUrl =
      process.env.NEXT_PUBLIC_ASSET_FALLBACK_IMAGE_URL ?? undefined;

    setIsSaving(true);
    (async () => {
      try {
        const uploadedUrl = await uploadImageIfNeeded();

        if (mode === "edit" && initialAsset) {
          const updateInput = {
            assetTag: assetId,
            category: assetCategory,
            serialNumber: serialList[0],
            status: initialAsset.status,
            purchaseDate: purchaseTimestamp,
            purchaseCost,
            currentBookValue: purchaseCost,
            locationId: resolvedLocation || undefined,
            imageUrl:
              uploadedUrl ??
              (serialList.length > 1 ? fallbackImageUrl : undefined),
          };

          const result = await updateAssetMutation({
            variables: { id: initialAsset.id, input: updateInput },
          });

          let updated = result.data?.updateAsset;
          if (!updated) throw new Error("Empty updateAsset response");
          let mapped = mapGraphqlAssetToLocal(updated);

          if (
            assignedEmployeeId &&
            assignedEmployeeId !== initialAsset.assignedEmployeeId
          ) {
            const assignResult = await assignAssetMutation({
              variables: {
                assetId: initialAsset.id,
                employeeId: assignedEmployeeId,
              },
            });
            const assigned = assignResult.data?.assignAsset;
            if (assigned) {
              updated = assigned;
              mapped = mapGraphqlAssetToLocal(assigned);
            }
          } else if (
            !assignedEmployeeId &&
            initialAsset.assignedEmployeeId
          ) {
            const returnResult = await returnAssetMutation({
              variables: { assetId: initialAsset.id },
            });
            const returned = returnResult.data?.returnAsset;
            if (returned) {
              updated = returned;
              mapped = mapGraphqlAssetToLocal(returned);
            }
          }

          onUpdateAsset?.(mapped);
          onOpenChange(false);
          resetForm();
          return;
        }

        const inputs = serialList.map((serial, index) => {
          const candidateId =
            serialList.length === 1
              ? baseId
              : `${baseId}-${String(index + 1).padStart(2, "0")}`;
          const uniqueAssetId = getUniqueAssetId(candidateId);

          return {
            assetTag: uniqueAssetId,
            category: assetCategory,
            serialNumber: serial,
            status: "AVAILABLE",
            purchaseDate: purchaseTimestamp,
            purchaseCost,
            currentBookValue: purchaseCost,
            locationId: resolvedLocation || undefined,
            imageUrl:
              uploadedUrl ??
              (serialList.length > 1 ? fallbackImageUrl : undefined),
          };
        });

        const createdAssets = await Promise.all(
          inputs.map((input) =>
            createAssetMutation({ variables: { input } }).then((result) => {
              const created = result.data?.createAsset;
              if (!created) {
                throw new Error("Empty createAsset response");
              }
              return mapGraphqlAssetToLocal(created);
            }),
          ),
        );

        onAddAssets(createdAssets);
        onOpenChange(false);
        resetForm();
      } catch (error) {
        console.error("Failed to save asset:", error);
        setImageUploadStatus("error");
        setImageUploadError(
          error instanceof Error ? error.message : "Upload failed",
        );
        toast.error("Upload failed");
      } finally {
        setIsSaving(false);
      }
    })();
    return;
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
    if (!open || mode !== "edit" || !initialAsset) return;

    setAssetId(initialAsset.assetId);
    setAssetCategory(initialAsset.category);
    setMainCategory(initialAsset.mainCategory ?? "");
    setSerialNumber(initialAsset.serialNumber);
    setSerialItems([]);
    setPurchasePrice(String(initialAsset.purchaseCost ?? 0));
    setPurchaseDate(initialAsset.purchaseDate.slice(0, 10));
    setImageUrl(initialAsset.imageUrl ?? null);
    setAssetImage(null);
    setAssetImagePreview(null);
    setAssetIdAuto(false);
    setAssignedEmployeeId(initialAsset.assignedEmployeeId ?? "");

    if (resolvedInitialLocation) {
      setLocation(resolvedInitialLocation.location);
      setRoomType(resolvedInitialLocation.roomType);
      setRoomNumber(resolvedInitialLocation.roomNumber);
      setLocationStep(
        resolvedInitialLocation.roomNumber
          ? "roomNumber"
          : resolvedInitialLocation.roomType
            ? "roomType"
            : "location",
      );
    } else {
      setLocation("");
      setRoomType("");
      setRoomNumber("");
      setLocationStep("location");
    }
  }, [initialAsset, mode, open, resolvedInitialLocation]);

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

  const uploadImageIfNeeded = async () => {
    if (!assetImage) return imageUrl;

    const bucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;
    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
    const presignUrl =
      process.env.NEXT_PUBLIC_R2_PRESIGN_URL ??
      (graphqlUrl
        ? graphqlUrl.replace(/\/api\/graphql$/, "/api/r2/presign")
        : "/api/r2/presign");

    if (!bucketName || !publicUrl) {
      throw new Error("Missing R2 environment variables.");
    }

    setImageUploadStatus("uploading");
    setImageUploadError(null);

    const safeName = assetImage.name.replace(/\s+/g, "-");
    const key = `assets/${crypto.randomUUID()}-${safeName}`;

    const presignRes = await fetch(presignUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        contentType: assetImage.type,
        bucketName,
      }),
    });

    if (!presignRes.ok) {
      throw new Error("Failed to get presigned URL");
    }

    const { url } = (await presignRes.json()) as { url: string };

    await fetch(url, {
      method: "PUT",
      body: assetImage,
      headers: { "Content-Type": assetImage.type },
    });

    const nextUrl = `${publicUrl}/${key}`;
    setImageUrl(nextUrl);
    setImageUploadStatus("success");
    toast.success("Upload succeeded");
    return nextUrl;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[760px] rounded-3xl p-8 shadow-xl mb-6 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[24px] font-semibold">
            {mode === "edit" ? "Хөрөнгө засах" : "Шинэ хөрөнгө нэмэх"}
          </DialogTitle>
          <DialogDescription className="text-[16px]">
            {mode === "edit"
              ? "Хөрөнгийн мэдээлэл засах"
              : "Системд шинэ хөрөнгө бүртгэх"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">Ангилал</p>
              <Select value={mainCategory} onValueChange={setMainCategory}>
                <SelectTrigger className="rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0 w-full p-6">
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
                <SelectTrigger className="rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0 w-full p-6">
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
                  <div
                    className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-white p-2 shadow-lg"
                    onMouseLeave={() => {
                      setHoveredLocation(null);
                      setHoveredRoomType(null);
                    }}
                  >
                    <div className="flex gap-2">
                      <div className="w-full space-y-1 rounded-xl bg-white p-1">
                        {LOCATION_OPTIONS.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onMouseEnter={() => {
                              setHoveredLocation(item);
                              setHoveredRoomType(null);
                            }}
                            onClick={() => {
                              setLocation(item);
                              setRoomType("");
                              setRoomNumber("");
                              setLocationStep("roomType");
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-base hover:bg-muted/50"
                          >
                            {item}
                            <span className="text-xs text-muted-foreground">
                              →
                            </span>
                          </button>
                        ))}
                      </div>

                      {hoveredLocation && (
                        <div className="w-full space-y-1 rounded-xl bg-white p-1">
                          {ROOM_TYPE_OPTIONS.map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onMouseEnter={() =>
                                setHoveredRoomType(item.value)
                              }
                              onClick={() => {
                                setLocation(hoveredLocation);
                                setRoomType(item.value);
                                setRoomNumber("");
                                setLocationStep("roomNumber");
                              }}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-base hover:bg-muted/50"
                            >
                              {item.label}
                              <span className="text-xs text-muted-foreground">
                                →
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {hoveredLocation && hoveredRoomType && (
                        <div className="w-full space-y-1 rounded-xl bg-white p-1">
                          {(ROOM_OPTIONS_BY_TYPE[hoveredRoomType] ?? []).map(
                            (room) => (
                              <button
                                key={room}
                                type="button"
                                onClick={() => {
                                  setLocation(hoveredLocation);
                                  setRoomType(hoveredRoomType);
                                  setRoomNumber(room);
                                  setLocationOpen(false);
                                }}
                                className="flex w-full items-center rounded-xl px-3 py-2 text-left text-base hover:bg-muted/50"
                              >
                                {room}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
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

          {mode === "edit" && (
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Хуваарилсан ажилтан
              </p>
              <Select
                value={assignedEmployeeId || "none"}
                onValueChange={(value) =>
                  setAssignedEmployeeId(value === "none" ? "" : value)
                }
              >
                <SelectTrigger className="rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0 w-full p-6">
                  <SelectValue placeholder="Ажилтан сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Хуваарилаагүй</SelectItem>
                  {(employeesData?.employees ?? []).map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
            {imageUploadStatus === "uploading" && (
              <p className="text-xs text-muted-foreground">Зураг ачаалж байна...</p>
            )}
            {imageUploadStatus === "error" && (
              <p className="text-xs text-destructive">{imageUploadError}</p>
            )}
            {assetImagePreview || imageUrl ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
                <img
                  src={assetImagePreview ?? imageUrl ?? ""}
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
            onClick={fillDemoData}
          >
            Demo
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-2xl px-6 text-lg"
            onClick={() => onOpenChange(false)}
          >
            Цуцлах
          </Button>
          <Button
            onClick={handleAddAsset}
            disabled={
              !assetId ||
              !assetCategory ||
              !purchaseDate ||
              isSaving ||
              imageUploadStatus === "uploading"
            }
            className="h-12 rounded-2xl px-6 text-lg"
          >
            {isSaving
              ? "Хадгалж байна..."
              : mode === "edit"
                ? "Хадгалах"
                : "Хөрөнгө нэмэх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
