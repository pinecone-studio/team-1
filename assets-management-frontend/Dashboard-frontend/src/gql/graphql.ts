/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Asset = {
  __typename?: 'Asset';
  assetTag: Scalars['String']['output'];
  assignedTo?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  currentBookValue?: Maybe<Scalars['Float']['output']>;
  deletedAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  purchaseCost?: Maybe<Scalars['Float']['output']>;
  purchaseDate?: Maybe<Scalars['Float']['output']>;
  serialNumber: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type AssetCreateInput = {
  assetTag: Scalars['String']['input'];
  assignedTo?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  currentBookValue?: InputMaybe<Scalars['Int']['input']>;
  deletedAt?: InputMaybe<Scalars['Float']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  purchaseCost?: InputMaybe<Scalars['Int']['input']>;
  purchaseDate?: InputMaybe<Scalars['Float']['input']>;
  serialNumber: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

export type AssetSearchInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  employeeId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['Float']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<AssetStatus>;
};

export type AssetSearchResult = {
  __typename?: 'AssetSearchResult';
  items: Array<Asset>;
  total: Scalars['Int']['output'];
};

export enum AssetSortField {
  AssetTag = 'assetTag',
  CreatedAt = 'createdAt',
  PurchaseDate = 'purchaseDate'
}

export type AssetSortInput = {
  direction: SortDirection;
  field: AssetSortField;
};

export enum AssetStatus {
  Assigned = 'ASSIGNED',
  Available = 'AVAILABLE',
  DisposalRequested = 'DISPOSAL_REQUESTED',
  Disposed = 'DISPOSED',
  InMaintenance = 'IN_MAINTENANCE',
  Returned = 'RETURNED'
}

export type AssetTimelineEvent = {
  __typename?: 'AssetTimelineEvent';
  actor?: Maybe<Employee>;
  description: Scalars['String']['output'];
  eventType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
};

export type AssetUpdateInput = {
  assetTag?: InputMaybe<Scalars['String']['input']>;
  assignedTo?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  currentBookValue?: InputMaybe<Scalars['Int']['input']>;
  deletedAt?: InputMaybe<Scalars['Float']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  purchaseCost?: InputMaybe<Scalars['Int']['input']>;
  purchaseDate?: InputMaybe<Scalars['Float']['input']>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Assignment = {
  __typename?: 'Assignment';
  asset?: Maybe<Asset>;
  assetId: Scalars['ID']['output'];
  assignedAt: Scalars['Float']['output'];
  assignedValue?: Maybe<Scalars['Float']['output']>;
  conditionAtAssign: Scalars['String']['output'];
  conditionAtReturn?: Maybe<Scalars['String']['output']>;
  employee?: Maybe<Employee>;
  employeeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  interestRate?: Maybe<Scalars['Float']['output']>;
  monthlyPayment?: Maybe<Scalars['Float']['output']>;
  paymentPlanMonths?: Maybe<Scalars['Int']['output']>;
  returnedAt?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  totalPayment?: Maybe<Scalars['Float']['output']>;
};

export enum AssignmentStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING',
  Returned = 'RETURNED'
}

export type AuditLog = {
  __typename?: 'AuditLog';
  action: Scalars['String']['output'];
  actorId: Scalars['ID']['output'];
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  newValueJson?: Maybe<Scalars['String']['output']>;
  oldValueJson?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['String']['output'];
  tableName: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  subcategories: Array<Category>;
};

export type DashboardSearchResult = {
  __typename?: 'DashboardSearchResult';
  employeeView?: Maybe<EmployeeDashboardView>;
  financeView?: Maybe<FinanceDashboardView>;
  itView?: Maybe<ItDashboardView>;
};

export type DisposalRequest = {
  __typename?: 'DisposalRequest';
  assetId: Scalars['ID']['output'];
  createdAt: Scalars['Float']['output'];
  dataWipeCertKey?: Maybe<Scalars['String']['output']>;
  financeApprovedAt?: Maybe<Scalars['Float']['output']>;
  financeApprovedBy?: Maybe<Employee>;
  id: Scalars['ID']['output'];
  itApprovedAt?: Maybe<Scalars['Float']['output']>;
  itApprovedBy?: Maybe<Employee>;
  method: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  rejectedAt?: Maybe<Scalars['Float']['output']>;
  rejectedBy?: Maybe<Employee>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  requestedBy?: Maybe<Employee>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Employee = {
  __typename?: 'Employee';
  birthDayAndMonth?: Maybe<Scalars['String']['output']>;
  birthdayPoster?: Maybe<Scalars['String']['output']>;
  branch: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['Float']['output']>;
  department: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employeeCode: Scalars['String']['output'];
  entraId: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  firstNameEng: Scalars['String']['output'];
  github?: Maybe<Scalars['String']['output']>;
  hireDate: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isKpi: Scalars['Int']['output'];
  isSalaryCompany: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  lastNameEng: Scalars['String']['output'];
  level: Scalars['String']['output'];
  numberOfVacationDays?: Maybe<Scalars['Int']['output']>;
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  terminationDate?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Float']['output'];
};

export type EmployeeCreateInput = {
  birthDayAndMonth?: InputMaybe<Scalars['String']['input']>;
  birthdayPoster?: InputMaybe<Scalars['String']['input']>;
  branch: Scalars['String']['input'];
  deletedAt?: InputMaybe<Scalars['Float']['input']>;
  department: Scalars['String']['input'];
  email: Scalars['String']['input'];
  employeeCode: Scalars['String']['input'];
  entraId: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  firstNameEng: Scalars['String']['input'];
  github?: InputMaybe<Scalars['String']['input']>;
  hireDate: Scalars['Float']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isKpi?: InputMaybe<Scalars['Int']['input']>;
  isSalaryCompany?: InputMaybe<Scalars['Int']['input']>;
  lastName: Scalars['String']['input'];
  lastNameEng: Scalars['String']['input'];
  level: Scalars['String']['input'];
  numberOfVacationDays?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  terminationDate?: InputMaybe<Scalars['Float']['input']>;
};

export type EmployeeDashboardView = {
  __typename?: 'EmployeeDashboardView';
  myAssets: Array<Asset>;
  myAssignments: Array<Assignment>;
  notifications: Array<Notification>;
};

export type EmployeeUpdateInput = {
  birthDayAndMonth?: InputMaybe<Scalars['String']['input']>;
  birthdayPoster?: InputMaybe<Scalars['String']['input']>;
  branch?: InputMaybe<Scalars['String']['input']>;
  deletedAt?: InputMaybe<Scalars['Float']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeCode?: InputMaybe<Scalars['String']['input']>;
  entraId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstNameEng?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['Float']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isKpi?: InputMaybe<Scalars['Int']['input']>;
  isSalaryCompany?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lastNameEng?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  numberOfVacationDays?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  terminationDate?: InputMaybe<Scalars['Float']['input']>;
};

export type FinanceDashboardView = {
  __typename?: 'FinanceDashboardView';
  notifications: Array<Notification>;
  pendingDisposals: Array<DisposalRequest>;
  pendingPurchaseRequests: Array<PurchaseRequest>;
  recentOrders: Array<PurchaseOrder>;
};

export type ItDashboardView = {
  __typename?: 'ITDashboardView';
  notifications: Array<Notification>;
  openTickets: Array<MaintenanceTicket>;
  pendingTransfers: Array<Transfer>;
  recentAssets: Array<Asset>;
};

export type Location = {
  __typename?: 'Location';
  createdAt: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  type: Scalars['String']['output'];
};

export type LocationInput = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  type: Scalars['String']['input'];
};

export type MaintenanceTicket = {
  __typename?: 'MaintenanceTicket';
  assetId: Scalars['ID']['output'];
  createdAt: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  repairCost?: Maybe<Scalars['Float']['output']>;
  reporterId: Scalars['ID']['output'];
  resolvedAt?: Maybe<Scalars['Float']['output']>;
  severity: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  vendorId?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminOverrideDisposal: DisposalRequest;
  adminOverrideOffboarding: OffboardingEvent;
  adminOverridePurchase: Array<PurchaseRequest>;
  approveDisposal: DisposalRequest;
  approvePurchaseRequest: PurchaseRequest;
  assignAsset?: Maybe<Asset>;
  completeAssetReturn: Asset;
  completeDisposal: DisposalRequest;
  createAsset: Asset;
  createCategory: Category;
  createEmployee: Employee;
  createLocation: Location;
  createMaintenanceTicket: MaintenanceTicket;
  createPurchaseRequest: PurchaseRequest;
  createPurchaseRequestBatch: Array<PurchaseRequest>;
  createVendor: Vendor;
  declinePurchaseRequest: PurchaseRequest;
  deleteAsset: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  deleteEmployee: Scalars['Boolean']['output'];
  deleteLocation: Scalars['Boolean']['output'];
  deleteVendor: Scalars['Boolean']['output'];
  markNotificationAsRead: Scalars['Boolean']['output'];
  rejectDisposal: DisposalRequest;
  requestDisposal: DisposalRequest;
  returnAsset?: Maybe<Asset>;
  sendNotification: Notification;
  startOffboarding: OffboardingEvent;
  transferAsset: Transfer;
  updateAsset?: Maybe<Asset>;
  updateAssetCategory?: Maybe<Asset>;
  updateCategory?: Maybe<Category>;
  updateEmployee?: Maybe<Employee>;
  updateLocation?: Maybe<Location>;
  updateMaintenanceTicket: MaintenanceTicket;
  updateVendor?: Maybe<Vendor>;
  uploadDataWipeCertificate: DisposalRequest;
};


export type MutationAdminOverrideDisposalArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationAdminOverrideOffboardingArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationAdminOverridePurchaseArgs = {
  status: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationApproveDisposalArgs = {
  approvedBy: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  stage: Scalars['String']['input'];
};


export type MutationApprovePurchaseRequestArgs = {
  approverEmail: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationAssignAssetArgs = {
  accessoriesJson?: InputMaybe<Scalars['String']['input']>;
  assetId: Scalars['ID']['input'];
  assignedValue?: InputMaybe<Scalars['Int']['input']>;
  conditionAtAssign?: InputMaybe<Scalars['String']['input']>;
  employeeId: Scalars['ID']['input'];
  interestRate?: InputMaybe<Scalars['Float']['input']>;
  paymentPlanMonths?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCompleteAssetReturnArgs = {
  assetId: Scalars['ID']['input'];
  condition: Scalars['String']['input'];
  employeeId: Scalars['ID']['input'];
  inspectedBy: Scalars['ID']['input'];
};


export type MutationCompleteDisposalArgs = {
  certifiedBy: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  recipient?: InputMaybe<Scalars['String']['input']>;
  writeOffValue?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreateAssetArgs = {
  input: AssetCreateInput;
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateEmployeeArgs = {
  input: EmployeeCreateInput;
};


export type MutationCreateLocationArgs = {
  input: LocationInput;
};


export type MutationCreateMaintenanceTicketArgs = {
  assetId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  repairCost?: InputMaybe<Scalars['Int']['input']>;
  reporterId: Scalars['ID']['input'];
  severity: Scalars['String']['input'];
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreatePurchaseRequestArgs = {
  assetTag: Scalars['String']['input'];
  category: Scalars['String']['input'];
  purchaseCost?: InputMaybe<Scalars['Int']['input']>;
  purchaseDate?: InputMaybe<Scalars['Float']['input']>;
  requesterEmail: Scalars['String']['input'];
  requesterEmployeeId: Scalars['ID']['input'];
  serialNumber: Scalars['String']['input'];
};


export type MutationCreatePurchaseRequestBatchArgs = {
  items: Array<PurchaseRequestItemInput>;
  requesterEmail: Scalars['String']['input'];
  requesterEmployeeId: Scalars['ID']['input'];
};


export type MutationCreateVendorArgs = {
  input: VendorInput;
};


export type MutationDeclinePurchaseRequestArgs = {
  approverEmail: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationDeleteAssetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVendorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRejectDisposalArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  rejectedBy: Scalars['ID']['input'];
};


export type MutationRequestDisposalArgs = {
  assetId: Scalars['ID']['input'];
  method: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  requestedBy: Scalars['ID']['input'];
};


export type MutationReturnAssetArgs = {
  assetId: Scalars['ID']['input'];
  conditionAtReturn?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendNotificationArgs = {
  input: NotificationInput;
};


export type MutationStartOffboardingArgs = {
  employeeId: Scalars['ID']['input'];
  initiatedBy: Scalars['ID']['input'];
};


export type MutationTransferAssetArgs = {
  assetId: Scalars['ID']['input'];
  conditionNoted?: InputMaybe<Scalars['String']['input']>;
  fromEmployeeId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  toEmployeeId: Scalars['ID']['input'];
};


export type MutationUpdateAssetArgs = {
  id: Scalars['ID']['input'];
  input: AssetUpdateInput;
};


export type MutationUpdateAssetCategoryArgs = {
  assetId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['ID']['input'];
  input: EmployeeUpdateInput;
};


export type MutationUpdateLocationArgs = {
  id: Scalars['ID']['input'];
  input: LocationInput;
};


export type MutationUpdateMaintenanceTicketArgs = {
  id: Scalars['ID']['input'];
  repairCost?: InputMaybe<Scalars['Int']['input']>;
  resolvedAt?: InputMaybe<Scalars['Float']['input']>;
  status: Scalars['String']['input'];
};


export type MutationUpdateVendorArgs = {
  id: Scalars['ID']['input'];
  input: VendorInput;
};


export type MutationUploadDataWipeCertificateArgs = {
  fileKey: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  uploadedBy: Scalars['ID']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['Float']['output'];
  employeeId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  isRead: Scalars['Int']['output'];
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type NotificationInput = {
  employeeId?: InputMaybe<Scalars['ID']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
  title: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type OffboardingEvent = {
  __typename?: 'OffboardingEvent';
  completedAt?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['Float']['output'];
  employee?: Maybe<Employee>;
  id: Scalars['ID']['output'];
  initiatedBy?: Maybe<Employee>;
  returnedAssets: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  totalAssets: Scalars['Int']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PurchaseOrder = {
  __typename?: 'PurchaseOrder';
  approvedBy?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['Float']['output'];
  deliveredAt?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  lineItemsJson: Scalars['String']['output'];
  requestedBy: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  totalCost: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
  vendorId: Scalars['ID']['output'];
};

export type PurchaseRequest = {
  __typename?: 'PurchaseRequest';
  assetTag: Scalars['String']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  decidedAt?: Maybe<Scalars['Float']['output']>;
  decidedBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  purchaseCost?: Maybe<Scalars['Float']['output']>;
  purchaseDate?: Maybe<Scalars['Float']['output']>;
  requesterEmail: Scalars['String']['output'];
  requesterEmployeeId: Scalars['ID']['output'];
  serialNumber: Scalars['String']['output'];
  status: PurchaseRequestStatus;
  updatedAt: Scalars['Float']['output'];
};

export type PurchaseRequestItemInput = {
  assetTag: Scalars['String']['input'];
  category: Scalars['String']['input'];
  purchaseCost?: InputMaybe<Scalars['Float']['input']>;
  purchaseDate?: InputMaybe<Scalars['Float']['input']>;
  serialNumber: Scalars['String']['input'];
};

export enum PurchaseRequestStatus {
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetHistory: Array<AssetTimelineEvent>;
  assets: Array<Asset>;
  assignments: Array<Assignment>;
  auditLogs: Array<AuditLog>;
  categories: Array<Category>;
  dashboard: DashboardSearchResult;
  disposalRequest?: Maybe<DisposalRequest>;
  disposalRequests: Array<DisposalRequest>;
  employee?: Maybe<Employee>;
  employeeAssignments: Array<Assignment>;
  employees: Array<Employee>;
  locations: Array<Location>;
  maintenanceTickets: Array<MaintenanceTicket>;
  offboardingEvent?: Maybe<OffboardingEvent>;
  purchaseRequest?: Maybe<PurchaseRequest>;
  purchaseRequests: Array<PurchaseRequest>;
  searchAssets: AssetSearchResult;
  vendors: Array<Vendor>;
};


export type QueryAssetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssetHistoryArgs = {
  assetId: Scalars['ID']['input'];
};


export type QueryAssetsArgs = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  office?: InputMaybe<Scalars['String']['input']>;
  subCategoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QueryAuditLogsArgs = {
  recordId?: InputMaybe<Scalars['String']['input']>;
  tableName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDashboardArgs = {
  employeeId?: InputMaybe<Scalars['ID']['input']>;
  role: UserRole;
};


export type QueryDisposalRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDisposalRequestsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeeAssignmentsArgs = {
  employeeId: Scalars['ID']['input'];
};


export type QueryMaintenanceTicketsArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOffboardingEventArgs = {
  employeeId: Scalars['ID']['input'];
};


export type QueryPurchaseRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPurchaseRequestsArgs = {
  status?: InputMaybe<PurchaseRequestStatus>;
};


export type QuerySearchAssetsArgs = {
  filter: AssetSearchInput;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<AssetSortInput>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Transfer = {
  __typename?: 'Transfer';
  approvedBy?: Maybe<Scalars['ID']['output']>;
  assetId: Scalars['ID']['output'];
  conditionNoted?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  fromEmployeeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  toEmployeeId: Scalars['ID']['output'];
  transferredAt: Scalars['Float']['output'];
};

export enum UserRole {
  Employee = 'EMPLOYEE',
  Finance = 'FINANCE',
  ItAdmin = 'IT_ADMIN',
  SuperAdmin = 'SUPER_ADMIN'
}

export type Vendor = {
  __typename?: 'Vendor';
  address?: Maybe<Scalars['String']['output']>;
  contactName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type VendorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type GetAuditLogsQueryVariables = Exact<{
  tableName?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAuditLogsQuery = { __typename?: 'Query', auditLogs: Array<{ __typename?: 'AuditLog', id: string, tableName: string, recordId: string, action: string, oldValueJson?: string | null, newValueJson?: string | null, actorId: string, createdAt: number }> };

export type GetMaintenanceTicketsQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMaintenanceTicketsQuery = { __typename?: 'Query', maintenanceTickets: Array<{ __typename?: 'MaintenanceTicket', id: string, assetId: string, reporterId: string, description: string, severity: string, status: string, vendorId?: string | null, repairCost?: number | null, resolvedAt?: number | null, createdAt: number, updatedAt: number }> };

export type AdminOverrideDisposalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;


export type AdminOverrideDisposalMutation = { __typename?: 'Mutation', adminOverrideDisposal: { __typename?: 'DisposalRequest', id: string, status: string, updatedAt: number } };

export type AdminOverridePurchaseMutationVariables = Exact<{
  token: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type AdminOverridePurchaseMutation = { __typename?: 'Mutation', adminOverridePurchase: Array<{ __typename?: 'PurchaseRequest', id: string, status: PurchaseRequestStatus, updatedAt: number }> };

export type AdminOverrideOffboardingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;


export type AdminOverrideOffboardingMutation = { __typename?: 'Mutation', adminOverrideOffboarding: { __typename?: 'OffboardingEvent', id: string, status: string, updatedAt: number } };

export type CreateVendorMutationVariables = Exact<{
  input: VendorInput;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor: { __typename?: 'Vendor', id: string, name: string } };

export type UpdateVendorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: VendorInput;
}>;


export type UpdateVendorMutation = { __typename?: 'Mutation', updateVendor?: { __typename?: 'Vendor', id: string, name: string } | null };

export type DeleteVendorMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVendorMutation = { __typename?: 'Mutation', deleteVendor: boolean };

export type CreateLocationMutationVariables = Exact<{
  input: LocationInput;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation: { __typename?: 'Location', id: string, name: string } };

export type UpdateLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: LocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation?: { __typename?: 'Location', id: string, name: string } | null };

export type DeleteLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation: boolean };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'Category', id: string, name: string } | null };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type AssetFieldsFragment = { __typename?: 'Asset', id: string, assetTag: string, serialNumber: string, status: string, category: string, purchaseDate?: number | null, purchaseCost?: number | null, currentBookValue?: number | null, locationId?: string | null, assignedTo?: string | null, imageUrl?: string | null, createdAt: number, updatedAt: number } & { ' $fragmentName'?: 'AssetFieldsFragment' };

export type EmployeeFieldsFragment = { __typename?: 'Employee', id: string, firstName: string, lastName: string, email: string, role: string, department: string, branch: string, imageUrl?: string | null } & { ' $fragmentName'?: 'EmployeeFieldsFragment' };

export type CategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, parentId?: string | null } & { ' $fragmentName'?: 'CategoryFieldsFragment' };

export type VendorFieldsFragment = { __typename?: 'Vendor', id: string, name: string, contactName?: string | null, email?: string | null, phone?: string | null, address?: string | null } & { ' $fragmentName'?: 'VendorFieldsFragment' };

export type LocationFieldsFragment = { __typename?: 'Location', id: string, name: string, parentId?: string | null, type: string } & { ' $fragmentName'?: 'LocationFieldsFragment' };

export type GetAssetsQueryVariables = Exact<{
  office?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  subCategoryIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetAssetsQuery = { __typename?: 'Query', assets: Array<(
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  )> };

export type GetAssetQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAssetQuery = { __typename?: 'Query', asset?: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  ) | null };

export type SearchAssetsQueryVariables = Exact<{
  filter: AssetSearchInput;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<AssetSortInput>;
}>;


export type SearchAssetsQuery = { __typename?: 'Query', searchAssets: { __typename?: 'AssetSearchResult', total: number, items: Array<(
      { __typename?: 'Asset' }
      & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
    )> } };

export type GetAssetHistoryQueryVariables = Exact<{
  assetId: Scalars['ID']['input'];
}>;


export type GetAssetHistoryQuery = { __typename?: 'Query', assetHistory: Array<{ __typename?: 'AssetTimelineEvent', id: string, eventType: string, description: string, timestamp: string, actor?: (
      { __typename?: 'Employee' }
      & { ' $fragmentRefs'?: { 'EmployeeFieldsFragment': EmployeeFieldsFragment } }
    ) | null }> };

export type GetVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorsQuery = { __typename?: 'Query', vendors: Array<(
    { __typename?: 'Vendor' }
    & { ' $fragmentRefs'?: { 'VendorFieldsFragment': VendorFieldsFragment } }
  )> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<(
    { __typename?: 'Category', subcategories: Array<(
      { __typename?: 'Category' }
      & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'CategoryFieldsFragment': CategoryFieldsFragment } }
  )> };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { __typename?: 'Query', locations: Array<(
    { __typename?: 'Location' }
    & { ' $fragmentRefs'?: { 'LocationFieldsFragment': LocationFieldsFragment } }
  )> };

export type GetActiveDisposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveDisposalsQuery = { __typename?: 'Query', disposalRequests: Array<{ __typename?: 'DisposalRequest', id: string, assetId: string, method: string, status: string, createdAt: number }> };

export type GetActiveOffboardingQueryVariables = Exact<{
  employeeId: Scalars['ID']['input'];
}>;


export type GetActiveOffboardingQuery = { __typename?: 'Query', offboardingEvent?: { __typename?: 'OffboardingEvent', id: string, status: string, totalAssets: number, returnedAssets: number, createdAt: number } | null };

export type GetEligibleCategoryUpdateAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEligibleCategoryUpdateAssetsQuery = { __typename?: 'Query', searchAssets: { __typename?: 'AssetSearchResult', items: Array<(
      { __typename?: 'Asset' }
      & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
    )> } };

export type CreateAssetMutationVariables = Exact<{
  input: AssetCreateInput;
}>;


export type CreateAssetMutation = { __typename?: 'Mutation', createAsset: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  ) };

export type UpdateAssetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: AssetUpdateInput;
}>;


export type UpdateAssetMutation = { __typename?: 'Mutation', updateAsset?: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  ) | null };

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAssetMutation = { __typename?: 'Mutation', deleteAsset: boolean };

export type AssignAssetMutationVariables = Exact<{
  assetId: Scalars['ID']['input'];
  employeeId: Scalars['ID']['input'];
  conditionAtAssign?: InputMaybe<Scalars['String']['input']>;
  accessoriesJson?: InputMaybe<Scalars['String']['input']>;
  assignedValue?: InputMaybe<Scalars['Int']['input']>;
  paymentPlanMonths?: InputMaybe<Scalars['Int']['input']>;
  interestRate?: InputMaybe<Scalars['Float']['input']>;
}>;


export type AssignAssetMutation = { __typename?: 'Mutation', assignAsset?: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  ) | null };

export type ReturnAssetMutationVariables = Exact<{
  assetId: Scalars['ID']['input'];
  conditionAtReturn?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReturnAssetMutation = { __typename?: 'Mutation', returnAsset?: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  ) | null };

export type UpdateAssetCategoryMutationVariables = Exact<{
  assetId: Scalars['ID']['input'];
  categoryId: Scalars['ID']['input'];
}>;


export type UpdateAssetCategoryMutation = { __typename?: 'Mutation', updateAssetCategory?: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  ) | null };

export type TransferAssetMutationVariables = Exact<{
  assetId: Scalars['ID']['input'];
  fromEmployeeId: Scalars['ID']['input'];
  toEmployeeId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  conditionNoted?: InputMaybe<Scalars['String']['input']>;
}>;


export type TransferAssetMutation = { __typename?: 'Mutation', transferAsset: { __typename?: 'Transfer', id: string, assetId: string, fromEmployeeId: string, toEmployeeId: string, reason?: string | null, transferredAt: number } };

export type CreateMaintenanceTicketMutationVariables = Exact<{
  assetId: Scalars['ID']['input'];
  reporterId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  severity: Scalars['String']['input'];
  vendorId?: InputMaybe<Scalars['ID']['input']>;
  repairCost?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateMaintenanceTicketMutation = { __typename?: 'Mutation', createMaintenanceTicket: { __typename?: 'MaintenanceTicket', id: string, assetId: string, description: string, status: string, severity: string } };

export type RequestDisposalMutationVariables = Exact<{
  assetId: Scalars['ID']['input'];
  requestedBy: Scalars['ID']['input'];
  method: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type RequestDisposalMutation = { __typename?: 'Mutation', requestDisposal: { __typename?: 'DisposalRequest', id: string, status: string, assetId: string } };

export type ApproveDisposalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  approvedBy: Scalars['ID']['input'];
  stage: Scalars['String']['input'];
}>;


export type ApproveDisposalMutation = { __typename?: 'Mutation', approveDisposal: { __typename?: 'DisposalRequest', id: string, status: string } };

export type RejectDisposalMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  rejectedBy: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type RejectDisposalMutation = { __typename?: 'Mutation', rejectDisposal: { __typename?: 'DisposalRequest', id: string, status: string } };

export type AssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignmentsQuery = { __typename?: 'Query', assignments: Array<(
    { __typename?: 'Assignment' }
    & { ' $fragmentRefs'?: { 'AssignmentFieldsFragment': AssignmentFieldsFragment } }
  )> };

export type AssignmentFieldsFragment = { __typename?: 'Assignment', id: string, assetId: string, employeeId: string, assignedAt: number, returnedAt?: number | null, conditionAtAssign: string, conditionAtReturn?: string | null, status: string, assignedValue?: number | null, paymentPlanMonths?: number | null, interestRate?: number | null, monthlyPayment?: number | null, totalPayment?: number | null, asset?: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFieldsFragment': AssetFieldsFragment } }
  ) | null, employee?: { __typename?: 'Employee', id: string, email: string, firstName: string, lastName: string } | null } & { ' $fragmentName'?: 'AssignmentFieldsFragment' };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, parentId?: string | null, subcategories: Array<{ __typename?: 'Category', id: string, name: string, parentId?: string | null }> }> };

export type GetDashboardQueryVariables = Exact<{
  role: UserRole;
  employeeId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetDashboardQuery = { __typename?: 'Query', dashboard: { __typename?: 'DashboardSearchResult', itView?: { __typename?: 'ITDashboardView', recentAssets: Array<{ __typename?: 'Asset', id: string, assetTag: string, status: string, serialNumber: string }>, openTickets: Array<{ __typename?: 'MaintenanceTicket', id: string, description: string, severity: string, status: string }>, pendingTransfers: Array<{ __typename?: 'Transfer', id: string, assetId: string, fromEmployeeId: string, toEmployeeId: string, transferredAt: number }>, notifications: Array<(
        { __typename?: 'Notification' }
        & { ' $fragmentRefs'?: { 'NotificationFieldsFragment': NotificationFieldsFragment } }
      )> } | null, employeeView?: { __typename?: 'EmployeeDashboardView', myAssets: Array<{ __typename?: 'Asset', id: string, assetTag: string, serialNumber: string, status: string }>, myAssignments: Array<{ __typename?: 'Assignment', id: string, assetId: string, assignedAt: number, returnedAt?: number | null }>, notifications: Array<(
        { __typename?: 'Notification' }
        & { ' $fragmentRefs'?: { 'NotificationFieldsFragment': NotificationFieldsFragment } }
      )> } | null, financeView?: { __typename?: 'FinanceDashboardView', pendingPurchaseRequests: Array<{ __typename?: 'PurchaseRequest', id: string, assetTag: string, requesterEmail: string, purchaseCost?: number | null, status: PurchaseRequestStatus }>, recentOrders: Array<{ __typename?: 'PurchaseOrder', id: string, totalCost: number, status: string, createdAt: number }>, pendingDisposals: Array<{ __typename?: 'DisposalRequest', id: string, assetId: string, method: string, status: string }>, notifications: Array<(
        { __typename?: 'Notification' }
        & { ' $fragmentRefs'?: { 'NotificationFieldsFragment': NotificationFieldsFragment } }
      )> } | null } };

export type NotificationFieldsFragment = { __typename?: 'Notification', id: string, title: string, message: string, type: string, link?: string | null, isRead: number, createdAt: number } & { ' $fragmentName'?: 'NotificationFieldsFragment' };

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'Employee', id: string, entraId: string, firstName: string, lastName: string, firstNameEng: string, lastNameEng: string, email: string, imageUrl?: string | null, hireDate: number, terminationDate?: number | null, status: string, numberOfVacationDays?: number | null, github?: string | null, department: string, branch: string, employeeCode: string, level: string, isKpi: number, isSalaryCompany: number, birthDayAndMonth?: string | null, birthdayPoster?: string | null, createdAt: number, updatedAt: number, deletedAt?: number | null }> };

export type EmployeeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EmployeeQuery = { __typename?: 'Query', employee?: { __typename?: 'Employee', id: string, entraId: string, firstName: string, lastName: string, firstNameEng: string, lastNameEng: string, email: string, imageUrl?: string | null, hireDate: number, terminationDate?: number | null, status: string, numberOfVacationDays?: number | null, github?: string | null, department: string, branch: string, employeeCode: string, level: string, isKpi: number, isSalaryCompany: number, birthDayAndMonth?: string | null, birthdayPoster?: string | null, createdAt: number, updatedAt: number, deletedAt?: number | null } | null };

export type CreateEmployeeMutationVariables = Exact<{
  input: EmployeeCreateInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'Employee', id: string, entraId: string, firstName: string, lastName: string, firstNameEng: string, lastNameEng: string, email: string, imageUrl?: string | null, hireDate: number, terminationDate?: number | null, status: string, numberOfVacationDays?: number | null, github?: string | null, department: string, branch: string, employeeCode: string, level: string, isKpi: number, isSalaryCompany: number, birthDayAndMonth?: string | null, birthdayPoster?: string | null, createdAt: number, updatedAt: number, deletedAt?: number | null } };

export type UpdateEmployeeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: EmployeeUpdateInput;
}>;


