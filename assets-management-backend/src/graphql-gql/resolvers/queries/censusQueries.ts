import {
  getCensusProgress,
  getCensusTaskDetails,
  getEmployeeCensusTasks,
  getOpenCensusProgress,
} from "@/db/census";

export const censusQueries = {
  censusProgress: (_: unknown, args: { censusId: string }) =>
    getCensusProgress(args.censusId),
  employeeCensusTasks: (
    _: unknown,
    args: { censusId: string; employeeId: string },
  ) => getEmployeeCensusTasks(args.censusId, args.employeeId),
  censusTaskDetails: (_: unknown, args: { censusId: string }) =>
    getCensusTaskDetails(args.censusId),
  openCensusProgress: () => getOpenCensusProgress(),
};

