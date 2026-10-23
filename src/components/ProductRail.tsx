import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Clock, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface ProductRailProps {
  id?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  countdownTimer?: string; // e.g. "05:14:22"
  products: Product[];
  onOpenDetails: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onViewAll?: () => void;
  icon?: React.ReactNode;
}

export const ProductRail: React.FC<ProductRailProps> = ({
  id,
  title,
  subtitle,
  tag,
  countdownTimer,
  products,
  onOpenDetails,
  wishlistIds,
  onToggleWishlist,
  onViewAll,
  icon,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { theme } = useTheme();

  const isCrimson = theme === 'crimson';

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section id={id} className="py-3.5 sm:py-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rail Header (Flipkart 2-Tier Mobile Pattern) */}
        <div className="mb-2 sm:mb-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {icon && (
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                    isCrimson
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {icon}
                </div>
              )}
              <h3 className="font-sans text-sm sm:text-base md:text-lg font-black text-stone-900 tracking-tight truncate">
                {title}
              </h3>
            </div>

            {/* Action Row: View All & Desktop Navigation Arrows */}
            <div className="flex items-center gap-1.5 shrink-0">
              {onViewAll && (
                <button
                  type="button"
                  onClick={onViewAll}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                    isCrimson
                      ? 'text-red-700 hover:bg-red-50'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}

              {/* Desktop scroll arrows */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                  className="w-7 h-7 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                  className="w-7 h-7 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Subheader: Badges, Countdown Timer, Subtitle */}
          {(tag || countdownTimer || subtitle) && (
            <div className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
              {tag && (
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 shadow-2xs ${
                    isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-950'
                  }`}
                >
                  {tag}
                </span>
              )}
              {countdownTimer && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-stone-900 text-amber-300 px-2 py-0.5 rounded-full shrink-0">
                  <Clock className="w-2.5 h-2.5 text-amber-400" />
                  <span>Ends in {countdownTimer}</span>
                </span>
              )}
              {subtitle && (
                <p className="text-[10px] sm:text-xs text-stone-500 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Horizontal Swipe Rail (Flipkart / Blinkit style) */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pt-0.5 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPercent = product.comparePrice
              ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                onClick={() => onOpenDetails(product)}
                className={`group shrink-0 snap-start w-[148px] sm:w-[185px] md:w-[205px] rounded-2xl bg-white border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between overflow-hidden cursor-pointer relative ${
                  isCrimson ? 'border-red-100 hover:border-red-300' : 'border-amber-100 hover:border-amber-300'
                }`}
              >
                {/* Media Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-50">
                  <img
                    src={product.images[0] || '/extracted/rose_teddy_bear.png'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Badge */}
                  {discountPercent && discountPercent > 0 ? (
                    <div
                      className={`absolute top-2 left-2 z-10 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 ${
                        isCrimson ? 'bg-red-600' : 'bg-amber-500 text-stone-950'
                      }`}
                    >
                      <span>{discountPercent}% OFF</span>
                    </div>
                  ) : product.badge ? (
                    <div
                      className={`absolute top-2 left-2 z-10 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 ${
                        isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-950'
                      }`}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{product.badge}</span>
                    </div>
                  ) : null}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-2 right-2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer ${
                      isWishlisted
                        ? isCrimson
                          ? 'bg-red-50 text-red-600 ring-1 ring-red-400'
                          : 'bg-amber-50 text-amber-600 ring-1 ring-amber-400'
                        : 'bg-white/90 text-stone-400 hover:text-stone-900 hover:bg-white'
                    }`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? (isCrimson ? 'fill-red-600 text-red-600' : 'fill-amber-500 text-amber-600') : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h4
                      className={`font-sans font-bold text-xs sm:text-sm text-stone-900 transition-colors line-clamp-1 ${
                        isCrimson ? 'group-hover:text-red-600' : 'group-hover:text-amber-600'
                      }`}
                    >
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-stone-400 truncate mt-0.5">
                      {product.category}
                    </p>
                  </div>

                  {/* Price and Cart Row */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`font-extrabold text-xs sm:text-sm font-mono ${
                            isCrimson ? 'text-red-600' : 'text-amber-700'
                          }`}
                        >
                          ₹{product.price}
                        </span>
                        {product.comparePrice && (
                          <span className="text-[10px] text-stone-400 line-through font-mono">
                            ₹{product.comparePrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-110 cursor-pointer ${
                        isCrimson
                          ? 'bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200'
                          : 'bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-stone-950 border border-amber-200'
                      }`}
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
