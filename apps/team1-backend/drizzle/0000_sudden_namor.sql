CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_tag` text NOT NULL,
	`category_id` text,
	`model` text,
	`serial_number` text,
	`status` text NOT NULL,
	`assigned_to` text,
	`purchase_date` text,
	`purchase_cost` real,
	`location_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assigned_to`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `assets_asset_tag_unique` ON `assets` (`asset_tag`);--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text,
	`employee_id` text,
	`assigned_at` text NOT NULL,
	`returned_at` text,
	`condition_at_assign` text,
	`condition_at_return` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`table_name` text NOT NULL,
	`record_id` text NOT NULL,
	`action` text NOT NULL,
	`actor_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`actor_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `census_events` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`deadline` text NOT NULL,
	`created_at` text DEFAULT '2026-03-10T09:23:17.144Z'
);
--> statement-breakpoint
CREATE TABLE `census_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`census_id` text,
	`asset_id` text,
	`verified_at` text,
	`condition_reported` text,
	`discrepancy_flag` integer DEFAULT false,
	FOREIGN KEY (`census_id`) REFERENCES `census_events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`department` text,
	`branch` text,
	`status` text DEFAULT 'ACTIVE'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_email_unique` ON `employees` (`email`);--> statement-breakpoint
CREATE TABLE `locations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
