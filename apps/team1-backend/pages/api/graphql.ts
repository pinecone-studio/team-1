import * as GraphQL from 'graphql';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Maybe } from 'graphql/jsutils/Maybe';
import { createContext } from '../../apollo/context';
import { resolvers } from '../../graphql-gql/resolvers';
import { typeDefs } from '../../graphql-gql/schema';

type GraphqlRequest = {
  query: string;
  variables?: Maybe<{
    readonly [variable: string]: unknown;
  }>;
  operationName?: Maybe<string>;
};

const schema = GraphQL.buildSchema(typeDefs);

const fieldResolver: GraphQL.GraphQLFieldResolver<unknown, unknown> = (
  source,
  args,
  context,
  info,
) => {
  const parentType = info.parentType.name;
  const resolver =
    (resolvers as Record<string, Record<string, GraphQL.GraphQLFieldResolver<any, any>>>)[
      parentType
    ]?.[info.fieldName];

  if (resolver) {
    return resolver(source, args, context, info);
  }

  return GraphQL.defaultFieldResolver(source, args, context, info);
};

const setCors = (res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const graphqlHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = (req.body || {}) as GraphqlRequest;
    const { query, variables, operationName } = body;

    let contextValue = {};
    try {
      contextValue = await createContext({ req });
    } catch (contextError) {
      console.error('Context Creation Error:', contextError);
    }

    const response = await GraphQL.graphql({
      schema: schema,
      source: query,
      variableValues: variables,
      operationName: operationName,
      contextValue: contextValue,
      fieldResolver,
    });

    res.status(200).json(response);
  } catch (e) {
    console.error('General GraphQL Error:', e);
    res.status(400).json({ message: String(e) });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    const endpoint = `${req.headers['x-forwarded-proto'] ?? 'https'}://${req.headers.host}${req.url}`;
    res.redirect(
      302,
      `https://studio.apollographql.com/sandbox/explorer?endpoint=${endpoint}`,
    );
    return;
  }

  await graphqlHandler(req, res);
}
