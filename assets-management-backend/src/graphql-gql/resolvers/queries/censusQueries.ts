import {
  getCensusProgress,
  getCensusTaskDetails,
  getEmployeeCensusTasks,
  getOpenCensusAssetScanStatus,
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
  openCensusAssetScanStatus: (_: unknown, args: { assetId: string }) =>
    getOpenCensusAssetScanStatus(args.assetId),
};
