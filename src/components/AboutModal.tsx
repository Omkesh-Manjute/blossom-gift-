import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Mail, ExternalLink, Heart } from 'lucide-react';
import { storeService } from '../services/storeService';

export const AboutModal: React.FC = () => {
  const settings = storeService.getSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#292525]">
          About BLOSSOM GIFT
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Your neighborhood personalized gifting studio in Gondia, Maharashtra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Story */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#EDE8DF] space-y-4 text-xs leading-relaxed text-stone-600">
          <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>Crafted with Love in Gondia</span>
          </div>

          <p>
            Welcome to <strong>BLOSSOM GIFT</strong>! Situated in the heart of Gondia at Gupta Complex, Near N.M.D. College, we are passionate about celebrating life's most cherished connections. Whether it's an anniversary, birthday, wedding, or quiet moment of gratitude, a personalized gift holds memories that last a lifetime.
          </p>

          <p>
            We specialize in custom heat-sensitive magic mugs, solid wood memory frames, glowing acrylic LED couple portraits, and handcrafted surprise explosion gift boxes. Each personalized order is inspected by hand to ensure vibrant print fidelity and packaging beauty before doorstep dispatch.
          </p>

          <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-4">
            <div className="p-3 bg-[#FFF8E8] rounded-xl border border-amber-200">
              <strong className="block text-stone-900 font-bold mb-0.5">Physical Studio</strong>
              <span>Gupta Complex, Near N.M.D. College, Gondia</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <strong className="block text-stone-900 font-bold mb-0.5">Cash on Delivery</strong>
              <span>Inspect gift upon arrival and pay safely</span>
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-6 border-t border-stone-200 space-y-3">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Frequently Asked Questions
            </h3>

            <div>
              <strong className="text-stone-900 block mb-0.5">
                How do I submit photos for customized items?
              </strong>
              <span>
                Simply click on any personalizable gift, upload your photo right inside the gift builder, preview how it looks, and place your order. Our team takes care of the rest!
              </span>
            </div>

            <div>
              <strong className="text-stone-900 block mb-0.5">
                How fast is delivery within Gondia?
              </strong>
              <span>
                Most customized orders are prepared within 12–24 hours. Local deliveries in Gondia usually arrive within 24 to 48 hours of order confirmation.
              </span>
            </div>

            <div>
              <strong className="text-stone-900 block mb-0.5">
                Is Cash on Delivery available?
              </strong>
              <span>
                Yes, 100%! You can place your order online with zero advance payment and pay cash or UPI when your gift is delivered to your door.
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Map card */}
        <div className="md:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-[#EDE8DF] space-y-5 text-xs">
          <h3 className="font-serif text-base font-bold text-stone-900 pb-2 border-b border-stone-200">
            Store Contact & Visit
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#E95D79] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Address</strong>
                <span className="text-stone-600">{settings.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#F4C62E] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Phone Support</strong>
                <div className="space-y-0.5 font-mono text-stone-700">
                  {settings.phones.map((p) => (
                    <div key={p}>
                      <a href={`tel:${p.replace(/\s+/g, '')}`} className="hover:underline">
                        {p}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">WhatsApp Direct</strong>
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Chat on +91 8208589775</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Store Working Hours</strong>
                <span className="text-stone-600">Monday – Sunday: 10:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <a
              href="https://maps.google.com/?q=N.M.D.+College+Gondia+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FAF8F5] hover:bg-[#F2ECE3] border border-stone-200 text-stone-800 py-2.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-center"
            >
              <MapPin className="w-4 h-4 text-[#E95D79]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
