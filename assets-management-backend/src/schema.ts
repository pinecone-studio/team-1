import {
  sqliteTable,
  index,
  text,
  integer,
  numeric,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const ts = () =>
  integer()
    .default(sql`(unixepoch() * 1000)`)
    .notNull();

const timestamps = {
  createdAt: ts(),
  updatedAt: ts(),
};

const softDelete = {
  ...timestamps,
  deletedAt: integer(),
};

export const categories = sqliteTable("categories", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  parentId: text().references((): any => categories.id),
  createdAt: ts(),
});

export const locations = sqliteTable("locations", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  parentId: text().references((): any => locations.id),
  type: text().notNull(),
  createdAt: ts(),
});

export const vendors = sqliteTable("vendors", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  contactName: text(),
  email: text(),
  phone: text(),
  address: text(),
  createdAt: ts(),
});

export const employees = sqliteTable("employees", {
  id: text().primaryKey().notNull(),
  entraId: text(),
  clerkId: text(),
  role: text().default("EMPLOYEE").notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  firstNameEng: text().notNull(),
  lastNameEng: text().notNull(),
  email: text().notNull(),
  imageUrl: text(),
  signUrl: text(),
  hireDate: integer().notNull(),
  terminationDate: integer(),
  status: text().default("INACTIVE").notNull(),
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
  ...softDelete,
});

export const assetModels = sqliteTable(
  "asset_models",
  {
    id: text().primaryKey().notNull(),
    categoryId: text()
      .notNull()
      .references(() => categories.id),
    manufacturer: text().notNull(),
    modelName: text().notNull(),
    modelNumber: text(),
    expectedLifeMonths: integer(),
    depreciationRate: numeric(),
    createdAt: ts(),
  },
  (t) => ({
    categoryIdx: index("asset_models_category_idx").on(t.categoryId),
  }),
);

export const assets = sqliteTable(
  "assets",
  {
    id: text().primaryKey().notNull(),
    assetTag: text().notNull(),
    serialNumber: text().notNull(),
    modelId: text().references(() => assetModels.id),
    mainCategoryId: text().references(() => categories.id),
    categoryId: text().references(() => categories.id),
    status: text().default("AVAILABLE").notNull(),
    purchaseDate: integer(),
    purchaseCost: integer(),
    currentBookValue: integer(),
    locationId: text().references(() => locations.id),
    imageUrl: text(),
    notes: text(),
    condition: text().default("GOOD").notNull(),
    ...softDelete,
  },
  (t) => ({
    statusIdx: index("assets_status_idx").on(t.status),
    mainCategoryIdx: index("assets_main_category_idx").on(t.mainCategoryId),
    categoryIdx: index("assets_category_idx").on(t.categoryId),
    modelIdx: index("assets_model_idx").on(t.modelId),
    locationIdx: index("assets_location_idx").on(t.locationId),
    filterIdx: index("assets_filter_idx").on(
      t.status,
      t.categoryId,
      t.locationId,
    ),
    createdAtIdx: index("assets_created_at_idx").on(t.createdAt),
    deletedAtIdx: index("assets_deleted_at_idx").on(t.deletedAt),
    assetTagIdx: index("assets_asset_tag_idx").on(t.assetTag),
    serialNumIdx: index("assets_serial_number_idx").on(t.serialNumber),
  }),
);

export const assetFiles = sqliteTable("asset_files", {
  id: text().primaryKey().notNull(),
  assetId: text()
    .notNull()
    .references(() => assets.id),
  type: text().notNull(),
  fileKey: text().notNull(),
  uploadedBy: text()
    .notNull()
    .references(() => employees.id),
  createdAt: ts(),
});

