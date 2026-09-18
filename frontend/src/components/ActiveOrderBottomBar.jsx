import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, ChevronRight, X, Clock, CheckCircle2, PackageCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ActiveOrderBottomBar = () => {
  const { ordersHistory } = useCart();
  const location = useLocation();
  const [minimized, setMinimized] = useState(false);
  const [dismissedOrderId, setDismissedOrderId] = useState(null);

  // Find most recent active order that is not delivered or dismissed
  const activeOrder = ordersHistory.find(
    (o) => o.status !== 'Delivered' && o.status !== 'Cancelled' && o.id !== dismissedOrderId
  ) || ordersHistory.find((o) => o.id !== dismissedOrderId && o.date === 'Just now' && o.status !== 'Cancelled');

  // Don't show on admin pages, auth/login pages, or if no active order
  const isAdminPage = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname.startsWith('/auth') || location.pathname.includes('login') || location.pathname.includes('register');

  if (isAdminPage || isAuthPage || !activeOrder) {
    return null;
  }

  const isDelivered = activeOrder.status === 'Delivered';
  const totalItemsCount = activeOrder.items ? activeOrder.items.reduce((sum, item) => sum + item.qty, 0) : activeOrder.itemsCount || 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-2xl z-40"
      >
        <div className="bg-[#043927] text-white rounded-3xl p-3.5 sm:p-4 shadow-2xl border border-emerald-500/40 backdrop-blur-xl flex items-center justify-between gap-3">
          
          {/* Icon & Live Pulse */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center relative shadow-inner">
              {isDelivered ? (
                <CheckCircle2 className="w-6 h-6 text-amber-300 stroke-[2.5]" />
              ) : (
                <Truck className="w-6 h-6 text-amber-300 stroke-[2.5]" />
              )}
              {!isDelivered && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></span>
              )}
            </div>
          </div>

          {/* Active Order Progress & Status Updates */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-amber-300 tracking-tight">
                {activeOrder.id}
              </span>
              <span className="text-[10px] bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                {totalItemsCount} {totalItemsCount === 1 ? 'Product' : 'Products'} • ₹{activeOrder.total}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-100 truncate mt-0.5 flex items-center gap-1.5">
              {isDelivered ? (
                <span className="text-emerald-300 font-bold">🎉 Order Delivered! Enjoy your fresh items.</span>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                  <span>{activeOrder.status}</span>
                  <span className="text-emerald-300 font-normal hidden sm:inline">• Arriving Morning 6:00 - 7:00 AM</span>
                </>
              )}
            </p>
          </div>

          {/* Action Links & Close */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/customer/track-order"
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-full shadow-md flex items-center gap-1 transition-all"
            >
              <span>Track</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setDismissedOrderId(activeOrder.id)}
              className="p-1.5 rounded-full hover:bg-emerald-900/60 text-slate-300 hover:text-white transition-colors"
              title="Dismiss status bar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ActiveOrderBottomBar;
