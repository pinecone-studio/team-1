import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

// 1. Categories
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

// 2. Locations
export const locations = sqliteTable('locations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

// 3. Employees
export const employees = sqliteTable('employees', {
  id: text('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  department: text('department'),
  branch: text('branch'),
  status: text('status').default('ACTIVE'),
});

// 4. Assets
export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(),
  assetTag: text('asset_tag').notNull().unique(),
  categoryId: text('category_id').references(() => categories.id),
  model: text('model'),
  serialNumber: text('serial_number'),
  status: text('status').notNull(), // AVAILABLE, ASSIGNED, MAINTENANCE
  assignedTo: text('assigned_to').references(() => employees.id),
  purchaseDate: text('purchase_date'),
  purchaseCost: real('purchase_cost'),
  locationId: text('location_id').references(() => locations.id),
});

// 5. Assignments (Түүхэн бүртгэл)
export const assignments = sqliteTable('assignments', {
  id: text('id').primaryKey(),
  assetId: text('asset_id').references(() => assets.id),
  employeeId: text('employee_id').references(() => employees.id),
  assignedAt: text('assigned_at').notNull(),
  returnedAt: text('returned_at'),
  conditionAtAssign: text('condition_at_assign'),
  conditionAtReturn: text('condition_at_return'),
});

// 6. Census Events (Тооллогын үйл ажиллагаа)
export const censusEvents = sqliteTable('census_events', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  deadline: text('deadline').notNull(),
  createdAt: text('created_at').default(new Date().toISOString()),
});

// 7. Census Tasks (Тухайн тооллогонд хамаарах хөрөнгүүд)
export const censusTasks = sqliteTable('census_tasks', {
  id: text('id').primaryKey(),
  censusId: text('census_id').references(() => censusEvents.id),
  assetId: text('asset_id').references(() => assets.id),
  verifiedAt: text('verified_at'),
  conditionReported: text('condition_reported'),
  discrepancyFlag: integer('discrepancy_flag', { mode: 'boolean' }).default(
    false,
  ),
});

// 8. Audit Logs
export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  tableName: text('table_name').notNull(),
  recordId: text('record_id').notNull(),
  action: text('action').notNull(),
  actorId: text('actor_id').references(() => employees.id),
  createdAt: text('created_at').notNull(),
});

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  assets: many(assets),
}));

export const assetsRelations = relations(assets, ({ one, many }) => ({
  assignmentHistory: many(assignments),
  currentOwner: one(employees, {
    fields: [assets.assignedTo],
    references: [employees.id],
  }),
  category: one(categories, {
    fields: [assets.categoryId],
    references: [categories.id],
  }),
}));

export const locationsRelations = relations(locations, ({ many }) => ({
  assets: many(assets),
}));

export const employeesRelations = relations(employees, ({ many }) => ({
  assignedAssets: many(assets),
  assignmentHistory: many(assignments),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  asset: one(assets, { fields: [assignments.assetId], references: [assets.id] }),
  employee: one(employees, {
    fields: [assignments.employeeId],
    references: [employees.id],
  }),
}));

export const censusEventsRelations = relations(censusEvents, ({ many }) => ({
  tasks: many(censusTasks),
}));

export const censusTasksRelations = relations(censusTasks, ({ one }) => ({
  census: one(censusEvents, {
    fields: [censusTasks.censusId],
    references: [censusEvents.id],
  }),
  asset: one(assets, { fields: [censusTasks.assetId], references: [assets.id] }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  actor: one(employees, { fields: [auditLogs.actorId], references: [employees.id] }),
}));

export type Location = InferSelectModel<typeof locations>;
export type Employee = InferSelectModel<typeof employees>;
export type Asset = InferSelectModel<typeof assets>;
export type Assignment = InferSelectModel<typeof assignments>;
export type CensusEvent = InferSelectModel<typeof censusEvents>;
export type CensusTask = InferSelectModel<typeof censusTasks>;
export type AuditLog = InferSelectModel<typeof auditLogs>;
export type Category = InferSelectModel<typeof categories>;
