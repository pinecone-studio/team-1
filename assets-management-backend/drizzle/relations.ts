import { relations } from "drizzle-orm/relations";
import { categories, assets, employees, assignments, maintenanceTickets } from "./schema";

export const assetsRelations = relations(assets, ({one, many}) => ({
	category_subCategoryId: one(categories, {
		fields: [assets.subCategoryId],
		references: [categories.id],
		relationName: "assets_subCategoryId_categories_id"
	}),
	category_categoryId: one(categories, {
		fields: [assets.categoryId],
		references: [categories.id],
		relationName: "assets_categoryId_categories_id"
	}),
	assignments: many(assignments),
	maintenanceTickets: many(maintenanceTickets),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	assets_subCategoryId: many(assets, {
		relationName: "assets_subCategoryId_categories_id"
	}),
	assets_categoryId: many(assets, {
		relationName: "assets_categoryId_categories_id"
	}),
}));

export const assignmentsRelations = relations(assignments, ({one}) => ({
	employee: one(employees, {
		fields: [assignments.employeeId],
		references: [employees.id]
	}),
	asset: one(assets, {
		fields: [assignments.assetId],
		references: [assets.id]
	}),
}));

export const employeesRelations = relations(employees, ({many}) => ({
	assignments: many(assignments),
	maintenanceTickets: many(maintenanceTickets),
}));

export const maintenanceTicketsRelations = relations(maintenanceTickets, ({one}) => ({
	employee: one(employees, {
		fields: [maintenanceTickets.reporterId],
		references: [employees.id]
	}),
	asset: one(assets, {
		fields: [maintenanceTickets.assetId],
		references: [assets.id]
	}),
}));