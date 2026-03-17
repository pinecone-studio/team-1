import type { GraphQLContext } from "@/graphql-gql/context";

type KV = {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
};

function getKv(ctx: GraphQLContext): KV | undefined {
  const env = ctx.env as unknown as { MY_CACHE?: unknown };
  return env.MY_CACHE as KV | undefined;
}

export async function getCacheVersion(
  ctx: GraphQLContext,
  versionKey: string,
) {
  const kv = getKv(ctx);
  if (!kv) return 1;
  const raw = await kv.get(versionKey);
  const n = raw ? Number(raw) : 1;
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export async function bumpCacheVersion(
  ctx: GraphQLContext,
  versionKey: string,
) {
  const kv = getKv(ctx);
  if (!kv) return 1;
  const cur = await getCacheVersion(ctx, versionKey);
  const next = cur + 1;
  await kv.put(versionKey, String(next));
  return next;
}

export async function cachedJson<T>(
  ctx: GraphQLContext,
  args: {
    versionKey: string;
    keyParts: string[];
    ttlSeconds: number;
    compute: () => Promise<T>;
  },
): Promise<T> {
  const kv = getKv(ctx);
  if (!kv) return args.compute();

  const v = await getCacheVersion(ctx, args.versionKey);
  const key = [`v${v}`, ...args.keyParts].join(":");

  const hit = await kv.get(key);
  if (hit) return JSON.parse(hit) as T;

  const val = await args.compute();
  await kv.put(key, JSON.stringify(val), { expirationTtl: args.ttlSeconds });
  return val;
}

