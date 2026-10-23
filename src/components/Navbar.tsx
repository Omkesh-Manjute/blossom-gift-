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
  X,
  Menu,
  ShoppingCart,
  Info,
  ExternalLink,
  MessageCircle,
  LayoutDashboard,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
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
  onSelectCategory?: (category: string) => void;
  onSelectOccasion?: (occasion: string) => void;
  onOpenCatalogue?: () => void;
}

const SEARCH_PLACEHOLDERS = [
  'Search "Custom Photo Mugs"...',
  'Search "LED Acrylic Light Frames"...',
  'Search "Cute Teddy Bear Hampers"...',
  'Search "Living Room Wall Clocks"...',
  'Search "Birthday & Anniversary Gifts"...',
  'Search "Handmade Chocolate Boxes"...',
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  wishlistCount,
  onOpenWishlist,
  products = [],
  onSelectProduct,
  onSelectCategory,
  onSelectOccasion,
  onOpenCatalogue,
}) => {
  const { itemCount, openCart } = useCart();
  const { theme, toggleTheme, themeConfig } = useTheme();
  const isCrimson = theme === 'crimson';

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [occasionsDropdownOpen, setOccasionsDropdownOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Flipkart style placeholder rotator
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const searchRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const occasionsRef = useRef<HTMLDivElement>(null);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
        setShopDropdownOpen(false);
      }
      if (occasionsRef.current && !occasionsRef.current.contains(event.target as Node)) {
        setOccasionsDropdownOpen(false);
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

  const shopCategories = [
    'Toys & Soft Toys',
    'Photo Mugs',
    'Greeting Cards',
    'Gift Hampers',
    'Customized Gifts',
  ];

  const occasionsList = [
    'Birthday',
    'Anniversary',
    'Wedding',
    "Valentine's Day",
    'Festivals',
  ];

  // Mobile quick filter chips like Flipkart
  const quickFilters = [
    { label: '⚡ Flash Deals', action: () => {
      const el = document.getElementById('rail-flash-deals');
      el?.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: '💖 Custom Gifts', action: () => {
      setActiveTab('customized');
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: '☕ Photo Mugs', action: () => {
      if (onSelectCategory) onSelectCategory('Photo Mugs');
      setActiveTab('shop');
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: '🧸 Soft Toys', action: () => {
      if (onSelectCategory) onSelectCategory('Toys & Soft Toys');
      setActiveTab('shop');
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: '⏰ Clocks', action: () => {
      const el = document.getElementById('rail-clocks') || document.getElementById('wall-watches-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: '🎁 Hampers', action: () => {
      if (onSelectCategory) onSelectCategory('Gift Hampers');
      setActiveTab('shop');
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }},
    { label: '💌 Cards', action: () => {
      if (onSelectCategory) onSelectCategory('Greeting Cards');
      setActiveTab('shop');
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }},
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs transition-colors duration-300">
        {/* 1. TOP ANNOUNCEMENT BAR */}
        <div
          className={`text-white py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs font-medium overflow-hidden shadow-xs transition-colors duration-300 ${
            isCrimson ? 'bg-[#991B1B]' : 'bg-[#B45309]'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Location on left */}
            <div className="flex items-center gap-1.5 text-white/95 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className="truncate">Gondia · Gupta Complex, Near N.M.D. College</span>
            </div>

            {/* Middle: 1-Click Theme Switcher Pill */}
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                isCrimson
                  ? 'bg-white text-red-700 hover:bg-red-50'
                  : 'bg-white text-amber-900 hover:bg-amber-50'
              }`}
              title="Click to toggle between Yellow & White and Cream & Red themes"
            >
              <span className="animate-spin-once">{isCrimson ? '🔴' : '🟡'}</span>
              <span>{isCrimson ? 'Cream & Red' : 'Yellow & White'}</span>
              <span className="hidden md:inline font-mono opacity-60 text-[9px] uppercase tracking-wider">
                (Click to switch)
              </span>
            </button>

            {/* Announcement & Phones on right */}
            <div className="flex items-center gap-2 sm:gap-3 text-white/95 shrink-0 font-medium">
              <span className="hidden lg:flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-yellow-300" />
                <span>Custom Gifts for Every Moment</span>
              </span>
              <span className="hidden lg:inline text-white/40">|</span>
              <span className="hidden sm:flex items-center gap-1 font-mono">
                <Phone className="w-3 h-3 text-amber-200" />
                <a href="tel:8208589775" className="hover:underline">
                  8208589775
                </a>
              </span>
              <span className="hidden sm:inline text-white/40">|</span>
              <button
                onClick={() => setActiveTab('admin')}
                className="inline-flex items-center gap-1 bg-white/20 hover:bg-white text-white hover:text-stone-900 px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer text-[10px]"
                title="Go to Admin Dashboard"
              >
                <span>Admin</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. MAIN HEADER ROW */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2.5 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`md:hidden p-1.5 text-stone-700 transition-colors cursor-pointer ${
              isCrimson ? 'hover:text-red-600' : 'hover:text-amber-600'
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer group whitespace-nowrap shrink-0"
          >
            <div
              className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 shrink-0 ${
                isCrimson
                  ? 'bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white shadow-red-200/80 border border-red-400'
                  : 'bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 text-stone-900 shadow-amber-200/70 border border-amber-300'
              }`}
            >
              <Gift className={`w-4 h-4 sm:w-6 sm:h-6 ${isCrimson ? 'text-white' : 'text-stone-900'}`} />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-extrabold text-base sm:text-2xl tracking-tight text-[#1E293B] leading-none">
                  BLOSSOM
                </span>
                <span
                  className={`font-extrabold text-base sm:text-2xl tracking-tight ml-1 sm:ml-1.5 leading-none transition-colors ${
                    isCrimson ? 'text-red-600' : 'text-amber-600'
                  }`}
                >
                  GIFT
                </span>
              </div>
              <span className="hidden sm:block text-[9px] sm:text-[10px] font-medium text-stone-500 tracking-tight mt-0.5">
                Gift, Greet & Toys Whole Sale & Retail
              </span>
            </div>
          </button>

          {/* Center Search Input with Instant Dropdown Results (Desktop) */}
          <div ref={searchRef} className="flex-1 max-w-xl hidden md:block relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className={`w-full bg-[#FAF9F5] border rounded-full pl-5 pr-14 py-2.5 text-xs text-stone-900 focus:outline-none focus:bg-white transition-all shadow-inner placeholder:text-stone-400 ${
                  isCrimson
                    ? 'border-red-200/80 focus:ring-2 focus:ring-red-500'
                    : 'border-amber-200/80 focus:ring-2 focus:ring-amber-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => {
                  setActiveTab('shop');
                  setIsSearchFocused(false);
                }}
                className={`absolute right-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-105 cursor-pointer font-bold ${
                  isCrimson
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-stone-900'
                }`}
                title="Search"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
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
                        <span
                          className={`font-mono text-xs font-bold ${
                            isCrimson ? 'text-red-600' : 'text-amber-600'
                          }`}
                        >
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

          {/* Right Action Icons: Theme Switcher, Wishlist, Admin, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-xs font-medium text-stone-700">
            {/* Quick 1-Click Theme Switcher Pill (Desktop & Mobile Header) */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-xs border cursor-pointer hover:scale-105 active:scale-95 ${
                isCrimson
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={`Switch to ${isCrimson ? 'Yellow & White' : 'Cream & Red'} theme`}
            >
              <span>{isCrimson ? '🔴' : '🟡'}</span>
              <span className="hidden sm:inline">{isCrimson ? 'Crimson' : 'Gold'}</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer group p-1 ${
                isCrimson ? 'hover:text-red-600' : 'hover:text-amber-600'
              }`}
            >
              <div className="relative">
                <Heart
                  className={`w-5 h-5 text-stone-700 transition-colors ${
                    isCrimson ? 'group-hover:text-red-600' : 'group-hover:text-amber-600'
                  }`}
                />
                {wishlistCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-2 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs ${
                      isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-900'
                    }`}
                  >
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">Wishlist</span>
            </button>

            {/* Direct Admin Panel Button (Desktop Only) */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`hidden md:flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-bold text-xs transition-all shadow-xs hover:shadow-md cursor-pointer ${
                activeTab === 'admin'
                  ? isCrimson
                    ? 'bg-red-600 text-white ring-2 ring-red-300'
                    : 'bg-amber-500 text-stone-900 ring-2 ring-amber-300'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
              title="Open Admin Dashboard & Analytics"
            >
              <LayoutDashboard className={`w-3.5 h-3.5 ${isCrimson ? 'text-red-400' : 'text-amber-400'}`} />
              <span>Admin</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className={`flex items-center gap-2 text-stone-700 transition-colors cursor-pointer group ${
                isCrimson ? 'hover:text-red-600' : 'hover:text-amber-600'
              }`}
            >
              <div className="relative">
                <ShoppingCart
                  className={`w-5 h-5 text-stone-700 transition-colors ${
                    isCrimson ? 'group-hover:text-red-600' : 'group-hover:text-amber-600'
                  }`}
                />
                <span
                  className={`absolute -top-1.5 -right-2 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs ${
                    isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-900'
                  }`}
                >
                  {itemCount}
                </span>
              </div>
              <span className="hidden sm:inline font-semibold">Cart</span>
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH BAR & FLIPKART STYLE QUICK FILTER PILLS (Only shown on small screens) */}
        <div className="md:hidden px-4 pb-2.5 pt-0 space-y-2">
          {/* Animated Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-[#FAF9F5] border rounded-full pl-4 pr-12 py-2 text-xs text-stone-900 focus:outline-none transition-all shadow-inner ${
                isCrimson
                  ? 'border-red-200/80 focus:ring-2 focus:ring-red-500'
                  : 'border-amber-200/80 focus:ring-2 focus:ring-amber-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-10 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setActiveTab('shop')}
              className={`absolute right-1 w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-xs ${
                isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Horizontal Quick-Filter Chips (Flipkart style horizontal scroll) */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 -mx-4 px-4">
            {quickFilters.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={chip.action}
                className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  isCrimson
                    ? 'bg-red-50/80 text-red-900 border-red-200 hover:bg-red-100'
                    : 'bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. NAVIGATION RIBBON (Desktop) */}
        <div className="hidden md:block border-t border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-semibold text-stone-700">
            {/* Home Pill */}
            <button
              onClick={() => {
                setActiveTab('shop');
                if (onSelectCategory) onSelectCategory('all');
                if (onSelectOccasion) onSelectOccasion('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 font-bold ${
                activeTab === 'shop'
                  ? isCrimson
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-amber-500 text-stone-900 shadow-xs'
                  : isCrimson
                  ? 'hover:bg-red-50 hover:text-red-800 text-stone-700'
                  : 'hover:bg-amber-50 hover:text-amber-800 text-stone-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            {/* Shop Dropdown */}
            <div ref={shopRef} className="relative">
              <button
                onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {shopDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50">
                  {shopCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        if (onSelectCategory) onSelectCategory(cat);
                        setActiveTab('shop');
                        setShopDropdownOpen(false);
                        const el = document.getElementById('catalog-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        isCrimson
                          ? 'hover:bg-red-50 hover:text-red-800'
                          : 'hover:bg-amber-50 hover:text-amber-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Occasions Dropdown */}
            <div ref={occasionsRef} className="relative">
              <button
                onClick={() => setOccasionsDropdownOpen(!occasionsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-stone-700 transition-colors cursor-pointer whitespace-nowrap ${
                  isCrimson ? 'hover:bg-red-50 hover:text-red-800' : 'hover:bg-amber-50 hover:text-amber-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Occasions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${occasionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {occasionsDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50">
                  {occasionsList.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => {
                        if (onSelectOccasion) onSelectOccasion(occ);
                        setActiveTab('shop');
                        setOccasionsDropdownOpen(false);
                        const el = document.getElementById('catalog-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        isCrimson
                          ? 'hover:bg-red-50 hover:text-red-800'
                          : 'hover:bg-amber-50 hover:text-amber-800'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Personalized Gifts */}
            <button
              onClick={() => {
                setActiveTab('customized');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap font-bold ${
                activeTab === 'customized'
                  ? isCrimson
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-amber-500 text-stone-900 shadow-xs'
                  : isCrimson
                  ? 'hover:bg-red-50 hover:text-red-800 text-stone-700'
                  : 'hover:bg-amber-50 hover:text-amber-800 text-stone-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isCrimson ? 'text-red-600' : 'text-amber-600'}`} />
              <span>Personalized Gifts</span>
            </button>

            {/* Toys */}
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('Toys & Soft Toys');
                setActiveTab('shop');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-stone-700 transition-colors cursor-pointer whitespace-nowrap ${
                isCrimson ? 'hover:bg-red-50 hover:text-red-800' : 'hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              <Smile className="w-4 h-4 text-emerald-600" />
              <span>Toys</span>
            </button>

            {/* Greeting Cards */}
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('Greeting Cards');
                setActiveTab('shop');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-stone-700 transition-colors cursor-pointer whitespace-nowrap ${
                isCrimson ? 'hover:bg-red-50 hover:text-red-800' : 'hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              <Mail className="w-4 h-4 text-purple-600" />
              <span>Greeting Cards</span>
            </button>

            {/* Gift Hampers */}
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('Gift Hampers');
                setActiveTab('shop');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-stone-700 transition-colors cursor-pointer whitespace-nowrap ${
                isCrimson ? 'hover:bg-red-50 hover:text-red-800' : 'hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              <Gift className={`w-4 h-4 ${isCrimson ? 'text-red-600' : 'text-amber-600'}`} />
              <span>Gift Hampers</span>
            </button>

            {/* Contact Us */}
            <button
              onClick={() => {
                const el = document.getElementById('footer-contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-stone-700 transition-colors cursor-pointer whitespace-nowrap ml-auto ${
                isCrimson ? 'hover:bg-red-50 hover:text-red-800' : 'hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              <Phone className="w-4 h-4 text-stone-500" />
              <span>Contact Us</span>
            </button>

            {/* Download Catalogue (PDF) */}
            <button
              onClick={onOpenCatalogue}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap border shadow-2xs text-xs ${
                isCrimson
                  ? 'bg-red-50 hover:bg-red-600 text-red-900 hover:text-white border-red-300'
                  : 'bg-amber-100 hover:bg-amber-500 text-amber-900 hover:text-stone-900 border-amber-300'
              }`}
              title="Download or Print Blossom Gift Product Catalogue PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Catalogue (PDF)</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Header: User & Close */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    isCrimson ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Blossom Member</h4>
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMobileMenuOpen(false);
                    }}
                    className={`text-[10px] font-bold hover:underline ${
                      isCrimson ? 'text-red-700' : 'text-amber-700'
                    }`}
                  >
                    Admin Portal →
                  </button>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1-Click Theme Switch Card inside Mobile Drawer */}
            <div className="p-3 border-b border-stone-100">
              <div
                onClick={toggleTheme}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isCrimson
                    ? 'bg-red-50/70 border-red-200 text-red-900'
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{isCrimson ? '🔴' : '🟡'}</span>
                  <div>
                    <div className="text-xs font-bold">Theme: {themeConfig.name}</div>
                    <div className="text-[10px] text-stone-500">Tap to switch palette</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-950'
                  }`}
                >
                  Switch
                </span>
              </div>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 text-xs font-semibold">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'shop'
                    ? isCrimson
                      ? 'bg-red-600 text-white font-bold shadow-xs'
                      : 'bg-amber-500 text-stone-900 font-bold shadow-xs'
                    : isCrimson
                    ? 'text-stone-700 hover:bg-red-50'
                    : 'text-stone-700 hover:bg-amber-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop All</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('customized');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'customized'
                    ? isCrimson
                      ? 'bg-red-600 text-white font-bold shadow-xs'
                      : 'bg-amber-500 text-stone-900 font-bold shadow-xs'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isCrimson ? 'text-red-600' : 'text-amber-600'}`} />
                <span>Personalized Gifts</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('Toys & Soft Toys');
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Smile className="w-4 h-4 text-emerald-600" />
                <span>Toys & Soft Toys</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('Photo Mugs');
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Gift className="w-4 h-4 text-amber-600" />
                <span>Photo Mugs</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('Greeting Cards');
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-600" />
                <span>Greeting Cards</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('Gift Hampers');
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Gift className="w-4 h-4 text-rose-600" />
                <span>Gift Hampers</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('about');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Info className="w-4 h-4 text-stone-500" />
                <span>About Us</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('footer-contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-stone-500" />
                <span>Contact Us</span>
              </button>

              {/* Mobile Catalogue PDF Button */}
              <button
                onClick={() => {
                  if (onOpenCatalogue) onOpenCatalogue();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold border mt-2 transition-colors cursor-pointer ${
                  isCrimson
                    ? 'bg-red-50 text-red-900 border-red-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FileText className={`w-4 h-4 ${isCrimson ? 'text-red-600' : 'text-amber-600'}`} />
                  <span>Download Catalogue (PDF)</span>
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold shadow-2xs ${
                    isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-900'
                  }`}
                >
                  PDF
                </span>
              </button>
            </div>

            {/* Need Help Box */}
            <div
              className={`p-4 border-t space-y-3 ${
                isCrimson ? 'bg-red-50/70 border-red-200/80' : 'bg-amber-50/70 border-amber-200/80'
              }`}
            >
              <div>
                <p className="text-[11px] font-bold text-stone-900 flex items-center gap-1.5">
                  <Phone className={`w-3.5 h-3.5 ${isCrimson ? 'text-red-700' : 'text-amber-700'}`} />
                  <span>Need Help? Call or WhatsApp</span>
                </p>
                <a
                  href="tel:8208589775"
                  className={`mt-1 block text-xs font-mono font-bold hover:underline ${
                    isCrimson ? 'text-red-800' : 'text-amber-800'
                  }`}
                >
                  8208589775 | 9673155741
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold text-stone-800 flex items-center gap-1">
                  <MapPin className={`w-3 h-3 ${isCrimson ? 'text-red-700' : 'text-amber-700'}`} />
                  <span>Visit Our Store</span>
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  Gupta Complex, Near N.M.D. College, Gondia (M.S.)
                </p>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://wa.me/918208589775"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/theblossomgiftshop?mdxt=MW9oY2hzdmpncDFzYQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-xs"
                  title="Follow on Instagram @theblossomgiftshop"
                >
                  IG
                </a>
                <a
                  href="https://www.youtube.com/@blossomgiftcentergondiam.h925"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shadow-xs"
                  title="YouTube Channel"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION DOCK (Fixed at bottom) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-1.5 px-4 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => {
            setActiveTab('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
            activeTab === 'shop'
              ? isCrimson
                ? 'text-red-600'
                : 'text-amber-600'
              : 'text-stone-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('shop');
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 cursor-pointer ${
            isCrimson ? 'hover:text-red-600' : 'hover:text-amber-600'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Shop</span>
        </button>

        <button
          onClick={onOpenWishlist}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 relative cursor-pointer ${
            isCrimson ? 'hover:text-red-600' : 'hover:text-amber-600'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span
              className={`absolute -top-1 -right-1 text-[8px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs ${
                isCrimson ? 'bg-red-600 text-white' : 'bg-amber-500 text-stone-900'
              }`}
            >
              {wishlistCount}
            </span>
          )}
          <span>Wishlist</span>
        </button>

        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 hover:text-stone-900 cursor-pointer"
          title="Toggle Theme"
        >
          <span className="text-base leading-none">{isCrimson ? '🔴' : '🟡'}</span>
          <span>Theme</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
            activeTab === 'admin'
              ? isCrimson
                ? 'text-red-600'
                : 'text-amber-600'
              : 'text-stone-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Admin</span>
        </button>
      </nav>
    </>
  );
};
