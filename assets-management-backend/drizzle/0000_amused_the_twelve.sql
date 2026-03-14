CREATE TABLE `asset_files` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`type` text NOT NULL,
	`fileKey` text NOT NULL,
	`uploadedBy` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`uploadedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_movements` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`fromLocationId` text NOT NULL,
	`toLocationId` text NOT NULL,
	`movedBy` text NOT NULL,
	`reason` text,
	`movedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fromLocationId`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`toLocationId`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`movedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `asset_movements_asset_idx` ON `asset_movements` (`assetId`);--> statement-breakpoint
CREATE INDEX `asset_movements_to_location_idx` ON `asset_movements` (`toLocationId`);--> statement-breakpoint
CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`assetTag` text NOT NULL,
	`serialNumber` text NOT NULL,
	`status` text DEFAULT 'AVAILABLE' NOT NULL,
	`purchaseDate` integer,
	`purchaseCost` integer,
	`currentBookValue` integer,
	`locationId` text,
	`assignedTo` text,
	`categoryId` text,
	`subCategoryId` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`deletedAt` integer,
	`imageUrl` text,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subCategoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `assets_status_idx` ON `assets` (`status`);--> statement-breakpoint
CREATE INDEX `assets_category_idx` ON `assets` (`categoryId`);--> statement-breakpoint
CREATE INDEX `assets_location_idx` ON `assets` (`locationId`);--> statement-breakpoint
CREATE INDEX `assets_assigned_to_idx` ON `assets` (`assignedTo`);--> statement-breakpoint
CREATE INDEX `assets_filter_idx` ON `assets` (`status`,`categoryId`,`locationId`);--> statement-breakpoint
CREATE INDEX `assets_created_at_idx` ON `assets` (`createdAt`);--> statement-breakpoint
CREATE INDEX `assets_deleted_at_idx` ON `assets` (`deletedAt`);--> statement-breakpoint
CREATE INDEX `assets_asset_tag_idx` ON `assets` (`assetTag`);--> statement-breakpoint
CREATE INDEX `assets_serial_number_idx` ON `assets` (`serialNumber`);--> statement-breakpoint
CREATE TABLE `assignment_buyout_policies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`minEmploymentMonths` integer NOT NULL,
	`paymentPercent` numeric NOT NULL,
	`isFree` integer DEFAULT 0 NOT NULL,
	`categoryId` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `buyout_category_idx` ON `assignment_buyout_policies` (`categoryId`);--> statement-breakpoint
CREATE TABLE `assignment_financing` (
	`id` text PRIMARY KEY NOT NULL,
	`assignmentId` text NOT NULL,
	`assignedValue` integer,
	`paymentPlanMonths` integer,
	`interestRate` numeric,
	`monthlyPayment` integer,
	`totalPayment` integer,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assignmentId`) REFERENCES `assignments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `financing_assignment_idx` ON `assignment_financing` (`assignmentId`);--> statement-breakpoint
CREATE TABLE `assignment_payments` (
	`id` text PRIMARY KEY NOT NULL,
	`financingId` text NOT NULL,
	`amount` integer NOT NULL,
	`dueDate` integer NOT NULL,
	`paidAt` integer,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`financingId`) REFERENCES `assignment_financing`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `payment_financing_idx` ON `assignment_payments` (`financingId`);--> statement-breakpoint
CREATE INDEX `payment_status_idx` ON `assignment_payments` (`status`);--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`employeeId` text NOT NULL,
	`assignedAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`returnedAt` integer,
	`conditionAtAssign` text NOT NULL,
	`conditionAtReturn` text,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`signatureR2Key` text,
	`accessoriesJson` text,
	`buyoutPolicyId` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`buyoutPolicyId`) REFERENCES `assignment_buyout_policies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `assignments_asset_idx` ON `assignments` (`assetId`);--> statement-breakpoint
CREATE INDEX `assignments_employee_idx` ON `assignments` (`employeeId`);--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`tableName` text NOT NULL,
	`recordId` text NOT NULL,
	`action` text NOT NULL,
	`oldValueJson` text,
	`newValueJson` text,
	`actorId` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`actorId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `audit_logs_table_idx` ON `audit_logs` (`tableName`);--> statement-breakpoint
CREATE INDEX `audit_logs_record_idx` ON `audit_logs` (`recordId`);--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`parentId` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `census_events` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`scope` text,
	`scopeFilter` text,
	`startedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`closedAt` integer,
	`createdBy` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`createdBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `census_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`censusId` text NOT NULL,
	`assetId` text NOT NULL,
	`verifierId` text NOT NULL,
	`verifiedAt` integer,
	`conditionReported` text,
	`locationConfirmed` text,
	`discrepancyFlag` integer DEFAULT 0 NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`censusId`) REFERENCES `census_events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`verifierId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `census_tasks_asset_idx` ON `census_tasks` (`assetId`);--> statement-breakpoint
CREATE INDEX `census_tasks_census_idx` ON `census_tasks` (`censusId`);--> statement-breakpoint

--> statement-breakpoint
CREATE TABLE `disposal_records` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`method` text NOT NULL,
	`writeOffValue` integer,
	`certifiedBy` text NOT NULL,
	`disposedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`certR2Key` text,
	`recipient` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`certifiedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `disposal_records_asset_idx` ON `disposal_records` (`assetId`);--> statement-breakpoint
