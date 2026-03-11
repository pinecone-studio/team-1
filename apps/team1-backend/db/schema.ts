import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { sql } from 'drizzle-orm/sql';

export const employees = sqliteTable('employees', {
  id: text('id').primaryKey(),
  entraId: text('entraId').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  firstNameEng: text('firstNameEng').notNull(),
  lastNameEng: text('lastNameEng').notNull(),
  email: text('email').notNull(),
  imageUrl: text('imageUrl'),
  hireDate: integer('hireDate', { mode: 'timestamp' }).notNull(),
  terminationDate: integer('terminationDate', { mode: 'timestamp' }),
  status: text('status')
    .$type<'ACTIVE' | 'ON_LEAVE' | 'TERMINATED'>()
    .notNull()
    .default('ACTIVE'),
  numberOfVacationDays: integer('numberOfVacationDays'),
  github: text('github'),
  department: text('department').notNull(),
  branch: text('branch').notNull(),
  employeeCode: text('employeeCode').notNull().unique(),
  level: text('level').$type<'Junior' | 'Mid' | 'Senior'>().notNull(),
  isKpi: integer('isKpi', { mode: 'boolean' })
    .notNull()
    .default(sql`0`),
  isSalaryCompany: integer('isSalaryCompany', { mode: 'boolean' })
    .notNull()
    .default(sql`1`),
  birthDayAndMonth: text('birthDayAndMonth'),
  birthdayPoster: text('birthdayPoster'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => sql`(unixepoch() * 1000)`),
  deletedAt: integer('deletedAt', { mode: 'timestamp' }),
});

export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(),
  assetTag: text('assetTag').notNull().unique(),
  category: text('category')
    .$type<'MAC' | 'LPT' | 'MON' | 'TVS' | 'PHN' | 'PER'>()
    .notNull(),
  serialNumber: text('serialNumber').notNull().unique(),
  status: text('status')
    .$type<
      | 'AVAILABLE'
      | 'ASSIGNED'
      | 'IN_REPAIR'
      | 'PENDING_DISPOSAL'
      | 'DISPOSED'
      | 'LOST'
    >()
    .notNull()
    .default('AVAILABLE'),
  purchaseDate: integer('purchaseDate', { mode: 'timestamp' }),
  purchaseCost: integer('purchaseCost'),
  currentBookValue: integer('currentBookValue'),
  locationId: text('locationId'),
  assignedTo: text('assignedTo'),
  imageUrl: text('imageUrl'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => sql`(unixepoch() * 1000)`),
  deletedAt: integer('deletedAt', { mode: 'timestamp' }),
});

export const assignments = sqliteTable('assignments', {
  id: text('id').primaryKey(),
  assetId: text('assetId')
    .notNull()
    .references(() => assets.id, { onDelete: 'restrict' }),
  employeeId: text('employeeId')
    .notNull()
    .references(() => employees.id, { onDelete: 'restrict' }),
  assignedAt: integer('assignedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  returnedAt: integer('returnedAt', { mode: 'timestamp' }),
  conditionAtAssign: text('conditionAtAssign').notNull(),
  conditionAtReturn: text('conditionAtReturn'),
  signatureR2Key: text('signatureR2Key'),
  accessoriesJson: text('accessoriesJson', { mode: 'json' }).$type<{
    mouse?: boolean;
    bag?: boolean;
    charger?: boolean;
    adapter?: string[];
    notes?: string;
  }>(),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => sql`(unixepoch() * 1000)`),
  deletedAt: integer('deletedAt', { mode: 'timestamp' }),
});

export const transfers = sqliteTable('transfers', {
  id: text('id').primaryKey(),
  assetId: text('assetId')
    .notNull()
    .references(() => assets.id, { onDelete: 'restrict' }),
  fromEmployeeId: text('fromEmployeeId')
    .notNull()
    .references(() => employees.id, { onDelete: 'restrict' }),
  toEmployeeId: text('toEmployeeId')
    .notNull()
    .references(() => employees.id, { onDelete: 'restrict' }),
  reason: text('reason'),
  approvedBy: text('approvedBy').references(() => employees.id),
  transferredAt: integer('transferredAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  conditionNoted: text('conditionNoted'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

export const maintenanceTickets = sqliteTable('maintenance_tickets', {
  id: text('id').primaryKey(),
  assetId: text('assetId')
    .notNull()
    .references(() => assets.id, { onDelete: 'restrict' }),
  reporterId: text('reporterId')
    .notNull()
    .references(() => employees.id),
  description: text('description').notNull(),
  severity: text('severity')
    .$type<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>()
    .notNull(),
  status: text('status')
    .$type<'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED'>()
    .notNull()
    .default('OPEN'),
  vendorId: text('vendorId'),
  repairCost: integer('repairCost'),
  resolvedAt: integer('resolvedAt', { mode: 'timestamp' }),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => sql`(unixepoch() * 1000)`),
});

export const censusEvents = sqliteTable('census_events', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  scope: text('scope'),
  scopeFilter: text('scopeFilter', { mode: 'json' }),
  startedAt: integer('startedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  closedAt: integer('closedAt', { mode: 'timestamp' }),
  createdBy: text('createdBy')
    .notNull()
    .references(() => employees.id),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => sql`(unixepoch() * 1000)`),
  deletedAt: integer('deletedAt', { mode: 'timestamp' }),
});

export const censusTasks = sqliteTable('census_tasks', {
  id: text('id').primaryKey(),
  censusId: text('censusId')
    .notNull()
    .references(() => censusEvents.id, { onDelete: 'cascade' }),
  assetId: text('assetId')
    .notNull()
    .references(() => assets.id),
  verifierId: text('verifierId')
    .notNull()
    .references(() => employees.id),
  verifiedAt: integer('verifiedAt', { mode: 'timestamp' }),
  conditionReported: text('conditionReported'),
  locationConfirmed: text('locationConfirmed'),
  discrepancyFlag: integer('discrepancyFlag', { mode: 'boolean' })
    .notNull()
    .default(sql`0`),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => sql`(unixepoch() * 1000)`),
});

