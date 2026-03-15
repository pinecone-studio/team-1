/**
 * Use-case: Delete an asset (soft/hard or archive when R2 is configured).
 */
import {
  deleteAndArchiveAsset,
  deleteAssetById,
} from "@/db/assets/mutations";

export async function deleteAssetUseCase(id: string): Promise<boolean> {
  const hasArchiveEnv =
    !!process.env.R2_S3_API &&
    !!process.env.R2_ACCESS_KEY_ID &&
    !!process.env.R2_SECRET_ACCESS_KEY &&
    !!process.env.ARCHIVE_BUCKET_NAME;

  if (!hasArchiveEnv) {
    return deleteAssetById(id);
  }
  return deleteAndArchiveAsset(id);
}
