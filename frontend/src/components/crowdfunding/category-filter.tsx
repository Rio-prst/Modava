"use client";

const categories = [
  "Semua Kategori",
  "KULINER",
  "KERAJINAN",
  "TEKSTIL",
  "AGRIKULTUR",
  "FASHION",
  "TEKNOLOGI",
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => {
        const isActive = cat.toLowerCase() === selectedCategory.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`shrink-0 rounded-full px-5 py-2 text-[13px] font-medium transition cursor-pointer ${
              isActive
                ? "bg-[#0A2328] text-white font-bold shadow-sm"
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
