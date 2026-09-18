import React from 'react';
import { IndianRupee, TrendingUp, ArrowUpRight, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const Income = () => {
  const dailyEarnings = [
    { day: '16 Sep (Today)', orders: 482, revenue: 32776, profit: 9832 },
    { day: '15 Sep', orders: 470, revenue: 31960, profit: 9588 },
    { day: '14 Sep', orders: 465, revenue: 31620, profit: 9486 },
    { day: '13 Sep', orders: 450, revenue: 30600, profit: 9180 },
    { day: '12 Sep', orders: 440, revenue: 29920, profit: 8976 },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8 max-w-[1600px] w-full min-w-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Financial Revenue & Income Reports
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track daily subscription earnings, net profits, and bank payouts.
          </p>
        </div>

        {/* Financial Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Monthly Gross Revenue</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">₹4,89,200</h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +22.4% vs last month
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Estimated Net Profit</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">₹1,46,760</h2>
            <p className="text-xs text-slate-500">30% Net Margin</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Next Scheduled Bank Payout</span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">₹32,776</h2>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">Transferring tomorrow 9 AM</p>
          </div>
        </div>

        {/* Revenue Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Daily Revenue Log
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 font-bold tracking-wider">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total Deliveries</th>
                  <th className="p-3">Gross Revenue</th>
                  <th className="p-3">Net Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {dailyEarnings.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{row.day}</td>
                    <td className="p-3">{row.orders} Orders</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-white">₹{row.revenue.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">₹{row.profit.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Income;
