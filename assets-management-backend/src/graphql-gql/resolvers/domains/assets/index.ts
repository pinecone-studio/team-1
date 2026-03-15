/**
 * Asset domain resolvers: Query (assets, asset), Mutation (createAsset, updateAsset, deleteAsset), Asset type.
 * Merged into the root schema via mergeResolvers in resolvers/index.ts.
 */
import { resolveAssets } from "./queries/getAssets";
import { resolveAsset } from "./queries/getAsset";
import { resolveCreateAsset } from "./mutations/createAsset";
import { resolveUpdateAsset } from "./mutations/updateAsset";
import { resolveDeleteAsset } from "./mutations/deleteAsset";

const safeNumber = (val: unknown): number | null => {
  if (val === null || val === undefined || val === "") return null;
  const num = Number(val);
  return Number.isNaN(num) ? null : num;
};

export const assetResolvers = {
  Query: {
    assets: resolveAssets,
    asset: resolveAsset,
  },
  Mutation: {
    createAsset: resolveCreateAsset,
    updateAsset: resolveUpdateAsset,
    deleteAsset: resolveDeleteAsset,
  },
  Asset: {
    category: (asset: {
      subCategoryId?: string | null;
      categoryId?: string | null;
    }) => asset.subCategoryId ?? asset.categoryId ?? "",
    purchaseCost: (asset: { purchaseCost?: unknown }) =>
      safeNumber(asset.purchaseCost),
    currentBookValue: (asset: { currentBookValue?: unknown }) =>
      safeNumber(asset.currentBookValue),
    purchaseDate: (asset: { purchaseDate?: unknown }) =>
      safeNumber(asset.purchaseDate),
  },
};
