import { and, eq, isNull } from "drizzle-orm";

import { getDb } from "../../client";
import { locations } from "@/schema";
import { createLocation } from "./createLocation";

const LOCATION_TYPES = ["branch", "roomType", "section", "room"] as const;

/**
 * Байршлын бүтэн замыг задаж (салбар / төрөл / хэсэг / өрөө),
 * locations хүснэгтэд шатлалаар олох эсвэл үүсгээд сүүлийн (leaf) location-ийн id буцаана.
 * Ингэснээр салбар, төрөл, хэсэг, өрөөгөөр дараа нь шүүх боломжтой болно.
 */
export async function ensureLocationId(fullPath: string | null | undefined): Promise<string | undefined> {
  const trimmed = fullPath?.trim();
  if (!trimmed) return undefined;

  const parts = trimmed.split(" / ").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return undefined;

  const db = await getDb();
  let parentId: string | null = null;

  for (let i = 0; i < parts.length; i++) {
    const name = parts[i];
    const type = LOCATION_TYPES[Math.min(i, LOCATION_TYPES.length - 1)];

    const existing = await db
      .select({ id: locations.id })
      .from(locations)
      .where(
        and(
          parentId === null ? isNull(locations.parentId) : eq(locations.parentId, parentId),
          eq(locations.name, name),
          eq(locations.type, type)
        )
      )
      .get();

    if (existing?.id) {
      parentId = existing.id;
    } else {
      const created = await createLocation({
        name,
        parentId: parentId ?? undefined,
        type,
      });
      parentId = created.id;
    }
  }

  return parentId ?? undefined;
}