export type UpdateEmployeeMutation = { __typename?: 'Mutation', updateEmployee?: { __typename?: 'Employee', id: string, entraId: string, firstName: string, lastName: string, firstNameEng: string, lastNameEng: string, email: string, imageUrl?: string | null, hireDate: number, terminationDate?: number | null, status: string, numberOfVacationDays?: number | null, github?: string | null, department: string, branch: string, employeeCode: string, level: string, isKpi: number, isSalaryCompany: number, birthDayAndMonth?: string | null, birthdayPoster?: string | null, createdAt: number, updatedAt: number, deletedAt?: number | null } | null };

export type DeleteEmployeeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEmployeeMutation = { __typename?: 'Mutation', deleteEmployee: boolean };

export type SendNotificationMutationVariables = Exact<{
  input: NotificationInput;
}>;


export type SendNotificationMutation = { __typename?: 'Mutation', sendNotification: { __typename?: 'Notification', id: string, title: string, message: string, type: string, createdAt: number } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: boolean };

export type GetOffboardingEventQueryVariables = Exact<{
  employeeId: Scalars['ID']['input'];
}>;


export type GetOffboardingEventQuery = { __typename?: 'Query', offboardingEvent?: { __typename?: 'OffboardingEvent', id: string, status: string, totalAssets: number, returnedAssets: number, completedAt?: number | null, createdAt: number, employee?: { __typename?: 'Employee', id: string, firstName: string, lastName: string, email: string } | null, initiatedBy?: { __typename?: 'Employee', id: string, firstName: string, lastName: string } | null } | null };

