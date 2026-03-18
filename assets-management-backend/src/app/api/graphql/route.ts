import * as Yoga from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "@/graphql-gql";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as dbSchema from "@/schema";
import type { GraphQLContext } from "@/graphql-gql/context";
import {
  getUserIdFromRequest,
  syncEmployeeClerkId,
} from "@/lib/clerk-auth";
export const runtime = "nodejs";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

function withCors(response: Response): Response {
  const next = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  Object.entries(CORS_HEADERS).forEach(([key, value]) => next.headers.set(key, value));
  return next;
}

const { handleRequest } = Yoga.createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response, Request },
  maskedErrors: false,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  },
  context: async ({
    request,
  }: {
    request: Request;
  }): Promise<GraphQLContext> => {
    const { env } = await getCloudflareContext({ async: true });
    const envTyped = env as GraphQLContext["env"];
    const db = drizzle(env.DB, { schema: dbSchema });
    const secretKey =
      envTyped.CLERK_SECRET_KEY ?? (typeof process !== "undefined" ? process.env?.CLERK_SECRET_KEY : undefined);
    let userId = await getUserIdFromRequest(request, secretKey);
    if (userId && secretKey) {
      await syncEmployeeClerkId(db, userId, secretKey);
    }
    return {
      env: envTyped,
      db,
      userId: userId ?? null,
    };
  },
});

type RouteContext = { params: Promise<{}> };

export async function GET(request: NextRequest, _context: RouteContext) {
  const hasQuery =
    request.nextUrl.searchParams.has("query") ||
    request.nextUrl.searchParams.has("operationName") ||
    request.nextUrl.searchParams.has("variables") ||
    request.nextUrl.searchParams.has("extensions");

  if (hasQuery) {
    try {
      const res = await handleRequest(request, _context as unknown as never);
      return withCors(res);
    } catch (err) {
      const body = JSON.stringify({
        errors: [{ message: err instanceof Error ? err.message : "Internal server error" }],
      });
      return withCors(new Response(body, { status: 500, headers: { "Content-Type": "application/json" } }));
    }
  }

  const explorer = new URL("https://studio.apollographql.com/sandbox/explorer");
  explorer.searchParams.set(
    "endpoint",
    `${request.nextUrl.origin}/api/graphql`,
  );
  return NextResponse.redirect(explorer, 302);
}

export async function POST(request: NextRequest, _context: RouteContext) {
  try {
    const res = await handleRequest(request, _context as unknown as never);
    return withCors(res);
  } catch (err) {
    const body = JSON.stringify({
      errors: [{ message: err instanceof Error ? err.message : "Internal server error" }],
    });
    return withCors(new Response(body, { status: 500, headers: { "Content-Type": "application/json" } }));
  }
}

export async function OPTIONS(request: NextRequest, _context: RouteContext) {
  try {
    const res = await handleRequest(request, _context as unknown as never);
    return withCors(res);
  } catch {
    return withCors(new Response(null, { status: 204 }));
  }
}
