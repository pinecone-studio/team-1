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
    <header className="flex justify-end items-center p-4 gap-4 h-16 shrink-0"></header>
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
