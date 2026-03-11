import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from '@/graphql-yoga/typeDefs';
import { resolvers } from '@/graphql-yoga/resolvers';
import { createContext } from '@/apollo/context';
import { getDb } from '@db/index';

export const runtime = 'edge';

/**
 * 1. CORS Header-үүдийг тодорхойлох
 * Clerk-ийн бүх тусгай header-үүдийг зөвшөөрөх жагсаалтад оруулсан.
 */
const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, x-clerk-auth-token, x-clerk-sdk-version, x-clerk-clerk-id, x-clerk-shared-session-token',
  'Access-Control-Allow-Credentials': 'true',
};

// 2. GraphQL Yoga тохиргоо
const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/api/graphql',
  graphiql: true,
  cors: false, // Бид өөрсдөө Response дээр удирдана
});

/**
 * 3. OPTIONS (Preflight) Хүсэлтийг шийдэх
 */
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin') || 'http://localhost:3000';
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      'Access-Control-Allow-Origin': origin,
    },
  });
}

/**
 * 4. Үндсэн Handler (GET & POST)
 */
const handler = async (request: Request) => {
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  try {
    // D1 Баазын холболт шалгах
    const d1 = process.env.DB as unknown as D1Database;
    if (!d1) {
      throw new Error(
        "D1 Database binding 'DB' not found. Wrangler dev-ийг зөв ажиллуулна уу.",
      );
    }

    const db = getDb(d1);

    // Auth Context авах (Clerk userId гэх мэт)
    const contextValue = await createContext({ req: request });

    // Yoga-аас хариу авах
    const yogaResponse = await yoga.fetch(request, {
      ...contextValue,
      db,
    });

    // 5. Final Response: CORS header-үүдийг хүчээр нэмэх
    return new Response(yogaResponse.body, {
      status: yogaResponse.status,
      statusText: yogaResponse.statusText,
      headers: {
        ...Object.fromEntries(yogaResponse.headers.entries()),
        ...corsHeaders,
        'Access-Control-Allow-Origin': origin,
      },
    });
  } catch (error: any) {
    console.error('❌ GraphQL Route Error:', error);

    // Алдаа гарсан үед CORS header-тэй 500 Response буцаах
    return new Response(
      JSON.stringify({
        errors: [{ message: error.message || 'Internal Server Error' }],
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
          'Access-Control-Allow-Origin': origin,
        },
      },
    );
  }
};

export { handler as GET, handler as POST };