export const purchaseOrders = sqliteTable('purchase_orders', {
  id: text('id').primaryKey(),
  vendorId: text('vendorId').notNull(),
  requestedBy: text('requestedBy')
    .notNull()
    .references(() => employees.id),
  approvedBy: text('approvedBy').references(() => employees.id),
  // Захиалсан барааны жагсаалт: [{ item: "MacBook", qty: 5, price: 2000 }]
  lineItemsJson: text('lineItemsJson', { mode: 'json' }).notNull(),
  totalCost: integer('totalCost').notNull(),
  status: text('status')
    .$type<'PENDING' | 'APPROVED' | 'ORDERED' | 'DELIVERED' | 'CANCELLED'>()
    .notNull()
    .default('PENDING'),
  deliveredAt: integer('deliveredAt', { mode: 'timestamp' }),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`)
    .$onUpdate(() => sql`(unixepoch() * 1000)`),
  deletedAt: integer('deletedAt', { mode: 'timestamp' }),
});

export const disposalRecords = sqliteTable('disposal_records', {
  id: text('id').primaryKey(),
  assetId: text('assetId')
    .notNull()
    .references(() => assets.id),
  method: text('method').notNull(),
  writeOffValue: integer('writeOffValue'),
  certifiedBy: text('certifiedBy')
    .notNull()
    .references(() => employees.id),
  disposedAt: integer('disposedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  certR2Key: text('certR2Key'),
  recipient: text('recipient'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  tableName: text('tableName').notNull(),
  recordId: text('recordId').notNull(),
  action: text('action').$type<'CREATE' | 'UPDATE' | 'DELETE'>().notNull(),
  // SQLite-д mode: 'json' нь объектыг шууд string болгож хадгална
  oldValueJson: text('oldValueJson', { mode: 'json' }),
  newValueJson: text('newValueJson', { mode: 'json' }),
  actorId: text('actorId')
    .notNull()
    .references(() => employees.id),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

// export const categories = sqliteTable('categories', {
//   id: text('id').primaryKey(),
//   name: text('name').notNull(),
// });

// 2. Locations
// export const locations = sqliteTable('locations', {
//   id: text('id').primaryKey(),
//   name: text('name').notNull(),
// });

// 4. Assets
// export const assets = sqliteTable('assets', {
//   id: text('id').primaryKey(),
//   assetTag: text('asset_tag').notNull().unique(),
//   categoryId: text('category_id').references(() => categories.id),
//   model: text('model'),
//   serialNumber: text('serial_number'),
//   status: text('status').notNull(), // AVAILABLE, ASSIGNED, MAINTENANCE
//   assignedTo: text('assigned_to').references(() => employees.id),
//   purchaseDate: text('purchase_date'),
//   purchaseCost: real('purchase_cost'),
//   locationId: text('location_id').references(() => locations.id),
// });

// Relations
// export const categoriesRelations = relations(categories, ({ many }) => ({
//   assets: many(assets),
// }));

// export const assetsRelations = relations(assets, ({ one, many }) => ({
//   assignmentHistory: many(assignments),
//   currentOwner: one(employees, {
//     fields: [assets.assignedTo],
//     references: [employees.id],
//   }),
//   category: one(categories, {
//     fields: [assets.categoryId],
//     references: [categories.id],
//   }),
// }));

// export const locationsRelations = relations(locations, ({ many }) => ({
//   assets: many(assets),
// }));

// export const employeesRelations = relations(employees, ({ many }) => ({
//   assignedAssets: many(assets),
//   assignmentHistory: many(assignments),
// }));

// export const assignmentsRelations = relations(assignments, ({ one }) => ({
//   asset: one(assets, {
//     fields: [assignments.assetId],
//     references: [assets.id],
//   }),
//   employee: one(employees, {
//     fields: [assignments.employeeId],
//     references: [employees.id],
//   }),
// }));

// export const censusEventsRelations = relations(censusEvents, ({ many }) => ({
//   tasks: many(censusTasks),
// }));

// export const censusTasksRelations = relations(censusTasks, ({ one }) => ({
//   census: one(censusEvents, {
//     fields: [censusTasks.censusId],
//     references: [censusEvents.id],
//   }),
//   asset: one(assets, {
//     fields: [censusTasks.assetId],
//     references: [assets.id],
//   }),
// }));

// export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
//   actor: one(employees, {
//     fields: [auditLogs.actorId],
//     references: [employees.id],
//   }),
// }));

// export type Location = InferSelectModel<typeof locations>;
// export type Employee = InferSelectModel<typeof employees>;
// export type Asset = InferSelectModel<typeof assets>;
// export type Assignment = InferSelectModel<typeof assignments>;
// export type CensusEvent = InferSelectModel<typeof censusEvents>;
// export type CensusTask = InferSelectModel<typeof censusTasks>;
// export type AuditLog = InferSelectModel<typeof auditLogs>;
// export type Category = InferSelectModel<typeof categories>;
