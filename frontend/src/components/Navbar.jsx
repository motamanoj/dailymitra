import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  Bell,
  User,
  LogOut,
  MapPin,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
  LayoutDashboard,
  Milk,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const Navbar = ({ onReplaySplash }) => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItemCount, wishlist } = useCart();
  const {
    unreadCustomerCount,
    unreadAdminCount,
    customerNotifications,
    adminNotifications,
    markAllCustomerRead,
    markAllAdminRead
  } = useNotification();

  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('New Delhi');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (isAdmin) {
        navigate(`/admin/products?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate(`/customer/products?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const locationsList = ['New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai'];

  const subNavLinks = isAdmin
    ? [
        { label: 'Manage Products ▾', path: '/admin/products' },
        { label: '+ Add Product', path: '/admin/products/add' },
        { label: 'Manage Orders ▾', path: '/admin/orders' },
        { label: 'Discount Coupons ▾', path: '/admin/coupons' },
        { label: 'Income & Revenue', path: '/admin/income' },
        { label: 'Customer Reviews', path: '/admin/reviews' },
      ]
    : [
        { label: 'Products ▾', path: '/customer/products' },
        { label: 'Whats new', path: '/customer/products?category=Fresh%20Fruits' },
        { label: 'Delivery', path: '/customer/track-order' },
        { label: 'Deals & Offers ▾', path: '/customer/products?offer=discount' },
        { label: 'Help & Support', path: '/customer/notifications' },
      ];

  const currentUnreadCount = isAdmin ? unreadAdminCount : unreadCustomerCount;
  const currentNotifList = isAdmin ? adminNotifications : customerNotifications;

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#043927] text-white py-1 sm:py-1.5 px-3 sm:px-4 text-[10px] sm:text-xs">
        <div className="max-w-[1800px] w-full mx-auto px-2 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0 truncate">
            <span className="font-bold text-amber-300 shrink-0">
              {isAdmin ? '🛡️ Admin Portal' : 'Get 30% OFF your first order'}
            </span>
            <span className="hidden sm:inline text-emerald-300">✦</span>
            <span className="hidden sm:inline">
              {isAdmin ? 'Live Store Inventory & Fulfillment Control' : 'Order now & get 20-min delivery'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-200 shrink-0">
            <Link to={isAdmin ? '/admin/products' : '/customer/products'} className="hover:text-emerald-300 transition-colors">
              {isAdmin ? 'Manage Items' : 'Catalog'}
            </Link>
            <Link to={isAdmin ? '/admin/orders' : '/customer/products'} className="hover:text-emerald-300 transition-colors">
              {isAdmin ? 'Orders Log' : 'FAQs'}
            </Link>
            {onReplaySplash && (
              <button
                onClick={onReplaySplash}
                className="bg-emerald-600/60 hover:bg-emerald-500 border border-emerald-400/40 text-emerald-200 hover:text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all shadow-sm"
                title="Watch Intro Animation"
              >
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                <span>Play Intro</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-[1800px] w-full mx-auto px-3 sm:px-6 lg:px-10 xl:px-12">
          <div className="flex items-center justify-between h-14 sm:h-18 lg:h-20 gap-1.5 sm:gap-4">
            
            {/* Logo Brand: DailyMitra */}
            <Link to={isAdmin ? '/admin/dashboard' : '/customer/dashboard'} className="flex items-center gap-2 shrink-0 py-1">
              <div className="relative flex items-center">
                <img
                  src="/logo.png"
                  alt="DailyMitra Logo"
                  className="h-7 xs:h-8 sm:h-11 lg:h-12 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Delivery Location Selector (Customer only) */}
            {!isAdmin && (
              <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-3.5 py-1.5 text-xs relative">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <div className="flex flex-col text-[10px] leading-none">
                  <span className="text-slate-400 font-medium">Delivery to</span>
                  <button
                    onClick={() => setShowLocationModal(!showLocationModal)}
                    className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 hover:text-emerald-600 text-xs"
                  >
                    {selectedLocation} <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                {/* Location Dropdown */}
                <AnimatePresence>
                  {showLocationModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 top-12 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xl z-50"
                    >
                      <p className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase">Select City</p>
                      {locationsList.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedLocation(loc);
                            setShowLocationModal(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                            selectedLocation === loc
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Search Input Bar (Desktop / Tablet) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-lg relative">
              <input
                type="text"
                placeholder={isAdmin ? "Search admin inventory, orders, products..." : "Search milk, ghee, fruits, vegetables..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-full py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition-all shadow-inner"
              />
              <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            {/* Right Action Icons & Profile (Optimized for Mobile: Fits 1 row perfectly) */}
            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3 shrink-0">
              {/* Light/Dark Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-all"
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="relative p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-all"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {currentUnreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-bold text-[9px] sm:text-[10px] min-w-[15px] h-3.5 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center">
                      {currentUnreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-72 xs:w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl z-50"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <Bell className="w-4 h-4 text-emerald-600" /> {isAdmin ? 'Admin Order Alerts' : 'Notifications'}
                        </h4>
                        {currentUnreadCount > 0 && (
                          <button
                            onClick={isAdmin ? markAllAdminRead : markAllCustomerRead}
                            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto my-2">
                        {currentNotifList.length === 0 ? (
                          <p className="text-xs text-slate-400 py-6 text-center">No notifications right now.</p>
                        ) : (
                          currentNotifList.map((n) => (
                            <div key={n.id} className={`py-3 px-2 rounded-xl transition-colors ${n.read ? 'opacity-70' : 'bg-emerald-50/50 dark:bg-slate-800/50 font-medium'}`}>
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{n.title}</span>
                                <span className="text-[10px] text-slate-400 font-bold">{n.time}</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>

                      <Link
                        to={isAdmin ? '/admin/orders' : '/customer/notifications'}
                        onClick={() => setShowNotifications(false)}
                        className="block text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
                      >
                        {isAdmin ? 'View All Manage Orders →' : 'View All Notifications →'}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isAdmin && (
                <>
                  {/* Wishlist Icon */}
                  <Link
                    to="/customer/wishlist"
                    className="relative p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-all"
                    title="Wishlist"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[9px] sm:text-[10px] min-w-[15px] h-3.5 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  {/* Cart Icon */}
                  <Link
                    to="/customer/cart"
                    className="relative flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 sm:px-3 rounded-full bg-[#053b27] hover:bg-[#032619] text-white transition-all shadow-md"
                    title="Cart"
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-[10px] sm:text-xs bg-amber-400 text-slate-950 px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full min-w-[16px] text-center">
                      {totalItemCount}
                    </span>
                  </Link>
                </>
              )}

              {/* User Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center">
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-52 sm:w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-2xl z-50"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        </div>

                        <Link
                          to={isAdmin ? '/admin/profile' : '/customer/profile'}
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-emerald-600" /> Account Profile
                        </Link>

                        <Link
                          to={isAdmin ? '/admin/dashboard' : '/customer/orders'}
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-emerald-600" /> {isAdmin ? 'Admin Dashboard' : 'Orders & History'}
                        </Link>

                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            logout();
                            navigate('/auth/login');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors mt-1 border-t border-slate-100 dark:border-slate-800"
                        >
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link
                    to="/auth/login"
                    className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 px-2 sm:px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="bg-[#053b27] hover:bg-[#032619] text-white font-bold text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full transition-all shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Drawer Trigger (Hamburger) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center min-w-[34px] min-h-[34px]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navbar Links */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-gray-200/80 dark:border-slate-800 hidden lg:block">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="flex items-center justify-between h-10 text-xs font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-6">
              {subNavLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-[11px]">
              <Link to={isAdmin ? '/admin/products' : '/customer/products'} className="hover:text-emerald-600">
                {isAdmin ? 'Inventory' : 'Returns'}
              </Link>
              <Link to={isAdmin ? '/admin/orders' : '/customer/products'} className="hover:text-emerald-600">
                {isAdmin ? 'Fulfillment' : 'FAQs'}
              </Link>
              <span className="text-orange-600 font-bold bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded-md text-[10px]">
                ✉ Support HQ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3"
          >
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                placeholder={isAdmin ? "Search admin inventory..." : "Search products..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-800 dark:text-slate-100"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            {subNavLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 py-1.5"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
