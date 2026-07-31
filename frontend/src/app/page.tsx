import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import StatsBar from "@/components/landing/stats-bar";
import Ekosistem from "@/components/landing/ekosistem";
import CampaignShowcase from "@/components/landing/campaign-showcase";
import SimulatorPreview from "@/components/landing/simulator-preview";
import LegalSection from "@/components/landing/legal-section";
import SocialProof from "@/components/landing/social-proof";
import FaqSection from "@/components/landing/faq-section";
import Cta from "@/components/landing/cta";
import RegulationFooter from "@/components/landing/regulation-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-modava-bg text-modava-text-dark font-sans selection:bg-emerald-200 selection:text-modava-primary-dark">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <StatsBar />
        <Ekosistem />
        <CampaignShowcase />
        <SimulatorPreview />
        <LegalSection />
        <SocialProof />
        <FaqSection />
        <Cta />
      </main>
      <RegulationFooter />
    </div>
  );
}
