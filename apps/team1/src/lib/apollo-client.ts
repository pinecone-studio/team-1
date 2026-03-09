import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken: () => Promise<string | null>;
      };
    };
  }
}

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:4201/api/graphql'
      : 'https://team1-backend.tsetsegulziiocherdene.workers.dev/api/graphql'),
});

const authLink = setContext(async (_, prevContext) => {
  if (typeof window === 'undefined') {
    return prevContext;
  }

  const token = await window.Clerk?.session?.getToken();
  const nextHeaders = {
    ...prevContext?.headers,
  } as Record<string, string>;

  if (token) {
    nextHeaders.authorization = `Bearer ${token}`;
  } else {
    delete nextHeaders.authorization;
  }

  return {
    ...prevContext,
    headers: nextHeaders,
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});
