/**
 * Modular resolver: updateAsset mutation.
 */
import { updateAssetUseCase } from "@/application/assets";

type AssetUpdateInput = {
  assetTag?: string | null;
  category?: string | null;
  serialNumber?: string | null;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  deletedAt?: number | null;
};

export function resolveUpdateAsset(
  _: unknown,
  args: { id: string; input: AssetUpdateInput },
) {
  return updateAssetUseCase(args.id, args.input);
}
