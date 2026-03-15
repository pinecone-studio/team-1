/**
 * Modular resolver: asset(id) query.
 */
import { getAssetById } from "@/db/assets/queries";

export function resolveAsset(_: unknown, args: { id: string }) {
  return getAssetById(args.id);
}
