import React, { useState } from 'react';
import { Ticket, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useNotification } from '../../context/NotificationContext';

const initialCoupons = [
  { id: 1, code: 'DAILY20', discount: 20, maxUses: 500, used: 142, active: true },
  { id: 2, code: 'FRESH10', discount: 10, maxUses: 1000, used: 410, active: true },
  { id: 3, code: 'FESTIVE15', discount: 15, maxUses: 200, used: 200, active: false },
];

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const { addToast } = useNotification();

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!code || !discount) return;
    const newCoupon = {
      id: Date.now(),
      code: code.toUpperCase().trim(),
      discount: parseInt(discount, 10),
      maxUses: 500,
      used: 0,
      active: true,
    };
    setCoupons([newCoupon, ...coupons]);
    addToast(`Created Coupon ${newCoupon.code}`, 'success');
    setCode('');
    setDiscount('');
  };

  const toggleCouponStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const deleteCoupon = (id, couponCode) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    addToast(`Deleted voucher ${couponCode}`, 'warning');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8 max-w-[1600px] w-full min-w-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Manage Discount Coupons & Vouchers
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create & control promo code discounts for customer checkout.
          </p>
        </div>

        {/* Create Coupon Form */}
        <form onSubmit={handleCreateCoupon} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Create New Discount Voucher
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. MILK25"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs uppercase text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Discount %</label>
              <input
                type="number"
                required
                placeholder="25"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-[#053b27] hover:bg-[#032619] active:scale-95 text-white font-extrabold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Voucher
              </button>
            </div>
          </div>
        </form>

        {/* Coupons List Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 font-bold tracking-wider">
              <tr>
                <th className="p-4">Promo Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Usage Stats</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400">{c.code}</td>
                  <td className="p-4 font-extrabold text-slate-900 dark:text-slate-100">{c.discount}% OFF</td>
                  <td className="p-4 text-slate-500">{c.used} / {c.maxUses} redeems</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleCouponStatus(c.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        c.active
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {c.active ? 'ACTIVE' : 'EXPIRED'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => deleteCoupon(c.id, c.code)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageCoupons;
