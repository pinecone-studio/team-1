import { getAssets, getAssetById } from "@/db/assets/queries";
import { searchAssetsDB } from "@/db/assets/queries/searchAssets";
import { getAssetHistory } from "@/db/assetHistory";

export const assetQueries = {
  assets: (
    _: unknown,
    args: {
      office?: string;
      categoryIds?: string[];
      subCategoryIds?: string[];
    },
  ) => {
    const rawOffice = args.office?.trim();
    const defaultOffice = "Гурван гол";
    const normalizedOffice = rawOffice
      ? rawOffice
          .replace(/^(Gurwan Gol|Gurvan Gol)/i, "Гурван гол")
          .replace(/\s+\d+$/, "")
          .trim()
      : defaultOffice;
    return getAssets(normalizedOffice, args.categoryIds, args.subCategoryIds);
  },
  asset: (_: unknown, args: { id: string }) => getAssetById(args.id),
  searchAssets: (
    _: unknown,
    args: { filter: any; pagination?: any; sort?: any },
  ) => searchAssetsDB(args.filter, args.pagination, args.sort),
  assetHistory: (_: unknown, args: { assetId: string }) =>
    getAssetHistory(args.assetId),
};
