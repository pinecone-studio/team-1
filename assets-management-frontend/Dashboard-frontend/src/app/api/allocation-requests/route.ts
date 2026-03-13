import { NextResponse } from "next/server";

function getBackendUrl() {
  const url = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
  const resolved =
    url ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000" : null);
  if (!resolved) return null;
  return resolved.replace(/\/$/, "");
}

async function proxy(request: Request, init?: RequestInit) {
  const backend = getBackendUrl();
  if (!backend) {
    return new NextResponse(
      JSON.stringify({
        error: "Missing BACKEND_URL. Set it in .env.local",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
  const target = `${backend}/api/allocation-requests${new URL(request.url).search}`;
  const res = await fetch(target, {
    ...init,
    headers: {
      "content-type": request.headers.get("content-type") ?? "application/json",
    },
  });

  const contentType = res.headers.get("content-type") ?? "application/json";
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": contentType },
  });
}

export async function GET(request: Request) {
  return proxy(request);
}

export async function POST(request: Request) {
  const body = await request.text();
  return proxy(request, { method: "POST", body });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
