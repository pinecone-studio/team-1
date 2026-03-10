import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

// Local fallback type to avoid TS errors if Cloudflare types are not available.
type D1Database = {
  prepare: (...args: any[]) => any;
  batch?: (...args: any[]) => Promise<any>;
  exec?: (query: string) => Promise<any>;
  dump?: () => Promise<ArrayBuffer>;
};

export type CloudflareEnv = {
  DB?: D1Database;
};

function resolveGlobalEnv(): CloudflareEnv | undefined {
  return (globalThis as { env?: CloudflareEnv }).env;
}

export function getD1Binding(env?: CloudflareEnv): D1Database | null {
  const runtimeEnv = env ?? resolveGlobalEnv();
  if (runtimeEnv?.DB) {
    return runtimeEnv.DB;
  }

  const globalBinding = (globalThis as { DB?: D1Database }).DB;
  if (globalBinding) {
    return globalBinding;
  }

  return null;
}

export function getDb(env?: CloudflareEnv) {
  const binding = getD1Binding(env);
  if (!binding) {
    throw new Error(
      'D1 Binding (DB) олдсонгүй! wrangler.toml эсвэл environment-ээ шалгана уу.',
    );
  }

  return drizzle(binding, { schema });
}