// Fix #12 — warranty / contract / license tracking
export const assetContracts = sqliteTable(
  "asset_contracts",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    type: text().notNull(), // WARRANTY | LICENSE | SERVICE
    vendorId: text().references(() => vendors.id),
    startDate: integer().notNull(),
    endDate: integer().notNull(),
    notes: text(),
    documentKey: text(), // R2 key for contract PDF
    createdAt: ts(),
  },
  (t) => ({
    assetIdx: index("asset_contracts_asset_idx").on(t.assetId),
    endDateIdx: index("asset_contracts_end_date_idx").on(t.endDate), // expiry queries
  }),
);

export const assignmentBuyoutPolicies = sqliteTable(
  "assignment_buyout_policies",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    minEmploymentMonths: integer().notNull(),
    paymentPercent: numeric().notNull(),
    isFree: integer().default(0).notNull(),
    categoryId: text().references(() => categories.id),
    isDefault: integer().default(0).notNull(),
    createdAt: ts(),
  },
  (t) => ({
    categoryIdx: index("buyout_category_idx").on(t.categoryId),
  }),
);

export const assignments = sqliteTable(
  "assignments",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    employeeId: text()
      .notNull()
      .references(() => employees.id),
    assignedAt: ts(),
    returnedAt: integer(),
    conditionAtAssign: text().notNull(),
    conditionAtReturn: text(),
    status: text().default("PENDING").notNull(),
    signatureR2Key: text(),
    accessoriesJson: text(),
    buyoutPolicyId: text().references(() => assignmentBuyoutPolicies.id),
    /** Хүлээгдэж буй шилжүүлэлтийг хэн илгээсэн (ASSIGN_REQUESTED үед) */
    requestedByEmployeeId: text().references(() => employees.id),
    ...softDelete,
  },
  (t) => ({
    assetIdx: index("assignments_asset_idx").on(t.assetId),
    employeeIdx: index("assignments_employee_idx").on(t.employeeId),
    statusIdx: index("assignments_status_idx").on(t.status),
  }),
);

export const assignmentFinancing = sqliteTable(
  "assignment_financing",
  {
    id: text().primaryKey().notNull(),
    assignmentId: text()
      .notNull()
      .references(() => assignments.id),
    assignedValue: integer(),
    paymentPlanMonths: integer(),
    interestRate: numeric(),
    monthlyPayment: integer(),
    totalPayment: integer(),
    ...timestamps,
  },
  (t) => ({
    assignmentIdx: index("financing_assignment_idx").on(t.assignmentId),
  }),
);

export const assignmentPayments = sqliteTable(
  "assignment_payments",
  {
    id: text().primaryKey().notNull(),
    financingId: text()
      .notNull()
      .references(() => assignmentFinancing.id),
    amount: integer().notNull(),
    dueDate: integer().notNull(),
    paidAt: integer(),
    status: text().default("PENDING").notNull(), // PENDING | PAID | CANCELLED
    createdAt: ts(),
  },
  (t) => ({
    financingIdx: index("payment_financing_idx").on(t.financingId),
    statusIdx: index("payment_status_idx").on(t.status),
  }),
);

export const transfers = sqliteTable(
  "transfers",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    fromEmployeeId: text()
      .notNull()
      .references(() => employees.id),
    toEmployeeId: text()
      .notNull()
      .references(() => employees.id),
    reason: text(),
    approvedBy: text().references(() => employees.id),
    conditionNoted: text(),
    transferredAt: ts(),
    createdAt: ts(),
  },
  (t) => ({
    assetIdx: index("transfers_asset_idx").on(t.assetId),
    fromEmployeeIdx: index("transfers_from_employee_idx").on(t.fromEmployeeId),
    toEmployeeIdx: index("transfers_to_employee_idx").on(t.toEmployeeId),
  }),
);

export const assetMovements = sqliteTable(
  "asset_movements",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    fromLocationId: text()
      .notNull()
      .references(() => locations.id),
    toLocationId: text()
      .notNull()
      .references(() => locations.id),
    movedBy: text()
      .notNull()
      .references(() => employees.id),
    reason: text(),
    movedAt: ts(),
  },
  (t) => ({
    assetIdx: index("asset_movements_asset_idx").on(t.assetId),
    toLocationIdx: index("asset_movements_to_location_idx").on(t.toLocationId),
  }),
);

