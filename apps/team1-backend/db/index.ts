// db/index.ts
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

/**
 * Cloudflare D1 холболтыг Drizzle объект болгож хувиргах функц.
 * Үүнийг GraphQL Context дотор ашиглана.
 */
export const getDb = (d1: D1Database) => {
  // schema-г энд дамжуулснаар db.query.employees... гэж ашиглах боломжтой болно (Relational API)
  return drizzle(d1, { schema });
};

// Бүх table болон relations-оо эндээс export хийвэл импортлоход амар болно
export * from './schema';
