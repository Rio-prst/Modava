import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Modava - Modal untuk UMKM Naik Kelas",
  description:
    "Solusi finansial terintegrasi untuk usaha mikro. Dari pencatatan keuangan otomatis hingga akses permodalan kolektif yang transparan.",
};

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyContent = (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className="antialiased font-sans bg-modava-bg text-modava-text-dark">
        {children}
      </body>
    </html>
  );

  // If Clerk Publishable Key is provided in environment variables, wrap with ClerkProvider
  if (clerkPublishableKey) {
    return (
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        appearance={{
          variables: {
            colorPrimary: "#1E6B52",
          },
        }}
      >
        {bodyContent}
      </ClerkProvider>
    );
  }

  // Fallback: Render standard layout if Clerk key is not yet set in .env.local
  return bodyContent;
}
