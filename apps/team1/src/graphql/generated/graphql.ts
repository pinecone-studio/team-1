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
  assignedEmployee?: Maybe<Employee>;
  assignedTo?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  children: Array<Asset>;
  currentBookValue?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  imageR2Key?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Asset>;
  parentAssetId?: Maybe<Scalars['String']['output']>;
  purchaseDate?: Maybe<Scalars['String']['output']>;
  purchasePrice?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
};

export type AssetCreateInput = {
  assetTag: Scalars['String']['input'];
  assignedTo?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  currentBookValue?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  imageR2Key?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  parentAssetId?: InputMaybe<Scalars['String']['input']>;
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  purchasePrice?: InputMaybe<Scalars['Float']['input']>;
  status: Scalars['String']['input'];
};

export type AssetUpdateInput = {
  assetTag?: InputMaybe<Scalars['String']['input']>;
  assignedTo?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  currentBookValue?: InputMaybe<Scalars['Float']['input']>;
  imageR2Key?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  parentAssetId?: InputMaybe<Scalars['String']['input']>;
  purchaseDate?: InputMaybe<Scalars['String']['input']>;
  purchasePrice?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type AuditLog = {
  __typename?: 'AuditLog';
  action: Scalars['String']['output'];
  actorId: Scalars['String']['output'];
  asset?: Maybe<Asset>;
  assetId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  detailsJson?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['String']['output']>;
};

export type AuditLogCreateInput = {
  action: Scalars['String']['input'];
  actorId: Scalars['String']['input'];
  assetId: Scalars['String']['input'];
  createdAt: Scalars['String']['input'];
  detailsJson?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
};

export type AuditLogUpdateInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  actorId?: InputMaybe<Scalars['String']['input']>;
  assetId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  detailsJson?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CategoryCreateInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type CategoryUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DepreciationLog = {
  __typename?: 'DepreciationLog';
  asset?: Maybe<Asset>;
  assetId: Scalars['String']['output'];
  bookValueAfter: Scalars['Float']['output'];
  calculatedAt: Scalars['String']['output'];
  depreciationAmount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  period: Scalars['String']['output'];
};

export type DepreciationLogCreateInput = {
  assetId: Scalars['String']['input'];
  bookValueAfter: Scalars['Float']['input'];
  calculatedAt: Scalars['String']['input'];
  depreciationAmount: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  period: Scalars['String']['input'];
};

export type DepreciationLogUpdateInput = {
  assetId?: InputMaybe<Scalars['String']['input']>;
  bookValueAfter?: InputMaybe<Scalars['Float']['input']>;
  calculatedAt?: InputMaybe<Scalars['String']['input']>;
  depreciationAmount?: InputMaybe<Scalars['Float']['input']>;
  period?: InputMaybe<Scalars['String']['input']>;
};

export type Employee = {
  __typename?: 'Employee';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type EmployeeCreateInput = {
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
};

export type EmployeeUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Location = {
  __typename?: 'Location';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type LocationCreateInput = {
  code: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type LocationUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Asset;
  createAuditLog: AuditLog;
  createCategory: Category;
  createDepreciationLog: DepreciationLog;
  createEmployee: Employee;
  createLocation: Location;
  deleteAsset: Scalars['Boolean']['output'];
  deleteAuditLog: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  deleteDepreciationLog: Scalars['Boolean']['output'];
  deleteEmployee: Scalars['Boolean']['output'];
  deleteLocation: Scalars['Boolean']['output'];
  updateAsset?: Maybe<Asset>;
  updateAuditLog?: Maybe<AuditLog>;
  updateCategory?: Maybe<Category>;
  updateDepreciationLog?: Maybe<DepreciationLog>;
  updateEmployee?: Maybe<Employee>;
  updateLocation?: Maybe<Location>;
};


export type MutationCreateAssetArgs = {
  input: AssetCreateInput;
};


export type MutationCreateAuditLogArgs = {
  input: AuditLogCreateInput;
};


export type MutationCreateCategoryArgs = {
  input: CategoryCreateInput;
};


export type MutationCreateDepreciationLogArgs = {
  input: DepreciationLogCreateInput;
};


export type MutationCreateEmployeeArgs = {
  input: EmployeeCreateInput;
};


export type MutationCreateLocationArgs = {
  input: LocationCreateInput;
};


export type MutationDeleteAssetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAuditLogArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDepreciationLogArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAssetArgs = {
  id: Scalars['ID']['input'];
  input: AssetUpdateInput;
};


export type MutationUpdateAuditLogArgs = {
  id: Scalars['ID']['input'];
  input: AuditLogUpdateInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: CategoryUpdateInput;
};


export type MutationUpdateDepreciationLogArgs = {
  id: Scalars['ID']['input'];
  input: DepreciationLogUpdateInput;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['ID']['input'];
  input: EmployeeUpdateInput;
};


export type MutationUpdateLocationArgs = {
  id: Scalars['ID']['input'];
  input: LocationUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  assetsByEmployee: Array<Asset>;
  assetsByLocation: Array<Asset>;
  auditLog?: Maybe<AuditLog>;
  auditLogs: Array<AuditLog>;
  auditLogsByAsset: Array<AuditLog>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  depreciationLog?: Maybe<DepreciationLog>;
  depreciationLogs: Array<DepreciationLog>;
  depreciationLogsByAsset: Array<DepreciationLog>;
  employee?: Maybe<Employee>;
  employees: Array<Employee>;
  employeesByLocation: Array<Employee>;
  location?: Maybe<Location>;
  locations: Array<Location>;
};


export type QueryAssetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssetsByEmployeeArgs = {
  employeeId: Scalars['String']['input'];
};


export type QueryAssetsByLocationArgs = {
  locationId: Scalars['String']['input'];
};


export type QueryAuditLogArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuditLogsByAssetArgs = {
  assetId: Scalars['String']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDepreciationLogArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDepreciationLogsByAssetArgs = {
  assetId: Scalars['String']['input'];
};


export type QueryEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeesByLocationArgs = {
  locationId: Scalars['String']['input'];
};


export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};

export type AssetsDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type AssetsDashboardQuery = { __typename?: 'Query', assets: Array<{ __typename?: 'Asset', id: string, assetTag: string, status: string, category?: { __typename?: 'Category', id: string, name: string } | null, location?: { __typename?: 'Location', id: string, name: string } | null, assignedEmployee?: { __typename?: 'Employee', id: string, email: string } | null }> };


export const AssetsDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssetsDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assetTag"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedEmployee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<AssetsDashboardQuery, AssetsDashboardQueryVariables>;