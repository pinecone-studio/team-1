import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/schema";
import type { GraphQLContext } from "@/graphql-gql/context";

export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
}

export function getDbFromContext(ctx: GraphQLContext) {
  return ctx.db;
}
