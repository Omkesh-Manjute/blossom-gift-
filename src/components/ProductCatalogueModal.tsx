import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  Phone,
  MapPin,
  MessageCircle,
  Gift,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';

interface ProductCatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const ProductCatalogueModal: React.FC<ProductCatalogueModalProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/918208589775?text=Hello%20Blossom%20Gift%20Gondia%2C%20I%20downloaded%20your%20PDF%20catalogue%20and%20want%20to%20order!',
      '_blank'
    );
  };

  // Group products by category
  const categorizedProducts: Record<string, Product[]> = {};
  products.forEach((p) => {
    const cat = p.category || 'Special Gifts';
    if (!categorizedProducts[cat]) categorizedProducts[cat] = [];
    categorizedProducts[cat].push(p);
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:max-h-none print:shadow-none print:rounded-none">
        {/* Top Action Bar (Hidden on print) */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#E8436E] to-[#C2185B] text-white flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Gift className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                BLOSSOM GIFT — Official Product Catalogue (PDF)
              </h3>
              <p className="text-[11px] text-pink-100">
                Print or Save as PDF for offline viewing & WhatsApp ordering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#C2185B] hover:bg-pink-50 font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Catalogue Body */}
        <div ref={printRef} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-900 print:overflow-visible print:p-4">
          {/* Catalogue Header / Letterhead */}
          <div className="border-b-2 border-[#E8436E] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E8436E] to-[#FA709A] text-white flex items-center justify-center shadow-md">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-extrabold text-2xl tracking-tight text-[#1E293B]">
                    BLOSSOM
                  </span>
                  <span className="font-extrabold text-2xl tracking-tight text-[#E8436E] ml-1.5">
                    GIFT
                  </span>
                </div>
                <p className="text-xs font-semibold text-stone-600">
                  Gift, Greet & Toys Whole Sale & Retail
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Exclusive Handmade Gifts, LED Frames, Mugs & Clocks in Gondia
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1 text-stone-600 font-medium">
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E8436E] shrink-0" />
                <span>Gupta Complex, Near N.M.D. College, Gondia (M.S.)</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>+91 8208589775 / 9673155741</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-emerald-700 font-bold">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp: +91 8208589775</span>
              </div>
              <div className="text-[11px] text-stone-400">
                Online Store: blossomgift.praximinds.com
              </div>
            </div>
          </div>

          {/* Quick Info Banner */}
          <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E8436E]" />
              <span className="font-bold text-stone-900">
                Customization Available:
              </span>
              <span className="text-stone-600">
                Send your photo & text on WhatsApp to preview before printing!
              </span>
            </div>
            <span className="px-2.5 py-1 bg-white text-[#E8436E] font-bold rounded-full border border-pink-200 text-[11px]">
              Gondia Doorstep Delivery Available
            </span>
          </div>

          {/* Product Categories Sections */}
          <div className="space-y-8">
            {Object.entries(categorizedProducts).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8436E]" />
                  <h4 className="font-extrabold text-base text-stone-900 tracking-tight">
                    {category}
                  </h4>
                  <span className="text-xs text-stone-400 font-mono">
                    ({items.length} items)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {items.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 rounded-2xl border border-stone-200 bg-stone-50/50 flex gap-3 text-left hover:border-pink-300 transition-colors"
                    >
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-100">
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="font-bold text-xs text-stone-900 line-clamp-1">
                              {prod.name}
                            </h5>
                            {prod.badge && (
                              <span className="px-1.5 py-0.5 rounded bg-pink-100 text-[#E8436E] text-[9px] font-bold shrink-0">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">
                            {prod.description}
                          </p>
                        </div>

                        <div className="flex items-baseline justify-between mt-1 pt-1 border-t border-stone-200/60">
                          <div>
                            <span className="font-mono font-bold text-sm text-[#E8436E]">
                              ₹{prod.price}
                            </span>
                            {prod.comparePrice && (
                              <span className="font-mono text-[10px] text-stone-400 line-through ml-1.5">
                                ₹{prod.comparePrice}
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] text-stone-500 font-medium">
                            {prod.preparationHours ? `${prod.preparationHours}h prep` : 'In Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Catalogue Footer */}
          <div className="pt-6 border-t border-stone-200 text-center space-y-2 print:pt-4">
            <p className="text-xs font-bold text-stone-800">
              To order any item from this catalogue, share the product name or screenshot on WhatsApp:
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 font-mono font-bold text-xs">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: +91 8208589775 / 9673155741</span>
            </div>
            <p className="text-[10px] text-stone-400">
              BLOSSOM GIFT — Gupta Complex, Near N.M.D. College, Gondia (M.S.) | Online Catalogue 2026
            </p>
          </div>
        </div>

        {/* Bottom Floating Bar on Mobile / Desktop */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 print:hidden">
          <button
            onClick={handleWhatsApp}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order via WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#E8436E] hover:bg-[#d4335c] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Print or Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
