import type { Asset } from "@/lib/types";
import { escapeHtml } from "./utils";

function buildQrTilesHtml(assets: Asset[], origin: string) {
  return assets
    .map((asset, index) => {
      const qrUrl = `${origin}/assets/${asset.id}`;
      const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
        qrUrl,
      )}`;
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
}

function writeQrWindow({
  title,
  tiles,
  windowRef,
}: {
  title: string;
  tiles: string;
  windowRef: Window;
}) {
  windowRef.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
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
  windowRef.document.close();
  windowRef.focus();
}

export function openQrPrintWindow(assets: Asset[]) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const tiles = buildQrTilesHtml(assets, origin);
  const printWindow = window.open("", "_blank", "width=1024,height=768");
  if (!printWindow) return;
  writeQrWindow({
    title: "QR код — хөрөнгө",
    tiles,
    windowRef: printWindow,
  });
  setTimeout(() => printWindow.print(), 300);
}

export function openQrPdfPreviewWindow(assets: Asset[]) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const tiles = buildQrTilesHtml(assets, origin);
  const previewWindow = window.open("", "_blank", "width=1024,height=768");
  if (!previewWindow) return;
  writeQrWindow({
    title: "QR код — хөрөнгө (PDF)",
    tiles,
    windowRef: previewWindow,
  });
}
