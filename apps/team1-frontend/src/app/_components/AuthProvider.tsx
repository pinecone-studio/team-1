// apps/team1-frontend/src/app/_components/AuthProvider.tsx
'use client';

import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import React from 'react';
import { ApolloWrapper } from '@/lib/apollo/ApolloProvider';
import { SyncUser } from './SyncUser';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ApolloWrapper>
        <SyncUser />

        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Бүртгүүлэх
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>

        {children}
      </ApolloWrapper>
    </ClerkProvider>
  );
}
