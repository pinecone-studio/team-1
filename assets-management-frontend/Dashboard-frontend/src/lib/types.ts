export type AssetStatus =
  | "AVAILABLE"
  | "ASSIGNED"
  | "IN_REPAIR"
  | "PENDING_DISPOSAL"
  | "DISPOSED";

export type AssetCategory =
  | "LAPTOP"
  | "DESKTOP"
  | "MONITOR"
  | "PHONE"
  | "TABLET"
  | "PRINTER"
  | "NETWORK"
  | "OTHER";

export interface Asset {
  id: string;
  assetId: string;
  category: AssetCategory;
  mainCategory?: string;
  location?: string;
  serialNumber: string;
  purchaseCost: number;
  residualValue: number;
  usefulLife: number;
  purchaseDate: string;
  currentBookValue: number;
  status: AssetStatus;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  departmentId?: string;
  departmentName?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type AssetCondition = "Good" | "Fair" | "Damaged";
