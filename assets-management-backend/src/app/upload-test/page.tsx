"use client";

import { useState } from "react";

type FileWithStatus = {
  file: File;
  status: string;
  url?: string;
};

type Asset = {
  id: string;
  assetTag: string;
  category: string;
  serialNumber: string;
  status: string;
  imageUrl: string | null;
  createdAt: number;
};

export default function UploadTestPage() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [assetTag, setAssetTag] = useState("");
  const [category, setCategory] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [assetsError, setAssetsError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      status: "Waiting...",
      url: undefined,
    }));
    setFiles(selectedFiles);
  };

  const uploadFiles = async () => {
    const bucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;
    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

    if (!bucketName || !publicUrl) {
      alert("Missing R2 environment variables!");
      return;
    }

    const updatedFiles = [...files];

    await Promise.all(
      updatedFiles.map(async (fileObj, index) => {
        try {
          updatedFiles[index].status = "Requesting presigned URL...";
          setFiles([...updatedFiles]);

          const safeName = fileObj.file.name.replace(/\s+/g, "-");
          const key = `test/${crypto.randomUUID()}-${safeName}`;

          // Request presigned URL from backend
          const presignRes = await fetch("/api/r2/presign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key,
              contentType: fileObj.file.type,
              bucketName,
            }),
          });

          if (!presignRes.ok) throw new Error("Failed to get presigned URL");
          const { url } = (await presignRes.json()) as { url: string };

          updatedFiles[index].status = "Uploading...";
          setFiles([...updatedFiles]);

          // Upload file directly to R2
          await fetch(url, {
            method: "PUT",
            body: fileObj.file,
            headers: { "Content-Type": fileObj.file.type },
          });

          updatedFiles[index].status = "Uploaded ✅";
          updatedFiles[index].url = `${publicUrl}/${key}`;
          setFiles([...updatedFiles]);

          const tag =
            files.length > 1 && assetTag
              ? `${assetTag}-${index + 1}`
              : assetTag || `ASSET-${crypto.randomUUID().slice(0, 8)}`;
          const serial =
            files.length > 1 && serialNumber
              ? `${serialNumber}-${index + 1}`
              : serialNumber || `SN-${crypto.randomUUID().slice(0, 8)}`;

          updatedFiles[index].status = "Creating asset...";
          setFiles([...updatedFiles]);

          const createRes = await fetch("/api/assets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              assetTag: tag,
              category: category || "Unknown",
              serialNumber: serial,
              imageUrl: `${publicUrl}/${key}`,
            }),
          });

          if (!createRes.ok) {
            throw new Error("Asset create failed");
          }

          updatedFiles[index].status = "Asset created ✅";
          setFiles([...updatedFiles]);
        } catch (err: any) {
          updatedFiles[index].status = err?.message || "Upload failed ❌";
          setFiles([...updatedFiles]);
        }
      }),
    );
  };

  const loadAssets = async () => {
    setAssetsLoading(true);
    setAssetsError(null);
    try {
      const res = await fetch("/api/assets");
      const data = (await res.json()) as { data?: Asset[]; message?: string };
      if (!res.ok) {
        throw new Error(data.message || "Failed to load assets");
      }
      setAssets(data.data ?? []);
    } catch (err) {
      setAssetsError(err instanceof Error ? err.message : "Failed to load assets");
    } finally {
      setAssetsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-xl px-6 py-12">
        <h1 className="text-2xl font-semibold">R2 Upload Test</h1>
        <p className="mt-2 text-sm text-slate-300">
          Drag & drop or select files (pdf/doc/etc.) to upload to R2.
        </p>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={assetTag}
              onChange={(e) => setAssetTag(e.target.value)}
              placeholder="Asset Tag (optional)"
              className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category (optional)"
              className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
            />
          </div>
          <input
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Serial Number (optional)"
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
          />
          <input
            type="file"
            accept="*/*"
            multiple
            onChange={handleFileChange}
            className="rounded-lg border border-dashed border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/20 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-cyan-100"
          />

          <button
            type="button"
            onClick={uploadFiles}
            disabled={files.length === 0}
            className="rounded-full border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-100 transition hover:bg-cyan-500/30 disabled:opacity-50"
          >
            Upload All
          </button>

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((fileObj, idx) => (
                <li key={idx} className="text-xs text-slate-300">
                  {fileObj.file.name} — {fileObj.status}{" "}
                  {fileObj.url && (
                    <a
                      href={fileObj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 underline ml-1"
                    >
                      View
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Local Assets</h2>
            <button
              type="button"
              onClick={loadAssets}
              className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 transition hover:border-cyan-500/60 hover:text-cyan-200"
            >
              Refresh
            </button>
          </div>

          {assetsLoading && (
            <p className="mt-4 text-xs text-slate-400">Loading...</p>
          )}
          {assetsError && (
            <p className="mt-4 text-xs text-rose-300">{assetsError}</p>
          )}

          {assets.length > 0 && (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {assets.map((asset) => (
                <li
                  key={asset.id}
                  className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3"
                >
                  {asset.imageUrl ? (
                    <img
                      src={asset.imageUrl}
                      alt={asset.assetTag}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg border border-slate-700 bg-slate-800/40" />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-100">
                      {asset.assetTag}
                    </span>
                    <span className="text-xs text-slate-300">
                      {asset.category} • {asset.serialNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
