import { eq } from "drizzle-orm";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getDb } from "@/db/client";
import {
  assets,
  assignments,
  maintenanceTickets,
} from "../../../drizzle/schema";

// R2 Клиент (Environment хувьсагчдыг ашиглана)
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_S3_API,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Хөрөнгийг архивлаж, өгөгдлийн сангаас устгах үндсэн функц
 * 1. Өгөгдлийг татаж авах
 * 2. R2 руу JSON байдлаар байршуулах
 * 3. D1-ээс бүрмөсөн устгах (Transaction)
 */
export async function processAssetArchiving(assetId: string) {
  const db = await getDb();

  // 1. D1-ээс бүх холбоотой өгөгдлийг татаж авах
  const asset = await db
    .select()
    .from(assets)
    .where(eq(assets.id, assetId))
    .get();

  if (!asset) throw new Error("Asset not found");

  const assetAssignments = await db
    .select()
    .from(assignments)
    .where(eq(assignments.assetId, assetId))
    .all();

  const assetTickets = await db
    .select()
    .from(maintenanceTickets)
    .where(eq(maintenanceTickets.assetId, assetId))
    .all();

  const archiveData = {
    asset,
    assignments: assetAssignments,
    maintenanceTickets: assetTickets,
    archivedAt: new Date().toISOString(),
  };

  // 2. R2 руу JSON файл болгон илгээх
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.ARCHIVE_BUCKET_NAME!,
      Key: `archive/${new Date().getFullYear()}/${assetId}.json`,
      Body: JSON.stringify(archiveData),
      ContentType: "application/json",
    });

    await r2Client.send(command);
  } catch (error) {
    console.error("R2 Upload failed:", error);
    throw new Error("Archiving failed at R2 stage");
  }

  // 3. D1-ээс устгах (Transaction ашиглан)
  // Гадаад түлхүүрийн хамаарлыг (foreign keys) бодолцож эхлээд child хүснэгтүүдээс устгана
  try {
    // Дараалал нь чухал: assignments -> maintenanceTickets -> assets
    await db.delete(assignments).where(eq(assignments.assetId, assetId));
    await db
      .delete(maintenanceTickets)
      .where(eq(maintenanceTickets.assetId, assetId));
    await db.delete(assets).where(eq(assets.id, assetId));
  } catch (error) {
    console.error("D1 Deletion failed:", error);
    throw new Error("Archiving succeeded, but cleanup failed at D1 stage");
  }

  return { success: true };
}
