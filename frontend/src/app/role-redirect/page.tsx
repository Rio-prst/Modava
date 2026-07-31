"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { getMe, syncMe } from "@/lib/api-client";

export default function RoleRedirectPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    let cancelled = false;

    async function redirectByRole() {
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

      await syncMe(token);
      const user = await getMe(token);

      if (cancelled) return;

      if (user?.role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }

    redirectByRole();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F3ED]">
      <p className="text-sm font-semibold text-modava-primary">
        Memeriksa akun Anda...
      </p>
    </div>
  );
}
