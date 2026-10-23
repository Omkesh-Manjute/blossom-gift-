import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { storeService } from '../services/storeService';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { items, subtotal, clearCart, amountUntilFreeDelivery } = useCart();
  const settings = storeService.getSettings();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Gondia');
  const [pincode, setPincode] = useState('441614');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isFreeDelivery = amountUntilFreeDelivery <= 0;
  const deliveryFee = isFreeDelivery ? 0 : settings.deliveryFee || 50;
  const totalAmount = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = customerPhone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!deliveryAddress.trim()) {
      setErrorMessage('Please enter your delivery street address / locality.');
      return;
    }

    const cleanPincode = pincode.trim().replace(/\D/g, '');
    if (cleanPincode.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit postal pincode.');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Your bag is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = storeService.createOrder({
        customerName,
        customerPhone: cleanPhone,
        customerEmail,
        deliveryAddress,
        city: city.trim() || 'Gondia',
        state: 'Maharashtra',
        pincode: cleanPincode,
        deliveryNotes,
        items,
      });

      clearCart();
      setIsSubmitting(false);
      onOrderSuccess(order);
    } catch (err) {
      console.error('Order creation error', err);
      setErrorMessage('Failed to place order. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 text-left overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE7DF] flex items-center justify-between bg-[#FFFDF5]">
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Cash on Delivery Checkout
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Pay upon safe delivery in Gondia (Cash or Doorstep UPI)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-5 space-y-4">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Customer Details */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-2">
              Customer Contact Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-stone-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-700 block mb-1">
                  Mobile Number (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9823456789"
                    className="w-full bg-white border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="mt-2.5">
              <label className="text-xs text-stone-700 block mb-1">
                Email Address (Optional for invoice)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="pt-2 border-t border-[#EAE5DC]">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-2">
              Delivery Address in Gondia
            </label>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-stone-700 block mb-1">
                  Street Address / Flat / Landmark <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. Flat 204, Radha Krishna Apts, Rail Toly, Near Station"
                    className="w-full bg-white border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-stone-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-700 block mb-1">
                    Pincode <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="441614"
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-700 block mb-1">
                  Delivery Notes / Special Surprise Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Surprise birthday gift, do not reveal sender until opened"
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="pt-2 border-t border-[#EAE5DC]">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block mb-2">
              Payment Method
            </label>
            <div className="border border-emerald-300 bg-emerald-50/60 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-emerald-950">
                    Cash on Delivery (COD)
                  </div>
                  <div className="text-[11px] text-emerald-800">
                    Zero advance payment required. Inspect parcel & pay upon delivery.
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-900">₹0 Fee</span>
            </div>
          </div>

          {/* Summary Breakdown */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Items Total ({items.length} items)</span>
              <span className="font-mono tabular-nums text-stone-900 font-semibold">
                ₹{subtotal}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-mono tabular-nums text-stone-900">
                {isFreeDelivery ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
              <span>Total Payable upon Delivery</span>
              <span className="font-mono tabular-nums text-base">₹{totalAmount}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold shadow-md shadow-amber-200 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-stone-950" />
              <span>
                {isSubmitting ? 'Placing Order...' : `Confirm Order with Cash on Delivery (₹${totalAmount})`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
