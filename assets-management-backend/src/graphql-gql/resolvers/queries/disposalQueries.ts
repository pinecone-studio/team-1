import { getDisposalRequest, getDisposalRequests } from "@/db/disposalRequests";

export const disposalQueries = {
  disposalRequest: (_: unknown, args: { id: string }) =>
    getDisposalRequest(args.id),
  disposalRequests: (_: unknown, args: { status?: string }) =>
    getDisposalRequests(args.status),
};
