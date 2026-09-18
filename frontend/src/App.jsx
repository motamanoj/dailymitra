import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ActiveOrderBottomBar from './components/ActiveOrderBottomBar';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLogin from './pages/auth/AdminLogin';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import Products from './pages/customer/Products';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Wishlist from './pages/customer/Wishlist';
import Orders from './pages/customer/Orders';
import TrackOrder from './pages/customer/TrackOrder';
import Notifications from './pages/customer/Notifications';
import Profile from './pages/customer/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import ManageOrders from './pages/admin/ManageOrders';
import ManageCoupons from './pages/admin/ManageCoupons';
import Income from './pages/admin/Income';
import Reviews from './pages/admin/Reviews';
import AdminProfile from './pages/admin/AdminProfile';

import SplashScreen from './components/SplashScreen';
import { AnimatePresence, motion } from 'framer-motion';

import InstallPwaBanner from './components/InstallPwaBanner';

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <Navbar onReplaySplash={() => setShowSplash(true)} />


      <div className="flex-1 pb-16">
        <Routes>
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/customer/dashboard" replace />} />

          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/admin-login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/products" element={<Products />} />
          <Route path="/customer/products/:id" element={<ProductDetail />} />
          <Route path="/customer/cart" element={<Cart />} />
          <Route path="/customer/wishlist" element={<Wishlist />} />
          <Route path="/customer/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/customer/track-order" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
          <Route path="/customer/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/customer/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute requireAdmin><ManageProducts /></ProtectedRoute>} />
          <Route path="/admin/products/add" element={<ProtectedRoute requireAdmin><AddProduct /></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute requireAdmin><EditProduct /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute requireAdmin><ManageOrders /></ProtectedRoute>} />
          <Route path="/admin/coupons" element={<ProtectedRoute requireAdmin><ManageCoupons /></ProtectedRoute>} />
          <Route path="/admin/income" element={<ProtectedRoute requireAdmin><Income /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute requireAdmin><Reviews /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute requireAdmin><AdminProfile /></ProtectedRoute>} />

          {/* Catch-all 404 Redirect */}
          <Route path="*" element={<Navigate to="/customer/dashboard" replace />} />
        </Routes>
      </div>

      {/* Floating Active Order Bottom Status Bar */}
      <ActiveOrderBottomBar />

      {/* PWA Mobile Installation Prompt Banner */}
      <InstallPwaBanner />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 DailyMitra. Fresh Milk & Daily Essentials Platform. All rights reserved.</p>
          <div className="flex gap-4 text-slate-500 dark:text-slate-400 items-center font-medium">
            <span className="hover:text-emerald-600 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-emerald-600 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <Link to="/admin/login" className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
