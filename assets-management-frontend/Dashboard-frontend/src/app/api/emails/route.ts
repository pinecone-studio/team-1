import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

// 1. Define schemas for type-safe validation
const GmailListSchema = z.object({
  messages: z.array(z.object({ id: z.string() })).optional(),
});

const GmailDetailSchema = z.object({
  id: z.string(),
  snippet: z.string(),
  payload: z.object({
    headers: z.array(z.object({ name: z.string(), value: z.string() })),
  }),
});

export interface GmailMessage {
  id: string;
  snippet: string;
  subject: string;
  from: string;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch list of message IDs
  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5",
    { headers: { Authorization: `Bearer ${session.accessToken}` } },
  );

  if (!listRes.ok)
    return NextResponse.json(
      { error: "Failed to fetch list" },
      { status: 502 },
    );

  const listData = GmailListSchema.parse(await listRes.json());
  const messages = listData.messages || [];

  // 3. Fetch details in parallel with resilience
  const detailedResults = await Promise.allSettled(
    messages.map(async (msg) => {
      const detailRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?fields=id,snippet,payload/headers`,
        { headers: { Authorization: `Bearer ${session.accessToken}` } },
      );

      if (!detailRes.ok) throw new Error(`Failed to fetch ${msg.id}`);
      return GmailDetailSchema.parse(await detailRes.json());
    }),
  );

  // 4. Map only successful results
  const results: GmailMessage[] = detailedResults
    .filter(
      (r): r is PromiseFulfilledResult<z.infer<typeof GmailDetailSchema>> =>
        r.status === "fulfilled",
    )
    .map((r) => ({
      id: r.value.id,
      snippet: r.value.snippet,
      subject:
        r.value.payload.headers.find((h) => h.name === "Subject")?.value ??
        "No Subject",
      from:
        r.value.payload.headers.find((h) => h.name === "From")?.value ??
        "Unknown",
    }));

  return NextResponse.json({ messages: results });
}
