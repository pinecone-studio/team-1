# AGENTS.md

## Cursor Cloud specific instructions

### Product layout

- **Backend** (`assets-management-backend/`): Next.js 16 + GraphQL Yoga at `/api/graphql`, Drizzle ORM on Cloudflare D1 (`team_one`). Also serves a simple **Excel import** UI at `/`.
- **Frontend** (`assets-management-frontend/Dashboard-frontend/`): Next.js dashboard (AssetHub) on a separate port; talks to the backend via `NEXT_PUBLIC_GRAPHQL_URL`.

See each app's `package.json` for `dev`, `build`, `lint`, `preview`, and `deploy` scripts.

### Local development (no Cloudflare login)

Committed `wrangler.jsonc` sets D1/KV bindings to `"remote": true`, which makes `next dev` proxy to Cloudflare and fail without `wrangler login`. For local work, use **local bindings** (set `"remote": false` on D1/KV in `wrangler.jsonc`, or maintain a local-only copy) before starting the backend.

Initialize the local D1 schema:

```bash
cd assets-management-backend
# If `wrangler d1 migrations apply team_one --local` fails with "no such table: assets", generate the baseline migration once:
npx drizzle-kit generate --name init_schema
npx wrangler d1 migrations apply team_one --local
```

If migration `0001_add_current_book_value.sql` fails with "duplicate column", the init migration already includes `currentBookValue`; local DB is still usable.

### Running both apps

Both default to port **3000**. Typical layout:

| Service  | Directory | Command |
|----------|-----------|---------|
| Backend  | `assets-management-backend` | `DISABLE_AUTH=1 npm run dev` |
| Frontend | `assets-management-frontend/Dashboard-frontend` | `PORT=3001 npm run dev` |

Frontend env (minimum without Clerk):

- `NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql`
- `NEXT_PUBLIC_DISABLE_AUTH=1`

**Clerk is required** for the dashboard: valid `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (and related Clerk URLs). Without them, `next dev` / `next build` fail in `ClerkProvider`. Backend can run with `DISABLE_AUTH=1` only.

### Lint / test

- No automated test scripts in either `package.json`.
- `npm run lint` currently errors on Next.js 16 (`next lint` treats `lint` as a directory). Use `npx eslint .` in each app directory instead (existing configs have many pre-existing violations).

### Quick API smoke test

```bash
curl -s http://localhost:3000/api/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ employees { id } assets { id assetTag } }"}'
```

With `DISABLE_AUTH=1`, you can run `createEmployee` / `createAsset` mutations without a Bearer token.

### Optional services

R2 (uploads), Resend (email), and remote D1/KV are optional for core CRUD; see backend `wrangler.jsonc` and GraphQL resolvers.
