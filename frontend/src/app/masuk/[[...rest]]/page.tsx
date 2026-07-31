import { SignIn } from "@clerk/nextjs";
import LeftPanel from "@/components/masuk/left-panel";

export default function MasukPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      <LeftPanel />
      <div className="flex items-center justify-center py-12">
        <SignIn afterSignInUrl="/role-redirect" signUpUrl="/daftar" />
      </div>
    </div>
  );
}
