/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function middleware(request: NextRequest) {
  // If Clerk Key is not provided in .env.local, pass through safely to prevent Missing publishableKey error
  if (!clerkPublishableKey) {
    return NextResponse.next();
  }

  // When NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is present, dynamically load clerkMiddleware
  try {
    const { clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server");
    const isProtectedRoute = createRouteMatcher([
      "/dashboard(.*)",
      "/cash-flow(.*)",
      "/skor(.*)",
      "/crowdfunding/buat(.*)",
      "/legalitas(.*)",
      "/admin(.*)",
      "/profil(.*)",
      "/notifikasi(.*)",
    ]);

    const handler = clerkMiddleware((auth: any, req: any) => {
      if (isProtectedRoute(req)) {
        // auth().protect();
      }
    });

    return handler(request as any, {} as any);
  } catch (e) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
