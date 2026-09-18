import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Banknote,
  QrCode,
  CreditCard,
  Building2,
  MapPin,
  Clock,
  Check,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const Cart = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    deliveryFee,
    grandTotal,
    updateQuantity,
    removeFromCart,
    coupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    placeOrder,
  } = useCart();

  const { addToast, addAdminNotification } = useNotification();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD', 'UPI', 'CARD', 'NETBANKING'
  const [upiId, setUpiId] = useState('user@okaxis');
  const [showQr, setShowQr] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState('Morning (6:00 AM - 7:00 AM)');

  const [address, setAddress] = useState({
    flatNo: 'Flat 402, Sunshine Heights',
    street: 'MG Road, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    landmark: 'Near City Park'
  });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      addToast(res.message, 'success');
    } else {
      addToast(res.message, 'error');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsPlacingOrder(true);

    setTimeout(() => {
      const placed = placeOrder({
        addressDetails: address,
        paymentMethod,
        upiId: paymentMethod === 'UPI' ? upiId : '',
        deliverySlot
      });

      // Dispatch admin notification with product quantity and order details
      const itemsList = placed.items.map((i) => `${i.qty}x ${i.name}`).join(', ');
      addAdminNotification({
        title: `🛒 New Order #${placed.id} Received!`,
        message: `Customer ordered ${placed.items.length} products (${itemsList}) totaling ₹${placed.total} via ${placed.paymentMethod}.`,
        orderId: placed.id,
        itemsCount: placed.items.length,
        totalAmount: placed.total,
      });

      setIsPlacingOrder(false);
      addToast(`Order #${placed.id} placed! Scheduled for morning delivery.`, 'success');
      navigate('/customer/track-order');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Your Basket is Empty</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Add fresh milk, fruits, vegetables, or daily items to get started.</p>
        </div>
        <Link
          to="/customer/products"
          className="inline-flex items-center gap-2 bg-[#053b27] hover:bg-[#032619] text-white font-extrabold text-xs px-6 py-3.5 rounded-full shadow-md transition-all"
        >
          Explore Store Products →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-8 space-y-4 sm:space-y-8 overflow-x-hidden">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Checkout & Order Confirmation
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review your basket items, select delivery address & payment options.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline shrink-0"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Cart Items & Delivery Address & Payment Options */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
          
          {/* 1. Cart Items List */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Items in Basket ({cart.length})
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain rounded-xl bg-slate-50 dark:bg-slate-800 p-1 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.unit} • <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.frequency || 'Daily Morning'}</span>
                      </p>
                      <span className="font-extrabold text-slate-900 dark:text-white text-xs">₹{item.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-900 dark:text-slate-100">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-black text-sm text-slate-900 dark:text-white min-w-[3.5rem] text-right">
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Delivery Address & Slot Selector */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Delivery Location & Time Slot
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Flat / House / Floor No.</label>
                <input
                  type="text"
                  value={address.flatNo}
                  onChange={(e) => setAddress({ ...address, flatNo: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Street / Area / Landmark</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Pincode</label>
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            {/* Slot Picker */}
            <div className="pt-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Preferred Delivery Time Slot
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Morning (6:00 AM - 7:00 AM)',
                  'Evening (5:00 PM - 7:00 PM)'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setDeliverySlot(slot)}
                    className={`p-2.5 rounded-2xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                      deliverySlot === slot
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{slot}</span>
                    {deliverySlot === slot && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Payment Methods Selector */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-2xl border transition-all text-left space-y-1 relative ${
                  paymentMethod === 'COD'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-600 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                    <Banknote className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  {paymentMethod === 'COD' && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Pay cash or UPI directly at your doorstep</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-2xl border transition-all text-left space-y-1 relative ${
                  paymentMethod === 'UPI'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-600 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                    <QrCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>UPI (GPay / PhonePe / BHIM)</span>
                  </div>
                  {paymentMethod === 'UPI' && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Instant scan QR or enter VPA ID</p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Confirm Checkout Button */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              Payment Summary
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Doorstep Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm font-black text-slate-900 dark:text-slate-100">
              <span>Total Payable</span>
              <span className="text-2xl text-emerald-700 dark:text-emerald-400">₹{grandTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isPlacingOrder}
              className="w-full bg-[#053b27] hover:bg-[#032619] active:scale-95 text-white font-extrabold text-sm py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
