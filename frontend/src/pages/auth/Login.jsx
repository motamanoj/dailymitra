import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Milk, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const Login = () => {
  const [email, setEmail] = useState('customer@dailymitra.com');
  const [password, setPassword] = useState('password123');
  const { login, loading } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/customer/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'warning');
      return;
    }
    const res = await login(email, password, false);
    if (res.success) {
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Dynamic Animated Ambient Glow Background */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative z-10 transition-colors"
      >
        {/* Header Badge & Title */}
        <div className="text-center space-y-3 mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-14 h-14 mx-auto rounded-2xl bg-[#053b27] text-white flex items-center justify-center shadow-md cursor-pointer"
          >
            <Milk className="w-8 h-8 text-amber-300 stroke-[2.5]" />
          </motion.div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Customer Sign In
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Access your daily fresh milk subscriptions and doorstep orders
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
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

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer font-medium">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 dark:border-slate-700 text-[#053b27] focus:ring-0" />
              Remember me
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('Password reset link sent to email!', 'info'); }} className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#053b27] hover:bg-[#032619] btn-shine text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{loading ? 'Logging in...' : 'Sign In to Account'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
              Create Account
            </Link>
          </p>

          <div>
            <Link
              to="/auth/admin-login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 transition-colors shadow-sm hover-lift"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Switch to Admin Portal
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
