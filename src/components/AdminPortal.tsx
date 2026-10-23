import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Sparkles,
  Image as ImageIcon,
  Star,
  Tag,
  Boxes,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Plus,
  CheckCircle,
  Clock,
  Printer,
  Download,
  Phone,
  Trash2,
  Edit,
  Eye,
  Check,
  AlertTriangle,
  Gift,
  MoreVertical,
  ShoppingCart,
  FolderPlus,
  Compass,
  Video,
  Film,
  Copy,
  Upload,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { Order, OrderStatus, Product, Customer, Category, Coupon, Review, StoreSettings, HeroSlide } from '../types';
import { PackingSlipModal } from './PackingSlipModal';

interface AdminPortalProps {
  onBackToStore?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'orders'
    | 'products'
    | 'categories'
    | 'customers'
    | 'custom_orders'
    | 'banners'
    | 'reviews'
    | 'coupons'
    | 'inventory'
    | 'reports'
    | 'settings'
  >('dashboard');

  const [orders, setOrders] = useState<Order[]>(() => storeService.getOrders());
  const [products, setProducts] = useState<Product[]>(() => storeService.getProducts());
  const [customers, setCustomers] = useState<Customer[]>(() => storeService.getCustomers());
  const [coupons, setCoupons] = useState<Coupon[]>(() => storeService.getCoupons());
  const [reviews, setReviews] = useState<Review[]>(() => storeService.getReviews());
  const [settings, setSettings] = useState<StoreSettings>(() => storeService.getSettings());

  // Navigation & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('This Month');
  const [statusTimeframe, setStatusTimeframe] = useState('This Month');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Modals & Action States
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [slipOrder, setSlipOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Category & Coupon Modals
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponMin, setNewCouponMin] = useState(499);