export const maintenanceTickets = sqliteTable(
  "maintenance_tickets",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    reporterId: text()
      .notNull()
      .references(() => employees.id),
    description: text().notNull(),
    severity: text().notNull(), // LOW | MEDIUM | HIGH | CRITICAL
    status: text().default("OPEN").notNull(), // OPEN | IN_PROGRESS | RESOLVED | CLOSED
    // Fix #1: vendorId now has a proper FK reference
    vendorId: text().references(() => vendors.id),
    repairCost: integer(),
    slaDeadline: integer(),
    resolvedAt: integer(),
    ...timestamps,
  },
  (t) => ({
    assetIdx: index("maintenance_tickets_asset_idx").on(t.assetId),
    statusIdx: index("maintenance_tickets_status_idx").on(t.status),
    slaIdx: index("maintenance_tickets_sla_idx").on(t.slaDeadline),
  }),
);

export const purchaseRequests = sqliteTable(
  "purchase_requests",
  {
    id: text().primaryKey().notNull(),
    categoryId: text()
      .notNull()
      .references(() => categories.id),
    modelId: text().references(() => assetModels.id),
    assetTag: text().notNull(),
    serialNumber: text().notNull(),
    purchaseCost: integer(),
    purchaseDate: integer(),
    requesterEmployeeId: text()
      .notNull()
      .references(() => employees.id),
    requesterEmail: text().notNull(),
    status: text().default("PENDING").notNull(),
    token: text().notNull(),
    expiresAt: integer(),
    decidedAt: integer(),
    decidedBy: text().references(() => employees.id),
    resolvedAssetId: text().references(() => assets.id),
    ...timestamps,
  },
  (t) => ({
    categoryIdx: index("purchase_requests_category_idx").on(t.categoryId),
    resolvedAssetIdx: index("purchase_requests_asset_idx").on(
      t.resolvedAssetId,
    ),
  }),
);

export const purchaseOrders = sqliteTable(
  "purchase_orders",
  {
    id: text().primaryKey().notNull(),
    vendorId: text()
      .notNull()
      .references(() => vendors.id),
    requestedBy: text()
      .notNull()
      .references(() => employees.id),
    approvedBy: text().references(() => employees.id),
    // Fix #2: lineItemsJson removed — purchaseOrderItems is the source of truth
    totalCost: integer().notNull(),
    status: text().default("PENDING").notNull(),
    deliveredAt: integer(),
    ...softDelete,
  },
  (t) => ({
    vendorIdx: index("purchase_orders_vendor_idx").on(t.vendorId),
    statusIdx: index("purchase_orders_status_idx").on(t.status),
  }),
);

export const purchaseOrderItems = sqliteTable(
  "purchase_order_items",
  {
    id: text().primaryKey().notNull(),
    purchaseOrderId: text()
      .notNull()
      .references(() => purchaseOrders.id, { onDelete: "cascade" }),
    categoryId: text()
      .notNull()
      .references(() => categories.id),
    // Fix #5: modelId on line items ties orders to the spec table
    modelId: text().references(() => assetModels.id),
    name: text(),
    quantity: integer().notNull(),
    unitCost: integer().notNull(),
    totalCost: integer().notNull(),
    createdAt: ts(),
  },
  (t) => ({
    orderIdx: index("purchase_order_items_order_idx").on(t.purchaseOrderId),
  }),
);

