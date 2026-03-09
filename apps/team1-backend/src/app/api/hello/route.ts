import { getD1Binding } from '@/lib/cloudflare-d1';

export async function GET() {
  const db = getD1Binding();
  if (!db) {
    return Response.json(
      {
        ok: false,
        message:
          'D1 binding not found. Check apps/team1-backend/wrangler.toml [[d1_databases]] binding = "DB".',
      },
      { status: 500 }
    );
  }

  const row = await db
    .prepare('SELECT datetime(\'now\') AS current_time')
    .first<{ current_time: string }>();

  return Response.json({
    ok: true,
    message: 'Connected to Cloudflare D1',
    currentTime: row?.current_time ?? null,
  });
}
