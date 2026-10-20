import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant, CustomizationDetails } from '../types';
import { storeService } from '../services/storeService';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedVariant?: ProductVariant | ProductVariant[],
    customization?: CustomizationDetails
  ) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  freeDeliveryThreshold: number;
  amountUntilFreeDelivery: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'blossom_gift_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const settings = storeService.getSettings();
  const freeDeliveryThreshold = settings.freeDeliveryThreshold || 499;

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedVariant?: ProductVariant | ProductVariant[],
    customization?: CustomizationDetails
  ) => {
    let giftWrapFee = 0;
    if (customization?.giftWrap === 'luxury_satin_box') {
      giftWrapFee = 49;
    } else if (customization?.giftWrap === 'classic_wrap') {
      giftWrapFee = 25;
    }

    // Normalize variants
    const variantsList: ProductVariant[] = Array.isArray(selectedVariant)
      ? selectedVariant
      : selectedVariant
      ? [selectedVariant]
      : [];

    const totalVariantDelta = variantsList.reduce((sum, v) => sum + (v.priceDelta || 0), 0);
    const basePrice = product.price + totalVariantDelta;
    const unitPrice = basePrice + giftWrapFee;

    const variantKey = variantsList.length > 0 ? variantsList.map((v) => v.id).join('-') : 'base';
    const cartItemId = `${product.id}-${variantKey}-${Date.now()}`;

    // Synthesized primary variant representation for backward compatibility
    const primaryVariant: ProductVariant | undefined =
      variantsList.length === 1
        ? variantsList[0]
        : variantsList.length > 1
        ? {
            id: variantKey,
            name: variantsList.map((v) => v.name).join(' / '),
            value: variantsList.map((v) => `${v.name}: ${v.value}`).join(' • '),
            priceDelta: totalVariantDelta,
          }
        : undefined;

    const newItem: CartItem = {
      cartItemId,
      product,
      quantity,
      selectedVariant: primaryVariant,
      selectedVariants: variantsList,
      customization,
      giftWrapFee,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };

    setItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const maxStock = item.product.stock;
          const validQty = Math.min(quantity, maxStock > 0 ? maxStock : 1);
          return {
            ...item,
            quantity: validQty,
            totalPrice: item.unitPrice * validQty,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const amountUntilFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        freeDeliveryThreshold,
        amountUntilFreeDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
