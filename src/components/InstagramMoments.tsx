import React from 'react';
import { Instagram, Heart, Sparkles, MessageCircle } from 'lucide-react';

const MOMENTS = [
  {
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&auto=format&fit=crop&q=80',
    caption: 'Anniversary Magic Mug delivery in Ramnagar, Gondia ❤️',
    likes: '142',
    tag: '#MagicMug',
  },
  {
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80',
    caption: 'Surprise birthday hamper delivered on time! 🎂',
    likes: '238',
    tag: '#BirthdaySurprise',
  },
  {
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&auto=format&fit=crop&q=80',
    caption: 'Solid oak handcrafted wedding frame ready for dispatch ✨',
    likes: '189',
    tag: '#HandcraftedGifts',
  },
  {
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=80',
    caption: 'Custom engraved 3D LED portrait lamp glowing warm 💡',
    likes: '312',
    tag: '#LEDPortrait',
  },
  {
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop&q=80',
    caption: 'Royal gourmet chocolate & candle celebration hamper 🍫',
    likes: '205',
    tag: '#LuxuryHamper',
  },
  {
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&auto=format&fit=crop&q=80',
    caption: 'Cute plush cuddle teddy delivery for little Aarav 🧸',
    likes: '176',
    tag: '#GiftingGondia',
  },
];

export const InstagramMoments: React.FC = () => {
  return (
    <section className="py-12 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#E8436E] text-xs font-bold mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>@BLOSSOMGIFTGONDIA</span>
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-stone-900">
            Real Customer Moments & Smiles
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Tag us in your unboxing stories to get featured on our Gondia wall of fame!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {MOMENTS.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-100 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay with Instagram icon, likes and caption */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white text-left">
                <div className="flex items-center justify-between text-xs">
                  <Instagram className="w-4 h-4 text-pink-300" />
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{item.likes}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-amber-300 block mb-0.5">
                    {item.tag}
                  </span>
                  <p className="text-[10px] leading-tight line-clamp-2 text-stone-200">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
