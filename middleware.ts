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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
