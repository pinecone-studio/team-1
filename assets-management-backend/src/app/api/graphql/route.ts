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

const { handleRequest } = Yoga.createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response, Request },
  maskedErrors: false,
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

export function GET(request: NextRequest, _context: RouteContext) {
  const hasQuery =
    request.nextUrl.searchParams.has("query") ||
    request.nextUrl.searchParams.has("operationName") ||
    request.nextUrl.searchParams.has("variables") ||
    request.nextUrl.searchParams.has("extensions");

  if (hasQuery) {
    return handleRequest(request, _context as unknown as never);
  }

  const explorer = new URL("https://studio.apollographql.com/sandbox/explorer");
  explorer.searchParams.set(
    "endpoint",
    `${request.nextUrl.origin}/api/graphql`,
  );
  return NextResponse.redirect(explorer, 302);
}

export function POST(request: NextRequest, _context: RouteContext) {
  return handleRequest(request, _context as unknown as never);
}

export function OPTIONS(request: NextRequest, _context: RouteContext) {
  return handleRequest(request, _context as unknown as never);
}
