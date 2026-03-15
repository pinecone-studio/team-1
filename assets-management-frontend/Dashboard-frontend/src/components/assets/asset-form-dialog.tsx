"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  X,
  ArrowLeft,
  Check,
  Sparkles,
  RotateCcw,
} from "lucide-react";
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
  GetCategoriesDocument,
  GetLocationsDocument,
} from "@/gql/graphql";
import { useFragment } from "@/gql";
import type { Asset, AssetCategory } from "@/lib/types";
import {
  CATEGORY_LABELS,
  LOCATION_OPTIONS,
  MAIN_CATEGORY_OPTIONS,
  SUB_CATEGORIES_BY_MAIN,
  ROOM_TYPE_OPTIONS,
  SUB_ROOM_TYPES,
  FINAL_ROOM_OPTIONS,
} from "./constants";

type LocationFromApi = {
  id: string;
  name: string;
  parentId?: string | null;
  type: string;
};

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
  const [subCategory, setSubCategory] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [subRoomType, setSubRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [locationStep, setLocationStep] = useState<
    "location" | "roomType" | "subRoomType" | "roomNumber"
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

  const { data: categoriesData } = useQuery(GetCategoriesDocument, {
    skip: !open,
  });
  const { data: locationsData } = useQuery(GetLocationsDocument, {
    skip: !open,
  });

  const locationsFromDb = (locationsData?.locations ??
    []) as unknown as LocationFromApi[];
  const locationTree = useMemo(() => {
    const list = locationsFromDb;
    const byParent = new Map<string | null, LocationFromApi[]>();
    list.forEach((loc) => {
      const key = loc.parentId ?? null;
      if (!byParent.has(key)) byParent.set(key, []);
      byParent.get(key)!.push(loc);
    });
    return { list, byParent };
  }, [locationsFromDb]);

  const locationDatalistOptions = useMemo(() => {
    const { list, byParent } = locationTree;
    const roots = byParent.get(null) ?? [];
    const locOpts =
      roots.length > 0
        ? roots.map((r) => r.name).sort((a, b) => a.localeCompare(b))
        : LOCATION_OPTIONS;
    const branchById = new Map(roots.map((r) => [r.name, r]));
    const typeOpts =
      roots.length > 0
        ? location
          ? (byParent.get(branchById.get(location)?.id ?? "") ?? [])
              .filter((l) => l.type === "roomType")
              .map((l) => l.name)
              .sort((a, b) => a.localeCompare(b))
          : list
              .filter((l) => l.type === "roomType")
              .map((l) => l.name)
              .filter((v, i, a) => a.indexOf(v) === i)
              .sort((a, b) => a.localeCompare(b))
        : ROOM_TYPE_OPTIONS.map((o) => o.label);
    const roomTypeNode =
      location && roomType
        ? (byParent.get(branchById.get(location)?.id ?? "") ?? []).find(
            (l) => l.type === "roomType" && l.name === roomType,
          )
        : null;
    const sectionById = roomTypeNode
      ? new Map(
          (byParent.get(roomTypeNode.id) ?? [])
            .filter((l) => l.type === "section")
            .map((l) => [l.name, l]),
        )
      : new Map<string, LocationFromApi>();
    const subTypeOpts =
      roots.length > 0
        ? roomTypeNode
          ? (byParent.get(roomTypeNode.id) ?? [])
              .filter((l) => l.type === "section")
              .map((l) => l.name)
              .sort((a, b) => a.localeCompare(b))
          : list
              .filter((l) => l.type === "section")
              .map((l) => l.name)
              .filter((v, i, a) => a.indexOf(v) === i)
              .sort((a, b) => a.localeCompare(b))
        : SUB_ROOM_TYPES[roomType] || [];
    const sectionNode = subRoomType
      ? (sectionById.get(subRoomType) ??
        (byParent.get(roomTypeNode?.id ?? "") ?? []).find(
          (l) => l.type === "section" && l.name === subRoomType,
        ))
      : null;
    const finalOpts =
      roots.length > 0
        ? sectionNode
          ? (byParent.get(sectionNode.id) ?? [])
              .filter((l) => l.type === "room")
              .map((l) => l.name)
              .sort((a, b) => a.localeCompare(b))
          : list
              .filter((l) => l.type === "room")
              .map((l) => l.name)
              .filter((v, i, a) => a.indexOf(v) === i)
              .sort((a, b) => a.localeCompare(b))
        : FINAL_ROOM_OPTIONS[subRoomType] || [];
    return { locOpts, typeOpts, subTypeOpts, finalOpts };
  }, [locationTree, location, roomType, subRoomType]);

  /** GetCategories-ийн runtime буцаах бүтэц (fragment ref-ээс ялгаатай) */
  type CategoryFromApi = {
    id: string;
    name: string;
    parentId?: string | null;
    subcategories?: CategoryFromApi[];
  };
  const categoriesFromDb = (categoriesData?.categories ??
    []) as unknown as CategoryFromApi[];

  /** Үндсэн ангиллын сонголт: DB-ээс эсвэл constants fallback (API нэрээр mainCategory илгээнэ) */
  const mainCategoryOptions = useMemo(() => {
    if (categoriesFromDb.length > 0) {
      return categoriesFromDb.map((c) => ({ value: c.name, label: c.name }));
    }
    return MAIN_CATEGORY_OPTIONS;
  }, [categoriesFromDb]);

  /** Үндсэн ангилалд хамаарах дэд ангиллууд: DB-ээс эсвэл constants fallback */
  const subCategoryOptions = useMemo(() => {
    if (categoriesFromDb.length > 0 && mainCategory.trim()) {
      const main = categoriesFromDb.find((c) => c.name === mainCategory);
      const subs = main?.subcategories ?? [];
      if (subs.length > 0) {
        return subs.map((s) => ({ key: s.id, label: s.name }));
      }
    }
    const keys =
      mainCategory && mainCategory in SUB_CATEGORIES_BY_MAIN
        ? SUB_CATEGORIES_BY_MAIN[mainCategory]
        : (Object.keys(CATEGORY_LABELS) as AssetCategory[]);
    return keys.map((k) => ({ key: k, label: CATEGORY_LABELS[k] }));
  }, [categoriesFromDb, mainCategory]);

  /** Дэд ангиллын бичигдсэн утгыг API-д илгээх утга болгон (DB id эсвэл key/OTHER) */
  const resolvedAssetCategory = useMemo((): string => {
    const v = subCategory.trim();
    if (!v) return "OTHER";
    const fromOptions = subCategoryOptions.find((o) => o.label === v);
    if (fromOptions) return fromOptions.key;
    const byLabel = Object.entries(CATEGORY_LABELS).find(
      ([, label]) => label === v,
    )?.[0];
    if (byLabel) return byLabel;
    if (v in CATEGORY_LABELS) return v as AssetCategory;
    return "OTHER";
  }, [subCategory, subCategoryOptions]);
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

  const locationDisplay = [location, roomType, subRoomType, roomNumber]
    .filter(Boolean)
    .join(" / ");

  const resolvedInitialLocation = useMemo((): {
    location: string;
    roomType: string;
    subRoomType: string;
    roomNumber: string;
    step: "location" | "roomType" | "subRoomType" | "roomNumber";
  } | null => {
    if (!initialAsset?.location) return null;
    const parts = initialAsset.location.split(" / ").map((part) => part.trim());
    const step: "location" | "roomType" | "subRoomType" | "roomNumber" =
      parts[3]
        ? "roomNumber"
        : parts[2]
          ? "subRoomType"
          : parts[1]
            ? "roomType"
            : "location";
    return {
      location: parts[0] ?? "",
      roomType: parts[1] ?? "",
      subRoomType: parts[2] ?? "",
      roomNumber: parts[3] ?? "",
      step,
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
      location:
        (data as { locationPath?: string | null }).locationPath ??
        data.locationId ??
        undefined,
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
      notes: (data as { notes?: string | null }).notes ?? undefined,
      createdAt: new Date(data.createdAt).toISOString(),
      updatedAt: new Date(data.updatedAt).toISOString(),
    };
  };

  const resetForm = () => {
    setAssetId("");
    setSubCategory("");
    setMainCategory("");
    setLocation("");
    setRoomType("");
    setSubRoomType("");
    setRoomNumber("");
    setLocationStep("location");
    setLocationOpen(false);
    setSerialNumber("");
    setSerialItems([]);
    setNote("");
    const today = new Date();
    setPurchaseDate(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
    );
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
    setSubCategory("Дэлгэц");
    setMainCategory("IT тоног төхөөрөмж");
    setAssetIdAuto(true);
    setSerialItems(["SN-DEMO-001", "SN-DEMO-002"]);
    setSerialNumber("");
    setPurchaseDate(`${yyyy}-${mm}-${dd}`);
    setPurchasePrice("1200");
    setLocation("Гурван гол");
    setRoomType("Оффис");
    setSubRoomType("Заал");
    setRoomNumber("3 давхар заал");
    setLocationStep("roomNumber");
    setNote("Demo asset");
    toast.info("Туршилтын өгөгдөл бөглөгдлөө");
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
    if (!assetId || !subCategory.trim() || !purchaseDate || isSaving) return;
    if (imageUploadStatus === "uploading") return;

    const serialList = [...serialItems];
    const pendingSerial = serialNumber.trim();
    if (pendingSerial && !serialList.includes(pendingSerial)) {
      serialList.push(pendingSerial);
    }

    if (serialList.length === 0) return;

    const purchaseCost = Number(purchasePrice) || 0;
    const year = purchaseDate.slice(0, 4);
    const autoSeed = `${resolvedAssetCategory}-${year}`;
    const baseId = assetIdAuto ? autoSeed : assetId;
    const resolvedLocation = [location, roomType, subRoomType, roomNumber]
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
            category: resolvedAssetCategory,
            mainCategory: mainCategory || undefined,
            serialNumber: serialList[0],
            status: initialAsset.status,
            purchaseDate: purchaseTimestamp,
            purchaseCost,
            currentBookValue: purchaseCost,
            locationId: resolvedLocation || undefined,
            imageUrl:
              uploadedUrl ??
              (serialList.length > 1 ? fallbackImageUrl : undefined),
            notes: note.trim() || undefined,
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
          } else if (!assignedEmployeeId && initialAsset.assignedEmployeeId) {
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
            category: resolvedAssetCategory,
            mainCategory: mainCategory || undefined,
            serialNumber: serial,
            status: "AVAILABLE",
            purchaseDate: purchaseTimestamp,
            purchaseCost,
            currentBookValue: purchaseCost,
            locationId: resolvedLocation || undefined,
            imageUrl:
              uploadedUrl ??
              (serialList.length > 1 ? fallbackImageUrl : undefined),
            notes: note.trim() || undefined,
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
    setSubCategory(
      initialAsset.category ? CATEGORY_LABELS[initialAsset.category] : "",
    );
    setMainCategory(initialAsset.mainCategory ?? "");
    setSerialNumber(initialAsset.serialNumber);
    setSerialItems([]);
    setPurchasePrice(String(initialAsset.purchaseCost ?? 0));
    setPurchaseDate(initialAsset.purchaseDate.slice(0, 10));
    setImageUrl(initialAsset.imageUrl ?? null);
    setNote(initialAsset.notes ?? "");
    setAssetImage(null);
    setAssetImagePreview(null);
    setAssetIdAuto(false);
    setAssignedEmployeeId(initialAsset.assignedEmployeeId ?? "");

    if (resolvedInitialLocation) {
      setLocation(resolvedInitialLocation.location);
      setRoomType(resolvedInitialLocation.roomType);
      setSubRoomType(resolvedInitialLocation.subRoomType);
      setRoomNumber(resolvedInitialLocation.roomNumber);
      setLocationStep(resolvedInitialLocation.step);
    } else {
      setLocation("");
      setRoomType("");
      setSubRoomType("");
      setRoomNumber("");
      setLocationStep("location");
    }
  }, [initialAsset, mode, open, resolvedInitialLocation]);

  useEffect(() => {
    if (!subCategory.trim() || !purchaseDate || !assetIdAuto) return;
    const year = purchaseDate.slice(0, 4);
    const seed = `${resolvedAssetCategory}-${year}`;
    if (lastIdSeedRef.current === seed && assetId) return;
    const nextId = createUniqueCode(seed, usedAssetIdsRef.current);
    lastIdSeedRef.current = seed;
    setAssetId(nextId);
  }, [resolvedAssetCategory, subCategory, assetIdAuto, assetId, purchaseDate]);

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
    console.log({ presignRes });

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
        <DialogHeader className="mb-6 relative">
          <DialogTitle className="text-[24px] font-semibold">
            {mode === "edit" ? "Хөрөнгө засах" : "Шинэ хөрөнгө нэмэх"}
          </DialogTitle>
          <DialogDescription className="text-[16px]">
            {mode === "edit"
              ? "Хөрөнгийн мэдээлэл засах"
              : "Системд шинэ хөрөнгө бүртгэх"}
          </DialogDescription>
          {mode === "create" && (
            <div className="absolute right-0 top-0 flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDemoData}
                className="rounded-full border-dashed border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Sparkles size={14} className="mr-2" /> Demo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetForm}
                className="rounded-full border-dashed border-red-200 text-red-600 hover:bg-red-50"
              >
                <RotateCcw size={14} className="mr-2" /> Reset
              </Button>
            </div>
          )}
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground ml-1">
                Үндсэн ангилал
              </label>
              <input
                list="main-cat-list"
                value={mainCategory}
                onChange={(e) => {
                  const next = e.target.value;
                  setMainCategory(next);
                  if (next !== mainCategory) setSubCategory("");
                }}
                placeholder="Сонгох / Бичих"
                className="h-14 w-full rounded-2xl bg-gray-100 px-5 text-lg outline-none focus:ring-2 focus:ring-blue-500 border-none transition-all"
              />
              <datalist id="main-cat-list">
                {mainCategoryOptions.map((i) => (
                  <option key={i.value} value={i.label} />
                ))}
              </datalist>
            </div>
            <div className="space-y-2">
              <label className="text-base font-semibold text-foreground ml-1">
                Дэд ангилал
              </label>
              <input
                list="sub-cat-list"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="Сонгох / Бичих"
                className="h-14 w-full rounded-2xl bg-gray-100 px-5 text-lg outline-none focus:ring-2 focus:ring-blue-500 border-none transition-all"
              />
              <datalist id="sub-cat-list">
                {subCategoryOptions.map(({ key, label }) => (
                  <option key={key} value={label} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-base font-semibold text-foreground ml-1">
              Байршил / Өрөө
            </label>
            <div className="relative">
              <div
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex h-14 w-full items-center justify-between rounded-2xl bg-gray-100 px-5 text-lg cursor-pointer hover:bg-gray-200 transition-all"
              >
                <span
                  className={
                    locationDisplay
                      ? "text-gray-900 font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {locationDisplay || "Байршил сонгох..."}
                </span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${locationOpen ? "rotate-180" : ""}`}
                />
              </div>
              {locationOpen && (
                <div className="absolute z-50 mt-3 w-full rounded-4xl border bg-white p-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-8 rounded-full ${
                            (locationStep === "location" && i === 1) ||
                            (locationStep === "roomType" && i <= 2) ||
                            (locationStep === "subRoomType" && i <= 3) ||
                            (locationStep === "roomNumber" && i <= 4)
                              ? "bg-blue-500"
                              : "bg-gray-100"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {(location || roomType || subRoomType || roomNumber) && (
                        <button
                          type="button"
                          className="text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            setLocation("");
                            setRoomType("");
                            setSubRoomType("");
                            setRoomNumber("");
                            setLocationStep("location");
                            setLocationOpen(false);
                          }}
                        >
                          Цэвэрлэх
                        </button>
                      )}
                      <X
                        className="h-5 w-5 cursor-pointer text-muted-foreground"
                        onClick={() => setLocationOpen(false)}
                      />
                    </div>
                  </div>
                  {locationStep === "location" && (
                    <div className="space-y-4">
                      <p className="font-bold">Салбар?</p>
                      <input
                        autoFocus
                        list="loc-opts"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) =>
                          e.key === "Enter" && setLocationStep("roomType")
                        }
                        placeholder="Сонгох / Бичих"
                      />
                      <datalist id="loc-opts">
                        {locationDatalistOptions.locOpts.map((o) => (
                          <option key={o} value={o} />
                        ))}
                      </datalist>
                      <Button
                        className="w-full rounded-xl"
                        onClick={() => setLocationStep("roomType")}
                      >
                        Дараах
                      </Button>
                    </div>
                  )}
                  {locationStep === "roomType" && (
                    <div className="space-y-4">
                      <p className="font-bold">Төрөл?</p>
                      <input
                        autoFocus
                        list="type-opts"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) =>
                          e.key === "Enter" && setLocationStep("subRoomType")
                        }
                        placeholder="Сонгох / Бичих"
                      />
                      <datalist id="type-opts">
                        {locationDatalistOptions.typeOpts.map((o) => (
                          <option key={o} value={o} />
                        ))}
                      </datalist>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setLocationStep("location")}
                        >
                          <ArrowLeft size={16} />
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => setLocationStep("subRoomType")}
                        >
                          Дараах
                        </Button>
                      </div>
                    </div>
                  )}
                  {locationStep === "subRoomType" && (
                    <div className="space-y-4">
                      <p className="font-bold">Хэсэг?</p>
                      <input
                        autoFocus
                        list="sub-type-opts"
                        value={subRoomType}
                        onChange={(e) => setSubRoomType(e.target.value)}
                        className="h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) =>
                          e.key === "Enter" && setLocationStep("roomNumber")
                        }
                        placeholder="Сонгох / Бичих"
                      />
                      <datalist id="sub-type-opts">
                        {locationDatalistOptions.subTypeOpts.map((o) => (
                          <option key={o} value={o} />
                        ))}
                      </datalist>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setLocationStep("roomType")}
                        >
                          <ArrowLeft size={16} />
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => setLocationStep("roomNumber")}
                        >
                          Дараах
                        </Button>
                      </div>
                    </div>
                  )}
                  {locationStep === "roomNumber" && (
                    <div className="space-y-4">
                      <p className="font-bold">Нарийвчилсан?</p>
                      <input
                        autoFocus
                        list="final-opts"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) =>
                          e.key === "Enter" && setLocationOpen(false)
                        }
                        placeholder="Сонгох / Бичих"
                      />
                      <datalist id="final-opts">
                        {locationDatalistOptions.finalOpts.map((o) => (
                          <option key={o} value={o} />
                        ))}
                      </datalist>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setLocationStep("subRoomType")}
                        >
                          <ArrowLeft size={16} />
                        </Button>
                        <Button
                          className="flex-1 bg-blue-600 text-white"
                          onClick={() => setLocationOpen(false)}
                        >
                          <Check size={16} className="mr-2" /> Дуусгах
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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

          <div className="grid gap-4 sm:grid-cols-2">
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
              <p className="text-xs text-muted-foreground">
                Зураг ачаалж байна...
              </p>
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
                Зураг сонговол preview харагдана.
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
            disabled={
              !assetId ||
              !subCategory.trim() ||
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
