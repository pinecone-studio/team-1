import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from 'graphql-gql/schema';
import { resolvers } from 'graphql-gql/resolvers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema'; // Өөрийн схемээ импортлох

// Edge Runtime ашиглах (Cloudflare Workers-т зориулсан)
export const runtime = 'edge';

// 1. GraphQL Schema үүсгэх
const yogaSchema = createSchema({
  typeDefs,
  resolvers,
});

// 2. Yoga-г Next.js App Router-т зориулан тохируулах
const { handleRequest } = createYoga({
  schema: yogaSchema,
  graphqlEndpoint: '/api/graphql',

  // 3. Context үүсгэх (Энд D1 датабаазаа холбоно)
  context: async ({ request }) => {
    // wrangler.toml дээр binding = "DB" байгаа гэж үзвэл:
    const db = drizzle(process.env.DB as unknown as D1Database, { schema });

    // Auth logic (Жишээ нь Header-ээс Token авах)
    const token = request.headers.get('authorization');

    return {
      db,
      token,
    };
  },

  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  },

  maskedErrors: process.env.NODE_ENV === 'production',
});

export { handleRequest as GET, handleRequest as POST };
