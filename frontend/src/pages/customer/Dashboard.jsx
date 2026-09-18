import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, ArrowRight, Sparkles, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../context/ProductContext';
import { categoriesList, brandsList } from '../../data/products';

const Dashboard = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('default');
  const [priceFilter, setPriceFilter] = useState('all');
  const [offerOnly, setOfferOnly] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category Filter
        const matchCategory =
          selectedCategory === 'All Categories' || item.category === selectedCategory;

        // Brand Filter
        const matchBrand =
          selectedBrand === 'All Brands' || item.brand === selectedBrand;

        // Price Filter (Rupee ranges)
        let matchPrice = true;
        if (priceFilter === 'under-50') matchPrice = item.price < 50;
        else if (priceFilter === '50-200') matchPrice = item.price >= 50 && item.price <= 200;
        else if (priceFilter === 'over-200') matchPrice = item.price > 200;

        // Offer Only
        let matchOffer = true;
        if (offerOnly) {
          matchOffer = item.discount || item.badges?.some((b) => b.includes('OFF') || b.includes('Sale'));
        }

        return matchCategory && matchBrand && matchPrice && matchOffer;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return a.id - b.id;
      });
  }, [products, selectedCategory, selectedBrand, sortBy, priceFilter, offerOnly]);

  return (
    <div className="max-w-[1800px] w-full mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 sm:py-8 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* 1. Hero Green Banner - Mobile Content-Height Driven & Compact */}
      <section className="hero-green-banner relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#032e1f] via-[#054830] to-[#022418] text-white px-3.5 py-3 xs:px-4 xs:py-3.5 sm:px-6 sm:py-5 lg:px-8 lg:py-6 shadow-xl border border-emerald-800/30">
        {/* Glow ambient background circles */}
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="hero-green-grid grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-6 items-center relative z-10">
          
          {/* Hero Content Left */}
          <div className="hero-green-content lg:col-span-7 space-y-1.5 sm:space-y-3">
            <h1 className="hero-green-title text-lg xs:text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug sm:leading-tight">
              Get <span className="text-amber-300 underline decoration-amber-400/40">free delivery</span> on <br className="hidden sm:block" />
              shopping ₹200
            </h1>

            <p className="hero-green-desc text-slate-200 text-[10px] xs:text-xs sm:text-sm leading-snug sm:leading-relaxed max-w-xl">
              Get the freshest groceries delivered right to your home. Save time, skip the lines, and enjoy quick, efficient delivery.
            </p>

            <div className="hero-green-action pt-0.5 sm:pt-1 flex flex-wrap items-center gap-3">
              <Link
                to="/customer/products"
                className="hero-green-btn bg-[#facc15] hover:bg-[#eab308] active:scale-95 text-slate-950 font-extrabold text-[11px] sm:text-xs px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5 group"
              >
                <span>Shop All Essentials</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hero Banner Right Image (Fresh Produce Basket) */}
          <div className="hero-green-image-wrapper lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-green-image-card relative w-full max-w-[220px] xs:max-w-[260px] sm:max-w-xs md:max-w-sm lg:w-72 h-24 xs:h-28 sm:h-36 lg:h-44 rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-emerald-400/20">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80"
                alt="Fresh Groceries Basket"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-slate-900/85 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                🌱 100% Farm Fresh Guaranteed
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Desktop / Laptop / Mobile Key Features Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {[
          { title: '⚡ Fast 20-Min Delivery', desc: 'Laptop or Mobile order', icon: '🚀' },
          { title: '🥛 Pure Farm Fresh', desc: 'Daily organic milk drop', icon: '🌿' },
          { title: '🛡️ Quality Inspected', desc: 'Strict freshness checks', icon: '✨' },
          { title: '💳 Cash & Online Pay', desc: 'UPI, Cards & NetBanking', icon: '💰' },
        ].map((feat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2.5 sm:gap-3.5 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xl sm:text-2xl p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 shrink-0">{feat.icon}</span>
            <div className="min-w-0 flex-1">
              <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{feat.title}</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{feat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 2. All Products Header & Filter Bar */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-row items-center justify-between gap-3">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            All Products
          </h2>
          {/* Active Filter Clear pill */}
          {(selectedCategory !== 'All Categories' || selectedBrand !== 'All Brands' || priceFilter !== 'all' || offerOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedBrand('All Brands');
                setPriceFilter('all');
                setOfferOnly(false);
              }}
              className="text-[11px] sm:text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 hover:bg-rose-100 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>

        {/* Filter Pills Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white dark:bg-slate-900/80 p-2.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm relative z-20">
          
          {/* Left Filter Pills (Scrollable on phone, flex on desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 max-w-full">
            
            {/* Category Pill Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => toggleDropdown('category')}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1 border transition-all whitespace-nowrap ${
                  selectedCategory !== 'All Categories'
                    ? 'bg-[#053b27] text-white border-[#053b27]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'category' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-9 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-2xl z-50 max-h-64 overflow-y-auto"
                  >
                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-xl transition-colors ${
                          selectedCategory === cat
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Pill Dropdown (Rupees) */}
            <div className="relative shrink-0">
              <button
                onClick={() => toggleDropdown('price')}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1 border transition-all whitespace-nowrap ${
                  priceFilter !== 'all'
                    ? 'bg-[#053b27] text-white border-[#053b27]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                <span>Price {priceFilter !== 'all' ? `(${priceFilter})` : ''}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'price' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-9 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-2xl z-50"
                  >
                    {[
                      { label: 'All Prices', val: 'all' },
                      { label: 'Under ₹50', val: 'under-50' },
                      { label: '₹50 to ₹200', val: '50-200' },
                      { label: 'Above ₹200', val: 'over-200' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => {
                          setPriceFilter(opt.val);
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-xl transition-colors ${
                          priceFilter === opt.val
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Offer Pill */}
            <button
              onClick={() => setOfferOnly(!offerOnly)}
              className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1 border transition-all shrink-0 whitespace-nowrap ${
                offerOnly
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-orange-400'
              }`}
            >
              <span>Offer 🔥</span>
            </button>

            {/* Brands Pill Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => toggleDropdown('brands')}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1 border transition-all whitespace-nowrap ${
                  selectedBrand !== 'All Brands'
                    ? 'bg-[#053b27] text-white border-[#053b27]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                <span>{selectedBrand}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'brands' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-9 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-2xl z-50 max-h-56 overflow-y-auto"
                  >
                    {brandsList.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setSelectedBrand(brand);
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-xl transition-colors ${
                          selectedBrand === brand
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800 justify-between sm:justify-end w-full sm:w-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-1.5 px-3 text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

        </div>

        {/* Product Grid - Optimized for Mobile (1 or 2 cols), Laptop & Widescreen Monitors */}
        <motion.div layout className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 gap-2.5 sm:gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl text-center space-y-3">
            <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">No products match your selected filters</p>
            <p className="text-xs text-slate-400">Try choosing a different category or clearing filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedBrand('All Brands');
                setPriceFilter('all');
                setOfferOnly(false);
              }}
              className="bg-[#053b27] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md hover:bg-[#032619] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

    </div>
  );
};

export default Dashboard;
