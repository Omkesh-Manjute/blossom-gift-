import React from 'react';
import { ShoppingCart, Heart, Sparkles, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  isWishlisted,
  onToggleWishlist,
}) => {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const isCrimson = theme === 'crimson';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  // Determine badge text
  const badgeText =
    product.badge ||
    (product.tags.includes('Best Seller')
      ? 'Best Seller'
      : product.comparePrice
      ? `-${Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%`
      : null);

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className={`group relative bg-white rounded-2xl sm:rounded-3xl border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col cursor-pointer ${
        isCrimson
          ? 'border-red-100 hover:border-red-300'
          : 'border-stone-200/80 hover:border-amber-300'
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-stone-50">
        <img
          src={product.images[0] || '/extracted/rose_teddy_bear.png'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge (Top-Left) */}
        {badgeText && (
          <div
            className={`absolute top-2.5 left-2.5 z-10 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 ${
              isCrimson
                ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white'
                : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{badgeText}</span>
          </div>
        )}

        {/* Wishlist Heart Button (Top-Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
            isWishlisted
              ? isCrimson
                ? 'bg-red-50 text-red-600 ring-1 ring-red-400'
                : 'bg-amber-50 text-amber-600 ring-1 ring-amber-400'
              : 'bg-white/90 text-stone-400 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted
                ? isCrimson
                  ? 'fill-red-600 text-red-600'
                  : 'fill-amber-500 text-amber-600'
                : 'hover:text-stone-700'
            }`}
          />
        </button>
      </div>

      {/* Card Info & Footer */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between text-left">
        <div>
          <h3
            className={`font-sans font-bold text-xs sm:text-sm text-stone-900 transition-colors line-clamp-1 ${
              isCrimson ? 'group-hover:text-red-600' : 'group-hover:text-amber-600'
            }`}
          >
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-stone-400 line-clamp-1 mt-0.5">
            {product.category}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-extrabold text-sm sm:text-base font-mono ${
                isCrimson ? 'text-red-600' : 'text-amber-700'
              }`}
            >
              ₹{product.price}
            </span>
            {product.comparePrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through font-mono">
                ₹{product.comparePrice}
              </span>
            )}
          </div>

          {/* Theme-Adaptive Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-md hover:scale-110 cursor-pointer border ${
              isCrimson
                ? 'bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border-red-200/70 hover:border-red-600'
                : 'bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-stone-950 border-amber-200/60 hover:border-amber-500'
            }`}
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
