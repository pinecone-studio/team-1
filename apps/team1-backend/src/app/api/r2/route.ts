import { getR2Binding } from '@/lib/cloudflare-r2';

export async function GET(request: Request) {
  const bucket = getR2Binding();
  if (!bucket) {
    return Response.json(
      {
        ok: false,
        message:
          'R2 binding not found. Check apps/team1-backend/wrangler.toml [[r2_buckets]] binding = "FILES".',
      },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!key) {
    return Response.json(
      { ok: false, message: 'Query param "key" is required.' },
      { status: 400 }
    );
  }

  const object = await bucket.get(key);
  if (!object) {
    return Response.json(
      { ok: false, message: `Object not found: ${key}` },
      { status: 404 }
    );
  }

  const content = await object.text();

  return Response.json({
    ok: true,
    key,
    size: object.size,
    etag: object.httpEtag,
    uploaded: object.uploaded.toISOString(),
    content,
  });
}

export async function POST(request: Request) {
  const bucket = getR2Binding();
  if (!bucket) {
    return Response.json(
      {
        ok: false,
        message:
          'R2 binding not found. Check apps/team1-backend/wrangler.toml [[r2_buckets]] binding = "FILES".',
      },
      { status: 500 }
    );
  }

  const body = (await request.json()) as {
    key?: string;
    content?: string;
    contentType?: string;
  };

  if (!body.key || typeof body.content !== 'string') {
    return Response.json(
      { ok: false, message: 'Body must include { "key": string, "content": string }.' },
      { status: 400 }
    );
  }

  await bucket.put(body.key, body.content, {
    httpMetadata: {
      contentType: body.contentType ?? 'text/plain; charset=utf-8',
    },
  });

  return Response.json({
    ok: true,
    message: 'Object uploaded to R2',
    key: body.key,
  });
}
