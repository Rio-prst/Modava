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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#1E6B52",
        },
      }}
    >
      <html lang="id" className={plusJakartaSans.variable}>
        <body className="antialiased font-sans bg-modava-bg text-modava-text-dark">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
