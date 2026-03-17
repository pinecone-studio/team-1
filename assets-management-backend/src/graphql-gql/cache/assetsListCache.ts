import type { GraphQLContext } from "@/graphql-gql/context";

export async function getAssetsCacheVersion(ctx: GraphQLContext) {
  const kv = (ctx.env as unknown as { MY_CACHE?: unknown }).MY_CACHE as
    | { get(key: string): Promise<string | null> }
    | undefined;
  if (!kv) return 1;
  const v = await kv.get("assets:cache_version");
  const n = v ? Number(v) : 1;
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export async function bumpAssetsCacheVersion(ctx: GraphQLContext) {
  const kv = (ctx.env as unknown as { MY_CACHE?: unknown }).MY_CACHE as
    | {
        get(key: string): Promise<string | null>;
        put(key: string, value: string): Promise<void>;
      }
    | undefined;
  if (!kv) return 1;
  const current = await getAssetsCacheVersion(ctx);
  const next = current + 1;
  await kv.put("assets:cache_version", String(next));
  return next;
}

export async function assetsListCacheKey(ctx: GraphQLContext, args: {
  limit: number;
  offset: number;
  office?: string;
  categoryIds?: string[];
  subCategoryIds?: string[];
  locationIds?: string[];
}) {
  const version = await getAssetsCacheVersion(ctx);
  const parts = [
    `v${version}`,
    "assets:list",
    `limit_${args.limit}`,
    `offset_${args.offset}`,
    args.office ? `office_${args.office}` : "office_",
    args.categoryIds?.length ? `cat_${args.categoryIds.join(",")}` : "cat_",
    args.subCategoryIds?.length ? `sub_${args.subCategoryIds.join(",")}` : "sub_",
    args.locationIds?.length ? `loc_${args.locationIds.join(",")}` : "loc_",
  ];
  return parts.join(":");
}

export function getAssetsListCache(ctx: GraphQLContext) {
  return (ctx.env as unknown as { MY_CACHE?: unknown }).MY_CACHE as
    | {
        get(key: string): Promise<string | null>;
        put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
      }
    | undefined;
}

