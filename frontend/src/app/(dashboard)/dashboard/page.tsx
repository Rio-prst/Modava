import DashboardHeader from "@/components/dashboard/dashboard-header";
import WidgetSkor from "@/components/dashboard/widget-skor";
import WidgetOmzet from "@/components/dashboard/widget-omzet";
import WidgetLegalitas from "@/components/dashboard/widget-legalitas";
import WidgetAliranKas from "@/components/dashboard/widget-aliran-kas";
import SectionCampaign from "@/components/dashboard/section-campaign";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <DashboardHeader />

      {/* Grid Row: Left side Skor card, Right side Omzet, Legalitas, & Aliran Kas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Skor Kelayakan Keuangan (Full Height Card) */}
        <div className="lg:col-span-5 flex flex-col">
          <WidgetSkor />
        </div>

        {/* Right Column: Omzet + Legalitas (Top) & Aliran Kas (Bottom) */}
        <div className="lg:col-span-7 flex flex-col gap-5 justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <WidgetOmzet />
            <WidgetLegalitas />
          </div>
          <WidgetAliranKas />
        </div>
      </div>

      {/* Bottom Section: Campaign Crowdfunding Anda */}
      <SectionCampaign />
    </div>
  );
}
