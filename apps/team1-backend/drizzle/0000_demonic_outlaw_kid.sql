CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`assetTag` text NOT NULL,
	`category` text NOT NULL,
	`serialNumber` text NOT NULL,
	`status` text DEFAULT 'AVAILABLE' NOT NULL,
	`purchaseDate` integer,
	`purchaseCost` integer,
	`currentBookValue` integer,
	`locationId` text,
	`assignedTo` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `assets_assetTag_unique` ON `assets` (`assetTag`);--> statement-breakpoint
CREATE UNIQUE INDEX `assets_serialNumber_unique` ON `assets` (`serialNumber`);--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`assetId` text NOT NULL,
	`employeeId` text NOT NULL,
	`assignedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`returnedAt` integer,
	`conditionAtAssign` text NOT NULL,
	`conditionAtReturn` text,
	`signatureR2Key` text,
	`accessoriesJson` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
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
	`discrepancyFlag` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`censusId`) REFERENCES `census_events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`verifierId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
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
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`entraId` text NOT NULL,
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
	`isKpi` integer DEFAULT false NOT NULL,
	`isSalaryCompany` integer DEFAULT true NOT NULL,
	`birthDayAndMonth` text,
	`birthdayPoster` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_employeeCode_unique` ON `employees` (`employeeCode`);--> statement-breakpoint
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
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`reporterId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
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
	FOREIGN KEY (`requestedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`approvedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
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
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`fromEmployeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`toEmployeeId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`approvedBy`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
