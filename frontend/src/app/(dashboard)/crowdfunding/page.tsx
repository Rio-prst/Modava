"use client";

import { useState } from "react";
import ExploreHeader from "@/components/crowdfunding/explore-header";
import CategoryFilter from "@/components/crowdfunding/category-filter";
import CampaignGrid from "@/components/crowdfunding/campaign-grid";
import FloatingCta from "@/components/crowdfunding/floating-cta";

export default function CrowdfundingPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  return (
    <div className="space-y-6 relative pb-12">
      <ExploreHeader />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <CampaignGrid selectedCategory={selectedCategory} />
      <FloatingCta />
    </div>
  );
}
