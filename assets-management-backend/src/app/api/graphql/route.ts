import * as Yoga from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "@/graphql-gql/schema";
import { resolvers } from "@/graphql-gql/resolvers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export const runtime = "nodejs";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = Yoga.createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response, Request },
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
