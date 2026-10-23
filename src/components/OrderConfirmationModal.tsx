import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, MessageSquare, Truck, ArrowRight, X, Printer, Download } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onGoToTracking: (orderNumber: string, phone: string) => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onGoToTracking,
}) => {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Blossom Gift Gondia! I just placed Order #${order.orderNumber} for ₹${order.totalAmount} (Cash on Delivery). Please confirm my order.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 text-left overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-[#292525]">
            Order Placed Successfully!
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Thank you, {order.customerName}! Your personalized gift order has been received at Blossom Gift in Gondia.
          </p>
        </div>

        {/* Order Number Box */}
        <div className="my-5 bg-[#FFF8E8] border border-[#F2E5CC] rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
              Your Order Tracking Code
            </span>
            <span className="font-mono text-xl font-bold text-[#292525]">
              {order.orderNumber}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-amber-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-600" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Details Snapshot */}
        <div className="bg-[#FAF8F5] rounded-xl border border-stone-200 p-4 space-y-2 text-xs text-stone-600">
          <div className="flex justify-between">
            <span className="text-stone-500">Payment Mode</span>
            <span className="font-semibold text-stone-900">Cash on Delivery</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Total Amount Payable</span>
            <span className="font-mono font-bold text-stone-900 text-sm tabular-nums">
              ₹{order.totalAmount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Contact Mobile</span>
            <span className="font-mono text-stone-900">{order.customerPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Delivery Locality</span>
            <span className="text-stone-900 truncate max-w-[200px]">
              {order.deliveryAddress}, {order.city}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-stone-200 text-emerald-800 font-medium">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Preparation & Dispatch
            </span>
            <span>Within 24–48 Hours</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-2.5">
          <button
            onClick={() => window.print()}
            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Download Invoice / Print Receipt (PDF)</span>
          </button>

          <button
            onClick={() => onGoToTracking(order.orderNumber, order.customerPhone)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold shadow-md shadow-amber-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Track Order Status</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </button>

          <a
            href={`https://wa.me/918208589775?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition-all text-center"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp for Instant Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
