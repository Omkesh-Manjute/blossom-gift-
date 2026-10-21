import React, { useState } from 'react';
import {
  Gift,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'shop' | 'customized' | 'track' | 'admin' | 'about') => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const categories = [
    'Birthday Gifts',
    'Anniversary Gifts',
    'Wedding Gifts',
    'Toys & Soft Toys',
    'Photo Mugs',
    'Greeting Cards',
    'Gift Hampers',
    'Customized Gifts',
  ];

  return (
    <footer id="footer-contact" className="bg-[#FFF5F8] border-t border-pink-200/60 pt-12 pb-8 text-stone-700 relative overflow-hidden">
      {/* Decorative ambient subtle background flowers */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 text-left pb-12 border-b border-pink-200/60">
          {/* Column 1: Brand Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E8436E] to-[#FA709A] text-white flex items-center justify-center shadow-md shadow-pink-200">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-extrabold text-xl tracking-tight text-[#1E293B] leading-none">
                    BLOSSOM
                  </span>
                  <span className="font-extrabold text-xl tracking-tight text-[#E8436E] ml-1.5 leading-none">
                    GIFT
                  </span>
                </div>
                <span className="text-[10px] font-medium text-stone-500 tracking-tight block mt-0.5">
                  Gift, Greet & Toys Whole Sale & Retail
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed pr-2">
              Your one stop destination for personalized gifts, greeting cards, toys and special occasion hampers in Gondia. We create happiness for your loved ones with unique customized collections.
            </p>

            {/* Social Icons matching Screenshot */}
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918208589775"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110 cursor-pointer"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/theblossomgiftshop?mdxt=MW9oY2hzdmpncDFzYQ=="
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110 cursor-pointer text-xs font-bold"
                title="Follow on Instagram @theblossomgiftshop"
              >
                IG
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110 cursor-pointer text-xs font-bold"
                title="Facebook"
              >
                f
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@blossomgiftcentergondiam.h925"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#FF0000] hover:bg-[#e60000] text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110 cursor-pointer text-xs font-bold"
                title="Blossom Gift Centre YouTube Channel"
              >
                ▶
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('shop')}
                  className="text-stone-600 hover:text-[#E8436E] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('shop')}
                  className="text-stone-600 hover:text-[#E8436E] transition-colors cursor-pointer"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="text-stone-600 hover:text-[#E8436E] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('footer-contact');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-stone-600 hover:text-[#E8436E] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('admin')}
                  className="text-stone-600 hover:text-[#E8436E] transition-colors cursor-pointer"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('track')}
                  className="text-stone-600 hover:text-[#E8436E] transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat);
                      onNavClick('shop');
                      const el = document.getElementById('catalog-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-stone-600 hover:text-[#E8436E] transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E8436E] shrink-0 mt-0.5" />
                <span>Gupta Complex, Near N.M.D. College, Gondia (M.S.)</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-[#E8436E] shrink-0" />
                <span>8208589775 | 9673155741</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E8436E] shrink-0" />
                <span>blossomgift@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E8436E] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-[11px] text-stone-500">Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-xs text-stone-600">
              Get latest offers, new products and gift ideas.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E8436E]"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#E8436E] hover:bg-[#d4335c] text-white py-2 rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                {subscribed ? 'Subscribed! 🎉' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Policy & Copyright Row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Shipping Policy</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">Return & Cancellation Policy</span>
            <span>|</span>
            <span className="hover:underline cursor-pointer">FAQ</span>
          </div>

          <div>
            © 2026 Blossom Gift. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
