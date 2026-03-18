"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "./constants";
import type { Asset } from "@/lib/types";
import { getAssetQrImageUrl } from "@/lib/asset-qr";

interface QrDialogProps {
  open: boolean;
  assets: Asset[];
  onOpenChange: (open: boolean) => void;
}

export function QrDialog({ open, assets, onOpenChange }: QrDialogProps) {
  const printQrSheet = (assets: Asset[]) => {
    const rows = assets
      .map((asset) => {
        const qrUrl = getAssetQrImageUrl(asset.id);
        return `
          <div class="item">
            <img src="${qrUrl}" width="200" height="200" alt="QR" />
            <div class="meta">
              <div><span class="label">Asset ID:</span> ${asset.assetId}</div>
              <div><span class="label">Category:</span> ${CATEGORY_LABELS[asset.category]}</div>
              <div><span class="label">Serial:</span> ${asset.serialNumber}</div>
              <div><span class="label">Location:</span> ${asset.location ?? "—"}</div>
            </div>
          </div>`;
      })
      .join("");
    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Asset QR</title>
          <style>
            @page { size: A4; margin: 12mm; }
            body { font-family: Arial, sans-serif; margin: 0; }
            .page { width: 210mm; min-height: 297mm; padding: 12mm; box-sizing: border-box; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10mm; }
            .item { border: 1px solid #ddd; border-radius: 6mm; padding: 6mm; display: flex; gap: 6mm; align-items: center; }
            .meta { font-size: 11pt; line-height: 1.5; }
            .label { color: #555; font-size: 9pt; }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="grid">${rows}</div>
          </div>
        </body>
      </html>`;

    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[840px] rounded-3xl p-8 shadow-xl">
        <DialogHeader>
          <DialogTitle>QR код</DialogTitle>
        </DialogHeader>
        {assets.length > 0 && (
          <div className="mx-auto w-full max-w-[720px] rounded-3xl border border-border bg-white p-6">
            <div className="mx-auto aspect-[1/1.414] w-full max-w-[680px] rounded-3xl border border-dashed border-border p-6">
              <div className="grid grid-cols-2 gap-6">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center gap-4 rounded-2xl border border-border p-3"
                  >
                    <img
                      src={getAssetQrImageUrl(asset.id)}
                      alt="QR"
                      className="h-24 w-24"
                    />
                    <div className="text-xs text-muted-foreground">
                      <div className="text-sm font-semibold text-foreground">
                        {asset.assetId}
                      </div>
                      <div>{CATEGORY_LABELS[asset.category]}</div>
                      <div>{asset.serialNumber}</div>
                      <div>{asset.location || "—"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              A4 загвар (210мм × 297мм)
            </p>
          </div>
        )}
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => (assets.length ? printQrSheet(assets) : null)}
          >
            Print
          </Button>
          <Button onClick={() => (assets.length ? printQrSheet(assets) : null)}>
            Save PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
