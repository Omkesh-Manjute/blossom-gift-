import React, { useState } from 'react';
import { Truck, Gift, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onCustomClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onCustomClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/918208589775?text=Hello%20Blossom%20Gift%20Gondia%2C%20I%20would%20like%20to%20order%20gifts%20from%20the%20website!',
      '_blank'
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#fc9db4] via-[#fdb7c8] to-[#f48da1] border-b border-pink-200">
      {/* Floating subtle ambient heart particles */}
      <div className="absolute top-6 left-12 text-white/40 text-xl animate-float pointer-events-none select-none">
        ♥
      </div>
      <div
        className="absolute top-16 right-1/4 text-white/30 text-2xl animate-float pointer-events-none select-none"
        style={{ animationDelay: '1.2s' }}
      >
        ♥
      </div>
      <div
        className="absolute bottom-12 left-1/3 text-white/35 text-base animate-float pointer-events-none select-none"
        style={{ animationDelay: '2.4s' }}
      >
        ♥
      </div>
      <div
        className="absolute top-1/2 right-10 text-white/40 text-3xl animate-float pointer-events-none select-none"
        style={{ animationDelay: '3.1s' }}
      >
        ♥
      </div>

      {/* Main Full-Width Panoramic Banner Canvas */}
      <div className="w-full max-w-[1536px] mx-auto relative select-none">
        {/* Banner Picture with Responsive Sources */}
        <picture>
          <source media="(max-width: 640px)" srcSet="/hero_banner_mobile.png" />
          <img
            src="/hero_banner_clean.png"
            alt="Blossom Gift - Personalized Gifts for Your Loved Ones"
            className="w-full h-auto block object-cover"
            draggable={false}
          />
        </picture>

        {/* 1. Interactive 'Shop Now →' Button Hotspot */}
        {/* Desktop: left 5.6%, top 68.5%, width 12.3%, height 11.9% */}
        {/* Mobile: left 7.8%, top 68.5%, width 17.2%, height 11.9% */}
        <div
          className="absolute max-sm:hidden"
          style={{
            left: '5.6%',
            top: '68.5%',
            width: '12.3%',
            height: '11.9%',
          }}
        >
          <button
            onClick={onShopClick}
            aria-label="Shop Now for Personalized Gifts"
            className="w-full h-full rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group relative flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            {/* Shimmer sweep effect on hover */}
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/25 transition-all rounded-full pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-pink-400/0 group-hover:bg-pink-400/30 blur-xs transition-all pointer-events-none" />
          </button>
        </div>

        {/* Mobile 'Shop Now' Hotspot */}
        <div
          className="absolute sm:hidden"
          style={{
            left: '7.8%',
            top: '68.5%',
            width: '17.2%',
            height: '11.9%',
          }}
        >
          <button
            onClick={onShopClick}
            aria-label="Shop Now"
            className="w-full h-full rounded-full cursor-pointer active:scale-95 transition-all group relative flex items-center justify-center overflow-hidden focus:outline-none"
          >
            <span className="absolute inset-0 bg-white/0 active:bg-white/30 rounded-full" />
          </button>
        </div>

        {/* 2. Interactive Hotspots for the 4 Bottom Features (Desktop / Tablet) */}
        {/* Feature 1: Local Delivery in Gondia */}
        <a
          href="#contact"
          style={{
            left: '4.8%',
            top: '82.5%',
            width: '8.8%',
            height: '14.5%',
          }}
          className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
          title="Local Doorstep Delivery across Gondia (M.S.)"
        />

        {/* Feature 2: Customized Gifts */}
        <button
          onClick={() => {
            if (onCustomClick) onCustomClick();
            else onShopClick();
          }}
          style={{
            left: '14.2%',
            top: '82.5%',
            width: '8.5%',
            height: '14.5%',
          }}
          className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
          title="Customized Gifts personalized with love"
        />

        {/* Feature 3: Best Quality Products */}
        <button
          onClick={onShopClick}
          style={{
            left: '23.3%',
            top: '82.5%',
            width: '8.5%',
            height: '14.5%',
          }}
          className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
          title="100% Best Quality Products guaranteed"
        />

        {/* Feature 4: Order on WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          style={{
            left: '32.4%',
            top: '82.5%',
            width: '8.8%',
            height: '14.5%',
          }}
          className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
          title="Chat & Order on WhatsApp (+91 8208589775)"
        />

        {/* 3. Interactive Carousel Dots (Bottom Center) */}
        <div
          className="absolute flex items-center justify-center gap-1.5 cursor-pointer"
          style={{
            left: '46.0%',
            top: '92.0%',
            width: '6.0%',
            height: '6.5%',
          }}
        >
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className="h-full flex items-center justify-center p-0.5 cursor-pointer focus:outline-none"
              aria-label={`Slide ${idx + 1}`}
            >
              <span
                className={`transition-all duration-300 rounded-full block ${
                  activeSlide === idx
                    ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-[#E8436E]'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/90 hover:bg-white'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile-Friendly Trust Badges Strip (visible on mobile screens for easy tapping) */}
      <div className="sm:hidden bg-white/70 backdrop-blur-xs border-t border-pink-200/80 px-4 py-3 grid grid-cols-2 gap-2 text-left">
        <a
          href="#contact"
          className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-pink-100 shadow-2xs"
        >
          <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#E8436E] flex items-center justify-center shrink-0">
            <Truck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight">Local Delivery</h4>
            <p className="text-[9px] text-stone-500">in Gondia</p>
          </div>
        </a>

        <button
          onClick={() => {
            if (onCustomClick) onCustomClick();
            else onShopClick();
          }}
          className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-pink-100 shadow-2xs text-left"
        >
          <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#E8436E] flex items-center justify-center shrink-0">
            <Gift className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight">Customized Gifts</h4>
            <p className="text-[9px] text-stone-500">With Love</p>
          </div>
        </button>

        <button
          onClick={onShopClick}
          className="flex items-center gap-2 p-2 rounded-xl bg-white/80 border border-pink-100 shadow-2xs text-left"
        >
          <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#E8436E] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight">Best Quality</h4>
            <p className="text-[9px] text-stone-500">100% Assured</p>
          </div>
        </button>

        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-2 p-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 shadow-2xs text-left"
        >
          <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight">WhatsApp Order</h4>
            <p className="text-[9px] text-[#128C7E] font-medium">+91 8208589775</p>
          </div>
        </button>
      </div>
    </section>
  );
};
