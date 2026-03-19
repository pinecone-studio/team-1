(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/demo-it/demo-it-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_IT_APPROVER_INDEX",
    ()=>DEMO_IT_APPROVER_INDEX,
    "DISPOSAL_STATUS_LABELS",
    ()=>DISPOSAL_STATUS_LABELS,
    "MAINTENANCE_STATUS_LABELS",
    ()=>MAINTENANCE_STATUS_LABELS,
    "PDF_FONT_BOLD",
    ()=>PDF_FONT_BOLD,
    "PDF_FONT_NAME",
    ()=>PDF_FONT_NAME,
    "PDF_FONT_REGULAR",
    ()=>PDF_FONT_REGULAR,
    "arrayBufferToBase64",
    ()=>arrayBufferToBase64,
    "dataUrlToBlob",
    ()=>dataUrlToBlob,
    "ensurePdfFonts",
    ()=>ensurePdfFonts,
    "normalizeAssetTag",
    ()=>normalizeAssetTag
]);
"use client";
const DISPOSAL_STATUS_LABELS = {
    PENDING: "Хүлээгдэж буй",
    IT_APPROVED: "IT баталгаажсан",
    FINANCE_APPROVED: "Санхүү баталгаажсан",
    COMPLETED: "Дууссан",
    REJECTED: "Татгалзсан"
};
const PDF_FONT_REGULAR = "/fonts/NotoSans-Variable.ttf";
const PDF_FONT_BOLD = "/fonts/NotoSans-Variable.ttf";
const PDF_FONT_NAME = "NotoSans";
let cachedPdfFontRegular = null;
let cachedPdfFontBold = null;
const arrayBufferToBase64 = (buffer)=>{
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;
    let binary = "";
    for(let i = 0; i < bytes.length; i += chunkSize){
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
};
async function ensurePdfFonts(pdf) {
    if (!cachedPdfFontRegular) {
        const res = await fetch(PDF_FONT_REGULAR);
        if (!res.ok) throw new Error("PDF font татаж чадсангүй.");
        cachedPdfFontRegular = arrayBufferToBase64(await res.arrayBuffer());
    }
    if (!cachedPdfFontBold) {
        if ("TURBOPACK compile-time truthy", 1) {
            cachedPdfFontBold = cachedPdfFontRegular;
        } else //TURBOPACK unreachable
        ;
    }
    if (!cachedPdfFontRegular || !cachedPdfFontBold) {
        throw new Error("PDF font уншихад алдаа гарлаа.");
    }
    pdf.addFileToVFS("NotoSans-Regular.ttf", cachedPdfFontRegular);
    pdf.addFont("NotoSans-Regular.ttf", PDF_FONT_NAME, "normal");
    pdf.addFileToVFS("NotoSans-Bold.ttf", cachedPdfFontBold);
    pdf.addFont("NotoSans-Bold.ttf", PDF_FONT_NAME, "bold");
}
const normalizeAssetTag = (value)=>{
    if (!value) return "—";
    const trimmed = value.trim();
    if (trimmed.length <= 3) return trimmed.toUpperCase();
    const parts = trimmed.split("-");
    if (parts.length >= 2) {
        const prefix = parts[0].slice(0, 3).toUpperCase();
        return [
            prefix,
            ...parts.slice(1)
        ].join("-");
    }
    return trimmed.slice(0, 3).toUpperCase();
};
const DEMO_IT_APPROVER_INDEX = 0;
const MAINTENANCE_STATUS_LABELS = {
    OPEN: "Нээлттэй",
    IN_PROGRESS: "Хийгдэж буй",
    RESOLVED: "Шийдвэрлэгдсэн",
    CLOSED: "Хаагдсан"
};
const dataUrlToBlob = (dataUrl)=>{
    const [header, data] = dataUrl.split(",");
    const mimeMatch = header.match(/data:(.*);base64/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i += 1)bytes[i] = binary.charCodeAt(i);
    return new Blob([
        bytes
    ], {
        type: mime
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/useDemoIT.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDemoIT",
    ()=>useDemoIT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/gql/graphql.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/demo-it-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function useDemoIT() {
    _s();
    const [selectedDisposal, setSelectedDisposal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signatureData, setSignatureData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signatureUploading, setSignatureUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dataWipeConfirmed, setDataWipeConfirmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDisposalChecked, setIsDisposalChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: disposalsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetActiveDisposalsDocument"], {
        fetchPolicy: "network-only"
    });
    const { data: employeesData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmployeesDocument"]);
    const demoApproverId = employeesData?.employees?.[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_IT_APPROVER_INDEX"]]?.id ?? "";
    const { data: allDisposalsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDisposalRequestsDocument"], {
        variables: {
            status: undefined
        },
        fetchPolicy: "network-only"
    });
    const allDisposals = (allDisposalsData?.disposalRequests ?? []).slice().sort((a, b)=>(b?.createdAt ?? 0) - (a?.createdAt ?? 0));
    const { data: maintenanceData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetMaintenanceTicketsDocument"], {
        variables: {
            status: undefined
        },
        fetchPolicy: "network-only"
    });
    const allMaintenanceTickets = maintenanceData?.maintenanceTickets ?? [];
    const { data: wipeData, refetch: refetchWipe } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDataWipeTasksDocument"], {
        variables: {
            status: "PENDING"
        },
        fetchPolicy: "network-only"
    });
    const wipeTasks = wipeData?.dataWipeTasks ?? [];
    const { data: dashboardData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDashboardDocument"], {
        variables: {
            role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].ItAdmin
        },
        fetchPolicy: "network-only"
    });
    const itNotifications = dashboardData?.dashboard?.itView?.notifications ?? [];
    const [approveDisposal, { loading: approving }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApproveDisposalDocument"], {
        refetchQueries: [
            {
                query: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetActiveDisposalsDocument"]
            },
            {
                query: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDisposalRequestsDocument"],
                variables: {
                    status: undefined
                }
            },
            {
                query: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDashboardDocument"],
                variables: {
                    role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].ItAdmin
                }
            }
        ]
    });
    const [rejectDisposal, { loading: rejecting }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RejectDisposalDocument"], {
        refetchQueries: [
            {
                query: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetActiveDisposalsDocument"]
            },
            {
                query: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDisposalRequestsDocument"],
                variables: {
                    status: undefined
                }
            },
            {
                query: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDashboardDocument"],
                variables: {
                    role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].ItAdmin
                }
            }
        ]
    });
    const [updateWipeTask, { loading: updatingWipe }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UpdateDataWipeTaskDocument"]);
    const pendingDisposals = disposalsData?.disposalRequests ?? [];
    const handleApprove = async (id)=>{
        if (!demoApproverId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Баталгаажуулах ажилтан олдсонгүй.");
            return;
        }
        try {
            await approveDisposal({
                variables: {
                    id,
                    approvedBy: demoApproverId,
                    stage: "IT_APPROVED"
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Устгах хүсэлтийг IT-ээр баталгаажууллаа.");
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Баталгаажуулахад алдаа гарлаа.");
        }
    };
    const handleReject = async (id)=>{
        if (!demoApproverId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Татгалзах ажилтан олдсонгүй.");
            return;
        }
        try {
            await rejectDisposal({
                variables: {
                    id,
                    rejectedBy: demoApproverId,
                    reason: "Татгалзсан"
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Устгах хүсэлтийг татгалзлаа.");
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Татгалзах үед алдаа гарлаа.");
        }
    };
    const handleSaveSignature = (dataUrl)=>{
        setSignatureData(dataUrl);
    };
    const handleClearSignature = ()=>{
        setSignatureData(null);
    };
    const uploadApprovalPdf = async (item)=>{
        if (!signatureData) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Эхлээд гарын үсгээ зурна уу.");
            return false;
        }
        const bucketName = ("TURBOPACK compile-time value", "assets-management");
        const publicUrl = ("TURBOPACK compile-time value", "https://pub-de50afb5e9934f62ad9c809976d139d8.r2.dev");
        const graphqlUrl = ("TURBOPACK compile-time value", "https://my-next-app.tsetsegulziiocherdene.workers.dev/api/graphql");
        const presignUrl = ("TURBOPACK compile-time value", "https://my-next-app.tsetsegulziiocherdene.workers.dev/api/r2/presign") ?? (("TURBOPACK compile-time truthy", 1) ? graphqlUrl.replace(/\/api\/graphql$/, "/api/r2/presign") : "TURBOPACK unreachable");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            setSignatureUploading(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Баталгаажуулалтын PDF үүсгэж байна...", {
                id: "disposal-approve-pdf"
            });
            const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                orientation: "p",
                unit: "mm",
                format: "a4"
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensurePdfFonts"])(pdf);
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 16;
            const contentWidth = pageWidth - margin * 2;
            let cursorY = 18;
            const assetName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"])(item.asset?.assetTag ?? item.assetId);
            const category = item.asset?.category ?? "—";
            const requestedByName = item.requestedBy ? [
                item.requestedBy.firstName,
                item.requestedBy.lastName
            ].filter(Boolean).join(" ") || item.requestedBy.email : "Admin";
            const methodLabel = item.method ?? "—";
            const reasonLabel = item.reason ?? "—";
            const approverName = employeesData?.employees?.[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_IT_APPROVER_INDEX"]]?.firstName ? `${employeesData?.employees?.[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_IT_APPROVER_INDEX"]]?.firstName ?? ""} ${employeesData?.employees?.[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_IT_APPROVER_INDEX"]]?.lastName ?? ""}`.trim() : "IT Admin";
            pdf.setFillColor(245, 247, 250);
            pdf.rect(0, 0, pageWidth, 34, "F");
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.setFontSize(18);
            pdf.text("Эвдрэлтэй хөрөнгийн баталгаажуулалт", pageWidth / 2, 20, {
                align: "center"
            });
            pdf.setFontSize(10);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.text(`Огноо: ${new Date().toLocaleDateString("mn-MN")}`, pageWidth - margin, 28, {
                align: "right"
            });
            cursorY = 42;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.setFontSize(12);
            pdf.text("1. Хүсэлтийн мэдээлэл", margin, cursorY);
            cursorY += 6;
            const boxTop = cursorY;
            const boxHeight = 44;
            pdf.setDrawColor(210, 214, 220);
            pdf.rect(margin, boxTop, contentWidth, boxHeight);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.setFontSize(11);
            const leftX = margin + 4;
            const rightX = margin + contentWidth / 2 + 4;
            let rowY = boxTop + 8;
            pdf.text(`Хөрөнгө: ${assetName}`, leftX, rowY);
            pdf.text(`Ангилал: ${category}`, rightX, rowY);
            rowY += 8;
            pdf.text(`Хэнээс: ${requestedByName}`, leftX, rowY);
            pdf.text(`Устгах арга: ${methodLabel}`, rightX, rowY);
            rowY += 8;
            pdf.text(`Шалтгаан: ${reasonLabel}`, leftX, rowY);
            pdf.text(`Хүсэлт №: ${item.id}`, rightX, rowY);
            cursorY = boxTop + boxHeight + 10;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.setFontSize(12);
            pdf.text("2. Баталгаажуулалт", margin, cursorY);
            cursorY += 6;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.setFontSize(11);
            const approveText = "IT ажилтан хүсэлтийг шалгаж, эвдэрсэн болохыг баталгаажуулсан. Өгөгдөл сэргээх боломжгүй болсон.";
            const approveLines = pdf.splitTextToSize(approveText, contentWidth);
            pdf.text(approveLines, margin, cursorY);
            cursorY += approveLines.length * 5.5 + 8;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.text("Баталгаажуулсан ажилтан", margin, pageHeight - 20);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.text(approverName, margin + 54, pageHeight - 20);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.text("Гарын үсэг", pageWidth - margin - 60, pageHeight - 20);
            pdf.setDrawColor(17, 17, 17);
            pdf.line(pageWidth - margin - 60, pageHeight - 28, pageWidth - margin, pageHeight - 28);
            try {
                pdf.addImage(signatureData, "PNG", pageWidth - margin - 60, pageHeight - 50, 60, 20);
            } catch  {
            // ignore if signature image fails to render
            }
            const pdfBlob = pdf.output("blob");
            const key = `disposal-approvals/${item.assetId}/${item.id}-${Date.now()}.pdf`;
            const presignRes = await fetch(presignUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    key,
                    contentType: "application/pdf",
                    bucketName
                })
            });
            if (!presignRes.ok) throw new Error("Presign failed");
            const { url } = await presignRes.json();
            await fetch(url, {
                method: "PUT",
                body: pdfBlob,
                headers: {
                    "Content-Type": "application/pdf"
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Баталгаажуулалтын PDF хадгалагдлаа.", {
                id: "disposal-approve-pdf"
            });
            return true;
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("PDF хадгалахад алдаа гарлаа.", {
                id: "disposal-approve-pdf"
            });
            return false;
        } finally{
            setSignatureUploading(false);
        }
    };
    const handleWipeDone = async (id)=>{
        try {
            await updateWipeTask({
                variables: {
                    id,
                    status: "DONE"
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Data wipe task дууслаа (DONE).");
            await refetchWipe();
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Data wipe task шинэчлэхэд алдаа гарлаа.");
        }
    };
    return {
        selectedDisposal,
        setSelectedDisposal,
        signatureData,
        setSignatureData,
        signatureUploading,
        dataWipeConfirmed,
        setDataWipeConfirmed,
        isDisposalChecked,
        setIsDisposalChecked,
        pendingDisposals,
        allDisposals,
        allMaintenanceTickets,
        wipeTasks,
        itNotifications,
        demoApproverId,
        approving,
        rejecting,
        updatingWipe,
        handleApprove,
        handleReject,
        handleSaveSignature,
        handleClearSignature,
        uploadApprovalPdf,
        handleWipeDone,
        refetchWipe,
        employeesData,
        normalizeAssetTag: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"]
    };
}
_s(useDemoIT, "UW6XdUowqGCJv0GL4JBV9uKjk2o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/DemoITHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoITHeader",
    ()=>DemoITHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function DemoITHeader({ title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-it/DemoITHeader.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "IT-д илгээгдсэн бүх хүсэлт — устгах хүсэлт, засварын дуудлага"
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-it/DemoITHeader.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-it/DemoITHeader.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                size: "sm",
                className: "gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-it/DemoITHeader.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    " Түүх"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-it/DemoITHeader.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-it/DemoITHeader.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = DemoITHeader;
var _c;
__turbopack_context__.k.register(_c, "DemoITHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/DemoITDataWipeCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoITDataWipeCard",
    ()=>DemoITDataWipeCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function DemoITDataWipeCard({ wipeTasks, onWipeDone, updatingWipe }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-4 border-emerald-200 bg-emerald-50/30 shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                    className: "flex items-center gap-2 text-base font-medium text-emerald-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        " Data wipe tasks (",
                        wipeTasks.length,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "space-y-3",
                children: wipeTasks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "rounded-lg border border-dashed border-emerald-200 bg-white p-6 text-center text-sm text-muted-foreground",
                    children: "PENDING data wipe task байхгүй байна."
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: wipeTasks.map((t)=>{
                        const assetName = t.asset?.assetTag ?? t.assetId;
                        const categoryName = t.asset?.category ?? "—";
                        const sourceEmployee = t.latestReturnRequest?.employee ?? t.latestAssignment?.employee;
                        const employeeName = [
                            sourceEmployee?.firstName,
                            sourceEmployee?.lastName
                        ].filter(Boolean).join(" ") || "—";
                        const sourceParts = [
                            sourceEmployee?.department,
                            sourceEmployee?.branch
                        ].filter(Boolean);
                        const sourceLabel = sourceParts.length > 0 ? sourceParts.join(" / ") : "—";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col justify-between gap-3 rounded-lg border border-emerald-100 bg-white p-4 sm:flex-row sm:items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-medium text-foreground",
                                            children: [
                                                assetName,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 text-sm font-normal text-muted-foreground",
                                                    children: [
                                                        "(",
                                                        categoryName,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                            lineNumber: 88,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-muted-foreground",
                                            children: [
                                                "Хэнээс: ",
                                                employeeName
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                            lineNumber: 94,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-muted-foreground",
                                            children: [
                                                "Хаанаас: ",
                                                sourceLabel
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                            lineNumber: 97,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                "Task: ",
                                                t.id,
                                                " · Status: ",
                                                t.status
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                            lineNumber: 100,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                    lineNumber: 87,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        className: "gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white",
                                        onClick: ()=>onWipeDone(t.id),
                                        disabled: updatingWipe,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                                lineNumber: 111,
                                                columnNumber: 23
                                            }, this),
                                            " Done"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                        lineNumber: 105,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                                    lineNumber: 104,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, t.id, true, {
                            fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                            lineNumber: 83,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-it/DemoITDataWipeCard.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c = DemoITDataWipeCard;
var _c;
__turbopack_context__.k.register(_c, "DemoITDataWipeCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoITPendingDisposalsCard",
    ()=>DemoITPendingDisposalsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DemoITPendingDisposalsCard({ pendingDisposals, onSelectDisposal, onReject, approving, rejecting, setIsDisposalChecked, normalizeAssetTag }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-6 border-gray-200 bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                    className: "flex items-center gap-2 text-base font-medium text-gray-900",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        " Устгах хүсэлтүүд (",
                        pendingDisposals.length,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "space-y-4",
                children: pendingDisposals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground",
                    children: "Одоогоор хүлээгдэж буй устгах хүсэлт байхгүй. Ажилтан «Миний хөрөнгө» → хөрөнгө дээр дарж «Устгах хүсэлт илгээх»-ээр илгээж болно."
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this) : pendingDisposals.map((req)=>{
                    const r = req;
                    const assetName = r.asset?.assetTag ?? r.assetId;
                    const categoryName = r.asset?.category ?? "—";
                    const requesterName = r.requestedBy ? [
                        r.requestedBy.firstName,
                        r.requestedBy.lastName
                    ].filter(Boolean).join(" ") || r.requestedBy.email : "—";
                    const displayAsset = normalizeAssetTag(assetName);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
                        onClick: ()=>{
                            setIsDisposalChecked(false);
                            onSelectDisposal(r);
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-sm",
                                        children: (assetName ?? "?").slice(0, 2).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                        lineNumber: 65,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-foreground",
                                                children: [
                                                    displayAsset,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground font-normal",
                                                        children: [
                                                            "(",
                                                            categoryName,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                                lineNumber: 69,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: [
                                                    "Хэнээс:",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-foreground",
                                                        children: requesterName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 23
                                                    }, this),
                                                    " ",
                                                    "| Арга: ",
                                                    r.method,
                                                    " |",
                                                    " ",
                                                    new Date(r.createdAt).toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                                lineNumber: 75,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                        lineNumber: 68,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                lineNumber: 64,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 shrink-0",
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "gap-1.5",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            setIsDisposalChecked(false);
                                            onSelectDisposal(r);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                                lineNumber: 99,
                                                columnNumber: 21
                                            }, this),
                                            " Дэлгэрэнгүй"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                        lineNumber: 89,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "bg-amber-50 text-amber-600 border-amber-200",
                                        children: "PENDING"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>{
                                            setIsDisposalChecked(false);
                                            onSelectDisposal(r);
                                        },
                                        className: "gap-2 bg-gray-900 text-white hover:bg-gray-800",
                                        size: "sm",
                                        disabled: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                                lineNumber: 116,
                                                columnNumber: 21
                                            }, this),
                                            " Батлах (IT)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                        lineNumber: 107,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>onReject(r.id),
                                        variant: "outline",
                                        className: "gap-2 border-gray-300 text-gray-700 hover:bg-gray-100",
                                        size: "sm",
                                        disabled: approving || rejecting,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                                lineNumber: 125,
                                                columnNumber: 21
                                            }, this),
                                            " Цуцлах"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                        lineNumber: 118,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                                lineNumber: 85,
                                columnNumber: 17
                            }, this)
                        ]
                    }, req.id, true, {
                        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                        lineNumber: 56,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = DemoITPendingDisposalsCard;
var _c;
__turbopack_context__.k.register(_c, "DemoITPendingDisposalsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/DemoITMaintenanceCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoITMaintenanceCard",
    ()=>DemoITMaintenanceCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DemoITMaintenanceCard({ allMaintenanceTickets, MAINTENANCE_STATUS_LABELS }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-6 border-gray-200 bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                    className: "flex items-center gap-2 text-base font-medium text-gray-900",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        " Засварын хүсэлт (",
                        allMaintenanceTickets.length,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: allMaintenanceTickets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "rounded-lg border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground",
                    children: "Засварын дуудлага байхгүй байна."
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Хөрөнгийн ID"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Тайлбар"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Ноцтой байдал"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Төлөв"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Огноо"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                        lineNumber: 47,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: allMaintenanceTickets.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "font-mono text-xs",
                                            children: t.assetId
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                            lineNumber: 53,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "max-w-xs truncate text-sm",
                                            children: t.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                            lineNumber: 56,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: "text-xs",
                                                children: t.severity
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                                lineNumber: 60,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                            lineNumber: 59,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: t.status === "OPEN" ? "bg-gray-100 text-gray-700 border-gray-200" : t.status === "RESOLVED" || t.status === "CLOSED" ? "bg-gray-200 text-gray-800 border-gray-200" : "bg-gray-100 text-gray-700 border-gray-200",
                                                children: MAINTENANCE_STATUS_LABELS[t.status] ?? t.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                                lineNumber: 65,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                            lineNumber: 64,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "text-sm text-muted-foreground",
                                            children: new Date(t.createdAt).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, t.id, true, {
                                    fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                                    lineNumber: 52,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-it/DemoITMaintenanceCard.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = DemoITMaintenanceCard;
var _c;
__turbopack_context__.k.register(_c, "DemoITMaintenanceCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoITAllDisposalsCard",
    ()=>DemoITAllDisposalsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DemoITAllDisposalsCard({ allDisposals, DISPOSAL_STATUS_LABELS, normalizeAssetTag }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-6 border-border bg-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "flex flex-row items-center justify-between pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "text-base font-semibold",
                        children: "Устгах хүсэлт — бараа, хэнээс, баталгаажуулсан"
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-48",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Хайх...",
                                className: "w-full rounded-md border border-input bg-transparent pl-8 py-1.5 text-xs outline-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Хөрөнгө (нэр / ангилал)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Хэнээс ирсэн"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Устгах арга"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Огноо"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Баталгаажуулсан"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: allDisposals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                    colSpan: 5,
                                    className: "h-24 text-center text-muted-foreground text-sm",
                                    children: "Устгах хүсэлт байхгүй байна."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                    lineNumber: 56,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this) : allDisposals.map((req)=>{
                                const r = req;
                                const assetName = r.asset?.assetTag ?? r.assetId;
                                const categoryName = r.asset?.category ?? "—";
                                const requesterName = r.requestedBy ? [
                                    r.requestedBy.firstName,
                                    r.requestedBy.lastName
                                ].filter(Boolean).join(" ") || r.requestedBy.email : "—";
                                const statusLabel = DISPOSAL_STATUS_LABELS[r.status] ?? r.status;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "font-medium",
                                            children: [
                                                normalizeAssetTag(assetName),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground font-normal",
                                                    children: [
                                                        "(",
                                                        categoryName,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                            lineNumber: 77,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: requesterName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                            lineNumber: 83,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "text-sm",
                                            children: r.method
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                            lineNumber: 84,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "text-sm text-muted-foreground",
                                            children: new Date(r.createdAt).toLocaleDateString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                            lineNumber: 85,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: r.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : r.status === "REJECTED" ? "bg-rose-100 text-rose-700 border-rose-200" : r.status === "IT_APPROVED" || r.status === "FINANCE_APPROVED" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-amber-100 text-amber-600 border-amber-200",
                                                children: statusLabel
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                                lineNumber: 89,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                            lineNumber: 88,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                                    lineNumber: 76,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = DemoITAllDisposalsCard;
var _c;
__turbopack_context__.k.register(_c, "DemoITAllDisposalsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoITDisposalDetailDialog",
    ()=>DemoITDisposalDetailDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$esign$2f$_components$2f$SignaturePad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/esign/_components/SignaturePad.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$esign$2f$_components$2f$DocumentPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/esign/_components/DocumentPreview.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function DemoITDisposalDetailDialog({ selectedDisposal, onClose, signatureData, signatureUploading, onSaveSignature, onClearSignature, onApproveWithPdf, onReject, approving, rejecting, normalizeAssetTag }) {
    const handleOpenChange = (open)=>{
        if (!open) onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: !!selectedDisposal,
        onOpenChange: handleOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-5xl w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Устгах хүсэлт — баталгаажуулалт"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Эвдрэлтэй гэж баталгаажуулж, гарын үсэг зурна уу."
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                selectedDisposal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 lg:order-1 flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$esign$2f$_components$2f$DocumentPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                signatureData: signatureData,
                                title: "Data Wipe Out Confirmation",
                                bodyText: "IT ажилтан өгөгдөл сэргээх боломжгүй болсон гэдгийг баталгаажуулж байна. Энэхүү баримт нь дата бүрэн устсан болохыг нотлох зорилготой.",
                                waitingLabel: "Гарын үсэг хүлээгдэж байна...",
                                signedByLabel: "Баталгаажуулсан",
                                dateLabel: "Огноо"
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 lg:order-2 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-muted bg-muted/30 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-base font-semibold mb-3",
                                            children: "Хүсэлтийн мэдээлэл"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted-foreground",
                                                    children: "Хөрөнгө (нэр):"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium",
                                                    children: normalizeAssetTag(selectedDisposal.asset?.assetTag ?? selectedDisposal.assetId)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted-foreground",
                                                    children: "Ангилал:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium",
                                                    children: selectedDisposal.asset?.category ?? "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted-foreground",
                                                    children: "Хэнээс ирсэн (ажилтан):"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium",
                                                    children: selectedDisposal.requestedBy ? [
                                                        selectedDisposal.requestedBy.firstName,
                                                        selectedDisposal.requestedBy.lastName
                                                    ].filter(Boolean).join(" ") || selectedDisposal.requestedBy.email : "Admin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this),
                                                selectedDisposal.requestedBy?.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-muted-foreground",
                                                            children: "Имэйл:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-medium text-xs",
                                                            children: selectedDisposal.requestedBy.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted-foreground",
                                                    children: "Устгах арга:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium",
                                                    children: selectedDisposal.method
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 19
                                                }, this),
                                                selectedDisposal.reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-muted-foreground",
                                                            children: "Шалтгаан:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-medium",
                                                            children: selectedDisposal.reason
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted-foreground",
                                                    children: "Төлөв:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "outline",
                                                        className: "bg-amber-50 text-amber-600 border-amber-200",
                                                        children: selectedDisposal.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted-foreground",
                                                    children: "Илгээсэн огноо:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium",
                                                    children: new Date(selectedDisposal.createdAt).toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$esign$2f$_components$2f$SignaturePad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    onSave: onSaveSignature,
                                    onClear: onClearSignature,
                                    title: "Баталгаажуулах гарын үсэг",
                                    clearLabel: "Арилгах",
                                    saveLabel: signatureUploading ? "PDF үүсгэж байна..." : "Гарын үсэг хадгалах"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    className: "gap-2 sm:gap-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: onClose,
                            children: "Хаах"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        selectedDisposal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "gap-2 bg-gray-900 text-white hover:bg-gray-800",
                                    onClick: async ()=>{
                                        await onApproveWithPdf();
                                    },
                                    disabled: !signatureData || signatureUploading || approving || rejecting,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this),
                                        " Батлах (IT)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "gap-2 border-gray-300 text-gray-700 hover:bg-gray-100",
                                    onClick: async ()=>{
                                        await onReject(selectedDisposal.id);
                                        onClose();
                                    },
                                    disabled: approving || rejecting,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this),
                                        " Цуцлах"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c = DemoITDisposalDetailDialog;
var _c;
__turbopack_context__.k.register(_c, "DemoITDisposalDetailDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-it/demo-it.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoITContent",
    ()=>DemoITContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$useDemoIT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/useDemoIT.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/DemoITHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITDataWipeCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/DemoITDataWipeCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITPendingDisposalsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/DemoITPendingDisposalsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITMaintenanceCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/DemoITMaintenanceCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITAllDisposalsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/DemoITAllDisposalsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITDisposalDetailDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/DemoITDisposalDetailDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-it/demo-it-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function DemoITContent({ title = "IT Хяналтын самбар" }) {
    _s();
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$useDemoIT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoIT"])();
    const handleCloseDialog = ()=>{
        s.setSelectedDisposal(null);
        s.setSignatureData(null);
        s.setDataWipeConfirmed(false);
        s.setIsDisposalChecked(false);
    };
    const handleApproveWithPdf = async ()=>{
        if (!s.selectedDisposal) return;
        const uploaded = await s.uploadApprovalPdf(s.selectedDisposal);
        if (!uploaded) return;
        await s.handleApprove(s.selectedDisposal.id);
        s.setSelectedDisposal(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
        className: "h-full min-h-0 flex-1 w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4 p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoITHeader"], {
                    title: title
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/demo-it.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITDataWipeCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoITDataWipeCard"], {
                    wipeTasks: s.wipeTasks,
                    onWipeDone: s.handleWipeDone,
                    updatingWipe: s.updatingWipe
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/demo-it.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITPendingDisposalsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoITPendingDisposalsCard"], {
                    pendingDisposals: s.pendingDisposals,
                    onSelectDisposal: s.setSelectedDisposal,
                    onReject: s.handleReject,
                    approving: s.approving,
                    rejecting: s.rejecting,
                    setIsDisposalChecked: s.setIsDisposalChecked,
                    normalizeAssetTag: s.normalizeAssetTag
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/demo-it.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITMaintenanceCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoITMaintenanceCard"], {
                    allMaintenanceTickets: s.allMaintenanceTickets,
                    MAINTENANCE_STATUS_LABELS: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAINTENANCE_STATUS_LABELS"]
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/demo-it.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITAllDisposalsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoITAllDisposalsCard"], {
                    allDisposals: s.allDisposals,
                    DISPOSAL_STATUS_LABELS: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$demo$2d$it$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DISPOSAL_STATUS_LABELS"],
                    normalizeAssetTag: s.normalizeAssetTag
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/demo-it.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$DemoITDisposalDetailDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoITDisposalDetailDialog"], {
                    selectedDisposal: s.selectedDisposal,
                    onClose: handleCloseDialog,
                    setSelectedDisposal: s.setSelectedDisposal,
                    setSignatureData: s.setSignatureData,
                    setDataWipeConfirmed: s.setDataWipeConfirmed,
                    setIsDisposalChecked: s.setIsDisposalChecked,
                    signatureData: s.signatureData,
                    signatureUploading: s.signatureUploading,
                    onSaveSignature: s.handleSaveSignature,
                    onClearSignature: s.handleClearSignature,
                    onApproveWithPdf: handleApproveWithPdf,
                    onReject: s.handleReject,
                    approving: s.approving,
                    rejecting: s.rejecting,
                    normalizeAssetTag: s.normalizeAssetTag,
                    uploadApprovalPdf: s.uploadApprovalPdf
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-it/demo-it.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-it/demo-it.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-it/demo-it.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(DemoITContent, "ZwMAx73CuQVIRpYqRaPJAs06zHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$it$2f$useDemoIT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoIT"]
    ];
});
_c = DemoITContent;
var _c;
__turbopack_context__.k.register(_c, "DemoITContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_demo-it_66d99203._.js.map