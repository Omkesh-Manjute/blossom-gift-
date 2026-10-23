import React, { useState } from 'react';
import { Truck, ShieldCheck, Gift, PhoneCall, Check, Mail } from 'lucide-react';

export const GiftyPerks: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div>
      {/* 4 Feature Trust Blocks */}
      <section className="bg-stone-950 text-white py-10 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Truck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Free Gondia Shipping</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">On all orders over ₹499</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/30">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Cash on Delivery</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Inspect & pay at doorstep</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Gift className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">Gift Wrap & Cards</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Deluxe satin packaging</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <PhoneCall className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-white">WhatsApp Support</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">+91 8208589775</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup (Gifty style) */}
      <section className="bg-[#FFFDF7] py-12 border-b border-amber-200/60">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Gondia Special Offer
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
            Sign up for our newsletter
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6">
            Get early access to festive gift hampers, discount coupons, and new personalized keepsake launches.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-white border border-stone-300 rounded-full pl-10 pr-4 py-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-full text-xs font-black shadow-md shadow-amber-200 transition-all cursor-pointer whitespace-nowrap"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {subscribed && (
            <p className="mt-3 text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
              <Check className="w-4 h-4" /> Thank you for subscribing to Blossom Gift updates!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
