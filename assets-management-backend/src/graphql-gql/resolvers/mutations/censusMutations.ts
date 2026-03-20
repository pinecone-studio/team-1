import {
  type CensusResponseInput,
  type CensusScope,
  getCensusProgress,
  registerOpenCensusAssetScan,
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
        coverageMode?: string | null;
        department?: string | null;
        categoryId?: string | null;
      };
    },
  ) => {
    const started = await startCensus({
      name: args.input.name,
      scope: (args.input.scope as CensusScope) ?? "ORG",
      scopeEmployeeIds: args.input.scopeEmployeeIds ?? null,
      createdBy: args.input.createdBy,
      coverageMode: args.input.coverageMode ?? null,
      department: args.input.department ?? null,
      categoryId: args.input.categoryId ?? null,
    });
    return getCensusProgress(started.id);
  },
  submitCensusResponses: (
    _: unknown,
    args: {
      censusId: string;
      employeeId: string;
      responses: CensusResponseInput[];
    },
  ) =>
    submitCensusResponses({
      censusId: args.censusId,
      employeeId: args.employeeId,
      responses: args.responses,
    }),
  closeCensus: (
    _: unknown,
    args: {
      censusId: string;
      closedBy: string;
    },
  ) => closeCensus(args.censusId, args.closedBy),
  registerOpenCensusAssetScan: (_: unknown, args: { assetId: string }) =>
    registerOpenCensusAssetScan(args.assetId),
};
