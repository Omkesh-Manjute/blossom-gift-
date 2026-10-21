import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GiftyCategories } from './components/GiftyCategories';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistModal } from './components/WishlistModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ProductCatalogueModal } from './components/ProductCatalogueModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { AdminPortal } from './components/AdminPortal';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';
import { InstagramMoments } from './components/InstagramMoments';
import { GiftyTestimonials } from './components/GiftyTestimonials';
import { GiftyPerks } from './components/GiftyPerks';
import { storeService } from './services/storeService';
import { Product, Order } from './types';
import { Heart, ArrowRight, Package, MessageCircle, Clock, Sparkles } from 'lucide-react';

export default function App() {
  // Sync tab with URL (/admin, #admin, etc.)
  const [activeTab, setActiveTab] = useState<'shop' | 'customized' | 'track' | 'admin' | 'about'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash === '#admin') return 'admin';
      if (path.includes('track') || hash === '#track') return 'track';
      if (path.includes('about') || hash === '#about') return 'about';
      if (path.includes('custom') || hash === '#customized') return 'customized';
    }
    return 'shop';
  });

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
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

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

  // Sync tab state with browser URL navigation
  useEffect(() => {
    const syncRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('admin') || hash === '#admin') {
        setActiveTab('admin');
      } else if (path.includes('track') || hash === '#track') {
        setActiveTab('track');
      } else if (path.includes('about') || hash === '#about') {
        setActiveTab('about');
      } else if (path.includes('custom') || hash === '#customized') {
        setActiveTab('customized');
      } else {
        setActiveTab('shop');
      }
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  // Listen to store updates
  useEffect(() => {
    const handleUpdate = () => {
      setProducts(storeService.getProducts());
    };
    window.addEventListener('store_data_updated', handleUpdate);
    return () => window.removeEventListener('store_data_updated', handleUpdate);
  }, []);

  const handleTabChange = (tab: 'shop' | 'customized' | 'track' | 'admin' | 'about') => {
    setActiveTab(tab);
    if (tab === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (tab === 'shop') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Filtered products for main catalog (watches are positioned lower down if selectedCategory is all)
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

  // Main catalog items (excluding Wall Watches when showing all, since watches are placed below)
  const mainCatalogProducts = selectedCategory === 'all'
    ? filteredProducts.filter((p) => p.category !== 'Wall Watches')
    : filteredProducts;

  // Dedicated bottom Wall Watches
  const wallWatches = products.filter((p) => p.category === 'Wall Watches');

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
  };

  const handleGoToTracking = (orderNum: string, phone: string) => {
    setConfirmedOrder(null);
    setTrackingNumber(orderNum);
    setTrackingPhone(phone);
    handleTabChange('track');
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#1F2937]">
        {/* Navigation Bar (Desktop & Mobile) */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wishlistCount={wishlistIds.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onSelectOccasion={(occ) => setSelectedOccasion(occ)}
          onOpenCatalogue={() => setIsCatalogueOpen(true)}
        />

        {/* Content depending on Active Tab */}
        {activeTab === 'admin' ? (
          <main className="flex-1">
            <AdminPortal onBackToStore={() => handleTabChange('shop')} />
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
            {/* Hero Section */}
            <Hero
              onShopClick={() => {
                handleTabChange('shop');
                const catalogEl = document.getElementById('catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              onCustomClick={() => {
                handleTabChange('customized');
                const catalogEl = document.getElementById('catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 8 Categories Bar */}
            <GiftyCategories
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                const catalogEl = document.getElementById('catalog-section');
                catalogEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Featured Products Section (Main Catalog) */}
            <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 text-left">
                <div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8436E] fill-[#E8436E]" />
                    <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
                      {selectedCategory !== 'all' ? selectedCategory : 'Featured Products'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Discover our best selling gifts, bags, toys, mugs and personalized items in Gondia
                  </p>
                </div>

                {/* Filter and View All Buttons */}
                <div className="flex items-center gap-3">
                  {(selectedCategory !== 'all' || selectedOccasion !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedOccasion('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-stone-500 hover:text-[#E8436E] underline cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedOccasion('all');
                      setSearchQuery('');
                      const el = document.getElementById('catalog-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8436E] hover:bg-[#d4335c] text-white text-xs sm:text-sm font-bold shadow-md shadow-pink-200 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Grid: Responsive 2 cols on mobile, 3 on tablet, 6 on desktop */}
              {mainCatalogProducts.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto shadow-xs">
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#E8436E]">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-stone-900">
                    No gifts match your search
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Try clearing your search terms or picking another category.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedOccasion('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 bg-[#E8436E] text-white text-xs font-bold rounded-xl hover:bg-[#d4335c] cursor-pointer shadow-sm"
                  >
                    Reset & View All Gifts
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                  {mainCatalogProducts.map((product) => (
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

            {/* Real Videos & Unboxings Section (@theblossomgiftshop) */}
            <InstagramMoments />

            {/* DEDICATED WALL WATCHES & LIVING ROOM CLOCKS SECTION (Placed lower down as requested!) */}
            <section id="wall-watches-section" className="py-12 bg-gradient-to-b from-stone-50 to-amber-50/40 border-t border-stone-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-left">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>TIMELESS LIVING ROOM ACCENTS</span>
                    </div>
                    <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                      Royal Wall Clocks & Living Room Timepieces
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1">
                      Handcrafted solid wood Roman dials, brass timepieces, and silent sweep quartz clocks
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {wallWatches.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Customer Testimonials Section */}
            <GiftyTestimonials />

            {/* Trust Perks & Badges */}
            <GiftyPerks />
          </main>
        )}

        {/* Floating WhatsApp Quick Action Button */}
        <a
          href="https://wa.me/918208589775?text=Hello%20Blossom%20Gift%20Gondia%2C%20I%20want%20to%20order%20a%20personalized%20gift"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-16 sm:bottom-6 right-5 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3 sm:p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105"
          title="Direct WhatsApp Support & Photo Approval"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-[#25D366]" />
          <span className="hidden sm:inline text-xs font-bold font-sans pr-1">
            Order on WhatsApp
          </span>
        </a>

        {/* Global Footer */}
        <Footer
          onNavClick={(tab) => {
            handleTabChange(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleTabChange('shop');
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCatalogue={() => setIsCatalogueOpen(true)}
        />

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

        <ProductCatalogueModal
          isOpen={isCatalogueOpen}
          onClose={() => setIsCatalogueOpen(false)}
          products={products}
        />
      </div>
    </CartProvider>
  );
}
