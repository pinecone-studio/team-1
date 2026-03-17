import {
  getOffboardingEventByEmployee,
  getPendingReturnRequestsByEventId,
} from "@/db/offboarding";

export const offboardingQueries = {
  offboardingEvent: (_: unknown, args: { employeeId: string }) =>
    getOffboardingEventByEmployee(args.employeeId),
  pendingReturnRequests: (
    _: unknown,
    args: { offboardingEventId: string },
  ) => getPendingReturnRequestsByEventId(args.offboardingEventId),
};
