import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export interface GraphQLContext {
  userId: string | null;
  // Бусад хэрэгцээт мэдээллүүдээ энд нэмж болно
}

export const createContext = async ({
  req,
}: {
  req: Request;
}): Promise<GraphQLContext> => {
  // Clerk-ийн auth мэдээллийг авах
  // Next.js 16 дээр Request-ийг NextRequest болгож хөрвүүлж ашиглах нь найдвартай
  const { userId } = getAuth(req as NextRequest);

  return {
    userId,
  };
};
