"use client";

import { useParams } from "next/navigation";
import { AssetDetailContent } from "@/components/assets/asset-detail-content";

export default function AssetDetailPage() {
  const params = useParams();
  const id = (params?.id as string) ?? "";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AssetDetailContent assetId={id} />
    </div>
  );
}