export const disposalRequests = sqliteTable(
  "disposal_requests",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    requestedBy: text()
      .notNull()
      .references(() => employees.id),
    method: text().notNull(), // DONATE | RECYCLE | SELL | DESTROY
    reason: text(),
    status: text().default("PENDING").notNull(),
    itApprovedBy: text().references(() => employees.id),
    itApprovedAt: integer(),
    financeApprovedBy: text().references(() => employees.id),
    financeApprovedAt: integer(),
    dataWipeCertKey: text(),
    rejectedBy: text().references(() => employees.id),
    rejectedAt: integer(),
    rejectionReason: text(),
    ...timestamps,
  },
  (t) => ({
    assetIdx: index("disposal_requests_asset_idx").on(t.assetId),
    statusIdx: index("disposal_requests_status_idx").on(t.status),
  }),
);

export const disposalRecords = sqliteTable(
  "disposal_records",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    method: text().notNull(),
    writeOffValue: integer(),
    certifiedBy: text()
      .notNull()
      .references(() => employees.id),
    certR2Key: text(),
    recipient: text(),
    disposedAt: ts(),
    createdAt: ts(),
  },
  (t) => ({
    assetIdx: index("disposal_records_asset_idx").on(t.assetId),
  }),
);

export const offboardingEvents = sqliteTable(
  "offboarding_events",
  {
    id: text().primaryKey().notNull(),
    employeeId: text()
      .notNull()
      .references(() => employees.id),
    /**
     * Demo-friendly: allow system initiators like "HR" by storing null
     * (while keeping the label in audit/newValueJson).
     */
    initiatedBy: text().references(() => employees.id),
    status: text().default("IN_PROGRESS").notNull(),
    totalAssets: integer().default(0).notNull(),
    returnedAssets: integer().default(0).notNull(),
    assetIdsJson: text().default("[]").notNull(),
    deadline: integer(),
    completedAt: integer(),
    ...timestamps,
  },
  (t) => ({
    employeeIdx: index("offboarding_events_employee_id_idx").on(t.employeeId),
    statusIdx: index("offboarding_events_status_value_idx").on(t.status),
  }),
);

/** Ажилтан буцаах хүсэлт илгээсэн, HR шалгах хүртэл хадгалагдах. */
export const offboardingReturnRequests = sqliteTable(
  "offboarding_return_requests",
  {
    id: text().primaryKey().notNull(),
    offboardingEventId: text()
      .notNull()
      .references(() => offboardingEvents.id),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    assignmentId: text()
      .notNull()
      .references(() => assignments.id),
    employeeId: text()
      .notNull()
      .references(() => employees.id),
    conditionEmployee: text().notNull(),
    status: text().default("PENDING_HR").notNull(),
    conditionHr: text(),
    photoR2Key: text(),
    inspectedBy: text().references(() => employees.id),
    ...timestamps,
  },
  (t) => ({
    eventIdx: index("offboarding_return_requests_event_idx").on(
      t.offboardingEventId,
    ),
    assetIdx: index("offboarding_return_requests_asset_idx").on(t.assetId),
    statusIdx: index("offboarding_return_requests_status_idx").on(t.status),
  }),
);

/** IT-д өгөгдөл цэвэрлэлт хийх даалгавар (HR approve хийсний дараа) */
export const dataWipeTasks = sqliteTable(
  "data_wipe_tasks",
  {
    id: text().primaryKey().notNull(),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    status: text().default("PENDING").notNull(),
    ...timestamps,
  },
  (t) => ({
    assetIdx: index("data_wipe_tasks_asset_idx").on(t.assetId),
    statusIdx: index("data_wipe_tasks_status_idx").on(t.status),
  }),
);

export const censusEvents = sqliteTable(
  "census_events",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    /** ORG | EMPLOYEES */
    scope: text().notNull(),
    /** JSON string (e.g. selected employeeIds) */
    scopeFilter: text(),
    createdBy: text()
      .notNull()
      .references(() => employees.id),
    startedAt: ts(),
    closedAt: integer(),
    ...timestamps,
  },
  (t) => ({
    statusIdx: index("census_events_closed_at_idx").on(t.closedAt),
  }),
);

