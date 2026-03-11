PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_census_tasks` (
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
	FOREIGN KEY (`censusId`) REFERENCES `census_events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assetId`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`verifierId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_census_tasks`("id", "censusId", "assetId", "verifierId", "verifiedAt", "conditionReported", "locationConfirmed", "discrepancyFlag", "createdAt", "updatedAt") SELECT "id", "censusId", "assetId", "verifierId", "verifiedAt", "conditionReported", "locationConfirmed", "discrepancyFlag", "createdAt", "updatedAt" FROM `census_tasks`;--> statement-breakpoint
DROP TABLE `census_tasks`;--> statement-breakpoint
ALTER TABLE `__new_census_tasks` RENAME TO `census_tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_employees` (
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
	`isKpi` integer DEFAULT 0 NOT NULL,
	`isSalaryCompany` integer DEFAULT 1 NOT NULL,
	`birthDayAndMonth` text,
	`birthdayPoster` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
INSERT INTO `__new_employees`("id", "entraId", "firstName", "lastName", "firstNameEng", "lastNameEng", "email", "imageUrl", "hireDate", "terminationDate", "status", "numberOfVacationDays", "github", "department", "branch", "employeeCode", "level", "isKpi", "isSalaryCompany", "birthDayAndMonth", "birthdayPoster", "createdAt", "updatedAt", "deletedAt") SELECT "id", "entraId", "firstName", "lastName", "firstNameEng", "lastNameEng", "email", "imageUrl", "hireDate", "terminationDate", "status", "numberOfVacationDays", "github", "department", "branch", "employeeCode", "level", "isKpi", "isSalaryCompany", "birthDayAndMonth", "birthdayPoster", "createdAt", "updatedAt", "deletedAt" FROM `employees`;--> statement-breakpoint
DROP TABLE `employees`;--> statement-breakpoint
ALTER TABLE `__new_employees` RENAME TO `employees`;--> statement-breakpoint
CREATE UNIQUE INDEX `employees_employeeCode_unique` ON `employees` (`employeeCode`);--> statement-breakpoint
ALTER TABLE `assets` ADD `imageUrl` text;