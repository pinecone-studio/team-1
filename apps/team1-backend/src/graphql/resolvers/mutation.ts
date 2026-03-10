import {
  assets,
  assignments,
  auditLogs,
  categories,
  censusEvents,
  censusTasks,
  employees,
  locations,
} from '../../../db/schema';
import type { GraphQLContext } from '../context';

type InputArgs<T> = { input: T };

function requireDb(ctx: GraphQLContext) {
  if (!ctx.db) {
    throw new Error('Database not available');
  }
  return ctx.db;
}

export const mutationResolvers = {
  createCategory: async (
    _parent: unknown,
    { input }: InputArgs<{ name: string }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    await db.insert(categories).values({ id, name: input.name });
    return { id, name: input.name };
  },
  createLocation: async (
    _parent: unknown,
    { input }: InputArgs<{ name: string }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    await db.insert(locations).values({ id, name: input.name });
    return { id, name: input.name };
  },
  createEmployee: async (
    _parent: unknown,
    { input }: InputArgs<{
      firstName: string;
      lastName: string;
      email: string;
      department?: string | null;
      branch?: string | null;
      status?: string | null;
    }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    const row = { id, ...input };
    await db.insert(employees).values(row);
    return row;
  },
  createAsset: async (
    _parent: unknown,
    { input }: InputArgs<{
      assetTag: string;
      categoryId?: string | null;
      model?: string | null;
      serialNumber?: string | null;
      status: string;
      assignedTo?: string | null;
      purchaseDate?: string | null;
      purchaseCost?: number | null;
      locationId?: string | null;
    }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    const row = { id, ...input };
    await db.insert(assets).values(row);
    return row;
  },
  createAssignment: async (
    _parent: unknown,
    { input }: InputArgs<{
      assetId?: string | null;
      employeeId?: string | null;
      assignedAt: string;
      returnedAt?: string | null;
      conditionAtAssign?: string | null;
      conditionAtReturn?: string | null;
    }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    const row = { id, ...input };
    await db.insert(assignments).values(row);
    return row;
  },
  createCensusEvent: async (
    _parent: unknown,
    { input }: InputArgs<{ name: string; deadline: string }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    const row = { id, ...input };
    await db.insert(censusEvents).values(row);
    return row;
  },
  createCensusTask: async (
    _parent: unknown,
    { input }: InputArgs<{
      censusId?: string | null;
      assetId?: string | null;
      verifiedAt?: string | null;
      conditionReported?: string | null;
      discrepancyFlag?: boolean | null;
    }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    const row = { id, ...input };
    await db.insert(censusTasks).values(row);
    return row;
  },
  createAuditLog: async (
    _parent: unknown,
    { input }: InputArgs<{
      tableName: string;
      recordId: string;
      action: string;
      actorId?: string | null;
      createdAt: string;
    }>,
    ctx: GraphQLContext,
  ) => {
    const db = requireDb(ctx);
    const id = crypto.randomUUID();
    const row = { id, ...input };
    await db.insert(auditLogs).values(row);
    return row;
  },
};
