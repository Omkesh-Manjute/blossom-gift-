import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Truck, Gift, Image as ImageIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeDeliveryThreshold,
    amountUntilFreeDelivery,
  } = useCart();

  if (!isCartOpen) return null;

  const isFreeDelivery = amountUntilFreeDelivery <= 0;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col text-left">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EBE7DF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E95D79]" />
              <h2 className="font-serif text-lg font-bold text-[#292525]">
                Your Gift Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FFF8E8] px-4 py-3 border-b border-[#F2E7D2] text-xs">
            <div className="flex items-center justify-between mb-1 text-stone-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-amber-600" />
                {isFreeDelivery ? (
                  <span className="text-emerald-800 font-semibold">
                    🎉 Free Gondia Delivery Unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="font-mono text-stone-900">₹{amountUntilFreeDelivery}</strong> more for Free Delivery
                  </span>
                )}
              </span>
              <span className="font-mono font-semibold text-stone-500">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/50 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#F4C62E] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <Gift className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-700">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover personalized photo mugs, customized frames, and curated gift hampers.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-4 py-2 bg-[#292525] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  Explore Gifts
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE8DF] flex gap-3 text-left relative"
                >
                  {/* Thumbnail / Mockup */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-[#E5DFD5] bg-white relative">
                    {item.customization?.photoUrl ? (
                      <img
                        src={item.customization.photoUrl}
                        alt="Custom photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ProductVisual
                        category={item.product.category}
                        name={item.product.name}
                        customization={item.customization}
                        showCustomPreview={true}
                        imageUrl={item.product.images?.[0]}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-serif font-bold text-[#292525] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-rose-600 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariants && item.selectedVariants.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {item.selectedVariants.map((v) => (
                            <span
                              key={v.id}
                              className="text-[10px] font-medium bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200"
                            >
                              <strong>{v.name}:</strong> {v.value}
                              {v.priceDelta !== 0 && (
                                <span className="text-blue-600 font-mono ml-0.5">
                                  ({v.priceDelta > 0 ? `+₹${v.priceDelta}` : `-₹${Math.abs(v.priceDelta)}`})
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      ) : item.selectedVariant ? (
                        <div className="text-[11px] text-stone-500 font-medium">
                          {item.selectedVariant.value}
                        </div>
                      ) : null}

                      {/* Customization Details Summary */}
                      {item.customization && (
                        <div className="mt-1 space-y-0.5 text-[11px] text-amber-900 bg-amber-50/70 p-1.5 rounded border border-amber-100">
                          {item.customization.recipientName && (
                            <div className="truncate">
                              <strong>For:</strong> {item.customization.recipientName}
                            </div>
                          )}
                          {item.customization.customMessage && (
                            <div className="truncate italic text-stone-600">
                              "{item.customization.customMessage}"
                            </div>
                          )}
                          {item.customization.giftWrap !== 'none' && (
                            <div className="text-[#E95D79] font-medium">
                              ✨ {item.customization.giftWrap === 'luxury_satin_box' ? 'Satin Luxe Box (+₹49)' : 'Classic Gift Wrap (+₹25)'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-xs font-bold text-[#292525] tabular-nums">
                        ₹{item.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EBE7DF] bg-[#FAF8F5] space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-mono font-semibold tabular-nums text-stone-800">
                    {isFreeDelivery ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      '₹50'
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-1.5 border-t border-stone-200 text-sm">
                  <span>Order Total</span>
                  <span className="font-mono tabular-nums">
                    ₹{subtotal + (isFreeDelivery ? 0 : 50)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onOpenCheckout();
                }}
                className="w-full bg-[#292525] hover:bg-[#1C1917] text-white py-3.5 px-4 rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Cash on Delivery</span>
                <ArrowRight className="w-4 h-4 text-[#F4C62E]" />
              </button>

              <div className="text-center">
                <span className="text-[10px] text-stone-500">
                  Pay cash or UPI at your doorstep in Gondia upon delivery
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
