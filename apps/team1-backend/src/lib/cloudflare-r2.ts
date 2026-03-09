interface R2ObjectBody {
  text(): Promise<string>;
  size: number;
  httpEtag: string;
  uploaded: Date;
}

interface R2PutOptions {
  httpMetadata?: {
    contentType?: string;
  };
}

interface R2Bucket {
  get(key: string): Promise<R2ObjectBody | null>;
  put(
    key: string,
    value: string | ArrayBuffer | ArrayBufferView,
    options?: R2PutOptions
  ): Promise<void>;
}

type CloudflareLikeEnv = {
  FILES?: R2Bucket;
};

/**
 * Reads R2 binding from common runtime locations used by Cloudflare environments.
 */
export function getR2Binding(): R2Bucket | null {
  const globalEnv = (globalThis as { env?: CloudflareLikeEnv }).env;
  if (globalEnv?.FILES) {
    return globalEnv.FILES;
  }

  const globalBinding = (globalThis as { FILES?: R2Bucket }).FILES;
  if (globalBinding) {
    return globalBinding;
  }

  return null;
}
