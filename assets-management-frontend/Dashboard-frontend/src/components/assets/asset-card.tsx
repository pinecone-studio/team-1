"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "./constants";
import type { Asset } from "@/lib/types";
import Image from "next/image";

interface AssetCardProps {
  asset: Asset;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onOpenQr: (assets: Asset[]) => void;
  onOpenAsset: (assetId: string) => void;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

export function AssetCard({
  asset,
  selected,
  onToggleSelect,
  onOpenQr,
  onOpenAsset,
  onEdit,
  onDelete,
}: AssetCardProps) {
  return (
    <Card className="overflow-hidden border-border">
      {/* Контейнерийн өндөрийг h-48 (192px) гэж хатуу заав */}
      <div className="relative h-48 w-full bg-muted/30 overflow-hidden">
        <label className="absolute z-10 left-2 top-2 flex items-center gap-2 rounded-full bg-white/90 px-2 py-1 text-xs text-foreground shadow cursor-pointer">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(asset.id)}
          />
          <span className="select-none">Select</span>
        </label>

        {asset.imageUrl ? (
          <Image
            src={asset.imageUrl}
            alt={asset.assetId}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 280px"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {asset.assetId}
            </p>
            <p className="text-xs text-muted-foreground">
              {CATEGORY_LABELS[asset.category]}
            </p>
          </div>
          <span className="rounded-full bg-muted px-2 py-1 text-[10px] uppercase text-muted-foreground">
            {asset.status}
          </span>
        </div>

        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <p>Serial: {asset.serialNumber}</p>
          <p>Location: {asset.location || "—"}</p>
          <p>Date: {new Date(asset.purchaseDate).toLocaleDateString()}</p>
          <p>Value: ${asset.currentBookValue.toLocaleString()}</p>
        </div>

        <div className="mt-4 flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenAsset(asset.id)}
            aria-label="Asset detail"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onOpenQr([asset])}>
            QR
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(asset)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => onDelete(asset.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
