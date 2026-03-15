/**
 * Use-case: List assets with optional filters.
 * Encapsulates office normalization and delegates to data layer.
 */
import { getAssets as getAssetsFromDb } from "@/db/assets/queries";
import type { Asset } from "@/db/assets/types";

const DEFAULT_OFFICE = "Гурван гол";

function normalizeOffice(office?: string | null): string {
  const raw = office?.trim();
  if (!raw) return DEFAULT_OFFICE;
  return raw
    .replace(/^(Gurwan Gol|Gurvan Gol)/i, "Гурван гол")
    .replace(/\s+\d+$/, "")
    .trim();
}

export type GetAssetsArgs = {
  office?: string | null;
  categoryIds?: string[] | null;
  subCategoryIds?: string[] | null;
};

export async function getAssetsUseCase(
  args: GetAssetsArgs = {},
): Promise<Asset[]> {
  const office = normalizeOffice(args.office);
  return getAssetsFromDb(
    office,
    args.categoryIds ?? undefined,
    args.subCategoryIds ?? undefined,
  );
}
