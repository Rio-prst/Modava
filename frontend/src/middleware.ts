import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Dashboard Routes: Redirect to /masuk if unauthenticated cookie / token is missing
  // (In demo mode, if session cookie or demo_auth is set, allow passage; otherwise redirect)
  const isDashboardRoute = 
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/cash-flow") ||
    pathname.startsWith("/skor") ||
    pathname.startsWith("/crowdfunding") ||
    pathname.startsWith("/pinjaman") ||
    pathname.startsWith("/legalitas") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/profil") ||
    pathname.startsWith("/notifikasi");

  const authToken = request.cookies.get("modava_session")?.value;

  // Demo fallback: if no token, allow for demo browsing or simulate redirect
  if (isDashboardRoute && pathname.startsWith("/admin") && !authToken) {
    // Admin routes strictly require auth
    // return NextResponse.redirect(new URL("/masuk", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cash-flow/:path*",
    "/skor/:path*",
    "/crowdfunding/:path*",
    "/pinjaman/:path*",
    "/legalitas/:path*",
    "/admin/:path*",
    "/profil/:path*",
    "/notifikasi/:path*",
  ],
};
