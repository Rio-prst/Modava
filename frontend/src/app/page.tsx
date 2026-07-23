import Hero from "@/components/landing/hero";
import Ekosistem from "@/components/landing/ekosistem";
import SocialProof from "@/components/landing/social-proof";
import Cta from "@/components/landing/cta";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-modava-bg flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-8 py-12 space-y-20">
        <Hero />
        <Ekosistem />
        <SocialProof />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
