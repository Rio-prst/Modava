import NavbarMobile from "@/components/landing/navbar-mobile";
import HeroMobile from "@/components/landing/hero-mobile";
import FeatureCardsMobile from "@/components/landing/feature-cards-mobile";
import RegulationFooter from "@/components/landing/regulation-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-modava-bg flex flex-col">
      <NavbarMobile />
      <main className="flex-1 space-y-8 pb-8">
        <HeroMobile />
        <FeatureCardsMobile />
      </main>
      <RegulationFooter />
    </div>
  );
}
