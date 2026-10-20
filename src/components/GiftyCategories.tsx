import React from 'react';
import { Cake, Heart, Users, Smile, Mail, Coffee, Gift, Lightbulb, Sparkles } from 'lucide-react';

interface GiftyCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORY_ITEMS = [
  {
    name: 'Toys/RC Cars',
    label: 'Toys / RC Cars',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=300&auto=format&fit=crop&q=80',
    count: 'Metal & RC',
    badge: 'Hot New',
  },
  {
    name: 'Wall Watches',
    label: 'Wall Watches',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&auto=format&fit=crop&q=80',
    count: 'Silent Quartz',
    badge: 'Trending',
  },
  {
    name: 'Decorative Items',
    label: 'Decorative Items',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=300&auto=format&fit=crop&q=80',
    count: 'Vases & Urlis',
    badge: 'Aesthetic',
  },
  {
    name: 'Customized Mugs',
    label: 'Photo Mugs',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
    count: '3 styles',
    badge: 'Popular',
  },
  {
    name: 'Photo Frames',
    label: 'Oak Frames',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&auto=format&fit=crop&q=80',
    count: 'Solid wood',
    badge: 'Handcrafted',
  },
  {
    name: 'Gift Hampers',
    label: 'Gourmet Hampers',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80',
    count: 'Luxury packs',
    badge: 'Best Value',
  },
  {
    name: 'LED Lamps',
    label: '3D LED Lamps',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=80',
    count: 'Warm light',
    badge: 'Trending',
  },
  {
    name: 'Explosion Boxes',
    label: 'Explosion Box',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&auto=format&fit=crop&q=80',
    count: '16 photos',
    badge: 'Surprise',
  },
  {
    name: 'Greeting Cards',
    label: 'Greeting Cards',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=300&auto=format&fit=crop&q=80',
    count: 'Gold foil',
    badge: 'From ₹149',
  },
  {
    name: 'Toys',
    label: 'Teddy & Plush',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=300&auto=format&fit=crop&q=80',
    count: 'Soft cuddle',
    badge: 'Cute',
  },
  {
    name: 'Customized Gifts',
    label: 'Custom Gifts',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&auto=format&fit=crop&q=80',
    count: 'Cushions & More',
    badge: 'Personalized',
  },
];

export const GiftyCategories: React.FC<GiftyCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div id="categories-strip" className="py-8 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5 text-left">
          <div>
            <span className="text-[10px] font-bold text-[#E8436E] uppercase tracking-wider block">
              Curated Collections
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-stone-900">
              Shop Gifts by Category
            </h3>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-bold text-[#124282] hover:underline cursor-pointer"
            >
              Show All Categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORY_ITEMS.map((item) => {
            const isSelected = selectedCategory === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onSelectCategory(isSelected ? 'all' : item.name)}
                className={`group flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 cursor-pointer text-center bg-[#FAF8F6] ${
                  isSelected
                    ? 'border-[#E8436E] ring-2 ring-[#E8436E]/40 bg-pink-50/50 shadow-md scale-103'
                    : 'border-stone-200/90 hover:border-pink-300 hover:shadow-md hover:scale-102 hover:bg-white'
                }`}
              >
                {/* Circular Category Photo with Zoom */}
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden shadow-xs border-2 border-white mb-2.5 transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                <span className="text-xs font-bold text-stone-900 group-hover:text-[#E8436E] transition-colors leading-tight line-clamp-1">
                  {item.label}
                </span>

                <span className="text-[10px] text-stone-400 mt-0.5">
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
