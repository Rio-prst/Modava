import DashboardHeader from "@/components/dashboard/dashboard-header";
import WidgetSkor from "@/components/dashboard/widget-skor";
import WidgetOmzet from "@/components/dashboard/widget-omzet";
import WidgetLegalitas from "@/components/dashboard/widget-legalitas";
import SectionCampaign from "@/components/dashboard/section-campaign";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-5">
          <WidgetSkor />
        </div>
        <div className="col-span-12 md:col-span-4">
          <WidgetOmzet />
        </div>
        <div className="col-span-12 md:col-span-3">
          <WidgetLegalitas />
        </div>
      </div>

      <SectionCampaign />
    </div>
  );
}
