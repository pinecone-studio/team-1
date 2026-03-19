export interface DashboardMetrics {
  totalAssets: number;
  assignedAssets: number;
  assetsInRepair: number;
  pendingDisposal: number;
  recentlyAdded: number;
  censusProgress: number;
  depreciationTotal: number;
}

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
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  status: "active" | "offboarding";
}

export interface CensusTask {
  id: string;
  assetId: string;
  employeeId: string;
  status: "verified" | "pending" | "discrepancy";
  verificationMethod?: "qr_scan" | "self_verification";
  condition?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface Census {
  id: string;
  type: "company" | "department";
  startDate: string;
  status: "active" | "completed" | "archived";
  totalAssets: number;
  verifiedCount: number;
  discrepancyCount: number;
  tasks: CensusTask[];
}

export interface OffboardingAsset {
  assetId: string;
  assetName: string;
  returnDeadline: string;
  returnStatus: "pending" | "returned" | "overdue";
  condition?: string;
  dataWipeRequired: boolean;
  dataWipeCompleted: boolean;
}

export interface OffboardingTask {
  id: string;
  employeeId: string;
  employeeName: string;
  terminationDate: string;
  status: "in_progress" | "completed";
  payrollCleared: boolean;
  assets: OffboardingAsset[];
}

export interface DisposalApproval {
  approved: boolean;
  by: string;
  at: string;
}

export interface DisposalRequest {
  id: string;
  assetId: string;
  assetName: string;
  reason: "exceeded_useful_life" | "damaged";
  requestedBy: string;
  requestedAt: string;
  hrApproval?: DisposalApproval;
  financeApproval?: DisposalApproval;
  dataWipeCertificate?: DisposalApproval;
  status:
    | "pending_hr"
    | "pending_finance"
    | "pending_data_wipe"
    | "disposed"
    | "archived";
}

export interface AuditLog {
  id: string;
  tableName: string;
  recordId: string;
  actionType: "CREATE" | "UPDATE" | "DELETE";
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  actor: string;
  timestamp: string;
}

export interface AssetSummary {
  id: string;
  assetId: string;
  category: AssetCategory;
  serialNumber: string;
  status: AssetStatus;
}
export type AssetStatus =
  | "AVAILABLE"
  | "ASSIGNED"
  | "IN_REPAIR"
  | "FOR_SALE"
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
  | "ACCESSORIES"
  | "OTHER"
  | "CHAIR"
  | "DESK"
  | "CABINET"
  | "SOFA"
  | "AIR_CONDITIONER"
  | "WATER_DISPENSER"
  | "TELEVISION"
  | "FRIDGE"
  | "MICROWAVE"
  | "FIRE_EXTINGUISHER"
  | "CCTV"
  | "ACCESS_CONTROL"
  | "STATIONERY_SET"
  | "PAPER"
  | "KITCHENWARE"
  | "CONSUMABLES"
  | "CLEANING_TOOLS"
  | "DETERGENTS";

export type AssetCondition = "Good" | "Fair" | "Damaged";

export type UserRole =
  | "admin"
  | "it_admin"
  | "it_manager"
  | "hr_manager"
  | "finance"
  | "finance_manager"
  | "employee";

export interface DashboardMetrics {
  totalAssets: number;
  assignedAssets: number;
  assetsInRepair: number;
  pendingDisposal: number;
  recentlyAdded: number;
  censusProgress: number;
  depreciationTotal: number;
}

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
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  status: "active" | "offboarding";
}

export interface CensusTask {
  id: string;
  assetId: string;
  employeeId: string;
  status: "verified" | "pending" | "discrepancy";
  verificationMethod?: "qr_scan" | "self_verification";
  condition?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface Census {
  id: string;
  type: "company" | "department";
  startDate: string;
  status: "active" | "completed" | "archived";
  totalAssets: number;
  verifiedCount: number;
  discrepancyCount: number;
  tasks: CensusTask[];
}

export interface OffboardingAsset {
  assetId: string;
  assetName: string;
  returnDeadline: string;
  returnStatus: "pending" | "returned" | "overdue";
  condition?: string;
  dataWipeRequired: boolean;
  dataWipeCompleted: boolean;
}

export interface OffboardingTask {
  id: string;
  employeeId: string;
  employeeName: string;
  terminationDate: string;
  status: "in_progress" | "completed";
  payrollCleared: boolean;
  assets: OffboardingAsset[];
}

export interface DisposalApproval {
  approved: boolean;
  by: string;
  at: string;
}

export interface DisposalRequest {
  id: string;
  assetId: string;
  assetName: string;
  reason: "exceeded_useful_life" | "damaged";
  requestedBy: string;
  requestedAt: string;
  hrApproval?: DisposalApproval;
  financeApproval?: DisposalApproval;
  dataWipeCertificate?: DisposalApproval;
  status:
    | "pending_hr"
    | "pending_finance"
    | "pending_data_wipe"
    | "disposed"
    | "archived";
}

export interface AuditLog {
  id: string;
  tableName: string;
  recordId: string;
  actionType: "CREATE" | "UPDATE" | "DELETE";
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  actor: string;
  timestamp: string;
}

export interface AssetSummary {
  id: string;
  assetId: string;
  category: AssetCategory;
  serialNumber: string;
  status: AssetStatus;
}
