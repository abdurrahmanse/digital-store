import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth: proxyAuth } = NextAuth(authConfig);

export default proxyAuth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/checkout') || 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/success');

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
