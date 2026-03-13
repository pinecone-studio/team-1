import { getDb } from "@/db/client";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const db = await getDb();

    // SQLite дээр холболтыг шалгах өөр нэг арга бол хүснэгтээс нэг мөр унших
    // Эсвэл энгийн "SELECT 1" ажиллуулах:
    const result = await db.run(sql`SELECT 1`);

    return NextResponse.json({
      success: true,
      message: "DB холболт амжилттай!",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
