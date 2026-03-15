/**
 * Modular resolver: createAsset mutation.
 * Delegates to application use-case only.
 */
import { createAssetUseCase } from "@/application/assets";

type AssetCreateInput = {
  assetTag: string;
  category: string;
  serialNumber: string;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  deletedAt?: number | null;
};

export function resolveCreateAsset(
  _: unknown,
  args: { input: AssetCreateInput },
) {
  return createAssetUseCase(args.input);
}
