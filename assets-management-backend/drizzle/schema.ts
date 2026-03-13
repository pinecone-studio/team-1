import { sqliteTable, AnySQLiteColumn, integer, text, numeric, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const d1Migrations = sqliteTable("d1_migrations", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text(),
	appliedAt: numeric("applied_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const employees = sqliteTable("employees", {
	id: text().primaryKey(),
	entraId: text().notNull(),
	clerkId: text(),
	role: text().default("EMPLOYEE").notNull(),
	firstName: text().notNull(),
	lastName: text().notNull(),
	firstNameEng: text().notNull(),
	lastNameEng: text().notNull(),
	email: text().notNull(),
	imageUrl: text(),
	hireDate: integer().notNull(),
	terminationDate: integer(),
	status: text().default("ACTIVE").notNull(),
	numberOfVacationDays: integer(),
	github: text(),
	department: text().notNull(),
	branch: text().notNull(),
	employeeCode: text().notNull(),
	level: text().notNull(),
	isKpi: integer().default(0).notNull(),
	isSalaryCompany: integer().default(1).notNull(),
	birthDayAndMonth: text(),
	birthdayPoster: text(),
	createdAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	updatedAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	deletedAt: integer(),
});

export const categories = sqliteTable("categories", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	parentId: text(),
	createdAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const assets = sqliteTable("assets", {
	id: text().primaryKey().notNull(),
	assetTag: text().notNull(),
	serialNumber: text().notNull(),
	status: text().default("AVAILABLE").notNull(),
	purchaseDate: integer(),
	purchaseCost: integer(),
	currentBookValue: integer(),
	locationId: text(),
	assignedTo: text(),
	categoryId: text().references(() => categories.id),
	subCategoryId: text().references(() => categories.id),
	createdAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	updatedAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	deletedAt: integer(),
	imageUrl: text(),
});

export const assignments = sqliteTable("assignments", {
	id: text().primaryKey().notNull(),
	assetId: text().notNull().references(() => assets.id),
	employeeId: text().notNull().references(() => employees.id),
	assignedAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	returnedAt: integer(),
	conditionAtAssign: text().notNull(),
	conditionAtReturn: text(),
	signatureR2Key: text(),
	accessoriesJson: text(),
	createdAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	updatedAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	deletedAt: integer(),
});

export const maintenanceTickets = sqliteTable("maintenance_tickets", {
	id: text().primaryKey().notNull(),
	assetId: text().notNull().references(() => assets.id),
	reporterId: text().notNull().references(() => employees.id),
	description: text().notNull(),
	severity: text().notNull(),
	status: text().default("OPEN").notNull(),
	vendorId: text(),
	repairCost: integer(),
	resolvedAt: integer(),
	createdAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	updatedAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});

export const purchaseRequests = sqliteTable("purchase_requests", {
	id: text().primaryKey().notNull(),
	assetTag: text().notNull(),
	category: text().notNull(),
	serialNumber: text().notNull(),
	purchaseCost: integer(),
	purchaseDate: integer(),
	requesterEmployeeId: text().notNull().references(() => employees.id),
	requesterEmail: text().notNull(),
	status: text().default("PENDING").notNull(),
	token: text().notNull(),
	expiresAt: integer(),
	decidedAt: integer(),
	decidedBy: text(),
	createdAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
	updatedAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});
