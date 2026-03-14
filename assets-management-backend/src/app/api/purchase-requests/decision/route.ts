import { NextRequest } from "next/server";
import { approvePurchaseRequestByToken, declinePurchaseRequestByToken } from "@/app/lib/purchase-requests";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const action = searchParams.get("action");
  const approver = searchParams.get("approver") ?? "approver";

  if (!token || (action !== "approve" && action !== "decline")) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    if (action === "approve") {
      await approvePurchaseRequestByToken(token, approver);
      return new Response("Approved. You can close this tab.", {
        headers: { "Content-Type": "text/plain" },
      });
    }
    await declinePurchaseRequestByToken(token, approver);
    return new Response("Declined. You can close this tab.", {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Failed to process request",
      { status: 500 },
    );
  }
}
