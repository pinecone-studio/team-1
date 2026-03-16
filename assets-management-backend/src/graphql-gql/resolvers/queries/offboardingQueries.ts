import { getOffboardingEventByEmployee } from "@/db/offboarding";

export const offboardingQueries = {
  offboardingEvent: (_: unknown, args: { employeeId: string }) =>
    getOffboardingEventByEmployee(args.employeeId),
};
