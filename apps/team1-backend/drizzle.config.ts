import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: '83f5...', // Cloudflare Dashboard-ийн URL доторх ID
    databaseId: 'ddf47cf4-38cf-495e-9ed7-6fb746fe6ebc',
    token: 'uwbr6Vybx0pzN6lyGxxNokV51wRyMWVW3cAtSHwy', // API Token үүсгэх хэрэгтэй
  },
});
