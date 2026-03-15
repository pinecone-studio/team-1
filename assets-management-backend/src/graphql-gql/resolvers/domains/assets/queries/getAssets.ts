/**
 * Modular resolver: assets query.
 * Delegates to application use-case only.
 */
import { getAssetsUseCase } from "@/application/assets";

export function resolveAssets(
  _: unknown,
  args: {
    office?: string;
    categoryIds?: string[];
    subCategoryIds?: string[];
  },
) {
  return getAssetsUseCase({
    office: args.office,
    categoryIds: args.categoryIds,
    subCategoryIds: args.subCategoryIds,
  });
}
