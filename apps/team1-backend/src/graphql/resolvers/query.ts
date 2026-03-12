import {
  assets,
  assignments,
  auditLogs,
  // categories,
  censusEvents,
  censusTasks,
  employees,
  // locations,
} from '../../../db/schema';

import type { GraphQLContext } from '../context';

export const queryResolvers = {
  assets: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
    if (!ctx.db) {
      return [];
    }

    return ctx.db.select().from(assets);
  },
  // categories: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
  //   if (!ctx.db) {
  //     return [];
  //   }

  //   return ctx.db.select().from(categories);
  // },
  // locations: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
  //   if (!ctx.db) {
  //     return [];
  //   }

  //   return ctx.db.select().from(locations);
  // },
  employees: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
    if (!ctx.db) {
      return [];
    }

    return ctx.db.select().from(employees);
  },
  assignments: async (
    _parent: unknown,
    _args: unknown,
    ctx: GraphQLContext,
  ) => {
    if (!ctx.db) {
      return [];
    }

    return ctx.db.select().from(assignments);
  },
  censusEvents: async (
    _parent: unknown,
    _args: unknown,
    ctx: GraphQLContext,
  ) => {
    if (!ctx.db) {
      return [];
    }

    return ctx.db.select().from(censusEvents);
  },
  censusTasks: async (
    _parent: unknown,
    _args: unknown,
    ctx: GraphQLContext,
  ) => {
    if (!ctx.db) {
      return [];
    }

    return ctx.db.select().from(censusTasks);
  },
  auditLogs: async (_parent: unknown, _args: unknown, ctx: GraphQLContext) => {
    if (!ctx.db) {
      return [];
    }

    return ctx.db.select().from(auditLogs);
  },
};
