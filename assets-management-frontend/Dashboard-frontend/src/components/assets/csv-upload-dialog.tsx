"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreateAssetDocument,
  type AssetFieldsFragment,
} from "@/gql/graphql";
import type { Asset } from "@/lib/types";

type CsvUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAssets: (assets: Asset[]) => void;
};

export function CsvUploadDialog({
  open,
  onOpenChange,
  onAddAssets,
}: CsvUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createAssetMutation] = useMutation(CreateAssetDocument);

  const resetState = () => {
    setFile(null);
    setIsUploading(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isUploading) {
      resetState();
    }
    onOpenChange(newOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile);
      } else {
        toast.error("Зөвхөн CSV файл хуулах боломжтой");
      }
    }
  };

  const processCsv = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");

      if (lines.length < 2) {
        throw new Error("CSV файл хоосон эсвэл зөвхөн толгой хэсэгтэй байна.");
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const assetTagIdx = headers.findIndex(
        (h) => h === "assettag" || h === "asset tag" || h === "tag",
      );
      const serialIdx = headers.findIndex(
        (h) => h === "serialnumber" || h === "serial number" || h === "serial",
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

        parsedAssets.push({ assetTag, serialNumber });
      }

      if (parsedAssets.length === 0) {
        throw new Error("CSV файлаас унших өгөгдөл олдсонгүй.");
      }

      const successfulAssets: Asset[] = [];

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
          const created = raw as AssetFieldsFragment | null | undefined;
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
              status: created.status as Asset["status"],
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

      toast.success(`Амжилттай ${successfulAssets.length} хөрөнгө нэмлээ.`);
      if (successfulAssets.length > 0) {
        onAddAssets(successfulAssets);
      }
      handleOpenChange(false);
    } catch (error) {
      console.error("CSV process error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Алдаа гарлаа. Дахин оролдоно уу.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white sm:max-w-[500px] rounded-3xl p-8 shadow-xl mb-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-[24px] font-semibold">
            CSV файлаар хөрөнгө хуулах
          </DialogTitle>
          <DialogDescription className="text-[16px]">
            Хөрөнгийн мэдээлэл бүхий .csv файлыг сонгож олноор нь системд
            бүртгэнэ үү. (Баганууд: assetTag, serialNumber)
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-colors ${
              file
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {file ? (
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                <p className="font-medium text-green-700">{file.name}</p>
                <p className="text-sm text-green-600 mt-1">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                {!isUploading && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2 text-red-500 hover:text-red-700 h-auto p-0"
                    onClick={() => setFile(null)}
                  >
                    Файл солих
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="font-medium text-gray-700">
                  Файл энд чирж оруулах эсвэл сонгох
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Зөвхөн .csv өргөтгөлтэй файл
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Файл сонгох
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Хуулж байна...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isUploading}
            >
              Цуцлах
            </Button>
            <Button
              onClick={processCsv}
              disabled={!file || isUploading}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Хуулж байна...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Хуулах
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
