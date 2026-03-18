import type { Asset } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QR_TILES_PER_A4_PAGE } from "../constants";

export type QrDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assets: Asset[];
  onPrint: () => void;
  onOpenPdfPreview: () => void;
};

export function QrDialog({
  open,
  onOpenChange,
  assets,
  onPrint,
  onOpenPdfPreview,
}: QrDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>QR код хэвлэх / PDF болгох</DialogTitle>
          <DialogDescription>
            Сонгосон хөрөнгийн QR кодуудыг A4 хэмжээтэй хуудсан дээр харах,
            хэвлэх эсвэл browser-ийн `Print → Save as PDF`-ээр PDF болгон
            хадгалах боломжтой.
          </DialogDescription>
        </DialogHeader>
        {assets.length > 1 && (
          <p className="text-sm text-muted-foreground mt-1">
            Нийт <strong>{assets.length}</strong> хөрөнгө · 1 A4 хуудасанд{" "}
            <strong>{QR_TILES_PER_A4_PAGE}</strong> ширхэг · нийт A4 дээр{" "}
            <strong>{Math.ceil(assets.length / QR_TILES_PER_A4_PAGE)}</strong>{" "}
            хуудас гарна.
          </p>
        )}
        <div className="mt-4 bg-white p-4 border border-border rounded-lg shadow-sm overflow-auto min-h-[280px] max-h-[60vh] flex-1">
          {assets.length === 1 ? (
            <div className="flex items-center justify-center min-h-[240px]">
              {assets.map((asset) => {
                const qrUrl =
                  typeof window !== "undefined"
                    ? `${window.location.origin}/assets/${asset.id}`
                    : `/assets/${asset.id}`;
                return (
                  <div
                    key={asset.id}
                    className="shrink-0 flex flex-col items-center gap-2"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                        qrUrl,
                      )}`}
                      alt={`${asset.assetId} QR`}
                      className="h-48 w-48 rounded-md border border-border bg-white object-contain"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {assets.map((asset, index) => {
                const qrUrl =
                  typeof window !== "undefined"
                    ? `${window.location.origin}/assets/${asset.id}`
                    : `/assets/${asset.id}`;
                const label = asset.assetId || asset.serialNumber || `#${index + 1}`;
                return (
                  <div
                    key={asset.id}
                    className="flex flex-col items-center justify-center rounded-md border border-border/60 bg-white p-1.5 h-[100px] min-h-[100px]"
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                        qrUrl,
                      )}`}
                      alt={`${label} QR`}
                      className="h-14 w-14 min-h-14 min-w-14 rounded bg-white object-contain shrink-0"
                    />
                    <span className="mt-0.5 text-[10px] text-muted-foreground text-center truncate w-full leading-tight">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between shrink-0">
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Хаах
            </Button>
            <Button variant="outline" className="gap-2" onClick={onOpenPdfPreview}>
              PDF файл болгох
            </Button>
            <Button onClick={onPrint} className="gap-2">
              Хэвлэх (A4)
            </Button>
          </div>
        </DialogFooter>
        <div className="text-xs text-muted-foreground">
          PDF болгох бол доорх <b>“PDF файл болгох”</b> товчийг дарж, нээгдсэн
          цонхноос <b>Save as PDF</b> сонгоно уу.
        </div>
      </DialogContent>
    </Dialog>
  );
}
