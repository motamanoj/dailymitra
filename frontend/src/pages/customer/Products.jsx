import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, PackageX, X, Filter, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../context/ProductContext';
import { categoriesList, brandsList } from '../../data/products';

const Products = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All Categories';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('default');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All Categories' || product.category === selectedCategory;
        const matchesBrand =
          selectedBrand === 'All Brands' || product.brand === selectedBrand;
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));

        let matchesPrice = true;
        if (priceFilter === 'under-50') matchesPrice = product.price < 50;
        else if (priceFilter === '50-200') matchesPrice = product.price >= 50 && product.price <= 200;
        else if (priceFilter === 'over-200') matchesPrice = product.price > 200;

        return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return a.id - b.id;
      });
  }, [products, searchQuery, selectedCategory, selectedBrand, sortBy, priceFilter]);

  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedBrand !== 'All Brands' ||
    priceFilter !== 'all' ||
    searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedBrand('All Brands');
    setPriceFilter('all');
    setSortBy('default');
  };

  return (
    <div className="max-w-[1800px] w-full mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 sm:py-8 space-y-4 sm:space-y-8 overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 sm:pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Store Catalog & Products
            </h1>
            <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} Items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse our complete range of fresh groceries, organic milk, fruits, and essentials on laptop or mobile.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-3.5 py-2 rounded-full flex items-center gap-1.5 self-start sm:self-auto hover:bg-rose-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear All Filters
          </button>
        )}
      </div>

      {/* Main Grid: Desktop/Laptop Sidebar (3 cols) + Right Content (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar for Laptop & Desktop Screens */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 2xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-600" /> Catalog Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-rose-500 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Categories List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</label>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#053b27] text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Ranges */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Price Range</label>
              <div className="space-y-1">
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under ₹50', val: 'under-50' },
                  { label: '₹50 to ₹200', val: '50-200' },
                  { label: 'Above ₹200', val: 'over-200' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setPriceFilter(opt.val)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      priceFilter === opt.val
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {priceFilter === opt.val && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Brands</label>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {brandsList.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedBrand === brand
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="lg:col-span-9 xl:col-span-9 2xl:col-span-10 space-y-6">
          
          {/* Top Search & Filter Bar (Visible on mobile & tablet, enhanced on laptop) */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search products by title, category, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-2.5 pl-9 pr-4 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Category Pills (Mobile/Tablet horizontal bar) */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              {categoriesList.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#053b27] text-white font-bold shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-2 px-3.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

          {/* Product Grid - Widescreen & Laptop optimized */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto my-12 shadow-sm">
              <PackageX className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">No products found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Try adjusting your search query or filters.</p>
              <button
                onClick={clearAllFilters}
                className="bg-[#053b27] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 gap-2.5 sm:gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Products;
