"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = {
  assetTag: string;
  category: string;
  serialNumber: string;
  status: string;
  imageUrl: string;
};

const initialState: FormState = {
  assetTag: "",
  category: "",
  serialNumber: "",
  status: "AVAILABLE",
  imageUrl: "",
};

async function getPresignedUrls(images: File[]) {
  const imageUrls: string[] = [];
  const bucketName = process.env.NEXT_PUBLIC_R2_BUCKET_NAME;
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

  if (!bucketName || !publicUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_R2_BUCKET_NAME or NEXT_PUBLIC_R2_PUBLIC_URL",
    );
  }

  for (const image of images) {
    const safeName = image.name.replace(/\s+/g, "-");
    const key = `assets/${crypto.randomUUID()}-${safeName}`;

    const presignRes = await fetch("/api/r2/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        contentType: image.type,
        bucketName,
      }),
    });

    if (!presignRes.ok) {
      throw new Error("Failed to get presigned URL");
    }

    const presignData = (await presignRes.json()) as {
      url: string;
      key: string;
    };

    await fetch(presignData.url, {
      method: "PUT",
      body: image,
      headers: { "Content-Type": image.type },
    });

    imageUrls.push(`${publicUrl}/${presignData.key}`);
  }

  return imageUrls;
}

export default function AssetCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = form.imageUrl || undefined;

      if (images.length > 0) {
        const urls = await getPresignedUrls(images);
        imageUrl = urls[0];
      }

      const response = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetTag: form.assetTag,
          category: form.category,
          serialNumber: form.serialNumber,
          status: form.status || undefined,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Create failed");
      }

      setForm(initialState);
      setImages([]);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-slate-400">
            Asset Tag
          </label>
          <input
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
            value={form.assetTag}
            onChange={onChange("assetTag")}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-slate-400">
            Category
          </label>
          <input
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
            value={form.category}
            onChange={onChange("category")}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-slate-400">
            Serial
          </label>
          <input
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
            value={form.serialNumber}
            onChange={onChange("serialNumber")}
            required
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-slate-400">
            Status
          </label>
          <select
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
            value={form.status}
            onChange={onChange("status")}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="IN_USE">IN_USE</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
            <option value="RETIRED">RETIRED</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wider text-slate-400">
            Image URL (optional)
          </label>
          <input
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100"
            value={form.imageUrl}
            onChange={onChange("imageUrl")}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-wider text-slate-400">
          Upload File (any)
        </label>
        <input
          type="file"
          accept="*/*"
          multiple
          className="rounded-lg border border-dashed border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/20 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-cyan-100"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            setImages(files);
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full border border-cyan-500/60 bg-cyan-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Create Asset"}
        </button>
        {error && <span className="text-xs text-rose-300">{error}</span>}
      </div>
    </form>
  );
}
