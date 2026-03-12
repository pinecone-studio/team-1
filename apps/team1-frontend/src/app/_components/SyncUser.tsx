'use client';

import { useUser } from '@clerk/nextjs';
import { gql } from '@apollo/client';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client/react';

const SYNC_CLERK_ID = gql`
  mutation SyncClerkId($email: String!, $clerkId: String!) {
    syncClerkId(email: $email, clerkId: $clerkId) {
      id
      clerkId
    }
  }
`;

export function SyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [syncClerkId] = useMutation(SYNC_CLERK_ID);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const email = user.primaryEmailAddress?.emailAddress;
      const clerkId = user.id;

      if (email && clerkId) {
        syncClerkId({ variables: { email, clerkId } })
          .then(() => console.log('✅ Clerk ID synchronized'))
          .catch((err) => console.error('❌ Sync failed', err));
      }
    }
  }, [isLoaded, isSignedIn, user, syncClerkId]);

  return null;
}
