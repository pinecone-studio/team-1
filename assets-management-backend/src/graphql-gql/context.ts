import type { DrizzleD1Database } from "drizzle-orm/d1";

import type * as schema from "@/schema";

export type GraphQLEnv = {
  // Runtime дээр Cloudflare bindings орж ирнэ; type dependency нэмэхгүйн тулд minimal хэлбэрээр тодорхойллоо.
  DB: unknown;
  MY_CACHE: unknown;
};

export type GraphQLContext = {
  env: Partial<GraphQLEnv & { CLERK_SECRET_KEY?: string }>;
  db: DrizzleD1Database<typeof schema>;
  /** Clerk userId (sub from JWT) when Bearer token is valid; null otherwise */
  userId: string | null;
};

