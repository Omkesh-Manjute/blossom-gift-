/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GiftyCategories } from './components/GiftyCategories';
import { GiftyPromoBanners } from './components/GiftyPromoBanners';
import { GiftyTestimonials } from './components/GiftyTestimonials';
import { GiftyPerks } from './components/GiftyPerks';
import { OccasionBar } from './components/OccasionBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistModal } from './components/WishlistModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { AdminPortal } from './components/AdminPortal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { InstagramMoments } from './components/InstagramMoments';
import { storeService } from './services/storeService';
import { Product, Order } from './types';
import { Sparkles, Package, ArrowRight, Heart, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'customized' | 'track' | 'admin' | 'about'>('shop');
  const [products, setProducts] = useState<Product[]>(() => storeService.getProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('blossom_gift_wishlist');
      return saved ? JSON.parse(saved) : ['prod-01', 'prod-02'];
    } catch {
      return ['prod-01', 'prod-02'];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals & Navigation states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Tracking query state
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingPhone, setTrackingPhone] = useState('');

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('blossom_gift_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Listen to store updates
  useEffect(() => {
    const handleUpdate = () => {
      setProducts(storeService.getProducts());
    };
    window.addEventListener('store_data_updated', handleUpdate);
    return () => window.removeEventListener('store_data_updated', handleUpdate);
  }, []);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Filter products
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((p) => {
    if (p.status !== 'active') return false;

    // Filter by Personalized tab
    if (activeTab === 'customized' && !p.isCustomizable) return false;

    // Filter by Occasion
    if (selectedOccasion !== 'all') {
      const matchOcc = p.occasions.some((occ) => occ.toLowerCase() === selectedOccasion.toLowerCase());
      if (!matchOcc) return false;
    }

    // Filter by Category
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(query);
      const matchDesc = p.description.toLowerCase().includes(query);
      const matchCat = p.category.toLowerCase().includes(query);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
  };

  const handleGoToTracking = (orderNum: string, phone: string) => {
    setConfirmedOrder(null);
    setTrackingNumber(orderNum);
    setTrackingPhone(phone);
    setActiveTab('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#1f1f1f]">
        {/* Navigation Bar matching Gifty WorkDo Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wishlistCount={wishlistIds.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Content depending on Active Tab */}
        {activeTab === 'admin' ? (
          <main className="flex-1">
            <AdminPortal onBackToStore={() => setActiveTab('shop')} />
          </main>
        ) : activeTab === 'track' ? (
          <main className="flex-1">
            <OrderTrackingView
              initialOrderNumber={trackingNumber}
              initialPhone={trackingPhone}
            />
          </main>
        ) : activeTab === 'about' ? (
          <main className="flex-1">
            <AboutModal />
          </main>
        ) : (
          <main className="flex-1">
            {/* Hero Banner with Animated Rays & Vengeance UI Buttons */}
            <Hero
              onShopClick={() => {
                setActiveTab('shop');
                const catalogEl = document.getElementById('catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              onCustomClick={() => {
                setActiveTab('customized');
                const catalogEl = document.getElementById('catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Gifty Theme: Our Bestsellers Categories Circular Slider */}
            <GiftyCategories
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                const catalogEl = document.getElementById('catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Gifty Theme: Dual Campaign Banners ("Today Discounts" & "Amazing Gift") */}
            <GiftyPromoBanners
              onCustomizeClick={() => {
                const magicMug = products.find((p) => p.name.includes('Magic Photo Mug')) || products[0];
                setSelectedProduct(magicMug);
              }}
              onShopClick={() => {
                const catalogEl = document.getElementById('catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Occasions & Categories Filter Bar */}
            <div id="catalog-section">
              <OccasionBar
                selectedOccasion={selectedOccasion}
                onSelectOccasion={setSelectedOccasion}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categories={categories}
              />
            </div>

            {/* Main Product Catalog Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8 text-left">
                <div>
                  <span className="text-xs font-bold text-[#E95D79] uppercase tracking-wider block mb-1">
                    Gondia Gifting Catalog
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#124282]">
                    {activeTab === 'customized'
                      ? 'Personalized Keepsakes & Custom Gifts'
                      : selectedOccasion !== 'all'
                      ? `${selectedOccasion} Gift Collection`
                      : 'Featured Gifts & Hampers'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Showing {filteredProducts.length} handcrafted items available for doorstep delivery in Gondia
                  </p>
                </div>

                {/* Clear Filters (if active) */}
                {(selectedOccasion !== 'all' || selectedCategory !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedOccasion('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-[#124282] hover:text-[#E95D79] font-bold underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto shadow-xs">
                  <div className="w-16 h-16 bg-[#ECF7FF] rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#124282]">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-stone-900">
                    No gifts match your search
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Try clearing your search terms or picking another occasion.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedOccasion('all');
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setActiveTab('shop');
                    }}
                    className="px-5 py-2.5 bg-[#124282] text-white text-xs font-bold rounded-xl hover:bg-[#0d3161] cursor-pointer shadow-sm"
                  >
                    View All Gifts
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Instagram Customer Moments matching Gifty theme */}
            <InstagramMoments />

            {/* Customer Testimonials matching Gifty WorkDo style */}
            <GiftyTestimonials />

            {/* Trust Perks & Newsletter Subscription */}
            <GiftyPerks />
          </main>
        )}

        {/* Floating WhatsApp Quick Action Button for Gondia Store */}
        <a
          href="https://wa.me/918208589775?text=Hello%20Blossom%20Gift%20Gondia%2C%20I%20want%20to%20order%20a%20personalized%20gift"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
          title="Direct WhatsApp Support & Photo Approval"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold font-sans pr-1">
            Chat on WhatsApp
          </span>
        </a>

        {/* Global Footer */}
        <Footer onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />

        {/* Modals & Drawers */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        <WishlistModal
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistIds={wishlistIds}
          products={products}
          onRemoveFromWishlist={toggleWishlist}
          onOpenProductDetails={(p) => setSelectedProduct(p)}
        />

        <CartDrawer
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />

        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          onGoToTracking={handleGoToTracking}
        />
      </div>
    </CartProvider>
  );
}
