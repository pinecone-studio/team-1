"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  X,
  ArrowLeft,
  Check,
  Sparkles,
  RotateCcw,
  Upload,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { CsvUploadDialog } from "./csv-upload-dialog";

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
  initialSerialNumber?: string;
};

export function AssetFormDialog({
  open,
  onOpenChange,
  onAddAssets,
  onUpdateAsset,
  mode = "create",
  initialAsset = null,
  initialSerialNumber = "",
}: AssetFormDialogProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const formatNumberInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    return Number(digits).toLocaleString();
  };

  const parseNumberInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  };

  const [showCsvUploadDialog, setShowCsvUploadDialog] = useState(false);
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
  const [salePrice, setSalePrice] = useState("");
  const [assetStatus, setAssetStatus] = useState<string>("AVAILABLE");
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

  const uniqueSorted = (values: string[]) =>
    Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
      a.localeCompare(b),
    );

  const locationDatalistOptions = useMemo(() => {
    const { list, byParent } = locationTree;
    const roots = byParent.get(null) ?? [];
    const locOpts =
      roots.length > 0
        ? uniqueSorted(roots.map((r) => r.name))
        : uniqueSorted(LOCATION_OPTIONS);
    const branchById = new Map(roots.map((r) => [r.name, r]));
    const typeOpts =
      roots.length > 0
        ? location
          ? uniqueSorted(
              (byParent.get(branchById.get(location)?.id ?? "") ?? [])
              .filter((l) => l.type === "roomType")
              .map((l) => l.name),
            )
          : uniqueSorted(
              list
              .filter((l) => l.type === "roomType")
              .map((l) => l.name)
            )
        : uniqueSorted(ROOM_TYPE_OPTIONS.map((o) => o.label));
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
          ? uniqueSorted(
              (byParent.get(roomTypeNode.id) ?? [])
              .filter((l) => l.type === "section")
              .map((l) => l.name),
            )
          : uniqueSorted(
              list
              .filter((l) => l.type === "section")
              .map((l) => l.name)
            )
        : uniqueSorted(SUB_ROOM_TYPES[roomType] || []);
    const sectionNode = subRoomType
      ? (sectionById.get(subRoomType) ??
        (byParent.get(roomTypeNode?.id ?? "") ?? []).find(
          (l) => l.type === "section" && l.name === subRoomType,
        ))
      : null;
    const finalOpts =
      roots.length > 0
        ? sectionNode
          ? uniqueSorted(
              (byParent.get(sectionNode.id) ?? [])
              .filter((l) => l.type === "room")
              .map((l) => l.name),
            )
          : uniqueSorted(
              list
              .filter((l) => l.type === "room")
              .map((l) => l.name)
            )
        : uniqueSorted(FINAL_ROOM_OPTIONS[subRoomType] || []);
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

  const demoMonitorLabel = useMemo(() => {
    const main = categoriesFromDb.find((c) => c.name === "IT тоног төхөөрөмж");
    const monitorFromDb = main?.subcategories?.find((subcategory) => {
      const normalizedName = subcategory.name.trim().toLowerCase();
      const normalizedId = subcategory.id.trim().toUpperCase();
      return normalizedId === "MONITOR" || normalizedName === "monitor";
    });

    return monitorFromDb?.name ?? CATEGORY_LABELS.MONITOR;
  }, [categoriesFromDb]);

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
    setSalePrice("");
    setAssetStatus("AVAILABLE");
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
    setMainCategory("IT тоног төхөөрөмж");
    setSubCategory(demoMonitorLabel);
    setAssetIdAuto(true);
    setSerialItems(["SN-DEMO-001", "SN-DEMO-002"]);
    setSerialNumber("");
    setPurchaseDate(`${yyyy}-${mm}-${dd}`);
    setPurchasePrice("1200");
    setSalePrice("");
    setAssetStatus("AVAILABLE");
    setLocation("Гурван гол");
    setRoomType("3 давхар");
    setSubRoomType("Event area");
    setRoomNumber("");
    setLocationStep("subRoomType");
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

    const purchaseCost = parseNumberInput(purchasePrice);
    const parsedSalePrice = salePrice.trim()
      ? parseNumberInput(salePrice)
      : undefined;

    if (assetStatus === "FOR_SALE" && (!parsedSalePrice || parsedSalePrice <= 0)) {
      toast.error("`Зарж болох` төлөвт заавал `Зарах үнэ` оруулна.");
      return;
    }

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
            status: assetStatus,
            purchaseDate: purchaseTimestamp,
            purchaseCost,
            currentBookValue:
              assetStatus === "FOR_SALE" ? parsedSalePrice : undefined,
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
            status: assetStatus || "AVAILABLE",
            purchaseDate: purchaseTimestamp,
            purchaseCost,
            currentBookValue:
              assetStatus === "FOR_SALE" ? parsedSalePrice : undefined,
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
    setPurchasePrice(formatNumberInput(String(initialAsset.purchaseCost ?? 0)));
    setSalePrice(
      initialAsset.status === "FOR_SALE"
        ? formatNumberInput(String(initialAsset.currentBookValue ?? 0))
        : "",
    );
    setPurchaseDate(initialAsset.purchaseDate.slice(0, 10));
    setAssetStatus(initialAsset.status ?? "AVAILABLE");
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
    if (!open || mode !== "create") return;
    if (!initialSerialNumber.trim()) return;
    setSerialNumber(initialSerialNumber.trim());
    setSerialItems([]);
  }, [initialSerialNumber, mode, open]);

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

  const fieldClassName =
    "h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm shadow-none transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0";
  const selectTriggerClassName =
    "h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm shadow-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0";

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/40 backdrop-blur-sm"
          className="max-h-[90vh] w-[min(92vw,680px)] overflow-y-auto rounded-2xl border border-[#e5e7eb] bg-white p-0 shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
        >
          <div className="p-6 sm:p-7">
            <DialogHeader className="relative mb-6 gap-1 pr-12">
            <DialogTitle className="text-2xl font-semibold text-slate-900">
              {mode === "edit" ? "Хөрөнгө засах" : "Шинэ хөрөнгө нэмэх"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              {mode === "edit"
                ? "Хөрөнгийн мэдээлэл засах"
                : "Системд шинэ хөрөнгө бүртгэх"}
            </DialogDescription>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute right-0 top-0 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
            {mode === "create" && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-md border-gray-300 bg-white hover:bg-slate-50"
                  onClick={() => setShowCsvUploadDialog(true)}
                >
                  <Upload size={14} />
                  CSV Хуулах
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillDemoData}
                  className="rounded-md border-dashed border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Sparkles size={14} className="mr-2" /> Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={resetForm}
                  className="rounded-md border-dashed border-red-200 text-red-600 hover:bg-red-50"
                >
                  <RotateCcw size={14} className="mr-2" /> Reset
                </Button>
              </div>
            )}
            </DialogHeader>

          <div className="grid gap-6">
            <div className="bg-white">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Ангилал
                  </label>
                  <Select
                    value={mainCategory || undefined}
                    onValueChange={(value) => {
                      setMainCategory(value);
                      if (value !== mainCategory) setSubCategory("");
                    }}
                  >
                    <SelectTrigger className={selectTriggerClassName}>
                      <SelectValue placeholder="Ангилал сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent>
                      {mainCategoryOptions.map((item) => (
                        <SelectItem key={item.value} value={item.label}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Дэд ангилал
                  </label>
                  <Select
                    value={subCategory || undefined}
                    onValueChange={setSubCategory}
                  >
                    <SelectTrigger className={selectTriggerClassName}>
                      <SelectValue placeholder="Дэд ангилал сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategoryOptions.map(({ key, label }) => (
                        <SelectItem key={key} value={label}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Байршил
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setLocationOpen(!locationOpen)}
                      className="flex h-11 w-full items-center justify-between rounded-md border border-gray-300 bg-gray-50 px-3 text-sm text-left text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <span className={locationDisplay ? "" : "text-slate-400"}>
                        {locationDisplay || "Байршил сонгоно уу"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 transition-transform ${locationOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {locationOpen && (
                      <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-xl animate-in fade-in slide-in-from-top-2">
                        <div className="mb-6 flex items-center justify-between">
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
                            {(location ||
                              roomType ||
                              subRoomType ||
                              roomNumber) && (
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
                            className={fieldClassName}
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
                            className="w-full rounded-md bg-[#0f4c6e] text-white hover:bg-[#0c3c57]"
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
                          className={fieldClassName}
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
                            className="flex-1 rounded-md"
                            onClick={() => setLocationStep("location")}
                          >
                            <ArrowLeft size={16} />
                          </Button>
                            <Button
                            className="flex-1 rounded-md bg-[#0f4c6e] text-white hover:bg-[#0c3c57]"
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
                          className={fieldClassName}
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
                            className="flex-1 rounded-md"
                            onClick={() => setLocationStep("roomType")}
                          >
                            <ArrowLeft size={16} />
                          </Button>
                            <Button
                            className="flex-1 rounded-md bg-[#0f4c6e] text-white hover:bg-[#0c3c57]"
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
                          className={fieldClassName}
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
                            className="flex-1 rounded-md"
                            onClick={() => setLocationStep("subRoomType")}
                          >
                            <ArrowLeft size={16} />
                          </Button>
                            <Button
                            className="flex-1 rounded-md bg-[#0f4c6e] text-white hover:bg-[#0c3c57]"
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

                <div className="space-y-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Худалдан авсан огноо
                  </label>
                  <Input
                    type="date"
                    value={purchaseDate}
                    onChange={(event) => setPurchaseDate(event.target.value)}
                    placeholder="yyyy.mm.dd"
                    className={fieldClassName}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Серийн дугаар
                  </label>
                  <div className="flex gap-2">
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
                      className={fieldClassName}
                    />
                    <Button
                      type="button"
                      onClick={handleAddSerial}
                      disabled={!serialNumber.trim()}
                      className="h-11 rounded-md bg-[#0f4c6e] px-4 text-white hover:bg-[#0c3c57]"
                    >
                      Нэмэх
                    </Button>
                  </div>
                  {serialItems.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {serialItems.map((item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                        >
                          <span>{item}</span>
                          <button
                            type="button"
                            className="text-slate-400 hover:text-red-500"
                            onClick={() => {
                              setSerialItems((prev) =>
                                prev.filter((_, idx) => idx !== index),
                              );
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Хөрөнгийн ID
                  </label>
                  <Input
                    value={assetId}
                    onChange={(event) => {
                      setAssetId(event.target.value);
                      setAssetIdAuto(false);
                    }}
                    placeholder="LAP-2024-013"
                    className={fieldClassName}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Худалдан авсан үнэ
                  </label>
                  <div className="relative">
                    <Input
                      value={purchasePrice}
                      inputMode="numeric"
                      onChange={(event) =>
                        setPurchasePrice(formatNumberInput(event.target.value))
                      }
                      placeholder="1500"
                      className={`${fieldClassName} pr-10`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                      ₮
                    </span>
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Хөрөнгийн зураг
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setAssetImage(event.target.files?.[0] ?? null)
                      }
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 justify-start gap-2 rounded-md border-gray-300 bg-gray-50 text-slate-700 hover:bg-slate-100"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      {assetImage?.name || "Зураг сонгох"}
                    </Button>
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
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <img
                        src={assetImagePreview ?? imageUrl ?? ""}
                        alt="Хөрөнгийн зураг"
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Зураг сонговол энд preview харагдана.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {mode === "edit" && (
              <div className="bg-white">
                <div className="space-y-2">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Хуваарилсан ажилтан
                  </p>
                  <Select
                    value={assignedEmployeeId || "none"}
                    onValueChange={(value) =>
                      setAssignedEmployeeId(value === "none" ? "" : value)
                    }
                  >
                    <SelectTrigger className={selectTriggerClassName}>
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
              </div>
            )}
          </div>

          <DialogFooter className="mt-6 -mx-6 -mb-6 rounded-b-2xl border-t border-slate-200 bg-slate-50 px-6 py-4 sm:px-7">
            <Button
              variant="outline"
              className="h-11 rounded-md border-gray-300 px-5 hover:bg-white"
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
                (assetStatus === "FOR_SALE" && !salePrice.trim()) ||
                isSaving ||
                imageUploadStatus === "uploading"
              }
              className="h-11 rounded-md bg-[#0f4c6e] px-5 text-white hover:bg-[#0c3c57]"
            >
              {isSaving
                ? "Хадгалж байна..."
                : mode === "edit"
                  ? "Хадгалах"
                  : "Хөрөнгө нэмэх"}
            </Button>
          </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <CsvUploadDialog
        open={showCsvUploadDialog}
        onOpenChange={setShowCsvUploadDialog}
        onAddAssets={onAddAssets}
      />
    </>
  );
}
