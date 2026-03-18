"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "@clerk/nextjs";

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "/api/graphql";

export function ApolloProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { getToken } = useAuth();
  const client = useMemo(() => {
    const authLink = setContext(async (_, { headers }) => {
      const token = await getToken();
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
    return new ApolloClient({
      link: ApolloLink.from([
        authLink,
        new HttpLink({ uri: graphqlEndpoint }),
      ]),
      cache: new InMemoryCache(),
    });
  }, [getToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
