import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, KeyRound, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@dailymitra.com');
  const [password, setPassword] = useState('admin123');
  const { login, loading } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please provide admin credentials', 'warning');
      return;
    }
    const res = await login(email, password, true);
    if (res.success) {
      addToast('Admin Portal Access Granted', 'success');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Background ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative z-10 transition-colors"
      >
        <div className="text-center space-y-3 mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-14 h-14 mx-auto rounded-2xl bg-[#053b27] text-white flex items-center justify-center shadow-md cursor-pointer"
          >
            <ShieldCheck className="w-8 h-8 text-amber-300 stroke-[2.5]" />
          </motion.div>
          <div className="space-y-1">
            <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
              Admin & Staff HQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight pt-1">
              Admin Management Login
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Restricted portal for inventory, order fulfillment, and coupons controls
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Admin Email ID</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dailymitra.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Security Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#053b27] hover:bg-[#032619] btn-shine text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Access Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <Link to="/auth/login" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
            ← Return to Customer Storefront
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
