import { createAsset } from './create-asset';
import { createAuditLog } from './create-audit-log';
import { createCategory } from './create-category';
import { createDepreciationLog } from './create-depreciation-log';
import { createEmployee } from './create-employee';
import { createLocation } from './create-location';
import { deleteAsset } from './delete-asset';
import { deleteAuditLog } from './delete-audit-log';
import { deleteCategory } from './delete-category';
import { deleteDepreciationLog } from './delete-depreciation-log';
import { deleteEmployee } from './delete-employee';
import { deleteLocation } from './delete-location';
import { updateAsset } from './update-asset';
import { updateAuditLog } from './update-audit-log';
import { updateCategory } from './update-category';
import { updateDepreciationLog } from './update-depreciation-log';
import { updateEmployee } from './update-employee';
import { updateLocation } from './update-location';

export const mutations = {
  createLocation,
  updateLocation,
  deleteLocation,
  createCategory,
  updateCategory,
  deleteCategory,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createAsset,
  updateAsset,
  deleteAsset,
  createAuditLog,
  updateAuditLog,
  deleteAuditLog,
  createDepreciationLog,
  updateDepreciationLog,
  deleteDepreciationLog,
};
