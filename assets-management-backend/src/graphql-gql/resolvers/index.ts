import { Mutation } from "./mutations";
import { Query } from "./queries";

export const resolvers = {
  Query,
  Mutation,
  Asset: {
    category: (asset: { subCategoryId?: string | null; categoryId?: string | null }) =>
      asset.subCategoryId ?? asset.categoryId ?? "",
  },
};
