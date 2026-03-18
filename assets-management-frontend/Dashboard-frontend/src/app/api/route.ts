import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "dashboard-frontend",
  });
export async function GET() {
  return Response.json({ ok: true });
}
