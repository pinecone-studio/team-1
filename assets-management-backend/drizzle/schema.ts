import { sqliteTable, AnySQLiteColumn, integer, text, numeric, foreignKey, index } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const d1Migrations = sqliteTable("d1_migrations", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text(),
	appliedAt: numeric("applied_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const categories = sqliteTable("categories", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	parentId: text(),
	createdAt: integer().default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
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

export const vendors = sqliteTable("vendors", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	contactName: text(),
	email: text(),
	phone: text(),
	address: text(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const locations = sqliteTable("locations", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	parentId: text().references(() => locations.id),
	type: text().notNull(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const assets = sqliteTable(
	"assets",
	{
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
	},
	(table) => ({
		assetsStatusIdx: index("assets_status_idx").on(table.status),
		assetsCategoryIdx: index("assets_category_idx").on(table.categoryId),
		assetsLocationIdx: index("assets_location_idx").on(table.locationId),
		assetsAssignedToIdx: index("assets_assigned_to_idx").on(table.assignedTo),
		assetsFilterIdx: index("assets_filter_idx").on(
			table.status,
			table.categoryId,
			table.locationId,
		),
		assetsCreatedAtIdx: index("assets_created_at_idx").on(table.createdAt),
		assetsDeletedAtIdx: index("assets_deleted_at_idx").on(table.deletedAt),
	}),
);

export const assignments = sqliteTable(
	"assignments",
	{
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
	},
	(table) => ({
		assignmentsAssetIdx: index("assignments_asset_idx").on(table.assetId),
		assignmentsEmployeeIdx: index("assignments_employee_idx").on(table.employeeId),
	}),
);

export const transfers = sqliteTable(
	"transfers",
	{
		id: text().primaryKey().notNull(),
		assetId: text().notNull().references(() => assets.id),
		fromEmployeeId: text().notNull().references(() => employees.id),
		toEmployeeId: text().notNull().references(() => employees.id),
		reason: text(),
		approvedBy: text().references(() => employees.id),
		transferredAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
		conditionNoted: text(),
		createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	},
	(table) => ({
		transfersAssetIdx: index("transfers_asset_idx").on(table.assetId),
		transfersFromEmployeeIdx: index("transfers_from_employee_idx").on(table.fromEmployeeId),
		transfersToEmployeeIdx: index("transfers_to_employee_idx").on(table.toEmployeeId),
	}),
);

export const assetMovements = sqliteTable(
	"asset_movements",
	{
		id: text().primaryKey().notNull(),
		assetId: text().notNull().references(() => assets.id),
		fromLocationId: text().notNull().references(() => locations.id),
		toLocationId: text().notNull().references(() => locations.id),
		movedBy: text().notNull().references(() => employees.id),
		reason: text(),
		movedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	},
	(table) => ({
		assetMovementsAssetIdx: index("asset_movements_asset_idx").on(table.assetId),
		assetMovementsToLocationIdx: index("asset_movements_to_location_idx").on(table.toLocationId),
	}),
);

export const maintenanceTickets = sqliteTable(
	"maintenance_tickets",
	{
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
	},
	(table) => ({
		maintenanceTicketsAssetIdx: index("maintenance_tickets_asset_idx").on(table.assetId),
		maintenanceTicketsStatusIdx: index("maintenance_tickets_status_idx").on(table.status),
	}),
);

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

export const purchaseOrders = sqliteTable(
	"purchase_orders",
	{
		id: text().primaryKey().notNull(),
		vendorId: text().notNull().references(() => vendors.id),
		requestedBy: text().notNull().references(() => employees.id),
		approvedBy: text().references(() => employees.id),
		lineItemsJson: text().notNull(),
		totalCost: integer().notNull(),
		status: text().default("PENDING").notNull(),
		deliveredAt: integer(),
		createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
		updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
		deletedAt: integer(),
	},
	(table) => ({
		purchaseOrdersVendorIdx: index("purchase_orders_vendor_idx").on(table.vendorId),
		purchaseOrdersStatusIdx: index("purchase_orders_status_idx").on(table.status),
	}),
);

export const purchaseOrderItems = sqliteTable("purchase_order_items", {
	id: text().primaryKey().notNull(),
	purchaseOrderId: text()
		.notNull()
		.references(() => purchaseOrders.id, { onDelete: "cascade" }),
	categoryId: text().notNull().references(() => categories.id),
	name: text(),
	quantity: integer().notNull(),
	unitCost: integer().notNull(),
	totalCost: integer().notNull(),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const assetFiles = sqliteTable("asset_files", {
	id: text().primaryKey().notNull(),
	assetId: text().notNull().references(() => assets.id),
	type: text().notNull(),
	fileKey: text().notNull(),
	uploadedBy: text().notNull().references(() => employees.id),
	createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
});

export const disposalRecords = sqliteTable(
	"disposal_records",
	{
		id: text().primaryKey().notNull(),
		assetId: text().notNull().references(() => assets.id),
		method: text().notNull(),
		writeOffValue: integer(),
		certifiedBy: text().notNull().references(() => employees.id),
		disposedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
		certR2Key: text(),
		recipient: text(),
		createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	},
	(table) => ({
		disposalRecordsAssetIdx: index("disposal_records_asset_idx").on(table.assetId),
	}),
);

export const censusEvents = sqliteTable(
	"census_events",
	{
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
	},
);

export const censusTasks = sqliteTable(
	"census_tasks",
	{
		id: text().primaryKey().notNull(),
		censusId: text().notNull().references(() => censusEvents.id),
		assetId: text().notNull().references(() => assets.id),
		verifierId: text().notNull().references(() => employees.id),
		verifiedAt: integer(),
		conditionReported: text(),
		locationConfirmed: text(),
		discrepancyFlag: integer().default(0).notNull(),
		createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
		updatedAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	},
	(table) => ({
		censusTasksAssetIdx: index("census_tasks_asset_idx").on(table.assetId),
		censusTasksCensusIdx: index("census_tasks_census_idx").on(table.censusId),
	}),
);

export const auditLogs = sqliteTable(
	"audit_logs",
	{
		id: text().primaryKey().notNull(),
		tableName: text().notNull(),
		recordId: text().notNull(),
		action: text().notNull(),
		oldValueJson: text(),
		newValueJson: text(),
		actorId: text().notNull().references(() => employees.id),
		createdAt: integer().default(sql`(unixepoch() * 1000)`).notNull(),
	},
	(table) => ({
		auditLogsTableIdx: index("audit_logs_table_idx").on(table.tableName),
		auditLogsRecordIdx: index("audit_logs_record_idx").on(table.recordId),
	}),
);
