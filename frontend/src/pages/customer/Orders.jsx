import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, CheckCircle2, Clock, MapPin, ChevronRight, RefreshCw, Banknote, QrCode } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const Orders = () => {
  const { ordersHistory } = useCart();
  const { addToast } = useNotification();

  return (
    <div className="max-w-6xl w-full mx-auto px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-8 space-y-4 sm:space-y-8 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            My Orders & Subscriptions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            View past morning deliveries, payment methods, and live order statuses.
          </p>
        </div>
        <Link
          to="/customer/track-order"
          className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all shadow-sm self-start sm:self-auto"
        >
          <Truck className="w-4 h-4" /> Live Tracking
        </Link>
      </div>

      <div className="space-y-4">
        {ordersHistory.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-2xl sm:rounded-3xl text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">No orders placed yet</p>
            <p className="text-xs text-slate-500">Explore store items and place your first morning order.</p>
            <Link
              to="/customer/products"
              className="inline-block bg-[#053b27] text-white font-bold text-xs px-5 py-2.5 rounded-full"
            >
              Explore Products Catalog
            </Link>
          </div>
        ) : (
          ordersHistory.map((order) => (
            <div key={order.id} className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{order.id}</span>
                  <span className="text-xs text-slate-400">• {order.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}>
                    {order.status}
                  </span>
                  <span className="font-black text-base text-slate-900 dark:text-white">₹{order.total}</span>
                </div>
              </div>

              {/* Order Items List */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <span>{item.qty}x {item.name}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Order Details Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-sm">{order.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>Payment: <strong className="text-slate-800 dark:text-slate-200">{order.paymentMethod}</strong></span>
                    <span>Slot: <strong className="text-slate-800 dark:text-slate-200">{order.deliverySlot}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => addToast(`Reordered items from ${order.id}!`, 'success')}
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all text-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-600" /> Reorder
                  </button>
                  <Link
                    to="/customer/track-order"
                    className="bg-[#053b27] hover:bg-[#032619] text-white font-bold px-4 py-2 rounded-full flex items-center gap-1 text-xs shadow-sm"
                  >
                    Track <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
