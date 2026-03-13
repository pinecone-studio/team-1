import { assets } from "../../../drizzle/schema";

export type Asset = typeof assets.$inferSelect;

export type AssetUpdate = Partial<typeof assets.$inferInsert>;

export type AssetCreate = Pick<
  typeof assets.$inferInsert,
  "assetTag" | "serialNumber"
> &
  Partial<
    Omit<
      typeof assets.$inferInsert,
      "id" | "assetTag" | "serialNumber" | "createdAt" | "updatedAt"
    >
  >;
