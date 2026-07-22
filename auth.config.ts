import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/checkout');
      
      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect to signIn
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  providers: [], // Will be populated in auth.ts
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_only",
} satisfies NextAuthConfig;
