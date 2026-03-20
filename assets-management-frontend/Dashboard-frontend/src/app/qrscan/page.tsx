"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { Camera, CircleAlert, ScanLine } from "lucide-react";
import { useRouter } from "next/navigation";

import { AssetFormDialog } from "@/components/assets/asset-form-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpenCensusProgressDocument } from "@/gql/graphql";
import { getAppBaseUrl } from "@/lib/asset-qr";
import type { Asset } from "@/lib/types";

type ScanStatus = "idle" | "starting" | "scanning" | "unsupported" | "error";
type CoverageMode = "ALL_ORG" | "BY_DEPARTMENT" | "BY_CATEGORY" | null;

declare global {
  interface Window {
    BarcodeDetector?: {
      new (options?: { formats?: string[] }): {
        detect: (
          source: CanvasImageSource,
        ) => Promise<Array<{ rawValue?: string }>>;
      };
      getSupportedFormats?: () => Promise<string[]>;
    };
  }
}

const INTERNAL_QR_BASE_URL = getAppBaseUrl();

function readCoverageMode(scopeFilter?: string | null, scope?: string | null) {
  const fallback: CoverageMode = scope === "ORG" ? "ALL_ORG" : null;
  if (!scopeFilter) return fallback;

  try {
    const parsed = JSON.parse(scopeFilter) as { coverageMode?: CoverageMode };
    return parsed.coverageMode ?? fallback;
  } catch {
    return fallback;
  }
}

