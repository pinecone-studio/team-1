import { getDb } from '@db/index';

// 1. Drizzle DB-ийн төрлийг тодорхойлно (Autocomplete ажиллах нөхцөл)
export type Database = ReturnType<typeof getDb>;

// 2. Context-ийн төрлийг тодорхойлж export хийнэ
// Codegen үүнийг уншиж resolvers-types.ts руу холбодог
export type Context = {
  db: Database;
  env: any;
  user?: {
    id: string;
    email: string;
  };
};

/**
 * Yoga сервер хүсэлт болгоны үед энэ функцийг ажиллуулж
 * resolver-уудад хэрэгтэй context-ийг бэлдэж өгнө.
 */
export const createContext = (env: any): Context => {
  return {
    db: getDb(env.DB), // Cloudflare D1-ийг Drizzle болгож хувиргах
    env,
  };
};
