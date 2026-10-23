import React from 'react';
import {
  Cake,
  Heart,
  Users,
  Smile,
  Mail,
  Coffee,
  Gift,
  Lightbulb,
  Clock,
  Flame,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface GiftyCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const GiftyCategories: React.FC<GiftyCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { theme } = useTheme();
  const isCrimson = theme === 'crimson';

  const categories = [
    {
      id: 'cat-all',
      name: 'All Gifts',
      shortName: 'All',
      filterVal: 'all',
      icon: Flame,
      bgColor: isCrimson
        ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white'
        : 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-stone-950',
      iconColor: isCrimson ? 'text-white' : 'text-stone-950',
    },
    {
      id: 'cat-custom',
      name: 'Customized Gifts',
      shortName: 'Custom Gifts',
      filterVal: 'Customized Gifts',
      icon: Lightbulb,
      bgColor: 'bg-yellow-50 text-amber-700',
      iconColor: 'text-amber-600',
    },
    {
      id: 'cat-mugs',
      name: 'Photo Mugs',
      shortName: 'Photo Mugs',
      filterVal: 'Photo Mugs',
      icon: Coffee,
      bgColor: 'bg-sky-50 text-sky-700',
      iconColor: 'text-sky-600',
    },
    {
      id: 'cat-birthday',
      name: 'Birthday Gifts',
      shortName: 'Birthday',
      filterVal: 'Birthday Gifts',
      icon: Cake,
      bgColor: 'bg-amber-50 text-amber-800',
      iconColor: 'text-amber-700',
    },
    {
      id: 'cat-anniversary',
      name: 'Anniversary Gifts',
      shortName: 'Anniversary',
      filterVal: 'Anniversary Gifts',
      icon: Heart,
      bgColor: 'bg-rose-50 text-rose-700',
      iconColor: 'text-rose-600',
    },
    {
      id: 'cat-toys',
      name: 'Toys & Soft Toys',
      shortName: 'Toys',
      filterVal: 'Toys & Soft Toys',
      icon: Smile,
      bgColor: 'bg-emerald-50 text-emerald-700',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'cat-hampers',
      name: 'Gift Hampers',
      shortName: 'Hampers',
      filterVal: 'Gift Hampers',
      icon: Gift,
      bgColor: 'bg-purple-50 text-purple-700',
      iconColor: 'text-purple-600',
    },
    {
      id: 'cat-watches',
      name: 'Wall Watches',
      shortName: 'Clocks',
      filterVal: 'Wall Watches',
      icon: Clock,
      bgColor: 'bg-stone-100 text-stone-800',
      iconColor: 'text-stone-700',
    },
    {
      id: 'cat-wedding',
      name: 'Wedding Gifts',
      shortName: 'Wedding',
      filterVal: 'Wedding Gifts',
      icon: Users,
      bgColor: 'bg-orange-50 text-orange-700',
      iconColor: 'text-orange-600',
    },
    {
      id: 'cat-cards',
      name: 'Greeting Cards',
      shortName: 'Cards',
      filterVal: 'Greeting Cards',
      icon: Mail,
      bgColor: 'bg-pink-50 text-pink-700',
      iconColor: 'text-pink-600',
    },
  ];

  return (
    <section className="py-3.5 sm:py-5 bg-white border-b border-stone-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flipkart-Style Horizontal Story Strips for Mobile + Desktop Wrap */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.filterVal;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.filterVal);
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex flex-col items-center justify-center shrink-0 cursor-pointer transition-all duration-300 transform active:scale-95 focus:outline-none"
              >
                {/* Circular Story Ring / Avatar matching Flipkart/Blinkit */}
                <div
                  className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-105 p-1 ${
                    isSelected
                      ? isCrimson
                        ? 'ring-3 ring-red-600 ring-offset-2 scale-105 shadow-md'
                        : 'ring-3 ring-amber-500 ring-offset-2 scale-105 shadow-md'
                      : 'ring-1 ring-stone-200/90 group-hover:ring-stone-400'
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center ${cat.bgColor} transition-colors`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* Short Label below */}
                <span
                  className={`text-[10px] sm:text-xs font-bold mt-1.5 transition-colors text-center truncate max-w-[70px] sm:max-w-[85px] ${
                    isSelected
                      ? isCrimson
                        ? 'text-red-600 font-black'
                        : 'text-amber-800 font-black'
                      : 'text-stone-700 group-hover:text-stone-900'
                  }`}
                >
                  {cat.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
