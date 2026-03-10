import { drizzle } from 'drizzle-orm/d1';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { getD1Binding } from './cloudflare-d1';

export function getDb(): DrizzleD1Database<typeof schema> | null {
  const d1 = getD1Binding();
  if (!d1) {
    return null;
  }

  return drizzle(d1, { schema });
}
