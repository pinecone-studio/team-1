export type PurchaseRequestStatus = "PENDING" | "APPROVED" | "DECLINED";

export type PurchaseRequestCreate = {
  assetTag: string;
  category: string;
  serialNumber: string;
  purchaseCost?: number;
  purchaseDate?: number;
  requesterEmployeeId: string;
  requesterEmail: string;
  token: string;
  expiresAt?: number;
};
