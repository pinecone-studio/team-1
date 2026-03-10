import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';

export const createContext = async ({
  req,
}: {
  req: NextRequest | NextApiRequest;
}) => {
  void req;
  return { clerkId: null, email: null };
};
