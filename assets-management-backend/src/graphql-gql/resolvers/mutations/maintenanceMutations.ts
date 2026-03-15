import {
  createMaintenanceTicket,
  updateMaintenanceTicket,
} from "@/db/maintenance";

export const maintenanceMutations = {
  createMaintenanceTicket: (_: unknown, args: any) =>
    createMaintenanceTicket(args),
  updateMaintenanceTicket: (
    _: unknown,
    args: {
      id: string;
      status: string;
      repairCost?: number;
      resolvedAt?: number;
    },
  ) => updateMaintenanceTicket(args.id, args),
};
