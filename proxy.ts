import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth: proxyAuth } = NextAuth(authConfig);

export default proxyAuth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const { pathname } = req.nextUrl;

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isSettingsRoute = pathname === '/dashboard/settings';
  const isOverviewRoute = pathname === '/dashboard';

  const isAuthRoute = 
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verify-email') ||
    pathname.startsWith('/verify-otp');

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }

  const isProtectedRoute = 
    isDashboardRoute || 
    pathname.startsWith('/checkout') || 
    pathname.startsWith('/success');

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }

  if (isDashboardRoute) {
    // Both Admin and User can access /dashboard and /dashboard/settings
    if (isOverviewRoute || isSettingsRoute) {
      return;
    }

    // Any other /dashboard/* route requires ADMIN role
    if (role !== "ADMIN") {
      return Response.redirect(new URL('/dashboard', req.nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
