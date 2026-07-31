"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { getMe } from "@/lib/api-client";

export function AdminGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      if (!isLoaded) return;

      if (!isSignedIn || !getToken) {
        router.replace("/masuk");
        return;
      }

      const token = await getToken();
      if (!token) {
        router.replace("/masuk");
        return;
      }

      const user = await getMe(token);

      if (cancelled) return;

      if (user?.role === "ADMIN") {
        setAllowed(true);
      } else {
        router.replace("/dashboard");
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken, router]);

  if (!isLoaded || !allowed) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-sm">Memverifikasi akses admin...</p>
      </div>
    );
  }

  return children;
}
