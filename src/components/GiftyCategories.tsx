import React from 'react';
import {
  Cake,
  Heart,
  Users,
  Smile,
  Mail,
  Coffee,
  Gift,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

interface GiftyCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const GiftyCategories: React.FC<GiftyCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'cat-birthday',
      name: 'Birthday Gifts',
      shortName: 'Birthday',
      filterVal: 'Birthday Gifts',
      icon: Cake,
      bgColor: 'bg-[#FFF0F5]',
      iconBg: 'bg-rose-100 text-rose-500',
      activeRing: 'ring-rose-400',
    },
    {
      id: 'cat-anniversary',
      name: 'Anniversary Gifts',
      shortName: 'Anniversary',
      filterVal: 'Anniversary Gifts',
      icon: Heart,
      bgColor: 'bg-[#FFF1F2]',
      iconBg: 'bg-pink-100 text-[#E8436E]',
      activeRing: 'ring-pink-400',
    },
    {
      id: 'cat-wedding',
      name: 'Wedding Gifts',
      shortName: 'Wedding',
      filterVal: 'Wedding Gifts',
      icon: Users,
      bgColor: 'bg-[#FEFCE8]',
      iconBg: 'bg-amber-100 text-amber-600',
      activeRing: 'ring-amber-400',
    },
    {
      id: 'cat-toys',
      name: 'Toys & Soft Toys',
      shortName: 'Toys',
      filterVal: 'Toys & Soft Toys',
      icon: Smile,
      bgColor: 'bg-[#ECFDF5]',
      iconBg: 'bg-emerald-100 text-emerald-600',
      activeRing: 'ring-emerald-400',
    },
    {
      id: 'cat-cards',
      name: 'Greeting Cards',
      shortName: 'Cards',
      filterVal: 'Greeting Cards',
      icon: Mail,
      bgColor: 'bg-[#FAF5FF]',
      iconBg: 'bg-purple-100 text-purple-600',
      activeRing: 'ring-purple-400',
    },
    {
      id: 'cat-mugs',
      name: 'Photo Mugs',
      shortName: 'Photo Mugs',
      filterVal: 'Photo Mugs',
      icon: Coffee,
      bgColor: 'bg-[#F0F9FF]',
      iconBg: 'bg-sky-100 text-sky-600',
      activeRing: 'ring-sky-400',
    },
    {
      id: 'cat-hampers',
      name: 'Gift Hampers',
      shortName: 'Hampers',
      filterVal: 'Gift Hampers',
      icon: Gift,
      bgColor: 'bg-[#FFF1F2]',
      iconBg: 'bg-rose-100 text-rose-600',
      activeRing: 'ring-rose-400',
    },
    {
      id: 'cat-custom',
      name: 'Customized Gifts',
      shortName: 'Custom',
      filterVal: 'Customized Gifts',
      icon: Lightbulb,
      bgColor: 'bg-[#FEFCE8]',
      iconBg: 'bg-yellow-100 text-yellow-600',
      activeRing: 'ring-yellow-400',
    },
  ];

  return (
    <section className="py-6 sm:py-8 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Grid: 4 columns on mobile (2 rows), 8 columns on desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.filterVal;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(isSelected ? 'all' : cat.filterVal);
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border ${
                  isSelected
                    ? `border-[#E8436E] ring-2 ring-pink-200 shadow-md ${cat.bgColor}`
                    : `border-stone-100 hover:border-pink-200 hover:shadow-md ${cat.bgColor}`
                }`}
              >
                {/* Icon Container with Badge */}
                <div
                  className={`w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-2.5 transition-transform duration-300 group-hover:scale-110 shadow-xs ${cat.iconBg}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Category Title (responsive short name on small screens, full name on md+) */}
                <span className="text-[10px] sm:text-xs font-bold text-stone-800 text-center leading-tight line-clamp-2 group-hover:text-[#E8436E] transition-colors">
                  <span className="sm:hidden">{cat.shortName}</span>
                  <span className="hidden sm:inline">{cat.name}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