export const censusTasks = sqliteTable(
  "census_tasks",
  {
    id: text().primaryKey().notNull(),
    censusId: text()
      .notNull()
      .references(() => censusEvents.id),
    assetId: text()
      .notNull()
      .references(() => assets.id),
    /**
     * Employee who should verify (asset owner at census start).
     * Null for unassigned assets (still included in ORG scope).
     */
    verifierId: text().references(() => employees.id),
    /** PENDING | CONFIRMED | NOT_AVAILABLE */
    status: text().default("PENDING").notNull(),
    /** BROKEN | LOST | TRANSFERRED */
    reason: text(),
    transferredToEmployeeId: text().references(() => employees.id),
    respondedAt: integer(),
    /** Kept for compatibility with earlier drafts */
    conditionReported: text(),
    locationConfirmed: text(),
    discrepancyFlag: integer().default(0).notNull(),
    ...timestamps,
  },
  (t) => ({
    assetIdx: index("census_tasks_asset_id_idx").on(t.assetId),
    censusIdx: index("census_tasks_census_id_idx").on(t.censusId),
    verifierIdx: index("census_tasks_verifier_id_idx").on(t.verifierId),
    statusIdx: index("census_tasks_status_value_idx").on(t.status),
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
    actorId: text().references(() => employees.id),
    createdAt: ts(),
  },
  (t) => ({
    tableIdx: index("audit_logs_table_name_idx").on(t.tableName),
    recordIdx: index("audit_logs_record_id_idx").on(t.recordId),
    actorIdx: index("audit_logs_actor_id_idx").on(t.actorId),
  }),
);

/** Нэгдсэн мэдэгдэл хүснэгт (employee эсвэл role-оор чиглэгдэнэ) */
export const notifications = sqliteTable(
  "notifications",
  {
    id: text().primaryKey().notNull(),
    employeeId: text().references(() => employees.id),
    role: text(),
    title: text().notNull(),
    message: text().notNull(),
    type: text().default("INFO").notNull(),
    link: text(),
    isRead: integer().default(0).notNull(),
    createdAt: ts(),
  },
  (t) => ({
    employeeIdx: index("notifications_employee_idx").on(t.employeeId),
    roleIdx: index("notifications_role_idx").on(t.role),
    readIdx: index("notifications_read_idx").on(t.isRead),
  }),
);

export const employeeNotifications = sqliteTable(
  "employee_notifications",
  {
    id: text().primaryKey().notNull(),
    employeeId: text()
      .notNull()
      .references(() => employees.id),
    title: text().notNull(),
    message: text().notNull(),
    type: text().default("INFO").notNull(),
    link: text(),
    isRead: integer().default(0).notNull(),
    createdAt: ts(),
  },
  (t) => ({
    employeeIdx: index("emp_notif_employee_idx").on(t.employeeId),
    readIdx: index("emp_notif_read_idx").on(t.employeeId, t.isRead),
  }),
);

export const roleNotifications = sqliteTable(
  "role_notifications",
  {
    id: text().primaryKey().notNull(),
    role: text().notNull(),
    title: text().notNull(),
    message: text().notNull(),
    type: text().default("INFO").notNull(),
    link: text(),
    createdAt: ts(),
  },
  (t) => ({
    roleIdx: index("role_notif_role_idx").on(t.role),
  }),
);

export const roleNotificationReads = sqliteTable(
  "role_notification_reads",
  {
    id: text().primaryKey().notNull(),
    notificationId: text()
      .notNull()
      .references(() => roleNotifications.id),
    employeeId: text()
      .notNull()
      .references(() => employees.id),
    readAt: ts(),
  },
  (t) => ({
    notifIdx: index("role_notif_reads_notif_idx").on(t.notificationId),
    employeeIdx: index("role_notif_reads_emp_idx").on(t.employeeId),
    uniqueIdx: index("role_notif_reads_unique_idx").on(
      t.notificationId,
      t.employeeId,
    ),
  }),
);
