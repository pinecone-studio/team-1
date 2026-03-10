import { eq } from 'drizzle-orm';
import { categories, employees, locations } from '../../../db/schema';
import type { GraphQLContext } from '../context';

type AssetSource = {
  categoryId: string | null;
  locationId: string | null;
  assignedTo: string | null;
};

export const assetResolvers = {
  category: async (asset: AssetSource, _args: unknown, ctx: GraphQLContext) => {
    if (!ctx.db || !asset.categoryId) {
      return null;
    }

    return (
      (await ctx.db
        .select()
        .from(categories)
        .where(eq(categories.id, asset.categoryId))
        .get()) ?? null
    );
  },
  location: async (asset: AssetSource, _args: unknown, ctx: GraphQLContext) => {
    if (!ctx.db || !asset.locationId) {
      return null;
    }

    return (
      (await ctx.db
        .select()
        .from(locations)
        .where(eq(locations.id, asset.locationId))
        .get()) ?? null
    );
  },
  assignedEmployee: async (
    asset: AssetSource,
    _args: unknown,
    ctx: GraphQLContext,
  ) => {
    if (!ctx.db || !asset.assignedTo) {
      return null;
    }

    return (
      (await ctx.db
        .select()
        .from(employees)
        .where(eq(employees.id, asset.assignedTo))
        .get()) ?? null
    );
  },
};
