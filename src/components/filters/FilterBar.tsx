"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/mockData";
import { Category } from "@/types";

interface FilterBarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export default function FilterBar({ activeCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 mb-8 custom-scrollbar hide-scroll-arrows">
      <div className="flex items-center gap-3 min-w-max px-6">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive 
                  ? "text-dark-bg bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                  : "text-fog glass hover:text-cream hover:border-gold/30"
              }`}
            >
              <span className="flex items-center gap-2">
                {category.id !== 'all' && <span>{category.emoji}</span>}
                <span>{category.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