export type StartOffboardingMutationVariables = Exact<{
  employeeId: Scalars['ID']['input'];
  initiatedBy: Scalars['ID']['input'];
}>;


export type StartOffboardingMutation = { __typename?: 'Mutation', startOffboarding: { __typename?: 'OffboardingEvent', id: string, status: string } };

export type CompleteAssetReturnMutationVariables = Exact<{
  assetId: Scalars['ID']['input'];
  employeeId: Scalars['ID']['input'];
  condition: Scalars['String']['input'];
  inspectedBy: Scalars['ID']['input'];
}>;


export type CompleteAssetReturnMutation = { __typename?: 'Mutation', completeAssetReturn: { __typename?: 'Asset', id: string, assetTag: string, status: string } };

export type PurchaseRequestFieldsFragment = { __typename?: 'PurchaseRequest', id: string, assetTag: string, category: string, serialNumber: string, purchaseCost?: number | null, purchaseDate?: number | null, requesterEmployeeId: string, requesterEmail: string, status: PurchaseRequestStatus, decidedAt?: number | null, decidedBy?: string | null, createdAt: number, updatedAt: number } & { ' $fragmentName'?: 'PurchaseRequestFieldsFragment' };

export type GetPurchaseRequestsQueryVariables = Exact<{
  status?: InputMaybe<PurchaseRequestStatus>;
}>;


