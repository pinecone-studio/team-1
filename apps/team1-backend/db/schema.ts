import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

import { relations } from 'drizzle-orm'; // Энэ мөрийг нэмэх
// 1. Locations (Байршил)
export const locations = sqliteTable('locations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull(),
});

// 2. Categories (Ангилал)
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

// 3. Employees (Ажилчид)
export const employees = sqliteTable('employees', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  role: text('role').default('USER'), // SUPER_ADMIN, HR_MANAGER, FINANCE, USER
  locationId: text('locationId').references(() => locations.id),
  status: text('status').notNull(),
});

// 4. Assets (Хөрөнгө)
export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(),
  assetTag: text('assetTag').notNull(),
  categoryId: text('categoryId').references(() => categories.id),
  parentAssetId: text('parentAssetId').references((): any => assets.id), // Энд :any нэмэх нь хамгийн хурдан арга
  locationId: text('locationId').references(() => locations.id),
  assignedTo: text('assignedTo').references(() => employees.id),
  status: text('status').notNull(),
  imageR2Key: text('imageR2Key'),
  purchasePrice: real('purchasePrice'),
  currentBookValue: real('currentBookValue'),
  purchaseDate: text('purchaseDate'),
});

// Relation-оо хүснэгтээс гадна тодорхойлох нь илүү найдвартай
export const assetsRelations = relations(assets, ({ one, many }) => ({
  parent: one(assets, {
    fields: [assets.parentAssetId],
    references: [assets.id],
  }),
  children: many(assets),
}));

// 5. Audit Logs (Түүх)
export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  assetId: text('assetId')
    .notNull()
    .references(() => assets.id),
  action: text('action').notNull(),
  actorId: text('actorId').notNull(),
  locationId: text('locationId').references(() => locations.id),
  detailsJson: text('detailsJson'),
  createdAt: text('createdAt').notNull(),
});

// 6. Depreciation Logs (Элэгдэл)
export const depreciationLogs = sqliteTable('depreciation_logs', {
  id: text('id').primaryKey(),
  assetId: text('assetId')
    .notNull()
    .references(() => assets.id),
  period: text('period').notNull(),
  depreciationAmount: real('depreciationAmount').notNull(),
  bookValueAfter: real('bookValueAfter').notNull(),
  calculatedAt: text('calculatedAt').notNull(),
});
