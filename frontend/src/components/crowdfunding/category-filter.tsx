"use client";

import { useState } from "react";

const categories = [
  "Semua Kategori",
  "KULINER",
  "KERAJINAN",
  "TEKSTIL",
  "AGRIKULTUR",
  "FASHION",
  "TEKNOLOGI",
];

export default function CategoryFilter() {
  const [active, setActive] = useState("Semua Kategori");

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 rounded-full px-5 py-2 text-[13px] font-medium transition ${
              isActive
                ? "bg-[#0A2328] text-white"
                : "bg-white border border-gray-200 text-[#0A2328] hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