export type GetPurchaseRequestsQuery = { __typename?: 'Query', purchaseRequests: Array<(
    { __typename?: 'PurchaseRequest' }
    & { ' $fragmentRefs'?: { 'PurchaseRequestFieldsFragment': PurchaseRequestFieldsFragment } }
  )> };

export type GetPurchaseRequestQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPurchaseRequestQuery = { __typename?: 'Query', purchaseRequest?: (
    { __typename?: 'PurchaseRequest' }
    & { ' $fragmentRefs'?: { 'PurchaseRequestFieldsFragment': PurchaseRequestFieldsFragment } }
  ) | null };

export type CreatePurchaseRequestMutationVariables = Exact<{
  assetTag: Scalars['String']['input'];
  category: Scalars['String']['input'];
  serialNumber: Scalars['String']['input'];
  purchaseCost?: InputMaybe<Scalars['Int']['input']>;
  purchaseDate?: InputMaybe<Scalars['Float']['input']>;
  requesterEmployeeId: Scalars['ID']['input'];
  requesterEmail: Scalars['String']['input'];
}>;


export type CreatePurchaseRequestMutation = { __typename?: 'Mutation', createPurchaseRequest: (
    { __typename?: 'PurchaseRequest' }
    & { ' $fragmentRefs'?: { 'PurchaseRequestFieldsFragment': PurchaseRequestFieldsFragment } }
  ) };

