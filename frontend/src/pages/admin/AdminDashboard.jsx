import React from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, ShoppingBag, Users, Package, TrendingUp, AlertTriangle, ArrowUpRight, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const AdminDashboard = () => {
  const { ordersHistory } = useCart();
  const { products } = useProducts();

  const stats = [
    { title: 'Total Sales Revenue', value: '₹1,48,920', change: '+18.4% this week', isPositive: true, icon: IndianRupee, color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300' },
    { title: 'Active Subscribers', value: '1,240 Families', change: '+12.5% new signups', isPositive: true, icon: Users, color: 'text-teal-700 bg-teal-100 dark:bg-teal-950/60 dark:text-teal-300' },
    { title: "Today's Orders", value: `${ordersHistory.length} Deliveries`, change: 'Morning Batch Sent', isPositive: true, icon: ShoppingBag, color: 'text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300' },
    { title: 'Total Inventory Items', value: `${products.length} Products`, change: 'All Categories Live', isPositive: true, icon: Package, color: 'text-emerald-800 bg-emerald-100 dark:bg-emerald-900/60 dark:text-emerald-200' },
  ];

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

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8 max-w-[1800px] w-full min-w-0">
        
        {/* Banner Welcome Header */}
        <div className="bg-[#053b27] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" /> DailyMitra Store Operations HQ
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Admin Overview Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-200">
              Manage inventory, process customer subscriptions, track sales metrics, and configure discount vouchers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 z-10">
            <Link
              to="/admin/products/add"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-full shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add Product
            </Link>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.title}</span>
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{stat.value}</h3>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders & Store Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Recent Store Orders</h3>
              <Link to="/admin/orders" className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1">
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="text-[11px] uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold tracking-wider">
                  <tr>
                    <th className="p-3 rounded-l-xl">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Item Purchased</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {ordersHistory.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{ord.id}</td>
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{ord.customer || 'Rahul Sharma'}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400 max-w-xs truncate">{formatItems(ord.items)}</td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-white">₹{ord.total}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : ord.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Store Actions & Top Stock Preview */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
                Quick Store Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/admin/products/add"
                  className="block p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 transition-colors"
                >
                  + Add New Inventory Item
                </Link>
                <Link
                  to="/admin/coupons"
                  className="block p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 transition-colors"
                >
                  🎟️ Create Discount Voucher
                </Link>
                <Link
                  to="/admin/income"
                  className="block p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 transition-colors"
                >
                  📈 View Financial Income Report
                </Link>
              </div>
            </div>

            {/* Catalog Items Highlight */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">Live Inventory Snapshot</h4>
                <Link to="/admin/products" className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Manage All ({products.length}) →
                </Link>
              </div>

              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <img src={p.image} alt={p.title} className="w-8 h-8 object-contain rounded-lg bg-white dark:bg-slate-900 p-0.5" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[140px]">{p.title}</span>
                    </div>
                    <span className="font-extrabold text-slate-900 dark:text-white">₹{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
