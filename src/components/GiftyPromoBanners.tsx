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
    <section className="py-10 bg-[#FCFCFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Promo Card 1: Heat-Reveal Magic Mug Showcase with Live Countdown */}
          <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white p-7 sm:p-9 shadow-xl overflow-hidden flex flex-col justify-between min-h-[320px] border border-amber-500/30">
            {/* Ambient Background Glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-xs text-amber-400 text-xs font-bold border border-amber-400/30">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>DEAL OF THE DAY · 40% OFF</span>
                </div>

                {/* Live Countdown Timer */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white text-[11px] font-mono border border-white/10">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')} Left
                  </span>
                </div>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                Personalized Magic <br />
                <span className="text-amber-400">Heat-Reveal Photo Mug</span>
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 max-w-sm leading-relaxed mb-6">
                Pour hot coffee or tea and watch your favorite romantic memories and photos reveal like magic before your eyes!
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/15">
              <button
                type="button"
                onClick={onCustomizeClick}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl text-xs sm:text-sm shadow-md shadow-amber-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Customize at ₹299</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <div className="text-right font-mono">
                <span className="text-xs line-through text-stone-400 block">MRP ₹499</span>
                <span className="text-base font-bold text-amber-400">Save ₹200 (40%)</span>
              </div>
            </div>
          </div>

          {/* Promo Card 2: Handcrafted Oak Frame & Gourmet Hamper */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF7] via-[#FFFBEB] to-[#FEF3C7] border border-amber-200 text-stone-900 p-7 sm:p-9 shadow-md overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-200">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span>CURATED LUXURY GIFTING</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight mb-2">
                Handcrafted Keepsakes <br />
                <span className="text-amber-700 font-script text-3xl font-normal">& Gourmet Hampers</span>
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed mb-6">
                Artisanal wooden oak photo frames, Ferrero Rocher luxury baskets, scented candles, and golden wax-sealed greeting cards.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-amber-200">
              <button
                type="button"
                onClick={onShopClick}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl text-xs sm:text-sm shadow-md shadow-amber-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Hampers</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <div className="text-right">
                <span className="text-xs text-stone-500 block">Starting from</span>
                <span className="text-base font-bold text-amber-800 font-mono">₹149 Onwards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
