import {
  createAsset,
  deleteAndArchiveAsset,
  deleteAssetById,
  ensureCategoryId,
  ensureMainCategoryId,
  updateAssetById,
  updateAssetCategory,
} from "@/db/assets/mutations";
import { getAssetById } from "@/db/assets/queries";
import { getFirstEmployeeId } from "@/db/employees/queries/getEmployees";
import { writeAuditLog } from "@/db/auditLogger";
import { ensureLocationId } from "@/db/locations";
import { bumpAssetsCacheVersion } from "@/graphql-gql/cache/assetsListCache";
import type { GraphQLContext } from "@/graphql-gql/context";
import { employees } from "@/schema";
import { eq } from "drizzle-orm";

type AssetCreateInput = {
  assetTag: string;
  category: string;
  mainCategory?: string | null;
  serialNumber: string;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  notes?: string | null;
  deletedAt?: number | null;
};

type AssetUpdateInput = {
  assetTag?: string | null;
  category?: string | null;
  mainCategory?: string | null;
  serialNumber?: string | null;
  status?: string | null;
  purchaseDate?: number | null;
  purchaseCost?: number | null;
  currentBookValue?: number | null;
  locationId?: string | null;
  assignedTo?: string | null;
  imageUrl?: string | null;
  notes?: string | null;
  deletedAt?: number | null;
};

const buildAssetUpdate = (input: AssetUpdateInput) => {
  const updates: Record<string, unknown> = {};
  const setIfDefined = (key: string, value: unknown) => {
    if (value !== undefined) updates[key] = value;
  };
  setIfDefined("assetTag", input.assetTag);
  setIfDefined("serialNumber", input.serialNumber);
  setIfDefined("status", input.status);
  setIfDefined("purchaseDate", input.purchaseDate);
  setIfDefined("purchaseCost", input.purchaseCost);
  setIfDefined("currentBookValue", input.currentBookValue);
  setIfDefined("locationId", input.locationId);
  setIfDefined("imageUrl", input.imageUrl);
  setIfDefined("notes", input.notes);
  setIfDefined("deletedAt", input.deletedAt);
  return updates;
};

async function getActorId(ctx: GraphQLContext): Promise<string | null> {
  if (ctx.userId) {
    try {
      const row = await ctx.db
        .select({ id: employees.id })
        .from(employees)
        .where(eq(employees.clerkId, ctx.userId))
        .get();
      if (row?.id) return row.id;
    } catch {
      // If we can't resolve the current user, don't misattribute to another employee.
      return null;
    }
    // We have a userId, but it's not linked to an employee record.
    // Return null so the UI can show a generic "Admin" (instead of the first employee).
    return null;
  }
  try {
    return (await getFirstEmployeeId()) ?? null;
  } catch {
    return null;
  }
}

export const assetMutations = {
  createAsset: async (_: unknown, args: { input: AssetCreateInput }, ctx: GraphQLContext) => {
    const input = args.input;
    const mainCategoryId =
      input.mainCategory?.trim() ?
        await ensureMainCategoryId(input.mainCategory.trim()) :
        undefined;
    const categoryId = await ensureCategoryId(
      input.category,
      input.mainCategory ?? null
    );
    const locationIdResolved = await ensureLocationId(input.locationId);
    const created = await createAsset({
      assetTag: input.assetTag,
      serialNumber: input.serialNumber,
      status: input.status ?? undefined,
      purchaseDate: input.purchaseDate ?? undefined,
      purchaseCost: input.purchaseCost ?? undefined,
      locationId: locationIdResolved ?? input.locationId ?? undefined,
      imageUrl: input.imageUrl ?? undefined,
      notes: input.notes ?? undefined,
      deletedAt: input.deletedAt ?? undefined,
      mainCategoryId: mainCategoryId ?? undefined,
      categoryId,
    } as Parameters<typeof createAsset>[0]);
    await bumpAssetsCacheVersion(ctx);
    return created;
  },
  updateAsset: async (_: unknown, args: { id: string; input: AssetUpdateInput }, ctx: GraphQLContext) => {
    const input = args.input;
    const updates = buildAssetUpdate(input);
    if (input.locationId !== undefined) {
      updates.locationId = (await ensureLocationId(input.locationId)) ?? input.locationId ?? undefined;
    }
    if (input.mainCategory != null && input.mainCategory.trim()) {
      updates.mainCategoryId = await ensureMainCategoryId(input.mainCategory.trim());
    }
    if (input.category != null) {
      updates.categoryId = await ensureCategoryId(
        input.category,
        input.mainCategory ?? null
      );
    }
    if (Object.keys(updates).length === 0) {
      return getAssetById(args.id);
    }
    const oldAsset = await getAssetById(args.id);
    const updated = await updateAssetById(args.id, updates as never);
    const actorId = await getActorId(ctx);
    if (actorId && oldAsset && updated) {
      await writeAuditLog(
        "assets",
        args.id,
        "ASSET_UPDATED",
        actorId,
        { ...oldAsset },
        updates as Record<string, unknown>,
      );
    }
    await bumpAssetsCacheVersion(ctx);
    return updated;
  },
  deleteAsset: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
    const hasArchiveEnv =
      !!process.env.R2_S3_API &&
      !!process.env.R2_ACCESS_KEY_ID &&
      !!process.env.R2_SECRET_ACCESS_KEY &&
      !!process.env.ARCHIVE_BUCKET_NAME;
    const actorId = await getActorId(ctx);
    const oldAsset = await getAssetById(args.id);
    if (actorId) {
      await writeAuditLog(
        "assets",
        args.id,
        "ASSET_DELETE_REQUESTED",
        actorId,
        oldAsset ? { ...oldAsset } : null,
        {
          mode: hasArchiveEnv ? "ARCHIVE" : "SOFT_DELETE",
        },
      );
    }

    let ok = false;
    try {
      ok = !hasArchiveEnv
        ? await deleteAssetById(args.id)
        : await deleteAndArchiveAsset(args.id);
    } catch (error: any) {
      ok = false;
      if (actorId) {
        await writeAuditLog(
          "assets",
          args.id,
          "ASSET_DELETE_FAILED",
          actorId,
          oldAsset ? { ...oldAsset } : null,
          {
            mode: hasArchiveEnv ? "ARCHIVE" : "SOFT_DELETE",
            error: error?.message ? String(error.message) : "unknown_error",
          },
        );
      }
    }

    if (ok && actorId) {
      await writeAuditLog(
        "assets",
        args.id,
        "ASSET_DELETED",
        actorId,
        oldAsset ? { ...oldAsset } : null,
        {
          mode: hasArchiveEnv ? "ARCHIVE" : "SOFT_DELETE",
        },
      );
    }
    await bumpAssetsCacheVersion(ctx);
    return ok;
  },
  updateAssetCategory: async (_: unknown, args: { assetId: string; categoryId: string }) => {
    const categoryId = await ensureCategoryId(args.categoryId);
    return updateAssetCategory(args.assetId, categoryId);
  },
};