export type CreatePurchaseRequestBatchMutationVariables = Exact<{
  items: Array<PurchaseRequestItemInput> | PurchaseRequestItemInput;
  requesterEmployeeId: Scalars['ID']['input'];
  requesterEmail: Scalars['String']['input'];
}>;


export type CreatePurchaseRequestBatchMutation = { __typename?: 'Mutation', createPurchaseRequestBatch: Array<(
    { __typename?: 'PurchaseRequest' }
    & { ' $fragmentRefs'?: { 'PurchaseRequestFieldsFragment': PurchaseRequestFieldsFragment } }
  )> };

export type ApprovePurchaseRequestMutationVariables = Exact<{
  token: Scalars['String']['input'];
  approverEmail: Scalars['String']['input'];
}>;


export type ApprovePurchaseRequestMutation = { __typename?: 'Mutation', approvePurchaseRequest: (
    { __typename?: 'PurchaseRequest' }
    & { ' $fragmentRefs'?: { 'PurchaseRequestFieldsFragment': PurchaseRequestFieldsFragment } }
  ) };

export type DeclinePurchaseRequestMutationVariables = Exact<{
  token: Scalars['String']['input'];
  approverEmail: Scalars['String']['input'];
}>;


export type DeclinePurchaseRequestMutation = { __typename?: 'Mutation', declinePurchaseRequest: (
    { __typename?: 'PurchaseRequest' }
    & { ' $fragmentRefs'?: { 'PurchaseRequestFieldsFragment': PurchaseRequestFieldsFragment } }
  ) };

