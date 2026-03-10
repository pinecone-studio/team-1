'use client';

import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { apolloClient } from '../lib/apollo-client';


const GET_HELLO = gql`
  query GetHello {
    getHello
  }
`;

export default function Index() {
  const [hello, setHello] = useState<string>('loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function runQuery() {
      try {
        const { data } = await apolloClient.query<{ getHello: string }>({
          query: GET_HELLO,
        });

        if (!cancelled) {
          setHello(data.getHello);
          setError(null);
        }
      } catch (queryError) {
        const message =
          queryError instanceof Error ? queryError.message : 'Unknown error';
        if (!cancelled) {
          setError(message);
        }
      }
    }

    runQuery();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Frontend to Backend GraphQL</h1>
      <p>Endpoint: https://team1-backend.tsetsegulziiocherdene.workers.dev/api/graphql</p>
      {error ? <p>GraphQL call failed: {error}</p> : <p>getHello: {hello}</p>}
    </main>
  );
}
