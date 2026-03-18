"use client";

import { gql } from "@apollo/client";

export const DEMO_EMPLOYEE_EMAIL = "tsetsegulziiocherdene@gmail.com";

export const normalizeAssetTag = (value?: string | null) => {
  if (!value) return "—";
  const trimmed = value.trim();
  if (trimmed.length <= 3) return trimmed.toUpperCase();
  const parts = trimmed.split("-");
  if (parts.length >= 2) {
    const prefix = parts[0].slice(0, 3).toUpperCase();
    return [prefix, ...parts.slice(1)].join("-");
  }
  return trimmed.slice(0, 3).toUpperCase();
};

export type AssignmentItem = {
  id: string;
  assetId: string;
  assignedAt: number;
  asset?: {
    id: string;
    assetTag?: string;
    category?: string;
    serialNumber?: string;
  } | null;
  financing?: {
    assignedValue?: number | null;
    totalPayment?: number | null;
    monthlyPayment?: number | null;
    paymentPlanMonths?: number | null;
  } | null;
  requestedBy?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
};

export const PDF_FONT_REGULAR = "/fonts/NotoSans-Variable.ttf";
export const PDF_FONT_BOLD = "/fonts/NotoSans-Variable.ttf";
export const PDF_FONT_NAME = "NotoSans";

let cachedPdfFontRegular: string | null = null;
let cachedPdfFontBold: string | null = null;

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

export async function ensurePdfFonts(pdf: { addFileToVFS: (a: string, b: string) => void; addFont: (a: string, b: string, c: string) => void }) {
  if (!cachedPdfFontRegular) {
    const res = await fetch(PDF_FONT_REGULAR);
    if (!res.ok) throw new Error("PDF font татаж чадсангүй.");
    cachedPdfFontRegular = arrayBufferToBase64(await res.arrayBuffer());
  }
  if (!cachedPdfFontBold) {
    if (PDF_FONT_BOLD === PDF_FONT_REGULAR) {
      cachedPdfFontBold = cachedPdfFontRegular;
    } else {
      const res = await fetch(PDF_FONT_BOLD);
      if (!res.ok) throw new Error("PDF bold font татаж чадсангүй.");
      cachedPdfFontBold = arrayBufferToBase64(await res.arrayBuffer());
    }
  }
  if (!cachedPdfFontRegular || !cachedPdfFontBold) {
    throw new Error("PDF font уншихад алдаа гарлаа.");
  }
  pdf.addFileToVFS("NotoSans-Regular.ttf", cachedPdfFontRegular);
  pdf.addFont("NotoSans-Regular.ttf", PDF_FONT_NAME, "normal");
  pdf.addFileToVFS("NotoSans-Bold.ttf", cachedPdfFontBold);
  pdf.addFont("NotoSans-Bold.ttf", PDF_FONT_NAME, "bold");
}

export const UpdateAssignmentStatusDocument = gql`
  mutation UpdateAssignmentStatus($assignmentId: ID!, $status: String!) {
    updateAssignmentStatus(assignmentId: $assignmentId, status: $status) {
      id
      status
    }
  }
`;

export const dataUrlToBlob = (dataUrl: string) => {
  const [header, data] = dataUrl.split(",");
  const mimeMatch = header.match(/data:(.*);base64/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
};
