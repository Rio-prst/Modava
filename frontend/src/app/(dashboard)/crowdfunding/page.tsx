import ExploreHeader from "@/components/crowdfunding/explore-header";
import CategoryFilter from "@/components/crowdfunding/category-filter";
import CampaignGrid from "@/components/crowdfunding/campaign-grid";
import FloatingCta from "@/components/crowdfunding/floating-cta";

export default function CrowdfundingPage() {
  return (
    <div className="space-y-6 relative">
      <ExploreHeader />
      <CategoryFilter />
      <CampaignGrid />
      <FloatingCta />
    </div>
  );
}