function parseInternalAssetId(scannedValue: string) {
  const trimmedValue = scannedValue.trim();

  try {
    const parsedUrl = new URL(trimmedValue);
    if (parsedUrl.origin !== INTERNAL_QR_BASE_URL) return null;
    const match = parsedUrl.pathname.match(/^\/qr\/([^/?#]+)/);
    return match?.[1] ?? null;
  } catch {
    const match = trimmedValue.match(/^\/qr\/([^/?#]+)/);
    return match?.[1] ?? null;
  }
}

export default function QRScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const detectorRef = useRef<InstanceType<
    NonNullable<typeof window.BarcodeDetector>
  > | null>(null);
  const lastProcessedRef = useRef<string>("");

  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [scanError, setScanError] = useState<string | null>(null);
  const [showUnregisteredDialog, setShowUnregisteredDialog] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [scannedValue, setScannedValue] = useState("");

  const { data: openCensusData, loading: openCensusLoading } = useQuery(
    OpenCensusProgressDocument,
    {
      fetchPolicy: "network-only",
      pollInterval: 8000,
    },
  );

  const openCensus = openCensusData?.openCensusProgress ?? null;
  const coverageMode = readCoverageMode(
    openCensus?.event.scopeFilter,
    openCensus?.event.scope,
  );
  const canScanForCensus =
    Boolean(openCensus?.event.id) && coverageMode === "ALL_ORG";
  const censusGateMessage = openCensusLoading
    ? "Тооллогын төлөв шалгаж байна..."
    : !openCensus?.event.id
      ? "Тооллого эхлээгүй байна."
      : coverageMode !== "ALL_ORG"
        ? 'QR scan зөвхөн "Байгууллага бүхлээр" тооллогод ажиллана.'
        : null;

  const canUseBarcodeDetector = useMemo(
    () => typeof window !== "undefined" && "BarcodeDetector" in window,
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const stopScanner = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };

    if (!canScanForCensus) {
      setScanStatus("idle");
      setScanError(null);
      stopScanner();
      return () => stopScanner();
    }

    const handleScannedValue = (value: string) => {
      if (!value || value === lastProcessedRef.current) return;
      lastProcessedRef.current = value;
      stopScanner();

      const assetId = parseInternalAssetId(value);
      if (assetId) {
        router.replace(`/qr/${assetId}?source=qrscan`);
        return;
      }

      setScannedValue(value);
      setShowUnregisteredDialog(true);
      setScanStatus("idle");
    };

    const scanFrame = async () => {
      if (
        cancelled ||
        !videoRef.current ||
        !detectorRef.current ||
        videoRef.current.readyState < 2
      ) {
        animationFrameRef.current = requestAnimationFrame(scanFrame);
        return;
      }

      try {
        const barcodes = await detectorRef.current.detect(videoRef.current);
        const rawValue = barcodes.find((barcode) => barcode.rawValue)?.rawValue;
        if (rawValue) {
          handleScannedValue(rawValue);
          return;
        }
      } catch (error) {
        console.error("QR detect failed:", error);
      }

      animationFrameRef.current = requestAnimationFrame(scanFrame);
    };

    const startScanner = async () => {
      if (!canUseBarcodeDetector) {
        setScanStatus("unsupported");
        setScanError(
          "Энэ browser QR scan-ийг дэмжихгүй байна. Chrome/Edge mobile дээр шалгана уу.",
        );
        return;
      }

      try {
        setScanStatus("starting");
        setScanError(null);

        const BarcodeDetectorClass = window.BarcodeDetector;
        if (!BarcodeDetectorClass) {
          setScanStatus("unsupported");
          setScanError(
            "Энэ browser QR scan-ийг дэмжихгүй байна. Chrome/Edge mobile дээр шалгана уу.",
          );
          return;
        }

        detectorRef.current = new BarcodeDetectorClass({
          formats: ["qr_code"],
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setScanStatus("scanning");
        animationFrameRef.current = requestAnimationFrame(scanFrame);
      } catch (error) {
        console.error(error);
        setScanStatus("error");
        setScanError(
          "Камер нээхэд алдаа гарлаа. Browser permission-ээ шалгаад дахин оролдоно уу.",
        );
      }
    };

    void startScanner();

    return () => {
      cancelled = true;
      stopScanner();
    };
  }, [canScanForCensus, canUseBarcodeDetector, router]);

  const handleRegisterConfirm = () => {
    setShowUnregisteredDialog(false);
    setShowRegistrationModal(true);
  };

  const handleAssetsAdded = (assets: Asset[]) => {
    setShowRegistrationModal(false);
    const createdAsset = assets[0];
    if (createdAsset?.id) {
      router.push(`/qr/${createdAsset.id}`);
    }
  };

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 p-4 sm:p-6">
        <div className="space-y-2 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
            QR Scan
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Хөрөнгийн QR уншуулах
          </h1>
          <p className="text-sm text-muted-foreground">
            Дотоод QR бол asset detail рүү орно. Бүртгэлгүй код бол шууд бүртгэх
            боломж нээгдэнэ.
          </p>
        </div>

        <Card className="overflow-hidden rounded-3xl border border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <ScanLine className="h-5 w-5" />
              Live Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-black">
              <video
                ref={videoRef}
                className="aspect-[3/4] w-full object-cover sm:aspect-[16/10]"
                muted
                playsInline
                autoPlay
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                <div className="relative h-56 w-full max-w-[260px] rounded-[28px] border-2 border-white/85 shadow-[0_0_0_9999px_rgba(0,0,0,0.25)] sm:h-64 sm:max-w-[300px]">
                  <div className="absolute left-4 top-4 h-7 w-7 rounded-tl-2xl border-l-4 border-t-4 border-emerald-400" />
                  <div className="absolute right-4 top-4 h-7 w-7 rounded-tr-2xl border-r-4 border-t-4 border-emerald-400" />
                  <div className="absolute bottom-4 left-4 h-7 w-7 rounded-bl-2xl border-b-4 border-l-4 border-emerald-400" />
                  <div className="absolute bottom-4 right-4 h-7 w-7 rounded-br-2xl border-b-4 border-r-4 border-emerald-400" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-background p-2">
                  {scanStatus === "error" || scanStatus === "unsupported" ? (
                    <CircleAlert className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Camera className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-foreground">
                    {!canScanForCensus
                      ? censusGateMessage || "Тооллого эхлээгүй байна"
                      : scanStatus === "starting"
                        ? "Камер асаж байна..."
                        : scanStatus === "scanning"
                          ? "QR кодыг камер луу чиглүүлнэ үү"
                          : scanStatus === "idle"
                            ? "Scan дууссан эсвэл түр зогссон байна"
                            : null}
                    {scanStatus === "unsupported" &&
                      "QR scan дэмжигдэхгүй байна"}
                    {scanStatus === "error" && "Камерын алдаа гарлаа"}
                  </p>
                  <p className="text-muted-foreground">
                    {scanError ||
                      (openCensus?.event.name
                        ? `Идэвхтэй тооллого: ${openCensus.event.name}`
                        : `Дотоод QR формат: ${INTERNAL_QR_BASE_URL}/qr/[id]`)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={showUnregisteredDialog}
        onOpenChange={setShowUnregisteredDialog}
      >
        <DialogContent className="w-full max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle>Бүртгэлгүй хөрөнгө илэрлээ</DialogTitle>
            <DialogDescription>
              Энэ asset манай системд бүртгэлгүй байна. Одоо бүртгэх үү?
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-sm">
            <p className="text-xs text-muted-foreground">Уншигдсан утга</p>
            <p className="mt-1 break-all font-medium text-foreground">
              {scannedValue}
            </p>
          </div>
          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              onClick={() => setShowUnregisteredDialog(false)}
            >
              Үгүй
            </Button>
            <Button onClick={handleRegisterConfirm}>Тийм</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AssetFormDialog
        open={showRegistrationModal}
        onOpenChange={setShowRegistrationModal}
        onAddAssets={handleAssetsAdded}
        initialSerialNumber={scannedValue}
      />
    </>
  );
}
