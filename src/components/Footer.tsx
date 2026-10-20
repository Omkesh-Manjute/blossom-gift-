import React from 'react';
import { Heart, MapPin, Phone, MessageSquare, ShieldCheck, Gift, Clock, Truck } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'shop' | 'customized' | 'track' | 'admin' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#0e2a52] text-white text-xs border-t border-blue-950">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left">
          {/* Brand & Boutique Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F4C62E] text-[#124282] flex items-center justify-center font-bold shadow-md">
                <Gift className="w-5 h-5" />
              </div>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-white block">
                BLOSSOM GIFT
              </span>
            </div>

            <p className="text-blue-100 text-xs leading-relaxed max-w-sm">
              Gondia's premier personalized gifting studio. We specialize in heat-reveal magic ceramic mugs, handcrafted solid oak photo frames, romantic LED night lamps, and luxury gourmet chocolate hampers.
            </p>

            <div className="pt-2 text-blue-200 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F4C62E] shrink-0 mt-0.5" />
                <span>Gupta Complex, Near N.M.D. College, Gondia, Maharashtra - 441614</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-[#F4C62E] shrink-0" />
                <span>+91 8208589775 / +91 9673155741</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F4C62E] shrink-0" />
                <span>Open 7 Days a Week: 10:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Collection Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs">
              Gifting Categories
            </h4>
            <ul className="space-y-2 text-blue-200">
              <li>
                <button
                  onClick={() => onNavClick('customized')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Personalized Magic Mugs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('customized')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Handcrafted Oak Frames
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Gourmet Hampers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('customized')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom 3D Acrylic LED Lamps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Handmade Surprise Explosion Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Local COD Assurance */}
          <div className="md:col-span-4 space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-white font-bold text-xs">
              <ShieldCheck className="w-5 h-5 text-[#F4C62E]" />
              <span>Gondia Doorstep COD Assurance</span>
            </div>
            <p className="text-blue-200 text-[11px] leading-relaxed">
              Order online with zero advance payment. Inspect your customized gift upon arrival and pay cash or UPI at your doorstep.
            </p>

            <a
              href="https://wa.me/918208589775?text=Hello%20Blossom%20Gift%20Gondia!%20I%20have%20an%20inquiry%20about%20a%20personalized%20gift."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 8208589775)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-900/60 py-4 px-4 sm:px-6 lg:px-8 text-[11px] text-blue-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <p>© 2026 BLOSSOM GIFT · Gupta Complex, Gondia, Maharashtra. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavClick('track')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavClick('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Store Policies & Map
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavClick('admin')}
              className="hover:text-[#F4C62E] transition-colors cursor-pointer font-bold text-amber-300"
            >
              Merchant Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
