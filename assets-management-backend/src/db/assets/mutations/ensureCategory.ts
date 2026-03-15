import { and, eq, isNull, or } from "drizzle-orm";

import { getDb } from "../../client";
import { categories } from "@/schema";

/**
 * Үндсэн ангилал байгаа эсэхийг шалгаад, байхгүй бол нэмнэ (parentId = null).
 * Буцаах: үндсэн ангиллын id.
 */
export async function ensureMainCategoryId(mainName: string): Promise<string> {
  const db = await getDb();
  const existing = await db
    .select({ id: categories.id })
    .from(categories)
    .where(
      and(
        or(eq(categories.id, mainName), eq(categories.name, mainName)),
        isNull(categories.parentId)
      )
    )
    .get();

  if (existing?.id) return existing.id;

  const now = Date.now();
  const id = mainName;
  await db
    .insert(categories)
    .values({
      id,
      name: mainName,
      parentId: null,
      createdAt: now,
    })
    .onConflictDoNothing();

  const created = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.id, id))
    .get();
  if (!created?.id) throw new Error("Failed to ensure main category");
  return created.id;
}

/**
 * Дэд ангилал байгаа эсэхийг шалгаад, байхгүй бол нэмнэ.
 * mainCategoryId өгөгдсөн бол parentId = mainCategoryId, үгүй бол parentId = null.
 * Буцаах: дэд ангиллын id (assets.categoryId-д ашиглана).
 */
export async function ensureCategoryId(
  subCategory: string,
  mainCategoryName?: string | null
): Promise<string> {
  const db = await getDb();
  const mainId =
    mainCategoryName?.trim()
      ? await ensureMainCategoryId(mainCategoryName.trim())
      : null;

  const existing = await db
    .select({ id: categories.id })
    .from(categories)
    .where(
      mainId !== null
        ? and(
            or(eq(categories.id, subCategory), eq(categories.name, subCategory)),
            eq(categories.parentId, mainId)
          )
        : and(
            or(eq(categories.id, subCategory), eq(categories.name, subCategory)),
            isNull(categories.parentId)
          )
    )
    .get();

  if (existing?.id) return existing.id;

  const now = Date.now();
  const id = subCategory;
  await db
    .insert(categories)
    .values({
      id,
      name: subCategory,
      parentId: mainId,
      createdAt: now,
    })
    .onConflictDoNothing();

  let created = await db
    .select({ id: categories.id })
    .from(categories)
    .where(
      mainId !== null
        ? and(eq(categories.id, id), eq(categories.parentId, mainId))
        : and(eq(categories.id, id), isNull(categories.parentId))
    )
    .get();
  if (!created?.id) {
    const byIdOnly = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, id))
      .get();
    if (byIdOnly?.id) return byIdOnly.id;
    throw new Error("Failed to ensure category");
  }
  return created.id;
}
