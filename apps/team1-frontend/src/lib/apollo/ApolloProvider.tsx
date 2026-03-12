// apps/team1-frontend/src/lib/apollo/ApolloProvider.tsx
'use client';
import { useAuth } from '@clerk/nextjs';
import { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { createApolloClient } from './apollo-client';

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  
  // Клиентийг нэг удаа үүсгээд cache-лэнэ
  const client = useMemo(() => createApolloClient(getToken), [getToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};