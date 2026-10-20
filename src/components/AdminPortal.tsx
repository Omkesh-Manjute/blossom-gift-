import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Layers,
  Settings,
  AlertTriangle,
  AlertCircle,
  Bell,
  Search,
  Plus,
  Download,
  Printer,
  Eye,
  Edit,
  Trash2,
  Save,
  Phone,
  MapPin,
  Image as ImageIcon,
  Check,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  MessageSquare,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Filter,
  DollarSign,
  Gift,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Menu,
  Grid,
  List,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { Order, OrderStatus, Product, ProductVariant, StoreSettings } from '../types';
import { PackingSlipModal } from './PackingSlipModal';

interface AdminPortalProps {
  onBackToStore?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'customers' | 'analytics' | 'settings'>('dashboard');
  const [orders, setOrders] = useState<Order[]>(() => storeService.getOrders());
  const [products, setProducts] = useState<Product[]>(() => storeService.getProducts());
  const [settings, setSettings] = useState<StoreSettings>(() => storeService.getSettings());

  // Global search & filters
  const [globalSearch, setGlobalSearch] = useState('');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'7d' | '30d' | '1y'>('30d');
  const [chartMetric, setChartMetric] = useState<'revenue' | 'orders'>('revenue');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<{ label: string; revenue: number; orders: number } | null>(null);

  // Order filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week'>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Confirmed');
  const [statusNote, setStatusNote] = useState<string>('');

