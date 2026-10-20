import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock, Gift, Heart, ShieldCheck, Flame, Tag } from 'lucide-react';

interface GiftyPromoBannersProps {
  onCustomizeClick: () => void;
  onShopClick: () => void;
}

export const GiftyPromoBanners: React.FC<GiftyPromoBannersProps> = ({
  onCustomizeClick,
  onShopClick,
}) => {
  // Real live countdown clock for Deal of the Day (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 bg-[#FAFBFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Promo Card 1: Heat-Reveal Magic Mug Showcase with Live Countdown */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#124282] via-[#1a4f94] to-[#0d2f5e] text-white p-7 sm:p-9 shadow-xl overflow-hidden flex flex-col justify-between min-h-[320px]">
            {/* Ambient Background Glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#F4C62E]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[#F4C62E] text-xs font-bold border border-white/20">
                  <Flame className="w-3.5 h-3.5 text-[#F4C62E] animate-bounce" />
                  <span>DEAL OF THE DAY · 40% OFF</span>
                </div>

                {/* Live Countdown Timer */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white text-[11px] font-mono border border-white/10">
                  <Clock className="w-3 h-3 text-amber-300" />
                  <span>
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')} Left
                  </span>
                </div>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                Personalized Magic <br />
                <span className="text-[#F4C62E]">Heat-Reveal Photo Mug</span>
              </h3>

              <p className="text-xs sm:text-sm text-blue-100 max-w-sm leading-relaxed mb-6">
                Pour hot coffee or tea and watch your favorite romantic memories and photos reveal like magic before your eyes!
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/15">
              <button
                type="button"
                onClick={onCustomizeClick}
                className="px-5 py-2.5 bg-[#F4C62E] hover:bg-[#e0b422] text-[#124282] font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Customize at ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-right font-mono">
                <span className="text-xs line-through text-blue-300 block">MRP ₹499</span>
                <span className="text-base font-bold text-white">Save ₹200 (40%)</span>
              </div>
            </div>
          </div>

          {/* Promo Card 2: Handcrafted Oak Frame & Gourmet Hamper */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#FFF5F7] via-[#FFF8E8] to-[#FFF0F3] border border-rose-200/80 text-stone-900 p-7 sm:p-9 shadow-md overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#E95D79]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E95D79]/10 text-[#E95D79] text-xs font-bold mb-3 border border-[#E95D79]/20">
                <Gift className="w-3.5 h-3.5 text-[#E95D79]" />
                <span>CURATED LUXURY GIFTING</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#881337] leading-tight mb-2">
                Handcrafted Keepsakes <br />
                <span className="text-[#E95D79] font-script text-3xl font-normal">& Gourmet Hampers</span>
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed mb-6">
                Artisanal wooden oak photo frames, Ferrero Rocher luxury baskets, scented candles, and golden wax-sealed greeting cards.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-rose-200/60">
              <button
                type="button"
                onClick={onShopClick}
                className="px-5 py-2.5 bg-[#881337] hover:bg-[#6e0f2c] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Hampers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-right">
                <span className="text-xs text-stone-500 block">Starting from</span>
                <span className="text-base font-bold text-[#881337] font-mono">₹149 Onwards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
