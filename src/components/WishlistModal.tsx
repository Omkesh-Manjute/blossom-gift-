import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { useCart } from '../context/CartContext';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onOpenProductDetails: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onOpenProductDetails,
}) => {
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 text-left overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="font-heading text-lg font-bold text-stone-900">
              My Wishlist ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <Heart className="w-12 h-12 mx-auto mb-2 text-stone-300" />
              <p className="font-heading text-base font-bold text-stone-700">Your wishlist is empty</p>
              <p className="text-xs text-stone-500 mt-1">Tap the heart icon on any gift to save it for later.</p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0">
                    <ProductVisual
                      category={p.category}
                      name={p.name}
                      imageUrl={p.images?.[0]}
                    />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs sm:text-sm font-bold text-stone-900 line-clamp-1">
                      {p.name}
                    </h4>
                    <div className="font-mono text-xs font-bold text-amber-700 mt-0.5 tabular-nums">
                      ₹{p.price}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onOpenProductDetails(p);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-extrabold rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-xs shadow-amber-200"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
