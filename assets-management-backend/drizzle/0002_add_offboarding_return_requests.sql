-- Create offboarding_return_requests for employee return submissions during offboarding
CREATE TABLE IF NOT EXISTS `offboarding_return_requests` (
  `id` text PRIMARY KEY NOT NULL,
  `offboardingEventId` text NOT NULL REFERENCES `offboarding_events`(`id`),
  `assetId` text NOT NULL REFERENCES `assets`(`id`),
  `assignmentId` text NOT NULL REFERENCES `assignments`(`id`),
  `employeeId` text NOT NULL REFERENCES `employees`(`id`),
  `conditionEmployee` text NOT NULL,
  `status` text DEFAULT 'PENDING_HR' NOT NULL,
  `conditionHr` text,
  `photoR2Key` text,
  `inspectedBy` text REFERENCES `employees`(`id`),
  `createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
  `updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL
);

CREATE INDEX IF NOT EXISTS `offboarding_return_requests_event_idx`
  ON `offboarding_return_requests` (`offboardingEventId`);

CREATE INDEX IF NOT EXISTS `offboarding_return_requests_asset_idx`
  ON `offboarding_return_requests` (`assetId`);

CREATE INDEX IF NOT EXISTS `offboarding_return_requests_status_idx`
  ON `offboarding_return_requests` (`status`);

 