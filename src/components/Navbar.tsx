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
  Download,
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
  onSelectCategory?: (category: string) => void;
  onSelectOccasion?: (occasion: string) => void;
  onOpenCatalogue?: () => void;
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
  onSelectCategory,
  onSelectOccasion,
  onOpenCatalogue,
}) => {
  const { itemCount, openCart } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [occasionsDropdownOpen, setOccasionsDropdownOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

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

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-xs">
        {/* 1. TOP ANNOUNCEMENT BAR (Warm Golden Amber & Rich Slate) */}
        <div className="bg-[#B45309] text-white py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs font-medium overflow-hidden shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Location on left */}
            <div className="flex items-center gap-1.5 text-white/95 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className="truncate">Gondia · Gupta Complex, Near N.M.D. College</span>
            </div>

            {/* Announcement & Phones on right */}
            <div className="flex items-center gap-2 sm:gap-3 text-white/95 shrink-0 font-medium">
              <span className="hidden lg:flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-yellow-300" />
                <span>Customized Gifts for Every Occasion</span>
              </span>
              <span className="hidden lg:inline text-white/40">|</span>
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-3 h-3 text-amber-200" />
                <a href="tel:8208589775" className="hover:underline">8208589775</a>
              </span>
              <span className="text-white/40">|</span>
              <button
                onClick={() => setActiveTab('admin')}
                className="inline-flex items-center gap-1 bg-white/20 hover:bg-white text-white hover:text-amber-900 px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer text-[10px]"
                title="Go to Admin Dashboard"
              >
                <span>Admin</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. MAIN HEADER ROW */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-stone-700 hover:text-amber-600 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer group whitespace-nowrap shrink-0"
          >
            {/* Warm Golden Gift Box Logo Icon */}
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 text-stone-900 flex items-center justify-center shadow-md shadow-amber-200/70 border border-amber-300 transition-transform group-hover:scale-105 shrink-0">
              <Gift className="w-4 h-4 sm:w-6 sm:h-6 text-stone-900" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="font-extrabold text-base sm:text-2xl tracking-tight text-[#1E293B] leading-none">
                  BLOSSOM
                </span>
                <span className="font-extrabold text-base sm:text-2xl tracking-tight text-amber-600 ml-1 sm:ml-1.5 leading-none">
                  GIFT
                </span>
              </div>
              <span className="hidden sm:block text-[9px] sm:text-[10px] font-medium text-stone-500 tracking-tight mt-0.5">
                Gift, Greet & Toys Whole Sale & Retail
              </span>
            </div>
          </button>

          {/* Center Search Input with Instant Dropdown Results */}
          <div ref={searchRef} className="flex-1 max-w-xl hidden md:block relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for gifts, toys, greeting cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#FAF9F5] border border-amber-200/80 rounded-full pl-5 pr-14 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-inner placeholder:text-stone-400"
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
                className="absolute right-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-900 flex items-center justify-center shadow-sm transition-all hover:scale-105 cursor-pointer font-bold"
                title="Search"
              >
                <Search className="w-4 h-4 text-stone-900 stroke-[2.5]" />
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
                        <span className="font-mono text-xs font-bold text-amber-600">
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

          {/* Right Action Icons: Wishlist, Admin (Desktop), My Account (Desktop), Cart */}
          <div className="flex items-center gap-2 sm:gap-5 shrink-0 text-xs font-medium text-stone-700">
            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-pointer group p-1"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-stone-700 group-hover:text-amber-600 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-900 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
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
                  ? 'bg-amber-500 text-stone-900 ring-2 ring-amber-300'
                  : 'bg-stone-900 hover:bg-amber-500 text-white hover:text-stone-900'
              }`}
              title="Open Admin Dashboard & Analytics"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400 group-hover:text-stone-900" />
              <span>Admin Panel</span>
            </button>

            {/* My Account (Desktop / Tablet Only) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setAccountModalOpen(!accountModalOpen)}
                className="flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-pointer group"
              >
                <User className="w-5 h-5 text-stone-700 group-hover:text-amber-600 transition-colors" />
                <span className="hidden sm:inline font-semibold">My Account</span>
              </button>

              {/* Account Dropdown */}
              {accountModalOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 text-left">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">Blossom Member</p>
                    <p className="text-[11px] text-stone-500">Gondia, Maharashtra</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('track');
                      setAccountModalOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Gift className="w-4 h-4 text-stone-500" />
                    <span>Track My Order</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      setAccountModalOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-stone-500" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </button>
                  <div className="border-t border-stone-100 my-1"></div>
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setAccountModalOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Admin Dashboard</span>
                    </span>
                    <span className="text-[10px] bg-amber-500 text-stone-900 px-1.5 py-0.5 rounded font-mono font-bold">
                      Portal
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 text-stone-700 hover:text-amber-600 transition-colors cursor-pointer group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-stone-700 group-hover:text-amber-600 transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-stone-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              </div>
              <span className="hidden sm:inline font-semibold">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Only shown on small screens) */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for gifts, toys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-amber-200/80 rounded-full pl-4 pr-12 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={() => setActiveTab('shop')}
              className="absolute right-1 w-7 h-7 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center font-bold"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
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
                  ? 'bg-amber-500 text-stone-900 shadow-xs'
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
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-amber-50 hover:text-amber-800 transition-colors cursor-pointer"
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-amber-50 hover:text-amber-800 text-stone-700 transition-colors cursor-pointer whitespace-nowrap"
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
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-amber-50 hover:text-amber-800 transition-colors cursor-pointer"
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
                  ? 'bg-amber-500 text-stone-900 shadow-xs'
                  : 'hover:bg-amber-50 hover:text-amber-800 text-stone-700'
              }`}
            >
              <Heart className="w-4 h-4 text-amber-600" />
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-amber-50 hover:text-amber-800 text-stone-700 transition-colors cursor-pointer whitespace-nowrap"
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-amber-50 hover:text-amber-800 text-stone-700 transition-colors cursor-pointer whitespace-nowrap"
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-amber-50 hover:text-amber-800 text-stone-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Gift className="w-4 h-4 text-amber-600" />
              <span>Gift Hampers</span>
            </button>

            {/* Contact Us */}
            <button
              onClick={() => {
                const el = document.getElementById('footer-contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:bg-amber-50 hover:text-amber-800 text-stone-700 transition-colors cursor-pointer whitespace-nowrap ml-auto"
            >
              <Phone className="w-4 h-4 text-stone-500" />
              <span>Contact Us</span>
            </button>

            {/* Download Catalogue (PDF) */}
            <button
              onClick={onOpenCatalogue}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-500 text-amber-900 hover:text-stone-900 font-bold transition-all cursor-pointer whitespace-nowrap border border-amber-300 shadow-2xs text-xs"
              title="Download or Print Blossom Gift Product Catalogue PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Catalogue (PDF)</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER (Exact matching Mobile Menu in Showcase image) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Header: User & Close */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">My Account</h4>
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="text-[10px] text-amber-700 font-bold hover:underline"
                  >
                    Login / Admin Portal →
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

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 text-xs font-semibold">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'shop' ? 'bg-amber-500 text-stone-900 font-bold shadow-xs' : 'text-stone-700 hover:bg-amber-50'
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
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-amber-50 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-amber-50 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Occasions</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('customized');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'customized' ? 'bg-amber-500 text-stone-900 font-bold shadow-xs' : 'text-stone-700 hover:bg-amber-50'
                }`}
              >
                <Heart className="w-4 h-4 text-amber-600" />
                <span>Personalized Gifts</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('Toys & Soft Toys');
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-amber-50 transition-colors"
              >
                <Smile className="w-4 h-4 text-emerald-600" />
                <span>Toys</span>
              </button>

              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('Greeting Cards');
                  setActiveTab('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-amber-50 transition-colors"
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
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-amber-50 transition-colors"
              >
                <Gift className="w-4 h-4 text-amber-600" />
                <span>Gift Hampers</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('about');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-amber-50 transition-colors"
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
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-stone-700 hover:bg-amber-50 transition-colors"
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
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 text-amber-900 font-bold border border-amber-300 mt-2 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Download Catalogue (PDF)</span>
                </span>
                <span className="text-[10px] bg-amber-500 text-stone-900 px-2 py-0.5 rounded-full font-mono font-extrabold shadow-2xs">
                  PDF
                </span>
              </button>
            </div>

            {/* Need Help Box */}
            <div className="p-4 bg-amber-50/70 border-t border-amber-200/80 space-y-3">
              <div>
                <p className="text-[11px] font-bold text-stone-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-700" />
                  <span>Need Help? Call or WhatsApp</span>
                </p>
                <a
                  href="tel:8208589775"
                  className="mt-1 block text-xs font-mono font-bold text-amber-800 hover:underline"
                >
                  8208589775 | 9673155741
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold text-stone-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-700" />
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
                  className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/theblossomgiftshop?mdxt=MW9oY2hzdmpncDFzYQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold"
                  title="Follow on Instagram @theblossomgiftshop"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold"
                >
                  f
                </a>
                <a
                  href="https://www.youtube.com/@blossomgiftcentergondiam.h925"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold"
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

      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed Dock in Crisp White & Warm Gold) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/80 py-1.5 px-4 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => {
            setActiveTab('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeTab === 'shop' ? 'text-amber-600' : 'text-stone-500'
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
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 hover:text-amber-600"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Shop</span>
        </button>

        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 hover:text-amber-600 relative"
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 text-[8px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          )}
          <span>Wishlist</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeTab === 'admin' ? 'text-amber-600' : 'text-stone-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Account</span>
        </button>
      </nav>
    </>
  );
};
