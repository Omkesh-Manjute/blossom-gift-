import React from 'react';
import { OccasionType } from '../types';

interface OccasionBarProps {
  selectedOccasion: string;
  onSelectOccasion: (occ: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

const OCCASIONS: { label: string; value: string }[] = [
  { label: 'All Occasions', value: 'all' },
  { label: '🎂 Birthday', value: 'Birthday' },
  { label: '💍 Anniversary', value: 'Anniversary' },
  { label: '❤️ Valentine’s Day', value: "Valentine's Day" },
  { label: '✨ Wedding', value: 'Wedding' },
  { label: '🪔 Festivals', value: 'Festivals' },
];

export const OccasionBar: React.FC<OccasionBarProps> = ({
  selectedOccasion,
  onSelectOccasion,
  selectedCategory,
  onSelectCategory,
  categories,
}) => {
  return (
    <div className="py-6 border-b border-[#EBE7DF] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Occasions Row */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2.5 block">
            Shop by Occasion
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {OCCASIONS.map((occ) => {
              const isActive = selectedOccasion === occ.value;
              return (
                <button
                  key={occ.value}
                  onClick={() => onSelectOccasion(occ.value)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#292525] text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-[#F3EFE6] border border-[#E7E2D8]'
                  }`}
                >
                  {occ.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Secondary Segment */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-stone-600">
          <span className="font-medium text-stone-400 whitespace-nowrap shrink-0">Categories:</span>
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-100/80 text-amber-900 font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-100/80 text-amber-900 font-semibold'
                  : 'hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
