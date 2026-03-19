import {
  getCensusProgress,
  startCensus,
  submitCensusResponses,
  closeCensus,
} from "@/db/census";

export const censusMutations = {
  startCensus: async (
    _: unknown,
    args: {
      input: {
        name: string;
        scope: string;
        scopeEmployeeIds?: string[] | null;
        createdBy: string;
      };
    },
  ) => {
    const started = await startCensus({
      name: args.input.name,
      scope: (args.input.scope as any) ?? "ORG",
      scopeEmployeeIds: args.input.scopeEmployeeIds ?? null,
      createdBy: args.input.createdBy,
    });
    return getCensusProgress(started.id);
  },
  submitCensusResponses: (
    _: unknown,
    args: {
      censusId: string;
      employeeId: string;
      responses: Array<{
        assetId: string;
        status: string;
        reason?: string | null;
        transferredToEmployeeId?: string | null;
      }>;
    },
  ) =>
    submitCensusResponses({
      censusId: args.censusId,
      employeeId: args.employeeId,
      responses: args.responses.map((r) => ({
        assetId: r.assetId,
        status: r.status as any,
        reason: (r.reason ?? null) as any,
        transferredToEmployeeId: r.transferredToEmployeeId ?? null,
      })),
    }),
  closeCensus: (
    _: unknown,
    args: {
      censusId: string;
      closedBy: string;
    },
  ) => closeCensus(args.censusId, args.closedBy),
};

