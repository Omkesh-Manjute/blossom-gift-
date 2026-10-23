import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, Home, AlertCircle, MessageSquare, Printer } from 'lucide-react';
import { storeService } from '../services/storeService';
import { Order, OrderStatus } from '../types';
import { ProductVisual } from './ProductVisual';

interface OrderTrackingViewProps {
  initialOrderNumber?: string;
  initialPhone?: string;
}

const STAGES: { status: OrderStatus; label: string; icon: React.FC<{ className?: string }> }[] = [
  { status: 'Order Placed', label: 'Order Placed', icon: Clock },
  { status: 'Confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { status: 'Preparing / Customized', label: 'Customizing Gift', icon: Package },
  { status: 'Ready for Pickup / Shipped', label: 'Out for Delivery', icon: Truck },
  { status: 'Delivered / Completed', label: 'Delivered', icon: Home },
];

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  initialOrderNumber = '',
  initialPhone = '',
}) => {
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState(initialPhone);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (!orderNumber.trim()) {
      setErrorMsg('Please enter your Order Tracking Code (e.g. BG-2026-4091).');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('Please enter your 10-digit mobile number.');
      return;
    }

    const found = storeService.findOrder(orderNumber, phone);
    setHasSearched(true);
    if (found) {
      setSearchedOrder(found);
      setErrorMsg(null);
    } else {
      setSearchedOrder(null);
      setErrorMsg('No order found matching this code and phone number. Please verify your details.');
    }
  };

  useEffect(() => {
    if (initialOrderNumber && initialPhone) {
      handleSearch();
    }
  }, [initialOrderNumber, initialPhone]);

  const getStageIndex = (currentStatus: OrderStatus) => {
    if (currentStatus === 'Cancelled') return -1;
    return STAGES.findIndex((s) => s.status === currentStatus);
  };

  const currentStageIndex = searchedOrder ? getStageIndex(searchedOrder.status) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#292525]">
          Track Your Gift Order
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Monitor real-time customization and delivery progress for your Blossom Gift order.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#EDE8DF] mb-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-1.5">
              Order Tracking Code
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. BG-2026-4091"
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3.5 py-2.5 text-xs text-stone-900 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-1.5">
              Registered Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9823415678"
              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-lg px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 py-2.5 px-4 rounded-xl text-xs font-black shadow-md shadow-amber-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer h-10"
            >
              <Search className="w-3.5 h-3.5 text-stone-950" />
              <span>Track Order</span>
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-500">
          <span>Try demo order:</span>
          <button
            type="button"
            onClick={() => {
              setOrderNumber('BG-2026-4091');
              setPhone('9823415678');
            }}
            className="text-amber-800 underline font-mono cursor-pointer"
          >
            BG-2026-4091 (9823415678)
          </button>
        </div>
      </div>

      {/* Order Results */}
      {searchedOrder && (
        <div className="space-y-6">
          {/* Main Status Banner */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EDE8DF]">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EAE5DC]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                  Order Code
                </span>
                <h3 className="font-mono text-xl font-bold text-[#292525]">
                  {searchedOrder.orderNumber}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                  Current Status
                </span>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                  searchedOrder.status === 'Cancelled'
                    ? 'bg-rose-100 text-rose-800'
                    : searchedOrder.status === 'Delivered / Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper */}
            {searchedOrder.status !== 'Cancelled' && (
              <div className="py-8">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 inset-x-8 h-1 bg-stone-200 -z-0">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${Math.max(0, (currentStageIndex / (STAGES.length - 1)) * 100)}%`,
                      }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="relative z-10 flex justify-between">
                    {STAGES.map((stg, idx) => {
                      const isCompleted = idx <= currentStageIndex;
                      const isCurrent = idx === currentStageIndex;
                      const Icon = stg.icon;

                      return (
                        <div key={stg.status} className="flex flex-col items-center text-center max-w-[80px]">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              isCurrent
                                ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-200 shadow-md font-bold'
                                : isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-200 text-stone-400'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[10px] mt-2 font-medium leading-tight ${
                              isCurrent
                                ? 'text-stone-900 font-bold'
                                : isCompleted
                                ? 'text-stone-700'
                                : 'text-stone-400'
                            }`}
                          >
                            {stg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Status History Logs */}
            <div className="pt-4 border-t border-[#EAE5DC]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-3">
                Fulfillment Activity Log
              </h4>
              <div className="space-y-3">
                {searchedOrder.statusHistory.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-stone-900">{item.status}</strong>
                        <span className="text-[11px] text-stone-400 font-mono">
                          {new Date(item.timestamp).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                      {item.notes && <p className="text-stone-600 mt-0.5">{item.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Itemized Order & Customization Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EDE8DF]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-4">
              Items in this Order ({searchedOrder.items.length})
            </h4>

            <div className="space-y-4">
              {searchedOrder.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 bg-[#FAF8F5] rounded-xl border border-stone-200 flex gap-4"
                >
                  <div className="w-18 h-18 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-white">
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
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h5 className="font-serif text-sm font-bold text-stone-900">
                        {item.product.name}
                      </h5>
                      <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                        ₹{item.totalPrice}
                      </span>
                    </div>

                    <div className="text-xs text-stone-500 mt-0.5">
                      Qty: {item.quantity} · Unit Price: ₹{item.unitPrice}
                    </div>

                    {item.customization && (
                      <div className="mt-2 text-xs text-amber-950 bg-amber-50/80 p-2 rounded border border-amber-200/60">
                        {item.customization.recipientName && (
                          <div><strong>Recipient:</strong> {item.customization.recipientName}</div>
                        )}
                        {item.customization.customMessage && (
                          <div className="italic">"{item.customization.customMessage}"</div>
                        )}
                        {item.customization.giftWrap !== 'none' && (
                          <div className="text-rose-700 font-medium mt-0.5">
                            🎁 {item.customization.giftWrap === 'luxury_satin_box' ? 'Deluxe Satin Gift Box' : 'Classic Wrap'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Details */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap justify-between items-center text-xs text-stone-600 gap-4">
              <div>
                <strong>Delivery Address:</strong> {searchedOrder.deliveryAddress}, {searchedOrder.city} ({searchedOrder.pincode})
              </div>
              <div className="text-right">
                <span className="text-stone-500 block">Total COD Payable</span>
                <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                  ₹{searchedOrder.totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: WhatsApp & Print Invoice (PDF) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Download Invoice / Print (PDF)</span>
            </button>

            <a
              href={`https://wa.me/918208589775?text=${encodeURIComponent(
                `Hello Blossom Gift! I am inquiring about Order #${searchedOrder.orderNumber}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Store on WhatsApp regarding this Order</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
