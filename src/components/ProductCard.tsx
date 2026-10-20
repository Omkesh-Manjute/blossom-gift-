import React from 'react';
import { Sparkles, ShoppingBag, Eye, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { useCart } from '../context/CartContext';
import { GlowBorderCard } from './ui/glow-border-card';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isCustomizable) {
      onOpenDetails(product);
    } else {
      addToCart(product, 1);
    }
  };

  const discountPercent = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  return (
    <GlowBorderCard
      onClick={() => onOpenDetails(product)}
      className="cursor-pointer text-left h-full group"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Visual Area (approx 68% height) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
          <ProductVisual
            productId={product.id}
            category={product.category}
            name={product.name}
            imageUrl={product.images?.[0]}
            className="transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges on Top Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-20">
            {discountPercent && discountPercent > 0 && (
              <span className="bg-[#E8436E] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                -{discountPercent}%
              </span>
            )}

            {product.isCustomizable && (
              <span className="bg-white/95 backdrop-blur-xs border border-amber-300 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                <span>Custom Photo</span>
              </span>
            )}
          </div>

          {/* Wishlist Button on Top Right */}
          {onToggleWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-[#E8436E] shadow-sm flex items-center justify-center transition-all z-20 cursor-pointer"
              title="Add to Wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'fill-[#E8436E] text-[#E8436E]' : 'text-stone-600'
                }`}
              />
            </button>
          )}

          {/* Quick Action Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-2 z-20">
            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className="flex-1 bg-[#124282] hover:bg-[#0e3568] text-white py-2 px-3 rounded-xl text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {product.isCustomizable ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#F4C62E]" />
                  <span>Customize with Photo</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#F4C62E]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(product);
              }}
              className="w-9 h-9 rounded-xl bg-white text-stone-700 hover:text-[#124282] hover:bg-stone-50 shadow-md flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Category & Star Rating */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-stone-400 text-[10px] font-normal">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="font-heading text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#E8436E] transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price & Stock Line */}
          <div className="mt-3 pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-extrabold text-[#124282] tabular-nums">
                ₹{product.price}
              </span>
              {product.comparePrice && (
                <span className="font-mono text-xs line-through text-stone-400 tabular-nums">
                  ₹{product.comparePrice}
                </span>
              )}
              {discountPercent && (
                <span className="text-[10px] font-bold text-emerald-600">
                  Save ₹{product.comparePrice! - product.price}
                </span>
              )}
            </div>

            <div className="text-right">
              {isOutOfStock ? (
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                  Out of Stock
                </span>
              ) : (
                <span className="text-[10px] text-stone-500 font-medium">
                  {product.preparationHours}h prep · Gondia
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </GlowBorderCard>
  );
};
