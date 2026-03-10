import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: '25ff2a265521aa8843147a4d3fec0eb6',
    databaseId: 'ddf47cf4-38cf-495e-9ed7-6fb746fe6ebc',
    token: 'biCgBWX01Z5cdXlTtSCrPgrv61mj8BYf_EgSN_W7',
  },
  verbose: true,
  strict: true,
});
