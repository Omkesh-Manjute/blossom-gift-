import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Aniket & Sneha Trivedi',
    city: 'Ramnagar, Gondia',
    gift: 'Customized Ceramic Magic Mug',
    rating: 5,
    date: '2 days ago',
    text: 'We ordered the heat-reveal magic mug for our 2nd anniversary. When we poured hot coffee and the photo appeared with our song lyrics, my wife was in tears! The print quality is razor sharp. Blossom Gift team delivered it safely within 24 hours with Cash on Delivery.',
  },
  {
    name: 'Pooja Agrawal',
    city: 'Civil Lines, Gondia',
    gift: 'Handcrafted Oak Photo Frame (12x18)',
    rating: 5,
    date: '1 week ago',
    text: 'The natural oak wood frame looks even more luxurious in real life than on screen. Solid build, clear glass, and the photo colors are so vibrant. Will definitely order all my family birthday gifts from Blossom Gift.',
  },
  {
    name: 'Vikram Bisen',
    city: 'Near N.M.D. College, Gondia',
    gift: 'Royal Blossom Gourmet Hamper',
    rating: 5,
    date: '2 weeks ago',
    text: 'Best gift shop in Gondia hands down! The hamper basket with chocolates and scented candle was decorated like a high-end royal hamper. Smooth ordering without needing online payment upfront.',
  },
];

export const GiftyTestimonials: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#E95D79] uppercase tracking-wider block mb-1">
            Trusted by Gondia Families
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#124282]">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Real experiences from happy gift givers across Gondia and Maharashtra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAFBFD] p-6 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between text-left relative"
            >
              <div>
                {/* 5-Star Rating matching Judgeme widget */}
                <div className="flex items-center gap-1 text-[#F4C62E] mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F4C62E]" />
                  ))}
                  <span className="text-xs font-bold text-stone-700 ml-1">5.0</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-xs font-bold text-stone-900 flex items-center gap-1">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <div className="text-[11px] text-stone-500">{rev.city}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-[#124282] block">
                    {rev.gift}
                  </span>
                  <span className="text-[9px] text-stone-400">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
