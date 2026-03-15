"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return <button onClick={() => signIn("google")}>Google-ээр нэвтрэх</button>;
}
