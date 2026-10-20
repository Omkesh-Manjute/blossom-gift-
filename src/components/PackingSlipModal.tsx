import React from 'react';
import { X, Printer, CheckCircle, Phone, MapPin } from 'lucide-react';
import { Order, StoreSettings } from '../types';

interface PackingSlipModalProps {
  order: Order | null;
  settings: StoreSettings;
  onClose: () => void;
}

export const PackingSlipModal: React.FC<PackingSlipModalProps> = ({
  order,
  settings,
  onClose,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-300 p-6 sm:p-8 text-left max-h-[94vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              COD Dispatch Bill & Packing Slip
            </span>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
              {order.orderNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#292525] text-white hover:bg-black rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#F4C62E]" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="mt-4 p-4 border border-stone-200 rounded-xl bg-white text-stone-800 text-xs">
          {/* Shop Header */}
          <div className="flex justify-between items-start pb-4 border-b border-stone-200">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#292525]">
                {settings.businessName}
              </h1>
              <p className="text-[11px] text-stone-500 mt-0.5">{settings.tagline}</p>
              <div className="text-[10px] text-stone-500 mt-1 space-y-0.5">
                <div>{settings.address}</div>
                <div>Ph: {settings.phones.join(' / ')}</div>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-stone-900 text-white font-mono font-bold text-xs px-2.5 py-1 rounded">
                CASH ON DELIVERY
              </span>
              <div className="mt-2 text-stone-600 font-mono text-[11px]">
                <div>Order: <strong>{order.orderNumber}</strong></div>
                <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Coordinates */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-stone-200">
            <div>
              <span className="font-semibold text-stone-500 uppercase text-[10px] tracking-wider block mb-1">
                Recipient / Customer
              </span>
              <div className="font-bold text-sm text-stone-900">{order.customerName}</div>
              <div className="font-mono text-stone-700 mt-0.5">Mobile: {order.customerPhone}</div>
              {order.customerEmail && (
                <div className="text-stone-500">{order.customerEmail}</div>
              )}
            </div>

            <div>
              <span className="font-semibold text-stone-500 uppercase text-[10px] tracking-wider block mb-1">
                Delivery Address in Gondia
              </span>
              <div className="text-stone-800 leading-snug">
                {order.deliveryAddress}
              </div>
              <div className="font-semibold text-stone-900 mt-0.5">
                {order.city}, Maharashtra - {order.pincode}
              </div>
              {order.deliveryNotes && (
                <div className="mt-1 text-amber-900 bg-amber-50 p-1.5 rounded border border-amber-200 text-[10px] italic">
                  Note: {order.deliveryNotes}
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="py-4 border-b border-stone-200">
            <span className="font-semibold text-stone-500 uppercase text-[10px] tracking-wider block mb-2">
              Package Contents & Customization
            </span>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 text-[10px] uppercase text-stone-500 font-bold">
                  <th className="py-1.5">Item Description</th>
                  <th className="py-1.5 text-center">Qty</th>
                  <th className="py-1.5 text-right">Unit Price</th>
                  <th className="py-1.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {order.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5">
                      <div className="font-bold text-stone-900">{it.product.name}</div>
                      {it.selectedVariants && it.selectedVariants.length > 0 ? (
                        <div className="text-[10px] text-stone-600 font-medium mt-0.5">
                          {it.selectedVariants.map((v) => `${v.name}: ${v.value}${v.priceDelta !== 0 ? ` (+₹${v.priceDelta})` : ''}`).join(' | ')}
                        </div>
                      ) : it.selectedVariant ? (
                        <div className="text-[10px] text-stone-500">
                          Option: {it.selectedVariant.value}
                        </div>
                      ) : null}
                      {it.customization && (
                        <div className="mt-1 p-1.5 bg-amber-50/70 border border-amber-200 rounded text-[10px] space-y-0.5">
                          {it.customization.recipientName && (
                            <div><strong>Recipient:</strong> {it.customization.recipientName}</div>
                          )}
                          {it.customization.customMessage && (
                            <div><strong>Message:</strong> "{it.customization.customMessage}"</div>
                          )}
                          {it.customization.photoUrl && (
                            <div className="text-emerald-700 font-semibold">
                              📷 Custom Photo Verified & Processed
                            </div>
                          )}
                          {it.customization.giftWrap !== 'none' && (
                            <div className="text-rose-700">
                              🎁 Wrap: {it.customization.giftWrap}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 text-center font-mono">{it.quantity}</td>
                    <td className="py-2.5 text-right font-mono">₹{it.unitPrice}</td>
                    <td className="py-2.5 text-right font-mono font-bold">₹{it.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amount Calculation & COD Collection Highlight */}
          <div className="py-4 flex justify-between items-center">
            <div className="p-3 bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-xl">
              <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">
                Cash Collection Instruction
              </span>
              <div className="text-base font-mono font-bold text-emerald-800">
                COLLECT: ₹{order.totalAmount}
              </div>
              <span className="text-[9px] text-emerald-700">
                Collect cash or UPI payment before handing over package.
              </span>
            </div>

            <div className="text-right space-y-1 font-mono text-[11px] min-w-[160px]">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal:</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Fee:</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 font-bold text-sm text-stone-900">
                <span>Total Due:</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-6 pt-6 border-t border-stone-200 grid grid-cols-2 gap-8 text-[10px] text-stone-500">
            <div className="border-t border-dashed border-stone-300 pt-1 text-center">
              Store Dispatch Verification (Blossom Gift)
            </div>
            <div className="border-t border-dashed border-stone-300 pt-1 text-center">
              Customer Acknowledgment & Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
