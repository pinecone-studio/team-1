ALTER TABLE `employees` ADD `clerkId` text;--> statement-breakpoint
ALTER TABLE `employees` ADD `role` text DEFAULT 'EMPLOYEE' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `employees_clerkId_unique` ON `employees` (`clerkId`);