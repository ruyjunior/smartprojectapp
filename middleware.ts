/*import NextAuth from 'next-auth';
import { authConfig } from '@/app/lib/auth';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
*/
import { auth } from "@/app/lib/auth"; // Certifique-se de que auth está exportado corretamente
import { NextResponse } from "next/server";
import NextAuth from 'next-auth';

export async function middleware(request: Request) {
  const session = await auth(); // auth() já retorna os dados da sessão corretamente
  const isLoggedIn = !!session?.user; // Agora acessamos session.user diretamente

  const { pathname } = new URL(request.url);
  const isPublicRoute = pathname === "/" || pathname.startsWith("/deliveries") || pathname === "/login";

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
