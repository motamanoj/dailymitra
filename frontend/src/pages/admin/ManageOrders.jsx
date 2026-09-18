import React, { useState } from 'react';
import { ShoppingBag, Search, CheckCircle2, Truck, Clock, RefreshCw } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const ManageOrders = () => {
  const { ordersHistory, updateOrderStatus } = useCart();
  const [filterStatus, setFilterStatus] = useState('All');
  const { addToast, addCustomerNotification } = useNotification();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    addToast(`Updated order ${orderId} status to "${newStatus}"`, 'success');
    addCustomerNotification({
      title: `Order Status Update: ${newStatus}`,
      message: `Your order #${orderId} status has been updated to "${newStatus}".`,
      type: newStatus === 'Delivered' ? 'delivery' : 'system'
    });
  };

  const filtered = ordersHistory.filter(
    (o) => filterStatus === 'All' || o.status === filterStatus
  );

  const formatItems = (items) => {
    if (!items) return '1x Store Item';
    if (typeof items === 'string') return items;
    if (Array.isArray(items)) {
      return items.map((i) => `${i.qty}x ${i.name}`).join(', ');
    }
    return '1x Store Item';
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 max-w-[1800px] w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Customer Orders & Fulfillment
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track, inspect, and update daily delivery statuses in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-[#053b27] text-white font-bold shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 font-bold tracking-wider">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Items Summary</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">
                      No orders found under "{filterStatus}".
                    </td>
                  </tr>
                ) : (
                  filtered.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{ord.id}</td>
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{ord.customer || 'Rahul Sharma'}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">{formatItems(ord.items)}</td>
                      <td className="p-4 font-extrabold text-slate-900 dark:text-white">₹{ord.total}</td>
                      <td className="p-4 text-slate-500">{ord.date}</td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-600 cursor-pointer shadow-sm"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageOrders;
