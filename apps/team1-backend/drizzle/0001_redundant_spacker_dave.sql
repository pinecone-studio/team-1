PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_census_events` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`deadline` text NOT NULL,
	`created_at` text DEFAULT '2026-03-10T09:28:45.066Z'
);
--> statement-breakpoint
INSERT INTO `__new_census_events`("id", "name", "deadline", "created_at") SELECT "id", "name", "deadline", "created_at" FROM `census_events`;--> statement-breakpoint
DROP TABLE `census_events`;--> statement-breakpoint
ALTER TABLE `__new_census_events` RENAME TO `census_events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;