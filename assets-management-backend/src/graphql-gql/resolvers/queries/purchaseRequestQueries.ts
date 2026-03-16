import {
  getPurchaseRequestById,
  getPurchaseRequests,
} from "@/db/purchaseRequests";

export const purchaseRequestQueries = {
  purchaseRequests: (
    _: unknown,
    args: { status?: "PENDING" | "APPROVED" | "DECLINED" },
  ) => getPurchaseRequests(args.status),
  purchaseRequest: (_: unknown, args: { id: string }) =>
    getPurchaseRequestById(args.id),
};