  // Modals & Notifications
  const [slipOrder, setSlipOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [restockToast, setRestockToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Inventory Management states
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'low' | 'oos' | 'custom'>('all');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productViewMode, setProductViewMode] = useState<'table' | 'grid'>('table');

  // Product Variant Management state for Add/Edit Modal
  const [newVariantName, setNewVariantName] = useState('Color');
  const [newVariantValue, setNewVariantValue] = useState('');
  const [newVariantDelta, setNewVariantDelta] = useState<number>(0);

  const refreshData = () => {
    setOrders(storeService.getOrders());
    setProducts(storeService.getProducts());
    setSettings(storeService.getSettings());
  };

  // KPI Metrics Calculation
  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter(
      (o) => o.status === 'Order Placed' || o.status === 'Confirmed' || o.status === 'Preparing / Customized'
    ).length;
  }, [orders]);

  const deliveredOrders = useMemo(() => {
    return orders.filter((o) => o.status === 'Delivered / Completed').length;
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock <= 5);
  }, [products]);

  const averageOrderValue = useMemo(() => {
    const validOrders = orders.filter((o) => o.status !== 'Cancelled');
    return validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
  }, [orders, totalRevenue]);

  // Inventory Specific Metrics & Counts
  const totalStockUnits = useMemo(() => {
    return products.reduce((sum, p) => sum + p.stock, 0);
  }, [products]);

  const totalInventoryValuation = useMemo(() => {
    return products.reduce((sum, p) => sum + p.price * p.stock, 0);
  }, [products]);

  const toysCount = useMemo(() => {
    return products.filter((p) => p.category === 'Toys/RC Cars').length;
  }, [products]);

  const watchesCount = useMemo(() => {
    return products.filter((p) => p.category === 'Wall Watches').length;
  }, [products]);

  const decorCount = useMemo(() => {
    return products.filter((p) => p.category === 'Decorative Items').length;
  }, [products]);

  // Filtered products for Inventory tab
  const filteredCatalogProducts = useMemo(() => {
    return products.filter((p) => {
      if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) {
        return false;
      }
      if (productStockFilter === 'low' && p.stock > 5) return false;
      if (productStockFilter === 'oos' && p.stock > 0) return false;
      if (productStockFilter === 'custom' && !p.isCustomizable) return false;
      if (productSearchQuery.trim()) {
        const q = productSearchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchTag) return false;
      }
      return true;
    });
  }, [products, productCategoryFilter, productStockFilter, productSearchQuery]);

  // Unique Customers Extraction
  const customersList = useMemo(() => {
    const map = new Map<string, {
      name: string;
      phone: string;
      email?: string;
      address: string;
      city: string;
      orderCount: number;
      totalSpent: number;
      lastOrderDate: string;
    }>();

    for (const o of orders) {
      const existing = map.get(o.customerPhone);
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += o.status !== 'Cancelled' ? o.totalAmount : 0;
        if (new Date(o.createdAt) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = o.createdAt;
        }
      } else {
        map.set(o.customerPhone, {
          name: o.customerName,
          phone: o.customerPhone,
          email: o.customerEmail,
          address: o.deliveryAddress,
          city: o.city,
          orderCount: 1,
          totalSpent: o.status !== 'Cancelled' ? o.totalAmount : 0,
          lastOrderDate: o.createdAt,
        });
      }
    }
    return Array.from(map.values());
  }, [orders]);

  // Top Selling Products ranked by mock / real sales
  const topSellingProducts = useMemo(() => {
    return products
      .map((p, idx) => ({
        ...p,
        unitsSold: 45 + (12 - idx) * 11,
        totalRevenue: (45 + (12 - idx) * 11) * p.price,
      }))
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 5);
  }, [products]);

  // Dynamic Chart Data based on selected timeframe
  const chartData = useMemo(() => {
    if (analyticsTimeframe === '7d') {
      return [
        { label: 'Mon', revenue: 3850, orders: 8 },
        { label: 'Tue', revenue: 4920, orders: 11 },
        { label: 'Wed', revenue: 4100, orders: 9 },
        { label: 'Thu', revenue: 6450, orders: 14 },
        { label: 'Fri', revenue: 7890, orders: 18 },
        { label: 'Sat', revenue: 9850, orders: 22 },
        { label: 'Sun', revenue: 8640, orders: 19 },
      ];
    }
    if (analyticsTimeframe === '30d') {
      return [
        { label: 'Week 1', revenue: 14200, orders: 32 },
        { label: 'Week 2', revenue: 19800, orders: 44 },
        { label: 'Week 3', revenue: 24500, orders: 56 },
        { label: 'Week 4', revenue: 28900, orders: 65 },
      ];
    }
    return [
      { label: 'Jan', revenue: 28000, orders: 62 },
      { label: 'Feb', revenue: 34000, orders: 75 },
      { label: 'Mar', revenue: 41000, orders: 89 },
      { label: 'Apr', revenue: 38000, orders: 81 },
      { label: 'May', revenue: 49000, orders: 104 },
      { label: 'Jun', revenue: 52000, orders: 112 },
    ];
  }, [analyticsTimeframe]);

  // Handlers
  const handleQuickStock = (productId: string, delta: number) => {
    const p = products.find((prod) => prod.id === productId);
    if (p) {
      p.stock = Math.max(0, p.stock + delta);
      storeService.saveProduct(p);
      refreshData();
      setRestockToast(`Stock for "${p.name}" updated to ${p.stock} units!`);
      setTimeout(() => setRestockToast(null), 3000);
    }
  };

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    storeService.updateOrderStatus(selectedOrder.id, newStatus, statusNote.trim() || undefined);
    setStatusNote('');
    refreshData();
    const updated = storeService.getOrders().find((o) => o.id === selectedOrder.id);
    setSelectedOrder(updated || null);
    setRestockToast(`Order #${selectedOrder.orderNumber} status changed to ${newStatus}`);
    setTimeout(() => setRestockToast(null), 3000);
  };

  const handleQuickRowStatus = (orderId: string, status: OrderStatus) => {
    storeService.updateOrderStatus(orderId, status, `Quick updated to ${status}`);
    refreshData();
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    storeService.saveProduct(editingProduct);
    setEditingProduct(null);
    setIsAddingProduct(false);
    refreshData();
    setRestockToast(`Product "${editingProduct.name}" saved successfully!`);
    setTimeout(() => setRestockToast(null), 3000);
  };

  const handleAddVariant = () => {
    if (!editingProduct || !newVariantValue.trim()) return;
    const variantItem: ProductVariant = {
      id: `var-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newVariantName.trim() || 'Option',
      value: newVariantValue.trim(),
      priceDelta: Number(newVariantDelta) || 0,
    };
    const currentVariants = editingProduct.variants || [];
    setEditingProduct({
      ...editingProduct,
      variants: [...currentVariants, variantItem],
    });
    setNewVariantValue('');
    setNewVariantDelta(0);
  };

  const handleRemoveVariant = (variantId: string) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      variants: (editingProduct.variants || []).filter((v) => v.id !== variantId),
    });
  };

  const handleApplyPresetVariants = (type: 'wall_watches' | 'rc_cars') => {
    if (!editingProduct) return;
    if (type === 'wall_watches') {
      const presets: ProductVariant[] = [
        { id: `ww-c1-${Date.now()}`, name: 'Color', value: 'Natural Walnut', priceDelta: 0 },
        { id: `ww-c2-${Date.now()}`, name: 'Color', value: 'Antique Champagne Brass', priceDelta: 80 },
        { id: `ww-c3-${Date.now()}`, name: 'Color', value: 'Matte Midnight Black', priceDelta: 50 },
        { id: `ww-s1-${Date.now()}`, name: 'Size', value: '12-Inch Standard', priceDelta: 0 },
        { id: `ww-s2-${Date.now()}`, name: 'Size', value: '16-Inch Grand Salon', priceDelta: 280 },
      ];
      setEditingProduct({
        ...editingProduct,
        variants: [...(editingProduct.variants || []), ...presets],
      });
    } else if (type === 'rc_cars') {
      const presets: ProductVariant[] = [
        { id: `rc-y1-${Date.now()}`, name: 'Model Year', value: '2024 Street Edition', priceDelta: 0 },
        { id: `rc-y2-${Date.now()}`, name: 'Model Year', value: '2025 High-Torque Pro Spec', priceDelta: 250 },
        { id: `rc-c1-${Date.now()}`, name: 'Color', value: 'Neon Cyber Cyan', priceDelta: 0 },
        { id: `rc-c2-${Date.now()}`, name: 'Color', value: 'Inferno Flame Red', priceDelta: 50 },
        { id: `rc-c3-${Date.now()}`, name: 'Color', value: 'Stealth Carbon Black', priceDelta: 70 },
      ];
      setEditingProduct({
        ...editingProduct,
        variants: [...(editingProduct.variants || []), ...presets],
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      storeService.deleteProduct(id);
      refreshData();
      setRestockToast('Product deleted from catalog');
      setTimeout(() => setRestockToast(null), 3000);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storeService.saveSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const exportOrdersCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Name', 'Phone', 'Address', 'Status', 'Total (INR)', 'Payment Mode'];
    const rows = orders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.deliveryAddress}, ${o.city}"`,
      o.status,
      o.totalAmount,
      o.paymentMethod,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `blossom_gift_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered orders for tab
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const query = (globalSearch || orderSearch).toLowerCase();
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(query) ||
        o.customerName.toLowerCase().includes(query) ||
        o.customerPhone.includes(query) ||
        o.deliveryAddress.toLowerCase().includes(query);

      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = new Date(o.createdAt).toDateString() === new Date().toDateString();
      } else if (dateFilter === 'week') {
        const sevenDaysAgo = Date.now() - 7 * 86400000;
        matchesDate = new Date(o.createdAt).getTime() >= sevenDaysAgo;
      }
      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [orders, statusFilter, globalSearch, orderSearch, dateFilter]);

  // Notifications List
  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      time: '12m ago',
      desc: 'Order #BG-1085 from Ananya Patel (Gondia)',
      icon: ShoppingBag,
      color: 'text-rose-500 bg-rose-50',
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      time: '1h ago',
      desc: 'Magic Coffee Mug has only 4 units remaining in hub',
      icon: AlertTriangle,
      color: 'text-amber-500 bg-amber-50',
    },
    {
      id: 3,
      title: 'COD Delivery Completed',
      time: '3h ago',
      desc: 'Order #BG-1082 delivered to Rail Toly, Gondia. ₹599 collected.',
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-50',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F2] flex flex-col lg:flex-row text-left font-sans text-stone-800 antialiased">
      {/* Toast Notification */}
      {restockToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#292525] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce border border-rose-500/30">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>{restockToast}</span>
        </div>
      )}

      {/* MOBILE HEADER BAR */}
      <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif font-bold text-stone-900 text-sm">Blossom Gift</div>
            <div className="text-[10px] text-rose-500 font-semibold tracking-wider uppercase">Admin Portal</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onBackToStore && (
            <button
              onClick={onBackToStore}
              className="text-xs px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium flex items-center gap-1 cursor-pointer"
            >
              <ExternalLink className="w-3 h-3 text-stone-500" />
              <span>Store</span>
            </button>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 rounded-lg bg-stone-50 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* LEFT NAVIGATION SIDEBAR (Modern Shopify Polaris Style) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111317] text-stone-300 border-r border-[#22262E] shadow-xl flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo & Store Switcher Header */}
          <div className="p-4 border-b border-[#22262E]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 ring-1 ring-white/20 transform transition-transform hover:scale-105">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-white text-base leading-tight tracking-tight flex items-center gap-1.5">
                    <span>Blossom Gift</span>
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 tracking-wider">
                      Online Store · Gondia
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Store Link */}
            {onBackToStore && (
              <button
                onClick={onBackToStore}
                className="mt-3 w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer border border-white/5"
              >
                <span className="flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                  <span>View Customer Shop</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">↗</span>
              </button>
            )}
          </div>

          {/* Navigation Sections */}
          <div className="p-3 space-y-4">
            {/* Group 1: Store Commerce */}
            <div>
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Core Commerce
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-white/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-stone-400'}`} />
                    <span>Dashboard</span>
                  </div>
                  {activeTab === 'dashboard' && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('orders');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-white/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className={`w-4 h-4 ${activeTab === 'orders' ? 'text-white' : 'text-stone-400'}`} />
                    <span>Orders & Dispatch</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {pendingOrders > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" title="Pending orders" />
                    )}
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                        activeTab === 'orders' ? 'bg-white/25 text-white' : 'bg-[#22262E] text-stone-300'
                      }`}
                    >
                      {orders.length}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('products');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'products'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-white/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Layers className={`w-4 h-4 ${activeTab === 'products' ? 'text-white' : 'text-stone-400'}`} />
                    <span>Inventory & Catalog</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {lowStockProducts.length > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                        {lowStockProducts.length} low
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                        activeTab === 'products' ? 'bg-white/25 text-white' : 'bg-[#22262E] text-stone-300'
                      }`}
                    >
                      {products.length}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('customers');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'customers'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-white/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className={`w-4 h-4 ${activeTab === 'customers' ? 'text-white' : 'text-stone-400'}`} />
                    <span>Customers (CRM)</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                      activeTab === 'customers' ? 'bg-white/25 text-white' : 'bg-[#22262E] text-stone-300'
                    }`}
                  >
                    {customersList.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Group 2: Performance & Channels */}
            <div>
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Insights & Reports
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('analytics');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'analytics'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-white/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className={`w-4 h-4 ${activeTab === 'analytics' ? 'text-white' : 'text-stone-400'}`} />
                    <span>Analytics & Trends</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Group 3: Configuration */}
            <div>
              <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Configuration
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 ring-1 ring-white/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-stone-400'}`} />
                    <span>Store Settings & COD</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer (Hub & Storefront Quick Access) */}
        <div className="p-4 border-t border-[#22262E] space-y-3 bg-[#111317]">
          <div className="bg-[#181B20] p-3 rounded-xl border border-[#262A32]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-200">Gondia Central Hub</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">Gupta Complex, Near N.M.D. College</p>
          </div>

          {onBackToStore && (
            <button
              onClick={onBackToStore}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-rose-500/20 cursor-pointer group"
            >
              <ExternalLink className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
              <span>Back to Storefront</span>
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders, gifts, customers, status..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Tools & Admin Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Export CSV */}
            <button
              onClick={exportOrdersCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Download Orders CSV"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Export CSV</span>
            </button>

            {/* + Add Product Quick Button */}
            <button
              onClick={() => {
                setEditingProduct({
                  id: `prod-${Date.now()}`,
                  name: '',
                  slug: '',
                  description: '',
                  price: 349,
                  stock: 20,
                  category: 'Personalized Gifts',
                  occasions: ['Birthday', 'Anniversary'],
                  isCustomizable: true,
                  customizationType: 'photo_and_text',
                  images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80'],
                  tags: ['Bestseller'],
                  status: 'active',
                  preparationHours: 24,
                  rating: 5.0,
                  reviewsCount: 1,
                });
                setIsAddingProduct(true);
              }}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 rounded-xl text-xs font-semibold shadow-md shadow-rose-500/20 transition-all cursor-pointer transform hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Add New Gift</span>
              <span className="sm:hidden">Add</span>
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-stone-600 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              </button>

              {showNotifications && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 z-50 text-xs animate-in fade-in slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                    <span className="font-bold text-stone-900">Notifications & Alerts</span>
                    <span className="text-[10px] text-rose-500 font-semibold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div key={n.id} className="p-2 rounded-xl hover:bg-stone-50 flex items-start gap-2.5 transition-colors">
                          <div className={`p-1.5 rounded-lg ${n.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-stone-900">{n.title}</span>
                              <span className="text-[10px] text-stone-400">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">{n.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-rose-400 font-bold text-xs flex items-center justify-center border border-stone-300 shadow-xs">
                BG
              </div>
              <div className="hidden xl:block">
                <div className="text-xs font-bold text-stone-900 leading-tight">Gondia Admin</div>
                <div className="text-[10px] text-stone-400">Store Manager</div>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CONTAINER */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* TAB 1: DASHBOARD VIEW (Identical to reference image) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* TOP KPI CARDS (High-End Animated Stats with Sparklines & Category Breakdown) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Total Gross Revenue */}
                <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Gross Revenue
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25 group-hover:scale-110 transition-transform">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                      ₹{totalRevenue.toLocaleString()}
                    </h3>
                  </div>

                  {/* Mini SVG Sparkline */}
                  <div className="h-6 w-full my-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <path
                        d="M 0 18 Q 20 8, 40 14 T 70 6 T 100 2"
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+18.4%</span>
                    </div>
                    <span className="text-stone-400 text-[11px]">AOV ₹{averageOrderValue}</span>
                  </div>
                </div>

                {/* 2. Total Orders & Fulfillment */}
                <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Orders Pipeline
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-500/25 group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                      {orders.length}
                    </h3>
                    <span className="text-xs text-stone-400 font-medium">orders</span>
                  </div>

                  {/* Segmented Fulfillment Bar */}
                  <div className="my-2.5">
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${Math.round((deliveredOrders / Math.max(1, orders.length)) * 100)}%` }}
                        title={`${deliveredOrders} Delivered`}
                      />
                      <div
                        className="bg-amber-500 h-full transition-all duration-500"
                        style={{ width: `${Math.round((pendingOrders / Math.max(1, orders.length)) * 100)}%` }}
                        title={`${pendingOrders} In Preparation`}
                      />
                      <div
                        className="bg-rose-400 h-full transition-all duration-500"
                        style={{ width: `${Math.round((orders.filter(o => o.status === 'Order Placed').length / Math.max(1, orders.length)) * 100)}%` }}
                        title="New Placed"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{deliveredOrders} Done</span>
                    </div>
                    <span className="text-amber-600 font-semibold text-[11px]">{pendingOrders} In Prep</span>
                  </div>
                </div>

                {/* 3. Inventory & Category Health (Featuring Toys/RC Cars, Wall Watches, Decorative Items) */}
                <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Catalog & SKUs
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-110 transition-transform">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                      {products.length}
                    </h3>
                    <span className="text-xs text-stone-400 font-medium">SKUs ({totalStockUnits} units)</span>
                  </div>

                  {/* Micro Category Pills */}
                  <div className="flex items-center gap-1 my-2 overflow-x-auto scrollbar-none">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 whitespace-nowrap">
                      Toys ({toysCount})
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 whitespace-nowrap">
                      Watches ({watchesCount})
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 whitespace-nowrap">
                      Decor ({decorCount})
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    {lowStockProducts.length > 0 ? (
                      <span className="text-amber-600 font-bold text-[11px] flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{lowStockProducts.length} low stock</span>
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Stock healthy</span>
                      </span>
                    )}
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-blue-600 hover:text-blue-800 font-bold text-[11px] cursor-pointer hover:underline"
                    >
                      Manage →
                    </button>
                  </div>
                </div>

                {/* 4. Customer Base & Retention */}
                <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Customers (CRM)
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                      {customersList.length}
                    </h3>
                    <span className="text-xs text-stone-400 font-medium">Gondia buyers</span>
                  </div>

                  {/* Mini Sparkline for Customers */}
                  <div className="h-6 w-full my-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <path
                        d="M 0 20 Q 25 16, 50 12 T 80 8 T 100 4"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>38.5% repeat</span>
                    </div>
                    <span className="text-stone-400 text-[11px]">100% Doorstep COD</span>
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: PERFORMANCE CHART & SALES BY CATEGORY */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Dynamic SVG Sales & Performance Chart (8 cols) */}
                <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                      <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                        Sales & Performance Overview
                      </h3>
                      <p className="text-xs text-stone-500">
                        Interactive revenue and volume metrics across Gondia hub.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Metric Toggle */}
                      <div className="flex p-0.5 bg-stone-100 rounded-lg text-xs font-semibold">
                        <button
                          onClick={() => setChartMetric('revenue')}
                          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                            chartMetric === 'revenue' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                          }`}
                        >
                          Revenue (₹)
                        </button>
                        <button
                          onClick={() => setChartMetric('orders')}
                          className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                            chartMetric === 'orders' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                          }`}
                        >
                          Orders
                        </button>
                      </div>

                      {/* Timeframe Selector */}
                      <div className="flex p-0.5 bg-stone-100 rounded-lg text-xs font-semibold">
                        {(['7d', '30d', '1y'] as const).map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setAnalyticsTimeframe(tf)}
                            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer uppercase text-[11px] ${
                              analyticsTimeframe === tf ? 'bg-[#292525] text-white shadow-xs' : 'text-stone-500 hover:text-stone-900'
                            }`}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dynamic SVG Area Chart with Tooltips */}
                  <div className="relative h-64 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#F1EFE9" strokeDasharray="3 3" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="#F1EFE9" strokeDasharray="3 3" />
                      <line x1="0" y1="140" x2="500" y2="140" stroke="#F1EFE9" strokeDasharray="3 3" />
                      <line x1="0" y1="180" x2="500" y2="180" stroke="#E5E0D8" strokeWidth="1" />

                      {/* Path computation */}
                      {(() => {
                        const maxVal = Math.max(...chartData.map((d) => (chartMetric === 'revenue' ? d.revenue : d.orders)));
                        const points = chartData.map((d, i) => {
                          const x = (i / (chartData.length - 1)) * 500;
                          const val = chartMetric === 'revenue' ? d.revenue : d.orders;
                          const y = 180 - (val / (maxVal * 1.15)) * 140;
                          return { x, y, data: d };
                        });

                        const dPath = points.reduce((acc, p, i) => {
                          if (i === 0) return `M ${p.x} ${p.y}`;
                          const prev = points[i - 1];
                          const cx = (prev.x + p.x) / 2;
                          return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
                        }, '');

                        const areaPath = `${dPath} L 500 180 L 0 180 Z`;

                        return (
                          <>
                            {/* Area fill */}
                            <path d={areaPath} fill="url(#chartGradient)" />

                            {/* Main Stroke line */}
                            <path d={dPath} fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />

                            {/* Data Points */}
                            {points.map((p, i) => (
                              <g
                                key={i}
                                onMouseEnter={() => setHoveredChartPoint(p.data)}
                                onMouseLeave={() => setHoveredChartPoint(null)}
                                className="cursor-pointer group"
                              >
                                <circle
                                  cx={p.x}
                                  cy={p.y}
                                  r="5"
                                  fill="#FFFFFF"
                                  stroke="#F43F5E"
                                  strokeWidth="3"
                                  className="transition-all duration-200 group-hover:scale-150 group-hover:fill-rose-500"
                                />
                              </g>
                            ))}
                          </>
                        );
                      })()}
                    </svg>

                    {/* Chart Tooltip Overlay */}
                    {hoveredChartPoint && (
                      <div className="absolute top-2 right-4 bg-stone-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-stone-700 pointer-events-none animate-in fade-in zoom-in-95">
                        <div className="font-bold text-rose-300">{hoveredChartPoint.label}</div>
                        <div className="text-[11px] text-stone-200">
                          Revenue: <strong className="font-mono text-white">₹{hoveredChartPoint.revenue.toLocaleString()}</strong>
                        </div>
                        <div className="text-[11px] text-stone-200">
                          Orders: <strong className="font-mono text-white">{hoveredChartPoint.orders} completed</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chart X-Axis Labels */}
                  <div className="flex justify-between items-center text-[11px] font-semibold text-stone-400 mt-3 pt-2 border-t border-stone-100">
                    {chartData.map((d, i) => (
                      <span key={i}>{d.label}</span>
                    ))}
                  </div>

                  {/* Summary Micro-KPIs below chart */}
                  <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-stone-50">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold">Peak Day Revenue</span>
                      <div className="font-mono font-bold text-stone-900 text-xs sm:text-sm">₹9,850</div>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold">Conversion Rate</span>
                      <div className="font-mono font-bold text-emerald-600 text-xs sm:text-sm">4.82%</div>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold">Repeat Customers</span>
                      <div className="font-mono font-bold text-purple-600 text-xs sm:text-sm">38.5%</div>
                    </div>
                  </div>
                </div>

                {/* Sales By Category & Fulfillment Funnel (4 cols) */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Category Breakdown */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs">
                    <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
                      Sales by Gift Category
                    </h3>
                    <p className="text-xs text-stone-500 mb-4">
                      Share of revenue across personalized product lines.
                    </p>

                    <div className="space-y-3.5">
                      {[
                        { name: 'Ceramic Magic Mugs', percent: 26, revenue: '₹14,600', color: 'bg-rose-500' },
                        { name: 'Toys/RC Cars', percent: 22, revenue: '₹12,400', color: 'bg-blue-500' },
                        { name: 'Wall Watches', percent: 18, revenue: '₹10,100', color: 'bg-indigo-500' },
                        { name: 'Decorative Items', percent: 16, revenue: '₹8,900', color: 'bg-emerald-500' },
                        { name: 'Oak Photo Frames', percent: 12, revenue: '₹6,700', color: 'bg-amber-500' },
                        { name: 'Gift Hampers & Combos', percent: 6, revenue: '₹3,590', color: 'bg-purple-500' },
                      ].map((cat) => (
                        <div key={cat.name} className="space-y-1.5 text-xs">
                          <div className="flex justify-between items-center font-medium">
                            <span className="text-stone-700">{cat.name}</span>
                            <div className="flex items-center gap-2 font-mono">
                              <span className="font-bold text-stone-900">{cat.revenue}</span>
                              <span className="text-stone-400 text-[11px]">{cat.percent}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                            <div className={`h-2 rounded-full ${cat.color} transition-all duration-500`} style={{ width: `${cat.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Pipeline Progress */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
                    <h3 className="font-serif font-bold text-stone-900 text-sm mb-1">
                      Order Pipeline Status
                    </h3>
                    <p className="text-[11px] text-stone-500 mb-3">Real-time status of orders in fulfillment queue</p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-100">
                        <span className="text-stone-700 font-medium">New Placed Orders</span>
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold font-mono text-[11px]">
                          {orders.filter((o) => o.status === 'Order Placed').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-100">
                        <span className="text-stone-700 font-medium">In Personalization / Print</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold font-mono text-[11px]">
                          {orders.filter((o) => o.status === 'Preparing / Customized').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-100">
                        <span className="text-stone-700 font-medium">Dispatched with Rider</span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold font-mono text-[11px]">
                          {orders.filter((o) => o.status === 'Ready for Pickup / Shipped').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: TOP SELLING PRODUCTS & LOW STOCK INVENTORY (Matching Dashboard Image) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Top Selling Products (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-stone-900 text-base">
                        Top Selling Gifts
                      </h3>
                      <p className="text-xs text-stone-500">Highest grossing personalized products</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {topSellingProducts.map((p) => (
                      <div key={p.id} className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50/60 p-2 rounded-xl transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-stone-200 shadow-xs flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                {p.category}
                              </span>
                              <span className="text-[11px] text-stone-400">
                                {p.unitsSold} sold
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="font-mono font-bold text-stone-900 text-sm">
                            ₹{p.price}
                          </div>
                          <div className="text-[10px] font-semibold text-emerald-600">
                            ₹{p.totalRevenue.toLocaleString()} rev
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Stock Products Table (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-bold text-stone-900 text-base">
                          Low Stock Products
                        </h3>
                        {lowStockProducts.length > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                            {lowStockProducts.length}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500">Items requiring stock replenishment</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Manage
                    </button>
                  </div>

                  <div className="space-y-3">
                    {lowStockProducts.length === 0 ? (
                      <div className="text-center py-8 text-stone-400 text-xs">
                        <ShieldCheck className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                        All products are well stocked!
                      </div>
                    ) : (
                      lowStockProducts.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between gap-3 hover:border-amber-300 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover border border-stone-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-stone-900 text-xs truncate">
                                {p.name}
                              </h4>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                    p.stock === 0
                                      ? 'bg-rose-100 text-rose-700'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {p.stock === 0 ? 'Out of Stock' : `${p.stock} units left`}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => handleQuickStock(p.id, 5)}
                              className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-800 shadow-2xs transition-all cursor-pointer hover:border-rose-400"
                              title="Add +5 Stock"
                            >
                              +5
                            </button>
                            <button
                              onClick={() => handleQuickStock(p.id, 10)}
                              className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
                              title="Add +10 Stock"
                            >
                              +10
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* RECENT ORDERS FEED ON DASHBOARD */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-base">
                      Recent Orders Stream
                    </h3>
                    <p className="text-xs text-stone-500">Live feed of orders with personalized items & status</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Orders ({orders.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-400 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-3">Order Code</th>
                        <th className="py-3 px-3">Customer</th>
                        <th className="py-3 px-3">Item / Customization</th>
                        <th className="py-3 px-3">Amount</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.slice(0, 5).map((ord) => {
                        const hasCustomPhoto = ord.items.some((i) => i.customization?.photoUrl);
                        return (
                          <tr key={ord.id} className="hover:bg-stone-50/60 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-stone-900 whitespace-nowrap">
                              {ord.orderNumber}
                              <div className="text-[10px] text-stone-400 font-normal">
                                {new Date(ord.createdAt).toLocaleDateString()}
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              <div className="font-semibold text-stone-900">{ord.customerName}</div>
                              <div className="text-[10px] text-stone-500">{ord.customerPhone}</div>
                            </td>

                            <td className="py-3 px-3">
                              <div className="text-stone-800 font-medium truncate max-w-[200px]">
                                {ord.items.map((i) => i.product.name).join(', ')}
                              </div>
                              {hasCustomPhoto && (
                                <span className="inline-block mt-0.5 text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                                  📷 Photo Attached
                                </span>
                              )}
                            </td>

                            <td className="py-3 px-3 font-mono font-bold text-stone-900">
                              ₹{ord.totalAmount}
                            </td>

                            <td className="py-3 px-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  ord.status === 'Delivered / Completed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ord.status === 'Cancelled'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>

                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSlipOrder(ord)}
                                  className="p-1.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                                  title="Print Packing Slip"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedOrder(ord);
                                    setNewStatus(ord.status);
                                  }}
                                  className="px-2.5 py-1 bg-stone-900 hover:bg-black text-white rounded-lg text-xs font-semibold cursor-pointer"
                                >
                                  Inspect
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    Order Management & Fulfillment Queue
                  </h2>
                  <p className="text-xs text-stone-500">
                    Manage gift customizations, inspect uploaded photos, and generate delivery packing slips.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportOrdersCSV}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-semibold text-stone-700 shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-500" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 min-w-[240px] max-w-md">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search order ID, customer name, phone, address..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-stone-500">Period:</span>
                    <button
                      onClick={() => setDateFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        dateFilter === 'all' ? 'bg-[#292525] text-white font-bold' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setDateFilter('today')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        dateFilter === 'today' ? 'bg-[#292525] text-white font-bold' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setDateFilter('week')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        dateFilter === 'week' ? 'bg-[#292525] text-white font-bold' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      7 Days
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-stone-500">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="all">All Statuses ({orders.length})</option>
                      <option value="Order Placed">Order Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing / Customized">Preparing / Customized</option>
                      <option value="Ready for Pickup / Shipped">Ready for Pickup / Shipped</option>
                      <option value="Delivered / Completed">Delivered / Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-400 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Order Code</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Items & Customization</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4">Fulfillment Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-stone-400">
                            No orders match the current search or filters.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => {
                          const hasCustomPhoto = ord.items.some((i) => i.customization?.photoUrl);
                          const hasCustomText = ord.items.some(
                            (i) => i.customization?.customMessage || i.customization?.recipientName
                          );

                          return (
                            <tr key={ord.id} className="hover:bg-stone-50/60 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                                {ord.orderNumber}
                                <div className="text-[10px] text-stone-400 font-normal">
                                  {new Date(ord.createdAt).toLocaleDateString()}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="font-semibold text-stone-900">{ord.customerName}</div>
                                <div className="text-[11px] text-stone-600 flex items-center gap-1 font-mono">
                                  <Phone className="w-3 h-3 text-stone-400" />
                                  <a
                                    href={`https://wa.me/91${ord.customerPhone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-emerald-700"
                                  >
                                    {ord.customerPhone}
                                  </a>
                                </div>
                                <div className="text-[10px] text-stone-400 truncate max-w-[160px]">
                                  {ord.deliveryAddress}, {ord.city}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="text-stone-800 font-medium">
                                  {ord.items.map((i) => i.product.name).join(', ')}
                                </div>
                                <div className="flex items-center gap-1.5 mt-1">
                                  {hasCustomPhoto && (
                                    <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                                      📷 Photo Attached
                                    </span>
                                  )}
                                  {hasCustomText && (
                                    <span className="text-[10px] font-medium text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                                      ✍️ Custom Text
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                                ₹{ord.totalAmount}
                                <div className="text-[10px] font-normal text-emerald-700">
                                  {ord.paymentStatus}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <select
                                  value={ord.status}
                                  onChange={(e) =>
                                    handleQuickRowStatus(ord.id, e.target.value as OrderStatus)
                                  }
                                  className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${
                                    ord.status === 'Cancelled'
                                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                                      : ord.status === 'Delivered / Completed'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : 'bg-amber-50 text-amber-900 border-amber-200'
                                  }`}
                                >
                                  <option value="Order Placed">Order Placed</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Preparing / Customized">Preparing / Customized</option>
                                  <option value="Ready for Pickup / Shipped">Ready for Pickup / Shipped</option>
                                  <option value="Delivered / Completed">Delivered / Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSlipOrder(ord)}
                                    className="p-1.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                                    title="Print Packing Slip"
                                  >
                                    <Printer className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedOrder(ord);
                                      setNewStatus(ord.status);
                                    }}
                                    className="px-3 py-1.5 bg-[#292525] text-white rounded-lg hover:bg-black font-semibold text-xs flex items-center gap-1 cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Inspect</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & INVENTORY (Modern Shopify-Style Inventory Management) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Header & KPI Summary Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Inventory Control
                    </span>
                    <span className="text-xs text-stone-400 font-mono">Gondia Hub Catalog</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                    Products & Inventory Manager
                  </h2>
                  <p className="text-xs text-stone-500">
                    Live stock balances, price variants, category categorization, and fulfillment prep times.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct({
                        id: `prod-${Date.now()}`,
                        name: '',
                        slug: '',
                        description: '',
                        price: 499,
                        stock: 25,
                        category: 'Toys/RC Cars',
                        occasions: ['Birthday'],
                        isCustomizable: false,
                        customizationType: 'none',
                        images: ['https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80'],
                        tags: ['New Arrival', 'Toys/RC Cars'],
                        status: 'active',
                        preparationHours: 6,
                        rating: 5.0,
                        reviewsCount: 1,
                      });
                      setIsAddingProduct(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-xs font-semibold hover:from-rose-600 hover:to-pink-600 cursor-pointer shadow-md shadow-rose-500/20"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Inventory Summary Micro-KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
                  <span className="text-[11px] font-semibold text-stone-500 block">Total Catalog Items</span>
                  <div className="font-mono text-xl font-bold text-stone-900 mt-0.5">{products.length} SKUs</div>
                  <span className="text-[10px] text-stone-400">{products.filter((p) => p.status === 'active').length} active</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
                  <span className="text-[11px] font-semibold text-stone-500 block">Total Stock Units</span>
                  <div className="font-mono text-xl font-bold text-stone-900 mt-0.5">{totalStockUnits} units</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Available for Gondia delivery</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
                  <span className="text-[11px] font-semibold text-stone-500 block">Inventory Valuation</span>
                  <div className="font-mono text-xl font-bold text-stone-900 mt-0.5">₹{totalInventoryValuation.toLocaleString()}</div>
                  <span className="text-[10px] text-stone-400">At current selling prices</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
                  <span className="text-[11px] font-semibold text-stone-500 block">Low Stock Alerts</span>
                  <div className={`font-mono text-xl font-bold mt-0.5 ${lowStockProducts.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {lowStockProducts.length} items
                  </div>
                  <span className="text-[10px] text-stone-400">≤ 5 units threshold</span>
                </div>
              </div>

              {/* CATEGORY FILTER TABS (Featuring Toys/RC Cars, Wall Watches, Decorative Items) */}
              <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Filter by Department / Category
                  </span>
                  {productCategoryFilter !== 'all' && (
                    <button
                      onClick={() => setProductCategoryFilter('all')}
                      className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
                    >
                      Clear Category Filter
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'all', label: 'All Catalog', count: products.length },
                    { id: 'Toys/RC Cars', label: '🏎️ Toys/RC Cars', count: toysCount, badge: 'Hot' },
                    { id: 'Wall Watches', label: '🕰️ Wall Watches', count: watchesCount, badge: 'Trending' },
                    { id: 'Decorative Items', label: '🏺 Decorative Items', count: decorCount, badge: 'Aesthetic' },
                    { id: 'Customized Mugs', label: '☕ Photo Mugs', count: products.filter((p) => p.category === 'Customized Mugs').length },
                    { id: 'Photo Frames', label: '🖼️ Oak Frames', count: products.filter((p) => p.category === 'Photo Frames').length },
                    { id: 'Gift Hampers', label: '🎁 Gift Hampers', count: products.filter((p) => p.category === 'Gift Hampers').length },
                    { id: 'LED Lamps', label: '💡 3D Lamps', count: products.filter((p) => p.category === 'LED Lamps').length },
                    { id: 'Explosion Boxes', label: '📦 Surprise Boxes', count: products.filter((p) => p.category === 'Explosion Boxes').length },
                  ].map((cat) => {
                    const isActive = productCategoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setProductCategoryFilter(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/70'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                            isActive ? 'bg-white/25 text-white' : 'bg-stone-200/80 text-stone-600'
                          }`}
                        >
                          {cat.count}
                        </span>
                        {cat.badge && (
                          <span
                            className={`text-[9px] uppercase tracking-wide font-extrabold px-1.5 py-0.2 rounded-full ${
                              isActive ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {cat.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Search, Stock Condition & Layout Toggle Toolbar */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 min-w-[220px] max-w-md">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search title, SKU, or tag (e.g. RC, Brass, Watch)..."
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Stock Status Selector */}
                    <div className="flex p-0.5 bg-stone-100 rounded-lg text-xs font-semibold">
                      {(
                        [
                          { id: 'all', label: 'All Stock' },
                          { id: 'low', label: '⚠️ Low Stock (≤5)' },
                          { id: 'oos', label: '❌ Out of Stock' },
                          { id: 'custom', label: '✨ Customizable' },
                        ] as const
                      ).map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setProductStockFilter(st.id)}
                          className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                            productStockFilter === st.id ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>

                    {/* View Mode Toggle: Table vs Grid */}
                    <div className="flex p-0.5 bg-stone-100 rounded-lg text-xs font-semibold">
                      <button
                        onClick={() => setProductViewMode('table')}
                        className={`p-1.5 rounded-md transition-all cursor-pointer ${
                          productViewMode === 'table' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                        }`}
                        title="Shopify Table View"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setProductViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all cursor-pointer ${
                          productViewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                        }`}
                        title="Visual Cards View"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCTS LISTING: SHOPIFY-STYLE INVENTORY TABLE OR GRID */}
              {filteredCatalogProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm">No products found</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    No products matched your category or search filter.
                  </p>
                  <button
                    onClick={() => {
                      setProductCategoryFilter('all');
                      setProductStockFilter('all');
                      setProductSearchQuery('');
                    }}
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-black cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : productViewMode === 'table' ? (
                /* SHOPIFY POLARIS INVENTORY TABLE */
                <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#FAF8F5] border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3.5 px-4">Product</th>
                          <th className="py-3.5 px-3">Category</th>
                          <th className="py-3.5 px-3">Stock & Quick Adjust</th>
                          <th className="py-3.5 px-3">Price</th>
                          <th className="py-3.5 px-3">Customization</th>
                          <th className="py-3.5 px-3">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-medium">
                        {filteredCatalogProducts.map((p) => {
                          const isLow = p.stock <= 5 && p.stock > 0;
                          const isOOS = p.stock === 0;
                          const isToys = p.category === 'Toys/RC Cars';
                          const isWatches = p.category === 'Wall Watches';
                          const isDecor = p.category === 'Decorative Items';

                          return (
                            <tr key={p.id} className="hover:bg-stone-50/70 transition-colors group">
                              {/* Product Thumbnail & Details */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0">
                                    <img
                                      src={p.images[0]}
                                      alt={p.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                                      {p.name}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px] text-stone-400 font-mono">
                                      <span>ID: {p.id}</span>
                                      {p.tags?.[0] && (
                                        <span className="text-stone-500 font-sans">· {p.tags[0]}</span>
                                      )}
                                      {p.variants && p.variants.length > 0 && (
                                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50/90 border border-blue-200 px-1.5 py-0.2 rounded font-sans">
                                          {p.variants.length} Variants ({Array.from(new Set(p.variants.map((v) => v.name))).join(', ')})
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Category Badge */}
                              <td className="py-3 px-3">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block whitespace-nowrap ${
                                    isToys
                                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                      : isWatches
                                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                      : isDecor
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-stone-100 text-stone-700'
                                  }`}
                                >
                                  {p.category}
                                </span>
                              </td>

                              {/* Stock Level & Inline Quick Adjust Controls */}
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-2">
                                  <div className="min-w-[70px]">
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`font-mono font-bold text-sm ${
                                          isOOS
                                            ? 'text-rose-600'
                                            : isLow
                                            ? 'text-amber-600'
                                            : 'text-stone-900'
                                        }`}
                                      >
                                        {p.stock}
                                      </span>
                                      <span className="text-[10px] text-stone-400">units</span>
                                    </div>
                                    <div className="w-16 bg-stone-100 rounded-full h-1 mt-1 overflow-hidden">
                                      <div
                                        className={`h-full ${
                                          isOOS ? 'bg-rose-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500'
                                        }`}
                                        style={{ width: `${Math.min(100, (p.stock / 30) * 100)}%` }}
                                      />
                                    </div>
                                  </div>

                                  {/* Quick +/- buttons */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleQuickStock(p.id, 5)}
                                      className="px-1.5 py-0.5 bg-stone-100 hover:bg-stone-200 rounded text-[10px] font-mono cursor-pointer"
                                      title="Add 5 units"
                                    >
                                      +5
                                    </button>
                                    <button
                                      onClick={() => handleQuickStock(p.id, 10)}
                                      className="px-1.5 py-0.5 bg-stone-100 hover:bg-stone-200 rounded text-[10px] font-mono cursor-pointer"
                                      title="Add 10 units"
                                    >
                                      +10
                                    </button>
                                    <button
                                      onClick={() => handleQuickStock(p.id, -1)}
                                      disabled={p.stock <= 0}
                                      className="px-1.5 py-0.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded text-[10px] font-mono cursor-pointer"
                                      title="Deduct 1 unit"
                                    >
                                      -1
                                    </button>
                                  </div>
                                </div>
                              </td>

                              {/* Price */}
                              <td className="py-3 px-3">
                                <div>
                                  <span className="font-mono font-extrabold text-stone-900 text-sm">
                                    ₹{p.price}
                                  </span>
                                  {p.comparePrice && (
                                    <div className="font-mono text-[10px] line-through text-stone-400">
                                      ₹{p.comparePrice}
                                    </div>
                                  )}
                                </div>
                              </td>

                              {/* Customization */}
                              <td className="py-3 px-3">
                                {p.isCustomizable ? (
                                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                                    {p.customizationType === 'photo_and_text' ? 'Photo & Text' : 'Text Message'}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-stone-400">Standard Gift</span>
                                )}
                              </td>

                              {/* Status Toggle */}
                              <td className="py-3 px-3">
                                <button
                                  onClick={() => {
                                    const updated = {
                                      ...p,
                                      status: p.status === 'active' ? ('draft' as const) : ('active' as const),
                                    };
                                    storeService.saveProduct(updated);
                                    refreshData();
                                  }}
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                                    p.status === 'active'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-stone-100 text-stone-600'
                                  }`}
                                >
                                  {p.status}
                                </button>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingProduct(p);
                                      setIsAddingProduct(false);
                                    }}
                                    className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                                    title="Edit Product"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id)}
                                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* GRID VIEW (Interactive Cards with Photo & Stock) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCatalogProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden bg-stone-100">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs ${
                                p.category === 'Toys/RC Cars'
                                  ? 'bg-blue-600 text-white'
                                  : p.category === 'Wall Watches'
                                  ? 'bg-indigo-600 text-white'
                                  : p.category === 'Decorative Items'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white/90 text-stone-800'
                              }`}
                            >
                              {p.category}
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5">
                            <button
                              onClick={() => {
                                const updated = {
                                  ...p,
                                  status: p.status === 'active' ? ('draft' as const) : ('active' as const),
                                };
                                storeService.saveProduct(updated);
                                refreshData();
                              }}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer ${
                                p.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-stone-500 text-white'
                              }`}
                            >
                              {p.status}
                            </button>
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                            {p.name}
                          </h3>
                          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                            {p.description}
                          </p>

                          <div className="mt-3 flex items-baseline gap-2">
                            <span className="font-mono text-lg font-extrabold text-stone-900">
                              ₹{p.price}
                            </span>
                            {p.comparePrice && (
                              <span className="font-mono text-xs line-through text-stone-400">
                                ₹{p.comparePrice}
                              </span>
                            )}
                          </div>

                          {p.variants && p.variants.length > 0 && (
                            <div className="mt-1.5 flex items-center gap-1">
                              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50/90 border border-blue-200 px-1.5 py-0.5 rounded font-sans truncate">
                                {p.variants.length} Variants ({Array.from(new Set(p.variants.map((v) => v.name))).join(', ')})
                              </span>
                            </div>
                          )}

                          {/* Stock Counter Controls */}
                          <div className="mt-3 p-2 bg-[#FAF8F5] rounded-xl border border-stone-200/60 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-stone-500 text-[11px]">Stock: </span>
                              <strong
                                className={
                                  p.stock <= 5
                                    ? 'text-rose-600 font-mono font-bold'
                                    : 'font-mono text-stone-900'
                                }
                              >
                                {p.stock} units
                              </strong>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleQuickStock(p.id, 5)}
                                className="px-2 py-0.5 bg-white border border-stone-200 hover:bg-stone-100 rounded text-[11px] font-mono cursor-pointer"
                                title="Add 5 units"
                              >
                                +5
                              </button>
                              <button
                                onClick={() => handleQuickStock(p.id, 10)}
                                className="px-2 py-0.5 bg-white border border-stone-200 hover:bg-stone-100 rounded text-[11px] font-mono cursor-pointer"
                                title="Add 10 units"
                              >
                                +10
                              </button>
                              <button
                                onClick={() => handleQuickStock(p.id, -p.stock)}
                                className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded text-[10px] cursor-pointer"
                                title="Mark Out of Stock"
                              >
                                OOS
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between mt-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsAddingProduct(false);
                          }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Product</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-stone-400 hover:text-rose-600 p-1.5 cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CUSTOMERS CRM */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Customer Directory & Relationship Manager
                </h2>
                <p className="text-xs text-stone-500">
                  Direct connection to Gondia shoppers, order history, and instant WhatsApp support.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-400 uppercase font-semibold text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Contact Phone</th>
                        <th className="py-3 px-4">Delivery Locality</th>
                        <th className="py-3 px-4 text-center">Orders Placed</th>
                        <th className="py-3 px-4 text-right">Lifetime Spent</th>
                        <th className="py-3 px-4 text-right">Connect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {customersList.map((c) => (
                        <tr key={c.phone} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-stone-900">
                            {c.name}
                            {c.email && <div className="text-[10px] font-normal text-stone-400">{c.email}</div>}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-stone-700">
                            {c.phone}
                          </td>

                          <td className="py-3.5 px-4 text-stone-600">
                            <div className="truncate max-w-[200px]">{c.address}</div>
                            <div className="text-[10px] text-stone-400">{c.city}</div>
                          </td>

                          <td className="py-3.5 px-4 text-center font-mono font-bold text-stone-800">
                            {c.orderCount}
                          </td>

                          <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900">
                            ₹{c.totalSpent.toLocaleString()}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={`https://wa.me/91${c.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hello ${c.name}! Greetings from Blossom Gift Gondia. Thank you for choosing us for your special memories.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS & REPORTS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Business Intelligence & Hub Analytics
                </h2>
                <p className="text-xs text-stone-500">
                  Comprehensive sales performance, repeat gift rate, and delivery fulfillment metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                  <span className="text-xs text-stone-400 font-semibold uppercase">Total Sales Generated</span>
                  <div className="font-mono text-3xl font-extrabold text-stone-900 mt-1">₹{totalRevenue.toLocaleString()}</div>
                  <div className="text-xs text-emerald-600 mt-2 font-semibold">COD & UPI collections</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                  <span className="text-xs text-stone-400 font-semibold uppercase">Average Delivery Speed</span>
                  <div className="font-mono text-3xl font-extrabold text-stone-900 mt-1">2.4 hrs</div>
                  <div className="text-xs text-stone-500 mt-2">Same-day Gondia dispatch</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                  <span className="text-xs text-stone-400 font-semibold uppercase">Customer Satisfaction</span>
                  <div className="font-mono text-3xl font-extrabold text-amber-500 mt-1">4.92 / 5</div>
                  <div className="text-xs text-stone-500 mt-2">Based on 140+ reviews</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
              <h2 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Store Profile & Delivery Rules
              </h2>
              <p className="text-xs text-stone-500 mb-6">
                Configure contact numbers, business address, and Cash on Delivery charges.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                {settingsSaved && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" /> Settings updated successfully!
                  </div>
                )}

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Store Business Name</label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-bold focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Physical Store Address</label>
                  <textarea
                    rows={2}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 text-stone-900 resize-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Primary Phone</label>
                    <input
                      type="text"
                      value={settings.phones[0]}
                      onChange={(e) => {
                        const copy = [...settings.phones];
                        copy[0] = e.target.value;
                        setSettings({ ...settings, phones: copy });
                      }}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Secondary Phone</label>
                    <input
                      type="text"
                      value={settings.phones[1] || ''}
                      onChange={(e) => {
                        const copy = [...settings.phones];
                        copy[1] = e.target.value;
                        setSettings({ ...settings, phones: copy });
                      }}
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Delivery Charge (below threshold)
                    </label>
                    <input
                      type="number"
                      value={settings.deliveryFee}
                      onChange={(e) =>
                        setSettings({ ...settings, deliveryFee: Number(e.target.value) })
                      }
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Free Delivery Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.freeDeliveryThreshold}
                      onChange={(e) =>
                        setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })
                      }
                      className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset store demo data to initial catalog?')) {
                        storeService.resetStoreDemo();
                        refreshData();
                      }
                    }}
                    className="text-stone-500 hover:text-stone-800 text-xs font-medium cursor-pointer"
                  >
                    Reset Demo Data
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow-md shadow-rose-500/20 cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Store Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* INSPECT ORDER DRAWER / MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 p-6 text-left max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-rose-500 font-bold">
                  Inspect Order
                </span>
                <h3 className="font-mono text-xl font-extrabold text-stone-900">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSlipOrder(selectedOrder)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-600" />
                  <span>Packing Slip</span>
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customer & Address */}
            <div className="my-4 p-4 bg-[#FAF8F5] rounded-xl border border-stone-200/80 text-xs grid grid-cols-2 gap-3">
              <div>
                <span className="text-stone-400 block font-semibold text-[10px] uppercase">Customer</span>
                <strong className="text-stone-900 text-sm">{selectedOrder.customerName}</strong>
                <div className="font-mono text-stone-600 mt-0.5">{selectedOrder.customerPhone}</div>
                {selectedOrder.customerEmail && (
                  <div className="text-stone-500">{selectedOrder.customerEmail}</div>
                )}
              </div>
              <div>
                <span className="text-stone-400 block font-semibold text-[10px] uppercase">Delivery Address</span>
                <div className="text-stone-800">
                  {selectedOrder.deliveryAddress}, {selectedOrder.city} ({selectedOrder.pincode})
                </div>
                {selectedOrder.deliveryNotes && (
                  <div className="text-amber-800 mt-1 italic">
                    Note: {selectedOrder.deliveryNotes}
                  </div>
                )}
              </div>
            </div>

            {/* Direct WhatsApp Message Dispatcher */}
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <strong className="text-emerald-900 block font-bold">Notify Customer via WhatsApp</strong>
                <span className="text-emerald-700 text-[11px]">Send live order status update directly to {selectedOrder.customerPhone}</span>
              </div>
              <a
                href={`https://wa.me/91${selectedOrder.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hello ${selectedOrder.customerName}! Your Blossom Gift Order #${selectedOrder.orderNumber} is now: *${selectedOrder.status}*. Total COD: ₹${selectedOrder.totalAmount}. Thank you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send WhatsApp</span>
              </a>
            </div>

            {/* Customization Details & Photo Download */}
            <div className="my-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Order Items & Custom Specifications
              </h4>

              <div className="space-y-3">
                {selectedOrder.items.map((it) => (
                  <div
                    key={it.cartItemId}
                    className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-2 text-xs"
                  >
                    <div className="flex justify-between font-bold text-stone-900">
                      <span>{it.product.name} (x{it.quantity})</span>
                      <span className="font-mono tabular-nums">₹{it.totalPrice}</span>
                    </div>

                    {it.customization && (
                      <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-xl space-y-2">
                        {it.customization.recipientName && (
                          <div>
                            <strong className="text-rose-900">Recipient Name:</strong> {it.customization.recipientName}
                          </div>
                        )}
                        {it.customization.customMessage && (
                          <div>
                            <strong className="text-rose-900">Heartfelt Message:</strong> "{it.customization.customMessage}"
                          </div>
                        )}
                        {it.customization.giftWrap !== 'none' && (
                          <div className="text-rose-700 font-semibold">
                            🎁 Packaging: {it.customization.giftWrap}
                          </div>
                        )}

                        {/* Customer Photo Inspection & Download */}
                        {it.customization.photoUrl ? (
                          <div className="pt-2 border-t border-rose-200">
                            <span className="font-semibold block mb-1.5 text-stone-800">
                              Uploaded Customer Photo:
                            </span>
                            <div className="flex items-center gap-3">
                              <img
                                src={it.customization.photoUrl}
                                alt="Customer upload"
                                className="w-24 h-24 object-cover rounded-xl border border-stone-300 shadow-sm"
                              />
                              <div>
                                <a
                                  href={it.customization.photoUrl}
                                  download={`blossom-gift-${selectedOrder.orderNumber}-custom-photo.jpg`}
                                  className="px-3 py-1.5 bg-stone-900 hover:bg-black text-white text-xs font-medium rounded-xl inline-flex items-center gap-1.5 shadow-sm"
                                >
                                  <Download className="w-3.5 h-3.5 text-rose-400" />
                                  <span>Download High-Res Photo</span>
                                </a>
                                <p className="text-[11px] text-stone-500 mt-1">
                                  Ready for ceramic heat transfer or oak wooden print.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-stone-500 text-[11px]">
                            No photo attached (standard or text customization).
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Status Change Form */}
            <div className="mt-6 pt-4 border-t border-stone-200 bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                Update Order Lifecycle Status
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing / Customized">Preparing / Customized</option>
                    <option value="Ready for Pickup / Shipped">Ready for Pickup / Shipped</option>
                    <option value="Delivered / Completed">Delivered / Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">
                    Activity Note / Tracking Message
                  </label>
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="e.g. Mug customized, packed in gift box"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <button
                onClick={handleUpdateStatus}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Save Status Update</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT ADD/EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div
            className="relative bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {isAddingProduct ? 'Add New Gift to Catalog' : 'Edit Product Details'}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                    })
                  }
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Product Image URL (High-Res Photo)</label>
                <input
                  type="url"
                  required
                  value={editingProduct.images[0] || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      images: [e.target.value],
                    })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Compare Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.comparePrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        comparePrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category / Department</label>
                  <select
                    required
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-medium"
                  >
                    <option value="Toys/RC Cars">🏎️ Toys/RC Cars</option>
                    <option value="Wall Watches">🕰️ Wall Watches</option>
                    <option value="Decorative Items">🏺 Decorative Items</option>
                    <option value="Customized Mugs">☕ Customized Mugs</option>
                    <option value="Photo Frames">🖼️ Photo Frames</option>
                    <option value="Gift Hampers">🎁 Gift Hampers</option>
                    <option value="LED Lamps">💡 LED Lamps</option>
                    <option value="Explosion Boxes">📦 Explosion Boxes</option>
                    <option value="Personalized Gifts">✨ Personalized Gifts</option>
                  </select>
                </div>
              </div>

              {/* Quick Category Assignment Chips */}
              <div>
                <span className="text-[10px] text-stone-400 font-semibold block mb-1">Quick Select Category:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '🏎️ Toys/RC Cars', value: 'Toys/RC Cars' },
                    { label: '🕰️ Wall Watches', value: 'Wall Watches' },
                    { label: '🏺 Decorative Items', value: 'Decorative Items' },
                    { label: '☕ Mugs', value: 'Customized Mugs' },
                    { label: '🖼️ Frames', value: 'Photo Frames' },
                    { label: '🎁 Hampers', value: 'Gift Hampers' },
                  ].map((chip) => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, category: chip.value })}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                        editingProduct.category === chip.value
                          ? 'bg-rose-500 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Customization</label>
                  <select
                    value={editingProduct.customizationType}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        customizationType: e.target.value as any,
                        isCustomizable: e.target.value !== 'none',
                      })
                    }
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2"
                  >
                    <option value="photo_and_text">Photo & Text</option>
                    <option value="text_only">Text Message Only</option>
                    <option value="none">Standard Gift (No Customization)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Prep Time (Hours)</label>
                  <input
                    type="number"
                    value={editingProduct.preparationHours}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, preparationHours: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              {/* PRODUCT VARIANTS & PRICE DELTA MANAGER */}
              <div className="pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Product Variants & Price Deltas</span>
                    </label>
                    <p className="text-[10px] text-stone-500">
                      Configure multiple attributes (e.g. Color, Size, Model Year) and their price delta adjustments.
                    </p>
                  </div>
                  {/* Preset Quick Generator */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleApplyPresetVariants('wall_watches')}
                      className="text-[10px] px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded cursor-pointer"
                      title="Add Color & Size variants preset"
                    >
                      + Watch Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetVariants('rc_cars')}
                      className="text-[10px] px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded cursor-pointer"
                      title="Add Model Year & Color variants preset"
                    >
                      + RC Car Presets
                    </button>
                  </div>
                </div>

                {/* Existing Variants List */}
                {editingProduct.variants && editingProduct.variants.length > 0 ? (
                  <div className="space-y-1.5 mb-3 max-h-36 overflow-y-auto pr-1">
                    {editingProduct.variants.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between bg-stone-50 border border-stone-200/80 rounded-xl px-2.5 py-1.5 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-bold text-stone-500 bg-stone-200/70 px-1.5 py-0.5 rounded uppercase">
                            {v.name}
                          </span>
                          <span className="font-semibold text-stone-800 truncate">
                            {v.value}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-blue-700">
                            {v.priceDelta > 0
                              ? `+₹${v.priceDelta}`
                              : v.priceDelta < 0
                              ? `-₹${Math.abs(v.priceDelta)}`
                              : '+₹0'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(v.id)}
                            className="text-stone-400 hover:text-rose-600 p-0.5 cursor-pointer"
                            title="Remove variant"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[11px] text-stone-400 italic bg-stone-50/50 p-2 rounded-xl border border-dashed border-stone-200 text-center mb-3">
                    No custom variants configured. Click presets above or add attributes below.
                  </div>
                )}

                {/* Add Variant Inline Form */}
                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-200/90 space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-500 block mb-0.5">Attribute Name</span>
                      <input
                        type="text"
                        placeholder="e.g. Color, Size, Model Year"
                        value={newVariantName}
                        onChange={(e) => setNewVariantName(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block mb-0.5">Option Value</span>
                      <input
                        type="text"
                        placeholder="e.g. Royal Rose Gold, 16-Inch"
                        value={newVariantValue}
                        onChange={(e) => setNewVariantValue(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block mb-0.5">Price Delta (₹)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          placeholder="0"
                          value={newVariantDelta}
                          onChange={(e) => setNewVariantDelta(Number(e.target.value))}
                          className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleAddVariant}
                          className="px-2.5 py-1 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer whitespace-nowrap"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3 py-2 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/20"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PACKING SLIP MODAL */}
      <PackingSlipModal
        order={slipOrder}
        settings={settings}
        onClose={() => setSlipOrder(null)}
      />
    </div>
  );
};
