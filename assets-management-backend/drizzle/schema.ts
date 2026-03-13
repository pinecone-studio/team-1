import { sqliteTable, AnySQLiteColumn, integer, text, numeric, uniqueIndex, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const d1Migrations = sqliteTable("d1_migrations", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text(),
	appliedAt: numeric("applied_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const assets = sqliteTable("assets", {
	id: text().primaryKey().notNull(),
	assetTag: text().notNull(),
	category: text().notNull(),
	serialNumber: text().notNull(),
	status: text().default("AVAILABLE").notNull(),
	purchaseDate: integer(),
	purchaseCost: integer(),
	currentBookValue: integer(),
	locationId: text(),
	assignedTo: text(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	deletedAt: integer(),
	imageUrl: text(),
},
(table) => [
	uniqueIndex("assets_serialNumber_unique").on(table.serialNumber),
	uniqueIndex("assets_assetTag_unique").on(table.assetTag),
]);

export const assignments = sqliteTable("assignments", {
	id: text().primaryKey().notNull(),
	assetId: text().notNull().references(() => assets.id, { onDelete: "restrict" } ),
	employeeId: text().notNull().references(() => employees.id, { onDelete: "restrict" } ),
	assignedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	returnedAt: integer(),
	conditionAtAssign: text().notNull(),
	conditionAtReturn: text(),
	signatureR2Key: text(),
	accessoriesJson: text(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	deletedAt: integer(),
});

export const auditLogs = sqliteTable("audit_logs", {
	id: text().primaryKey().notNull(),
	tableName: text().notNull(),
	recordId: text().notNull(),
	action: text().notNull(),
	oldValueJson: text(),
	newValueJson: text(),
	actorId: text().notNull().references(() => employees.id),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const censusEvents = sqliteTable("census_events", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	scope: text(),
	scopeFilter: text(),
	startedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	closedAt: integer(),
	createdBy: text().notNull().references(() => employees.id),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	deletedAt: integer(),
});

export const disposalRecords = sqliteTable("disposal_records", {
	id: text().primaryKey().notNull(),
	assetId: text().notNull().references(() => assets.id),
	method: text().notNull(),
	writeOffValue: integer(),
	certifiedBy: text().notNull().references(() => employees.id),
	disposedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	certR2Key: text(),
	recipient: text(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const maintenanceTickets = sqliteTable("maintenance_tickets", {
	id: text().primaryKey().notNull(),
	assetId: text().notNull().references(() => assets.id, { onDelete: "restrict" } ),
	reporterId: text().notNull().references(() => employees.id),
	description: text().notNull(),
	severity: text().notNull(),
	status: text().default("OPEN").notNull(),
	vendorId: text(),
	repairCost: integer(),
	resolvedAt: integer(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const purchaseOrders = sqliteTable("purchase_orders", {
	id: text().primaryKey().notNull(),
	vendorId: text().notNull(),
	requestedBy: text().notNull().references(() => employees.id),
	approvedBy: text().references(() => employees.id),
	lineItemsJson: text().notNull(),
	totalCost: integer().notNull(),
	status: text().default("PENDING").notNull(),
	deliveredAt: integer(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	deletedAt: integer(),
});

export const transfers = sqliteTable("transfers", {
	id: text().primaryKey().notNull(),
	assetId: text().notNull().references(() => assets.id, { onDelete: "restrict" } ),
	fromEmployeeId: text().notNull().references(() => employees.id, { onDelete: "restrict" } ),
	toEmployeeId: text().notNull().references(() => employees.id, { onDelete: "restrict" } ),
	reason: text(),
	approvedBy: text().references(() => employees.id),
	transferredAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	conditionNoted: text(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const censusTasks = sqliteTable("census_tasks", {
	id: text().primaryKey().notNull(),
	censusId: text().notNull().references(() => censusEvents.id, { onDelete: "cascade" } ),
	assetId: text().notNull().references(() => assets.id),
	verifierId: text().notNull().references(() => employees.id),
	verifiedAt: integer(),
	conditionReported: text(),
	locationConfirmed: text(),
	discrepancyFlag: integer().default(0).notNull(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const employees = sqliteTable("employees", {
	id: text().primaryKey().notNull(),
	entraId: text().notNull(),
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
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	deletedAt: integer(),
	clerkId: text(),
	role: text().default("EMPLOYEE").notNull(),
},
(table) => [
	uniqueIndex("employees_clerkId_unique").on(table.clerkId),
	uniqueIndex("employees_employeeCode_unique").on(table.employeeCode),
]);

