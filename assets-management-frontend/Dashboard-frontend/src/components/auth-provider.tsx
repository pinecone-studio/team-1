"use client";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

function AuthHeader() {
  const { isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 shrink-0">
      {!mounted ? (
        <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-100" />
      ) : !isSignedIn ? (
        <>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal">
            <button
              type="button"
              className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
            >
              Бүртгүүлэх
            </button>
          </SignUpButton>
        </>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </header>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AuthHeader />
      {children}
    </ClerkProvider>
  );
}
