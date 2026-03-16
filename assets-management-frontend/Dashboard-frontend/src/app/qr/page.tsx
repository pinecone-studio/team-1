"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  Check,
  Clock,
  File,
  Image as ImageIcon,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

// Mock asset database with serial numbers
const MOCK_ASSETS: Record<string, any> = {
  "ASSET-001": {
    id: "ASSET-001",
    name: "MacBook Pro 14",
    serial: "C02XG0FDJGH5",
    status: "Идэвхтэй",
    location: "Сиэтл оффис",
    category: "Компьютер",
    registered: true,
    owner: "John Smith",
    purchaseDate: "2024-01-15",
  },
  "ASSET-002": {
    id: "ASSET-002",
    name: "Dell Monitor 27",
    serial: "SN1234567890",
    status: "Эргүүлэлтэд",
    location: "Гурван гол",
    category: "Мониторын дэлгэц",
    registered: true,
    owner: "Jane Doe",
    purchaseDate: "2024-03-20",
  },
  "ASSET-003": {
    id: "ASSET-003",
    name: "iPhone 15 Pro",
    serial: "DNHJ8G0FDJ",
    status: "Идэвхтэй",
    location: "Үл мэдэгдэх",
    category: "Гар утас",
    registered: false,
    owner: null,
    purchaseDate: "2025-01-10",
  },
};

// Serial number to asset ID mapping
const SERIAL_TO_ASSET_ID: Record<string, string> = {
  C02XG0FDJGH5: "ASSET-001",
  SN1234567890: "ASSET-002",
  DNHJ8G0FDJ: "ASSET-003",
};

