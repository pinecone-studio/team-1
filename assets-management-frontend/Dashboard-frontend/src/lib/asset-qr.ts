const DEFAULT_DEPLOYED_APP_URL =
  "https://dashboard-frontend.tsetsegulziiocherdene.workers.dev";

function normalizeBaseUrl(value?: string | null) {
  if (!value) return DEFAULT_DEPLOYED_APP_URL;
  return value.replace(/\/+$/, "");
}

export function getAppBaseUrl() {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL);
}

export function getAssetDetailUrl(assetId: string) {
  return `${getAppBaseUrl()}/qr/${assetId}`;
}

export function getAssetQrImageUrl(assetId: string, size = 240) {
  const data = encodeURIComponent(getAssetDetailUrl(assetId));
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`;
}
