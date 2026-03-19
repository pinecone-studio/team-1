(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/src/components/assets/constants.ts [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "CATEGORY_LABELS",
      () => CATEGORY_LABELS,
      "FINAL_ROOM_OPTIONS",
      () => FINAL_ROOM_OPTIONS,
      "LOCATION_OPTIONS",
      () => LOCATION_OPTIONS,
      "MAIN_CATEGORY_OPTIONS",
      () => MAIN_CATEGORY_OPTIONS,
      "ROOM_TYPE_OPTIONS",
      () => ROOM_TYPE_OPTIONS,
      "SUB_CATEGORIES_BY_MAIN",
      () => SUB_CATEGORIES_BY_MAIN,
      "SUB_ROOM_TYPES",
      () => SUB_ROOM_TYPES,
    ]);
    const CATEGORY_LABELS = {
      LAPTOP: "Зөөврийн компьютер",
      DESKTOP: "Суурин компьютер",
      MONITOR: "Дэлгэц",
      PHONE: "Утас",
      TABLET: "Таблет",
      PRINTER: "Принтер",
      NETWORK: "Сүлжээ",
      ACCESSORIES: "Дагалдах хэрэгсэл",
      OTHER: "Бусад",
      CHAIR: "Сандал",
      DESK: "Ширээ",
      CABINET: "Тавиур",
      SOFA: "Буйдан",
      AIR_CONDITIONER: "Агааржуулалт",
      WATER_DISPENSER: "Усны диспенсер",
      TELEVISION: "Телевизор",
      FRIDGE: "Хөргөгч",
      MICROWAVE: "Микровейв",
      FIRE_EXTINGUISHER: "Гал унтраагч",
      CCTV: "Хяналтын камер",
      ACCESS_CONTROL: "Нэвтрэх хяналт",
      STATIONERY_SET: "Бичиг хэргийн багц",
      PAPER: "Цаас",
      KITCHENWARE: "Гал тогооны хэрэгсэл",
      CONSUMABLES: "Хэрэглээний материал",
      CLEANING_TOOLS: "Цэвэрлэгээний багаж",
      DETERGENTS: "Угаалгын нунтаг/шингэн",
    };
    const MAIN_CATEGORY_OPTIONS = [
      {
        value: "it",
        label: "IT тоног төхөөрөмж",
      },
      {
        value: "furniture",
        label: "Тавилга",
      },
      {
        value: "electric",
        label: "Цахилгаан хэрэгсэл",
      },
      {
        value: "security",
        label: "Аюулгүй байдал",
      },
      {
        value: "stationery",
        label: "Бичиг хэргийн материал",
      },
      {
        value: "kitchen",
        label: "Гал тогооны хангамж",
      },
      {
        value: "office_supply",
        label: "Аж ахуйн хангамж",
      },
    ];
    const SUB_CATEGORIES_BY_MAIN = {
      "IT тоног төхөөрөмж": [
        "LAPTOP",
        "DESKTOP",
        "MONITOR",
        "PHONE",
        "TABLET",
        "PRINTER",
        "NETWORK",
        "ACCESSORIES",
        "OTHER",
      ],
      Тавилга: ["CHAIR", "DESK", "CABINET", "SOFA", "OTHER"],
      "Цахилгаан хэрэгсэл": [
        "AIR_CONDITIONER",
        "WATER_DISPENSER",
        "TELEVISION",
        "FRIDGE",
        "MICROWAVE",
        "OTHER",
      ],
      "Аюулгүй байдал": [
        "FIRE_EXTINGUISHER",
        "CCTV",
        "ACCESS_CONTROL",
        "OTHER",
      ],
      "Бичиг хэргийн материал": ["STATIONERY_SET", "PAPER", "OTHER"],
      "Гал тогооны хангамж": ["KITCHENWARE", "CONSUMABLES", "OTHER"],
      "Аж ахуйн хангамж": ["CLEANING_TOOLS", "DETERGENTS", "OTHER"],
    };
    const LOCATION_OPTIONS = ["Гурван гол", "Gallery", "Seattle"];
    const ROOM_TYPE_OPTIONS = [
      {
        value: "Оффис",
        label: "Оффис",
      },
      {
        value: "Гадаа агуулах",
        label: "Гадаа агуулах",
      },
    ];
    const SUB_ROOM_TYPES = {
      Оффис: [
        "Заал",
        "Гал тогоо",
        "Хурлын өрөө",
        "Багш нарын өрөө",
        "Ариун цэврийн өрөө",
        "Агуулах",
        "Анги",
      ],
      "Гадаа агуулах": ["Контейнер 1", "Контейнер 2", "Магадлах хэсэг"],
    };
    const FINAL_ROOM_OPTIONS = {
      Агуулах: ["3 давхар агуулах", "4 давхар агуулах"],
      Анги: ["301", "302", "303", "304", "305", "306", "401", "402", "403"],
      Заал: ["3 давхар заал", "4 давхар заал"],
      "Ариун цэврийн өрөө": [
        "3 давхар ариун цэврийн өрөө",
        "4 давхар ариун цэврийн өрөө",
      ],
    }; // import type { AssetCategory } from "@/lib/types";
    // export const CATEGORY_LABELS: Record<AssetCategory, string> = {
    //   LAPTOP: "Зөөврийн компьютер",
    //   DESKTOP: "Суурин компьютер",
    //   MONITOR: "Дэлгэц",
    //   PHONE: "Утас",
    //   TABLET: "Таблет",
    //   PRINTER: "Принтер",
    //   NETWORK: "Сүлжээ",
    //   OTHER: "Бусад",
    // };
    // export const MAIN_CATEGORY_OPTIONS = [
    //   { value: "shiree", label: "IT тоног төхөөрөмж" },
    //   { value: "sandal", label: "Тавилга" },
    //   { value: "shkaw", label: "Дагалдах хэрэгсэл" },
    //   { value: "tsonh", label: "Цахилгаан хэрэгсэл" },
    //   { value: "haalga", label: "Гэр ахуй" },
    // ];
    // export const LOCATION_OPTIONS = ["Гурван гол", "Gallery", "Tokyo", "Sednay"];
    // export const ROOM_TYPE_OPTIONS = [
    //   { value: "office", label: "Office" },
    //   { value: "aguu", label: "Агуулах" },
    //   { value: "angi", label: "Анги" },
    // ];
    // export const ROOM_OPTIONS_BY_TYPE: Record<string, string[]> = {
    //   office: [
    //     "Ариун цэврийн өрөө",
    //     "3 давхрын заал",
    //     "4 давхрын заал",
    //     "Гал тогоо",
    //     "Хурлын өрөө",
    //   ],
    //   aguu: ["3-н давхар", "4-н давхар"],
    //   angi: ["301", "302", "303", "304", "305", "306"],
    // };
    // export const getRoomTypeLabel = (value: string) =>
    //   ROOM_TYPE_OPTIONS.find((item) => item.value === value)?.label ?? "";
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/csv-upload-dialog.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["CsvUploadDialog", () => CsvUploadDialog]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/graphql.ts [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function CsvUploadDialog({ open, onOpenChange, onAddAssets }) {
      _s();
      const [file, setFile] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [isUploading, setIsUploading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [progress, setProgress] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(0);
      const fileInputRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRef"
      ])(null);
      const [createAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "CreateAssetDocument"
        ],
      );
      const resetState = () => {
        setFile(null);
        setIsUploading(false);
        setProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      const handleOpenChange = (newOpen) => {
        if (!newOpen && !isUploading) {
          resetState();
        }
        onOpenChange(newOpen);
      };
      const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          if (selectedFile.name.endsWith(".csv")) {
            setFile(selectedFile);
          } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "toast"
            ].error("Зөвхөн CSV файл хуулах боломжтой");
          }
        }
      };
      const processCsv = async () => {
        if (!file) return;
        setIsUploading(true);
        setProgress(0);
        try {
          const text = await file.text();
          const lines = text
            .split(/\r?\n/)
            .filter((line) => line.trim() !== "");
          if (lines.length < 2) {
            throw new Error(
              "CSV файл хоосон эсвэл зөвхөн толгой хэсэгтэй байна.",
            );
          }
          const headers = lines[0]
            .split(",")
            .map((h) => h.trim().toLowerCase());
          const assetTagIdx = headers.findIndex(
            (h) => h === "assettag" || h === "asset tag" || h === "tag",
          );
          const serialIdx = headers.findIndex(
            (h) =>
              h === "serialnumber" || h === "serial number" || h === "serial",
          );
          const parsedAssets = [];
          for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",").map((c) => c.trim());
            if (row.length === 0) continue;
            const assetTag =
              assetTagIdx >= 0 && row[assetTagIdx]
                ? row[assetTagIdx]
                : `CSV-ASSET-${Date.now()}-${i}`;
            const serialNumber =
              serialIdx >= 0 && row[serialIdx]
                ? row[serialIdx]
                : `CSV-SN-${Date.now()}-${i}`;
            parsedAssets.push({
              assetTag,
              serialNumber,
            });
          }
          if (parsedAssets.length === 0) {
            throw new Error("CSV файлаас унших өгөгдөл олдсонгүй.");
          }
          const successfulAssets = [];
          // Upload one by one to track progress and handle errors safely
          for (let i = 0; i < parsedAssets.length; i++) {
            const item = parsedAssets[i];
            try {
              const result = await createAssetMutation({
                variables: {
                  input: {
                    assetTag: item.assetTag,
                    serialNumber: item.serialNumber,
                    category: "OTHER",
                    status: "AVAILABLE",
                    purchaseCost: 0,
                    purchaseDate: Date.now(),
                  },
                },
              });
              const raw = result.data?.createAsset;
              const created = raw;
              if (created) {
                successfulAssets.push({
                  id: created.id,
                  assetId: created.assetTag,
                  category: "OTHER",
                  serialNumber: created.serialNumber,
                  purchaseCost: created.purchaseCost ?? 0,
                  residualValue: 0,
                  usefulLife: 0,
                  purchaseDate: created.purchaseDate
                    ? new Date(created.purchaseDate).toISOString()
                    : new Date().toISOString(),
                  currentBookValue: created.purchaseCost ?? 0,
                  status: created.status,
                  createdAt: new Date(created.createdAt).toISOString(),
                  updatedAt: new Date(created.updatedAt).toISOString(),
                });
              }
            } catch (err) {
              console.error(`Failed to create asset ${item.assetTag}:`, err);
              // Continue with the rest even if one fails
            }
            setProgress(Math.round(((i + 1) / parsedAssets.length) * 100));
          }
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].success(`Амжилттай ${successfulAssets.length} хөрөнгө нэмлээ.`);
          if (successfulAssets.length > 0) {
            onAddAssets(successfulAssets);
          }
          handleOpenChange(false);
        } catch (error) {
          console.error("CSV process error:", error);
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].error(
            error instanceof Error
              ? error.message
              : "Алдаа гарлаа. Дахин оролдоно уу.",
          );
        } finally {
          setIsUploading(false);
        }
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "Dialog"
        ],
        {
          open: open,
          onOpenChange: handleOpenChange,
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "DialogContent"
            ],
            {
              className: "bg-white sm:max-w-125 rounded-3xl p-8 shadow-xl mb-6",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogHeader"
                  ],
                  {
                    className: "mb-4",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogTitle"
                        ],
                        {
                          className: "text-[24px] font-semibold",
                          children: "CSV файлаар хөрөнгө хуулах",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/csv-upload-dialog.tsx",
                          lineNumber: 173,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogDescription"
                        ],
                        {
                          className: "text-[16px]",
                          children:
                            "Хөрөнгийн мэдээлэл бүхий .csv файлыг сонгож олноор нь системд бүртгэнэ үү. (Баганууд: assetTag, serialNumber)",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/csv-upload-dialog.tsx",
                          lineNumber: 176,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/csv-upload-dialog.tsx",
                    lineNumber: 172,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "grid gap-6",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: `flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-colors ${file ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`,
                          children: file
                            ? /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "flex flex-col items-center text-center",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__[
                                        "CheckCircle"
                                      ],
                                      {
                                        className:
                                          "h-10 w-10 text-green-500 mb-2",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 192,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "font-medium text-green-700",
                                        children: file.name,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 193,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "text-sm text-green-600 mt-1",
                                        children: [
                                          (file.size / 1024).toFixed(1),
                                          " KB",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    !isUploading &&
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Button"
                                        ],
                                        {
                                          variant: "link",
                                          size: "sm",
                                          className:
                                            "mt-2 text-red-500 hover:text-red-700 h-auto p-0",
                                          onClick: () => setFile(null),
                                          children: "Файл солих",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/csv-upload-dialog.tsx",
                                          lineNumber: 198,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/csv-upload-dialog.tsx",
                                  lineNumber: 191,
                                  columnNumber: 15,
                                },
                                this,
                              )
                            : /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "flex flex-col items-center text-center",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__[
                                        "Upload"
                                      ],
                                      {
                                        className:
                                          "h-10 w-10 text-gray-400 mb-2",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 210,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "font-medium text-gray-700",
                                        children:
                                          "Файл энд чирж оруулах эсвэл сонгох",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 211,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "text-sm text-gray-500 mt-1",
                                        children:
                                          "Зөвхөн .csv өргөтгөлтэй файл",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Button"
                                      ],
                                      {
                                        variant: "outline",
                                        className: "mt-4",
                                        onClick: () =>
                                          fileInputRef.current?.click(),
                                        children: "Файл сонгох",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 217,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "input",
                                      {
                                        type: "file",
                                        accept: ".csv",
                                        className: "hidden",
                                        ref: fileInputRef,
                                        onChange: handleFileChange,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/csv-upload-dialog.tsx",
                                  lineNumber: 209,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/csv-upload-dialog.tsx",
                          lineNumber: 183,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      isUploading &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "space-y-2",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "flex justify-between text-sm font-medium",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        children: "Хуулж байна...",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 238,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        children: [progress, "%"],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/csv-upload-dialog.tsx",
                                        lineNumber: 239,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/csv-upload-dialog.tsx",
                                  lineNumber: 237,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "h-2 w-full bg-gray-100 rounded-full overflow-hidden",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "h-full bg-blue-600 transition-all duration-300",
                                      style: {
                                        width: `${progress}%`,
                                      },
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/csv-upload-dialog.tsx",
                                      lineNumber: 242,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/csv-upload-dialog.tsx",
                                  lineNumber: 241,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/csv-upload-dialog.tsx",
                            lineNumber: 236,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex justify-end gap-3 pt-4",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                variant: "outline",
                                onClick: () => handleOpenChange(false),
                                disabled: isUploading,
                                children: "Цуцлах",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/csv-upload-dialog.tsx",
                                lineNumber: 251,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                onClick: processCsv,
                                disabled: !file || isUploading,
                                className: "gap-2",
                                children: isUploading
                                  ? /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Fragment"
                                      ],
                                      {
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__[
                                              "Loader2"
                                            ],
                                            {
                                              className: "h-4 w-4 animate-spin",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/csv-upload-dialog.tsx",
                                              lineNumber: 265,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          "Хуулж байна...",
                                        ],
                                      },
                                      void 0,
                                      true,
                                    )
                                  : /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Fragment"
                                      ],
                                      {
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__[
                                              "Upload"
                                            ],
                                            {
                                              className: "h-4 w-4",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/csv-upload-dialog.tsx",
                                              lineNumber: 270,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          "Хуулах",
                                        ],
                                      },
                                      void 0,
                                      true,
                                    ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/csv-upload-dialog.tsx",
                                lineNumber: 258,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/csv-upload-dialog.tsx",
                          lineNumber: 250,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/csv-upload-dialog.tsx",
                    lineNumber: 182,
                    columnNumber: 9,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: "[project]/src/components/assets/csv-upload-dialog.tsx",
              lineNumber: 171,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/components/assets/csv-upload-dialog.tsx",
          lineNumber: 170,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(CsvUploadDialog, "l0QVA4tJllI6X2VHZxKL1h3uP1I=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
      ];
    });
    _c = CsvUploadDialog;
    var _c;
    __turbopack_context__.k.register(_c, "CsvUploadDialog");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/asset-form-dialog.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetFormDialog", () => AssetFormDialog]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        "[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/select.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/graphql.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        "[project]/src/gql/index.ts [app-client] (ecmascript) <locals>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$fragment$2d$masking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/fragment-masking.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/constants.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$csv$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/csv-upload-dialog.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function AssetFormDialog({
      open,
      onOpenChange,
      onAddAssets,
      onUpdateAsset,
      mode = "create",
      initialAsset = null,
    }) {
      _s();
      var _s1 = __turbopack_context__.k.signature();
      const [showCsvUploadDialog, setShowCsvUploadDialog] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [assetId, setAssetId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [subCategory, setSubCategory] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [mainCategory, setMainCategory] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [location, setLocation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [roomType, setRoomType] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [subRoomType, setSubRoomType] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [roomNumber, setRoomNumber] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [locationStep, setLocationStep] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("location");
      const [locationOpen, setLocationOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [serialNumber, setSerialNumber] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [serialItems, setSerialItems] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [note, setNote] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [purchaseDate, setPurchaseDate] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [purchasePrice, setPurchasePrice] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [assetImage, setAssetImage] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [assetImagePreview, setAssetImagePreview] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [imageUrl, setImageUrl] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [imageUploadStatus, setImageUploadStatus] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("idle");
      const [imageUploadError, setImageUploadError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [assetIdAuto, setAssetIdAuto] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const { data: categoriesData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetCategoriesDocument"
        ],
        {
          skip: !open,
        },
      );
      const { data: locationsData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetLocationsDocument"
        ],
        {
          skip: !open,
        },
      );
      const locationsFromDb = locationsData?.locations ?? [];
      const locationTree = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFormDialog.useMemo[locationTree]": () => {
            const list = locationsFromDb;
            const byParent = new Map();
            list.forEach(
              {
                "AssetFormDialog.useMemo[locationTree]": (loc) => {
                  const key = loc.parentId ?? null;
                  if (!byParent.has(key)) byParent.set(key, []);
                  byParent.get(key).push(loc);
                },
              }["AssetFormDialog.useMemo[locationTree]"],
            );
            return {
              list,
              byParent,
            };
          },
        }["AssetFormDialog.useMemo[locationTree]"],
        [locationsFromDb],
      );
      const locationDatalistOptions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFormDialog.useMemo[locationDatalistOptions]": () => {
            const { list, byParent } = locationTree;
            const roots = byParent.get(null) ?? [];
            const locOpts =
              roots.length > 0
                ? roots
                    .map(
                      {
                        "AssetFormDialog.useMemo[locationDatalistOptions]": (
                          r,
                        ) => r.name,
                      }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                    )
                    .sort(
                      {
                        "AssetFormDialog.useMemo[locationDatalistOptions]": (
                          a,
                          b,
                        ) => a.localeCompare(b),
                      }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                    )
                : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "LOCATION_OPTIONS"
                  ];
            const branchById = new Map(
              roots.map(
                {
                  "AssetFormDialog.useMemo[locationDatalistOptions]": (r) => [
                    r.name,
                    r,
                  ],
                }["AssetFormDialog.useMemo[locationDatalistOptions]"],
              ),
            );
            const typeOpts =
              roots.length > 0
                ? location
                  ? (byParent.get(branchById.get(location)?.id ?? "") ?? [])
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.type === "roomType",
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .map(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.name,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .sort(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            a,
                            b,
                          ) => a.localeCompare(b),
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                  : list
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.type === "roomType",
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .map(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.name,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            v,
                            i,
                            a,
                          ) => a.indexOf(v) === i,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .sort(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            a,
                            b,
                          ) => a.localeCompare(b),
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "ROOM_TYPE_OPTIONS"
                  ].map(
                    {
                      "AssetFormDialog.useMemo[locationDatalistOptions]": (o) =>
                        o.label,
                    }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                  );
            const roomTypeNode =
              location && roomType
                ? (byParent.get(branchById.get(location)?.id ?? "") ?? []).find(
                    {
                      "AssetFormDialog.useMemo[locationDatalistOptions]": (l) =>
                        l.type === "roomType" && l.name === roomType,
                    }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                  )
                : null;
            const sectionById = roomTypeNode
              ? new Map(
                  (byParent.get(roomTypeNode.id) ?? [])
                    .filter(
                      {
                        "AssetFormDialog.useMemo[locationDatalistOptions]": (
                          l,
                        ) => l.type === "section",
                      }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                    )
                    .map(
                      {
                        "AssetFormDialog.useMemo[locationDatalistOptions]": (
                          l,
                        ) => [l.name, l],
                      }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                    ),
                )
              : new Map();
            const subTypeOpts =
              roots.length > 0
                ? roomTypeNode
                  ? (byParent.get(roomTypeNode.id) ?? [])
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.type === "section",
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .map(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.name,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .sort(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            a,
                            b,
                          ) => a.localeCompare(b),
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                  : list
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.type === "section",
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .map(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.name,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            v,
                            i,
                            a,
                          ) => a.indexOf(v) === i,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .sort(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            a,
                            b,
                          ) => a.localeCompare(b),
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "SUB_ROOM_TYPES"
                  ][roomType] || [];
            const sectionNode = subRoomType
              ? (sectionById.get(subRoomType) ??
                (byParent.get(roomTypeNode?.id ?? "") ?? []).find(
                  {
                    "AssetFormDialog.useMemo[locationDatalistOptions]": (l) =>
                      l.type === "section" && l.name === subRoomType,
                  }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                ))
              : null;
            const finalOpts =
              roots.length > 0
                ? sectionNode
                  ? (byParent.get(sectionNode.id) ?? [])
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.type === "room",
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .map(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.name,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .sort(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            a,
                            b,
                          ) => a.localeCompare(b),
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                  : list
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.type === "room",
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .map(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            l,
                          ) => l.name,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .filter(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            v,
                            i,
                            a,
                          ) => a.indexOf(v) === i,
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                      .sort(
                        {
                          "AssetFormDialog.useMemo[locationDatalistOptions]": (
                            a,
                            b,
                          ) => a.localeCompare(b),
                        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
                      )
                : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "FINAL_ROOM_OPTIONS"
                  ][subRoomType] || [];
            return {
              locOpts,
              typeOpts,
              subTypeOpts,
              finalOpts,
            };
          },
        }["AssetFormDialog.useMemo[locationDatalistOptions]"],
        [locationTree, location, roomType, subRoomType],
      );
      const categoriesFromDb = categoriesData?.categories ?? [];
      /** Үндсэн ангиллын сонголт: DB-ээс эсвэл constants fallback (API нэрээр mainCategory илгээнэ) */ const mainCategoryOptions =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMemo"
        ])(
          {
            "AssetFormDialog.useMemo[mainCategoryOptions]": () => {
              if (categoriesFromDb.length > 0) {
                return categoriesFromDb.map(
                  {
                    "AssetFormDialog.useMemo[mainCategoryOptions]": (c) => ({
                      value: c.name,
                      label: c.name,
                    }),
                  }["AssetFormDialog.useMemo[mainCategoryOptions]"],
                );
              }
              return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "MAIN_CATEGORY_OPTIONS"
              ];
            },
          }["AssetFormDialog.useMemo[mainCategoryOptions]"],
          [categoriesFromDb],
        );
      /** Үндсэн ангилалд хамаарах дэд ангиллууд: DB-ээс эсвэл constants fallback */ const subCategoryOptions =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMemo"
        ])(
          {
            "AssetFormDialog.useMemo[subCategoryOptions]": () => {
              if (categoriesFromDb.length > 0 && mainCategory.trim()) {
                const main = categoriesFromDb.find(
                  {
                    "AssetFormDialog.useMemo[subCategoryOptions].main": (c) =>
                      c.name === mainCategory,
                  }["AssetFormDialog.useMemo[subCategoryOptions].main"],
                );
                const subs = main?.subcategories ?? [];
                if (subs.length > 0) {
                  return subs.map(
                    {
                      "AssetFormDialog.useMemo[subCategoryOptions]": (s) => ({
                        key: s.id,
                        label: s.name,
                      }),
                    }["AssetFormDialog.useMemo[subCategoryOptions]"],
                  );
                }
              }
              const keys =
                mainCategory &&
                mainCategory in
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "SUB_CATEGORIES_BY_MAIN"
                  ]
                  ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "SUB_CATEGORIES_BY_MAIN"
                    ][mainCategory]
                  : Object.keys(
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "CATEGORY_LABELS"
                      ],
                    );
              return keys.map(
                {
                  "AssetFormDialog.useMemo[subCategoryOptions]": (k) => ({
                    key: k,
                    label:
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "CATEGORY_LABELS"
                      ][k],
                  }),
                }["AssetFormDialog.useMemo[subCategoryOptions]"],
              );
            },
          }["AssetFormDialog.useMemo[subCategoryOptions]"],
          [categoriesFromDb, mainCategory],
        );
      /** Дэд ангиллын бичигдсэн утгыг API-д илгээх утга болгон (DB id эсвэл key/OTHER) */ const resolvedAssetCategory =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMemo"
        ])(
          {
            "AssetFormDialog.useMemo[resolvedAssetCategory]": () => {
              const v = subCategory.trim();
              if (!v) return "OTHER";
              const fromOptions = subCategoryOptions.find(
                {
                  "AssetFormDialog.useMemo[resolvedAssetCategory].fromOptions":
                    (o) => o.label === v,
                }["AssetFormDialog.useMemo[resolvedAssetCategory].fromOptions"],
              );
              if (fromOptions) return fromOptions.key;
              const byLabel = Object.entries(
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "CATEGORY_LABELS"
                ],
              ).find(
                {
                  "AssetFormDialog.useMemo[resolvedAssetCategory]": ([
                    ,
                    label,
                  ]) => label === v,
                }["AssetFormDialog.useMemo[resolvedAssetCategory]"],
              )?.[0];
              if (byLabel) return byLabel;
              if (
                v in
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "CATEGORY_LABELS"
                ]
              )
                return v;
              return "OTHER";
            },
          }["AssetFormDialog.useMemo[resolvedAssetCategory]"],
          [subCategory, subCategoryOptions],
        );
      const [isSaving, setIsSaving] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [assignedEmployeeId, setAssignedEmployeeId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const usedAssetIdsRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRef"
      ])(new Set());
      const lastIdSeedRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRef"
      ])("");
      const [createAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "CreateAssetDocument"
        ],
      );
      const [updateAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "UpdateAssetDocument"
        ],
      );
      const [assignAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "AssignAssetDocument"
        ],
      );
      const [returnAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "ReturnAssetDocument"
        ],
      );
      const { data: employeesData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "EmployeesDocument"
        ],
        {
          skip: mode !== "edit",
        },
      );
      const locationDisplay = [location, roomType, subRoomType, roomNumber]
        .filter(Boolean)
        .join(" / ");
      const resolvedInitialLocation = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFormDialog.useMemo[resolvedInitialLocation]": () => {
            if (!initialAsset?.location) return null;
            const parts = initialAsset.location.split(" / ").map(
              {
                "AssetFormDialog.useMemo[resolvedInitialLocation].parts": (
                  part,
                ) => part.trim(),
              }["AssetFormDialog.useMemo[resolvedInitialLocation].parts"],
            );
            const step = parts[3]
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
          },
        }["AssetFormDialog.useMemo[resolvedInitialLocation]"],
        [initialAsset?.location],
      );
      const createUniqueCode = (prefix, usedSet) => {
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
      const getUniqueAssetId = (base) => {
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
      const mapGraphqlAssetToLocal = (asset) => {
        _s1();
        const data = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$fragment$2d$masking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useFragment"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "AssetFieldsFragmentDoc"
          ],
          asset,
        );
        if (!data) {
          throw new Error("Asset data is missing");
        }
        return {
          imageUrl:
            data.imageUrl ??
            ("TURBOPACK compile-time value", "/Monitor.jpg") ??
            undefined,
          id: data.id,
          assetId: data.assetTag,
          category: data.category,
          mainCategory: undefined,
          location: data.locationPath ?? data.locationId ?? undefined,
          serialNumber: data.serialNumber,
          purchaseCost: data.purchaseCost ?? 0,
          residualValue: 0,
          usefulLife: 0,
          purchaseDate: data.purchaseDate
            ? new Date(data.purchaseDate).toISOString()
            : new Date().toISOString(),
          currentBookValue: data.currentBookValue ?? data.purchaseCost ?? 0,
          status: data.status,
          assignedEmployeeId: data.assignedTo ?? undefined,
          assignedEmployeeName: undefined,
          notes: data.notes ?? undefined,
          createdAt: new Date(data.createdAt).toISOString(),
          updatedAt: new Date(data.updatedAt).toISOString(),
        };
      };
      _s1(
        mapGraphqlAssetToLocal,
        "bR5Fh/ofvF2PV780SvGP+A/MMcA=",
        false,
        function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$fragment$2d$masking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "useFragment"
            ],
          ];
        },
      );
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "toast"
        ].info("Туршилтын өгөгдөл бөглөгдлөө");
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
        if (!assetId || !subCategory.trim() || !purchaseDate || isSaving)
          return;
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
          ("TURBOPACK compile-time value", "/Monitor.jpg") ?? undefined;
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
                variables: {
                  id: initialAsset.id,
                  input: updateInput,
                },
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
                  variables: {
                    assetId: initialAsset.id,
                  },
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
                createAssetMutation({
                  variables: {
                    input,
                  },
                }).then((result) => {
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "toast"
            ].error("Upload failed");
          } finally {
            setIsSaving(false);
          }
        })();
        return;
      };
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AssetFormDialog.useEffect": () => {
            if (!open) return;
            if (!purchaseDate) {
              const today = new Date();
              const yyyy = String(today.getFullYear());
              const mm = String(today.getMonth() + 1).padStart(2, "0");
              const dd = String(today.getDate()).padStart(2, "0");
              setPurchaseDate(`${yyyy}-${mm}-${dd}`);
            }
          },
        }["AssetFormDialog.useEffect"],
        [open, purchaseDate],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AssetFormDialog.useEffect": () => {
            if (!open || mode !== "edit" || !initialAsset) return;
            setAssetId(initialAsset.assetId);
            setSubCategory(
              initialAsset.category
                ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "CATEGORY_LABELS"
                  ][initialAsset.category]
                : "",
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
          },
        }["AssetFormDialog.useEffect"],
        [initialAsset, mode, open, resolvedInitialLocation],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AssetFormDialog.useEffect": () => {
            if (!subCategory.trim() || !purchaseDate || !assetIdAuto) return;
            const year = purchaseDate.slice(0, 4);
            const seed = `${resolvedAssetCategory}-${year}`;
            if (lastIdSeedRef.current === seed && assetId) return;
            const nextId = createUniqueCode(seed, usedAssetIdsRef.current);
            lastIdSeedRef.current = seed;
            setAssetId(nextId);
          },
        }["AssetFormDialog.useEffect"],
        [
          resolvedAssetCategory,
          subCategory,
          assetIdAuto,
          assetId,
          purchaseDate,
        ],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AssetFormDialog.useEffect": () => {
            if (!assetImage) {
              setAssetImagePreview(null);
              return;
            }
            const nextUrl = URL.createObjectURL(assetImage);
            setAssetImagePreview(nextUrl);
            return {
              "AssetFormDialog.useEffect": () => URL.revokeObjectURL(nextUrl),
            }["AssetFormDialog.useEffect"];
          },
        }["AssetFormDialog.useEffect"],
        [assetImage],
      );
      const uploadImageIfNeeded = async () => {
        if (!assetImage) return imageUrl;
        const bucketName =
          ("TURBOPACK compile-time value", "assets-management");
        const publicUrl =
          ("TURBOPACK compile-time value",
          "https://pub-de50afb5e9934f62ad9c809976d139d8.r2.dev");
        const graphqlUrl =
          ("TURBOPACK compile-time value",
          "https://my-next-app.tsetsegulziiocherdene.workers.dev/api/graphql");
        const presignUrl =
          ("TURBOPACK compile-time value",
          "https://my-next-app.tsetsegulziiocherdene.workers.dev/api/r2/presign") ??
          (("TURBOPACK compile-time truthy", 1)
            ? graphqlUrl.replace(/\/api\/graphql$/, "/api/r2/presign")
            : "TURBOPACK unreachable");
        if (("TURBOPACK compile-time falsy", 0)) //TURBOPACK unreachable
        ;
        setImageUploadStatus("uploading");
        setImageUploadError(null);
        const safeName = assetImage.name.replace(/\s+/g, "-");
        const key = `assets/${crypto.randomUUID()}-${safeName}`;
        const presignRes = await fetch(presignUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key,
            contentType: assetImage.type,
            bucketName,
          }),
        });
        console.log({
          presignRes,
        });
        if (!presignRes.ok) {
          throw new Error("Failed to get presigned URL");
        }
        const { url } = await presignRes.json();
        await fetch(url, {
          method: "PUT",
          body: assetImage,
          headers: {
            "Content-Type": assetImage.type,
          },
        });
        const nextUrl = `${publicUrl}/${key}`;
        setImageUrl(nextUrl);
        setImageUploadStatus("success");
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "toast"
        ].success("Upload succeeded");
        return nextUrl;
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "Fragment"
        ],
        {
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Dialog"
              ],
              {
                open: open,
                onOpenChange: onOpenChange,
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogContent"
                  ],
                  {
                    className:
                      "bg-white sm:max-w-[760px] rounded-3xl p-8 shadow-xl mb-6 max-h-[85vh] overflow-y-auto",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogHeader"
                        ],
                        {
                          className: "mb-6 relative",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "DialogTitle"
                              ],
                              {
                                className: "text-[24px] font-semibold",
                                children:
                                  mode === "edit"
                                    ? "Хөрөнгө засах"
                                    : "Шинэ хөрөнгө нэмэх",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 674,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "DialogDescription"
                              ],
                              {
                                className: "text-[16px]",
                                children:
                                  mode === "edit"
                                    ? "Хөрөнгийн мэдээлэл засах"
                                    : "Системд шинэ хөрөнгө бүртгэх",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 677,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            mode === "create" &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "absolute right-0 top-0 flex flex-wrap gap-2",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Button"
                                      ],
                                      {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        className: "gap-2",
                                        onClick: () =>
                                          setShowCsvUploadDialog(true),
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__[
                                              "Upload"
                                            ],
                                            {
                                              size: 14,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 691,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                          "CSV Хуулах",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                        lineNumber: 684,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Button"
                                      ],
                                      {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: fillDemoData,
                                        className:
                                          "rounded-full border-dashed border-blue-200 text-blue-600 hover:bg-blue-50",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__[
                                              "Sparkles"
                                            ],
                                            {
                                              size: 14,
                                              className: "mr-2",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 701,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                          " Demo",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                        lineNumber: 694,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Button"
                                      ],
                                      {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: resetForm,
                                        className:
                                          "rounded-full border-dashed border-red-200 text-red-600 hover:bg-red-50",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__[
                                              "RotateCcw"
                                            ],
                                            {
                                              size: 14,
                                              className: "mr-2",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 710,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                          " Reset",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                        lineNumber: 703,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                  lineNumber: 683,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-form-dialog.tsx",
                          lineNumber: 673,
                          columnNumber: 9,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "grid gap-6",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "space-y-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "label",
                                          {
                                            className:
                                              "text-base font-semibold text-foreground ml-1",
                                            children: "Үндсэн ангилал",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 719,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "input",
                                          {
                                            list: "main-cat-list",
                                            value: mainCategory,
                                            onChange: (e) => {
                                              const next = e.target.value;
                                              setMainCategory(next);
                                              if (next !== mainCategory)
                                                setSubCategory("");
                                            },
                                            placeholder: "Сонгох / Бичих",
                                            className:
                                              "h-14 w-full rounded-2xl bg-gray-100 px-5 text-lg outline-none focus:ring-2 focus:ring-blue-500 border-none transition-all",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 722,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "datalist",
                                          {
                                            id: "main-cat-list",
                                            children: mainCategoryOptions.map(
                                              (i) =>
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "option",
                                                  {
                                                    value: i.label,
                                                  },
                                                  i.value,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-form-dialog.tsx",
                                                    lineNumber: 735,
                                                    columnNumber: 19,
                                                  },
                                                  this,
                                                ),
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 733,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 718,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "space-y-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "label",
                                          {
                                            className:
                                              "text-base font-semibold text-foreground ml-1",
                                            children: "Дэд ангилал",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 740,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "input",
                                          {
                                            list: "sub-cat-list",
                                            value: subCategory,
                                            onChange: (e) =>
                                              setSubCategory(e.target.value),
                                            placeholder: "Сонгох / Бичих",
                                            className:
                                              "h-14 w-full rounded-2xl bg-gray-100 px-5 text-lg outline-none focus:ring-2 focus:ring-blue-500 border-none transition-all",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 743,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "datalist",
                                          {
                                            id: "sub-cat-list",
                                            children: subCategoryOptions.map(
                                              ({ key, label }) =>
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "option",
                                                  {
                                                    value: label,
                                                  },
                                                  key,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-form-dialog.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 19,
                                                  },
                                                  this,
                                                ),
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 750,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 739,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 717,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "space-y-3",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-base font-semibold text-foreground ml-1",
                                      children: "Байршил / Өрөө",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 759,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "relative",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            onClick: () =>
                                              setLocationOpen(!locationOpen),
                                            className:
                                              "flex h-14 w-full items-center justify-between rounded-2xl bg-gray-100 px-5 text-lg cursor-pointer hover:bg-gray-200 transition-all",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className: locationDisplay
                                                    ? "text-gray-900 font-medium"
                                                    : "text-muted-foreground",
                                                  children:
                                                    locationDisplay ||
                                                    "Байршил сонгох...",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                  lineNumber: 767,
                                                  columnNumber: 17,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__[
                                                  "ChevronDown"
                                                ],
                                                {
                                                  className: `h-5 w-5 transition-transform ${locationOpen ? "rotate-180" : ""}`,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                  lineNumber: 776,
                                                  columnNumber: 17,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 763,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        locationOpen &&
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "absolute z-50 mt-3 w-full rounded-4xl border bg-white p-6 shadow-2xl animate-in fade-in slide-in-from-top-2",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className:
                                                      "flex justify-between items-center mb-6",
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "flex gap-1.5",
                                                          children: [
                                                            1, 2, 3, 4,
                                                          ].map((i) =>
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className: `h-1.5 w-8 rounded-full ${(locationStep === "location" && i === 1) || (locationStep === "roomType" && i <= 2) || (locationStep === "subRoomType" && i <= 3) || (locationStep === "roomNumber" && i <= 4) ? "bg-blue-500" : "bg-gray-100"}`,
                                                              },
                                                              i,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                lineNumber: 785,
                                                                columnNumber: 25,
                                                              },
                                                              this,
                                                            ),
                                                          ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/components/assets/asset-form-dialog.tsx",
                                                          lineNumber: 783,
                                                          columnNumber: 21,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "flex items-center gap-2",
                                                          children: [
                                                            (location ||
                                                              roomType ||
                                                              subRoomType ||
                                                              roomNumber) &&
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "button",
                                                                {
                                                                  type: "button",
                                                                  className:
                                                                    "text-sm text-muted-foreground hover:text-foreground",
                                                                  onClick:
                                                                    () => {
                                                                      setLocation(
                                                                        "",
                                                                      );
                                                                      setRoomType(
                                                                        "",
                                                                      );
                                                                      setSubRoomType(
                                                                        "",
                                                                      );
                                                                      setRoomNumber(
                                                                        "",
                                                                      );
                                                                      setLocationStep(
                                                                        "location",
                                                                      );
                                                                      setLocationOpen(
                                                                        false,
                                                                      );
                                                                    },
                                                                  children:
                                                                    "Цэвэрлэх",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                  lineNumber: 800,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                                                "X"
                                                              ],
                                                              {
                                                                className:
                                                                  "h-5 w-5 cursor-pointer text-muted-foreground",
                                                                onClick: () =>
                                                                  setLocationOpen(
                                                                    false,
                                                                  ),
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                lineNumber: 815,
                                                                columnNumber: 23,
                                                              },
                                                              this,
                                                            ),
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/src/components/assets/asset-form-dialog.tsx",
                                                          lineNumber: 798,
                                                          columnNumber: 21,
                                                        },
                                                        this,
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-form-dialog.tsx",
                                                    lineNumber: 782,
                                                    columnNumber: 19,
                                                  },
                                                  this,
                                                ),
                                                locationStep === "location" &&
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className: "space-y-4",
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "p",
                                                          {
                                                            className:
                                                              "font-bold",
                                                            children: "Салбар?",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 823,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "input",
                                                          {
                                                            autoFocus: true,
                                                            list: "loc-opts",
                                                            value: location,
                                                            onChange: (e) =>
                                                              setLocation(
                                                                e.target.value,
                                                              ),
                                                            className:
                                                              "h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500",
                                                            onKeyDown: (e) =>
                                                              e.key ===
                                                                "Enter" &&
                                                              setLocationStep(
                                                                "roomType",
                                                              ),
                                                            placeholder:
                                                              "Сонгох / Бичих",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 824,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "datalist",
                                                          {
                                                            id: "loc-opts",
                                                            children:
                                                              locationDatalistOptions.locOpts.map(
                                                                (o) =>
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "option",
                                                                    {
                                                                      value: o,
                                                                    },
                                                                    o,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                      lineNumber: 837,
                                                                      columnNumber: 27,
                                                                    },
                                                                    this,
                                                                  ),
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "Button"
                                                          ],
                                                          {
                                                            className:
                                                              "w-full rounded-xl",
                                                            onClick: () =>
                                                              setLocationStep(
                                                                "roomType",
                                                              ),
                                                            children: "Дараах",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                      lineNumber: 822,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                locationStep === "roomType" &&
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className: "space-y-4",
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "p",
                                                          {
                                                            className:
                                                              "font-bold",
                                                            children: "Төрөл?",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 850,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "input",
                                                          {
                                                            autoFocus: true,
                                                            list: "type-opts",
                                                            value: roomType,
                                                            onChange: (e) =>
                                                              setRoomType(
                                                                e.target.value,
                                                              ),
                                                            className:
                                                              "h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500",
                                                            onKeyDown: (e) =>
                                                              e.key ===
                                                                "Enter" &&
                                                              setLocationStep(
                                                                "subRoomType",
                                                              ),
                                                            placeholder:
                                                              "Сонгох / Бичих",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 851,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "datalist",
                                                          {
                                                            id: "type-opts",
                                                            children:
                                                              locationDatalistOptions.typeOpts.map(
                                                                (o) =>
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "option",
                                                                    {
                                                                      value: o,
                                                                    },
                                                                    o,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                      lineNumber: 864,
                                                                      columnNumber: 27,
                                                                    },
                                                                    this,
                                                                  ),
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 862,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "div",
                                                          {
                                                            className:
                                                              "flex gap-2",
                                                            children: [
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "Button"
                                                                ],
                                                                {
                                                                  variant:
                                                                    "outline",
                                                                  className:
                                                                    "flex-1",
                                                                  onClick: () =>
                                                                    setLocationStep(
                                                                      "location",
                                                                    ),
                                                                  children:
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__[
                                                                        "ArrowLeft"
                                                                      ],
                                                                      {
                                                                        size: 16,
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                        lineNumber: 873,
                                                                        columnNumber: 27,
                                                                      },
                                                                      this,
                                                                    ),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                  lineNumber: 868,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "Button"
                                                                ],
                                                                {
                                                                  className:
                                                                    "flex-1",
                                                                  onClick: () =>
                                                                    setLocationStep(
                                                                      "subRoomType",
                                                                    ),
                                                                  children:
                                                                    "Дараах",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                  lineNumber: 875,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 867,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                      lineNumber: 849,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                locationStep ===
                                                  "subRoomType" &&
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className: "space-y-4",
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "p",
                                                          {
                                                            className:
                                                              "font-bold",
                                                            children: "Хэсэг?",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 886,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "input",
                                                          {
                                                            autoFocus: true,
                                                            list: "sub-type-opts",
                                                            value: subRoomType,
                                                            onChange: (e) =>
                                                              setSubRoomType(
                                                                e.target.value,
                                                              ),
                                                            className:
                                                              "h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500",
                                                            onKeyDown: (e) =>
                                                              e.key ===
                                                                "Enter" &&
                                                              setLocationStep(
                                                                "roomNumber",
                                                              ),
                                                            placeholder:
                                                              "Сонгох / Бичих",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 887,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "datalist",
                                                          {
                                                            id: "sub-type-opts",
                                                            children:
                                                              locationDatalistOptions.subTypeOpts.map(
                                                                (o) =>
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "option",
                                                                    {
                                                                      value: o,
                                                                    },
                                                                    o,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                      lineNumber: 900,
                                                                      columnNumber: 27,
                                                                    },
                                                                    this,
                                                                  ),
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 898,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "div",
                                                          {
                                                            className:
                                                              "flex gap-2",
                                                            children: [
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "Button"
                                                                ],
                                                                {
                                                                  variant:
                                                                    "outline",
                                                                  className:
                                                                    "flex-1",
                                                                  onClick: () =>
                                                                    setLocationStep(
                                                                      "roomType",
                                                                    ),
                                                                  children:
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__[
                                                                        "ArrowLeft"
                                                                      ],
                                                                      {
                                                                        size: 16,
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                        lineNumber: 909,
                                                                        columnNumber: 27,
                                                                      },
                                                                      this,
                                                                    ),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                  lineNumber: 904,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "Button"
                                                                ],
                                                                {
                                                                  className:
                                                                    "flex-1",
                                                                  onClick: () =>
                                                                    setLocationStep(
                                                                      "roomNumber",
                                                                    ),
                                                                  children:
                                                                    "Дараах",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                  lineNumber: 911,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 903,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                      lineNumber: 885,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                locationStep === "roomNumber" &&
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className: "space-y-4",
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "p",
                                                          {
                                                            className:
                                                              "font-bold",
                                                            children:
                                                              "Нарийвчилсан?",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 922,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "input",
                                                          {
                                                            autoFocus: true,
                                                            list: "final-opts",
                                                            value: roomNumber,
                                                            onChange: (e) =>
                                                              setRoomNumber(
                                                                e.target.value,
                                                              ),
                                                            className:
                                                              "h-12 w-full rounded-xl bg-gray-50 border px-4 outline-none focus:ring-2 focus:ring-blue-500",
                                                            onKeyDown: (e) =>
                                                              e.key ===
                                                                "Enter" &&
                                                              setLocationOpen(
                                                                false,
                                                              ),
                                                            placeholder:
                                                              "Сонгох / Бичих",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 923,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "datalist",
                                                          {
                                                            id: "final-opts",
                                                            children:
                                                              locationDatalistOptions.finalOpts.map(
                                                                (o) =>
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "option",
                                                                    {
                                                                      value: o,
                                                                    },
                                                                    o,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                      lineNumber: 936,
                                                                      columnNumber: 27,
                                                                    },
                                                                    this,
                                                                  ),
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 934,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "div",
                                                          {
                                                            className:
                                                              "flex gap-2",
                                                            children: [
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "Button"
                                                                ],
                                                                {
                                                                  variant:
                                                                    "outline",
                                                                  className:
                                                                    "flex-1",
                                                                  onClick: () =>
                                                                    setLocationStep(
                                                                      "subRoomType",
                                                                    ),
                                                                  children:
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__[
                                                                        "ArrowLeft"
                                                                      ],
                                                                      {
                                                                        size: 16,
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                        lineNumber: 945,
                                                                        columnNumber: 27,
                                                                      },
                                                                      this,
                                                                    ),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                  lineNumber: 940,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "Button"
                                                                ],
                                                                {
                                                                  className:
                                                                    "flex-1 bg-blue-600 text-white",
                                                                  onClick: () =>
                                                                    setLocationOpen(
                                                                      false,
                                                                    ),
                                                                  children: [
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__[
                                                                        "Check"
                                                                      ],
                                                                      {
                                                                        size: 16,
                                                                        className:
                                                                          "mr-2",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                        lineNumber: 951,
                                                                        columnNumber: 27,
                                                                      },
                                                                      this,
                                                                    ),
                                                                    " Дуусгах",
                                                                  ],
                                                                },
                                                                void 0,
                                                                true,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                                  lineNumber: 947,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 939,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                      lineNumber: 921,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 781,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 762,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 758,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "space-y-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-lg font-semibold text-foreground",
                                            children: "Худалдан авсан огноо",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 963,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "Input"
                                          ],
                                          {
                                            type: "date",
                                            value: purchaseDate,
                                            onChange: (event) =>
                                              setPurchaseDate(
                                                event.target.value,
                                              ),
                                            placeholder: "yyyy.mm.dd",
                                            className:
                                              "date-input-right h-12 rounded-2xl border-0 bg-gray-100 pr-12 text-base shadow-none focus:ring-0",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 966,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 962,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "space-y-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-lg font-semibold text-foreground",
                                            children: "Худалдан авсан үнэ (₮)",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 975,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "Input"
                                          ],
                                          {
                                            type: "number",
                                            min: 0,
                                            value: purchasePrice,
                                            onChange: (event) =>
                                              setPurchasePrice(
                                                event.target.value,
                                              ),
                                            placeholder: "1500",
                                            className:
                                              "h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 978,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 974,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 961,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "space-y-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-lg font-semibold text-foreground",
                                            children: "Серийн дугаар",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 991,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className: "relative",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "Input"
                                                ],
                                                {
                                                  value: serialNumber,
                                                  onChange: (event) =>
                                                    setSerialNumber(
                                                      event.target.value,
                                                    ),
                                                  onKeyDown: (event) => {
                                                    if (event.key === "Enter") {
                                                      event.preventDefault();
                                                      handleAddSerial();
                                                    }
                                                  },
                                                  placeholder: "SN123456789",
                                                  className:
                                                    "h-12 rounded-2xl border-0 bg-gray-100 pr-20 text-base shadow-none focus:ring-0",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                  lineNumber: 995,
                                                  columnNumber: 17,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "Button"
                                                ],
                                                {
                                                  type: "button",
                                                  onClick: handleAddSerial,
                                                  disabled:
                                                    !serialNumber.trim(),
                                                  className:
                                                    "absolute right-2 top-1/2 h-9 -translate-y-1/2 rounded-xl px-4",
                                                  children: "Add",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                  lineNumber: 1007,
                                                  columnNumber: 17,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 994,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        serialItems.length > 0 &&
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "flex flex-wrap gap-2 pt-1",
                                              children: serialItems.map(
                                                (item, index) =>
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className:
                                                        "flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-foreground",
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "span",
                                                          {
                                                            children: item,
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 1023,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "Button"
                                                          ],
                                                          {
                                                            type: "button",
                                                            size: "icon",
                                                            variant: "ghost",
                                                            className:
                                                              "h-5 w-5 rounded-full text-muted-foreground hover:text-destructive",
                                                            onClick: () => {
                                                              setSerialItems(
                                                                (prev) =>
                                                                  prev.filter(
                                                                    (_, idx) =>
                                                                      idx !==
                                                                      index,
                                                                  ),
                                                              );
                                                            },
                                                            children: "×",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                                            lineNumber: 1024,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                      ],
                                                    },
                                                    `${item}-${index}`,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                      lineNumber: 1019,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 1017,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 990,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "space-y-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-lg font-semibold text-foreground",
                                            children: "Хөрөнгийн ID",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 1043,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "Input"
                                          ],
                                          {
                                            value: assetId,
                                            onChange: (event) => {
                                              setAssetId(event.target.value);
                                              setAssetIdAuto(false);
                                            },
                                            placeholder: "LAP-2024-013",
                                            className:
                                              "h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0 w-full",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-form-dialog.tsx",
                                            lineNumber: 1046,
                                            columnNumber: 15,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 1042,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 989,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            mode === "edit" &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "space-y-2",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "text-lg font-semibold text-foreground",
                                        children: "Хуваарилсан ажилтан",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                        lineNumber: 1060,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Select"
                                      ],
                                      {
                                        value: assignedEmployeeId || "none",
                                        onValueChange: (value) =>
                                          setAssignedEmployeeId(
                                            value === "none" ? "" : value,
                                          ),
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "SelectTrigger"
                                            ],
                                            {
                                              className:
                                                "rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0 w-full p-6",
                                              children: /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "SelectValue"
                                                ],
                                                {
                                                  placeholder: "Ажилтан сонгох",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                                  lineNumber: 1070,
                                                  columnNumber: 19,
                                                },
                                                this,
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 1069,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "SelectContent"
                                            ],
                                            {
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectItem"
                                                  ],
                                                  {
                                                    value: "none",
                                                    children: "Хуваарилаагүй",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-form-dialog.tsx",
                                                    lineNumber: 1073,
                                                    columnNumber: 19,
                                                  },
                                                  this,
                                                ),
                                                (
                                                  employeesData?.employees ?? []
                                                ).map((employee) =>
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "SelectItem"
                                                    ],
                                                    {
                                                      value: employee.id,
                                                      children: [
                                                        employee.firstName,
                                                        " ",
                                                        employee.lastName,
                                                      ],
                                                    },
                                                    employee.id,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                                      lineNumber: 1075,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 1072,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                        lineNumber: 1063,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-form-dialog.tsx",
                                  lineNumber: 1059,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "space-y-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className:
                                        "text-lg font-semibold text-foreground",
                                      children: "Тэмдэглэл",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 1085,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: note,
                                      onChange: (event) =>
                                        setNote(event.target.value),
                                      placeholder: "Нэмэлт тайлбар оруулах",
                                      className:
                                        "h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 1086,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 1084,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "space-y-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className:
                                        "text-lg font-semibold text-foreground",
                                      children: "Хөрөнгийн зураг",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 1095,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "flex flex-col gap-3 sm:flex-row sm:items-center",
                                      children: /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Input"
                                        ],
                                        {
                                          type: "file",
                                          accept: "image/*",
                                          onChange: (event) =>
                                            setAssetImage(
                                              event.target.files?.[0] ?? null,
                                            ),
                                          className:
                                            "h-12 rounded-2xl border-0 bg-gray-100 text-base shadow-none focus:ring-0",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-form-dialog.tsx",
                                          lineNumber: 1099,
                                          columnNumber: 15,
                                        },
                                        this,
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-form-dialog.tsx",
                                      lineNumber: 1098,
                                      columnNumber: 13,
                                    },
                                    this,
                                  ),
                                  imageUploadStatus === "uploading" &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "text-xs text-muted-foreground",
                                        children: "Зураг ачаалж байна...",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                        lineNumber: 1109,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  imageUploadStatus === "error" &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "text-xs text-destructive",
                                        children: imageUploadError,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-form-dialog.tsx",
                                        lineNumber: 1114,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  assetImagePreview || imageUrl
                                    ? /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "overflow-hidden rounded-2xl border border-border bg-muted/20",
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "img",
                                            {
                                              src:
                                                assetImagePreview ??
                                                imageUrl ??
                                                "",
                                              alt: "Хөрөнгийн зураг",
                                              className:
                                                "h-44 w-full object-cover",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-form-dialog.tsx",
                                              lineNumber: 1118,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-form-dialog.tsx",
                                          lineNumber: 1117,
                                          columnNumber: 15,
                                        },
                                        this,
                                      )
                                    : /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "p",
                                        {
                                          className:
                                            "text-xs text-muted-foreground",
                                          children:
                                            "Зураг сонговол энд preview харагдана.",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-form-dialog.tsx",
                                          lineNumber: 1125,
                                          columnNumber: 15,
                                        },
                                        this,
                                      ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 1094,
                                columnNumber: 11,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-form-dialog.tsx",
                          lineNumber: 716,
                          columnNumber: 9,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogFooter"
                        ],
                        {
                          className: "gap-2 sm:gap-0",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                variant: "outline",
                                className: "h-12 rounded-2xl px-6 text-lg",
                                onClick: () => onOpenChange(false),
                                children: "Цуцлах",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 1133,
                                columnNumber: 11,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                onClick: handleAddAsset,
                                disabled:
                                  !assetId ||
                                  !subCategory.trim() ||
                                  !purchaseDate ||
                                  isSaving ||
                                  imageUploadStatus === "uploading",
                                className: "h-12 rounded-2xl px-6 text-lg",
                                children: isSaving
                                  ? "Хадгалж байна..."
                                  : mode === "edit"
                                    ? "Хадгалах"
                                    : "Хөрөнгө нэмэх",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-form-dialog.tsx",
                                lineNumber: 1140,
                                columnNumber: 11,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-form-dialog.tsx",
                          lineNumber: 1132,
                          columnNumber: 9,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-form-dialog.tsx",
                    lineNumber: 672,
                    columnNumber: 7,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/components/assets/asset-form-dialog.tsx",
                lineNumber: 671,
                columnNumber: 5,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$csv$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "CsvUploadDialog"
              ],
              {
                open: showCsvUploadDialog,
                onOpenChange: setShowCsvUploadDialog,
                onAddAssets: onAddAssets,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/components/assets/asset-form-dialog.tsx",
                lineNumber: 1160,
                columnNumber: 5,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
      );
    }
    _s(AssetFormDialog, "T6VQCVjPL9C2DyUqw6u6tKyIkQg=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
      ];
    });
    _c = AssetFormDialog;
    var _c;
    __turbopack_context__.k.register(_c, "AssetFormDialog");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/asset-card.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetCard", () => AssetCard]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/card.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/constants.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/image.js [app-client] (ecmascript)",
      );
    ("use client");
    function AssetCard({
      asset,
      selected,
      onToggleSelect,
      onOpenQr,
      onEdit,
      onDelete,
    }) {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "Card"
        ],
        {
          className: "overflow-hidden border-border",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "relative h-48 w-full bg-muted/30 overflow-hidden",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "label",
                    {
                      className:
                        "absolute z-10 left-2 top-2 flex items-center gap-2 rounded-full bg-white/90 px-2 py-1 text-xs text-foreground shadow cursor-pointer",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "input",
                          {
                            type: "checkbox",
                            checked: selected,
                            onChange: () => onToggleSelect(asset.id),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 33,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "span",
                          {
                            className: "select-none",
                            children: "Select",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 38,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-card.tsx",
                      lineNumber: 32,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  asset.imageUrl
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "default"
                        ],
                        {
                          src: asset.imageUrl,
                          alt: asset.assetId,
                          fill: true,
                          className: "object-cover",
                          sizes: "(max-width: 768px) 100vw, 280px",
                          loading: "lazy",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-card.tsx",
                          lineNumber: 42,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "flex h-full w-full items-center justify-center text-sm text-muted-foreground",
                          children: "No image",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-card.tsx",
                          lineNumber: 51,
                          columnNumber: 11,
                        },
                        this,
                      ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/components/assets/asset-card.tsx",
                lineNumber: 31,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "CardContent"
              ],
              {
                className: "p-4",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex items-start justify-between gap-2",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className:
                                    "text-sm font-semibold text-foreground",
                                  children: asset.assetId,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-card.tsx",
                                  lineNumber: 60,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xs text-muted-foreground",
                                  children:
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "CATEGORY_LABELS"
                                    ][asset.category],
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-card.tsx",
                                  lineNumber: 63,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 59,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "span",
                          {
                            className:
                              "rounded-full bg-muted px-2 py-1 text-[10px] uppercase text-muted-foreground",
                            children: asset.status,
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 67,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-card.tsx",
                      lineNumber: 58,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "mt-3 space-y-1 text-xs text-muted-foreground",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            children: ["Serial: ", asset.serialNumber],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 73,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            children: ["Location: ", asset.location || "—"],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 74,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            children: [
                              "Date: ",
                              new Date(asset.purchaseDate).toLocaleDateString(),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 75,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            children: [
                              "Value: $",
                              asset.currentBookValue.toLocaleString(),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 76,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-card.tsx",
                      lineNumber: 72,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "mt-4 flex items-center justify-end gap-1",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: `/assets/${asset.id}`,
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                variant: "ghost",
                                size: "icon",
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__[
                                    "Eye"
                                  ],
                                  {
                                    className: "h-4 w-4",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-card.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-card.tsx",
                                lineNumber: 81,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 80,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "ghost",
                            size: "icon",
                            onClick: () => onOpenQr([asset]),
                            children: "QR",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 85,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "ghost",
                            size: "icon",
                            onClick: () => onEdit(asset),
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__[
                                "Pencil"
                              ],
                              {
                                className: "h-4 w-4",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-card.tsx",
                                lineNumber: 89,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 88,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "text-destructive",
                            onClick: () => onDelete(asset.id),
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__[
                                "Trash2"
                              ],
                              {
                                className: "h-4 w-4",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-card.tsx",
                                lineNumber: 97,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-card.tsx",
                            lineNumber: 91,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-card.tsx",
                      lineNumber: 79,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/components/assets/asset-card.tsx",
                lineNumber: 57,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/components/assets/asset-card.tsx",
          lineNumber: 29,
          columnNumber: 5,
        },
        this,
      );
    }
    _c = AssetCard;
    var _c;
    __turbopack_context__.k.register(_c, "AssetCard");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/assets-grid.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetsGrid", () => AssetsGrid]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        "[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/asset-card.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/card.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/table.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/constants.ts [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function categoryLabel(category) {
      return (
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "CATEGORY_LABELS"
        ][category] ?? category
      );
    }
    function AssetsGrid({
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
      showTableOnly = false,
      viewMode = "list",
      categoryNameById,
    }) {
      _s();
      const showTable = showTableOnly && viewMode === "list";
      const showByType = viewMode === "byType";
      const UNKNOWN_CATEGORY_KEY = "__unknown__";
      const categoryDisplayName = (categoryKey) => {
        if (categoryKey === UNKNOWN_CATEGORY_KEY) return "Тодорхойгүй";
        return (
          categoryNameById?.get(categoryKey) ??
          categoryLabel(categoryKey) ??
          categoryKey
        );
      };
      const assetsByType = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsGrid.useMemo[assetsByType]": () => {
            if (!showByType) return [];
            const byCategory = new Map();
            assets.forEach(
              {
                "AssetsGrid.useMemo[assetsByType]": (a) => {
                  const raw = a.category ?? "";
                  const key = raw.trim() ? raw : UNKNOWN_CATEGORY_KEY;
                  if (!byCategory.has(key)) byCategory.set(key, []);
                  byCategory.get(key).push(a);
                },
              }["AssetsGrid.useMemo[assetsByType]"],
            );
            return Array.from(byCategory.entries())
              .map(
                {
                  "AssetsGrid.useMemo[assetsByType]": ([category, list]) => ({
                    category,
                    assets: list,
                  }),
                }["AssetsGrid.useMemo[assetsByType]"],
              )
              .sort(
                {
                  "AssetsGrid.useMemo[assetsByType]": (a, b) =>
                    categoryDisplayName(a.category).localeCompare(
                      categoryDisplayName(b.category),
                    ),
                }["AssetsGrid.useMemo[assetsByType]"],
              );
          },
        }["AssetsGrid.useMemo[assetsByType]"],
        [assets, showByType, categoryNameById],
      );
      const fallbackImageUrl =
        typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "default"
        ] !== "undefined" && ("TURBOPACK compile-time value", "/Monitor.jpg")
          ? ("TURBOPACK compile-time value", "/Monitor.jpg")
          : undefined;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "Card"
        ],
        {
          className: "bg-card border-border",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "CardHeader"
              ],
              {
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "CardTitle"
                  ],
                  {
                    className: "text-card-foreground",
                    children: ["Эд хөрөнгө (", assets.length, ")"],
                  },
                  void 0,
                  true,
                  {
                    fileName: "[project]/src/components/assets/assets-grid.tsx",
                    lineNumber: 110,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/assets-grid.tsx",
                lineNumber: 109,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "CardContent"
              ],
              {
                children: [
                  activeTags.length > 0 &&
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "mb-4 flex flex-wrap gap-2",
                        children: activeTags.map((tag) =>
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "button",
                            {
                              type: "button",
                              onClick: () => onRemoveTag(tag.group, tag.value),
                              className:
                                "rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-foreground",
                              children: [tag.label, " ×"],
                            },
                            `${tag.group}-${tag.value}`,
                            true,
                            {
                              fileName:
                                "[project]/src/components/assets/assets-grid.tsx",
                              lineNumber: 118,
                              columnNumber: 15,
                            },
                            this,
                          ),
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/src/components/assets/assets-grid.tsx",
                        lineNumber: 116,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "mb-4 flex flex-wrap items-center gap-2",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "outline",
                            size: "sm",
                            onClick: onSelectAll,
                            children: "Select all",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 130,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "outline",
                            size: "sm",
                            onClick: onSelectFirstFour,
                            children: "Select 4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 133,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "outline",
                            size: "sm",
                            onClick: onClearSelection,
                            children: "Clear",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 136,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "outline",
                            size: "sm",
                            onClick: () => {
                              const selected = assets.filter((asset) =>
                                selectedIds.has(asset.id),
                              );
                              if (selected.length > 0) onOpenQr(selected);
                            },
                            disabled: selectedIds.size === 0,
                            children: "QR Selected",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 139,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "span",
                          {
                            className: "text-xs text-muted-foreground",
                            children: ["Selected: ", selectedIds.size],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 152,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-grid.tsx",
                      lineNumber: 129,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  loading &&
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "py-8 text-center text-muted-foreground",
                        children: "Ачаалж байна...",
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/src/components/assets/assets-grid.tsx",
                        lineNumber: 157,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  error &&
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "py-8 text-center text-destructive",
                        children: error.message,
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/src/components/assets/assets-grid.tsx",
                        lineNumber: 162,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  showByType
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                          children: assetsByType.map(
                            ({ category, assets: list }) => {
                              const firstWithImage =
                                list.find((a) => a.imageUrl) ?? list[0];
                              const imageUrl =
                                firstWithImage?.imageUrl ??
                                fallbackImageUrl ??
                                undefined;
                              const displayName = categoryDisplayName(category);
                              return /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "Card"
                                ],
                                {
                                  className: "overflow-hidden border-border",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "relative h-40 w-full bg-muted/30",
                                        children: imageUrl
                                          ? /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "img",
                                              {
                                                src: imageUrl,
                                                alt: displayName,
                                                className:
                                                  "h-full w-full object-cover",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 180,
                                                columnNumber: 23,
                                              },
                                              this,
                                            )
                                          : /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "flex h-full w-full items-center justify-center text-sm text-muted-foreground",
                                                children: "No image",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 186,
                                                columnNumber: 23,
                                              },
                                              this,
                                            ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/assets-grid.tsx",
                                        lineNumber: 178,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "CardContent"
                                      ],
                                      {
                                        className: "p-4",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-lg font-bold uppercase tracking-tight text-foreground",
                                              children: displayName,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/assets-grid.tsx",
                                              lineNumber: 192,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "mt-1 text-base font-medium text-foreground",
                                              children: [
                                                list.length,
                                                " ширхэг",
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/assets-grid.tsx",
                                              lineNumber: 195,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/assets-grid.tsx",
                                        lineNumber: 191,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                category,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-grid.tsx",
                                  lineNumber: 174,
                                  columnNumber: 17,
                                },
                                this,
                              );
                            },
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/assets-grid.tsx",
                          lineNumber: 167,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : showTable
                      ? /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "overflow-x-auto rounded-md border border-border",
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Table"
                              ],
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHeader"
                                    ],
                                    {
                                      children: /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableRow"
                                        ],
                                        {
                                          className: "border-border",
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "w-10 text-muted-foreground",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "text-muted-foreground",
                                                children: "Код",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "text-muted-foreground",
                                                children: "Ангилал",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 210,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "text-muted-foreground",
                                                children: "Байршил",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 211,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "text-muted-foreground",
                                                children: "Сериал",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 212,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "text-muted-foreground",
                                                children: "Төлөв",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 213,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "text-muted-foreground",
                                                children: "Огноо",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 214,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "text-muted-foreground",
                                                children: "Үнэ",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 215,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "TableHead"
                                              ],
                                              {
                                                className:
                                                  "w-32 text-muted-foreground",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/assets-grid.tsx",
                                                lineNumber: 216,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-grid.tsx",
                                          lineNumber: 207,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/assets-grid.tsx",
                                      lineNumber: 206,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableBody"
                                    ],
                                    {
                                      children: assets.map((asset) =>
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "TableRow"
                                          ],
                                          {
                                            className: "border-border",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "input",
                                                    {
                                                      type: "checkbox",
                                                      checked: selectedIds.has(
                                                        asset.id,
                                                      ),
                                                      onChange: () =>
                                                        onToggleSelect(
                                                          asset.id,
                                                        ),
                                                      className:
                                                        "rounded border-border",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/assets-grid.tsx",
                                                      lineNumber: 223,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 222,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  className:
                                                    "font-medium text-foreground",
                                                  children: asset.assetId,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 230,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  className:
                                                    "text-muted-foreground",
                                                  children: categoryLabel(
                                                    asset.category,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 233,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  className:
                                                    "text-muted-foreground",
                                                  children:
                                                    asset.location ?? "—",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 236,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  className:
                                                    "font-mono text-xs text-muted-foreground",
                                                  children: asset.serialNumber,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 239,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase text-muted-foreground",
                                                      children: asset.status,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/assets-grid.tsx",
                                                      lineNumber: 243,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 242,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  className:
                                                    "text-muted-foreground",
                                                  children: new Date(
                                                    asset.purchaseDate,
                                                  ).toLocaleDateString(),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 247,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  className:
                                                    "text-muted-foreground",
                                                  children: [
                                                    "$",
                                                    asset.currentBookValue.toLocaleString(),
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 250,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "TableCell"
                                                ],
                                                {
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className:
                                                        "flex items-center gap-1",
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "default"
                                                          ],
                                                          {
                                                            href: `/assets/${asset.id}`,
                                                            children:
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "Button"
                                                                ],
                                                                {
                                                                  variant:
                                                                    "ghost",
                                                                  size: "icon",
                                                                  children:
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__[
                                                                        "Eye"
                                                                      ],
                                                                      {
                                                                        className:
                                                                          "h-4 w-4",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/components/assets/assets-grid.tsx",
                                                                        lineNumber: 257,
                                                                        columnNumber: 29,
                                                                      },
                                                                      this,
                                                                    ),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                                  lineNumber: 256,
                                                                  columnNumber: 27,
                                                                },
                                                                this,
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/assets-grid.tsx",
                                                            lineNumber: 255,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "Button"
                                                          ],
                                                          {
                                                            variant: "ghost",
                                                            size: "icon",
                                                            onClick: () =>
                                                              onOpenQr([asset]),
                                                            children: "QR",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/assets-grid.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "Button"
                                                          ],
                                                          {
                                                            variant: "ghost",
                                                            size: "icon",
                                                            onClick: () =>
                                                              onEdit(asset),
                                                            children:
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__[
                                                                  "Pencil"
                                                                ],
                                                                {
                                                                  className:
                                                                    "h-4 w-4",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                                  lineNumber: 272,
                                                                  columnNumber: 27,
                                                                },
                                                                this,
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/assets-grid.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "Button"
                                                          ],
                                                          {
                                                            variant: "ghost",
                                                            size: "icon",
                                                            onClick: () =>
                                                              onDelete(
                                                                asset.id,
                                                              ),
                                                            children:
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__[
                                                                  "Trash2"
                                                                ],
                                                                {
                                                                  className:
                                                                    "h-4 w-4",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                                  lineNumber: 279,
                                                                  columnNumber: 27,
                                                                },
                                                                this,
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/assets-grid.tsx",
                                                            lineNumber: 274,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/assets-grid.tsx",
                                                      lineNumber: 254,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-grid.tsx",
                                                  lineNumber: 253,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          asset.id,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/assets-grid.tsx",
                                            lineNumber: 221,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/assets-grid.tsx",
                                      lineNumber: 219,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/assets-grid.tsx",
                                lineNumber: 205,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 204,
                            columnNumber: 11,
                          },
                          this,
                        )
                      : /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                            children: assets.map((asset) =>
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "AssetCard"
                                ],
                                {
                                  asset: asset,
                                  selected: selectedIds.has(asset.id),
                                  onToggleSelect: onToggleSelect,
                                  onOpenQr: onOpenQr,
                                  onEdit: onEdit,
                                  onDelete: onDelete,
                                },
                                asset.id,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-grid.tsx",
                                  lineNumber: 291,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 289,
                            columnNumber: 11,
                          },
                          this,
                        ),
                  assets.length === 0 &&
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "py-12 text-center",
                        children: /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            className: "text-muted-foreground",
                            children: "Шүүлтүүрт тохирох эд хөрөнгө олдсонгүй.",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-grid.tsx",
                            lineNumber: 305,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/src/components/assets/assets-grid.tsx",
                        lineNumber: 304,
                        columnNumber: 11,
                      },
                      this,
                    ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/components/assets/assets-grid.tsx",
                lineNumber: 114,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/components/assets/assets-grid.tsx",
          lineNumber: 108,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AssetsGrid, "DIryBsWH2TKk1d5na9eJkDXTuHY=");
    _c = AssetsGrid;
    var _c;
    __turbopack_context__.k.register(_c, "AssetsGrid");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/assets-search-bar.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetsSearchBar", () => AssetsSearchBar]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/card.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/select.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/constants.ts [app-client] (ecmascript)",
      );
    ("use client");
    function AssetsSearchBar({
      searchQuery,
      onSearchChange,
      statusFilter,
      onStatusChange,
      categoryFilter,
      onCategoryChange,
    }) {
      const categoryEntries = Object.entries(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "CATEGORY_LABELS"
        ],
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "Card"
        ],
        {
          className: "bg-card border-border",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "CardContent"
            ],
            {
              className: "p-4",
              children: /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className: "flex flex-col gap-4 sm:flex-row sm:items-center",
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "relative flex-1",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__[
                              "Search"
                            ],
                            {
                              className:
                                "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/components/assets/assets-search-bar.tsx",
                              lineNumber: 42,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "Input"
                            ],
                            {
                              placeholder:
                                "Эд хөрөнгийн ID, серийн дугаар эсвэл ажилтнаар хайх...",
                              value: searchQuery,
                              onChange: (e) => onSearchChange(e.target.value),
                              className: "pl-9 bg-secondary border-0",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/components/assets/assets-search-bar.tsx",
                              lineNumber: 43,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/src/components/assets/assets-search-bar.tsx",
                        lineNumber: 41,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "flex gap-2",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "Select"
                            ],
                            {
                              value: statusFilter,
                              onValueChange: onStatusChange,
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "SelectTrigger"
                                  ],
                                  {
                                    className:
                                      "w-[160px] bg-secondary border-0",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__[
                                          "Filter"
                                        ],
                                        {
                                          className: "mr-2 h-4 w-4",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 53,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectValue"
                                        ],
                                        {
                                          placeholder: "Төлөв",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 54,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/assets-search-bar.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "SelectContent"
                                  ],
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectItem"
                                        ],
                                        {
                                          value: "all",
                                          children: "Бүх төлөв",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 57,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectItem"
                                        ],
                                        {
                                          value: "AVAILABLE",
                                          children: "Бэлэн",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 58,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectItem"
                                        ],
                                        {
                                          value: "ASSIGNED",
                                          children: "Хуваарилсан",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 59,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectItem"
                                        ],
                                        {
                                          value: "IN_REPAIR",
                                          children: "Засварт",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 60,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectItem"
                                        ],
                                        {
                                          value: "PENDING_DISPOSAL",
                                          children: "Устгал хүлээж буй",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 61,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectItem"
                                        ],
                                        {
                                          value: "DISPOSED",
                                          children: "Устсан",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 64,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/assets-search-bar.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/components/assets/assets-search-bar.tsx",
                              lineNumber: 51,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "Select"
                            ],
                            {
                              value: categoryFilter,
                              onValueChange: onCategoryChange,
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "SelectTrigger"
                                  ],
                                  {
                                    className:
                                      "w-[160px] bg-secondary border-0",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "SelectValue"
                                      ],
                                      {
                                        placeholder: "Ангилал",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/assets-search-bar.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/assets-search-bar.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "SelectContent"
                                  ],
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "SelectItem"
                                        ],
                                        {
                                          value: "all",
                                          children: "Бүх ангилал",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/assets-search-bar.tsx",
                                          lineNumber: 72,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      categoryEntries.map(([value, label]) =>
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "SelectItem"
                                          ],
                                          {
                                            value: value,
                                            children: label,
                                          },
                                          value,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/assets-search-bar.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/assets-search-bar.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/components/assets/assets-search-bar.tsx",
                              lineNumber: 67,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "Button"
                            ],
                            {
                              variant: "outline",
                              size: "icon",
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__[
                                  "Download"
                                ],
                                {
                                  className: "h-4 w-4",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-search-bar.tsx",
                                  lineNumber: 81,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/components/assets/assets-search-bar.tsx",
                              lineNumber: 80,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/src/components/assets/assets-search-bar.tsx",
                        lineNumber: 50,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "[project]/src/components/assets/assets-search-bar.tsx",
                  lineNumber: 40,
                  columnNumber: 9,
                },
                this,
              ),
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/assets/assets-search-bar.tsx",
              lineNumber: 39,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/components/assets/assets-search-bar.tsx",
          lineNumber: 38,
          columnNumber: 5,
        },
        this,
      );
    }
    _c = AssetsSearchBar;
    var _c;
    __turbopack_context__.k.register(_c, "AssetsSearchBar");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/assets-content.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetsContent", () => AssetsContent]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        "[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/graphql.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$form$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/asset-form-dialog.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$assets$2d$grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/assets-grid.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$assets$2d$search$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/assets-search-bar.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$fragment$2d$masking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/fragment-masking.ts [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    const LOCATION_TYPES = ["branch", "roomType", "section", "room"];
    /** Root + бүх доод байршлын ID-ууд (asset.locationId аль ч түвшинд байж болно) */ function getAllIdsUnder(
      locId,
      childrenByParent,
    ) {
      const children = childrenByParent.get(locId) ?? [];
      const descendantIds = children.flatMap((c) =>
        getAllIdsUnder(c.id, childrenByParent),
      );
      return [locId, ...descendantIds];
    }
    function AssetsContent() {
      _s();
      const [searchQuery, setSearchQuery] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("all");
      const [categoryFilter, setCategoryFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("all");
      const [assetItems, setAssetItems] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [showAddDialog, setShowAddDialog] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [editAsset, setEditAsset] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [selectedIds, setSelectedIds] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(new Set());
      const [qrAssets, setQrAssets] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [filterState, setFilterState] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])({
        locationIds: new Set(),
        category: new Set(),
        subCategory: new Set(),
      });
      const [viewMode, setViewMode] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("list");
      const locationsFromApi =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "GetLocationsDocument"
          ],
        ).data?.locations ?? [];
      const locationTree = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsContent.useMemo[locationTree]": () => {
            const list = locationsFromApi;
            const byParent = new Map();
            list.forEach(
              {
                "AssetsContent.useMemo[locationTree]": (loc) => {
                  const key = loc.parentId ?? null;
                  if (!byParent.has(key)) byParent.set(key, []);
                  byParent.get(key).push(loc);
                },
              }["AssetsContent.useMemo[locationTree]"],
            );
            LOCATION_TYPES.forEach(
              {
                "AssetsContent.useMemo[locationTree]": (t) =>
                  byParent.get(t)?.sort(
                    {
                      "AssetsContent.useMemo[locationTree]": (a, b) =>
                        a.name.localeCompare(b.name),
                    }["AssetsContent.useMemo[locationTree]"],
                  ),
              }["AssetsContent.useMemo[locationTree]"],
            );
            return {
              list,
              byParent,
            };
          },
        }["AssetsContent.useMemo[locationTree]"],
        [locationsFromApi],
      );
      const resolvedLocationIdsForApi = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsContent.useMemo[resolvedLocationIdsForApi]": () => {
            const selected = filterState.locationIds;
            if (selected.size === 0) return undefined;
            const ids = new Set();
            selected.forEach(
              {
                "AssetsContent.useMemo[resolvedLocationIdsForApi]": (id) =>
                  getAllIdsUnder(id, locationTree.byParent).forEach(
                    {
                      "AssetsContent.useMemo[resolvedLocationIdsForApi]": (
                        lid,
                      ) => ids.add(lid),
                    }["AssetsContent.useMemo[resolvedLocationIdsForApi]"],
                  ),
              }["AssetsContent.useMemo[resolvedLocationIdsForApi]"],
            );
            return Array.from(ids);
          },
        }["AssetsContent.useMemo[resolvedLocationIdsForApi]"],
        [filterState.locationIds, locationTree],
      );
      const assetsQueryVariables = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsContent.useMemo[assetsQueryVariables]": () => ({
            office: undefined,
            categoryIds:
              filterState.category.size > 0
                ? Array.from(filterState.category)
                : undefined,
            subCategoryIds:
              filterState.subCategory.size > 0
                ? Array.from(filterState.subCategory)
                : undefined,
            locationIds: resolvedLocationIdsForApi,
          }),
        }["AssetsContent.useMemo[assetsQueryVariables]"],
        [
          filterState.category,
          filterState.subCategory,
          resolvedLocationIdsForApi,
        ],
      );
      const { data, loading, error, refetch } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetAssetsDocument"
        ],
        {
          variables: assetsQueryVariables,
          fetchPolicy: "cache-first",
        },
      );
      const { data: categoriesData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "CategoriesDocument"
        ],
      );
      const [deleteAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "DeleteAssetDocument"
        ],
      );
      const categoryNameById = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsContent.useMemo[categoryNameById]": () => {
            const map = new Map();
            (categoriesData?.categories ?? []).forEach(
              {
                "AssetsContent.useMemo[categoryNameById]": (category) => {
                  map.set(category.id, category.name);
                  category.subcategories?.forEach(
                    {
                      "AssetsContent.useMemo[categoryNameById]": (sub) =>
                        map.set(sub.id, sub.name),
                    }["AssetsContent.useMemo[categoryNameById]"],
                  );
                },
              }["AssetsContent.useMemo[categoryNameById]"],
            );
            return map;
          },
        }["AssetsContent.useMemo[categoryNameById]"],
        [categoriesData?.categories],
      );
      const mapGraphqlAssetToLocal = (asset) => ({
        imageUrl:
          asset.imageUrl ??
          ("TURBOPACK compile-time value", "/Monitor.jpg") ??
          undefined,
        id: asset.id,
        assetId: asset.assetTag,
        category: asset.category,
        mainCategory: undefined,
        location: asset.locationPath ?? asset.locationId ?? undefined,
        serialNumber: asset.serialNumber,
        purchaseCost: asset.purchaseCost ?? 0,
        residualValue: 0,
        usefulLife: 0,
        purchaseDate: asset.purchaseDate
          ? new Date(asset.purchaseDate).toISOString()
          : new Date().toISOString(),
        currentBookValue: asset.currentBookValue ?? asset.purchaseCost ?? 0,
        status: asset.status,
        assignedEmployeeId: asset.assignedTo ?? undefined,
        assignedEmployeeName: undefined,
        createdAt: new Date(asset.createdAt).toISOString(),
        updatedAt: new Date(asset.updatedAt).toISOString(),
      });
      const remoteAssets = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsContent.useMemo[remoteAssets]": () => {
            var _s = __turbopack_context__.k.signature();
            if (!data?.assets) return [];
            return data.assets.map(
              _s(
                {
                  "AssetsContent.useMemo[remoteAssets]": (a) => {
                    _s();
                    const unmaskedAsset = (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$fragment$2d$masking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "useFragment"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "AssetFieldsFragmentDoc"
                      ],
                      a,
                    );
                    return mapGraphqlAssetToLocal(unmaskedAsset);
                  },
                }["AssetsContent.useMemo[remoteAssets]"],
                "54YZLYqAOYWizImroShEHB8Le18=",
                false,
                {
                  "AssetsContent.useMemo[remoteAssets]": function () {
                    return [
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$fragment$2d$masking$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "useFragment"
                      ],
                    ];
                  },
                }["AssetsContent.useMemo[remoteAssets]"],
              ),
            );
          },
        }["AssetsContent.useMemo[remoteAssets]"],
        [data?.assets],
      );
      const mergedAssets = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsContent.useMemo[mergedAssets]": () => {
            if (assetItems.length === 0) return remoteAssets;
            const seen = new Set(
              remoteAssets.map(
                {
                  "AssetsContent.useMemo[mergedAssets]": (asset) => asset.id,
                }["AssetsContent.useMemo[mergedAssets]"],
              ),
            );
            const merged = [...remoteAssets];
            assetItems.forEach(
              {
                "AssetsContent.useMemo[mergedAssets]": (asset) => {
                  if (!seen.has(asset.id)) {
                    merged.push(asset);
                  }
                },
              }["AssetsContent.useMemo[mergedAssets]"],
            );
            return merged;
          },
        }["AssetsContent.useMemo[mergedAssets]"],
        [assetItems, remoteAssets],
      );
      const filteredAssets = mergedAssets.filter((asset) => {
        const matchesSearch =
          asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.serialNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          asset.assignedEmployeeName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || asset.status === statusFilter;
        const matchesCategory =
          categoryFilter === "all" || asset.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      });
      const toggleFilter = (group, value) => {
        setFilterState((prev) => {
          const next = {
            ...prev,
            [group]: new Set(prev[group]),
          };
          if (next[group].has(value)) {
            next[group].delete(value);
          } else {
            next[group].add(value);
          }
          return next;
        });
      };
      const toggleFilterLocationByIds = (ids) => {
        setFilterState((prev) => {
          const next = new Set(prev.locationIds);
          const anySelected = ids.some((id) => next.has(id));
          ids.forEach((id) => (anySelected ? next.delete(id) : next.add(id)));
          return {
            ...prev,
            locationIds: next,
          };
        });
      };
      const removeFilterTag = (group, value) => {
        setFilterState((prev) => {
          const next = {
            ...prev,
            [group]: new Set(prev[group]),
          };
          if (group === "locationIds" && value.startsWith("locationName:")) {
            const name = value.slice("locationName:".length);
            locationTree.list
              .filter((loc) => loc.name === name)
              .forEach((loc) => next.locationIds.delete(loc.id));
          } else {
            next[group].delete(value);
          }
          return next;
        });
      };
      const handleDeleteAsset = (id) => {
        if (!window.confirm("Архивлаад устгах уу?")) return;
        deleteAssetMutation({
          variables: {
            id,
          },
        })
          .then(() => {
            setAssetItems((prev) => prev.filter((item) => item.id !== id));
            refetch();
          })
          .catch((err) => console.error("Failed to delete asset:", err));
      };
      const locationNameById = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetsContent.useMemo[locationNameById]": () => {
            const map = new Map();
            locationTree.list.forEach(
              {
                "AssetsContent.useMemo[locationNameById]": (loc) =>
                  map.set(loc.id, loc.name),
              }["AssetsContent.useMemo[locationNameById]"],
            );
            return map;
          },
        }["AssetsContent.useMemo[locationNameById]"],
        [locationTree.list],
      );
      /** Зөвхөн root байршлууд (parentId === null), нэрээр нэгтгэсэн — нэг нэр нэг checkbox */ const locationOptionsByName =
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMemo"
        ])(
          {
            "AssetsContent.useMemo[locationOptionsByName]": () => {
              const roots = locationTree.list.filter(
                {
                  "AssetsContent.useMemo[locationOptionsByName].roots": (loc) =>
                    loc.parentId === null,
                }["AssetsContent.useMemo[locationOptionsByName].roots"],
              );
              const byName = new Map();
              roots.forEach(
                {
                  "AssetsContent.useMemo[locationOptionsByName]": (loc) => {
                    const n = loc.name;
                    if (!byName.has(n)) byName.set(n, []);
                    byName.get(n).push(loc.id);
                  },
                }["AssetsContent.useMemo[locationOptionsByName]"],
              );
              return Array.from(byName.entries())
                .map(
                  {
                    "AssetsContent.useMemo[locationOptionsByName]": ([
                      name,
                      ids,
                    ]) => ({
                      name,
                      ids,
                    }),
                  }["AssetsContent.useMemo[locationOptionsByName]"],
                )
                .sort(
                  {
                    "AssetsContent.useMemo[locationOptionsByName]": (a, b) =>
                      a.name.localeCompare(b.name),
                  }["AssetsContent.useMemo[locationOptionsByName]"],
                );
            },
          }["AssetsContent.useMemo[locationOptionsByName]"],
          [locationTree.list],
        );
      const activeTags = [
        /* Байршил: нэрээр нэг tag (олон ID нэг нэр дор) */ ...(() => {
          const byName = new Map();
          filterState.locationIds.forEach((id) => {
            const name = locationNameById.get(id) ?? id;
            if (!byName.has(name)) byName.set(name, []);
            byName.get(name).push(id);
          });
          return Array.from(byName.entries()).map(([name, ids]) => ({
            group: "locationIds",
            value: `locationName:${name}`,
            label: `Байршил: ${name}`,
          }));
        })(),
        ...Array.from(filterState.category).map((value) => ({
          group: "category",
          value,
          label: `Ангилал: ${categoryNameById.get(value) ?? value}`,
        })),
        ...Array.from(filterState.subCategory).map((value) => ({
          group: "subCategory",
          value,
          label: `Дэд ангилал: ${categoryNameById.get(value) ?? value}`,
        })),
      ];
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex gap-6 p-6",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "aside",
              {
                className:
                  "hidden w-64 shrink-0 rounded-3xl border border-border bg-card p-5 shadow-sm lg:block",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "h2",
                    {
                      className: "text-lg font-semibold text-foreground",
                      children: "Шүүлтүүр",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 277,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "mt-4 space-y-6",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className:
                                    "text-sm font-semibold text-foreground",
                                  children: "Байршил (нэрээр)",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-content.tsx",
                                  lineNumber: 280,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "mt-1.5 space-y-1.5 max-h-48 overflow-y-auto",
                                  children: locationOptionsByName.map((opt) =>
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "flex items-center gap-2 text-sm text-muted-foreground",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "input",
                                            {
                                              type: "checkbox",
                                              checked: opt.ids.some((id) =>
                                                filterState.locationIds.has(id),
                                              ),
                                              onChange: () =>
                                                toggleFilterLocationByIds(
                                                  opt.ids,
                                                ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/assets-content.tsx",
                                              lineNumber: 289,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          opt.name,
                                        ],
                                      },
                                      opt.name,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/assets-content.tsx",
                                        lineNumber: 285,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-content.tsx",
                                  lineNumber: 283,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-content.tsx",
                            lineNumber: 279,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className:
                                    "text-sm font-semibold text-foreground",
                                  children: "Ангилал",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-content.tsx",
                                  lineNumber: 302,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "mt-2 space-y-4",
                                  children: (
                                    categoriesData?.categories ?? []
                                  ).map((category) =>
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "label",
                                            {
                                              className:
                                                "flex items-center gap-2 text-sm font-medium text-foreground",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "input",
                                                  {
                                                    type: "checkbox",
                                                    checked:
                                                      filterState.category.has(
                                                        category.id,
                                                      ),
                                                    onChange: () =>
                                                      toggleFilter(
                                                        "category",
                                                        category.id,
                                                      ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/assets-content.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                category.name,
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/assets-content.tsx",
                                              lineNumber: 306,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          category.subcategories?.length
                                            ? /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "div",
                                                {
                                                  className:
                                                    "mt-2 space-y-2 pl-6",
                                                  children:
                                                    category.subcategories.map(
                                                      (sub) =>
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "label",
                                                          {
                                                            className:
                                                              "flex items-center gap-2 text-sm text-muted-foreground",
                                                            children: [
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "input",
                                                                {
                                                                  type: "checkbox",
                                                                  checked:
                                                                    filterState.subCategory.has(
                                                                      sub.id,
                                                                    ),
                                                                  onChange:
                                                                    () =>
                                                                      toggleFilter(
                                                                        "subCategory",
                                                                        sub.id,
                                                                      ),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/components/assets/assets-content.tsx",
                                                                  lineNumber: 321,
                                                                  columnNumber: 27,
                                                                },
                                                                this,
                                                              ),
                                                              sub.name,
                                                            ],
                                                          },
                                                          sub.id,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/assets-content.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                    ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/assets-content.tsx",
                                                  lineNumber: 315,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              )
                                            : null,
                                        ],
                                      },
                                      category.id,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/assets-content.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-content.tsx",
                                  lineNumber: 303,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-content.tsx",
                            lineNumber: 301,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 278,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/components/assets/assets-content.tsx",
                lineNumber: 276,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "min-w-0 flex-1 space-y-6",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className:
                        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "h1",
                                {
                                  className:
                                    "text-2xl font-bold text-foreground",
                                  children: "Эд хөрөнгийн бүртгэл",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-content.tsx",
                                  lineNumber: 340,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-muted-foreground",
                                  children:
                                    "Компанийн бүх эд хөрөнгийг удирдаж, хянах",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-content.tsx",
                                  lineNumber: 343,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-content.tsx",
                            lineNumber: 339,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            className: "gap-2",
                            onClick: () => setShowAddDialog(true),
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
                                  "Plus"
                                ],
                                {
                                  className: "h-4 w-4",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/assets-content.tsx",
                                  lineNumber: 348,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              "Шинэ хөрөнгө нэмэх",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-content.tsx",
                            lineNumber: 347,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 338,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$form$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "AssetFormDialog"
                    ],
                    {
                      open: showAddDialog,
                      onOpenChange: setShowAddDialog,
                      onAddAssets: (assets) => {
                        setAssetItems((prev) => [...assets, ...prev]);
                        refetch().then(() => {
                          setAssetItems((prev) =>
                            prev.filter(
                              (item) => !assets.some((a) => a.id === item.id),
                            ),
                          );
                        });
                      },
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 353,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$form$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "AssetFormDialog"
                    ],
                    {
                      open: !!editAsset,
                      onOpenChange: (open) => {
                        if (!open) setEditAsset(null);
                      },
                      onAddAssets: () => {},
                      onUpdateAsset: (asset) => {
                        setAssetItems((prev) =>
                          prev.map((item) =>
                            item.id === asset.id ? asset : item,
                          ),
                        );
                        refetch();
                      },
                      mode: "edit",
                      initialAsset: editAsset,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 365,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$assets$2d$search$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "AssetsSearchBar"
                    ],
                    {
                      searchQuery: searchQuery,
                      onSearchChange: setSearchQuery,
                      statusFilter: statusFilter,
                      onStatusChange: setStatusFilter,
                      categoryFilter: categoryFilter,
                      onCategoryChange: setCategoryFilter,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 381,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex flex-wrap items-center gap-2",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant:
                              viewMode === "list" ? "default" : "outline",
                            size: "sm",
                            onClick: () => setViewMode("list"),
                            children: "Жагсаалт",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-content.tsx",
                            lineNumber: 391,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant:
                              viewMode === "byType" ? "default" : "outline",
                            size: "sm",
                            onClick: () => setViewMode("byType"),
                            children: "Төрлөөр",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/assets-content.tsx",
                            lineNumber: 398,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 390,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$assets$2d$grid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "AssetsGrid"
                    ],
                    {
                      assets: filteredAssets,
                      selectedIds: selectedIds,
                      onToggleSelect: (id) => {
                        setSelectedIds((prev) => {
                          const next = new Set(prev);
                          if (next.has(id)) next.delete(id);
                          else next.add(id);
                          return next;
                        });
                      },
                      onSelectAll: () =>
                        setSelectedIds(
                          new Set(filteredAssets.map((a) => a.id)),
                        ),
                      onSelectFirstFour: () =>
                        setSelectedIds(
                          new Set(filteredAssets.slice(0, 4).map((a) => a.id)),
                        ),
                      onClearSelection: () => setSelectedIds(new Set()),
                      onOpenQr: setQrAssets,
                      onEdit: setEditAsset,
                      onDelete: handleDeleteAsset,
                      loading: loading,
                      error: error,
                      activeTags: activeTags,
                      onRemoveTag: removeFilterTag,
                      showTableOnly:
                        filterState.category.size > 0 ||
                        filterState.subCategory.size > 0,
                      viewMode: viewMode,
                      categoryNameById: categoryNameById,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/components/assets/assets-content.tsx",
                      lineNumber: 407,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/components/assets/assets-content.tsx",
                lineNumber: 337,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/components/assets/assets-content.tsx",
          lineNumber: 275,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AssetsContent, "c+frwt5/iEnAYkkxHOZj7s+V0js=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
      ];
    });
    _c = AssetsContent;
    var _c;
    __turbopack_context__.k.register(_c, "AssetsContent");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/location-picker.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["LocationPicker", () => LocationPicker]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/graphql.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/label.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/select.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function LocationPicker({ value, onChange, label = "Байршил сонгох" }) {
      _s();
      const { data } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetLocationsDocument"
        ],
      );
      const locations = data?.locations ?? [];
      const branches = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LocationPicker.useMemo[branches]": () =>
            locations.filter(
              {
                "LocationPicker.useMemo[branches]": (l) => l.type === "branch",
              }["LocationPicker.useMemo[branches]"],
            ),
        }["LocationPicker.useMemo[branches]"],
        [locations],
      );
      const byParent = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LocationPicker.useMemo[byParent]": () => {
            const map = new Map();
            locations.forEach(
              {
                "LocationPicker.useMemo[byParent]": (loc) => {
                  const key = loc.parentId ?? null;
                  if (!map.has(key)) map.set(key, []);
                  map.get(key).push(loc);
                },
              }["LocationPicker.useMemo[byParent]"],
            );
            return map;
          },
        }["LocationPicker.useMemo[byParent]"],
        [locations],
      );
      const [branchId, setBranchId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [roomTypeId, setRoomTypeId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [sectionId, setSectionId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [roomId, setRoomId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const roomTypes = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LocationPicker.useMemo[roomTypes]": () => {
            if (!branchId) return [];
            return (byParent.get(branchId) ?? []).filter(
              {
                "LocationPicker.useMemo[roomTypes]": (l) =>
                  l.type === "roomType",
              }["LocationPicker.useMemo[roomTypes]"],
            );
          },
        }["LocationPicker.useMemo[roomTypes]"],
        [branchId, byParent],
      );
      const sections = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LocationPicker.useMemo[sections]": () => {
            if (!roomTypeId) return [];
            return (byParent.get(roomTypeId) ?? []).filter(
              {
                "LocationPicker.useMemo[sections]": (l) => l.type === "section",
              }["LocationPicker.useMemo[sections]"],
            );
          },
        }["LocationPicker.useMemo[sections]"],
        [roomTypeId, byParent],
      );
      const rooms = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LocationPicker.useMemo[rooms]": () => {
            const parent = sectionId || roomTypeId || branchId || null;
            if (!parent) return [];
            return (byParent.get(parent) ?? []).filter(
              {
                "LocationPicker.useMemo[rooms]": (l) => l.type === "room",
              }["LocationPicker.useMemo[rooms]"],
            );
          },
        }["LocationPicker.useMemo[rooms]"],
        [branchId, roomTypeId, sectionId, byParent],
      );
      const handleChange = (
        nextBranchId,
        nextRoomTypeId,
        nextSectionId,
        nextRoomId,
      ) => {
        const branchName =
          branches.find((b) => b.id === nextBranchId)?.name ?? undefined;
        const roomTypeName =
          (byParent.get(nextBranchId) ?? []).find(
            (l) => l.id === nextRoomTypeId,
          )?.name ?? undefined;
        const sectionName =
          (byParent.get(nextRoomTypeId) ?? []).find(
            (l) => l.id === nextSectionId,
          )?.name ?? undefined;
        const roomName =
          (
            byParent.get(
              nextSectionId || nextRoomTypeId || nextBranchId || null,
            ) ?? []
          ).find((l) => l.id === nextRoomId)?.name ?? undefined;
        const parts = [branchName, roomTypeName, sectionName, roomName]
          .filter((p) => !!p && String(p).trim().length > 0)
          .map((p) => String(p).trim());
        const fullPath = parts.length > 0 ? parts.join(" / ") : undefined;
        onChange(fullPath);
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-2",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Label"
              ],
              {
                className: "text-sm font-medium text-foreground",
                children: label,
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/location-picker.tsx",
                lineNumber: 108,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "grid grid-cols-1 gap-2 sm:grid-cols-4",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Select"
                    ],
                    {
                      value: branchId || undefined,
                      onValueChange: (val) => {
                        setBranchId(val);
                        setRoomTypeId("");
                        setSectionId("");
                        setRoomId("");
                        handleChange(val, "", "", "");
                      },
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectTrigger"
                          ],
                          {
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "SelectValue"
                              ],
                              {
                                placeholder: "Салбар",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/location-picker.tsx",
                                lineNumber: 121,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 120,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectContent"
                          ],
                          {
                            children: branches.map((b) =>
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "SelectItem"
                                ],
                                {
                                  value: b.id,
                                  children: b.name,
                                },
                                b.id,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/location-picker.tsx",
                                  lineNumber: 125,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 123,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/location-picker.tsx",
                      lineNumber: 110,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Select"
                    ],
                    {
                      value: roomTypeId || undefined,
                      onValueChange: (val) => {
                        setRoomTypeId(val);
                        setSectionId("");
                        setRoomId("");
                        handleChange(branchId, val, "", "");
                      },
                      disabled: !branchId || roomTypes.length === 0,
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectTrigger"
                          ],
                          {
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "SelectValue"
                              ],
                              {
                                placeholder: "Оффис / Анги",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/location-picker.tsx",
                                lineNumber: 143,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 142,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectContent"
                          ],
                          {
                            children: roomTypes.map((rt) =>
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "SelectItem"
                                ],
                                {
                                  value: rt.id,
                                  children: rt.name,
                                },
                                rt.id,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/location-picker.tsx",
                                  lineNumber: 147,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 145,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/location-picker.tsx",
                      lineNumber: 132,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Select"
                    ],
                    {
                      value: sectionId || undefined,
                      onValueChange: (val) => {
                        setSectionId(val);
                        setRoomId("");
                        handleChange(branchId, roomTypeId, val, "");
                      },
                      disabled: !roomTypeId || sections.length === 0,
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectTrigger"
                          ],
                          {
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "SelectValue"
                              ],
                              {
                                placeholder: "Хэсэг / Заал",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/location-picker.tsx",
                                lineNumber: 164,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 163,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectContent"
                          ],
                          {
                            children: sections.map((sec) =>
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "SelectItem"
                                ],
                                {
                                  value: sec.id,
                                  children: sec.name,
                                },
                                sec.id,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/location-picker.tsx",
                                  lineNumber: 168,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 166,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/location-picker.tsx",
                      lineNumber: 154,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Select"
                    ],
                    {
                      value: roomId || undefined,
                      onValueChange: (val) => {
                        setRoomId(val);
                        handleChange(branchId, roomTypeId, sectionId, val);
                      },
                      disabled: !branchId,
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectTrigger"
                          ],
                          {
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "SelectValue"
                              ],
                              {
                                placeholder: "Өрөө / дугаар",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/location-picker.tsx",
                                lineNumber: 184,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 183,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "SelectContent"
                          ],
                          {
                            children: rooms.map((room) =>
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "SelectItem"
                                ],
                                {
                                  value: room.id,
                                  children: room.name,
                                },
                                room.id,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/location-picker.tsx",
                                  lineNumber: 188,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/location-picker.tsx",
                            lineNumber: 186,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/location-picker.tsx",
                      lineNumber: 175,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/components/assets/location-picker.tsx",
                lineNumber: 109,
                columnNumber: 7,
              },
              this,
            ),
            value &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "p",
                {
                  className: "text-xs text-muted-foreground",
                  children: [
                    "Сонгосон: ",
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "span",
                      {
                        className: "font-medium",
                        children: value,
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/src/components/assets/location-picker.tsx",
                        lineNumber: 197,
                        columnNumber: 21,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "[project]/src/components/assets/location-picker.tsx",
                  lineNumber: 196,
                  columnNumber: 9,
                },
                this,
              ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/components/assets/location-picker.tsx",
          lineNumber: 107,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(LocationPicker, "nORwHkPAken7bCIbSgSohrkh2yg=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
      ];
    });
    _c = LocationPicker;
    var _c;
    __turbopack_context__.k.register(_c, "LocationPicker");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/asset-transfer-dialog.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetTransferDialog", () => AssetTransferDialog]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/graphql.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/select.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$location$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/location-picker.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function buildLocationPath(loc, byId) {
      const parts = [loc.name];
      let pid = loc.parentId;
      while (pid) {
        const p = byId.get(pid);
        if (!p) break;
        parts.unshift(p.name);
        pid = p.parentId;
      }
      return parts.join(" / ");
    }
    function AssetTransferDialog({
      open,
      onOpenChange,
      selectedAssets,
      onRemoveAsset,
      onSuccess,
    }) {
      _s();
      const [tab, setTab] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("location");
      const [locationFullPath, setLocationFullPath] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [employeeId, setEmployeeId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [submitting, setSubmitting] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const { data: employeesData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "EmployeesDocument"
        ],
      );
      const [updateAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "UpdateAssetDocument"
        ],
      );
      const [assignAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "AssignAssetDocument"
        ],
      );
      const employees = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetTransferDialog.useMemo[employees]": () => {
            const list = employeesData?.employees ?? [];
            return list.map(
              {
                "AssetTransferDialog.useMemo[employees]": (e) => ({
                  id: e.id,
                  name:
                    [e.firstName, e.lastName].filter(Boolean).join(" ") ||
                    e.email ||
                    e.id,
                }),
              }["AssetTransferDialog.useMemo[employees]"],
            );
          },
        }["AssetTransferDialog.useMemo[employees]"],
        [employeesData?.employees],
      );
      const handleTransferToLocation = async () => {
        if (!locationFullPath || selectedAssets.length === 0) {
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].error("Байршил болон хөрөнгийг сонгоно уу.");
          return;
        }
        setSubmitting(true);
        const toastId =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].loading("Байршил руу шилжүүлж байна...");
        try {
          for (const asset of selectedAssets) {
            await updateAssetMutation({
              variables: {
                id: asset.id,
                input: {
                  locationId: locationFullPath,
                },
              },
            });
          }
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].success(
            `${selectedAssets.length} хөрөнгө амжилттай шилжүүлэгдлээ.`,
            {
              id: toastId,
            },
          );
          setLocationFullPath("");
          onSuccess?.();
          onOpenChange(false);
        } catch (e) {
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].error("Шилжүүлэхэд алдаа гарлаа.", {
            id: toastId,
          });
        } finally {
          setSubmitting(false);
        }
      };
      const handleTransferToOwner = async () => {
        if (!employeeId || selectedAssets.length === 0) {
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].error("Эзэмшигч болон хөрөнгийг сонгоно уу.");
          return;
        }
        setSubmitting(true);
        const toastId =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].loading("Эзэмшигч рүү шилжүүлж байна...");
        try {
          for (const asset of selectedAssets) {
            await assignAssetMutation({
              variables: {
                assetId: asset.id,
                employeeId,
              },
            });
          }
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].success(
            `${selectedAssets.length} хөрөнгө амжилттай хуваарилагдлаа.`,
            {
              id: toastId,
            },
          );
          setEmployeeId("");
          onSuccess?.();
          onOpenChange(false);
        } catch (e) {
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].error("Хуваарилах үед алдаа гарлаа.", {
            id: toastId,
          });
        } finally {
          setSubmitting(false);
        }
      };
      const handleSubmit = () => {
        if (tab === "location") handleTransferToLocation();
        else handleTransferToOwner();
      };
      const canSubmit =
        selectedAssets.length > 0 &&
        (tab === "location" ? !!locationFullPath : !!employeeId);
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "Dialog"
        ],
        {
          open: open,
          onOpenChange: onOpenChange,
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "DialogContent"
            ],
            {
              className: "sm:max-w-lg",
              showCloseButton: true,
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogHeader"
                  ],
                  {
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogTitle"
                        ],
                        {
                          className: "sr-only",
                          children: "Хөрөнгө шилжүүлэх",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-transfer-dialog.tsx",
                          lineNumber: 157,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex items-center gap-6 border-b pb-3",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                type: "button",
                                onClick: () => setTab("owner"),
                                className: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "cn"
                                ])(
                                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                                  tab === "owner"
                                    ? "text-foreground border-b-2 border-primary pb-0.5"
                                    : "text-muted-foreground hover:text-foreground",
                                ),
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__[
                                      "User"
                                    ],
                                    {
                                      className: "h-4 w-4",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                      lineNumber: 169,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  "Эзэмшигчрүү шилжүүлэх",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                lineNumber: 159,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                type: "button",
                                onClick: () => setTab("location"),
                                className: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "cn"
                                ])(
                                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                                  tab === "location"
                                    ? "text-foreground border-b-2 border-primary pb-0.5"
                                    : "text-muted-foreground hover:text-foreground",
                                ),
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__[
                                      "MapPin"
                                    ],
                                    {
                                      className: "h-4 w-4",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                      lineNumber: 182,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  "Байршилруу шилжүүлэх",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                lineNumber: 172,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-transfer-dialog.tsx",
                          lineNumber: 158,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-transfer-dialog.tsx",
                    lineNumber: 156,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "space-y-4 py-2",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className:
                                  "text-sm font-medium text-foreground",
                                children: "Сонгогдсон хөрөнгө",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                lineNumber: 190,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "mt-2 flex flex-wrap gap-2 rounded-md border border-input bg-muted/30 p-2 min-h-[52px]",
                                children:
                                  selectedAssets.length === 0
                                    ? /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "span",
                                        {
                                          className:
                                            "text-sm text-muted-foreground py-1",
                                          children:
                                            "Хөрөнгө сонгоогүй байна. Хүснэгтээс сонгоно уу.",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                          lineNumber: 195,
                                          columnNumber: 17,
                                        },
                                        this,
                                      )
                                    : selectedAssets.map((asset) =>
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "inline-flex items-center gap-1 rounded-md bg-background px-2 py-1 text-sm border border-border",
                                            children: [
                                              asset.assetTag,
                                              onRemoveAsset &&
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "button",
                                                  {
                                                    type: "button",
                                                    onClick: () =>
                                                      onRemoveAsset(asset.id),
                                                    className:
                                                      "rounded p-0.5 hover:bg-muted",
                                                    "aria-label": `${asset.assetTag}-г хасах`,
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                                        "X"
                                                      ],
                                                      {
                                                        className:
                                                          "h-3.5 w-3.5",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                            ],
                                          },
                                          asset.id,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                lineNumber: 193,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-transfer-dialog.tsx",
                          lineNumber: 189,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      tab === "location" &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$location$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "LocationPicker"
                          ],
                          {
                            value: locationFullPath,
                            onChange: (path) => setLocationFullPath(path ?? ""),
                            label: "Байршил сонгох",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-transfer-dialog.tsx",
                            lineNumber: 222,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      tab === "owner" &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className:
                                    "text-sm font-medium text-foreground",
                                  children: "Эзэмшигч сонгох",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                  lineNumber: 231,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "Select"
                                ],
                                {
                                  value: employeeId || undefined,
                                  onValueChange: setEmployeeId,
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "SelectTrigger"
                                      ],
                                      {
                                        className: "mt-2 w-full",
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "SelectValue"
                                          ],
                                          {
                                            placeholder: "Сонгоно уу",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                            lineNumber: 239,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                        lineNumber: 238,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "SelectContent"
                                      ],
                                      {
                                        children: employees.map((emp) =>
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "SelectItem"
                                            ],
                                            {
                                              value: emp.id,
                                              children: emp.name,
                                            },
                                            emp.id,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                              lineNumber: 243,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                        lineNumber: 241,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-transfer-dialog.tsx",
                                  lineNumber: 234,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-transfer-dialog.tsx",
                            lineNumber: 230,
                            columnNumber: 13,
                          },
                          this,
                        ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-transfer-dialog.tsx",
                    lineNumber: 188,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogFooter"
                  ],
                  {
                    className: "border-t pt-4",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          type: "button",
                          variant: "outline",
                          onClick: () => onOpenChange(false),
                          children: "Цуцлах",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-transfer-dialog.tsx",
                          lineNumber: 254,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          type: "button",
                          disabled: !canSubmit || submitting,
                          onClick: handleSubmit,
                          children: submitting
                            ? "Түр хүлээнэ үү..."
                            : "Шилжүүлэх",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-transfer-dialog.tsx",
                          lineNumber: 261,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-transfer-dialog.tsx",
                    lineNumber: 253,
                    columnNumber: 9,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                "[project]/src/components/assets/asset-transfer-dialog.tsx",
              lineNumber: 155,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/components/assets/asset-transfer-dialog.tsx",
          lineNumber: 154,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AssetTransferDialog, "q166fXaMnWVt/GKsZi/U7O4Tmbg=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
      ];
    });
    _c = AssetTransferDialog;
    var _c;
    __turbopack_context__.k.register(_c, "AssetTransferDialog");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/asset-detail-content.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetDetailContent", () => AssetDetailContent]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useApolloClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useApolloClient.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/graphql.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/tabs.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/label.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/select.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/badge.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/constants.ts [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    const STATUS_LABELS = {
      ASSIGNED: "Эзэмшигчтэй",
      AVAILABLE: "Эзэмшигчгүй",
      FOR_SALE: "Зарж болох",
      DAMAGED: "Эвдрэлтэй",
    };
    const HISTORY_EVENT_LABELS = {
      ASSIGNED: "Олгосон",
      RETURNED: "Буцаасан",
      TRANSFERRED: "Шилжүүлсэн",
      CREATED: "Бүртгэсэн",
      PURCHASED: "Худалдан авсан",
      REGISTERED: "Бүртгэсэн",
      UPDATED: "Шинэчлэгдсэн",
      ASSET_UPDATED: "Шинэчлэгдсэн",
    };
    const STATUS_BADGE_CLASSES = {
      ASSIGNED: "border-blue-100 bg-blue-50/60 text-blue-600",
      AVAILABLE: "border-green-100 bg-green-50/60 text-green-600",
      FOR_SALE: "border-yellow-100 bg-yellow-50/60 text-yellow-700",
      DAMAGED: "border-red-100 bg-red-50/60 text-red-600",
    };
    const STATUS_DOT_CLASSES = {
      ASSIGNED: "bg-blue-500",
      AVAILABLE: "bg-green-500",
      FOR_SALE: "bg-yellow-500",
      DAMAGED: "bg-red-500",
    };
    const MAIN_CATEGORY_BY_SUB = Object.entries(
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "SUB_CATEGORIES_BY_MAIN"
      ],
    ).reduce(
      (_c = (acc, [main, subs]) => {
        subs.forEach((sub) => {
          acc[sub] = main;
        });
        return acc;
      }),
      {},
    );
    _c1 = MAIN_CATEGORY_BY_SUB;
    function AssetDetailContent({ assetId, onClose }) {
      _s();
      const [isEditing, setIsEditing] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [hasInitializedEdit, setHasInitializedEdit] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [expandedHistoryId, setExpandedHistoryId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [editData, setEditData] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])({
        assetTag: "",
        serialNumber: "",
        status: "",
        locationId: "",
        salePrice: "",
        notes: "",
      });
      const [saving, setSaving] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [optimisticBookValue, setOptimisticBookValue] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const { data, loading, refetch } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetAssetDocument"
        ],
        {
          variables: {
            id: assetId,
          },
          skip: !assetId,
          fetchPolicy: "cache-and-network",
        },
      );
      const { data: historyData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetAssetHistoryDocument"
        ],
        {
          variables: {
            assetId,
          },
          skip: !assetId,
        },
      );
      const { data: locationsData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetLocationsDocument"
        ],
      );
      const client = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useApolloClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useApolloClient"
      ])();
      const [updateAsset] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "UpdateAssetDocument"
        ],
        {
          refetchQueries: [
            {
              query:
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "GetAssetDocument"
                ],
              variables: {
                id: assetId,
              },
            },
            {
              query:
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "GetAssetKpisDocument"
                ],
            },
            {
              query:
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "GetAssetsDocument"
                ],
            },
          ],
          awaitRefetchQueries: true,
        },
      );
      const [deleteAsset, { loading: deleting }] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "DeleteAssetDocument"
        ],
        {
          refetchQueries: [
            {
              query:
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "GetAssetKpisDocument"
                ],
            },
            {
              query:
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "GetAssetsDocument"
                ],
            },
          ],
          awaitRefetchQueries: true,
        },
      );
      const asset = data?.asset;
      const locationOptions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetDetailContent.useMemo[locationOptions]": () => {
            return (locationsData?.locations ?? []).map(
              {
                "AssetDetailContent.useMemo[locationOptions]": (loc) => ({
                  id: loc.id.toString(),
                  name: loc.name,
                }),
              }["AssetDetailContent.useMemo[locationOptions]"],
            );
          },
        }["AssetDetailContent.useMemo[locationOptions]"],
        [locationsData],
      );
      const handleEditToggle = () => {
        if (!asset) return;
        const bookValue =
          optimisticBookValue ?? asset.currentBookValue ?? undefined;
        setEditData({
          assetTag: asset.assetTag ?? "",
          serialNumber: asset.serialNumber ?? "",
          status: asset.status ?? "AVAILABLE",
          locationId: asset.locationId ?? "",
          salePrice: bookValue?.toString() ?? "",
          notes: asset.notes ?? "",
        });
        setIsEditing(true);
      };
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AssetDetailContent.useEffect": () => {
            setHasInitializedEdit(false);
            setIsEditing(false);
            setOptimisticBookValue(null);
          },
        }["AssetDetailContent.useEffect"],
        [assetId],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AssetDetailContent.useEffect": () => {
            if (!asset || hasInitializedEdit) return;
            setEditData({
              assetTag: asset.assetTag ?? "",
              serialNumber: asset.serialNumber ?? "",
              status: asset.status ?? "AVAILABLE",
              locationId: asset.locationId ?? "",
              salePrice: asset.currentBookValue?.toString() ?? "",
              notes: asset.notes ?? "",
            });
            setHasInitializedEdit(true);
          },
        }["AssetDetailContent.useEffect"],
        [asset, hasInitializedEdit],
      );
      const handleSave = async () => {
        setSaving(true);
        try {
          await updateAsset({
            variables: {
              id: assetId,
              input: {
                assetTag: editData.assetTag,
                serialNumber: editData.serialNumber,
                status: editData.status,
                locationId: editData.locationId,
                currentBookValue: parseFloat(editData.salePrice) || 0,
                notes: editData.notes,
              },
            },
          });
          const savedBookValue = parseFloat(editData.salePrice) || 0;
          setOptimisticBookValue(savedBookValue);
          await refetch();
          await client.refetchQueries({
            include: [
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "GetAssetsDocument"
              ],
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "GetAssetKpisDocument"
              ],
            ],
          });
          setIsEditing(false);
        } catch (e) {
          console.error(e);
        } finally {
          setSaving(false);
        }
      };
      const handleDelete = async () => {
        if (
          !window.confirm(
            "Энэ хөрөнгийг устгах уу? Энэ үйлдлийг буцааж болохгүй.",
          )
        )
          return;
        try {
          await deleteAsset({
            variables: {
              id: assetId,
            },
          });
          onClose?.();
        } catch (e) {
          console.error("Failed to delete asset:", e);
        }
      };
      if (loading)
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "p-10 text-center text-gray-400",
            children: "Уншиж байна...",
          },
          void 0,
          false,
          {
            fileName:
              "[project]/src/components/assets/asset-detail-content.tsx",
            lineNumber: 236,
            columnNumber: 12,
          },
          this,
        );
      if (!asset) return null;
      const categoryKey = asset.category ?? "";
      const subCategoryLabel =
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "CATEGORY_LABELS"
        ][categoryKey] ||
        categoryKey ||
        "—";
      const mainCategoryLabel = MAIN_CATEGORY_BY_SUB[categoryKey] || "—";
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "bg-white rounded-[24px] max-w-4xl w-full mx-auto shadow-xl border border-gray-100 overflow-hidden",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "Tabs"
            ],
            {
              defaultValue: "details",
              className: "w-full",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "flex items-center justify-between px-6 pt-[20px] border-b border-gray-100",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "TabsList"
                        ],
                        {
                          className: "bg-transparent h-12 p-0 gap-5",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TabsTrigger"
                              ],
                              {
                                value: "details",
                                className:
                                  "rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black text-gray-400 font-semibold h-full px-1 gap-2 transition-all bg-transparent shadow-none text-[13px]",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__[
                                      "Box"
                                    ],
                                    {
                                      className: "h-4 w-4",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-detail-content.tsx",
                                      lineNumber: 256,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  " Хөрөнгийн дэлгэрэнгүй",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-detail-content.tsx",
                                lineNumber: 252,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TabsTrigger"
                              ],
                              {
                                value: "history",
                                className:
                                  "rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black text-gray-400 font-semibold h-full px-1 gap-2 transition-all bg-transparent shadow-none text-[13px]",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__[
                                      "History"
                                    ],
                                    {
                                      className: "h-4 w-4",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-detail-content.tsx",
                                      lineNumber: 262,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  " Хөрөнгийн түүх",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-detail-content.tsx",
                                lineNumber: 258,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-detail-content.tsx",
                          lineNumber: 251,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex flex-col items-end gap-2",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                variant: "ghost",
                                size: "icon",
                                onClick: onClose,
                                className:
                                  "h-8 w-8 text-gray-300 hover:text-black hover:bg-transparent transition-colors",
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                    "X"
                                  ],
                                  {
                                    className: "h-5 w-5",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-detail-content.tsx",
                                lineNumber: 268,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "flex items-center gap-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "Button"
                                    ],
                                    {
                                      variant: "ghost",
                                      size: "sm",
                                      onClick: handleDelete,
                                      disabled: deleting,
                                      className:
                                        "rounded-lg text-[12px] h-8 gap-2 font-medium px-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__[
                                            "Trash2"
                                          ],
                                          {
                                            className: "h-3.5 w-3.5",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-detail-content.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        deleting ? "..." : "Устгах",
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-detail-content.tsx",
                                      lineNumber: 277,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  !isEditing
                                    ? /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Button"
                                        ],
                                        {
                                          variant: "outline",
                                          size: "sm",
                                          onClick: handleEditToggle,
                                          className:
                                            "rounded-lg border-gray-200 text-[12px] h-8 gap-2 font-medium px-3 hover:bg-gray-50 transition-colors",
                                          children: [
                                            "Засварлах ",
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__[
                                                "Pencil"
                                              ],
                                              {
                                                className: "h-3.5 w-3.5",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/asset-detail-content.tsx",
                                                lineNumber: 294,
                                                columnNumber: 29,
                                              },
                                              this,
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 288,
                                          columnNumber: 17,
                                        },
                                        this,
                                      )
                                    : /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Fragment"
                                        ],
                                        {
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "flex gap-2",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "Button"
                                                  ],
                                                  {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: () =>
                                                      setIsEditing(false),
                                                    className:
                                                      "h-8 text-[12px]",
                                                    children: "Цуцлах",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 17,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "Button"
                                                  ],
                                                  {
                                                    size: "sm",
                                                    onClick: handleSave,
                                                    disabled: saving,
                                                    className:
                                                      "rounded-lg h-8 px-4 gap-1.5 font-semibold text-[12px]",
                                                    children: [
                                                      saving
                                                        ? "..."
                                                        : "Хадгалах",
                                                      " ",
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__[
                                                          "Check"
                                                        ],
                                                        {
                                                          className:
                                                            "h-3.5 w-3.5",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                                          lineNumber: 314,
                                                          columnNumber: 19,
                                                        },
                                                        this,
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 298,
                                              columnNumber: 15,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                      ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-detail-content.tsx",
                                lineNumber: 276,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-detail-content.tsx",
                          lineNumber: 267,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-detail-content.tsx",
                    lineNumber: 250,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "TabsContent"
                  ],
                  {
                    value: "details",
                    className: "p-8 m-0",
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "flex flex-col md:flex-row gap-8",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "w-44 h-44 shrink-0 rounded-[22px] border border-gray-200 bg-white p-4 flex items-center justify-center shadow-[0_0_0_1px_rgba(0,0,0,0.04)]",
                              children: asset.imageUrl
                                ? /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "img",
                                    {
                                      src: asset.imageUrl,
                                      className: "max-h-full object-contain",
                                      alt: "Asset",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-detail-content.tsx",
                                      lineNumber: 329,
                                      columnNumber: 17,
                                    },
                                    this,
                                  )
                                : /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__[
                                      "Box"
                                    ],
                                    {
                                      className: "h-12 w-12 text-gray-200",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-detail-content.tsx",
                                      lineNumber: 335,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/components/assets/asset-detail-content.tsx",
                              lineNumber: 327,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Нэр",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 342,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      isEditing
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "relative group",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "Input"
                                                  ],
                                                  {
                                                    value: editData.assetTag,
                                                    onChange: (e) =>
                                                      setEditData({
                                                        ...editData,
                                                        assetTag:
                                                          e.target.value,
                                                      }),
                                                    className:
                                                      "h-9 text-[14px] pr-8 focus:ring-1 focus:ring-black",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                                    "X"
                                                  ],
                                                  {
                                                    className:
                                                      "absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer",
                                                    onClick: () =>
                                                      setEditData({
                                                        ...editData,
                                                        assetTag: "",
                                                      }),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 346,
                                              columnNumber: 19,
                                            },
                                            this,
                                          )
                                        : /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "text-[15px] font-semibold text-gray-900",
                                              children: asset.assetTag || "—",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 360,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Серийн дугаар",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 367,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      isEditing
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "relative",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "Input"
                                                  ],
                                                  {
                                                    value:
                                                      editData.serialNumber,
                                                    onChange: (e) =>
                                                      setEditData({
                                                        ...editData,
                                                        serialNumber:
                                                          e.target.value,
                                                      }),
                                                    className:
                                                      "h-9 text-[14px] pr-8 focus:ring-1 focus:ring-black",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                                    "X"
                                                  ],
                                                  {
                                                    className:
                                                      "absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer",
                                                    onClick: () =>
                                                      setEditData({
                                                        ...editData,
                                                        serialNumber: "",
                                                      }),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 371,
                                              columnNumber: 19,
                                            },
                                            this,
                                          )
                                        : /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "text-[15px] font-semibold text-gray-900",
                                              children:
                                                asset.serialNumber || "—",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 390,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Төлөв",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 397,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      isEditing
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "Select"
                                            ],
                                            {
                                              value: editData.status,
                                              onValueChange: (v) =>
                                                setEditData({
                                                  ...editData,
                                                  status: v,
                                                }),
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectTrigger"
                                                  ],
                                                  {
                                                    className: `h-9 text-[14px] font-medium focus:ring-1 focus:ring-black ${STATUS_BADGE_CLASSES[editData.status] ?? "border-gray-100 bg-white text-gray-800"}`,
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "SelectValue"
                                                      ],
                                                      {},
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/components/assets/asset-detail-content.tsx",
                                                        lineNumber: 413,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectContent"
                                                  ],
                                                  {
                                                    children: Object.entries(
                                                      STATUS_LABELS,
                                                    ).map(([k, v]) =>
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "SelectItem"
                                                        ],
                                                        {
                                                          value: k,
                                                          children:
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "span",
                                                              {
                                                                className:
                                                                  "inline-flex items-center gap-2",
                                                                children: [
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "span",
                                                                    {
                                                                      className: `h-2 w-2 rounded-full ${STATUS_DOT_CLASSES[k] ?? "bg-gray-400"}`,
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/components/assets/asset-detail-content.tsx",
                                                                      lineNumber: 419,
                                                                      columnNumber: 29,
                                                                    },
                                                                    this,
                                                                  ),
                                                                  v,
                                                                ],
                                                              },
                                                              void 0,
                                                              true,
                                                              {
                                                                fileName:
                                                                  "[project]/src/components/assets/asset-detail-content.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 27,
                                                              },
                                                              this,
                                                            ),
                                                        },
                                                        k,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                                          lineNumber: 417,
                                                          columnNumber: 25,
                                                        },
                                                        this,
                                                      ),
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 401,
                                              columnNumber: 19,
                                            },
                                            this,
                                          )
                                        : /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "pt-0.5",
                                              children: /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "Badge"
                                                ],
                                                {
                                                  variant: "outline",
                                                  className: `rounded-lg px-3 py-0.5 font-semibold text-[11px] ${STATUS_BADGE_CLASSES[asset.status ?? ""] ?? "border-gray-100 bg-gray-50 text-gray-500"}`,
                                                  children:
                                                    STATUS_LABELS[
                                                      asset.status ?? ""
                                                    ] || asset.status,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-detail-content.tsx",
                                                  lineNumber: 432,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 431,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 396,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Байршил",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 446,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      isEditing
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "Select"
                                            ],
                                            {
                                              value: editData.locationId,
                                              onValueChange: (v) =>
                                                setEditData({
                                                  ...editData,
                                                  locationId: v,
                                                }),
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectTrigger"
                                                  ],
                                                  {
                                                    className:
                                                      "h-9 text-[14px] focus:ring-1 focus:ring-black",
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "SelectValue"
                                                      ],
                                                      {
                                                        placeholder: "Сонгох",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/components/assets/asset-detail-content.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectContent"
                                                  ],
                                                  {
                                                    children:
                                                      locationOptions.map(
                                                        (loc) =>
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              "SelectItem"
                                                            ],
                                                            {
                                                              value: loc.id,
                                                              children:
                                                                loc.name,
                                                            },
                                                            loc.id,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                                              lineNumber: 461,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          ),
                                                      ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 450,
                                              columnNumber: 19,
                                            },
                                            this,
                                          )
                                        : /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "text-[14px] font-medium text-gray-800 leading-tight",
                                              children:
                                                asset.locationPath || "—",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 468,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Ангилал",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 475,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "text-[14px] font-medium text-gray-800 leading-tight",
                                          children: mainCategoryLabel,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 478,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 474,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Дэд ангилал",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 484,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "text-[14px] font-medium text-gray-800 leading-tight",
                                          children: subCategoryLabel,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 487,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 483,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Худалдаж авсан үнэ",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 493,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "text-[16px] font-semibold text-gray-900",
                                          children: asset.purchaseCost
                                            ? Number(
                                                asset.purchaseCost,
                                              ).toLocaleString() + "₮"
                                            : "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 496,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 492,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Зарах үнэ",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 504,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      isEditing
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "relative",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "Input"
                                                  ],
                                                  {
                                                    value: editData.salePrice,
                                                    onChange: (e) =>
                                                      setEditData({
                                                        ...editData,
                                                        salePrice:
                                                          e.target.value,
                                                      }),
                                                    className:
                                                      "h-9 text-[14px] font-semibold pr-8 focus:ring-1 focus:ring-black",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 509,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                                    "X"
                                                  ],
                                                  {
                                                    className:
                                                      "absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer",
                                                    onClick: () =>
                                                      setEditData({
                                                        ...editData,
                                                        salePrice: "",
                                                      }),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 508,
                                              columnNumber: 19,
                                            },
                                            this,
                                          )
                                        : /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "text-[16px] font-semibold text-gray-900",
                                              children:
                                                (optimisticBookValue ??
                                                  asset.currentBookValue ??
                                                  null) != null
                                                  ? Number(
                                                      optimisticBookValue ??
                                                        asset.currentBookValue,
                                                    ).toLocaleString() + "₮"
                                                  : "—",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 524,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 503,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1 pt-1 md:col-start-2",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Label"
                                        ],
                                        {
                                          className:
                                            "text-[12px] font-medium leading-5 tracking-normal text-[#6B7280] bg-transparent px-0 py-0 inline-flex items-center",
                                          children: "Тэмдэглэл",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                          lineNumber: 537,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      isEditing
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "relative",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "Input"
                                                  ],
                                                  {
                                                    value: editData.notes,
                                                    onChange: (e) =>
                                                      setEditData({
                                                        ...editData,
                                                        notes: e.target.value,
                                                      }),
                                                    className:
                                                      "h-9 text-[14px] pr-8 italic text-gray-500 focus:ring-1 focus:ring-black",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 542,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                                    "X"
                                                  ],
                                                  {
                                                    className:
                                                      "absolute right-2 top-2.5 h-4 w-4 text-gray-300 cursor-pointer",
                                                    onClick: () =>
                                                      setEditData({
                                                        ...editData,
                                                        notes: "",
                                                      }),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 541,
                                              columnNumber: 19,
                                            },
                                            this,
                                          )
                                        : /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "text-[13px] text-gray-500 italic leading-relaxed",
                                              children:
                                                asset.notes || "Demo asset",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 555,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                    lineNumber: 536,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/components/assets/asset-detail-content.tsx",
                              lineNumber: 340,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/src/components/assets/asset-detail-content.tsx",
                        lineNumber: 325,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-detail-content.tsx",
                    lineNumber: 324,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "TabsContent"
                  ],
                  {
                    value: "history",
                    className:
                      "m-0 border-t border-gray-50 max-h-[420px] overflow-y-auto bg-white",
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "p-6 space-y-4",
                        children: historyData?.assetHistory?.length
                          ? historyData.assetHistory.map((h) => {
                              const actorName = h.actor
                                ? `${h.actor.lastName?.[0] ?? ""}.${h.actor.firstName ?? ""}`
                                : "—";
                              const eventLabel =
                                HISTORY_EVENT_LABELS[h.eventType] ??
                                h.eventType ??
                                "—";
                              const when = new Date(h.timestamp);
                              const formatted = `${when.toLocaleDateString()} ${when.toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}`;
                              const isOpen = expandedHistoryId === h.id;
                              return /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "text-[16px] font-semibold text-gray-900",
                                        children: eventLabel,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-detail-content.tsx",
                                        lineNumber: 585,
                                        columnNumber: 21,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "flex items-center gap-4",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "flex items-center gap-3",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className:
                                                      "h-9 w-9 rounded-full border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center text-[11px] text-gray-500",
                                                    children: h.actor?.imageUrl
                                                      ? /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "img",
                                                          {
                                                            src: h.actor
                                                              .imageUrl,
                                                            alt: actorName,
                                                            className:
                                                              "h-full w-full object-cover",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-detail-content.tsx",
                                                            lineNumber: 592,
                                                            columnNumber: 29,
                                                          },
                                                          this,
                                                        )
                                                      : actorName.slice(0, 1),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className: "leading-tight",
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "text-[15px] font-semibold text-gray-900",
                                                          children: actorName,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                                          lineNumber: 602,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "text-[13px] text-gray-500",
                                                          children: formatted,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/components/assets/asset-detail-content.tsx",
                                                          lineNumber: 605,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-detail-content.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 589,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "button",
                                            {
                                              type: "button",
                                              onClick: () =>
                                                setExpandedHistoryId(
                                                  isOpen ? null : h.id,
                                                ),
                                              className:
                                                "h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50",
                                              "aria-label": "Дэлгэрэнгүй",
                                              children: /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__[
                                                  "ChevronDown"
                                                ],
                                                {
                                                  className: `h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-detail-content.tsx",
                                                  lineNumber: 618,
                                                  columnNumber: 25,
                                                },
                                                this,
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-detail-content.tsx",
                                              lineNumber: 610,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-detail-content.tsx",
                                        lineNumber: 588,
                                        columnNumber: 21,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                h.id,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-detail-content.tsx",
                                  lineNumber: 581,
                                  columnNumber: 19,
                                },
                                this,
                              );
                            })
                          : /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "h-32 flex items-center justify-center text-gray-300 italic text-[13px]",
                                children: "Түүх олдсонгүй.",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-detail-content.tsx",
                                lineNumber: 629,
                                columnNumber: 15,
                              },
                              this,
                            ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/src/components/assets/asset-detail-content.tsx",
                        lineNumber: 569,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-detail-content.tsx",
                    lineNumber: 565,
                    columnNumber: 9,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                "[project]/src/components/assets/asset-detail-content.tsx",
              lineNumber: 248,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/components/assets/asset-detail-content.tsx",
          lineNumber: 247,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AssetDetailContent, "rMhcfWQ+mxPo7I+Du9FVCQpoivk=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useApolloClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useApolloClient"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
      ];
    });
    _c2 = AssetDetailContent;
    var _c, _c1, _c2;
    __turbopack_context__.k.register(
      _c,
      "MAIN_CATEGORY_BY_SUB$Object.entries(\n  SUB_CATEGORIES_BY_MAIN,\n).reduce",
    );
    __turbopack_context__.k.register(_c1, "MAIN_CATEGORY_BY_SUB");
    __turbopack_context__.k.register(_c2, "AssetDetailContent");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/src/components/assets/asset-filter.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AssetFilter", () => AssetFilter]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-client] (ecmascript) <export default as QrCode>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/gql/graphql.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/table.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/select.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$form$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/asset-form-dialog.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$transfer$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/asset-transfer-dialog.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$detail$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/assets/asset-detail-content.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    /** A4 хуудсан дээр 7 багана, ~4 эгнээ (хэвлэх layout-тай таарна) */ const QR_TILES_PER_A4_PAGE = 28;
    const STATUS_LABELS = {
      ASSIGNED: {
        label: "Эзэмшигчтэй",
        className: "bg-blue-100 text-blue-800",
      },
      ASSIGN_REQUESTED: {
        label: "Хүсэлт илгээсэн",
        className: "bg-amber-100 text-amber-800",
      },
      AVAILABLE: {
        label: "Эзэмшигчгүй",
        className: "bg-green-100 text-green-800",
      },
      IN_REPAIR: {
        label: "Засварт",
        className: "bg-amber-100 text-amber-800",
      },
      DAMAGED: {
        label: "Эвдрэлтэй",
        className: "bg-red-100 text-red-800",
      },
      DISPOSAL_REQUESTED: {
        label: "Устгах хүсэлт орсон",
        className: "bg-red-100 text-red-800",
      },
      PENDING_DISPOSAL: {
        label: "Устгах хүлээгдэж буй",
        className: "bg-gray-100 text-gray-800",
      },
      DISPOSED: {
        label: "Устгасан",
        className: "bg-gray-100 text-gray-600",
      },
      RETURNED: {
        label: "Буцаасан",
        className: "bg-gray-100 text-gray-600",
      },
      FOR_SALE: {
        label: "Зарж болох",
        className: "bg-yellow-100 text-yellow-800",
      },
    };
    function FilterIcon({ className }) {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "svg",
        {
          width: 16,
          height: 16,
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "cn"
          ])("shrink-0", className),
          stroke: "currentColor",
          strokeWidth: "1.16667",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "path",
            {
              d: "M6.66708 13.3333C6.66702 13.4572 6.70148 13.5787 6.7666 13.6841C6.83172 13.7895 6.92492 13.8746 7.03574 13.93L8.36908 14.5967C8.47074 14.6475 8.58371 14.6714 8.69724 14.6663C8.81077 14.6612 8.92111 14.6271 9.01776 14.5673C9.11442 14.5075 9.19419 14.424 9.24949 14.3247C9.30479 14.2254 9.3338 14.1137 9.33374 14V9.33333C9.33389 9.00292 9.45672 8.68433 9.67841 8.43933L14.4937 3.11333C14.5801 3.01771 14.6368 2.89912 14.6571 2.77192C14.6775 2.64472 14.6605 2.51435 14.6083 2.39658C14.5562 2.27881 14.471 2.17868 14.3631 2.1083C14.2552 2.03792 14.1292 2.0003 14.0004 2H2.00041C1.87148 2.00005 1.74533 2.03748 1.63724 2.10776C1.52915 2.17804 1.44376 2.27815 1.39141 2.39598C1.33906 2.5138 1.322 2.64427 1.34229 2.77159C1.36259 2.89892 1.41936 3.01762 1.50574 3.11333L6.32241 8.43933C6.5441 8.68433 6.66693 9.00292 6.66708 9.33333V13.3333Z",
            },
            void 0,
            false,
            {
              fileName: "[project]/src/components/assets/asset-filter.tsx",
              lineNumber: 85,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/components/assets/asset-filter.tsx",
          lineNumber: 73,
          columnNumber: 5,
        },
        this,
      );
    }
    _c = FilterIcon;
    function escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function getStatusBadge(status) {
      const upper = (status ?? "").toUpperCase().replace(/-/g, "_");
      const config = STATUS_LABELS[upper] ?? {
        label: status ?? "—",
        className: "bg-muted text-muted-foreground",
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "span",
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "cn"
          ])(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            config.className,
          ),
          children: config.label,
        },
        void 0,
        false,
        {
          fileName: "[project]/src/components/assets/asset-filter.tsx",
          lineNumber: 105,
          columnNumber: 5,
        },
        this,
      );
    }
    function AssetFilter() {
      _s();
      const [selectedIds, setSelectedIds] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(new Set());
      const [showAddDialog, setShowAddDialog] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [showTransferDialog, setShowTransferDialog] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [showAssignDialog, setShowAssignDialog] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [showQrDialog, setShowQrDialog] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [qrAssets, setQrAssets] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [detailAssetId, setDetailAssetId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [assignEmployeeId, setAssignEmployeeId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [assigning, setAssigning] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      // "" = бүх төлөв (filter хийгдээгүй)
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const selectAllRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRef"
      ])(null);
      const qrPrintRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRef"
      ])(null);
      const qrPages = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFilter.useMemo[qrPages]": () => {
            const pages = [];
            for (let i = 0; i < qrAssets.length; i += QR_TILES_PER_A4_PAGE) {
              pages.push(qrAssets.slice(i, i + QR_TILES_PER_A4_PAGE));
            }
            return pages.length > 0 ? pages : [[]];
          },
        }["AssetFilter.useMemo[qrPages]"],
        [qrAssets],
      );
      const assetsQueryVariables = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFilter.useMemo[assetsQueryVariables]": () => ({
            office: undefined,
            categoryIds: undefined,
            subCategoryIds: undefined,
            locationIds: undefined,
          }),
        }["AssetFilter.useMemo[assetsQueryVariables]"],
        [],
      );
      const { data, loading, error, refetch } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetAssetsDocument"
        ],
        {
          variables: assetsQueryVariables,
          fetchPolicy: "cache-first",
        },
      );
      const { data: categoriesData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "CategoriesDocument"
        ],
      );
      const { data: employeesData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "EmployeesDocument"
        ],
      );
      const { data: locationsData } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useQuery"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "GetLocationsDocument"
        ],
      );
      const [assignAssetMutation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMutation"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "AssignAssetDocument"
        ],
      );
      const employeeNameById = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFilter.useMemo[employeeNameById]": () => {
            const map = new Map();
            const employees = employeesData?.employees ?? [];
            employees.forEach(
              {
                "AssetFilter.useMemo[employeeNameById]": (e) => {
                  const name =
                    [e.firstName, e.lastName].filter(Boolean).join(" ") ||
                    e.email ||
                    e.id;
                  map.set(e.id, name);
                },
              }["AssetFilter.useMemo[employeeNameById]"],
            );
            return map;
          },
        }["AssetFilter.useMemo[employeeNameById]"],
        [employeesData?.employees],
      );
      const mainCategoryBySubName = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFilter.useMemo[mainCategoryBySubName]": () => {
            const map = new Map();
            (categoriesData?.categories ?? []).forEach(
              {
                "AssetFilter.useMemo[mainCategoryBySubName]": (main) => {
                  main.subcategories?.forEach(
                    {
                      "AssetFilter.useMemo[mainCategoryBySubName]": (sub) =>
                        map.set(sub.name, main.name),
                    }["AssetFilter.useMemo[mainCategoryBySubName]"],
                  );
                },
              }["AssetFilter.useMemo[mainCategoryBySubName]"],
            );
            return map;
          },
        }["AssetFilter.useMemo[mainCategoryBySubName]"],
        [categoriesData?.categories],
      );
      const locationPathById = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFilter.useMemo[locationPathById]": () => {
            const map = new Map();
            const locations = locationsData?.locations ?? [];
            const byId = new Map(
              locations.map(
                {
                  "AssetFilter.useMemo[locationPathById]": (l) => [l.id, l],
                }["AssetFilter.useMemo[locationPathById]"],
              ),
            );
            const buildPath = {
              "AssetFilter.useMemo[locationPathById].buildPath": (id) => {
                const cached = map.get(id);
                if (cached) return cached;
                const node = byId.get(id);
                if (!node) return id;
                const parent = node.parentId ? buildPath(node.parentId) : "";
                const path = parent ? `${parent} / ${node.name}` : node.name;
                map.set(id, path);
                return path;
              },
            }["AssetFilter.useMemo[locationPathById].buildPath"];
            locations.forEach(
              {
                "AssetFilter.useMemo[locationPathById]": (l) => buildPath(l.id),
              }["AssetFilter.useMemo[locationPathById]"],
            );
            return map;
          },
        }["AssetFilter.useMemo[locationPathById]"],
        [locationsData?.locations],
      );
      const assets = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFilter.useMemo[assets]": () => {
            if (!data?.assets) return [];
            const mapped = data.assets.map(
              {
                "AssetFilter.useMemo[assets].mapped": (a) => {
                  const categoryName =
                    typeof a.category === "string" ? a.category : "";
                  const rawLocationPath = (a.locationPath ?? "").trim();
                  const friendlyLocation =
                    rawLocationPath &&
                    !/^[0-9a-f-]{20,}$/i.test(rawLocationPath)
                      ? rawLocationPath
                      : a.locationId
                        ? (locationPathById.get(a.locationId) ?? undefined)
                        : undefined;
                  return {
                    id: a.id,
                    assetId: a.assetTag,
                    category: categoryName,
                    mainCategory: mainCategoryBySubName.get(categoryName),
                    location: friendlyLocation,
                    serialNumber: a.serialNumber,
                    purchaseCost: a.purchaseCost ?? 0,
                    residualValue: 0,
                    usefulLife: 0,
                    purchaseDate: a.purchaseDate
                      ? new Date(a.purchaseDate).toISOString()
                      : new Date().toISOString(),
                    currentBookValue: a.currentBookValue ?? a.purchaseCost ?? 0,
                    status: a.status,
                    assignedEmployeeId: a.assignedTo ?? undefined,
                    assignedEmployeeName: a.assignedTo
                      ? employeeNameById.get(a.assignedTo)
                      : undefined,
                    imageUrl: a.imageUrl ?? undefined,
                    notes: a.notes ?? undefined,
                    createdAt: new Date(a.createdAt).toISOString(),
                    updatedAt: new Date(a.updatedAt).toISOString(),
                  };
                },
              }["AssetFilter.useMemo[assets].mapped"],
            );
            // Шинээр нэмэгдсэн хөрөнгүүдийг дээр нь гаргах
            return mapped.sort(
              {
                "AssetFilter.useMemo[assets]": (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              }["AssetFilter.useMemo[assets]"],
            );
          },
        }["AssetFilter.useMemo[assets]"],
        [
          data?.assets,
          mainCategoryBySubName,
          employeeNameById,
          locationPathById,
        ],
      );
      const visibleAssets = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AssetFilter.useMemo[visibleAssets]": () => {
            if (!statusFilter || statusFilter === "all") return assets;
            const target = statusFilter.toUpperCase();
            return assets.filter(
              {
                "AssetFilter.useMemo[visibleAssets]": (a) => {
                  const s = (a.status ?? "").toUpperCase().replace(/-/g, "_");
                  return s === target;
                },
              }["AssetFilter.useMemo[visibleAssets]"],
            );
          },
        }["AssetFilter.useMemo[visibleAssets]"],
        [assets, statusFilter],
      );
      const openQrForSelected = () => {
        if (selectedIds.size === 0) {
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].error("Та эхлээд QR гаргах хөрөнгөө сонгоно уу.");
          return;
        }
        const list = assets.filter((a) => selectedIds.has(a.id));
        if (list.length === 0) {
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "toast"
          ].error("Сонгосон хөрөнгө олдсонгүй. Дахин оролдоно уу.");
          return;
        }
        setQrAssets(list);
        setShowQrDialog(true);
      };
      const openQrForSingle = (asset) => {
        setQrAssets([asset]);
        setShowQrDialog(true);
      };
      const handlePrintQr = () => {
        const origin = ("TURBOPACK compile-time truthy", 1)
          ? window.location.origin
          : "TURBOPACK unreachable";
        const tiles = qrAssets
          .map((asset, index) => {
            const qrUrl = `${origin}/assets/${asset.id}`;
            const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrUrl)}`;
            const label =
              escapeHtml(asset.assetId || "") ||
              escapeHtml(asset.serialNumber || "") ||
              `#${index + 1}`;
            return `
          <div class="qr-tile">
            <img class="qr-img" src="${qrImgSrc}" alt="${label} QR" />
            <div class="qr-code-label">${label}</div>
          </div>`;
          })
          .join("");
        const printWindow = window.open("", "_blank", "width=1424,height=768");
        if (!printWindow) return;
        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>QR код — хөрөнгө</title>
          <style>
            @page { size: A4; margin: 16mm; }
            body {
              font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
              color: #171717;
              background: #fff;
              padding: 24px;
              max-width: 210mm;
              margin: 0 auto;
            }
            .qr-grid {
              display: grid;
              grid-template-columns: repeat(7, minmax(0, 1fr));
              gap: 10px;
            }
            .qr-tile {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 4px;
              border-radius: 6px;
              break-inside: avoid;
            }
            .qr-img {
              width: 80px;
              height: 80px;
              border-radius: 6px;
              border: 1px solid #e5e5e5;
              object-fit: contain;
              background: #fff;
            }
            .qr-code-label {
              margin-top: 2px;
              font-size: 10px;
              color: #4b5563;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="qr-grid">
            ${tiles}
          </div>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 300);
      };
      const handleOpenQrPdfPreview = () => {
        const origin = ("TURBOPACK compile-time truthy", 1)
          ? window.location.origin
          : "TURBOPACK unreachable";
        const tiles = qrAssets
          .map((asset, index) => {
            const qrUrl = `${origin}/assets/${asset.id}`;
            const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrUrl)}`;
            const label =
              escapeHtml(asset.assetId || "") ||
              escapeHtml(asset.serialNumber || "") ||
              `#${index + 1}`;
            return `
          <div class="qr-tile">
            <img class="qr-img" src="${qrImgSrc}" alt="${label} QR" />
            <div class="qr-code-label">${label}</div>
          </div>`;
          })
          .join("");
        const previewWindow = window.open(
          "",
          "_blank",
          "width=1024,height=768",
        );
        if (!previewWindow) return;
        previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>QR код — хөрөнгө (PDF)</title>
          <style>
            @page { size: A4; margin: 16mm; }
            body {
              font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
              color: #171717;
              background: #fff;
              padding: 24px;
              max-width: 210mm;
              margin: 0 auto;
            }
            .qr-grid {
              display: grid;
              grid-template-columns: repeat(7, minmax(0, 1fr));
              gap: 10px;
            }
            .qr-tile {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 4px;
              border-radius: 6px;
              break-inside: avoid;
            }
            .qr-img {
              width: 80px;
              height: 80px;
              border-radius: 6px;
              border: 1px solid #e5e5e5;
              object-fit: contain;
              background: #fff;
            }
            .qr-code-label {
              margin-top: 2px;
              font-size: 10px;
              color: #4b5563;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="qr-grid">
            ${tiles}
          </div>
        </body>
      </html>
    `);
        previewWindow.document.close();
        previewWindow.focus();
      };
      const toggleSelect = (id) => {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      };
      const selectAll = () => {
        if (selectedIds.size === assets.length) {
          setSelectedIds(new Set());
        } else {
          setSelectedIds(new Set(assets.map((a) => a.id)));
        }
      };
      const allSelected =
        assets.length > 0 && selectedIds.size === assets.length;
      const someSelected = selectedIds.size > 0;
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AssetFilter.useEffect": () => {
            const el = selectAllRef.current;
            if (el) el.indeterminate = someSelected && !allSelected;
          },
        }["AssetFilter.useEffect"],
        [someSelected, allSelected],
      );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex-1 overflow-auto p-6 space-y-6",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "h1",
                  {
                    className: "text-2xl font-bold text-foreground",
                    children: "Эд хөрөнгө / Нийт хөрөнгө",
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-filter.tsx",
                    lineNumber: 479,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 478,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "flex flex-wrap gap-2",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Button"
                    ],
                    {
                      variant: "default",
                      className: "gap-2",
                      onClick: () => setShowAddDialog(true),
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
                            "Plus"
                          ],
                          {
                            className: "h-4 w-4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-filter.tsx",
                            lineNumber: 490,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        "Хөрөнгө нэмэх",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-filter.tsx",
                      lineNumber: 485,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Button"
                    ],
                    {
                      variant: "outline",
                      className: "gap-2",
                      onClick: () => setShowTransferDialog(true),
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__[
                            "ArrowRightLeft"
                          ],
                          {
                            className: "h-4 w-4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-filter.tsx",
                            lineNumber: 498,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        "Хөрөнгө шилжүүлэх",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-filter.tsx",
                      lineNumber: 493,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Button"
                    ],
                    {
                      variant: "outline",
                      className: "gap-2",
                      onClick: openQrForSelected,
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__[
                            "QrCode"
                          ],
                          {
                            className: "h-4 w-4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-filter.tsx",
                            lineNumber: 502,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        "Сонгосон хөрөнгийн QR (A4)",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-filter.tsx",
                      lineNumber: 501,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Button"
                    ],
                    {
                      variant: "outline",
                      className: "gap-2",
                      onClick: () => {
                        if (selectedIds.size === 0) {
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "toast"
                          ].error("Эхлээд хуваарилах хөрөнгөө сонгоно уу.");
                          return;
                        }
                        setShowAssignDialog(true);
                      },
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__[
                            "ArrowRightLeft"
                          ],
                          {
                            className: "h-4 w-4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/components/assets/asset-filter.tsx",
                            lineNumber: 516,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        "Хөрөнгө хуваарилах",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-filter.tsx",
                      lineNumber: 505,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Button"
                    ],
                    {
                      asChild: true,
                      variant: "outline",
                      className: "gap-2",
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "default"
                        ],
                        {
                          href: "/?title=Хөрөнгө буцаах",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__[
                                "Undo2"
                              ],
                              {
                                className: "h-4 w-4",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 521,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            "Хөрөнгө буцаах",
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 520,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/components/assets/asset-filter.tsx",
                      lineNumber: 519,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 484,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$form$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "AssetFormDialog"
              ],
              {
                open: showAddDialog,
                onOpenChange: setShowAddDialog,
                onAddAssets: () => {
                  refetch();
                },
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 527,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$transfer$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "AssetTransferDialog"
              ],
              {
                open: showTransferDialog,
                onOpenChange: setShowTransferDialog,
                selectedAssets: assets
                  .filter((a) => selectedIds.has(a.id))
                  .map((a) => ({
                    id: a.id,
                    assetTag: a.assetId,
                  })),
                onRemoveAsset: (id) =>
                  setSelectedIds((prev) => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                  }),
                onSuccess: () => {
                  refetch();
                  setSelectedIds(new Set());
                },
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 535,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Dialog"
              ],
              {
                open: showAssignDialog,
                onOpenChange: setShowAssignDialog,
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogContent"
                  ],
                  {
                    className: "sm:max-w-md",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogHeader"
                        ],
                        {
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "DialogTitle"
                              ],
                              {
                                children: "Хөрөнгө хуваарилах",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 557,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "DialogDescription"
                              ],
                              {
                                children:
                                  "Сонгосон хөрөнгийг ажилтанд хуваарилах хүсэлт илгээнэ.",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 558,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 556,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "space-y-4 py-2",
                          children: (() => {
                            const selectedAssetsList = assets.filter((a) =>
                              selectedIds.has(a.id),
                            );
                            const primaryAsset = selectedAssetsList[0];
                            const employeeName =
                              assignEmployeeId &&
                              employeeNameById.get(assignEmployeeId || "");
                            return /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Fragment"
                              ],
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-sm font-medium text-foreground",
                                            children: "Сонгогдсон хөрөнгө",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-filter.tsx",
                                            lineNumber: 576,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className:
                                              "mt-2 flex flex-wrap gap-2 rounded-md border border-input bg-muted/30 p-2 min-h-[52px]",
                                            children:
                                              selectedAssetsList.length === 0
                                                ? /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "text-sm text-muted-foreground py-1",
                                                      children:
                                                        "Хөрөнгө сонгоогүй байна. Хүснэгтээс сонгоно уу.",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-filter.tsx",
                                                      lineNumber: 581,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  )
                                                : selectedAssetsList.map(
                                                    (asset) =>
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "span",
                                                        {
                                                          className:
                                                            "inline-flex items-center gap-1 rounded-md bg-background px-2 py-1 text-sm border border-border",
                                                          children:
                                                            asset.assetId,
                                                        },
                                                        asset.id,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/components/assets/asset-filter.tsx",
                                                          lineNumber: 586,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                  ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-filter.tsx",
                                            lineNumber: 579,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-filter.tsx",
                                      lineNumber: 575,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-sm font-medium text-foreground",
                                            children: "Ажилтан сонгох",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-filter.tsx",
                                            lineNumber: 598,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "Select"
                                          ],
                                          {
                                            value:
                                              assignEmployeeId || undefined,
                                            onValueChange: setAssignEmployeeId,
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "SelectTrigger"
                                                ],
                                                {
                                                  className: "mt-2 w-full",
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "SelectValue"
                                                    ],
                                                    {
                                                      placeholder: "Сонгоно уу",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-filter.tsx",
                                                      lineNumber: 606,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-filter.tsx",
                                                  lineNumber: 605,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "SelectContent"
                                                ],
                                                {
                                                  children: Array.from(
                                                    employeeNameById.entries(),
                                                  ).map(([id, name]) =>
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "SelectItem"
                                                      ],
                                                      {
                                                        value: id,
                                                        children: name,
                                                      },
                                                      id,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/components/assets/asset-filter.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 29,
                                                      },
                                                      this,
                                                    ),
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-filter.tsx",
                                                  lineNumber: 608,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-filter.tsx",
                                            lineNumber: 601,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-filter.tsx",
                                      lineNumber: 597,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  primaryAsset &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "rounded-lg border bg-muted/40 p-4 space-y-2",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                                              children:
                                                "Олголтын урьдчилсан мэдээлэл",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 622,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "grid grid-cols-2 gap-x-6 gap-y-1 text-sm",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className:
                                                      "text-muted-foreground",
                                                    children: "Ажилтан",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 626,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className: "font-medium",
                                                    children:
                                                      employeeName || "—",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className:
                                                      "text-muted-foreground",
                                                    children: "Хөрөнгө",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className: "font-medium",
                                                    children:
                                                      primaryAsset.assetId,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 631,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className:
                                                      "text-muted-foreground",
                                                    children: "Сериал дугаар",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className: "font-medium",
                                                    children:
                                                      primaryAsset.serialNumber,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className:
                                                      "text-muted-foreground",
                                                    children: "Үнэ",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className: "font-medium",
                                                    children: [
                                                      (
                                                        primaryAsset.currentBookValue ||
                                                        primaryAsset.purchaseCost ||
                                                        0
                                                      ).toLocaleString(),
                                                      "₮",
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 625,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 621,
                                        columnNumber: 21,
                                      },
                                      this,
                                    ),
                                ],
                              },
                              void 0,
                              true,
                            );
                          })(),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 563,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogFooter"
                        ],
                        {
                          className: "mt-4",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                type: "button",
                                variant: "outline",
                                onClick: () => setShowAssignDialog(false),
                                children: "Цуцлах",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 658,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                type: "button",
                                disabled:
                                  assigning ||
                                  !assignEmployeeId ||
                                  Array.from(selectedIds).length === 0,
                                onClick: async () => {
                                  if (
                                    !assignEmployeeId ||
                                    selectedIds.size === 0
                                  )
                                    return;
                                  setAssigning(true);
                                  const toastId =
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "toast"
                                    ].loading(
                                      "Хуваарилах хүсэлт илгээж байна...",
                                    );
                                  try {
                                    const targets = assets.filter((a) =>
                                      selectedIds.has(a.id),
                                    );
                                    for (const asset of targets) {
                                      await assignAssetMutation({
                                        variables: {
                                          assetId: asset.id,
                                          employeeId: assignEmployeeId,
                                          conditionAtAssign: "GOOD",
                                        },
                                      });
                                    }
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "toast"
                                    ].success(
                                      `${targets.length} хөрөнгө амжилттай хуваарилах хүсэлт илгээгдлээ.`,
                                      {
                                        id: toastId,
                                      },
                                    );
                                    setShowAssignDialog(false);
                                    setAssignEmployeeId("");
                                    setSelectedIds(new Set());
                                    refetch();
                                  } catch {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "toast"
                                    ].error(
                                      "Хуваарилах хүсэлт илгээхэд алдаа гарлаа.",
                                      {
                                        id: toastId,
                                      },
                                    );
                                  } finally {
                                    setAssigning(false);
                                  }
                                },
                                children: "Хүсэлт илгээх",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 665,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 657,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-filter.tsx",
                    lineNumber: 555,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 554,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Dialog"
              ],
              {
                open: showQrDialog,
                onOpenChange: setShowQrDialog,
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogContent"
                  ],
                  {
                    className:
                      "max-w-7xl w-[98vw] max-h-[92vh] flex flex-col overflow-hidden",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex flex-col flex-1 min-h-0",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "DialogHeader"
                              ],
                              {
                                className: "shrink-0",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "DialogTitle"
                                    ],
                                    {
                                      children: "QR код хэвлэх / PDF болгох",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-filter.tsx",
                                      lineNumber: 716,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "DialogDescription"
                                    ],
                                    {
                                      children:
                                        "Сонгосон хөрөнгийн QR кодуудыг A4 хэмжээтэй хуудсан дээр харах, хэвлэх эсвэл browser-ийн `Print → Save as PDF`-ээр PDF болгон хадгалах боломжтой.",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-filter.tsx",
                                      lineNumber: 717,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 715,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            qrAssets.length > 1 &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className:
                                    "text-sm text-muted-foreground mt-1 shrink-0",
                                  children: [
                                    "Нийт ",
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "strong",
                                      {
                                        children: qrAssets.length,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 725,
                                        columnNumber: 22,
                                      },
                                      this,
                                    ),
                                    " хөрөнгө · 1 A4 хуудасанд",
                                    " ",
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "strong",
                                      {
                                        children: QR_TILES_PER_A4_PAGE,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 726,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    " ширхэг · нийт A4 дээр",
                                    " ",
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "strong",
                                      {
                                        children: Math.ceil(
                                          qrAssets.length /
                                            QR_TILES_PER_A4_PAGE,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 727,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    " ",
                                    "хуудас гарна.",
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-filter.tsx",
                                  lineNumber: 724,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                ref: qrPrintRef,
                                className:
                                  "mt-4 bg-white p-4 border border-border rounded-lg shadow-sm flex-1 min-h-0 overflow-auto",
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-6 py-2",
                                    children: qrPages.map(
                                      (pageAssets, pageIndex) => {
                                        const pageNumber = pageIndex + 1;
                                        return /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className: "mx-auto w-fit",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "div",
                                                {
                                                  className:
                                                    "mb-2 text-xs text-muted-foreground",
                                                  children: [
                                                    "A4 · Хуудас ",
                                                    pageNumber,
                                                    " / ",
                                                    qrPages.length,
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-filter.tsx",
                                                  lineNumber: 742,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "div",
                                                {
                                                  className:
                                                    "w-[794px] h-[1123px] bg-white border border-border shadow-sm rounded-md overflow-hidden print:shadow-none print:border-0 print:rounded-none print:break-after-page last:print:break-after-auto",
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className:
                                                        "h-full w-full p-8",
                                                      children:
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "div",
                                                          {
                                                            className:
                                                              "grid grid-cols-7 grid-rows-4 gap-2 h-full",
                                                            children:
                                                              Array.from(
                                                                {
                                                                  length:
                                                                    QR_TILES_PER_A4_PAGE,
                                                                },
                                                                (_, i) =>
                                                                  pageAssets[
                                                                    i
                                                                  ] ?? null,
                                                              ).map(
                                                                (
                                                                  asset,
                                                                  index,
                                                                ) => {
                                                                  if (!asset) {
                                                                    return /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "rounded-md border border-transparent",
                                                                      },
                                                                      `empty-${pageNumber}-${index}`,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/components/assets/asset-filter.tsx",
                                                                        lineNumber: 754,
                                                                        columnNumber: 35,
                                                                      },
                                                                      this,
                                                                    );
                                                                  }
                                                                  const qrUrl =
                                                                    ("TURBOPACK compile-time truthy",
                                                                    1)
                                                                      ? `${window.location.origin}/assets/${asset.id}`
                                                                      : "TURBOPACK unreachable";
                                                                  const label =
                                                                    asset.assetId ||
                                                                    asset.serialNumber ||
                                                                    `#${pageIndex * QR_TILES_PER_A4_PAGE + index + 1}`;
                                                                  return /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "flex flex-col items-center justify-center rounded-md border border-border/60 bg-white p-2 min-h-0",
                                                                      children:
                                                                        [
                                                                          /*#__PURE__*/ (0,
                                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                            "jsxDEV"
                                                                          ])(
                                                                            "img",
                                                                            {
                                                                              src: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}`,
                                                                              alt: `${label} QR`,
                                                                              className:
                                                                                "h-16 w-16 rounded bg-white object-contain shrink-0",
                                                                            },
                                                                            void 0,
                                                                            false,
                                                                            {
                                                                              fileName:
                                                                                "[project]/src/components/assets/asset-filter.tsx",
                                                                              lineNumber: 773,
                                                                              columnNumber: 35,
                                                                            },
                                                                            this,
                                                                          ),
                                                                          /*#__PURE__*/ (0,
                                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                            "jsxDEV"
                                                                          ])(
                                                                            "span",
                                                                            {
                                                                              className:
                                                                                "mt-1 text-[10px] text-muted-foreground text-center truncate w-full leading-tight",
                                                                              children:
                                                                                label,
                                                                            },
                                                                            void 0,
                                                                            false,
                                                                            {
                                                                              fileName:
                                                                                "[project]/src/components/assets/asset-filter.tsx",
                                                                              lineNumber: 780,
                                                                              columnNumber: 35,
                                                                            },
                                                                            this,
                                                                          ),
                                                                        ],
                                                                    },
                                                                    asset.id,
                                                                    true,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/components/assets/asset-filter.tsx",
                                                                      lineNumber: 769,
                                                                      columnNumber: 33,
                                                                    },
                                                                    this,
                                                                  );
                                                                },
                                                              ),
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/components/assets/asset-filter.tsx",
                                                            lineNumber: 747,
                                                            columnNumber: 27,
                                                          },
                                                          this,
                                                        ),
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/components/assets/asset-filter.tsx",
                                                      lineNumber: 746,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-filter.tsx",
                                                  lineNumber: 745,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          pageNumber,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-filter.tsx",
                                            lineNumber: 741,
                                            columnNumber: 21,
                                          },
                                          this,
                                        );
                                      },
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 737,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 733,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 714,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogFooter"
                        ],
                        {
                          className:
                            "mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between shrink-0",
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "flex gap-2 justify-end",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "Button"
                                  ],
                                  {
                                    variant: "outline",
                                    onClick: () => setShowQrDialog(false),
                                    children: "Хаах",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 797,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "Button"
                                  ],
                                  {
                                    variant: "outline",
                                    className: "gap-2",
                                    onClick: handleOpenQrPdfPreview,
                                    children: "PDF файл болгох",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 800,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "Button"
                                  ],
                                  {
                                    onClick: handlePrintQr,
                                    className: "gap-2",
                                    children: "Хэвлэх (A4)",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 807,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/components/assets/asset-filter.tsx",
                              lineNumber: 796,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 795,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "text-xs text-muted-foreground shrink-0",
                          children: [
                            "PDF болгох бол доорх ",
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "b",
                              {
                                children: "“PDF файл болгох”",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 813,
                                columnNumber: 34,
                              },
                              this,
                            ),
                            " товчийг дарж, нээгдсэн цонхноос ",
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "b",
                              {
                                children: "Save as PDF",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 814,
                                columnNumber: 22,
                              },
                              this,
                            ),
                            " сонгоно уу.",
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 812,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-filter.tsx",
                    lineNumber: 713,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 712,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Dialog"
              ],
              {
                open: !!detailAssetId,
                onOpenChange: (open) => !open && setDetailAssetId(null),
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogContent"
                  ],
                  {
                    className: "",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogTitle"
                        ],
                        {
                          className: "sr-only",
                          children: "Хөрөнгийн дэлгэрэнгүй",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 824,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "flex-1 min-h-0 overflow-y-auto -mx-1 px-1",
                          children:
                            detailAssetId &&
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$assets$2f$asset$2d$detail$2d$content$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "AssetDetailContent"
                              ],
                              {
                                assetId: detailAssetId,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/components/assets/asset-filter.tsx",
                                lineNumber: 827,
                                columnNumber: 15,
                              },
                              this,
                            ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 825,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-filter.tsx",
                    lineNumber: 823,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 819,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "rounded-md border border-border overflow-hidden min-h-[520px]",
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "Table"
                  ],
                  {
                    className: "table-fixed w-full",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "TableHeader"
                        ],
                        {
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "TableRow"
                            ],
                            {
                              className:
                                "border-0 bg-sky-800 hover:bg-sky-800 h-11",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "w-12 h-11 font-medium border-0 text-white align-middle",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "flex items-center gap-1 cursor-pointer",
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "input",
                                          {
                                            ref: selectAllRef,
                                            type: "checkbox",
                                            checked: allSelected,
                                            onChange: selectAll,
                                            className:
                                              "h-4 w-4 rounded border-2 border-white bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-2",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/components/assets/asset-filter.tsx",
                                            lineNumber: 842,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 841,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 840,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white align-middle w-12",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "flex items-center gap-1",
                                        children: [
                                          "№ ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 853,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 852,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 851,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white align-middle min-w-[100px]",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "flex items-center gap-1",
                                        children: [
                                          "Хөрөнгийн ID ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 858,
                                              columnNumber: 32,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 857,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 856,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white align-middle min-w-[100px]",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "flex items-center gap-1",
                                        children: [
                                          "Хөрөнгийн нэр ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 863,
                                              columnNumber: 33,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 862,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 861,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white align-middle min-w-[80px]",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "flex items-center gap-1",
                                        children: [
                                          "Ангилал ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 868,
                                              columnNumber: 27,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 867,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 866,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white align-middle min-w-[80px]",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "flex items-center gap-1",
                                        children: [
                                          "Дэд ангилал ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 873,
                                              columnNumber: 31,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 872,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 871,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white w-[140px] min-w-[140px] p-1 align-middle",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "Select"
                                      ],
                                      {
                                        value: statusFilter || "all",
                                        onValueChange: (v) =>
                                          setStatusFilter(v === "all" ? "" : v),
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "SelectTrigger"
                                            ],
                                            {
                                              className:
                                                "h-8 w-full cursor-pointer border-0 bg-transparent text-white hover:bg-white/10 focus:ring-0 focus:ring-offset-0 gap-1 px-2  [&>svg]:text-white",
                                              children: /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className:
                                                    "flex items-center gap-1",
                                                  children: [
                                                    "Төлөв",
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      FilterIcon,
                                                      {
                                                        className: "h-3 w-3 ",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/components/assets/asset-filter.tsx",
                                                        lineNumber: 884,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/components/assets/asset-filter.tsx",
                                                  lineNumber: 882,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 881,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "SelectContent"
                                            ],
                                            {
                                              position: "popper",
                                              align: "start",
                                              sideOffset: 4,
                                              className:
                                                "z-[100] max-h-[var(--radix-select-content-available-height)]",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectItem"
                                                  ],
                                                  {
                                                    value: "all",
                                                    children: "Бүгд",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 893,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectItem"
                                                  ],
                                                  {
                                                    value: "ASSIGNED",
                                                    children: "Эзэмшигчтэй",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 894,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectItem"
                                                  ],
                                                  {
                                                    value: "AVAILABLE",
                                                    children: "Эзэмшигчгүй",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 895,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectItem"
                                                  ],
                                                  {
                                                    value: "FOR_SALE",
                                                    children: "Зарж болох",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 896,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "SelectItem"
                                                  ],
                                                  {
                                                    value: "DAMAGED",
                                                    children: "Эвдрэлтэй",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 897,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 887,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 877,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 876,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white align-middle min-w-[90px]",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "flex items-center gap-1",
                                        children: [
                                          "Байршил ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 903,
                                              columnNumber: 27,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 902,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 901,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium border-0 text-white align-middle min-w-[90px]",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "flex items-center gap-1",
                                        children: [
                                          "Эзэмшигч ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 908,
                                              columnNumber: 28,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 907,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 906,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium text-right border-0 text-white align-middle w-24",
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className:
                                          "flex items-center justify-end gap-1",
                                        children: [
                                          "Үнэ (₮) ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            FilterIcon,
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 913,
                                              columnNumber: 27,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/components/assets/asset-filter.tsx",
                                        lineNumber: 912,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 911,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className:
                                      "h-11 font-medium text-right border-0 text-white align-middle w-14",
                                    children: "QR",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 916,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/components/assets/asset-filter.tsx",
                              lineNumber: 839,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 838,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "TableBody"
                        ],
                        {
                          children: [
                            loading &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "TableRow"
                                ],
                                {
                                  className: "h-32",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableCell"
                                    ],
                                    {
                                      colSpan: 12,
                                      className:
                                        "h-32 py-12 text-center font-medium text-black align-middle",
                                      children: "Ачаалж байна...",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-filter.tsx",
                                      lineNumber: 924,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-filter.tsx",
                                  lineNumber: 923,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            error &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "TableRow"
                                ],
                                {
                                  className: "h-32",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableCell"
                                    ],
                                    {
                                      colSpan: 12,
                                      className:
                                        "h-32 py-12 text-center font-medium text-destructive align-middle",
                                      children: error.message,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-filter.tsx",
                                      lineNumber: 934,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-filter.tsx",
                                  lineNumber: 933,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            !loading &&
                              !error &&
                              visibleAssets.length === 0 &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "TableRow"
                                ],
                                {
                                  className: "h-32",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableCell"
                                    ],
                                    {
                                      colSpan: 12,
                                      className:
                                        "h-32 py-12 text-center font-medium text-black align-middle",
                                      children: "Хөрөнгө олдсонгүй.",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/components/assets/asset-filter.tsx",
                                      lineNumber: 944,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/components/assets/asset-filter.tsx",
                                  lineNumber: 943,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            !loading &&
                              !error &&
                              visibleAssets.map((asset, index) =>
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableRow"
                                  ],
                                  {
                                    className: "border-border h-12",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className: "w-12 py-2 align-middle",
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "input",
                                            {
                                              type: "checkbox",
                                              checked: selectedIds.has(
                                                asset.id,
                                              ),
                                              onChange: () =>
                                                toggleSelect(asset.id),
                                              className:
                                                "h-4 w-4 rounded border-border",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 957,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 956,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children: index + 1,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 964,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "button",
                                              {
                                                type: "button",
                                                onClick: () =>
                                                  setDetailAssetId(asset.id),
                                                className:
                                                  "text-black hover:underline text-left",
                                                title:
                                                  "Дэлгэрэнгүй үзэх, бүтэн түүх (бүртгэл, шилжүүлэлт, IT баталгаа г.м)",
                                                children: asset.assetId,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/asset-filter.tsx",
                                                lineNumber: 968,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "button",
                                              {
                                                type: "button",
                                                onClick: () =>
                                                  setDetailAssetId(asset.id),
                                                className:
                                                  "ml-2 text-xs text-muted-foreground hover:underline",
                                                title:
                                                  "Бүтэн түүх: бүртгэгдсэн, хэн рүү шилжсэн, IT админ баталсан г.м",
                                                children: "Түүх",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/components/assets/asset-filter.tsx",
                                                lineNumber: 976,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 967,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children:
                                            asset.category ?? asset.assetId,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 985,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children: asset.mainCategory ?? "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 988,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children: asset.category ?? "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 991,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children: getStatusBadge(
                                            asset.status,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 994,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children: asset.location ?? "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 997,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "font-medium text-black py-2 align-middle",
                                          children:
                                            asset.assignedEmployeeName ??
                                            asset.assignedEmployeeId ??
                                            "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 1000,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "text-right font-medium tabular-nums text-black py-2 align-middle",
                                          children:
                                            asset.currentBookValue.toLocaleString(),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 1005,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className:
                                            "text-right py-2 align-middle",
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "Button"
                                            ],
                                            {
                                              variant: "outline",
                                              size: "xs",
                                              className: "gap-1",
                                              onClick: () =>
                                                openQrForSingle(asset),
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__[
                                                    "QrCode"
                                                  ],
                                                  {
                                                    className: "h-3 w-3",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/components/assets/asset-filter.tsx",
                                                    lineNumber: 1015,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                                "QR харах",
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/components/assets/asset-filter.tsx",
                                              lineNumber: 1009,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/components/assets/asset-filter.tsx",
                                          lineNumber: 1008,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  asset.id,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/components/assets/asset-filter.tsx",
                                    lineNumber: 955,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                              ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/src/components/assets/asset-filter.tsx",
                          lineNumber: 921,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/src/components/assets/asset-filter.tsx",
                    lineNumber: 837,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/assets/asset-filter.tsx",
                lineNumber: 836,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/components/assets/asset-filter.tsx",
          lineNumber: 477,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AssetFilter, "aO0sKW1qGUHTO8yoRSaGx6ZZSAQ=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useQuery"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useMutation"
        ],
      ];
    });
    _c1 = AssetFilter;
    var _c, _c1;
    __turbopack_context__.k.register(_c, "FilterIcon");
    __turbopack_context__.k.register(_c1, "AssetFilter");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
]);

//# sourceMappingURL=src_components_assets_0b44403e._.js.map