  // Filter orders state
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => storeService.getHeroSlides());
  const [isAddingSlide, setIsAddingSlide] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slideForm, setSlideForm] = useState<Omit<HeroSlide, 'id'>>({
    type: 'video',
    mediaUrl: '/videos/video_1.mp4',
    mobileMediaUrl: '',
    title: 'Handcrafted Magic in Gondia',
    subtitle: '',
    kicker: '',
    description: '',
    ctaText: 'Shop Now',
    ctaLink: '#catalog-section',
    badge: '10s Video',
    isActive: true,
    order: 1,
    showOverlay: false,
  });

  const refreshData = () => {
    setOrders(storeService.getOrders());
    setProducts(storeService.getProducts());
    setCustomers(storeService.getCustomers());
    setCoupons(storeService.getCoupons());
    setReviews(storeService.getReviews());
    setSettings(storeService.getSettings());
    setHeroSlides(storeService.getHeroSlides());
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm') || file.name.endsWith('.mov');
    const isImage = file.type.startsWith('image/');

    if (isVideo) {
      setSlideForm((prev) => ({ ...prev, type: 'video' }));
    } else if (isImage) {
      setSlideForm((prev) => ({ ...prev, type: 'image' }));
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSlideForm((prev) => ({
          ...prev,
          mediaUrl: reader.result as string,
        }));
        showToast(`Loaded ${file.name} for slide! 🎬`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    const finalForm = {
      ...slideForm,
      title: slideForm.title.trim() || (slideForm.type === 'video' ? 'Blossom Gift Promo' : 'Featured Gifts'),
    };
    if (editingSlide) {
      storeService.updateHeroSlide(editingSlide.id, finalForm);
      showToast('Slide updated successfully!');
    } else {
      storeService.addHeroSlide(finalForm);
      showToast('New hero slide added!');
    }
    setHeroSlides(storeService.getHeroSlides());
    setIsAddingSlide(false);
    setEditingSlide(null);
  };

  const handleDeleteSlide = (id: string) => {
    if (window.confirm('Are you sure you want to delete this hero slide?')) {
      storeService.deleteHeroSlide(id);
      setHeroSlides(storeService.getHeroSlides());
      showToast('Slide deleted successfully!');
    }
  };

  const handleToggleSlideActive = (id: string, current: boolean) => {
    storeService.updateHeroSlide(id, { isActive: !current });
    setHeroSlides(storeService.getHeroSlides());
    showToast(`Slide ${!current ? 'activated' : 'deactivated'}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quick Restock Handler
  const handleQuickRestock = (productId: string, amount: number = 5) => {
    const p = products.find((prod) => prod.id === productId);
    if (p) {
      p.stock += amount;
      p.badge = p.stock <= 5 ? 'Low Stock' : undefined;
      storeService.saveProduct(p);
      refreshData();
      showToast(`Restocked ${p.name} (+${amount} units)`);
    }
  };

  // Update Order Status Handler
  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    storeService.updateOrderStatus(orderId, status);
    refreshData();
    showToast(`Order #${orderId} marked as ${status}`);
  };

  // Save Product Handler
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    storeService.saveProduct(editingProduct);
    setEditingProduct(null);
    setIsAddingProduct(false);
    refreshData();
    showToast(`Product "${editingProduct.name}" saved!`);
  };

  // Add Coupon Handler
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    const newCoupon: Coupon = {
      id: `c-${Date.now()}`,
      code: newCouponCode.toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minOrder: Number(newCouponMin),
      expiryDate: '2026-12-31',
      usageLimit: 500,
      usedCount: 0,
      isActive: true,
    };
    storeService.saveCoupon(newCoupon);
    setIsAddingCoupon(false);
    setNewCouponCode('');
    refreshData();
    showToast(`Coupon ${newCoupon.code} created!`);
  };

  // Save Settings Handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storeService.saveSettings(settings);
    showToast('Store settings updated successfully!');
  };

  // Top Selling Products
  const topSellingList = [
    { rank: 1, name: 'Teddy Bear (Red)', sold: 86, revenue: 34400, img: '/extracted/thumb_red_teddy.png' },
    { rank: 2, name: 'Personalized Photo Mug', sold: 72, revenue: 21528, img: '/extracted/thumb_photo_mug.png' },
    { rank: 3, name: 'Greeting Cards', sold: 64, revenue: 3136, img: '/extracted/thumb_cards.png' },
    { rank: 4, name: 'Gift Hampers', sold: 48, revenue: 47952, img: '/extracted/thumb_hampers.png' },
    { rank: 5, name: 'Personalized Keychain', sold: 46, revenue: 9154, img: '/extracted/thumb_keychain.png' },
  ];

  // Low Stock Items from screenshot
  const lowStockList = [
    { id: 'prod-09', name: 'Teddy Bear (Brown)', stock: 5, status: 'Low Stock', img: '/products/brown_teddy_bear.jpg' },
    { id: 'prod-10', name: 'Photo Mug (White)', stock: 3, status: 'Low Stock', img: '/products/white_photo_mug.jpg' },
    { id: 'prod-11', name: 'Gift Box (Premium)', stock: 2, status: 'Out of Stock', img: '/products/premium_gift_box.jpg' },
    { id: 'prod-12', name: 'Greeting Card (Birthday)', stock: 4, status: 'Low Stock', img: '/products/birthday_popup_card.jpg' },
  ];

  // Monthly Sales Overview Chart Data (Jan to Dec)
  const salesOverviewData = [
    { month: 'Jan', sales: 10000, orders: 4000 },
    { month: 'Feb', sales: 11000, orders: 5000 },
    { month: 'Mar', sales: 12500, orders: 6000 },
    { month: 'Apr', sales: 12500, orders: 6500 },
    { month: 'May', sales: 17500, orders: 11000 },
    { month: 'Jun', sales: 12500, orders: 6000 },
    { month: 'Jul', sales: 13500, orders: 6500 },
    { month: 'Aug', sales: 17500, orders: 13000 },
    { month: 'Sep', sales: 16000, orders: 11000 },
    { month: 'Oct', sales: 17500, orders: 13000 },
    { month: 'Nov', sales: 16500, orders: 11000 },
    { month: 'Dec', sales: 22000, orders: 16000 },
  ];

  // Order Status Donut Segments
  const orderStatusSegments = [
    { label: 'Pending', count: 34, percent: 14, color: '#FF3366', strokeDash: '88 540', strokeOffset: '0' },
    { label: 'Confirmed', count: 56, percent: 23, color: '#FB7185', strokeDash: '144 540', strokeOffset: '-88' },
    { label: 'Preparing', count: 48, percent: 19, color: '#FBBF24', strokeDash: '119 540', strokeOffset: '-232' },
    { label: 'Ready', count: 72, percent: 29, color: '#34D399', strokeDash: '182 540', strokeOffset: '-351' },
    { label: 'Delivered', count: 32, percent: 13, color: '#818CF8', strokeDash: '81 540', strokeOffset: '-533' },
    { label: 'Cancelled', count: 6, percent: 2, color: '#9CA3AF', strokeDash: '13 540', strokeOffset: '-614' },
  ];

  const sidebarMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: '12' },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'custom_orders', label: 'Custom Orders', icon: Sparkles },
    { id: 'banners', label: 'Banners & Offers', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Notifications
  const notificationsList = [
    { id: 1, title: 'New order #BG1250 received', time: '10m ago', unread: true },
    { id: 2, title: 'Low stock: Teddy Bear (Brown) (5 left)', time: '45m ago', unread: true },
    { id: 3, title: 'Order #BG1246 delivered in Gondia', time: '2h ago', unread: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row text-left font-sans text-stone-800 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1E293B] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce border border-amber-500/30">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR (Matching Dashboard: clean white, amber pill active) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-stone-200/80 shadow-xs flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo Header */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-100">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setSidebarOpen(false);
              }}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-500 text-stone-950 flex items-center justify-center shadow-md shadow-amber-200 transition-transform group-hover:scale-105">
                <Gift className="w-5 h-5 text-stone-950" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-extrabold text-lg tracking-tight text-[#1E293B] leading-none">
                    BLOSSOM
                  </span>
                  <span className="font-extrabold text-lg tracking-tight text-amber-600 ml-1 leading-none">
                    GIFT
                  </span>
                </div>
                <span className="text-[9px] font-medium text-stone-400 tracking-tight block mt-0.5">
                  Gift, Greet & Toys Whole Sale & Retail
                </span>
              </div>
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu Items */}
          <div className="p-3 space-y-1 overflow-y-auto flex-1">
            {sidebarMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-200/70 font-extrabold'
                      : 'text-stone-600 hover:bg-amber-50/60 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white text-stone-950'
                          : 'bg-amber-500 text-stone-950'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Promo Card (Matching the 3D gift box card from screenshot) */}
          <div className="p-3 border-t border-stone-100">
            <div className="relative rounded-2xl overflow-hidden p-3 bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200/80 text-center shadow-xs">
              <img
                src="/extracted/dash_promo.png"
                alt="Blossom Gift Promo"
                className="w-full h-auto max-h-36 object-contain rounded-xl mx-auto mb-1"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER BAR */}
        <header className="sticky top-0 z-30 bg-white border-b border-stone-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shadow-xs">
          {/* Left: Mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search */}
            <div className="relative w-64 sm:w-80 md:w-96 flex items-center">
              <input
                type="text"
                placeholder="Search orders, products, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF8F9] border border-stone-200 rounded-full pl-4 pr-10 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="absolute right-1 w-7 h-7 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center cursor-pointer">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Visit Website Button */}
            {onBackToStore && (
              <button
                onClick={onBackToStore}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black transition-all shadow-sm shadow-amber-200 cursor-pointer whitespace-nowrap"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-stone-950 text-[9px] font-black rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <h4 className="text-xs font-bold text-stone-900">Notifications</h4>
                    <span className="text-[10px] text-amber-700 font-bold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {notificationsList.map((n) => (
                      <div key={n.id} className="py-2 text-xs">
                        <p className="font-semibold text-stone-800">{n.title}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-stone-50"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-black flex items-center justify-center text-xs shadow-xs">
                  A
                </div>
                <span className="hidden sm:inline text-xs font-bold text-stone-800">
                  Admin
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 text-left text-xs">
                  <div className="px-3 py-1.5 border-b border-stone-100">
                    <p className="font-bold text-stone-900">Blossom Store Hub</p>
                    <p className="text-[10px] text-stone-500">Gondia Central</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-stone-50 text-stone-700 cursor-pointer"
                  >
                    Store Settings
                  </button>
                  {onBackToStore && (
                    <button
                      onClick={() => {
                        onBackToStore();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-stone-50 text-amber-700 font-semibold cursor-pointer"
                    >
                      Go to Storefront
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY PER ACTIVE TAB */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          {activeTab === 'dashboard' ? (
            <>
              {/* TOP 4 STAT CARDS (Warm amber/yellow & white) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* 1. Total Orders */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-500 block">Total Orders</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-stone-900 font-mono">248</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        ↑ 12%
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">This Month</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                </div>

                {/* 2. Total Sales */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-500 block">Total Sales</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-stone-900 font-mono">₹48,750</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        ↑ 18%
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">This Month</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center font-extrabold text-xl">
                    ₹
                  </div>
                </div>

                {/* 3. Total Customers */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-500 block">Total Customers</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-stone-900 font-mono">320</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        ↑ 9%
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">Registered Users</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                {/* 4. Total Products */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-500 block">Total Products</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-stone-900 font-mono">156</span>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">Active Products</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: Sales Overview (Dual Bar Chart) & Order Status (Donut Chart) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sales Overview (lg:col-span-8) */}
                <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                      <h3 className="font-sans font-bold text-base text-stone-900">Sales Overview</h3>
                      <p className="text-xs text-stone-400">Monthly sales and orders</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Legend */}
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="text-stone-600">Sales (₹)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                          <span className="text-stone-600">Orders</span>
                        </div>
                      </div>

                      {/* Dropdown */}
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-1.5 text-stone-700 focus:outline-none cursor-pointer"
                      >
                        <option>This Month</option>
                        <option>This Week</option>
                        <option>This Year</option>
                      </select>
                    </div>
                  </div>

                  {/* Dual Bar Chart SVG / Interactive Canvas */}
                  <div className="relative h-64 w-full flex items-end justify-between pt-6 pb-2 px-2 border-b border-stone-100">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-stone-400 font-mono pointer-events-none">
                      <span>25K</span>
                      <span>20K</span>
                      <span>15K</span>
                      <span>10K</span>
                      <span>5K</span>
                      <span>0</span>
                    </div>

                    {/* Chart Bars */}
                    <div className="flex-1 ml-8 flex items-end justify-around h-full">
                      {salesOverviewData.map((d, i) => {
                        const salesHeight = (d.sales / 25000) * 100;
                        const ordersHeight = (d.orders / 25000) * 100;

                        return (
                          <div
                            key={d.month}
                            className="relative flex flex-col items-center group cursor-pointer"
                            onMouseEnter={() => setHoveredBar(i)}
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            {/* Hover Tooltip */}
                            {hoveredBar === i && (
                              <div className="absolute -top-12 z-20 bg-stone-900 text-white text-[10px] py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap font-mono">
                                <div>Sales: ₹{d.sales.toLocaleString()}</div>
                                <div>Orders: {Math.round(d.orders / 100)}</div>
                              </div>
                            )}

                            {/* Dual Bars */}
                            <div className="flex items-end gap-1">
                              {/* Amber: Sales */}
                              <div
                                style={{ height: `${salesHeight}%` }}
                                className="w-2 sm:w-3 bg-amber-500 rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                              />
                              {/* Light yellow: Orders */}
                              <div
                                style={{ height: `${ordersHeight}%` }}
                                className="w-2 sm:w-3 bg-amber-200 rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                              />
                            </div>
                            <span className="text-[10px] text-stone-500 font-medium mt-2">{d.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Status (Donut Chart - lg:col-span-4) */}
                <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-sans font-bold text-base text-stone-900">Order Status</h3>
                      <p className="text-xs text-stone-400">Total 248 orders</p>
                    </div>
                    <select
                      value={statusTimeframe}
                      onChange={(e) => setStatusTimeframe(e.target.value)}
                      className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-2.5 py-1 text-stone-700 focus:outline-none cursor-pointer"
                    >
                      <option>This Month</option>
                      <option>This Week</option>
                    </select>
                  </div>

                  {/* Donut Chart & Legend */}
                  <div className="flex flex-col sm:flex-row lg:flex-row items-center gap-6 my-auto pt-2">
                    {/* SVG Donut */}
                    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        {orderStatusSegments.map((seg, idx) => (
                          <circle
                            key={idx}
                            cx="100"
                            cy="100"
                            r="80"
                            fill="transparent"
                            stroke={seg.color}
                            strokeWidth="24"
                            strokeDasharray={seg.strokeDash}
                            strokeDashoffset={seg.strokeOffset}
                            className="transition-all duration-500 hover:opacity-80"
                          />
                        ))}
                      </svg>
                      {/* Center Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                        <span className="font-mono text-xl font-extrabold text-stone-900 leading-none">248</span>
                        <span className="text-[10px] text-stone-400 font-semibold mt-0.5">Orders</span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex-1 space-y-1.5 text-xs w-full">
                      {orderStatusSegments.map((seg) => (
                        <div key={seg.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                            <span className="text-stone-600 font-medium">{seg.label}</span>
                          </div>
                          <span className="font-mono text-stone-700 font-bold text-[11px]">
                            {seg.count} ({seg.percent}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* THIRD ROW: Recent Orders & Top Selling Products */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Orders (lg:col-span-8) */}
                <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-sans font-bold text-base text-stone-900">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-stone-100 text-stone-400 font-semibold">
                          <th className="pb-3 font-normal">#ID</th>
                          <th className="pb-3 font-normal">Customer</th>
                          <th className="pb-3 font-normal">Product(s)</th>
                          <th className="pb-3 font-normal">Amount</th>
                          <th className="pb-3 font-normal">Status</th>
                          <th className="pb-3 font-normal">Date</th>
                          <th className="pb-3 font-normal text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {orders.slice(0, 5).map((o) => {
                          const statusColors: Record<string, string> = {
                            Pending: 'bg-amber-50 text-amber-600 border border-amber-200',
                            Confirmed: 'bg-blue-50 text-blue-600 border border-blue-200',
                            Preparing: 'bg-amber-50 text-amber-700 border border-amber-300',
                            Ready: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
                            Delivered: 'bg-purple-50 text-purple-600 border border-purple-200',
                            Cancelled: 'bg-stone-50 text-stone-500 border border-stone-200',
                          };

                          return (
                            <tr key={o.id} className="hover:bg-stone-50/70 transition-colors">
                              <td className="py-3 font-mono font-bold text-amber-700">{o.orderNumber}</td>
                              <td className="py-3 font-bold text-stone-800">{o.customerName}</td>
                              <td className="py-3">
                                <div className="flex items-center -space-x-1.5">
                                  {o.items.slice(0, 2).map((it, idx) => (
                                    <img
                                      key={idx}
                                      src={it.product?.images?.[0] || '/extracted/thumb_photo_mug.png'}
                                      alt="Product thumbnail"
                                      className="w-7 h-7 rounded-lg object-cover ring-2 ring-white shadow-xs"
                                    />
                                  ))}
                                </div>
                              </td>
                              <td className="py-3 font-mono font-bold text-stone-900">₹{o.totalAmount}</td>
                              <td className="py-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColors[o.status] || 'bg-stone-100 text-stone-600'}`}>
                                  {o.status}
                                </span>
                              </td>
                              <td className="py-3 text-stone-400 font-mono text-[11px]">
                                {new Date(o.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() => setSelectedOrder(o)}
                                  className="w-7 h-7 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 flex items-center justify-center cursor-pointer ml-auto"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Selling Products (lg:col-span-4) */}
                <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-sans font-bold text-base text-stone-900">Top Selling Products</h3>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <span>→</span>
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {topSellingList.map((item) => (
                      <div key={item.rank} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono font-bold text-stone-400 w-3">{item.rank}</span>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-9 h-9 rounded-xl object-cover bg-stone-50 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-stone-900 truncate">{item.name}</h4>
                            <span className="text-[10px] text-stone-400">{item.sold} sold</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono font-bold text-stone-900">₹{item.revenue.toLocaleString()}</span>
                          <button
                            onClick={() => showToast(`Added ${item.name} to batch order`)}
                            className="w-7 h-7 rounded-full bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-stone-950 flex items-center justify-center transition-colors cursor-pointer border border-amber-200/60"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Low Stock Products, New Customers, Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                {/* 1. Low Stock Products (lg:col-span-4) */}
                <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-sans font-bold text-sm text-stone-900">Low Stock Products</h3>
                      <button
                        onClick={() => setActiveTab('inventory')}
                        className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <span>→</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {lowStockList.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-7 h-7 rounded-lg object-cover bg-stone-50 shrink-0"
                            />
                            <span className="font-medium text-stone-800 truncate">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono font-bold text-stone-500">{item.stock}</span>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                item.status === 'Out of Stock'
                                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                  : 'bg-amber-50 text-amber-600 border border-amber-200'
                              }`}
                            >
                              {item.status}
                            </span>
                            <button
                              onClick={() => handleQuickRestock(item.id, 5)}
                              className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
                              title="Restock +5"
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. New Customers (lg:col-span-4) */}
                <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-sans font-bold text-sm text-stone-900">New Customers</h3>
                      <button
                        onClick={() => setActiveTab('customers')}
                        className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <span>→</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {customers.slice(0, 5).map((c) => (
                        <div key={c.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-7 h-7 rounded-full ${c.avatarColor || 'bg-purple-500'} text-white font-bold flex items-center justify-center text-[10px] shrink-0`}>
                              {c.initial || c.name.charAt(0)}
                            </div>
                            <span className="font-bold text-stone-800 truncate">{c.name}</span>
                          </div>
                          <span className="font-mono text-stone-500 text-[11px]">{c.phone}</span>
                          <span className="text-stone-400 font-mono text-[10px] shrink-0">{c.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Quick Actions (lg:col-span-4 - 6 cards) */}
                <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs">
                  <h3 className="font-sans font-bold text-sm text-stone-900 mb-4">Quick Actions</h3>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Add Product */}
                    <button
                      onClick={() => {
                        setEditingProduct({
                          id: `prod-${Date.now()}`,
                          name: '',
                          slug: '',
                          description: '',
                          price: 299,
                          comparePrice: 399,
                          stock: 20,
                          category: 'Customized Gifts',
                          occasions: ['Birthday'],
                          isCustomizable: true,
                          customizationType: 'photo_and_text',
                          images: ['/extracted/rose_teddy_bear.png'],
                          tags: ['New Arrival'],
                          status: 'active',
                          preparationHours: 12,
                          rating: 5.0,
                          reviewsCount: 1,
                        });
                        setIsAddingProduct(true);
                      }}
                      className="p-3 bg-amber-50/70 hover:bg-amber-100 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-amber-200/60"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                        <Package className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-800">Add Product</span>
                    </button>

                    {/* New Category */}
                    <button
                      onClick={() => setIsAddingCategory(true)}
                      className="p-3 bg-amber-50/70 hover:bg-amber-100 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-amber-200/60"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-800">New Category</span>
                    </button>

                    {/* Create Offer */}
                    <button
                      onClick={() => setIsAddingCoupon(true)}
                      className="p-3 bg-amber-50/70 hover:bg-amber-100 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-amber-200/60"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                        <Tag className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-800">Create Offer</span>
                    </button>

                    {/* Manage Banners */}
                    <button
                      onClick={() => setActiveTab('banners')}
                      className="p-3 bg-teal-50/60 hover:bg-teal-100 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-teal-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-800">Manage Banners</span>
                    </button>

                    {/* View Orders */}
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="p-3 bg-purple-50/60 hover:bg-purple-100 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-purple-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-800">View Orders</span>
                    </button>

                    {/* Store Settings */}
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="p-3 bg-amber-50/70 hover:bg-amber-100 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-amber-200/60"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                        <Settings className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-800">Store Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'orders' ? (
            /* ORDERS MANAGEMENT VIEW */
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Orders Management</h2>
                  <p className="text-xs text-stone-500">Track and manage customer deliveries in Gondia</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-stone-700 cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-stone-100 text-stone-400 font-semibold">
                      <th className="pb-3">Order #</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Address & Phone</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders
                      .filter((o) => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                      .map((o) => (
                        <tr key={o.id} className="hover:bg-stone-50/70">
                          <td className="py-3 font-mono font-bold text-amber-700">{o.orderNumber}</td>
                          <td className="py-3 font-bold text-stone-900">{o.customerName}</td>
                          <td className="py-3 text-stone-600">
                            <div>{o.deliveryAddress}, {o.city}</div>
                            <div className="font-mono text-stone-400">{o.customerPhone}</div>
                          </td>
                          <td className="py-3">
                            <span className="font-bold">{o.items.length} items</span>
                            <div className="text-[10px] text-stone-400">{o.items[0]?.product?.name}</div>
                          </td>
                          <td className="py-3 font-mono font-bold text-stone-900">₹{o.totalAmount}</td>
                          <td className="py-3">
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateStatus(o.id, e.target.value as OrderStatus)}
                              className="bg-stone-50 border border-stone-200 text-[11px] font-bold rounded-lg px-2 py-1 cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Ready">Ready</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 text-right space-x-1">
                            <button
                              onClick={() => setSlipOrder(o)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 cursor-pointer"
                              title="Print Packing Slip"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setSelectedOrder(o)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'products' ? (
            /* PRODUCTS CATALOG MANAGEMENT */
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Products Catalog ({products.length})</h2>
                  <p className="text-xs text-stone-500">Manage catalog pricing, stock, and descriptions</p>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now()}`,
                      name: '',
                      slug: '',
                      description: '',
                      price: 299,
                      comparePrice: 399,
                      stock: 20,
                      category: 'Customized Gifts',
                      occasions: ['Birthday'],
                      isCustomizable: true,
                      customizationType: 'photo_and_text',
                      images: ['/extracted/rose_teddy_bear.png'],
                      tags: ['New Arrival'],
                      status: 'active',
                      preparationHours: 12,
                      rating: 5.0,
                      reviewsCount: 1,
                    });
                    setIsAddingProduct(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-black shadow-xs shadow-amber-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="border border-stone-200 rounded-2xl p-3 flex flex-col justify-between">
                    <div>
                      <img
                        src={p.images[0] || '/extracted/rose_teddy_bear.png'}
                        alt={p.name}
                        className="w-full aspect-square object-cover rounded-xl mb-2.5 bg-stone-50"
                      />
                      <h4 className="font-bold text-xs text-stone-900 line-clamp-1">{p.name}</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">{p.category}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-amber-700 text-xs">₹{p.price}</span>
                        <span className="text-[10px] text-stone-400 block font-mono">Stock: {p.stock}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsAddingProduct(true);
                          }}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleQuickRestock(p.id, 5)}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 cursor-pointer font-bold text-xs"
                          title="Quick +5 Stock"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'customers' ? (
            /* CUSTOMERS CRM VIEW */
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Registered Customers ({customers.length})</h2>
                <p className="text-xs text-stone-500">Customer directory with Gondia delivery history</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-stone-100 text-stone-400 font-semibold">
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">City</th>
                      <th className="pb-3">Total Orders</th>
                      <th className="pb-3">Total Spent</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-stone-50/70">
                        <td className="py-3 flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${c.avatarColor} text-white font-bold flex items-center justify-center`}>
                            {c.initial}
                          </div>
                          <div>
                            <span className="font-bold text-stone-900 block">{c.name}</span>
                            <span className="text-[10px] text-stone-400">{c.email}</span>
                          </div>
                        </td>
                        <td className="py-3 font-mono">{c.phone}</td>
                        <td className="py-3">{c.city}</td>
                        <td className="py-3 font-mono font-bold">{c.totalOrders}</td>
                        <td className="py-3 font-mono font-bold text-amber-700">₹{c.totalSpent}</td>
                        <td className="py-3 text-right">
                          <a
                            href={`https://wa.me/91${c.phone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-[10px] hover:bg-emerald-100"
                          >
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            /* STORE SETTINGS VIEW */
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs max-w-2xl">
              <h2 className="text-xl font-bold text-stone-900 mb-1">Store & Hub Settings</h2>
              <p className="text-xs text-stone-500 mb-6">Configure store address, contact phones, and Gondia delivery charges</p>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Store Name</label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Store Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full border border-stone-200 rounded-xl p-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Primary Phone</label>
                    <input
                      type="text"
                      value={settings.phones[0]}
                      onChange={(e) => {
                        const newPhones = [...settings.phones];
                        newPhones[0] = e.target.value;
                        setSettings({ ...settings, phones: newPhones });
                      }}
                      className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Secondary Phone</label>
                    <input
                      type="text"
                      value={settings.phones[1] || ''}
                      onChange={(e) => {
                        const newPhones = [...settings.phones];
                        newPhones[1] = e.target.value;
                        setSettings({ ...settings, phones: newPhones });
                      }}
                      className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Standard Delivery Fee (₹)</label>
                    <input
                      type="number"
                      value={settings.deliveryFee}
                      onChange={(e) => setSettings({ ...settings, deliveryFee: Number(e.target.value) })}
                      className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Free Delivery Minimum (₹)</label>
                    <input
                      type="number"
                      value={settings.freeDeliveryThreshold}
                      onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                      className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl cursor-pointer shadow-md shadow-amber-200"
                >
                  Save Store Settings
                </button>
              </form>
            </div>
          ) : activeTab === 'banners' ? (
            /* HERO BANNERS & VIDEO SLIDER VIEW */
            <div className="space-y-6 text-left">
              {/* Header */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <ImageIcon className="w-4 h-4" />
                    </span>
                    <h2 className="text-xl font-bold text-stone-900">Hero Banners & Video Slider</h2>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Manage the top hero slider (images & 10-second promo videos) for mobile and desktop screens.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setEditingSlide(null);
                      setSlideForm({
                        type: 'video',
                        mediaUrl: '/videos/video_1.mp4',
                        mobileMediaUrl: '',
                        title: '',
                        subtitle: '',
                        kicker: '',
                        description: '',
                        ctaText: 'Shop Now',
                        ctaLink: '#catalog-section',
                        badge: '10s Video',
                        isActive: true,
                        order: heroSlides.length + 1,
                        showOverlay: false,
                      });
                      setIsAddingSlide(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black rounded-xl shadow-sm shadow-amber-200 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Slide / Video</span>
                  </button>
                </div>
              </div>

              {/* Sequence & Order Info Banner */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                    ⇅
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Slide Sequence & Order Management</h4>
                    <p className="text-stone-600 text-[11px] mt-0.5">
                      Slides play in the exact sequence shown below (#1 plays first, #2 plays second). Use the <strong>⬆ Move Up</strong> and <strong>⬇ Move Down</strong> buttons on any card to change which slide appears first!
                    </p>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-amber-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
                  Total {heroSlides.length} Slides ({heroSlides.filter(s => s.isActive).length} Active)
                </div>
              </div>

              {/* Active Slides Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`bg-white rounded-3xl border ${slide.isActive ? 'border-amber-300 shadow-sm ring-1 ring-amber-200' : 'border-stone-200 opacity-60'} overflow-hidden flex flex-col justify-between`}
                  >
                    {/* Media Preview Box */}
                    <div className="relative aspect-[16/9] bg-stone-900 overflow-hidden flex items-center justify-center">
                      {slide.type === 'video' ? (
                        <video
                          src={slide.mediaUrl}
                          muted
                          loop
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={slide.mediaUrl}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black text-stone-950 shadow-xs ${slide.type === 'video' ? 'bg-amber-400 flex items-center gap-1' : 'bg-yellow-400'}`}>
                          {slide.type === 'video' && <Video className="w-3 h-3" />}
                          {slide.type.toUpperCase()} SLIDE #{idx + 1}
                        </span>

                        {slide.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-stone-800 shadow-xs">
                            {slide.badge}
                          </span>
                        )}
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${slide.isActive ? 'bg-emerald-500 text-white' : 'bg-stone-500 text-white'}`}>
                          {slide.isActive ? '● Active' : '○ Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div>
                        {slide.kicker && (
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-0.5">
                            {slide.kicker}
                          </span>
                        )}
                        <h4 className="text-base font-bold text-stone-900 leading-tight">
                          {slide.title} <span className="text-stone-500 text-sm font-normal">({slide.subtitle})</span>
                        </h4>
                        {slide.description && (
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2">{slide.description}</p>
                        )}
                      </div>

                      <div className="p-2.5 rounded-xl bg-stone-50 text-[11px] font-mono text-stone-600 space-y-1">
                        <div className="truncate"><strong className="text-stone-700">Media:</strong> {slide.mediaUrl}</div>
                        <div><strong className="text-stone-700">Button:</strong> "{slide.ctaText}" → {slide.ctaLink}</div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        {/* Reorder Buttons (Move Up / Down) */}
                        <div className="flex items-center gap-1 bg-stone-100 rounded-xl p-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              storeService.moveHeroSlide(slide.id, 'up');
                              setHeroSlides(storeService.getHeroSlides());
                              showToast(`Moved "${slide.title}" to position #${idx}`);
                            }}
                            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                              idx === 0
                                ? 'text-stone-300 cursor-not-allowed'
                                : 'text-stone-700 hover:bg-white hover:text-stone-900 cursor-pointer shadow-2xs'
                            }`}
                            title="Move Slide Up (Play Earlier)"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          <span className="text-[11px] font-bold px-1.5 font-mono text-stone-700">
                            #{idx + 1}
                          </span>

                          <button
                            type="button"
                            disabled={idx === heroSlides.length - 1}
                            onClick={() => {
                              storeService.moveHeroSlide(slide.id, 'down');
                              setHeroSlides(storeService.getHeroSlides());
                              showToast(`Moved "${slide.title}" to position #${idx + 2}`);
                            }}
                            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                              idx === heroSlides.length - 1
                                ? 'text-stone-300 cursor-not-allowed'
                                : 'text-stone-700 hover:bg-white hover:text-stone-900 cursor-pointer shadow-2xs'
                            }`}
                            title="Move Slide Down (Play Later)"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Enable/Disable Toggle */}
                        <button
                          onClick={() => handleToggleSlideActive(slide.id, slide.isActive)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                            slide.isActive
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {slide.isActive ? 'Disable' : 'Enable'}
                        </button>

                        {/* Edit & Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingSlide(slide);
                              setSlideForm({
                                type: slide.type,
                                mediaUrl: slide.mediaUrl,
                                mobileMediaUrl: slide.mobileMediaUrl || '',
                                title: slide.title,
                                subtitle: slide.subtitle,
                                kicker: slide.kicker || '',
                                description: slide.description || '',
                                ctaText: slide.ctaText,
                                ctaLink: slide.ctaLink,
                                badge: slide.badge || '',
                                isActive: slide.isActive,
                                order: slide.order || idx + 1,
                                showOverlay: slide.showOverlay !== undefined ? slide.showOverlay : slide.type !== 'video',
                              });
                              setIsAddingSlide(true);
                            }}
                            className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
                            title="Edit Slide"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteSlide(slide.id)}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* DEFAULT / FALLBACK SUBVIEWS (Inventory, Categories, Coupons, etc.) */
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs text-left">
              <h2 className="text-xl font-bold text-stone-900 capitalize mb-2">{activeTab.replace('_', ' ')}</h2>
              <p className="text-xs text-stone-500 mb-6">Fully dynamic configuration panel for {activeTab}</p>

              {activeTab === 'coupons' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">Active Coupons</span>
                    <button
                      onClick={() => setIsAddingCoupon(true)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-black shadow-xs shadow-amber-200"
                    >
                      + Add Coupon
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {coupons.map((c) => (
                      <div key={c.id} className="border border-stone-200 p-3 rounded-2xl bg-amber-50/40">
                        <span className="font-mono font-extrabold text-sm text-amber-800">{c.code}</span>
                        <p className="text-xs text-stone-600 mt-1">{c.discountPercent}% Discount on min ₹{c.minOrder}</p>
                        <span className="text-[10px] text-stone-400 block mt-2">Used {c.usedCount} times</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-3 border border-stone-100 rounded-2xl bg-stone-50/50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900">{r.customerName}</span>
                        <span className="text-amber-500 text-xs">{'★'.repeat(r.rating)}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">"{r.comment}"</p>
                      <span className="text-[10px] text-stone-400 block mt-1">Product: {r.productName} · {r.date}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-3">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-stone-100 text-stone-400">
                        <th className="pb-2">Product</th>
                        <th className="pb-2">Category</th>
                        <th className="pb-2">Stock Level</th>
                        <th className="pb-2 text-right">Quick Restock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td className="py-2.5 font-bold">{p.name}</td>
                          <td className="py-2.5 text-stone-500">{p.category}</td>
                          <td className="py-2.5 font-mono font-bold">{p.stock} units</td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleQuickRestock(p.id, 10)}
                              className="px-2 py-1 bg-amber-50 text-amber-800 rounded font-bold hover:bg-amber-100 border border-amber-200"
                            >
                              +10 Units
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* PACKING SLIP MODAL */}
      <PackingSlipModal
        order={slipOrder}
        settings={settings}
        onClose={() => setSlipOrder(null)}
      />

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-stone-900">Order #{selectedOrder.orderNumber}</h3>
                <span className="text-xs text-stone-500">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-lg hover:bg-stone-100">
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
              <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}, {selectedOrder.city} - {selectedOrder.pincode}</p>
              <p><strong>Payment:</strong> {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus})</p>
            </div>

            <div className="border-t border-stone-100 pt-3">
              <h4 className="font-bold text-xs mb-2">Order Items ({selectedOrder.items.length})</h4>
              <div className="space-y-2">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 bg-stone-50 rounded-xl">
                    <span>{it.product?.name} (x{it.quantity})</span>
                    <span className="font-mono font-bold">₹{it.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
              <span className="font-bold text-sm">Total Amount:</span>
              <span className="font-mono font-extrabold text-base text-amber-700">₹{selectedOrder.totalAmount}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setSlipOrder(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="flex-1 py-2 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs hover:bg-stone-200"
              >
                Print Slip
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-600 shadow-md shadow-amber-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT PRODUCT MODAL */}
      {isAddingProduct && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-base text-stone-900">
                {editingProduct.name ? `Edit "${editingProduct.name}"` : 'Add New Product'}
              </h3>
              <button onClick={() => setIsAddingProduct(false)} className="p-1 rounded-lg hover:bg-stone-100">
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Personalized Photo Mug"
                  required
                  className="w-full border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Category</label>
                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Compare Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.comparePrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, comparePrice: Number(e.target.value) })}
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.images[0] || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                  className="w-full border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 text-stone-950 font-black rounded-xl hover:bg-amber-600 shadow-md shadow-amber-200"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="py-2.5 px-4 bg-stone-100 text-stone-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE OFFER / COUPON MODAL */}
      {isAddingCoupon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="font-bold text-sm text-stone-900">Create New Offer / Coupon</h3>
              <button onClick={() => setIsAddingCoupon(false)}>
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. FESTIVE20"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-2.5 uppercase font-mono font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl shadow-md shadow-amber-200"
                >
                  Create Offer
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCoupon(false)}
                  className="px-3 py-2 bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT HERO SLIDE MODAL */}
      {isAddingSlide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Film className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-base text-stone-900">
                  {editingSlide ? 'Edit Hero Slide / Video' : 'Add New Hero Slide / Video'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddingSlide(false);
                  setEditingSlide(null);
                }}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-3.5 text-xs">
              {/* Slide Type Selection */}
              <div>
                <label className="font-bold block mb-1.5 text-stone-700">Slide Media Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSlideForm({ ...slideForm, type: 'video' })}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                      slideForm.type === 'video'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/20'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>🎥 Video Slide</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlideForm({ ...slideForm, type: 'image' })}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                      slideForm.type === 'image'
                        ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/20'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>🖼️ Image Banner</span>
                  </button>
                </div>
              </div>

              {/* File Upload Dropzone & Media URL */}
              <div className="space-y-2">
                <label className="font-bold text-stone-700 block">
                  {slideForm.type === 'video' ? 'Upload Video File / Media Path' : 'Upload Banner Image / Media Path'}
                </label>

                {/* Direct File Picker / Drag & Drop */}
                <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-4 bg-amber-50/50 text-center transition-all cursor-pointer relative group">
                  <input
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white shadow-xs text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xs text-stone-800">
                      Click to Choose Video or Image from Device
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Supports MP4, WebM, MOV, JPG, PNG (Auto-loads into slide preview)
                    </span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-stone-500">Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => setSlideForm({ ...slideForm, mediaUrl: '/videos/video_1.mp4', type: 'video', showOverlay: false })}
                    className="text-[11px] bg-amber-100 hover:bg-amber-200 text-amber-800 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>video 1.mp4</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlideForm({ ...slideForm, mediaUrl: '/videos/video_2.mp4', type: 'video', showOverlay: false })}
                    className="text-[11px] bg-yellow-100 hover:bg-yellow-200 text-yellow-900 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>video 2.mp4</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlideForm({ ...slideForm, mediaUrl: '/hero_banner_clean.png', mobileMediaUrl: '/hero_banner_mobile.png', type: 'image', showOverlay: true })}
                    className="text-[11px] bg-amber-100 hover:bg-amber-200 text-amber-900 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Flagship Banner</span>
                  </button>
                </div>

                {/* Custom URL or Path Input */}
                <div className="pt-1">
                  <label className="text-[11px] text-stone-500 block mb-0.5">Or enter File URL / Path directly:</label>
                  <input
                    type="text"
                    value={slideForm.mediaUrl}
                    onChange={(e) => setSlideForm({ ...slideForm, mediaUrl: e.target.value })}
                    placeholder={slideForm.type === 'video' ? '/videos/video_1.mp4' : '/hero_banner_clean.png'}
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono text-xs"
                    required
                  />
                </div>

                {/* Live Preview Inside Modal */}
                {slideForm.mediaUrl && (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black mt-2 border border-stone-200">
                    {slideForm.type === 'video' ? (
                      <video
                        src={slideForm.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={slideForm.mediaUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs font-mono">
                      Live Preview: {slideForm.type.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Order Sequence and Mobile URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Display Sequence (1 = Plays First, 2 = Plays Second...)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={slideForm.order || 1}
                    onChange={(e) => setSlideForm({ ...slideForm, order: Number(e.target.value) })}
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono text-xs"
                  />
                </div>

                {slideForm.type === 'image' ? (
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Mobile Image URL (Optional)</label>
                    <input
                      type="text"
                      value={slideForm.mobileMediaUrl || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, mobileMediaUrl: e.target.value })}
                      placeholder="/hero_banner_mobile.png"
                      className="w-full border border-stone-200 rounded-xl p-2.5 font-mono text-xs"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={slideForm.badge || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, badge: e.target.value })}
                      placeholder="e.g. Featured Video"
                      className="w-full border border-stone-200 rounded-xl p-2.5"
                    />
                  </div>
                )}
              </div>

              {/* Clean Video Mode Toggle (Only for Video Slides) */}
              {slideForm.type === 'video' && (
                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-stone-900 block text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Clean Video Mode (No Clutter on Video)</span>
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      {!slideForm.showOverlay
                        ? '✅ Clean Mode Active: Video plays pure without dark gradient or text boxes covering products.'
                        : '⚠️ Custom text titles and dark gradient overlays are currently active.'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSlideForm({ ...slideForm, showOverlay: !slideForm.showOverlay })}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer shrink-0 ${
                      !slideForm.showOverlay
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                    }`}
                  >
                    {!slideForm.showOverlay ? '✓ Clean Mode ON' : 'Turn Clean Mode ON'}
                  </button>
                </div>
              )}

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Slide Title {slideForm.type === 'video' ? '(Optional in Clean Mode)' : ''}
                  </label>
                  <input
                    type="text"
                    value={slideForm.title}
                    onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                    placeholder={slideForm.type === 'video' ? 'Optional (e.g. Handcrafted Magic)' : 'e.g. Personalized Gifts'}
                    className="w-full border border-stone-200 rounded-xl p-2.5"
                    required={slideForm.type !== 'video'}
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={slideForm.subtitle}
                    onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                    placeholder="e.g. for Your Loved Ones"
                    className="w-full border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Kicker Pill & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Kicker Label (Optional Pill)</label>
                  <input
                    type="text"
                    value={slideForm.kicker || ''}
                    onChange={(e) => setSlideForm({ ...slideForm, kicker: e.target.value })}
                    placeholder="e.g. ✨ 10S VIDEO UNBOXING ✨"
                    className="w-full border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={slideForm.badge || ''}
                    onChange={(e) => setSlideForm({ ...slideForm, badge: e.target.value })}
                    placeholder="e.g. Featured Video"
                    className="w-full border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">Description (Optional)</label>
                <textarea
                  value={slideForm.description || ''}
                  onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })}
                  placeholder="Short description displayed on video slide overlay..."
                  rows={2}
                  className="w-full border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              {/* CTA Button Text & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={slideForm.ctaText}
                    onChange={(e) => setSlideForm({ ...slideForm, ctaText: e.target.value })}
                    placeholder="Shop Now"
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">CTA Button Link</label>
                  <input
                    type="text"
                    value={slideForm.ctaLink}
                    onChange={(e) => setSlideForm({ ...slideForm, ctaLink: e.target.value })}
                    placeholder="#catalog-section or WhatsApp URL"
                    className="w-full border border-stone-200 rounded-xl p-2.5 font-mono text-xs"
                    required
                  />
                </div>
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="slideActiveCheck"
                  checked={slideForm.isActive}
                  onChange={(e) => setSlideForm({ ...slideForm, isActive: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="slideActiveCheck" className="font-bold text-stone-800 cursor-pointer">
                  Activate this slide immediately in hero carousel
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex gap-3 border-t border-stone-100">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black rounded-xl shadow-xs shadow-amber-200 transition-colors cursor-pointer"
                >
                  {editingSlide ? 'Update Slide' : 'Add to Hero Slider'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingSlide(false);
                    setEditingSlide(null);
                  }}
                  className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
