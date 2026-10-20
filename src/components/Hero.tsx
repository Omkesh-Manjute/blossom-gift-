import React from 'react';
import { Sparkles, ArrowRight, Truck, Gift, ShieldCheck, Headphones, Heart, Star, Flame } from 'lucide-react';
import { ProductVisual } from './ProductVisual';
import { AnimatedRays } from './ui/animated-rays';
import { InteractiveHoverButton } from './ui/interactive-hover-button';
import { RadialGlowButton } from './ui/radial-glow-button';

interface HeroProps {
  onShopClick: () => void;
  onCustomClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onCustomClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FFF0F5] via-[#FFE4EC] to-[#FCE7F0] border-b border-pink-100">
      {/* Vengeance UI: Animated Rays Background Effect */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AnimatedRays />
      </div>

      {/* Floating decorative ambient heart & petal particles */}
      <div className="absolute top-10 left-12 w-6 h-6 text-pink-300 opacity-60 animate-float pointer-events-none">
        ♥
      </div>
      <div className="absolute top-24 right-1/3 w-8 h-8 text-pink-400 opacity-40 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }}>
        ♥
      </div>
      <div className="absolute bottom-16 left-1/4 w-5 h-5 text-pink-300 opacity-50 animate-float pointer-events-none" style={{ animationDelay: '2.5s' }}>
        ♥
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 lg:pt-16 lg:pb-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTA Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            {/* Sparkle Kicker */}
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#E8436E] mb-3 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>MAKE EVERY <strong className="text-[#881337]">MOMENT SPECIAL</strong></span>
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            </div>

            {/* Headline with Serif & Script pairing matching Gifty WorkDo Shopify demo */}
            <h1 className="leading-[1.1] mb-4">
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#881337] block tracking-tight">
                Personalized Gifts
              </span>
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#E8436E] block mt-1">
                for Your Loved Ones
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg mb-7">
              Explore custom photo mugs, handcrafted oak frames, luxury chocolate hampers, toys, and surprise explosion boxes – handcrafted with love in Gondia.
            </p>

            {/* Vengeance UI Dual Buttons ("Shop Now" & "Customize Photo Mug") */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <InteractiveHoverButton
                onClick={onShopClick}
                className="bg-[#E8436E] border-rose-400 hover:bg-[#d4335c] text-white shadow-lg shadow-pink-300/50"
              >
                Explore All Gifts
              </InteractiveHoverButton>

              <RadialGlowButton
                onClick={onCustomClick}
                className="bg-[#124282] text-white hover:bg-[#0e3568]"
              >
                <Sparkles className="w-4 h-4 text-[#F4C62E]" />
                <span>Customize Photo Mug</span>
              </RadialGlowButton>
            </div>

            {/* Rating trust pill */}
            <div className="flex items-center gap-3 bg-white/85 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-pink-200 shadow-xs">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 font-bold text-stone-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                  <span className="text-stone-400 font-normal">· Over 1,200+ Gondia orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Gifting Arrangement (Realistic 3D Mug + Hamper Showcase) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient Backlight Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-300/40 via-amber-200/30 to-pink-400/20 blur-3xl -z-10" />

            {/* Hero Main Card with Real 3D Photo Mug Display */}
            <div className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-pink-200/80">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-stone-800">
                    Live Photo Print Simulation
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#E8436E] bg-pink-50 px-2.5 py-0.5 rounded-full">
                  Sublimation Cured
                </span>
              </div>

              {/* 3D Mug Visual with Couple Photo Wrapped Around Ceramic */}
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#FDFCFA] to-[#E9E2D5] shadow-inner relative flex items-center justify-center">
                <ProductVisual
                  category="Customized Mugs"
                  name="Personalized Ceramic Magic Photo Mug"
                  showCustomPreview={true}
                  customization={{
                    recipientName: 'Priya & Rahul',
                    customMessage: 'Happy 3rd Anniversary!',
                    photoUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80',
                    giftWrap: 'luxury_satin_box',
                  }}
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Interactive Trigger */}
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-stone-100">
                <div>
                  <span className="text-xs font-serif font-bold text-stone-900 block">
                    Magic Heat-Reveal Mug
                  </span>
                  <span className="text-[10px] text-stone-500">Pour hot coffee to see photo</span>
                </div>
                <button
                  type="button"
                  onClick={onCustomClick}
                  className="px-4 py-2 bg-[#E8436E] hover:bg-[#d4335c] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Test Customizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating Badge - 40% OFF */}
            <div className="absolute -top-3 -right-2 sm:right-4 bg-gradient-to-tr from-[#124282] to-[#1e5eb3] text-white p-3 rounded-2xl shadow-xl border-2 border-white flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#F4C62E] uppercase">Today Only</span>
              <span className="font-mono text-base font-black">40% OFF</span>
            </div>

            {/* Floating Badge - Cash on Delivery */}
            <div className="absolute -bottom-4 -left-2 sm:left-4 bg-white text-stone-900 p-2.5 px-4 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div className="text-left">
                <span className="text-[10px] text-stone-500 block leading-none">Doorstep</span>
                <span className="text-xs font-bold text-stone-900 leading-none">100% Safe COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip beneath Hero */}
      <div className="bg-white/80 backdrop-blur-md border-t border-pink-100/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E8436E] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Free Gondia Delivery</h4>
                <p className="text-[11px] text-stone-500">On all orders above ₹499</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Handcrafted & Tested</h4>
                <p className="text-[11px] text-stone-500">Archival sublimation print</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Cash on Delivery</h4>
                <p className="text-[11px] text-stone-500">Pay when gift reaches you</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">WhatsApp Preview</h4>
                <p className="text-[11px] text-stone-500">Photo approval before print</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
