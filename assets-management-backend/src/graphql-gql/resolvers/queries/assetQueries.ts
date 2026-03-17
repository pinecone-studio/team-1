import { getAssets, getAssetById, getAssetKpis } from "@/db/assets/queries";
import { searchAssetsDB } from "@/db/assets/queries/searchAssets";
import type {
  AssetSearchFilter,
  PaginationInput,
  SortInput,
} from "@/db/assets/queries/searchAssets";
import { getAssetHistory } from "@/db/assetHistory";
import {
  assetsListCacheKey,
  getAssetsListCache,
} from "@/graphql-gql/cache/assetsListCache";
import type { GraphQLContext } from "@/graphql-gql/context";

export const assetQueries = {
  assets: async (
    _: unknown,
    args: {
      office?: string;
      categoryIds?: string[];
      subCategoryIds?: string[];
      locationIds?: string[];
      limit?: number;
      offset?: number;
    },
    ctx: GraphQLContext,
  ) => {
    const rawOffice = args.office?.trim();
    const normalizedOffice = rawOffice
      ? rawOffice
          .replace(/^(Gurwan Gol|Gurvan Gol)/i, "Гурван гол")
          .replace(/\s+\d+$/, "")
          .trim()
      : undefined;

    const limit = Math.max(1, Math.min(50, args.limit ?? 50));
    const offset = Math.max(0, args.offset ?? 0);

    const cacheKey = await assetsListCacheKey(ctx, {
      limit,
      offset,
      office: normalizedOffice,
      categoryIds: args.categoryIds,
      subCategoryIds: args.subCategoryIds,
      locationIds: args.locationIds,
    });

    const kv = getAssetsListCache(ctx);
    if (kv) {
      const cached = await kv.get(cacheKey);
      if (cached) return JSON.parse(cached);
    }

    const rows = await getAssets(
      ctx,
      normalizedOffice,
      args.categoryIds,
      args.subCategoryIds,
      args.locationIds,
      limit,
      offset,
    );

    if (kv) {
      await kv.put(cacheKey, JSON.stringify(rows), { expirationTtl: 3600 });
    }
    return rows;
  },
  asset: (_: unknown, args: { id: string }) => getAssetById(args.id),
  assetKpis: (_: unknown, args: { office?: string }) => {
    const rawOffice = args.office?.trim();
    const normalizedOffice = rawOffice
      ? rawOffice
          .replace(/^(Gurwan Gol|Gurvan Gol)/i, "Гурван гол")
          .replace(/\s+\d+$/, "")
          .trim()
      : undefined;
    return getAssetKpis(normalizedOffice);
  },
  searchAssets: (
    _: unknown,
    args: { filter: AssetSearchFilter; pagination?: PaginationInput; sort?: SortInput },
  ) => searchAssetsDB(args.filter, args.pagination, args.sort),
  assetHistory: (_: unknown, args: { assetId: string }) =>
    getAssetHistory(args.assetId),
};
