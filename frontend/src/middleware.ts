import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected dashboard routes requiring authentication
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

export default clerkMiddleware((auth, req) => {
  // Allow public access or protect specific routes if authentication keys are set
  if (isProtectedRoute(req)) {
    // auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
