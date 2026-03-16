import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Дээрх файл руугаа зааж өгнө

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
