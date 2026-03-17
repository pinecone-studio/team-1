import { NextRequest, NextResponse } from "next/server";
import { startOffboarding } from "@/db/offboarding";

export const runtime = "nodejs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

type OffboardBody = {
  employeeId: string;
  terminationDate?: number | null;
  initiatedBy?: string | null;
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders },
    );
  }

  let body: OffboardBody;
  try {
    body = (await request.json()) as OffboardBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: corsHeaders },
    );
  }

  const { employeeId, terminationDate, initiatedBy } = body;
  if (!employeeId || typeof employeeId !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid employeeId" },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const event = await startOffboarding(
      employeeId,
      initiatedBy ?? "hr-webhook",
      {
        terminationDate:
          terminationDate != null && typeof terminationDate === "number"
            ? terminationDate
            : undefined,
      },
    );

    return NextResponse.json(
      {
        ok: true,
        offboardingEventId: event.id,
        employeeId,
        totalAssets: event.totalAssets,
      },
      { headers: corsHeaders },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Offboard failed";
    if (message.includes("not found")) {
      return NextResponse.json(
        { error: message },
        { status: 404, headers: corsHeaders },
      );
    }
    if (
      message.includes("already terminated") ||
      message.includes("already in offboarding")
    ) {
      return NextResponse.json(
        { error: message },
        { status: 409, headers: corsHeaders },
      );
    }
    return NextResponse.json(
      { error: message },
      { status: 500, headers: corsHeaders },
    );
  }
}
