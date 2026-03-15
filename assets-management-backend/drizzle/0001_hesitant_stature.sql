ALTER TABLE `assets` ADD `notes` text;--> statement-breakpoint
ALTER TABLE `assets` ADD `condition` text DEFAULT 'GOOD' NOT NULL;