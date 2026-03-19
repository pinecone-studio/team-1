"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ArrowLeft,
  Box,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  MoreHorizontal,
  Plus,
  QrCode,
  Search,
  Square,
} from "lucide-react";
import { GetAssetsDocument } from "@/gql/graphql";

type TestScreen = "home" | "inventory" | "scanner" | "results" | "detail";
type ScanStatus = "idle" | "starting" | "scanning" | "unsupported" | "error";

declare global {
  interface Window {
    BarcodeDetector?: {
      new (options?: { formats?: string[] }): {
        detect: (
          source: CanvasImageSource,
        ) => Promise<Array<{ rawValue?: string }>>;
      };
    };
  }
}

function parseScannedAssetId(scannedValue: string) {
  const trimmedValue = scannedValue.trim();

  try {
    const parsedUrl = new URL(trimmedValue);
    const match = parsedUrl.pathname.match(/^\/(?:qr|assets)\/([^/?#]+)/);
    return match?.[1] ?? null;
  } catch {
    const match = trimmedValue.match(/^\/(?:qr|assets)\/([^/?#]+)/);
    return match?.[1] ?? null;
  }
}

export default function AssetHubMobile() {
  const [screen, setScreen] = useState<TestScreen>("home");
  const [scannedAssetIds, setScannedAssetIds] = useState<string[]>([]);
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [scanError, setScanError] = useState<string | null>(null);
  const [lastScannedValue, setLastScannedValue] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const detectorRef = useRef<InstanceType<
    NonNullable<typeof window.BarcodeDetector>
  > | null>(null);
  const lastProcessedRef = useRef<string>("");

  const { data, loading } = useQuery(GetAssetsDocument, {
    variables: {
      office: undefined,
      categoryIds: undefined,
      subCategoryIds: undefined,
      locationIds: undefined,
    },
  });

  const assets = useMemo(() => data?.assets ?? [], [data?.assets]);

  const scannedAssets = useMemo(() => {
    const byId = new Map(assets.map((asset) => [asset.id, asset]));
    return scannedAssetIds
      .map((id) => byId.get(id))
      .filter((asset): asset is NonNullable<typeof asset> => Boolean(asset));
  }, [assets, scannedAssetIds]);

  const unassignedAssets = useMemo(
    () => assets.filter((asset) => !asset.assignedTo),
    [assets],
  );

  const activeAsset =
    scannedAssets.find((asset) => asset.id === activeAssetId) ?? scannedAssets[0];

  useEffect(() => {
    if (screen !== "scanner") {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setScanStatus("idle");
      return;
    }

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

    const handleScannedValue = (value: string) => {
      if (!value || value === lastProcessedRef.current) return;
      lastProcessedRef.current = value;
      setLastScannedValue(value);

      const assetId = parseScannedAssetId(value);
      if (!assetId) {
        setScanError("Уншсан QR нь asset хаяг биш байна.");
        return;
      }

      const matchedAsset = assets.find((asset) => asset.id === assetId);
      if (!matchedAsset) {
        setScanError("Энэ QR-д харгалзах хөрөнгө олдсонгүй.");
        return;
      }

      setScanError(null);
      setScannedAssetIds((prev) =>
        prev.includes(assetId) ? prev : [assetId, ...prev],
      );
      setActiveAssetId(assetId);
      stopScanner();
      setScanStatus("idle");
      setScreen("results");
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
      } catch {
        setScanError("QR унших явцад алдаа гарлаа.");
      }

      animationFrameRef.current = requestAnimationFrame(scanFrame);
    };

    const startScanner = async () => {
      if (
        typeof window === "undefined" ||
        typeof navigator === "undefined" ||
        !("BarcodeDetector" in window)
      ) {
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
          setScanError("Barcode detector олдсонгүй.");
          return;
        }

        detectorRef.current = new BarcodeDetectorClass({
          formats: ["qr_code"],
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
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
      } catch {
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
  }, [assets, screen]);

  const totalAssets = unassignedAssets.length;
  const inventoryLocation =
    activeAsset?.locationPath ?? scannedAssets[0]?.locationPath ?? "Байршилгүй";

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f8f9fb] font-sans text-slate-900">
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-5">
        {screen === "detail" || screen === "results" || screen === "scanner" ? (
          <button
            onClick={() => {
              if (screen === "detail") setScreen("results");
              else if (screen === "results") setScreen("scanner");
              else setScreen("inventory");
            }}
            className="rounded-full p-1 transition-colors active:bg-slate-100"
          >
            <ArrowLeft className="h-6 w-6 text-slate-800" />
          </button>
        ) : (
          <Box className="h-6 w-6 text-slate-700" />
        )}
        <h1 className="truncate text-[17px] font-bold text-slate-800">
          {screen === "scanner"
            ? "QR уншуулна уу"
            : screen === "detail"
              ? "Хөрөнгийн дэлгэрэнгүй"
              : "AssetHub"}
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6">
        {screen === "home" && (
          <div className="animate-in space-y-4 fade-in duration-300">
            <button
              onClick={() => setScreen("inventory")}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-transform active:scale-[0.98]"
            >
              <div>
                <p className="mb-1 text-[13px] font-medium text-slate-500">
                  Нийт хөрөнгө
                </p>
                <p className="text-[19px] font-bold text-slate-900">
                  {loading ? "Ачааллаж байна..." : `${totalAssets} ширхэг`}
                </p>
              </div>
              <QrCode className="h-6 w-6 text-slate-400" />
            </button>
          </div>
        )}

        {screen === "inventory" && (
          <div className="animate-in space-y-6 fade-in duration-300">
            <h2 className="text-[22px] font-bold">Хөрөнгийн тооллого</h2>
            <button
              onClick={() => setScreen("scanner")}
              className="h-14 w-full rounded-2xl bg-[#0b5f8a] text-[16px] font-bold text-white shadow-md active:bg-[#084a6b]"
            >
              QR уншуулах
            </button>
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="text-[16px] font-bold">Live inventory</p>
              <p className="mt-2 text-[14px] font-medium text-slate-500">
                Байршил: {inventoryLocation}
              </p>
              <p className="text-[13px] text-slate-400">
                Нийт хөрөнгө: {loading ? "..." : totalAssets}
              </p>
            </div>
          </div>
        )}

        {screen === "scanner" && (
          <div className="flex h-full flex-col animate-in fade-in duration-300">
            <div className="relative aspect-square w-full overflow-hidden rounded-[40px] border border-sky-100 bg-black shadow-inner">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                muted
                playsInline
                autoPlay
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-[68%] w-[68%] rounded-[36px] border border-white/20 shadow-[0_0_0_9999px_rgba(10,25,41,0.22)]">
                  <div className="absolute left-6 top-6 h-14 w-14 rounded-tl-3xl border-l-8 border-t-8 border-[#1da6dc]" />
                  <div className="absolute right-6 top-6 h-14 w-14 rounded-tr-3xl border-r-8 border-t-8 border-[#1da6dc]" />
                  <div className="absolute bottom-6 left-6 h-14 w-14 rounded-bl-3xl border-b-8 border-l-8 border-[#47c4bc]" />
                  <div className="absolute bottom-6 right-6 h-14 w-14 rounded-br-3xl border-b-8 border-r-8 border-[#47c4bc]" />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-slate-50 p-2">
                  {scanStatus === "error" || scanStatus === "unsupported" ? (
                    <CircleAlert className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Camera className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {scanStatus === "starting" && "Камер асаж байна..."}
                    {scanStatus === "scanning" && "QR кодыг камер луу чиглүүлнэ үү"}
                    {scanStatus === "idle" && "Scan зогссон байна"}
                    {scanStatus === "unsupported" && "QR scan дэмжигдэхгүй байна"}
                    {scanStatus === "error" && "Камерын алдаа гарлаа"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {scanError || lastScannedValue || "QR уншуулсны дараа asset нээгдэнэ"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setScreen("results")}
                disabled={scannedAssets.length === 0}
                className="h-14 w-full rounded-2xl bg-[#0c4f7e] text-[15px] font-bold text-white transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Хөрөнгийн мэдээлэл харах
              </button>
              <button
                onClick={() => setScreen("inventory")}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white text-[15px] font-bold text-slate-600"
              >
                Цуцлах
              </button>
            </div>
          </div>
        )}

        {screen === "results" && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[18px] font-bold">Скан хийсэн хөрөнгүүд</h3>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-[12px] font-bold">
                {scannedAssets.length}
              </span>
            </div>

            <div className="space-y-3">
              {scannedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between rounded-[20px] border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                      <Search className="h-5 w-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-900">
                        {asset.assetTag}
                      </p>
                      <p className="text-[13px] font-medium text-slate-400">
                        {asset.category}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveAssetId(asset.id);
                      setScreen("detail");
                    }}
                    className="text-[14px] font-bold text-slate-800 underline decoration-2 underline-offset-4"
                  >
                    Дэлгэрэнгүй
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen("scanner")}
              className="mt-6 w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 text-[14px] font-bold text-slate-400 active:bg-slate-50"
            >
              + Дахин QR уншуулах
            </button>
          </div>
        )}

        {screen === "detail" && activeAsset && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex gap-4 border-b border-slate-50 pb-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-1">
                  <Search className="h-6 w-6 text-slate-300" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Хөрөнгийн нэр
                  </p>
                  <p className="text-[17px] font-extrabold text-slate-900">
                    {activeAsset.assetTag}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200" />
                    <p className="text-[12px] font-semibold text-slate-600">
                      {activeAsset.assignedTo ? "Эзэмшигчтэй" : "Эзэмшигчгүй"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-slate-500">
                    Төлөв
                  </span>
                  <span className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] font-bold uppercase text-sky-600">
                    {activeAsset.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] font-medium text-slate-500">
                    Серийн дугаар
                  </span>
                  <span className="text-[14px] font-bold">
                    {activeAsset.serialNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] font-medium text-slate-500">
                    Ангилал
                  </span>
                  <span className="text-[14px] font-bold">
                    {activeAsset.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] font-medium text-slate-500">
                    Үнэ
                  </span>
                  <span className="text-[14px] font-bold">
                    {(activeAsset.currentBookValue ?? 0).toLocaleString("mn-MN")}₮
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 border-t border-slate-50 pt-2">
                  <span className="text-[14px] font-medium text-slate-500">
                    Байршил
                  </span>
                  <span className="text-[14px] font-bold leading-relaxed text-slate-800">
                    {activeAsset.locationPath ?? activeAsset.locationId ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="flex shrink-0 items-center justify-between border-t border-slate-100 bg-white/95 px-8 pb-8 pt-3 text-slate-400 backdrop-blur-md">
        <ChevronLeft className="h-6 w-6" />
        <ChevronRight className="h-6 w-6" />
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors active:bg-slate-200">
          <Plus className="h-6 w-6" />
        </div>
        <Square className="h-5 w-5" />
        <MoreHorizontal className="h-6 w-6" />
      </footer>
    </div>
  );
}
