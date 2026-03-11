import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 1. Нийтэд нээлттэй замууд (GraphQL Playground гэх мэт)
const isPublicRoute = createRouteMatcher([
  '/api/graphql',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // auth() нь өөрөө protect болон бусад функцуудыг агуулсан Promise юм
  if (!isPublicRoute(request)) {
    // ШИНЭ СТАНДАРТ: auth.protect() гэж шууд await хийж дуудна
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
