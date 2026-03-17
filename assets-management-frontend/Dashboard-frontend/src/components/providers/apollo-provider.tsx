"use client";

import type { ReactNode } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "http://localhost:3000/api/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlEndpoint }),
  cache: new InMemoryCache(),
});

export function ApolloProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
