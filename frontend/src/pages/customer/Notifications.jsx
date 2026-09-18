import React from 'react';
import { Bell, CheckCircle2, Trash2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const Notifications = () => {
  const { notifications, markAllAsRead, clearNotifications } = useNotification();

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Notifications Center</h1>
          <p className="text-xs text-slate-400">Updates regarding your deliveries, subscriptions, and special promos</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark all read
          </button>
          <button
            onClick={clearNotifications}
            className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl text-slate-400 text-xs">
            No notifications available.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`glass-panel p-5 rounded-2xl border transition-all ${
                n.read ? 'border-slate-800 opacity-80' : 'border-emerald-500/40 bg-slate-900/80 shadow-md'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" /> {n.title}
                  </h4>
                  <p className="text-xs text-slate-300">{n.message}</p>
                </div>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
