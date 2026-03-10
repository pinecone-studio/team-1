import { eq } from 'drizzle-orm';
import { getDb } from '../../lib/cloudflare-d1';
import { assets, categories, employees, locations } from '../../db/schema';
import { queries } from './queries';
import { mutations } from './mutations';

const getById = async <T extends { id: unknown }>(table: T, id?: string | null) => {
  if (!id) return null;
  const db = getDb();
  return (await db.select().from(table as never).where(eq(table.id as never, id)))[0] ?? null;
};

export const resolvers = {
  Query: queries,
  Mutation: mutations,
  Employee: {
    location: async (parent: { locationId?: string | null }) => getById(locations, parent.locationId),
  },
  Asset: {
    category: async (parent: { categoryId?: string | null }) => getById(categories, parent.categoryId),
    location: async (parent: { locationId?: string | null }) => getById(locations, parent.locationId),
    assignedEmployee: async (parent: { assignedTo?: string | null }) => getById(employees, parent.assignedTo),
    parent: async (parent: { parentAssetId?: string | null }) => getById(assets, parent.parentAssetId),
    children: async (parent: { id: string }) => {
      const db = getDb();
      return db.select().from(assets).where(eq(assets.parentAssetId, parent.id));
    },
  },
  AuditLog: {
    asset: async (parent: { assetId: string }) => getById(assets, parent.assetId),
    location: async (parent: { locationId?: string | null }) => getById(locations, parent.locationId),
  },
  DepreciationLog: {
    asset: async (parent: { assetId: string }) => getById(assets, parent.assetId),
  },
};
