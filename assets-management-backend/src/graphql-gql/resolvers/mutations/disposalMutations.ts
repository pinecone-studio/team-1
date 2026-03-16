import {
  requestDisposal as requestDisposalDb,
  approveDisposalRequest,
  rejectDisposalRequest,
  uploadDataWipeCertificate as uploadDataWipeCertificateDb,
  completeDisposal as completeDisposalDb,
} from "@/db/disposalRequests";

export const disposalMutations = {
  requestDisposal: (
    _: unknown,
    args: {
      assetId: string;
      requestedBy: string;
      method: string;
      reason?: string | null;
    },
  ) =>
    requestDisposalDb(
      args.assetId,
      args.requestedBy,
      args.method,
      args.reason ?? undefined,
    ),
  approveDisposal: (
    _: unknown,
    args: {
      id: string;
      approvedBy: string;
      stage: "IT_APPROVED" | "FINANCE_APPROVED";
    },
  ) => approveDisposalRequest(args.id, args.approvedBy, args.stage),
  rejectDisposal: (
    _: unknown,
    args: { id: string; rejectedBy: string; reason?: string | null },
  ) => rejectDisposalRequest(args.id, args.rejectedBy, args.reason ?? undefined),
  uploadDataWipeCertificate: (
    _: unknown,
    args: { id: string; fileKey: string; uploadedBy: string },
  ) => uploadDataWipeCertificateDb(args.id, args.fileKey, args.uploadedBy),
  completeDisposal: (
    _: unknown,
    args: {
      id: string;
      certifiedBy: string;
      writeOffValue?: number | null;
      recipient?: string | null;
    },
  ) =>
    completeDisposalDb(
      args.id,
      args.certifiedBy,
      args.writeOffValue ?? undefined,
      args.recipient ?? undefined,
    ),
};
