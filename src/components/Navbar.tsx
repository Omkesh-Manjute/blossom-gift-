import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Heart,
  User,
  Home,
  Calendar,
  Sparkles,
  Smile,
  Mail,
  Gift,
  Phone,
  ChevronDown,
  MapPin,
  ShieldCheck,
  X,
  Truck,
  Menu,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface NavbarProps {
  activeTab: 'shop' | 'customized' | 'track' | 'admin' | 'about';
  setActiveTab: (tab: 'shop' | 'customized' | 'track' | 'admin' | 'about') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  products?: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  wishlistCount,
  onOpenWishlist,
  products = [],
  onSelectProduct,
}) => {
  const { itemCount, openCart } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const matchingSuggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. TOP ANNOUNCEMENT BAR (Deep Pink #D82B5A) */}
      <div className="bg-[#D82B5A] text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Location on left */}
          <div className="flex items-center gap-1.5 text-xs text-white/95">
            <MapPin className="w-3.5 h-3.5 text-white/80" />
            <span>Gupta Complex, Near N.M.D. College, Gondia (M.S.)</span>
          </div>

          {/* Quick announcement center/right */}
          <div className="flex items-center gap-3 text-xs text-white/95 ml-auto sm:ml-0 font-medium">
            <span className="hidden md:flex items-center gap-1">
              <Gift className="w-3.5 h-3.5 text-yellow-300" />
              <span>Free Delivery in Gondia on orders &gt; ₹499</span>
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="flex items-center gap-1 font-mono">
              <Phone className="w-3.5 h-3.5 text-white/80" />
              <a href="tel:8208589775" className="hover:underline">8208589775</a>
              <span>/</span>
              <a href="tel:9673155741" className="hover:underline">9673155741</a>
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER ROW (Logo, Search with Autocomplete, Icons) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3 md:gap-8">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-[#E8436E]"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <button
          onClick={() => {
            setActiveTab('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer group whitespace-nowrap shrink-0"
        >
          {/* Pink Gift Box Logo Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#E8436E] to-[#FA709A] text-white flex items-center justify-center shadow-md shadow-pink-200">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#1F2937] leading-none">
                BLOSSOM
              </span>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#E8436E] ml-1.5 leading-none">
                GIFT
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-medium text-stone-500 tracking-tight block mt-0.5">
              Gifting Studio & Toy Store · Gondia
            </span>
          </div>
        </button>

        {/* Center Search Input with Instant Dropdown Results */}
        <div ref={searchRef} className="flex-1 max-w-xl hidden md:block relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for photo mugs, wooden frames, hampers, toys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-[#FAF8F9] border border-stone-200 rounded-full pl-5 pr-12 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E8436E] focus:bg-white transition-all shadow-inner placeholder:text-stone-400"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-10 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <button
              onClick={() => {
                setActiveTab('shop');
                setIsSearchFocused(false);
              }}
              className="absolute right-1 w-9 h-9 rounded-full bg-[#E8436E] hover:bg-[#d4335c] text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Search Dropdown Results Popup */}
          {isSearchFocused && matchingSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-left">
              <div className="text-[10px] font-bold text-stone-400 px-3 py-1 uppercase tracking-wider">
                Matching Gifts ({matchingSuggestions.length})
              </div>
              <div className="divide-y divide-stone-100">
                {matchingSuggestions.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct(prod);
                      setIsSearchFocused(false);
                    }}
                    className="p-2 hover:bg-stone-50 rounded-xl cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={prod.images?.[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {prod.name}
                      </h4>
                      <span className="text-[10px] text-stone-500">
                        {prod.category} · {prod.preparationHours}h prep
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-[#124282]">
                        ₹{prod.price}
                      </span>
                      {prod.comparePrice && (
                        <span className="block text-[10px] line-through text-stone-400 font-mono">
                          ₹{prod.comparePrice}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Nav Icons (Wishlist, Track, Admin, Cart) */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0 text-xs font-semibold text-stone-700">
          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="flex items-center gap-1.5 hover:text-[#E8436E] transition-colors cursor-pointer relative"
          >
            <Heart className="w-5 h-5 text-stone-700" />
            <span className="hidden xl:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#E8436E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Track Order */}
          <button
            onClick={() => setActiveTab('track')}
            className={`hidden sm:flex items-center gap-1.5 hover:text-[#E8436E] transition-colors cursor-pointer ${
              activeTab === 'track' ? 'text-[#E8436E] font-bold' : ''
            }`}
          >
            <Truck className="w-5 h-5 text-stone-700" />
            <span className="hidden xl:inline">Track Order</span>
          </button>

          {/* Admin Portal Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'admin' ? 'shop' : 'admin')}
            className={`flex items-center gap-1.5 hover:text-[#E8436E] transition-colors cursor-pointer ${
              activeTab === 'admin' ? 'text-[#E8436E]' : ''
            }`}
          >
            <User className="w-5 h-5 text-stone-700" />
            <span className="hidden xl:inline">
              {activeTab === 'admin' ? 'Store Front' : 'Admin'}
            </span>
          </button>

          {/* Cart with live total */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-[#E8436E] px-3 py-1.5 rounded-full transition-colors cursor-pointer relative"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-2 -right-2 bg-[#E8436E] text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <span className="text-xs font-bold font-mono">Bag</span>
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION RIBBON */}
      <div className="border-t border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-medium text-stone-700">
          {/* Home Pill */}
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'shop'
                ? 'bg-[#E8436E] text-white font-bold shadow-xs'
                : 'hover:bg-stone-100 text-stone-700'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {/* Personalized Gifts (Hot tag) */}
          <button
            onClick={() => setActiveTab('customized')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'customized'
                ? 'bg-[#E8436E] text-white font-bold shadow-xs'
                : 'hover:bg-stone-100 text-stone-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Personalized Gifts</span>
            <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
              HOT
            </span>
          </button>

          {/* Categories Quick Filter Jump */}
          <button
            onClick={() => {
              setActiveTab('shop');
              const el = document.getElementById('categories-strip');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-stone-500" />
            <span>Occasions & Categories</span>
          </button>

          {/* Track COD Orders */}
          <button
            onClick={() => setActiveTab('track')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'track'
                ? 'bg-[#124282] text-white font-bold shadow-xs'
                : 'hover:bg-stone-100 text-stone-700'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-stone-500" />
            <span>Track Order</span>
          </button>

          {/* Contact Us */}
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'about' ? 'text-[#E8436E] font-bold bg-pink-50' : ''
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-stone-500" />
            <span>Gondia Store & Contact</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white p-4 space-y-3">
          <input
            type="text"
            placeholder="Search gifts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF8F9] border border-stone-200 rounded-xl px-4 py-2 text-xs"
          />
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('shop');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left bg-stone-50 rounded-lg"
            >
              Shop Gifts
            </button>
            <button
              onClick={() => {
                setActiveTab('customized');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left bg-stone-50 rounded-lg text-[#E8436E]"
            >
              Custom Photo Gifts
            </button>
            <button
              onClick={() => {
                setActiveTab('track');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left bg-stone-50 rounded-lg"
            >
              Track Order
            </button>
            <button
              onClick={() => {
                setActiveTab('about');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-left bg-stone-50 rounded-lg"
            >
              Contact Gondia Store
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
