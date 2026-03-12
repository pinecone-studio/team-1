import { assets } from "../../../drizzle/schema";

export type Asset = typeof assets.$inferSelect;

export type AssetUpdate = Partial<typeof assets.$inferInsert>;

export type AssetCreate = Pick<
  typeof assets.$inferInsert,
  "assetTag" | "category" | "serialNumber"
> &
  Partial<
    Omit<
      typeof assets.$inferInsert,
      "id" | "assetTag" | "category" | "serialNumber" | "createdAt" | "updatedAt"
    >
  >;

