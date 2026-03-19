(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/demo-employee/demo-employee-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_EMPLOYEE_EMAIL",
    ()=>DEMO_EMPLOYEE_EMAIL,
    "PDF_FONT_BOLD",
    ()=>PDF_FONT_BOLD,
    "PDF_FONT_NAME",
    ()=>PDF_FONT_NAME,
    "PDF_FONT_REGULAR",
    ()=>PDF_FONT_REGULAR,
    "UpdateAssignmentStatusDocument",
    ()=>UpdateAssignmentStatusDocument,
    "arrayBufferToBase64",
    ()=>arrayBufferToBase64,
    "dataUrlToBlob",
    ()=>dataUrlToBlob,
    "ensurePdfFonts",
    ()=>ensurePdfFonts,
    "normalizeAssetTag",
    ()=>normalizeAssetTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-tag/lib/index.js [app-client] (ecmascript)");
"use client";
;
const DEMO_EMPLOYEE_EMAIL = "tsetsegulziiocherdene@gmail.com";
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
const UpdateAssignmentStatusDocument = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$tag$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gql"]`
  mutation UpdateAssignmentStatus($assignmentId: ID!, $status: String!) {
    updateAssignmentStatus(assignmentId: $assignmentId, status: $status) {
      id
      status
    }
  }
`;
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
"[project]/src/components/demo-employee/useDemoEmployee.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDemoEmployee",
    ()=>useDemoEmployee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/hooks/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@apollo/client/react/hooks/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/gql/graphql.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/demo-employee-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function useDemoEmployee() {
    _s();
    const [isChecked, setIsChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAssignment, setSelectedAssignment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSignModalOpen, setIsSignModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signAssignment, setSignAssignment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signatureData, setSignatureData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signatureUploading, setSignatureUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [signatureFileUrl, setSignatureFileUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signatureProfileSaving, setSignatureProfileSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSignaturePad, setShowSignaturePad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [disposalReason, setDisposalReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [disposalSending, setDisposalSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transferToEmployeeId, setTransferToEmployeeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transferReason, setTransferReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [transferSending, setTransferSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTransferDialog, setShowTransferDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showItTransferDialog, setShowItTransferDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showOffboardingModal, setShowOffboardingModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showRequestsDialog, setShowRequestsDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingTransferSent, setPendingTransferSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showReturnRequestDialog, setShowReturnRequestDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [returnRequestAssignment, setReturnRequestAssignment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [returnCondition, setReturnCondition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("GOOD");
    const [returnConditionDetail, setReturnConditionDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [returnRequestSending, setReturnRequestSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [returnInstructionsRead, setReturnInstructionsRead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedReturnAssetIds, setSelectedReturnAssetIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useDemoEmployee.useState": ()=>new Set()
    }["useDemoEmployee.useState"]);
    const [bulkReturnInstructionsRead, setBulkReturnInstructionsRead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bulkReturnSending, setBulkReturnSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [returnPhotoFile, setReturnPhotoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedNotificationId, setExpandedNotificationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isDamagedCondition = [
        "DAMAGED",
        "NON_FUNCTIONAL",
        "LOST"
    ].includes(returnCondition);
    const { data: employeesData, refetch: refetchEmployees } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmployeesDocument"], {
        fetchPolicy: "network-only"
    });
    const [demoEmployeeId, setDemoEmployeeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const defaultDemoEmployeeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[defaultDemoEmployeeId]": ()=>{
            const list = employeesData?.employees ?? [];
            const byEmail = list.find({
                "useDemoEmployee.useMemo[defaultDemoEmployeeId]": (e)=>e.email?.toLowerCase() === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_EMPLOYEE_EMAIL"].toLowerCase()
            }["useDemoEmployee.useMemo[defaultDemoEmployeeId]"])?.id ?? "";
            return byEmail || list[0]?.id || "";
        }
    }["useDemoEmployee.useMemo[defaultDemoEmployeeId]"], [
        employeesData?.employees
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDemoEmployee.useEffect": ()=>{
            if (!demoEmployeeId && defaultDemoEmployeeId) {
                setDemoEmployeeId(defaultDemoEmployeeId);
            }
        }
    }["useDemoEmployee.useEffect"], [
        demoEmployeeId,
        defaultDemoEmployeeId
    ]);
    const currentEmployeeId = demoEmployeeId || null;
    const currentEmployee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[currentEmployee]": ()=>employeesData?.employees?.find({
                "useDemoEmployee.useMemo[currentEmployee]": (e)=>e.id === currentEmployeeId
            }["useDemoEmployee.useMemo[currentEmployee]"]) ?? null
    }["useDemoEmployee.useMemo[currentEmployee]"], [
        employeesData?.employees,
        currentEmployeeId
    ]);
    const savedSignatureUrl = currentEmployee?.imageUrl ?? null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDemoEmployee.useEffect": ()=>{
            if (!isSignModalOpen) return;
            if (savedSignatureUrl) {
                setShowSignaturePad(false);
            } else {
                setShowSignaturePad(true);
            }
        }
    }["useDemoEmployee.useEffect"], [
        isSignModalOpen,
        savedSignatureUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDemoEmployee.useEffect": ()=>{
            setSelectedAssignment(null);
            setPendingTransferSent(null);
            setExpandedNotificationId(null);
            setSelectedReturnAssetIds(new Set());
            setBulkReturnInstructionsRead(false);
        }
    }["useDemoEmployee.useEffect"], [
        currentEmployeeId
    ]);
    const [updateAssignmentStatus, { loading: updatingStatus }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UpdateAssignmentStatusDocument"]);
    const [requestDisposalMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestDisposalDocument"]);
    const [startOffboardingMutation, { loading: offboardingStarting }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StartOffboardingDocument"]);
    const [transferAssetMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransferAssetDocument"]);
    const [returnAssetMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReturnAssetDocument"]);
    const [assignAssetMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AssignAssetDocument"]);
    const [completeAssetReturnMutation, { loading: completeReturnLoading }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompleteAssetReturnDocument"]);
    const [submitReturnRequestMutation, { loading: submitReturnRequestLoading }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmitReturnRequestDocument"]);
    const [updateEmployeeMutation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UpdateEmployeeDocument"]);
    const { data: offboardingData, refetch: refetchOffboarding } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetActiveOffboardingDocument"], {
        variables: {
            employeeId: currentEmployeeId ?? ""
        },
        skip: !currentEmployeeId,
        fetchPolicy: "network-only"
    });
    const activeOffboarding = offboardingData?.offboardingEvent ?? null;
    const { data: dashboardData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetDashboardDocument"], {
        variables: {
            role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].Employee,
            employeeId: currentEmployeeId ?? ""
        },
        skip: !currentEmployeeId,
        fetchPolicy: "network-only"
    });
    const OFFBOARDING_TITLE = "Ажлаас гарах — хөрөнгө буцаах";
    const isOffboardingNotification = (n)=>n.title === OFFBOARDING_TITLE || typeof n.message === "string" && (n.message.includes("Буцаах эцсийн хугацаа") || n.message.includes("ажлаас гарах"));
    const MOCK_OFFBOARDING = {
        id: "demo-mock-offboarding",
        title: OFFBOARDING_TITLE,
        message: "Таны нэр дээр 1 хөрөнгө бүртгэгдсэн. Буцаах эцсийн хугацаа: ажлаас гарснаас хойш 3 хоногийн дотор. Миний хөрөнгө хэсэгт орж буцаана уу.",
        type: "WARNING",
        isRead: false,
        createdAt: Date.now()
    };
    const notifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[notifications]": ()=>{
            const list = dashboardData?.dashboard?.employeeView?.notifications ?? [];
            const fromApi = [
                ...list
            ].filter({
                "useDemoEmployee.useMemo[notifications].fromApi": (n)=>isOffboardingNotification(n)
            }["useDemoEmployee.useMemo[notifications].fromApi"]).sort({
                "useDemoEmployee.useMemo[notifications].fromApi": (a, b)=>(b.createdAt ?? 0) - (a.createdAt ?? 0)
            }["useDemoEmployee.useMemo[notifications].fromApi"]);
            if (fromApi.length > 0) return fromApi;
            if (currentEmployeeId) return [
                MOCK_OFFBOARDING
            ];
            return [];
        }
    }["useDemoEmployee.useMemo[notifications]"], [
        dashboardData?.dashboard?.employeeView?.notifications,
        currentEmployeeId
    ]);
    const queryVars = {
        employeeId: currentEmployeeId ?? ""
    };
    const { data: dataAssignRequested, loading: loadingAssignRequested, refetch: refetchAssignRequested } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetEmployeeAssignmentsDocument"], {
        variables: {
            ...queryVars,
            status: "ASSIGN_REQUESTED"
        },
        skip: !currentEmployeeId,
        fetchPolicy: "network-only"
    });
    const { data: dataPending, loading: loadingPending, refetch: refetchPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetEmployeeAssignmentsDocument"], {
        variables: {
            ...queryVars,
            status: "PENDING"
        },
        skip: !currentEmployeeId,
        fetchPolicy: "network-only"
    });
    const { data: activeData, loading: activeLoading, refetch: refetchActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$gql$2f$graphql$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetEmployeeAssignmentsDocument"], {
        variables: {
            ...queryVars,
            status: "ACTIVE"
        },
        skip: !currentEmployeeId,
        fetchPolicy: "network-only"
    });
    const pendingLoading = loadingAssignRequested || loadingPending;
    const pendingList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[pendingList]": ()=>{
            const a = dataAssignRequested?.employeeAssignments ?? [];
            const b = dataPending?.employeeAssignments ?? [];
            const seen = new Set();
            return [
                ...a,
                ...b
            ].filter({
                "useDemoEmployee.useMemo[pendingList]": (x)=>{
                    if (seen.has(x.id)) return false;
                    seen.add(x.id);
                    return true;
                }
            }["useDemoEmployee.useMemo[pendingList]"]);
        }
    }["useDemoEmployee.useMemo[pendingList]"], [
        dataAssignRequested?.employeeAssignments,
        dataPending?.employeeAssignments
    ]);
    const currentPending = pendingList[0] ?? null;
    const activeAssignments = activeData?.employeeAssignments ?? [];
    const myAssetsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[myAssetsList]": ()=>{
            const seen = new Set();
            const list = [];
            activeAssignments.forEach({
                "useDemoEmployee.useMemo[myAssetsList]": (a)=>{
                    seen.add(a.id);
                    list.push({
                        ...a,
                        status: "ACTIVE"
                    });
                }
            }["useDemoEmployee.useMemo[myAssetsList]"]);
            pendingList.forEach({
                "useDemoEmployee.useMemo[myAssetsList]": (a)=>{
                    if (!seen.has(a.id)) {
                        seen.add(a.id);
                        list.push({
                            ...a,
                            status: a.status ?? "ASSIGN_REQUESTED"
                        });
                    }
                }
            }["useDemoEmployee.useMemo[myAssetsList]"]);
            return list;
        }
    }["useDemoEmployee.useMemo[myAssetsList]"], [
        activeAssignments,
        pendingList
    ]);
    const assetsToReturnList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[assetsToReturnList]": ()=>{
            const fromEvent = activeOffboarding?.assetsToReturn;
            if (fromEvent?.length) return fromEvent.map({
                "useDemoEmployee.useMemo[assetsToReturnList]": (a)=>({
                        id: a.id,
                        assetTag: a.assetTag ?? a.id,
                        serialNumber: a.serialNumber ?? "—"
                    })
            }["useDemoEmployee.useMemo[assetsToReturnList]"]);
            return null;
        }
    }["useDemoEmployee.useMemo[assetsToReturnList]"], [
        activeOffboarding
    ]);
    const pendingReturnRequestAssetIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[pendingReturnRequestAssetIds]": ()=>{
            const list = activeOffboarding?.pendingReturnRequests ?? [];
            return new Set(list.map({
                "useDemoEmployee.useMemo[pendingReturnRequestAssetIds]": (r)=>r.assetId
            }["useDemoEmployee.useMemo[pendingReturnRequestAssetIds]"]));
        }
    }["useDemoEmployee.useMemo[pendingReturnRequestAssetIds]"], [
        activeOffboarding
    ]);
    const assignmentsToReturn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[assignmentsToReturn]": ()=>myAssetsList.filter({
                "useDemoEmployee.useMemo[assignmentsToReturn]": (a)=>!a.returnedAt
            }["useDemoEmployee.useMemo[assignmentsToReturn]"])
    }["useDemoEmployee.useMemo[assignmentsToReturn]"], [
        myAssetsList
    ]);
    const eligibleReturnAssignments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[eligibleReturnAssignments]": ()=>assignmentsToReturn.filter({
                "useDemoEmployee.useMemo[eligibleReturnAssignments]": (a)=>!pendingReturnRequestAssetIds.has(a.assetId)
            }["useDemoEmployee.useMemo[eligibleReturnAssignments]"])
    }["useDemoEmployee.useMemo[eligibleReturnAssignments]"], [
        assignmentsToReturn,
        pendingReturnRequestAssetIds
    ]);
    const toggleReturnSelection = (assetId, next)=>{
        setSelectedReturnAssetIds((prev)=>{
            const s = new Set(prev);
            if (next) s.add(assetId);
            else s.delete(assetId);
            return s;
        });
    };
    const selectAllEligibleReturns = (next)=>{
        if (!next) {
            setSelectedReturnAssetIds(new Set());
            return;
        }
        setSelectedReturnAssetIds(new Set(eligibleReturnAssignments.map((a)=>a.assetId)));
    };
    const handleActionComplete = async ()=>{
        setIsChecked(false);
        await Promise.all([
            refetchAssignRequested(),
            refetchPending(),
            refetchActive()
        ]);
    };
    const handleApprove = async (id)=>{
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Хүлээн авч байна...", {
                id: "approve"
            });
            await updateAssignmentStatus({
                variables: {
                    assignmentId: id,
                    status: "ACTIVE"
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Хөрөнгийг хүлээн авлаа. Дараагийн хүсэлт рүү шилжиж байна...", {
                id: "approve"
            });
            await handleActionComplete();
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Хүсэлт амжилтгүй боллоо.", {
                id: "approve"
            });
            await handleActionComplete();
        }
    };
    const handleReject = async (id)=>{
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Татгалзаж байна...", {
                id: "reject"
            });
            await updateAssignmentStatus({
                variables: {
                    assignmentId: id,
                    status: "REJECTED"
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Хөрөнгөөс татгалзлаа.", {
                id: "reject"
            });
            await handleActionComplete();
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Хүсэлт амжилтгүй боллоо.", {
                id: "reject"
            });
            await handleActionComplete();
        }
    };
    const handleSaveSignature = (dataUrl)=>{
        setSignatureData(dataUrl);
    };
    const loadSignatureFromUrl = async (url)=>{
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Signature fetch failed");
            const blob = await res.blob();
            const reader = new FileReader();
            const dataUrl = await new Promise((resolve, reject)=>{
                reader.onload = ()=>resolve(reader.result);
                reader.onerror = ()=>reject(reader.error);
                reader.readAsDataURL(blob);
            });
            setSignatureData(dataUrl);
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Хадгалсан гарын үсгийг уншиж чадсангүй.");
        }
    };
    const uploadSignatureImageToR2 = async (dataUrl)=>{
        const bucketName = ("TURBOPACK compile-time value", "assets-management");
        const publicUrl = ("TURBOPACK compile-time value", "https://pub-de50afb5e9934f62ad9c809976d139d8.r2.dev");
        const graphqlUrl = ("TURBOPACK compile-time value", "https://my-next-app.tsetsegulziiocherdene.workers.dev/api/graphql");
        const presignUrl = ("TURBOPACK compile-time value", "https://my-next-app.tsetsegulziiocherdene.workers.dev/api/r2/presign") ?? (("TURBOPACK compile-time truthy", 1) ? graphqlUrl.replace(/\/api\/graphql$/, "/api/r2/presign") : "TURBOPACK unreachable");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const key = `employee-signatures/${currentEmployeeId ?? "employee"}/${Date.now()}.png`;
        const blob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataUrlToBlob"])(dataUrl);
        const presignRes = await fetch(presignUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key,
                contentType: blob.type || "image/png",
                bucketName
            })
        });
        if (!presignRes.ok) throw new Error("Presign failed");
        const { url } = await presignRes.json();
        await fetch(url, {
            method: "PUT",
            body: blob,
            headers: {
                "Content-Type": blob.type || "image/png"
            }
        });
        return `${publicUrl}/${key}`;
    };
    const saveSignatureToProfile = async ()=>{
        if (!signatureData || !currentEmployeeId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Гарын үсэг эсвэл ажилтны мэдээлэл алга.");
            return;
        }
        try {
            setSignatureProfileSaving(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Гарын үсгийг хадгалж байна...", {
                id: "save-signature-profile"
            });
            const url = await uploadSignatureImageToR2(signatureData);
            await updateEmployeeMutation({
                variables: {
                    id: currentEmployeeId,
                    input: {
                        imageUrl: url
                    }
                }
            });
            await refetchEmployees();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Гарын үсгийг ажилтны профайлд хадгаллаа.", {
                id: "save-signature-profile"
            });
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Гарын үсгийг хадгалахад алдаа гарлаа.", {
                id: "save-signature-profile"
            });
        } finally{
            setSignatureProfileSaving(false);
        }
    };
    const uploadSignedPdf = async ()=>{
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Гарын үсэгтэй PDF үүсгэж байна...", {
                id: "signature-upload"
            });
            const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                orientation: "p",
                unit: "mm",
                format: "a4"
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensurePdfFonts"])(pdf);
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 16;
            const contentWidth = pageWidth - margin * 2;
            let cursorY = 18;
            const assetName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"])(signAssignment?.asset?.assetTag ?? signAssignment?.assetId);
            const serial = signAssignment?.asset?.serialNumber ?? "—";
            const category = signAssignment?.asset?.category ?? "—";
            const assignedDate = signAssignment?.assignedAt ? new Date(signAssignment.assignedAt).toLocaleDateString("mn-MN") : "—";
            const requestedByName = signAssignment?.requestedBy ? [
                signAssignment.requestedBy.firstName,
                signAssignment.requestedBy.lastName
            ].filter(Boolean).join(" ") || "Admin" : "Admin";
            const employeeName = employeesData?.employees?.find((e)=>e.id === currentEmployeeId)?.firstName ? `${employeesData?.employees?.find((e)=>e.id === currentEmployeeId)?.firstName ?? ""} ${employeesData?.employees?.find((e)=>e.id === currentEmployeeId)?.lastName ?? ""}`.trim() : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_EMPLOYEE_EMAIL"];
            pdf.setFillColor(245, 247, 250);
            pdf.rect(0, 0, pageWidth, 34, "F");
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.setFontSize(18);
            pdf.text("Хөрөнгийн ашиглалтын гэрээ", pageWidth / 2, 20, {
                align: "center"
            });
            pdf.setFontSize(10);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.text(`Үүсгэсэн огноо: ${new Date().toLocaleDateString("mn-MN")}`, pageWidth - margin, 28, {
                align: "right"
            });
            cursorY = 42;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.setFontSize(12);
            pdf.text("1. Гэрээний зорилго", margin, cursorY);
            cursorY += 6;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.setFontSize(11);
            const purposeText = "Доор гарын үсэг зурж баталгаажуулснаар та энэхүү хөрөнгийг хүлээн авч, гэрээнд заасан нөхцөлийг зөвшөөрч байгаагаа илэрхийлнэ. Цахим гарын үсэг нь гарын үсэгтэй адил хүчинтэй.";
            const purposeLines = pdf.splitTextToSize(purposeText, contentWidth);
            pdf.text(purposeLines, margin, cursorY);
            cursorY += purposeLines.length * 5.5 + 8;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.setFontSize(12);
            pdf.text("2. Хөрөнгийн дэлгэрэнгүй", margin, cursorY);
            cursorY += 6;
            const boxTop = cursorY;
            const boxHeight = 44;
            pdf.setDrawColor(210, 214, 220);
            pdf.rect(margin, boxTop, contentWidth, boxHeight);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.setFontSize(11);
            const leftX = margin + 4;
            const rightX = margin + contentWidth / 2 + 4;
            let rowY = boxTop + 8;
            pdf.text(`Юу: ${assetName}`, leftX, rowY);
            pdf.text(`Сериал: ${serial}`, rightX, rowY);
            rowY += 8;
            pdf.text(`Ангилал: ${category}`, leftX, rowY);
            pdf.text(`Хэнээс: ${requestedByName}`, rightX, rowY);
            rowY += 8;
            pdf.text(`Олгосон огноо: ${assignedDate}`, leftX, rowY);
            pdf.text(`Хариуцагч: ${employeeName}`, rightX, rowY);
            cursorY = boxTop + boxHeight + 10;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.setFontSize(12);
            pdf.text("3. Гэрээний нөхцөл", margin, cursorY);
            cursorY += 6;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.setFontSize(11);
            const terms = [
                "Хөрөнгийг зөвхөн ажлын хэрэгцээнд ашиглана.",
                "Гэмтэл, эвдрэл гарсан тохиолдолд шууд мэдээлнэ.",
                "Хөрөнгийг зөвшөөрөлгүйгээр бусдад шилжүүлэхгүй.",
                "Ажил дууссан үед эсвэл шаардлага гарвал буцаан өгнө."
            ];
            const termLines = terms.flatMap((t)=>pdf.splitTextToSize(`- ${t}`, contentWidth));
            pdf.text(termLines, margin, cursorY);
            cursorY += termLines.length * 5.5 + 8;
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.text("Баталгаажуулсан огноо", margin, pageHeight - 20);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "normal");
            pdf.text(new Date().toLocaleDateString("mn-MN"), margin + 48, pageHeight - 20);
            pdf.setFont(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"], "bold");
            pdf.text("Гарын үсэг", pageWidth - margin - 60, pageHeight - 20);
            pdf.setDrawColor(17, 17, 17);
            pdf.line(pageWidth - margin - 60, pageHeight - 28, pageWidth - margin, pageHeight - 28);
            try {
                pdf.addImage(signatureData, "PNG", pageWidth - margin - 60, pageHeight - 50, 60, 20);
            } catch  {
            // ignore
            }
            const pdfBlob = pdf.output("blob");
            const key = `signatures/${signAssignment?.assetId ?? "asset"}/${signAssignment?.id ?? crypto.randomUUID()}-${Date.now()}.pdf`;
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
            if (!presignRes.ok) throw new Error("Presign амжилтгүй");
            const { url } = await presignRes.json();
            await fetch(url, {
                method: "PUT",
                body: pdfBlob,
                headers: {
                    "Content-Type": "application/pdf"
                }
            });
            const fileUrl = `${publicUrl}/${key}`;
            setSignatureFileUrl(fileUrl);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Гэрээ PDF хадгалагдлаа.", {
                id: "signature-upload"
            });
            return true;
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("PDF хадгалахад алдаа гарлаа.", {
                id: "signature-upload"
            });
            return false;
        } finally{
            setSignatureUploading(false);
        }
    };
    const handleVerify = async ()=>{
        if (!signatureData) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Эхлээд гарын үсгээ зурна уу.");
            return;
        }
        const uploaded = await uploadSignedPdf();
        if (!uploaded) return;
        setIsChecked(true);
        setIsSignModalOpen(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Нөхцөл шалгаж дууслаа. Одоо баталгаажуулах боломжтой.");
    };
    const handleClearSignature = ()=>{
        setSignatureData(null);
        setSignatureFileUrl(null);
    };
    const handleRequestDisposal = async ()=>{
        if (!selectedAssignment?.asset?.id || !currentEmployeeId) return;
        setDisposalSending(true);
        try {
            await requestDisposalMutation({
                variables: {
                    assetId: selectedAssignment.asset.id,
                    requestedBy: currentEmployeeId,
                    method: "RECYCLE",
                    reason: disposalReason || undefined
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Устгах хүсэлт IT руу амжилттай илгээгдлээ. Дараа нь санхүү баталгаажуулна.");
            setSelectedAssignment(null);
            setDisposalReason("");
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Устгах хүсэлт илгээхэд алдаа гарлаа.");
        } finally{
            setDisposalSending(false);
        }
    };
    const handleSubmitReturnRequest = async ()=>{
        if (!returnRequestAssignment?.asset?.id || !currentEmployeeId || !returnCondition.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Нөхцөл сонгоно уу.");
            return;
        }
        if (!activeOffboarding) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("HR таны ажлаас гарах процессыг эхлүүлээгүй байна (offboarding event байхгүй).");
            return;
        }
        const conditionDetailToSend = returnConditionDetail.trim() || null;
        const photoR2KeyToSend = returnPhotoFile ? `demo-photo-${Date.now()}-${returnPhotoFile.name}` : null;
        setReturnRequestSending(true);
        try {
            const variables = {
                assetId: returnRequestAssignment.asset.id,
                employeeId: currentEmployeeId,
                condition: returnCondition
            };
            if (conditionDetailToSend != null) variables.conditionDetail = conditionDetailToSend;
            if (photoR2KeyToSend != null) variables.photoR2Key = photoR2KeyToSend;
            await submitReturnRequestMutation({
                variables
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"])(returnRequestAssignment.asset.assetTag)} буцааж өгөх хүсэлт илгээгдлээ. HR шалгана.`);
            setShowReturnRequestDialog(false);
            setReturnRequestAssignment(null);
            setReturnCondition("GOOD");
            setReturnConditionDetail("");
            setReturnPhotoFile(null);
            await Promise.all([
                refetchOffboarding(),
                refetchActive()
            ]);
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Буцаах хүсэлт илгээхэд алдаа гарлаа.");
        } finally{
            setReturnRequestSending(false);
        }
    };
    const handleStartOffboarding = async ()=>{
        if (!currentEmployeeId) return;
        setShowOffboardingModal(false);
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Ажилаас гарах үйлдэл эхлүүлж байна...", {
                id: "offboard"
            });
            await startOffboardingMutation({
                variables: {
                    employeeId: currentEmployeeId,
                    initiatedBy: currentEmployeeId
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Ажилаас гарах (offboarding) эхэллээ. Хөрөнгөө буцааж өгнө үү.", {
                id: "offboard"
            });
            await refetchOffboarding();
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Ажилаас гарах эхлүүлэхэд алдаа гарлаа.", {
                id: "offboard"
            });
        }
    };
    const otherEmployees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useDemoEmployee.useMemo[otherEmployees]": ()=>{
            const list = employeesData?.employees ?? [];
            return list.filter({
                "useDemoEmployee.useMemo[otherEmployees]": (e)=>e.id !== currentEmployeeId
            }["useDemoEmployee.useMemo[otherEmployees]"]).map({
                "useDemoEmployee.useMemo[otherEmployees]": (e)=>({
                        id: e.id,
                        name: [
                            e.firstName,
                            e.lastName
                        ].filter(Boolean).join(" ") || e.email || e.id
                    })
            }["useDemoEmployee.useMemo[otherEmployees]"]);
        }
    }["useDemoEmployee.useMemo[otherEmployees]"], [
        employeesData?.employees,
        currentEmployeeId
    ]);
    const handleTransferToEmployee = async ()=>{
        if (!selectedAssignment?.asset?.id || !currentEmployeeId || !transferToEmployeeId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Хүлээн авах ажилтан сонгоно уу.");
            return;
        }
        const assetId = selectedAssignment.asset.id;
        const toName = otherEmployees.find((e)=>e.id === transferToEmployeeId)?.name ?? transferToEmployeeId;
        setTransferSending(true);
        try {
            await returnAssetMutation({
                variables: {
                    assetId,
                    conditionAtReturn: transferReason || "Шилжүүлэх"
                }
            });
            await assignAssetMutation({
                variables: {
                    assetId,
                    employeeId: transferToEmployeeId,
                    conditionAtAssign: "GOOD"
                }
            });
            setPendingTransferSent({
                toName,
                assetTag: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"])(selectedAssignment.asset?.assetTag ?? selectedAssignment.assetId)
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${toName} руу шилжүүлэх хүсэлт илгээгдлээ. Тэр хүн "Шинэ хүсэлт" дээрээ хүлээн авах хүртэл хүлээгдэнэ.`);
            setShowTransferDialog(false);
            setTransferToEmployeeId("");
            setTransferReason("");
            setSelectedAssignment(null);
            await refetchActive();
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Шилжүүлэх хүсэлт илгээхэд алдаа гарлаа.");
        } finally{
            setTransferSending(false);
        }
    };
    const handleTransferToIt = async ()=>{
        if (!selectedAssignment?.asset?.id || !currentEmployeeId || !transferToEmployeeId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("IT ажилтан сонгоно уу.");
            return;
        }
        setTransferSending(true);
        try {
            await transferAssetMutation({
                variables: {
                    assetId: selectedAssignment.asset.id,
                    fromEmployeeId: currentEmployeeId,
                    toEmployeeId: transferToEmployeeId,
                    reason: "IT ажилтан руу шилжүүлсэн"
                }
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Хөрөнгийг IT ажилтан руу амжилттай шилжүүлэгдлээ.");
            setShowItTransferDialog(false);
            setTransferToEmployeeId("");
            setSelectedAssignment(null);
            refetchActive();
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("IT руу шилжүүлэхэд алдаа гарлаа.");
        } finally{
            setTransferSending(false);
        }
    };
    const handleBulkSubmitReturnRequests = async ()=>{
        if (!currentEmployeeId) return;
        if (!activeOffboarding) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("HR таны ажлаас гарах процессыг эхлүүлээгүй байна (offboarding event байхгүй).");
            return;
        }
        if (!bulkReturnInstructionsRead) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Буцаах зааврыг уншсан гэдгээ тэмдэглэнэ үү.");
            return;
        }
        const ids = Array.from(selectedReturnAssetIds);
        if (ids.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Буцаах хөрөнгө сонгоно уу.");
            return;
        }
        setBulkReturnSending(true);
        try {
            for (const assetId of ids){
                await submitReturnRequestMutation({
                    variables: {
                        assetId,
                        employeeId: currentEmployeeId,
                        condition: "GOOD",
                        conditionDetail: null,
                        photoR2Key: null
                    }
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Буцаах хүсэлт илгээгдлээ: ${ids.length} хөрөнгө.`);
            setSelectedReturnAssetIds(new Set());
            setBulkReturnInstructionsRead(false);
            await refetchOffboarding();
            await refetchActive();
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Багцаар буцаах хүсэлт илгээхэд алдаа гарлаа.");
        } finally{
            setBulkReturnSending(false);
        }
    };
    const employeesLoading = !employeesData && !currentEmployeeId;
    const employeeNotFound = !!employeesData?.employees && employeesData.employees.length > 0 && !defaultDemoEmployeeId;
    const onOpenReturnRequest = (a)=>{
        setReturnRequestAssignment(a);
        setReturnCondition("GOOD");
        setReturnConditionDetail("");
        setReturnPhotoFile(null);
        setReturnInstructionsRead(false);
        setShowReturnRequestDialog(true);
    };
    return {
        employeesData,
        demoEmployeeId,
        setDemoEmployeeId,
        currentEmployeeId,
        activeOffboarding,
        pendingList,
        activeAssignments,
        myAssetsList,
        notifications,
        expandedNotificationId,
        setExpandedNotificationId,
        bulkReturnInstructionsRead,
        setBulkReturnInstructionsRead,
        selectedReturnAssetIds,
        returnRequestAssignment,
        setReturnRequestAssignment,
        returnCondition,
        setReturnCondition,
        returnConditionDetail,
        setReturnConditionDetail,
        returnInstructionsRead,
        setReturnInstructionsRead,
        isDamagedCondition,
        returnPhotoFile,
        setReturnPhotoFile,
        returnRequestSending,
        showReturnRequestDialog,
        setShowReturnRequestDialog,
        bulkReturnSending,
        submitReturnRequestLoading,
        eligibleReturnAssignmentsLength: eligibleReturnAssignments.length,
        selectAllEligibleReturns,
        assetsToReturnList,
        pendingReturnRequestAssetIds,
        assignmentsToReturn,
        eligibleReturnAssignments,
        toggleReturnSelection,
        onOpenReturnRequest,
        isChecked,
        setIsChecked,
        selectedAssignment,
        setSelectedAssignment,
        isSignModalOpen,
        setIsSignModalOpen,
        signAssignment,
        setSignAssignment,
        signatureData,
        setSignatureData,
        signatureFileUrl,
        setSignatureFileUrl,
        showSignaturePad,
        setShowSignaturePad,
        signatureUploading,
        signatureProfileSaving,
        savedSignatureUrl,
        disposalReason,
        setDisposalReason,
        disposalSending,
        transferToEmployeeId,
        setTransferToEmployeeId,
        transferReason,
        setTransferReason,
        transferSending,
        showTransferDialog,
        setShowTransferDialog,
        showItTransferDialog,
        setShowItTransferDialog,
        showOffboardingModal,
        setShowOffboardingModal,
        showRequestsDialog,
        setShowRequestsDialog,
        pendingTransferSent,
        setPendingTransferSent,
        defaultDemoEmployeeId,
        currentEmployee,
        currentPending,
        employeesLoading,
        employeeNotFound,
        offboardingStarting,
        updatingStatus,
        completeReturnLoading,
        otherEmployees,
        handleApprove,
        handleReject,
        handleBulkSubmitReturnRequests,
        handleSaveSignature,
        loadSignatureFromUrl,
        saveSignatureToProfile,
        handleVerify,
        handleClearSignature,
        handleRequestDisposal,
        handleSubmitReturnRequest,
        handleStartOffboarding,
        handleTransferToEmployee,
        handleTransferToIt,
        handleActionComplete,
        activeLoading,
        pendingLoading,
        normalizeAssetTag: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"],
        DEMO_EMPLOYEE_EMAIL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_EMPLOYEE_EMAIL"],
        PDF_FONT_NAME: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDF_FONT_NAME"]
    };
}
_s(useDemoEmployee, "vKsDRv9Uyr9dzXp8oy3ImiApvHQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$apollo$2f$client$2f$react$2f$hooks$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeHeader",
    ()=>DemoEmployeeHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function DemoEmployeeHeader({ title, employees, demoEmployeeId, onDemoEmployeeChange, currentEmployeeId, activeOffboarding, offboardingStarting, onShowOffboardingModal, pendingListLength, onShowRequestsDialog }) {
    const onBellClick = ()=>{
        if (pendingListLength === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Танд одоогоор шинэ хүсэлт байхгүй байна.");
            return;
        }
        onShowRequestsDialog();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    employees?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-col gap-2 sm:flex-row sm:items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground",
                                children: "Demo ажилтан сонгох:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: demoEmployeeId,
                                onValueChange: onDemoEmployeeChange,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "h-8 w-[280px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Ажилтан сонгох..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: employees.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: e.id,
                                                children: [
                                                    e.firstName,
                                                    e.lastName
                                                ].filter(Boolean).join(" ") || e.email || e.id
                                            }, e.id, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    currentEmployeeId && !activeOffboarding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        className: "gap-2",
                        onClick: onShowOffboardingModal,
                        disabled: offboardingStarting,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            "Ажилаас гарах (Offboarding)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    activeOffboarding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "secondary",
                        className: "bg-amber-100 text-amber-800",
                        children: "Offboarding эхэлсэн"
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "icon",
                            className: "rounded-full",
                            onClick: onBellClick,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                pendingListLength > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white font-bold",
                                    children: pendingListLength
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeHeader.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeHeader;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeOffboardingModal",
    ()=>DemoEmployeeOffboardingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/demo-employee-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function DemoEmployeeOffboardingModal({ open, onOpenChange, activeAssignments, onStartOffboarding, offboardingStarting }) {
    const list = activeAssignments;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Ажилаас гарах (Offboarding)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Эзэмшиж буй хөрөнгө болон төлбөрийн үлдэгдлийг шалгана уу. Гарахыг баталгаажуулбал offboarding эхэлнэ."
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-4",
                    children: list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground py-4 text-center",
                        children: "Таны нэр дээр идэвхтэй хөрөнгө байхгүй байна."
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                children: "Хөрөнгө"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                lineNumber: 61,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                children: "Сериал"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                lineNumber: 62,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                children: "Огноо"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                lineNumber: 63,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                children: "Төлбөрийн үлдэгдэл"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                lineNumber: 64,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                        lineNumber: 60,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                    children: list.map((assignment)=>{
                                        const a = assignment;
                                        const fin = a.financing;
                                        const hasBalance = fin && (Number(fin.totalPayment) > 0 || Number(fin.assignedValue) > 0);
                                        const balanceText = hasBalance ? `${(fin.totalPayment ?? fin.assignedValue ?? 0).toLocaleString()} ₮` : "Үлдэгдэл байхгүй";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: "font-medium",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"])(a.asset?.assetTag ?? a.assetId)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: "text-muted-foreground text-sm",
                                                    children: a.asset?.serialNumber ?? "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: "text-sm text-muted-foreground",
                                                    children: new Date(a.assignedAt).toLocaleDateString()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    className: hasBalance ? "font-medium text-amber-700" : "text-muted-foreground",
                                                    children: balanceText
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, a.id, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                            lineNumber: 79,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                    lineNumber: 67,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>onOpenChange(false),
                            children: "Цуцлах"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: onStartOffboarding,
                            disabled: offboardingStarting,
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this),
                                "Гарах"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeOffboardingModal;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeOffboardingModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeePendingTransferCard",
    ()=>DemoEmployeePendingTransferCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function DemoEmployeePendingTransferCard({ toName, assetTag, onDismiss }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-6 border-blue-200 bg-blue-50/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
            className: "pb-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base font-medium text-blue-800",
                            children: "Хүлээгдэж буй шилжүүлэлт"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            className: "text-blue-600 h-8",
                            onClick: onDismiss,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-blue-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: assetTag
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        " хөрөнгийг",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: toName
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        ' руу шилжүүлэх хүсэлт илгээгдсэн. Тэр хүн "Шинэ хүсэлт" дээрээ хүлээн авах хүртэл хүлээгдэнэ.'
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeePendingTransferCard;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeePendingTransferCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeOffboardingCard",
    ()=>DemoEmployeeOffboardingCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-check.js [app-client] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/demo-employee-utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function DemoEmployeeOffboardingCard({ activeOffboarding, bulkReturnInstructionsRead, onBulkReturnInstructionsReadChange, onBulkSubmitReturnRequests, bulkReturnSending, submitReturnRequestLoading, selectedReturnAssetIds, eligibleReturnAssignmentsLength, selectAllEligibleReturns, assignmentsToReturn, pendingReturnRequestAssetIds, toggleReturnSelection, onOpenReturnRequest, completeReturnLoading }) {
    if (!activeOffboarding) return null;
    const deadline = activeOffboarding.deadline;
    const returnedAssets = activeOffboarding.returnedAssets;
    const totalAssets = activeOffboarding.totalAssets;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-6 border-amber-300 bg-amber-50/80",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "text-base font-semibold text-amber-900 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            " Ажлаас гарах — хөрөнгө буцаах"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-amber-800",
                        children: [
                            "Буцаах эцсийн хугацаа (ажлаас гарснаас хойш 3 хоногийн дотор):",
                            " ",
                            deadline != null ? new Date(deadline).toLocaleDateString("mn-MN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }) : "—",
                            '. Хөрөнгө бүр дээр "Буцааж өгөх хүсэлт гаргах" дарах эсвэл олон хөрөнгө сонгоод багцаар илгээнэ үү.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "pt-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 rounded-lg border border-amber-200 bg-white/70 p-3 text-sm text-amber-900",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-2 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: bulkReturnInstructionsRead,
                                            onChange: (e)=>onBulkReturnInstructionsReadChange(e.target.checked),
                                            className: "rounded border-amber-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Би буцаах зааврыг уншсан. Гэмтэл, дутуу байвал нөхцөл болон зургийг оруулна."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    className: "gap-2 bg-amber-700 hover:bg-amber-800 text-white",
                                    onClick: onBulkSubmitReturnRequests,
                                    disabled: bulkReturnSending || submitReturnRequestLoading || !bulkReturnInstructionsRead || selectedReturnAssetIds.size === 0,
                                    children: [
                                        bulkReturnSending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 19
                                                }, this),
                                                "Илгээж байна..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this) : null,
                                        "Багцаар буцаах хүсэлт илгээх (",
                                        selectedReturnAssetIds.size,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            className: "w-[44px]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                "aria-label": "Бүгдийг сонгох",
                                                checked: eligibleReturnAssignmentsLength > 0 && selectedReturnAssetIds.size === eligibleReturnAssignmentsLength,
                                                onChange: (e)=>selectAllEligibleReturns(e.target.checked),
                                                className: "rounded border-amber-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            children: "Хөрөнгө"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            children: "Serial"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            children: "Үйлдэл"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                children: assignmentsToReturn.map((assignment)=>{
                                    const a = assignment;
                                    const hasPendingRequest = pendingReturnRequestAssetIds.has(a.assetId);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    "aria-label": "Хөрөнгө сонгох",
                                                    checked: selectedReturnAssetIds.has(a.assetId),
                                                    onChange: (e)=>toggleReturnSelection(a.assetId, e.target.checked),
                                                    disabled: hasPendingRequest,
                                                    className: "rounded border-amber-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                className: "font-medium",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAssetTag"])(a.asset?.assetTag ?? a.assetId)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                className: "text-muted-foreground text-sm",
                                                children: a.asset?.serialNumber ?? "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    size: "sm",
                                                    className: "gap-1.5 border-amber-600 text-amber-700 hover:bg-amber-100",
                                                    onClick: ()=>{
                                                        if (hasPendingRequest) return;
                                                        onOpenReturnRequest(a);
                                                    },
                                                    disabled: completeReturnLoading || hasPendingRequest,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 23
                                                        }, this),
                                                        " ",
                                                        hasPendingRequest ? "HR шалгах хүлээгдэж буй" : "Буцааж өгөх хүсэлт гаргах"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                                lineNumber: 167,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, a.id, true, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    returnedAssets != null && totalAssets != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-xs text-muted-foreground",
                        children: [
                            "Буцаасан: ",
                            returnedAssets,
                            " / ",
                            totalAssets
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeOffboardingCard;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeOffboardingCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeNotificationsCard",
    ()=>DemoEmployeeNotificationsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-check.js [app-client] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DemoEmployeeNotificationsCard({ notifications, expandedNotificationId, setExpandedNotificationId, bulkReturnInstructionsRead, setBulkReturnInstructionsRead, handleBulkSubmitReturnRequests, bulkReturnSending, submitReturnRequestLoading, selectedReturnAssetIds, eligibleReturnAssignmentsLength, selectAllEligibleReturns, assetsToReturnList, myAssetsList, pendingReturnRequestAssetIds, toggleReturnSelection, onOpenReturnRequest, completeReturnLoading, activeOffboarding, normalizeAssetTag }) {
    if (notifications.length === 0 || activeOffboarding) return null;
    const displayList = assetsToReturnList ?? myAssetsList.map((a)=>({
            id: a.assetId,
            assetTag: a.asset?.assetTag ?? a.assetId,
            serialNumber: a.asset?.serialNumber ?? "—"
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-6 min-h-0 shrink-0 border-amber-200 bg-amber-50/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                    className: "text-base font-medium text-amber-800 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        " Мэдэгдлүүд"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "pt-0 min-h-[120px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-3",
                    children: notifications.map((n)=>{
                        const isExpanded = expandedNotificationId === n.id;
                        const receivedDate = n.createdAt != null ? new Date(n.createdAt) : null;
                        const dateLabel = receivedDate ? `${receivedDate.getFullYear()} оны ${receivedDate.getMonth() + 1} сарын ${receivedDate.getDate()}` : "";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: `rounded-lg border p-4 text-sm min-h-0 overflow-visible ${n.isRead ? "border-gray-200 bg-white" : "border-amber-300 bg-amber-50"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium text-foreground",
                                                    children: n.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 21
                                                }, this),
                                                dateLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-muted-foreground",
                                                    children: [
                                                        "Ирсэн огноо: ",
                                                        dateLabel
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            className: "shrink-0 gap-1 text-amber-700 hover:text-amber-800",
                                            onClick: ()=>setExpandedNotificationId(isExpanded ? null : n.id),
                                            children: [
                                                isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 23
                                                }, this),
                                                "Дэлгэрэнгүй"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                    lineNumber: 106,
                                    columnNumber: 17
                                }, this),
                                isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-4 border-t border-amber-200 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-amber-900",
                                            children: [
                                                "Буцаах эцсийн хугацаа:",
                                                " ",
                                                n.message.includes("Буцаах эцсийн хугацаа:") ? n.message.split("Буцаах эцсийн хугацаа:")[1]?.split(".")[0]?.trim() ?? "—" : "—"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                            lineNumber: 133,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Хөрөнгийн жагсаалт — доорх хөрөнгө бүр дээр буцаах хүсэлт илгээнэ үү."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                            lineNumber: 142,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border border-amber-200 bg-white/70 p-3 text-sm text-amber-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "flex items-center gap-2 cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: bulkReturnInstructionsRead,
                                                                    onChange: (e)=>setBulkReturnInstructionsRead(e.target.checked),
                                                                    className: "rounded border-amber-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                    lineNumber: 149,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Би буцаах зааврыг уншсан. Гэмтэл, дутуу байвал нөхцөл болон зургийг оруулна."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                    lineNumber: 157,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            className: "gap-2 bg-amber-700 hover:bg-amber-800 text-white",
                                                            onClick: handleBulkSubmitReturnRequests,
                                                            disabled: bulkReturnSending || submitReturnRequestLoading || !bulkReturnInstructionsRead || selectedReturnAssetIds.size === 0 || !activeOffboarding,
                                                            title: !activeOffboarding ? "HR таны offboarding процессыг эхлүүлсний дараа багцаар илгээх боломжтой." : undefined,
                                                            children: [
                                                                "Багцаар буцаах хүсэлт илгээх (",
                                                                selectedReturnAssetIds.size,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 23
                                                }, this),
                                                !activeOffboarding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-xs text-muted-foreground",
                                                    children: "Анхаар: HR таны ажлаас гарах процессыг эхлүүлээгүй байна (offboarding event байхгүй)."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 25
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                            lineNumber: 146,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                className: "w-[44px]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    "aria-label": "Бүгдийг сонгох",
                                                                    checked: eligibleReturnAssignmentsLength > 0 && selectedReturnAssetIds.size === eligibleReturnAssignmentsLength,
                                                                    onChange: (e)=>selectAllEligibleReturns(e.target.checked),
                                                                    className: "rounded border-amber-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                    lineNumber: 194,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                lineNumber: 193,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Хөрөнгө"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                lineNumber: 208,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Serial"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                lineNumber: 209,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                                children: "Үйлдэл"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                                    children: displayList.map((item)=>{
                                                        const canReturn = myAssetsList.some((m)=>m.assetId === item.id);
                                                        const hasPendingRequest = pendingReturnRequestAssetIds.has(item.id);
                                                        const assignmentForDialog = myAssetsList.find((m)=>m.assetId === item.id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        "aria-label": "Хөрөнгө сонгох",
                                                                        checked: selectedReturnAssetIds.has(item.id),
                                                                        onChange: (e)=>toggleReturnSelection(item.id, e.target.checked),
                                                                        disabled: !canReturn || hasPendingRequest,
                                                                        className: "rounded border-amber-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                        lineNumber: 226,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                    lineNumber: 225,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "font-medium",
                                                                    children: normalizeAssetTag(item.assetTag)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    className: "text-muted-foreground text-sm",
                                                                    children: item.serialNumber
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        className: "gap-1.5 border-amber-600 text-amber-700 hover:bg-amber-100",
                                                                        onClick: ()=>{
                                                                            if (hasPendingRequest) return;
                                                                            onOpenReturnRequest(assignmentForDialog ?? {
                                                                                id: item.id,
                                                                                assetId: item.id,
                                                                                assignedAt: 0,
                                                                                asset: {
                                                                                    id: item.id,
                                                                                    assetTag: item.assetTag,
                                                                                    serialNumber: item.serialNumber
                                                                                }
                                                                            });
                                                                        },
                                                                        disabled: completeReturnLoading || submitReturnRequestLoading || !canReturn || hasPendingRequest,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                                lineNumber: 273,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            " ",
                                                                            hasPendingRequest ? "HR шалгах хүлээгдэж буй" : canReturn ? "Буцааж өгөх хүсэлт илгээх" : "Буцаасан"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                                    lineNumber: 246,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 29
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                            lineNumber: 190,
                                            columnNumber: 21
                                        }, this),
                                        myAssetsList.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: "Таны нэр дээр буцаах хөрөнгө бүртгэгдээгүй байна."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                            lineNumber: 287,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                                    lineNumber: 132,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, n.id, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                            lineNumber: 102,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeNotificationsCard;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeNotificationsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeRequestsDialog",
    ()=>DemoEmployeeRequestsDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-check.js [app-client] (ecmascript) <export default as ClipboardCheck>");
"use client";
;
;
;
;
;
;
function DemoEmployeeRequestsDialog({ open, onOpenChange, pendingList, currentEmployeeId, currentPending, isChecked, setSignAssignment, setSignatureData, setSignatureFileUrl, setIsSignModalOpen, handleApprove, handleReject, updatingStatus, normalizeAssetTag }) {
    const openSignModal = (a)=>{
        setSignAssignment(a);
        setSignatureData(null);
        setSignatureFileUrl(null);
        setIsSignModalOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-xl max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "flex items-center gap-2 text-base font-medium text-amber-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                " Шинэ хүсэлт (",
                                pendingList.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Таны руу шилжүүлсэн бүх хөрөнгийн хүсэлт. Хүсэлт бүр дээр нөхцөл шалгаж, хүлээн авах эсвэл татгалзах боломжтой."
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                pendingList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted-foreground py-4 text-center",
                    children: currentEmployeeId ? "Танд одоогоор шинэ хүсэлт байхгүй байна." : "Ажилтны мэдээлэл ачаалж байна..."
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 mt-2",
                    children: pendingList.map((pending)=>{
                        const a = pending;
                        const requestedByName = a.requestedBy ? [
                            a.requestedBy.firstName,
                            a.requestedBy.lastName
                        ].filter(Boolean).join(" ") || "Admin" : "Admin";
                        const isCurrent = currentPending && currentPending.id === a.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col justify-between gap-4 rounded-lg border border-amber-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold text-lg text-foreground",
                                            children: normalizeAssetTag(a.asset?.assetTag)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                            lineNumber: 92,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: [
                                                "Serial: ",
                                                a.asset?.serialNumber || "N/A",
                                                " | Олгосон:",
                                                " ",
                                                new Date(a.assignedAt).toLocaleDateString(),
                                                requestedByName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        " | Хэн явуулсан: ",
                                                        requestedByName
                                                    ]
                                                }, void 0, true)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                            lineNumber: 95,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                    lineNumber: 91,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        !isCurrent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: ()=>openSignModal(a),
                                            className: "gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 25
                                                }, this),
                                                " Нөхцөл шалгах"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                            lineNumber: 106,
                                            columnNumber: 23
                                        }, this) : !isChecked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>openSignModal(a),
                                            className: "gap-2 bg-amber-500 hover:bg-amber-600 text-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 25
                                                }, this),
                                                " Нөхцөл шалгах"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                            lineNumber: 115,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "bg-emerald-100 text-emerald-700 border-emerald-200 py-2 px-3 gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 25
                                                }, this),
                                                " Шалгасан"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                            lineNumber: 122,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>handleApprove(a.id),
                                            variant: "outline",
                                            disabled: !isChecked || updatingStatus,
                                            className: "gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 23
                                                }, this),
                                                " Хүлээн авах"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                            lineNumber: 127,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>handleReject(a.id),
                                            variant: "destructive",
                                            disabled: updatingStatus,
                                            className: "disabled:opacity-30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 23
                                                }, this),
                                                " Татгалзах"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                            lineNumber: 135,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                                    lineNumber: 104,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, a.id, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                            lineNumber: 87,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeRequestsDialog;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeRequestsDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeMyAssetsCard",
    ()=>DemoEmployeeMyAssetsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function DemoEmployeeMyAssetsCard({ myAssetsList, activeLoading, pendingLoading, setSelectedAssignment, normalizeAssetTag }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mt-6 border-border bg-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "text-base font-semibold",
                        children: "Миний эзэмшиж буй хөрөнгө"
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Идэвхтэй болон таны руу шилжүүлсэн хүлээгдэж буй хөрөнгө энд харагдана."
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Serial Number"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Нэр"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Огноо"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Төлөв"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                        children: "Хэн явуулсан"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: myAssetsList.length > 0 ? myAssetsList.map((assignment)=>{
                                const isPending = assignment.status !== "ACTIVE";
                                const a = assignment;
                                const requestedByName = a.requestedBy ? [
                                    a.requestedBy.firstName,
                                    a.requestedBy.lastName
                                ].filter(Boolean).join(" ") || "—" : "—";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    className: "cursor-pointer hover:bg-muted/50",
                                    onClick: ()=>setSelectedAssignment(assignment),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "font-mono text-xs",
                                            children: assignment.asset?.serialNumber || "N/A"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                            lineNumber: 73,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "font-medium",
                                            children: normalizeAssetTag(assignment.asset?.assetTag)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                            lineNumber: 76,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: new Date(assignment.assignedAt).toLocaleDateString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                            lineNumber: 79,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                className: "bg-amber-50 text-amber-700 border-amber-200",
                                                children: "Хүлээгдэж буй"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                                lineNumber: 84,
                                                columnNumber: 25
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                className: "bg-emerald-50 text-emerald-700 border-emerald-100",
                                                children: "Идэвхтэй"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                                lineNumber: 91,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                            lineNumber: 82,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "text-muted-foreground text-sm",
                                            children: isPending ? requestedByName : "—"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                            lineNumber: 99,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, assignment.id, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                    lineNumber: 66,
                                    columnNumber: 19
                                }, this);
                            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                    colSpan: 5,
                                    className: "h-24 text-center text-muted-foreground",
                                    children: activeLoading || pendingLoading ? "Ачаалж байна..." : "Бүртгэлтэй хөрөнгө байхгүй."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeMyAssetsCard;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeMyAssetsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeSignModal",
    ()=>DemoEmployeeSignModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
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
function DemoEmployeeSignModal({ open, onOpenChange, signAssignment, setSignAssignment, signatureData, setSignatureData, signatureFileUrl, setSignatureFileUrl, showSignaturePad, setShowSignaturePad, savedSignatureUrl, loadSignatureFromUrl, handleSaveSignature, handleClearSignature, signatureUploading, signatureProfileSaving, saveSignatureToProfile, handleVerify, employeesData, currentEmployeeId, DEMO_EMPLOYEE_EMAIL, normalizeAssetTag }) {
    const handleClose = (open)=>{
        onOpenChange(open);
        if (!open) {
            setSignAssignment(null);
            setSignatureData(null);
            setSignatureFileUrl(null);
        }
    };
    const employeeName = employeesData?.employees?.find((e)=>e.id === currentEmployeeId)?.firstName ? `${employeesData?.employees?.find((e)=>e.id === currentEmployeeId)?.firstName ?? ""} ${employeesData?.employees?.find((e)=>e.id === currentEmployeeId)?.lastName ?? ""}`.trim() : DEMO_EMPLOYEE_EMAIL;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: handleClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-6xl w-full max-h-[90vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Хөрөнгийн нөхцөл шалгах ба гарын үсэг зурах"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: [
                                normalizeAssetTag(signAssignment?.asset?.assetTag) ?? "Сонгосон хөрөнгө",
                                " ",
                                "— мэдээллээ шалгаад гарын үсгээ зурна уу."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] ",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-2 lg:order-1 flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$esign$2f$_components$2f$DocumentPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    signatureData: signatureData,
                                    title: "Хөрөнгийн ашиглалтын гэрээ",
                                    bodyText: "Доор гарын үсэг зурж баталгаажуулснаар та энэхүү хөрөнгийг хүлээн авч, гэрээнд заасан нөхцөлийг зөвшөөрч байгаагаа илэрхийлнэ. Цахим гарын үсэг нь гарын үсэгтэй адил хүчинтэй.",
                                    waitingLabel: "Гарын үсэг хүлээгдэж байна...",
                                    signedByLabel: "Баталгаажуулан гарын үсэг зурсан",
                                    dateLabel: "Огноо"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "order-1 lg:order-2 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "rounded-xl border border-muted bg-muted/30 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-base font-semibold mb-3",
                                            children: "Хөрөнгийн дэлгэрэнгүй мэдээлэл"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Хариуцагч"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: employeeName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Хэнээс"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: signAssignment?.requestedBy ? [
                                                                signAssignment.requestedBy.firstName,
                                                                signAssignment.requestedBy.lastName
                                                            ].filter(Boolean).join(" ") || "Admin" : "Admin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Юу"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: normalizeAssetTag(signAssignment?.asset?.assetTag ?? signAssignment?.assetId)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Сериал"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: signAssignment?.asset?.serialNumber ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Ангилал"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: signAssignment?.asset?.category ?? "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Олгосон огноо"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: signAssignment?.assignedAt ? new Date(signAssignment.assignedAt).toLocaleDateString("mn-MN") : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Гэрээний төрөл"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: "Ашиглалтын гэрээ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-muted-foreground",
                                                            children: "Гэрээ №"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "font-medium",
                                                            children: signAssignment?.id ? `CN-${signAssignment.id.slice(0, 6)}` : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 min-h-[420px] flex flex-col",
                                    children: [
                                        savedSignatureUrl && !showSignaturePad && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium mb-3",
                                                    children: "Өмнө хадгалсан гарын үсэг байна. Ашиглах уу?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            type: "button",
                                                            variant: "outline",
                                                            className: "h-12",
                                                            onClick: async ()=>{
                                                                await loadSignatureFromUrl(savedSignatureUrl);
                                                                setShowSignaturePad(false);
                                                            },
                                                            children: "Өмнөх гарын үсэг ашиглах"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            type: "button",
                                                            className: "h-12 bg-gray-900 hover:bg-gray-800 text-white",
                                                            onClick: ()=>{
                                                                setSignatureData(null);
                                                                setShowSignaturePad(true);
                                                            },
                                                            children: "Шинээр зурж эхлэх"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this),
                                        showSignaturePad && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex flex-col",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$esign$2f$_components$2f$SignaturePad$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                onSave: handleSaveSignature,
                                                onClear: handleClearSignature,
                                                title: "Гарын үсэг зурах",
                                                clearLabel: "Арилгах",
                                                saveLabel: signatureUploading ? "PDF хадгалж байна..." : "Гарын үсэг хадгалах"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                lineNumber: 220,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                            lineNumber: 219,
                                            columnNumber: 17
                                        }, this),
                                        showSignaturePad && signatureData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium mb-2",
                                                    children: "Энэ гарын үсгийг өөр дээрээ хадгалах уу?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            type: "button",
                                                            size: "sm",
                                                            onClick: saveSignatureToProfile,
                                                            disabled: signatureProfileSaving,
                                                            className: "bg-emerald-600 hover:bg-emerald-700 text-white",
                                                            children: "Тийм, хадгалъя"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            type: "button",
                                                            variant: "ghost",
                                                            size: "sm",
                                                            children: "Үгүй"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                signatureFileUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-emerald-700",
                                    children: [
                                        "Гэрээ PDF хадгалагдсан: ",
                                        signatureFileUrl
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    className: "gap-2 sm:gap-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>onOpenChange(false),
                            children: "Болих"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "bg-primary text-primary-foreground",
                            onClick: handleVerify,
                            disabled: !signatureData || signatureUploading,
                            children: "Шалгасан"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
                    lineNumber: 264,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeSignModal;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeSignModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeAssetDetailDialog",
    ()=>DemoEmployeeAssetDetailDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function DemoEmployeeAssetDetailDialog({ selectedAssignment, setSelectedAssignment, disposalReason, setDisposalReason, setShowTransferDialog, setShowItTransferDialog, setTransferToEmployeeId, handleRequestDisposal, disposalSending, setTransferReason, transferSending, normalizeAssetTag }) {
    const open = !!selectedAssignment;
    const onClose = ()=>{
        setSelectedAssignment(null);
        setDisposalReason("");
        setShowTransferDialog(false);
        setShowItTransferDialog(false);
        setTransferToEmployeeId("");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: (isOpen)=>{
            if (!isOpen) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Хөрөнгийн дэлгэрэнгүй"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: [
                                normalizeAssetTag(selectedAssignment?.asset?.assetTag),
                                " — эзэмшиж буй хөрөнгийн мэдээлэл. Устгах хүсэлт илгээх бол IT хэсэгт харагдана."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                selectedAssignment?.asset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-muted-foreground",
                                    children: "Нэр:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-medium",
                                    children: normalizeAssetTag(selectedAssignment.asset.assetTag)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-muted-foreground",
                                    children: "Serial:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-medium",
                                    children: selectedAssignment.asset.serialNumber || "—"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-muted-foreground",
                                    children: "Ангилал:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-medium",
                                    children: selectedAssignment.asset.category || "—"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-muted-foreground",
                                    children: "Олгосон огноо:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-medium",
                                    children: new Date(selectedAssignment.assignedAt).toLocaleDateString()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Устгах шалтгаан (заавал биш)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    className: "w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm",
                                    placeholder: "Жишээ: эвдрэлтэй, ашиглахаа больсон...",
                                    value: disposalReason,
                                    onChange: (e)=>setDisposalReason(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2 border-t pt-4 mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-medium text-muted-foreground",
                            children: "Үйлдлүүд"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    className: "gap-1.5",
                                    onClick: ()=>{
                                        setTransferToEmployeeId("");
                                        setShowItTransferDialog(true);
                                    },
                                    disabled: transferSending,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        " IT ажилтан руу явуулах"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    className: "gap-1.5",
                                    onClick: handleRequestDisposal,
                                    disabled: disposalSending,
                                    title: "Устгах хүсэлт илгээснээр эхлээд IT, дараа нь санхүү баталгаажуулна",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this),
                                        " Санхүү рүү явуулах (устгах хүсэлт)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    className: "gap-1.5",
                                    onClick: ()=>{
                                        setTransferToEmployeeId("");
                                        setTransferReason("");
                                        setShowTransferDialog(true);
                                    },
                                    disabled: transferSending,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this),
                                        " Ажилтан руу шилжүүлэх"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    className: "gap-2 sm:gap-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>{
                                setSelectedAssignment(null);
                                setDisposalReason("");
                            },
                            children: "Хаах"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "gap-2 bg-amber-600 hover:bg-amber-700 text-white",
                            onClick: handleRequestDisposal,
                            disabled: disposalSending,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                " Устгах хүсэлт илгээх (Demo IT руу)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeAssetDetailDialog;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeAssetDetailDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeTransferDialogs",
    ()=>DemoEmployeeTransferDialogs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function DemoEmployeeTransferDialogs({ showItTransferDialog, setShowItTransferDialog, transferToEmployeeId, setTransferToEmployeeId, otherEmployees, handleTransferToIt, transferSending, showTransferDialog, setShowTransferDialog, transferReason, setTransferReason, handleTransferToEmployee }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showItTransferDialog,
                onOpenChange: setShowItTransferDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "IT ажилтан сонгох"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Хөрөнгийг ямар IT ажилтан руу шилжүүлэх вэ?"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: transferToEmployeeId || undefined,
                                onValueChange: setTransferToEmployeeId,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "IT ажилтан сонгоно уу"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: otherEmployees.map((emp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: emp.id,
                                                children: emp.name
                                            }, emp.id, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    onClick: ()=>setShowItTransferDialog(false),
                                    children: "Цуцлах"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleTransferToIt,
                                    disabled: !transferToEmployeeId || transferSending,
                                    children: transferSending ? "Шилжүүлж байна..." : "Шилжүүлэх"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showTransferDialog,
                onOpenChange: setShowTransferDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Ажилтан руу шилжүүлэх"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: 'Сонгосон ажилтан таны хөрөнгийг "Шинэ хүсэлт" дээрээ хүлээн авах/татгалзах хүртэл pending байна.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium",
                                            children: "Хүлээн авах ажилтан"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: transferToEmployeeId || undefined,
                                            onValueChange: setTransferToEmployeeId,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "mt-1 w-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Ажилтан сонгоно уу"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: otherEmployees.map((emp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: emp.id,
                                                            children: emp.name
                                                        }, emp.id, false, {
                                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-sm font-medium",
                                            children: "Шалтгаан (заавал биш)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: "mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm",
                                            placeholder: "Жишээ: алба солигдсон",
                                            value: transferReason,
                                            onChange: (e)=>setTransferReason(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    onClick: ()=>setShowTransferDialog(false),
                                    children: "Цуцлах"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleTransferToEmployee,
                                    disabled: !transferToEmployeeId || transferSending,
                                    children: transferSending ? "Шилжүүлж байна..." : "Шилжүүлэх"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = DemoEmployeeTransferDialogs;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeTransferDialogs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeReturnRequestDialog",
    ()=>DemoEmployeeReturnRequestDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function DemoEmployeeReturnRequestDialog({ open, onOpenChange, returnRequestAssignment, setShowReturnRequestDialog, setReturnRequestAssignment, returnCondition, setReturnCondition, returnConditionDetail, setReturnConditionDetail, returnInstructionsRead, setReturnInstructionsRead, isDamagedCondition, returnPhotoFile, setReturnPhotoFile, handleSubmitReturnRequest, returnRequestSending, normalizeAssetTag }) {
    const handleOpenChange = (isOpen)=>{
        if (!isOpen) {
            setShowReturnRequestDialog(false);
            setReturnRequestAssignment(null);
            setReturnCondition("GOOD");
            setReturnConditionDetail("");
            setReturnInstructionsRead(false);
        }
        onOpenChange(isOpen);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: handleOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Буцааж өгөх хүсэлт гаргах"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: [
                                normalizeAssetTag(returnRequestAssignment?.asset?.assetTag) ?? "Хөрөнгө",
                                " ",
                                "— зааврыг уншиж, нөхцөлөө сонгоно уу."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-sm text-amber-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium mb-2",
                                    children: "Буцаах заавар"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-disc list-inside space-y-1 text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "Хөрөнгийг цэвэр, бүрэн бүтэн буцаана."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "Гэмтэл, дутуу байвал нөхцөл болон зургийг оруулна."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex items-center gap-2 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: returnInstructionsRead,
                                    onChange: (e)=>setReturnInstructionsRead(e.target.checked),
                                    className: "rounded border-amber-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Би буцаах зааврыг уншсан, дагаж байна."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Нөхцөл (condition) — заавал"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    value: returnCondition,
                                    onValueChange: (v)=>{
                                        setReturnCondition(v);
                                        if (![
                                            "DAMAGED",
                                            "NON_FUNCTIONAL",
                                            "LOST"
                                        ].includes(v)) setReturnPhotoFile(null);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            className: "mt-1 w-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                placeholder: "Нөхцөл сонгоно уу"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "GOOD",
                                                    children: "GOOD — Сайн"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "FAIR",
                                                    children: "FAIR — Дунд"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "DAMAGED",
                                                    children: "DAMAGED — Эвдрэлтэй"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "NON_FUNCTIONAL",
                                                    children: "NON_FUNCTIONAL — Ажиллахгүй"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "LOST",
                                                    children: "LOST — Алдагдсан"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Нөхцөлийн дэлгэрэнгүй (заавал биш)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    className: "mt-1 w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-sm",
                                    placeholder: "Нөхцөлөө товч тайлбарлана уу. HR шалгахад тусална.",
                                    value: returnConditionDetail,
                                    onChange: (e)=>setReturnConditionDetail(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        isDamagedCondition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium",
                                    children: "Зураг оруулах (заавал биш)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground text-xs mt-0.5 mb-1",
                                    children: "Эвдрэлтэй бол гэмтлийн зураг оруулбал HR/IT шалгахад тусална."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    accept: "image/*",
                                    className: "mt-1 w-full text-sm file:mr-2 file:rounded-md file:border-0 file:bg-amber-100 file:px-3 file:py-1.5 file:text-amber-800",
                                    onChange: (e)=>setReturnPhotoFile(e.target.files?.[0] ?? null)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this),
                                returnPhotoFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground text-xs mt-1",
                                    children: [
                                        returnPhotoFile.name,
                                        " сонгогдсон."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                                    lineNumber: 156,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>handleOpenChange(false),
                            children: "Цуцлах"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSubmitReturnRequest,
                            disabled: !returnInstructionsRead || !returnCondition.trim() || returnRequestSending,
                            className: "gap-2 bg-amber-600 hover:bg-amber-700 text-white",
                            children: returnRequestSending ? "Илгээж байна..." : "Буцааж өгөх хүсэлт илгээх"
                        }, void 0, false, {
                            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c = DemoEmployeeReturnRequestDialog;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeReturnRequestDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/demo-employee/demo-employee.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DemoEmployeeContent",
    ()=>DemoEmployeeContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$useDemoEmployee$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/useDemoEmployee.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeOffboardingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeOffboardingModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeePendingTransferCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeePendingTransferCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeOffboardingCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeOffboardingCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeNotificationsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeNotificationsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeRequestsDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeRequestsDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeMyAssetsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeMyAssetsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeSignModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeSignModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeAssetDetailDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeAssetDetailDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeTransferDialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeTransferDialogs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeReturnRequestDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/DemoEmployeeReturnRequestDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/demo-employee/demo-employee-utils.ts [app-client] (ecmascript)");
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
;
;
;
;
function DemoEmployeeContent({ title = "Миний хөрөнгө" }) {
    _s();
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$useDemoEmployee$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoEmployee"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col p-6 overflow-visible",
        children: [
            s.employeeNotFound && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800",
                children: [
                    "Демо ажилтан олдсонгүй: ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$demo$2d$employee$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_EMPLOYEE_EMAIL"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                        lineNumber: 29,
                        columnNumber: 35
                    }, this),
                    " ",
                    "имэйлтэй ажилтан өгөгдлийн санд байх ёстой."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeHeader"], {
                title: title,
                employees: s.employeesData?.employees,
                demoEmployeeId: s.demoEmployeeId,
                onDemoEmployeeChange: s.setDemoEmployeeId,
                currentEmployeeId: s.currentEmployeeId,
                activeOffboarding: s.activeOffboarding,
                offboardingStarting: s.offboardingStarting,
                onShowOffboardingModal: ()=>s.setShowOffboardingModal(true),
                pendingListLength: s.pendingList.length,
                onShowRequestsDialog: ()=>s.setShowRequestsDialog(true)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeOffboardingModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeOffboardingModal"], {
                open: s.showOffboardingModal,
                onOpenChange: s.setShowOffboardingModal,
                activeAssignments: s.activeAssignments,
                onStartOffboarding: s.handleStartOffboarding,
                offboardingStarting: s.offboardingStarting
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            s.pendingTransferSent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeePendingTransferCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeePendingTransferCard"], {
                toName: s.pendingTransferSent.toName,
                assetTag: s.pendingTransferSent.assetTag,
                onDismiss: ()=>s.setPendingTransferSent(null)
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeOffboardingCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeOffboardingCard"], {
                activeOffboarding: s.activeOffboarding ? {
                    deadline: s.activeOffboarding.deadline,
                    returnedAssets: s.activeOffboarding.returnedAssets,
                    totalAssets: s.activeOffboarding.totalAssets
                } : null,
                bulkReturnInstructionsRead: s.bulkReturnInstructionsRead,
                onBulkReturnInstructionsReadChange: s.setBulkReturnInstructionsRead,
                onBulkSubmitReturnRequests: s.handleBulkSubmitReturnRequests,
                bulkReturnSending: s.bulkReturnSending,
                submitReturnRequestLoading: s.submitReturnRequestLoading,
                selectedReturnAssetIds: s.selectedReturnAssetIds,
                eligibleReturnAssignmentsLength: s.eligibleReturnAssignmentsLength,
                selectAllEligibleReturns: s.selectAllEligibleReturns,
                assignmentsToReturn: s.assignmentsToReturn,
                pendingReturnRequestAssetIds: s.pendingReturnRequestAssetIds,
                toggleReturnSelection: s.toggleReturnSelection,
                onOpenReturnRequest: s.onOpenReturnRequest,
                completeReturnLoading: s.completeReturnLoading
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeNotificationsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeNotificationsCard"], {
                notifications: s.notifications,
                expandedNotificationId: s.expandedNotificationId,
                setExpandedNotificationId: s.setExpandedNotificationId,
                bulkReturnInstructionsRead: s.bulkReturnInstructionsRead,
                setBulkReturnInstructionsRead: s.setBulkReturnInstructionsRead,
                handleBulkSubmitReturnRequests: s.handleBulkSubmitReturnRequests,
                bulkReturnSending: s.bulkReturnSending,
                submitReturnRequestLoading: s.submitReturnRequestLoading,
                selectedReturnAssetIds: s.selectedReturnAssetIds,
                eligibleReturnAssignmentsLength: s.eligibleReturnAssignmentsLength,
                selectAllEligibleReturns: s.selectAllEligibleReturns,
                assetsToReturnList: s.assetsToReturnList,
                myAssetsList: s.myAssetsList,
                pendingReturnRequestAssetIds: s.pendingReturnRequestAssetIds,
                toggleReturnSelection: s.toggleReturnSelection,
                onOpenReturnRequest: s.onOpenReturnRequest,
                completeReturnLoading: s.completeReturnLoading,
                activeOffboarding: s.activeOffboarding,
                normalizeAssetTag: s.normalizeAssetTag
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeRequestsDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeRequestsDialog"], {
                open: s.showRequestsDialog,
                onOpenChange: s.setShowRequestsDialog,
                pendingList: s.pendingList,
                currentEmployeeId: s.currentEmployeeId,
                currentPending: s.currentPending,
                isChecked: s.isChecked,
                setIsChecked: s.setIsChecked,
                setSignAssignment: s.setSignAssignment,
                setSignatureData: s.setSignatureData,
                setSignatureFileUrl: s.setSignatureFileUrl,
                setIsSignModalOpen: s.setIsSignModalOpen,
                handleApprove: s.handleApprove,
                handleReject: s.handleReject,
                updatingStatus: s.updatingStatus,
                normalizeAssetTag: s.normalizeAssetTag
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeMyAssetsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeMyAssetsCard"], {
                myAssetsList: s.myAssetsList,
                activeLoading: s.activeLoading,
                pendingLoading: s.pendingLoading,
                setSelectedAssignment: s.setSelectedAssignment,
                normalizeAssetTag: s.normalizeAssetTag
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeSignModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeSignModal"], {
                open: s.isSignModalOpen,
                onOpenChange: s.setIsSignModalOpen,
                signAssignment: s.signAssignment,
                setSignAssignment: s.setSignAssignment,
                signatureData: s.signatureData,
                setSignatureData: s.setSignatureData,
                signatureFileUrl: s.signatureFileUrl,
                setSignatureFileUrl: s.setSignatureFileUrl,
                showSignaturePad: s.showSignaturePad,
                setShowSignaturePad: s.setShowSignaturePad,
                savedSignatureUrl: s.savedSignatureUrl,
                loadSignatureFromUrl: s.loadSignatureFromUrl,
                handleSaveSignature: s.handleSaveSignature,
                handleClearSignature: s.handleClearSignature,
                signatureUploading: s.signatureUploading,
                signatureProfileSaving: s.signatureProfileSaving,
                saveSignatureToProfile: s.saveSignatureToProfile,
                handleVerify: s.handleVerify,
                employeesData: s.employeesData,
                currentEmployeeId: s.currentEmployeeId,
                DEMO_EMPLOYEE_EMAIL: s.DEMO_EMPLOYEE_EMAIL,
                normalizeAssetTag: s.normalizeAssetTag,
                PDF_FONT_NAME: s.PDF_FONT_NAME
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeAssetDetailDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeAssetDetailDialog"], {
                selectedAssignment: s.selectedAssignment,
                setSelectedAssignment: s.setSelectedAssignment,
                disposalReason: s.disposalReason,
                setDisposalReason: s.setDisposalReason,
                setShowTransferDialog: s.setShowTransferDialog,
                setShowItTransferDialog: s.setShowItTransferDialog,
                setTransferToEmployeeId: s.setTransferToEmployeeId,
                handleRequestDisposal: s.handleRequestDisposal,
                disposalSending: s.disposalSending,
                setTransferReason: s.setTransferReason,
                transferSending: s.transferSending,
                normalizeAssetTag: s.normalizeAssetTag
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeTransferDialogs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeTransferDialogs"], {
                showItTransferDialog: s.showItTransferDialog,
                setShowItTransferDialog: s.setShowItTransferDialog,
                transferToEmployeeId: s.transferToEmployeeId,
                setTransferToEmployeeId: s.setTransferToEmployeeId,
                otherEmployees: s.otherEmployees,
                handleTransferToIt: s.handleTransferToIt,
                transferSending: s.transferSending,
                showTransferDialog: s.showTransferDialog,
                setShowTransferDialog: s.setShowTransferDialog,
                transferReason: s.transferReason,
                setTransferReason: s.setTransferReason,
                handleTransferToEmployee: s.handleTransferToEmployee
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$DemoEmployeeReturnRequestDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DemoEmployeeReturnRequestDialog"], {
                open: s.showReturnRequestDialog,
                onOpenChange: s.setShowReturnRequestDialog,
                returnRequestAssignment: s.returnRequestAssignment,
                setShowReturnRequestDialog: s.setShowReturnRequestDialog,
                setReturnRequestAssignment: s.setReturnRequestAssignment,
                returnCondition: s.returnCondition,
                setReturnCondition: s.setReturnCondition,
                returnConditionDetail: s.returnConditionDetail,
                setReturnConditionDetail: s.setReturnConditionDetail,
                returnInstructionsRead: s.returnInstructionsRead,
                setReturnInstructionsRead: s.setReturnInstructionsRead,
                isDamagedCondition: s.isDamagedCondition,
                returnPhotoFile: s.returnPhotoFile,
                setReturnPhotoFile: s.setReturnPhotoFile,
                handleSubmitReturnRequest: s.handleSubmitReturnRequest,
                returnRequestSending: s.returnRequestSending,
                normalizeAssetTag: s.normalizeAssetTag
            }, void 0, false, {
                fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/demo-employee/demo-employee.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(DemoEmployeeContent, "Qhb2KLlYTiRyqCnBoFs6PxsvNCk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$demo$2d$employee$2f$useDemoEmployee$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoEmployee"]
    ];
});
_c = DemoEmployeeContent;
var _c;
__turbopack_context__.k.register(_c, "DemoEmployeeContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_demo-employee_82f8a5ae._.js.map