CREATE TABLE `disposal_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`requestedBy` text NOT NULL,
	`method` text NOT NULL,
	`reason` text,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`itApprovedBy` text,
	`itApprovedAt` integer,
	`financeApprovedBy` text,
	`financeApprovedAt` integer,
	`dataWipeCertKey` text,
	`rejectedBy` text,
	`rejectedAt` integer,
	`rejectionReason` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`requestedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`itApprovedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`financeApprovedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`rejectedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `disposal_requests_asset_idx` ON `disposal_requests` (`assetId`);--> statement-breakpoint
CREATE INDEX `disposal_requests_status_idx` ON `disposal_requests` (`status`);--> statement-breakpoint
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`entraId` text NOT NULL,
	`clerkId` text,
	`role` text DEFAULT 'EMPLOYEE' NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`firstNameEng` text NOT NULL,
	`lastNameEng` text NOT NULL,
	`email` text NOT NULL,
	`imageUrl` text,
	`hireDate` integer NOT NULL,
	`terminationDate` integer,
	`status` text DEFAULT 'ACTIVE' NOT NULL,
	`numberOfVacationDays` integer,
	`github` text,
	`department` text NOT NULL,
	`branch` text NOT NULL,
	`employeeCode` text NOT NULL,
	`level` text NOT NULL,
	`isKpi` integer DEFAULT 0 NOT NULL,
	`isSalaryCompany` integer DEFAULT 1 NOT NULL,
	`birthDayAndMonth` text,
	`birthdayPoster` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`parent_id` text,
	`type` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `maintenance_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`reporterId` text NOT NULL,
	`description` text NOT NULL,
	`severity` text NOT NULL,
	`status` text DEFAULT 'OPEN' NOT NULL,
	`vendorId` text,
	`repairCost` integer,
	`resolvedAt` integer,
	`createdAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reporterId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `maintenance_tickets_asset_idx` ON `maintenance_tickets` (`assetId`);--> statement-breakpoint
CREATE INDEX `maintenance_tickets_status_idx` ON `maintenance_tickets` (`status`);--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`employeeId` text,
	`role` text,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`type` text DEFAULT 'INFO' NOT NULL,
	`link` text,
	`isRead` integer DEFAULT 0 NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `notifications_employee_idx` ON `notifications` (`employeeId`);--> statement-breakpoint
CREATE INDEX `notifications_role_idx` ON `notifications` (`role`);--> statement-breakpoint
CREATE INDEX `notifications_read_idx` ON `notifications` (`isRead`);--> statement-breakpoint
CREATE TABLE `offboarding_events` (
	`id` text PRIMARY KEY NOT NULL,
	`employeeId` text NOT NULL,
	`initiatedBy` text NOT NULL,
	`status` text DEFAULT 'IN_PROGRESS' NOT NULL,
	`totalAssets` integer DEFAULT 0 NOT NULL,
	`returnedAssets` integer DEFAULT 0 NOT NULL,
	`completedAt` integer,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`initiatedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `offboarding_events_employee_idx` ON `offboarding_events` (`employeeId`);--> statement-breakpoint
CREATE INDEX `offboarding_events_status_idx` ON `offboarding_events` (`status`);--> statement-breakpoint
CREATE TABLE `purchase_order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`purchaseOrderId` text NOT NULL,
	`categoryId` text NOT NULL,
	`name` text,
	`quantity` integer NOT NULL,
	`unitCost` integer NOT NULL,
	`totalCost` integer NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`purchaseOrderId`) REFERENCES `purchase_orders`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `purchase_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`vendorId` text NOT NULL,
	`requestedBy` text NOT NULL,
	`approvedBy` text,
	`lineItemsJson` text NOT NULL,
	`totalCost` integer NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`deliveredAt` integer,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`vendorId`) REFERENCES `vendors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`requestedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`approvedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `purchase_orders_vendor_idx` ON `purchase_orders` (`vendorId`);--> statement-breakpoint
CREATE INDEX `purchase_orders_status_idx` ON `purchase_orders` (`status`);--> statement-breakpoint
CREATE TABLE `purchase_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`assetTag` text NOT NULL,
	`category` text NOT NULL,
	`serialNumber` text NOT NULL,
	`purchaseCost` integer,
	`purchaseDate` integer,
	`requesterEmployeeId` text NOT NULL,
	`requesterEmail` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`token` text NOT NULL,
	`expiresAt` integer,
	`decidedAt` integer,
	`decidedBy` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	FOREIGN KEY (`requesterEmployeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transfers` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`fromEmployeeId` text NOT NULL,
	`toEmployeeId` text NOT NULL,
	`reason` text,
	`approvedBy` text,
	`transferredAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`conditionNoted` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fromEmployeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`toEmployeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`approvedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `transfers_asset_idx` ON `transfers` (`assetId`);--> statement-breakpoint
CREATE INDEX `transfers_from_employee_idx` ON `transfers` (`fromEmployeeId`);--> statement-breakpoint
CREATE INDEX `transfers_to_employee_idx` ON `transfers` (`toEmployeeId`);--> statement-breakpoint
CREATE TABLE `vendors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contactName` text,
	`email` text,
	`phone` text,
	`address` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
