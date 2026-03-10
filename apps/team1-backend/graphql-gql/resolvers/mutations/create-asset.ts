import { getDb } from '../../../lib/cloudflare-d1';
import { assets } from '../../../db/schema';

export const createAsset = async (
  _: unknown,
  args: {
    input: {
      id?: string;
      assetTag: string;
      categoryId?: string;
      parentAssetId?: string;
      locationId?: string;
      assignedTo?: string;
      status: string;
      imageR2Key?: string;
      purchasePrice?: number;
      currentBookValue?: number;
      purchaseDate?: string;
    };
  }
) => {
  const db = getDb();
  const id = args.input.id ?? crypto.randomUUID();
  await db.insert(assets).values({
    id,
    assetTag: args.input.assetTag,
    categoryId: args.input.categoryId ?? null,
    parentAssetId: args.input.parentAssetId ?? null,
    locationId: args.input.locationId ?? null,
    assignedTo: args.input.assignedTo ?? null,
    status: args.input.status,
    imageR2Key: args.input.imageR2Key ?? null,
    purchasePrice: args.input.purchasePrice ?? null,
    currentBookValue: args.input.currentBookValue ?? null,
    purchaseDate: args.input.purchaseDate ?? null,
  });
  return { id, ...args.input };
};
