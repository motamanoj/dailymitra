import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Ticket,
  IndianRupee,
  Star,
  UserCheck,
  LogOut,
  Milk,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Products', path: '/admin/products', icon: Package },
    { label: 'Add Product', path: '/admin/products/add', icon: PlusCircle },
    { label: 'Manage Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Manage Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'Income & Revenue', path: '/admin/income', icon: IndianRupee },
    { label: 'Product Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Admin Profile', path: '/admin/profile', icon: UserCheck },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 justify-between transition-colors">
      <div className="space-y-6">
        {/* Admin Badge */}
        <div className="p-2.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center gap-3">
          <img src="/logo.png" alt="DailyMitra Logo" className="h-10 w-auto object-contain" />
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">DailyMitra HQ</h4>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Store Operations</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/admin/products'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#053b27] text-white shadow-md shadow-emerald-950/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            logout();
            navigate('/auth/admin-login');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200 dark:border-rose-900 transition-all"
        >
          <LogOut className="w-4 h-4" /> Log Out Admin
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
