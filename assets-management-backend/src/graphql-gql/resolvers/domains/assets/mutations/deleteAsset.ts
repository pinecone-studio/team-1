/**
 * Modular resolver: deleteAsset mutation.
 */
import { deleteAssetUseCase } from "@/application/assets";

export function resolveDeleteAsset(_: unknown, args: { id: string }) {
  return deleteAssetUseCase(args.id);
}
