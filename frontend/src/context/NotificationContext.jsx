import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Bell } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const [customerNotifications, setCustomerNotifications] = useState(() => {
    const saved = localStorage.getItem('dailymitra_customer_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Order Delivered 🎉',
        message: 'Your morning milk & fresh groceries packet was delivered at 6:30 AM.',
        time: '10 mins ago',
        read: false,
        type: 'delivery'
      },
      {
        id: 2,
        title: 'Subscription Active',
        message: 'Your Daily Morning delivery plan is active for this week.',
        time: '2 hours ago',
        read: false,
        type: 'system'
      }
    ];
  });

  const [adminNotifications, setAdminNotifications] = useState(() => {
    const saved = localStorage.getItem('dailymitra_admin_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'adm-1',
        title: '🛒 New Order #ORD-89241 Received',
        message: 'Customer ordered 2 items (₹88 total via UPI). Items: 2x Capsicum, 1x Topokki.',
        time: '5 mins ago',
        read: false,
        orderId: 'ORD-89241',
        itemsCount: 2,
        totalAmount: 88,
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dailymitra_customer_notifications', JSON.stringify(customerNotifications));
  }, [customerNotifications]);

  useEffect(() => {
    localStorage.setItem('dailymitra_admin_notifications', JSON.stringify(adminNotifications));
  }, [adminNotifications]);

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addAdminNotification = ({ title, message, orderId, itemsCount, totalAmount }) => {
    const newNotif = {
      id: `adm-${Date.now()}`,
      title: title || `🛒 New Order #${orderId} Received`,
      message: message || `New order containing ${itemsCount} products (Total: ₹${totalAmount}).`,
      time: 'Just now',
      read: false,
      orderId,
      itemsCount,
      totalAmount,
    };

    setAdminNotifications((prev) => [newNotif, ...prev]);
    addToast(`🔔 ADMIN ALERT: ${title}`, 'success', 6000);
  };

  const addCustomerNotification = ({ title, message, type = 'system' }) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      type
    };
    setCustomerNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllCustomerRead = () => {
    setCustomerNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAllAdminRead = () => {
    setAdminNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearCustomerNotifications = () => {
    setCustomerNotifications([]);
  };

  const clearAdminNotifications = () => {
    setAdminNotifications([]);
  };

  const unreadCustomerCount = customerNotifications.filter((n) => !n.read).length;
  const unreadAdminCount = adminNotifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        customerNotifications,
        adminNotifications,
        unreadCustomerCount,
        unreadAdminCount,
        unreadCount: unreadCustomerCount, // fallback
        notifications: customerNotifications, // fallback
        addAdminNotification,
        addCustomerNotification,
        markAllCustomerRead,
        markAllAdminRead,
        markAllAsRead: markAllCustomerRead,
        clearNotifications: clearCustomerNotifications,
        clearCustomerNotifications,
        clearAdminNotifications,
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-2xl backdrop-blur-md border transition-all duration-300 animate-bounce-short ${
              toast.type === 'success'
                ? 'bg-[#053b27] border-emerald-500/50 text-white font-bold'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-100 font-bold'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-100 font-bold'
                : 'bg-slate-900/95 border-slate-700 text-slate-100 font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-emerald-400 shrink-0" />}
              <span className="text-xs sm:text-sm leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