export const EmployeeFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmployeeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Employee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<EmployeeFieldsFragment, unknown>;
export const CategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]} as unknown as DocumentNode<CategoryFieldsFragment, unknown>;
export const VendorFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VendorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vendor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]} as unknown as DocumentNode<VendorFieldsFragment, unknown>;
export const LocationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<LocationFieldsFragment, unknown>;
export const AssetFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AssetFieldsFragment, unknown>;
export const AssignmentFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssignmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assignment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conditionAtAssign"}},{"kind":"Field","name":{"kind":"Name","value":"conditionAtReturn"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedValue"}},{"kind":"Field","name":{"kind":"Name","value":"paymentPlanMonths"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AssignmentFieldsFragment, unknown>;
export const NotificationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<NotificationFieldsFragment, unknown>;
export const PurchaseRequestFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PurchaseRequestFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"decidedAt"}},{"kind":"Field","name":{"kind":"Name","value":"decidedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PurchaseRequestFieldsFragment, unknown>;
export const GetAuditLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuditLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tableName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recordId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auditLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tableName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tableName"}}},{"kind":"Argument","name":{"kind":"Name","value":"recordId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recordId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tableName"}},{"kind":"Field","name":{"kind":"Name","value":"recordId"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"oldValueJson"}},{"kind":"Field","name":{"kind":"Name","value":"newValueJson"}},{"kind":"Field","name":{"kind":"Name","value":"actorId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAuditLogsQuery, GetAuditLogsQueryVariables>;
export const GetMaintenanceTicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMaintenanceTickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maintenanceTickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"reporterId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vendorId"}},{"kind":"Field","name":{"kind":"Name","value":"repairCost"}},{"kind":"Field","name":{"kind":"Name","value":"resolvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMaintenanceTicketsQuery, GetMaintenanceTicketsQueryVariables>;
export const AdminOverrideDisposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminOverrideDisposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOverrideDisposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminOverrideDisposalMutation, AdminOverrideDisposalMutationVariables>;
export const AdminOverridePurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminOverridePurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOverridePurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminOverridePurchaseMutation, AdminOverridePurchaseMutationVariables>;
export const AdminOverrideOffboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminOverrideOffboarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOverrideOffboarding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminOverrideOffboardingMutation, AdminOverrideOffboardingMutationVariables>;
export const CreateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VendorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateVendorMutation, CreateVendorMutationVariables>;
export const UpdateVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VendorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateVendorMutation, UpdateVendorMutationVariables>;
export const DeleteVendorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVendor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteVendor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteVendorMutation, DeleteVendorMutationVariables>;
export const CreateLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateLocationMutation, CreateLocationMutationVariables>;
export const UpdateLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const DeleteLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteLocationMutation, DeleteLocationMutationVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"office"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subCategoryIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"office"},"value":{"kind":"Variable","name":{"kind":"Name","value":"office"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"subCategoryIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subCategoryIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetAssetsQuery, GetAssetsQueryVariables>;
export const GetAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetAssetQuery, GetAssetQueryVariables>;
export const SearchAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetSearchInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetSortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<SearchAssetsQuery, SearchAssetsQueryVariables>;
export const GetAssetHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAssetHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmployeeFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmployeeFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Employee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<GetAssetHistoryQuery, GetAssetHistoryQueryVariables>;
export const GetVendorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetVendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vendors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VendorFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VendorFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vendor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contactName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]} as unknown as DocumentNode<GetVendorsQuery, GetVendorsQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<GetLocationsQuery, GetLocationsQueryVariables>;
export const GetActiveDisposalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActiveDisposals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disposalRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"StringValue","value":"PENDING","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetActiveDisposalsQuery, GetActiveDisposalsQueryVariables>;
export const GetActiveOffboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActiveOffboarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offboardingEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAssets"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetActiveOffboardingQuery, GetActiveOffboardingQueryVariables>;
export const GetEligibleCategoryUpdateAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEligibleCategoryUpdateAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"AVAILABLE"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetEligibleCategoryUpdateAssetsQuery, GetEligibleCategoryUpdateAssetsQueryVariables>;
export const CreateAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateAssetMutation, CreateAssetMutationVariables>;
export const UpdateAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateAssetMutation, UpdateAssetMutationVariables>;
export const DeleteAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const AssignAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conditionAtAssign"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessoriesJson"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedValue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentPlanMonths"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interestRate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"conditionAtAssign"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conditionAtAssign"}}},{"kind":"Argument","name":{"kind":"Name","value":"accessoriesJson"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessoriesJson"}}},{"kind":"Argument","name":{"kind":"Name","value":"assignedValue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedValue"}}},{"kind":"Argument","name":{"kind":"Name","value":"paymentPlanMonths"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentPlanMonths"}}},{"kind":"Argument","name":{"kind":"Name","value":"interestRate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interestRate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AssignAssetMutation, AssignAssetMutationVariables>;
export const ReturnAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReturnAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conditionAtReturn"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returnAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"conditionAtReturn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conditionAtReturn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ReturnAssetMutation, ReturnAssetMutationVariables>;
export const UpdateAssetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssetCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateAssetCategoryMutation, UpdateAssetCategoryMutationVariables>;
export const TransferAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransferAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromEmployeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toEmployeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conditionNoted"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transferAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fromEmployeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromEmployeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"toEmployeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toEmployeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}},{"kind":"Argument","name":{"kind":"Name","value":"conditionNoted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conditionNoted"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"fromEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"toEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"transferredAt"}}]}}]}}]} as unknown as DocumentNode<TransferAssetMutation, TransferAssetMutationVariables>;
export const CreateMaintenanceTicketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMaintenanceTicket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reporterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"severity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repairCost"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMaintenanceTicket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"reporterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reporterId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"severity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"severity"}}},{"kind":"Argument","name":{"kind":"Name","value":"vendorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vendorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repairCost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repairCost"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}}]}}]}}]} as unknown as DocumentNode<CreateMaintenanceTicketMutation, CreateMaintenanceTicketMutationVariables>;
export const RequestDisposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestDisposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestedBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"method"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestDisposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"requestedBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestedBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"method"},"value":{"kind":"Variable","name":{"kind":"Name","value":"method"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}}]}}]}}]} as unknown as DocumentNode<RequestDisposalMutation, RequestDisposalMutationVariables>;
export const ApproveDisposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveDisposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"approvedBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveDisposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"approvedBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"approvedBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ApproveDisposalMutation, ApproveDisposalMutationVariables>;
export const RejectDisposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectDisposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rejectedBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectDisposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"rejectedBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rejectedBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RejectDisposalMutation, RejectDisposalMutationVariables>;
export const AssignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssignmentFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssetFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"currentBookValue"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssignmentFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assignment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"employeeId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"conditionAtAssign"}},{"kind":"Field","name":{"kind":"Name","value":"conditionAtReturn"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedValue"}},{"kind":"Field","name":{"kind":"Name","value":"paymentPlanMonths"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyPayment"}},{"kind":"Field","name":{"kind":"Name","value":"totalPayment"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssetFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<AssignmentsQuery, AssignmentsQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const GetDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserRole"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}},{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itView"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"openTickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingTransfers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"fromEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"toEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"transferredAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"employeeView"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myAssignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"financeView"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingPurchaseRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recentOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalCost"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingDisposals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetDashboardQuery, GetDashboardQueryVariables>;
export const EmployeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entraId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"lastNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"terminationDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVacationDays"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"employeeCode"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isKpi"}},{"kind":"Field","name":{"kind":"Name","value":"isSalaryCompany"}},{"kind":"Field","name":{"kind":"Name","value":"birthDayAndMonth"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayPoster"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<EmployeesQuery, EmployeesQueryVariables>;
export const EmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Employee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entraId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"lastNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"terminationDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVacationDays"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"employeeCode"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isKpi"}},{"kind":"Field","name":{"kind":"Name","value":"isSalaryCompany"}},{"kind":"Field","name":{"kind":"Name","value":"birthDayAndMonth"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayPoster"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<EmployeeQuery, EmployeeQueryVariables>;
export const CreateEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmployeeCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entraId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"lastNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"terminationDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVacationDays"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"employeeCode"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isKpi"}},{"kind":"Field","name":{"kind":"Name","value":"isSalaryCompany"}},{"kind":"Field","name":{"kind":"Name","value":"birthDayAndMonth"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayPoster"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<CreateEmployeeMutation, CreateEmployeeMutationVariables>;
export const UpdateEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmployeeUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entraId"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"lastNameEng"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"terminationDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfVacationDays"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"branch"}},{"kind":"Field","name":{"kind":"Name","value":"employeeCode"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"isKpi"}},{"kind":"Field","name":{"kind":"Name","value":"isSalaryCompany"}},{"kind":"Field","name":{"kind":"Name","value":"birthDayAndMonth"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayPoster"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>;
export const DeleteEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;
export const SendNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<SendNotificationMutation, SendNotificationMutationVariables>;
export const MarkNotificationAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const GetOffboardingEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOffboardingEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offboardingEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}},{"kind":"Field","name":{"kind":"Name","value":"returnedAssets"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiatedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetOffboardingEventQuery, GetOffboardingEventQueryVariables>;
export const StartOffboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartOffboarding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"initiatedBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startOffboarding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"initiatedBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"initiatedBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<StartOffboardingMutation, StartOffboardingMutationVariables>;
export const CompleteAssetReturnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteAssetReturn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"condition"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inspectedBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeAssetReturn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetId"}}},{"kind":"Argument","name":{"kind":"Name","value":"employeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"condition"}}},{"kind":"Argument","name":{"kind":"Name","value":"inspectedBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inspectedBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CompleteAssetReturnMutation, CompleteAssetReturnMutationVariables>;
export const GetPurchaseRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPurchaseRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequestStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"purchaseRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PurchaseRequestFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PurchaseRequestFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"decidedAt"}},{"kind":"Field","name":{"kind":"Name","value":"decidedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPurchaseRequestsQuery, GetPurchaseRequestsQueryVariables>;
export const GetPurchaseRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPurchaseRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"purchaseRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PurchaseRequestFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PurchaseRequestFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"decidedAt"}},{"kind":"Field","name":{"kind":"Name","value":"decidedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetPurchaseRequestQuery, GetPurchaseRequestQueryVariables>;
export const CreatePurchaseRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePurchaseRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetTag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"serialNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purchaseCost"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purchaseDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmployeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPurchaseRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assetTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"serialNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"serialNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"purchaseCost"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purchaseCost"}}},{"kind":"Argument","name":{"kind":"Name","value":"purchaseDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purchaseDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"requesterEmployeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmployeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"requesterEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PurchaseRequestFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PurchaseRequestFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"decidedAt"}},{"kind":"Field","name":{"kind":"Name","value":"decidedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreatePurchaseRequestMutation, CreatePurchaseRequestMutationVariables>;
export const CreatePurchaseRequestBatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePurchaseRequestBatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequestItemInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmployeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPurchaseRequestBatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}},{"kind":"Argument","name":{"kind":"Name","value":"requesterEmployeeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmployeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"requesterEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requesterEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PurchaseRequestFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PurchaseRequestFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"decidedAt"}},{"kind":"Field","name":{"kind":"Name","value":"decidedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreatePurchaseRequestBatchMutation, CreatePurchaseRequestBatchMutationVariables>;
export const ApprovePurchaseRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApprovePurchaseRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"approverEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approvePurchaseRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"approverEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"approverEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PurchaseRequestFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PurchaseRequestFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"decidedAt"}},{"kind":"Field","name":{"kind":"Name","value":"decidedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ApprovePurchaseRequestMutation, ApprovePurchaseRequestMutationVariables>;
export const DeclinePurchaseRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeclinePurchaseRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"approverEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declinePurchaseRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"approverEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"approverEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PurchaseRequestFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PurchaseRequestFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PurchaseRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseCost"}},{"kind":"Field","name":{"kind":"Name","value":"purchaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmployeeId"}},{"kind":"Field","name":{"kind":"Name","value":"requesterEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"decidedAt"}},{"kind":"Field","name":{"kind":"Name","value":"decidedBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<DeclinePurchaseRequestMutation, DeclinePurchaseRequestMutationVariables>;