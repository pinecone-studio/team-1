import { getAsset } from './get-asset';
import { getAssets } from './get-assets';
import { getAssetsByEmployee } from './get-assets-by-employee';
import { getAssetsByLocation } from './get-assets-by-location';
import { getAuditLog } from './get-audit-log';
import { getAuditLogs } from './get-audit-logs';
import { getAuditLogsByAsset } from './get-audit-logs-by-asset';
import { getCategories } from './get-categories';
import { getCategory } from './get-category';
import { getDepreciationLog } from './get-depreciation-log';
import { getDepreciationLogs } from './get-depreciation-logs';
import { getDepreciationLogsByAsset } from './get-depreciation-logs-by-asset';
import { getEmployee } from './get-employee';
import { getEmployees } from './get-employees';
import { getEmployeesByLocation } from './get-employees-by-location';
import { getLocations } from './get-locations';

export const queries = {
  locations: getLocations,
  categories: getCategories,
  category: getCategory,
  employees: getEmployees,
  employee: getEmployee,
  assets: getAssets,
  asset: getAsset,
  auditLogs: getAuditLogs,
  auditLog: getAuditLog,
  depreciationLogs: getDepreciationLogs,
  depreciationLog: getDepreciationLog,
  employeesByLocation: getEmployeesByLocation,
  assetsByLocation: getAssetsByLocation,
  assetsByEmployee: getAssetsByEmployee,
  auditLogsByAsset: getAuditLogsByAsset,
  depreciationLogsByAsset: getDepreciationLogsByAsset,
};