export default function QRScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [scannedAsset, setScannedAsset] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    type: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [serialInput, setSerialInput] = useState("");
  const [scanHistory, setScanHistory] = useState<
    Array<{ id: string; asset: any; timestamp: string }>
  >([]);
  const [detectedCodes, setDetectedCodes] = useState<string[]>([]);
  const [selectedCodeIndex, setSelectedCodeIndex] = useState(0);

  // Start camera
  const startCamera = async () => {
    try {
      setError(null);
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError("Камераг нээж чадсангүй. Зөвшөөрөл өгнө үү.");
      setCameraActive(false);
    } finally {
      setLoading(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    setCameraActive(false);
    setScannedAsset(null);
  };

  // Capture frame and scan QR
  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        // Simulate QR detection - in production use qrcode-reader library
        const qrCode = simulateQRDetection();
        if (qrCode) {
          handleScannedCode(qrCode);
        }
      }
    }
  };

  // Simulate QR detection
  const simulateQRDetection = () => {
    const codes = Object.keys(MOCK_ASSETS);
    return codes[Math.floor(Math.random() * codes.length)];
  };

  // Handle scanned code
  const handleScannedCode = (code: string) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const asset = MOCK_ASSETS[code];
      if (asset) {
        setScannedAsset(asset);
        // Add to history
        setScanHistory((prev) => [
          {
            id: `${code}-${Date.now()}`,
            asset,
            timestamp: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
        setCameraActive(false);
        if (videoRef.current?.srcObject) {
          const tracks = (
            videoRef.current.srcObject as MediaStream
          ).getTracks();
          tracks.forEach((track) => track.stop());
        }
      } else {
        setError("ХИП товч боловсруулж чадсангүй");
      }
      setLoading(false);
    }, 500);
  };

  // Handle manual input
  const handleManualScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      handleScannedCode(manualInput.trim().toUpperCase());
      setManualInput("");
    }
  };

  // Handle serial number lookup
  const handleSerialLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (serialInput.trim()) {
      const serial = serialInput.trim().toUpperCase();
      const assetId = SERIAL_TO_ASSET_ID[serial];
      if (assetId) {
        handleScannedCode(assetId);
        setSerialInput("");
      } else {
        setError(`Сериал дугаар "${serial}" олдсонгүй`);
        setSerialInput("");
      }
    }
  };

  // Simulate detecting multiple QR codes
  const simulateMultipleQRDetection = (min: number, max: number) => {
    const allCodes = Object.keys(MOCK_ASSETS);
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const detected: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomCode = allCodes[Math.floor(Math.random() * allCodes.length)];
      if (!detected.includes(randomCode)) {
        detected.push(randomCode);
      }
    }
    return detected;
  };

  // Upload image for QR detection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Зургын хэмжээ 5MB-ээс их байна");
      return;
    }
    if (file) {
      setLoading(true);
      setUploadedFile({ name: file.name, type: "image" });
      setError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
              canvasRef.current.width = img.width;
              canvasRef.current.height = img.height;
              ctx.drawImage(img, 0, 0);
              // Simulate multiple QR detection from image
              setTimeout(() => {
                const codes = simulateMultipleQRDetection(1, 4);
                if (codes.length > 0) {
                  setDetectedCodes(codes);
                  setSelectedCodeIndex(0);
                  handleScannedCode(codes[0]);
                } else {
                  setError("QR код олдсонгүй");
                }
                setLoading(false);
              }, 800);
            }
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle PDF upload
  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("PDF файл сонгоно уу");
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setError("PDF файлын хэмжээ 10MB-ээс их байна");
      return;
    }
    if (file) {
      setLoading(true);
      setUploadedFile({ name: file.name, type: "pdf" });
      setError(null);
      // Simulate PDF parsing with multiple QR codes
      setTimeout(() => {
        const codes = simulateMultipleQRDetection(1, 3);
        if (codes.length > 0) {
          setDetectedCodes(codes);
          setSelectedCodeIndex(0);
          handleScannedCode(codes[0]);
        } else {
          setError("QR код олдсонгүй");
        }
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Хөрөнгө сканнер
          </h1>
          <p className="text-sm text-muted-foreground">
            QR кодыг сканнерээд хөрөнгөний мэдээлэл авах
          </p>
        </div>
        {/* Scanner Area */}
        {cameraActive && (
          <Card className="mb-4 overflow-hidden border-2 border-blue-300">
            <div className="relative bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 border-4 border-blue-400 opacity-30 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-blue-400 rounded-lg" />
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </Card>
        )}
        {/* Uploaded File Display */}
        {uploadedFile && !scannedAsset && (
          <Card className="mb-4 border-blue-200 bg-blue-50">
            <CardContent className="pt-4 flex items-center gap-3">
              {uploadedFile.type === "pdf" ? (
                <File className="h-6 w-6 text-red-500 shrink-0" />
              ) : (
                <ImageIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Ачаалсан файл</p>
                <p className="text-sm font-medium truncate">
                  {uploadedFile.name}
                </p>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </CardContent>
          </Card>
        )}
        {/* Control Buttons */}
        <div className="space-y-3 mb-6">
          {!cameraActive && !scannedAsset && (
            <>
              <Button
                onClick={startCamera}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Боловсруулж байна...
                  </>
                ) : (
                  "📷 Камара эхлүүлэх"
                )}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full text-sm"
                  disabled={loading}
                >
                  🖼️ Зураг
                </Button>
                <Button
                  onClick={() => pdfInputRef.current?.click()}
                  variant="outline"
                  className="w-full text-sm"
                  disabled={loading}
                >
                  📄 PDF
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
                className="hidden"
              />
            </>
          )}

          {cameraActive && (
            <>
              <Button
                onClick={captureFrame}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                📸 Гаргаж авах
              </Button>
              <Button
                onClick={stopCamera}
                variant="destructive"
                className="w-full"
              >
                Цагаа болих
              </Button>
            </>
          )}

          {scannedAsset && (
            <Button
              onClick={() => {
                setScannedAsset(null);
                setError(null);
              }}
              variant="outline"
              className="w-full"
            >
              ← Буцах
            </Button>
          )}
        </div>
        {/* Manual QR Input */}
        <form onSubmit={handleManualScan} className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            QR код
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Asset ID эсвэл QR..."
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline" size="sm">
              ✓
            </Button>
          </div>
        </form>
        {/* Serial Number Input */}
        <form onSubmit={handleSerialLookup} className="mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Сериал дугаар
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Сериал дугаар..."
              value={serialInput}
              onChange={(e) => setSerialInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="outline" size="sm">
              🔍
            </Button>
          </div>
        </form>
        {/* Multiple QR Codes Detected */}
        {detectedCodes.length > 1 && (
          <Card className="mb-4 border-blue-300 bg-blue-50">
            <CardContent className="pt-4">
              <p className="text-xs font-semibold text-blue-900 mb-3">
                🔍 {detectedCodes.length} QR код олдлоо
              </p>
              <div className="grid grid-cols-2 gap-2">
                {detectedCodes.map((code, index) => (
                  <button
                    key={code}
                    onClick={() => {
                      setSelectedCodeIndex(index);
                      handleScannedCode(code);
                    }}
                    className={`p-3 rounded-lg text-xs font-medium transition ${
                      selectedCodeIndex === index
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    #{index + 1}
                    <div className="text-[10px] mt-1 opacity-75">{code}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {error && (
          <Card className="mb-4 border-red-200 bg-red-50">
            <CardContent className="pt-6 flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </CardContent>
          </Card>
        )}
        {/* Asset Details */}
        {scannedAsset && (
          <Card className="border-2 border-green-300 bg-green-50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{scannedAsset.name}</CardTitle>
                {scannedAsset.registered ? (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    <Check className="h-3 w-3" />
                    Үнэмлэгдсэн
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                    <AlertCircle className="h-3 w-3" />
                    Үнэмлэггүй
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Asset Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Хөрөнгөний ID</p>
                  <p className="font-medium text-sm">{scannedAsset.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Сериал</p>
                  <p className="font-medium text-sm text-blue-600 font-mono">
                    {scannedAsset.serial}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Төлөв</p>
                  <p className="font-medium text-sm">{scannedAsset.status}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Байршил</p>
                  <p className="font-medium text-sm">{scannedAsset.location}</p>
                </div>
              </div>

              {/* Owner Info (if registered) */}
              {scannedAsset.registered && scannedAsset.owner && (
                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground">Эзэмшигч</p>
                  <p className="font-medium text-sm">{scannedAsset.owner}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Худалдан авсан: {scannedAsset.purchaseDate}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {scannedAsset.registered ? (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    🔄 Хөрөнгө шилжүүлэх
                  </Button>
                ) : (
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    ✍️ Хөрөнгө үнэмлэх
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        {/* Loading State */}
        {loading && !scannedAsset && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-blue-800">Боловсруулж байна...</p>
            </CardContent>
          </Card>
        )}
        {/* Info Footer */}
        {!cameraActive && !scannedAsset && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-muted-foreground text-center">
              ✓ Камераг үйлчилгээ идэвхтэй болгосон уу?
              <br />✓ Хэрсээ үйлчилгээ эргүүлсэн бол сэргээнэ үү
            </p>
          </div>
        )}
        {/* Scan History */}
        {scanHistory.length > 0 && !cameraActive && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-foreground">
                  Сканнерийн түүх
                </h2>
              </div>
              <Button
                onClick={() => setScanHistory([])}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Арилгах
              </Button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {scanHistory.slice(0, 10).map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
                  onClick={() => setScannedAsset(item.asset)}
                >
                  <CardContent className="pt-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.asset.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.asset.id} • {item.timestamp}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.asset.registered ? (
                          <span className="text-green-600">✓ Үнэмлэгдсэн</span>
                        ) : (
                          <span className="text-yellow-600">⚠ Үнэмлэггүй</span>
                        )}
                      </p>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded ml-2 flex-shrink-0">
                      {item.asset.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {scanHistory.length > 10 && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                + {scanHistory.length - 10} элемент
              </p>
            )}
          </div>
        )}{" "}
      </div>
    </div>
  );
}
