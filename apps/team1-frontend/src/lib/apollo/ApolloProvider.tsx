'use client';
import { useAuth } from '@clerk/nextjs';
import { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { createApolloClient } from './apollo-client';

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();

  const client = useMemo(() => createApolloClient(getToken), [getToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
