import { processAssetArchiving } from "@/app/lib/archive";

export async function deleteAndArchiveAsset(id: string): Promise<boolean> {
  try {
    await processAssetArchiving(id);
    return true;
  } catch (error) {
    console.error("Архивлаж устгах үед алдаа гарлаа:", error);
    return false;
  }
}

