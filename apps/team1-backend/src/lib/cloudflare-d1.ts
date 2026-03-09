interface D1PreparedStatement {
  first<T = unknown>(): Promise<T | null>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

type CloudflareLikeEnv = {
  DB?: D1Database;
};

/**
 * Reads D1 binding from common runtime locations used by Cloudflare environments.
 */
export function getD1Binding(): D1Database | null {
  const globalEnv = (globalThis as { env?: CloudflareLikeEnv }).env;
  if (globalEnv?.DB) {
    return globalEnv.DB;
  }

  const globalBinding = (globalThis as { DB?: D1Database }).DB;
  if (globalBinding) {
    return globalBinding;
  }

  return null;
}
