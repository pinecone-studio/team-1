import { getHello } from '@/lib/get-hello';
import { createSchema, createYoga } from 'graphql-yoga';

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        getHello: String!
      }
    `,
    resolvers: {
      Query: {
        getHello: () => getHello(),
      },
    },
  }),
  graphqlEndpoint: '/api/graphql',
  landingPage: false,
});

function withCors(response: Response) {
  response.headers.set('Vary', 'Origin');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'content-type, authorization'
  );
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  return response;
}

function applyCorsForRequestOrigin(request: Request, response: Response) {
  const origin = request.headers.get('origin');
  const allowedOrigins = new Set([
    'https://studio.apollographql.com',
    'https://team1-frontend.tsetsegulziiocherdene.workers.dev',
    'http://localhost:3000',
    'http://localhost:4200',
  ]);

  if (origin && allowedOrigins.has(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  return withCors(response);
}

export async function GET(request: Request) {
  const endpoint = encodeURIComponent(request.url);
  return Response.redirect(
    `https://studio.apollographql.com/sandbox/explorer?endpoint=${endpoint}`,
    302
  );
}

export async function POST(request: Request) {
  const response = await yoga.fetch(request);
  return applyCorsForRequestOrigin(request, response);
}

export async function OPTIONS(request: Request) {
  return applyCorsForRequestOrigin(request, new Response(null, { status: 204 }));
}
