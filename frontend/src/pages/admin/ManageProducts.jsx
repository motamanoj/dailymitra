import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit3, Trash2, CheckCircle2, AlertTriangle, Filter, Star, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import { useNotification } from '../../context/NotificationContext';
import { useProducts } from '../../context/ProductContext';
import { categoriesList } from '../../data/products';

const ManageProducts = () => {
  const { products, deleteProduct, resetProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const { addToast } = useNotification();

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProduct(id);
      addToast(`Deleted ${title}`, 'warning');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 max-w-[1800px] w-full min-w-0">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Manage Store Inventory
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              View, edit selling prices, or update all {products.length} products in your catalog.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetProducts();
                addToast('Reset inventory to default catalog items', 'info');
              }}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs px-3.5 py-2.5 rounded-full flex items-center gap-1.5 transition-all"
              title="Reset Catalog to Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
            <Link
              to="/admin/products/add"
              className="bg-[#053b27] hover:bg-[#032619] active:scale-95 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </Link>
          </div>
        </div>

        {/* Toolbar: Search, Category Filters, View Switcher */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products by title or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-2.5 pl-9 pr-4 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {categoriesList.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#053b27] text-white font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-xl p-1 bg-slate-100 dark:bg-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* View Mode: Table or Grid */}
        {viewMode === 'table' ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800/80 uppercase text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Item</th>
                    <th className="p-4">Category & Brand</th>
                    <th className="p-4">Selling Price (₹)</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-12 h-12 object-contain rounded-xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0"
                        />
                        <div className="space-y-0.5 max-w-xs">
                          <span className="line-clamp-1">{prod.title}</span>
                          <span className="block text-[10px] text-slate-400 font-medium">{prod.unit}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{prod.category}</span>
                        <span className="text-[10px] text-slate-400">{prod.brand || 'DailyMitra'}</span>
                      </td>
                      <td className="p-4 font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">
                        ₹{typeof prod.price === 'number' ? (Number.isInteger(prod.price) ? prod.price : prod.price.toFixed(2)) : prod.price}
                        {prod.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through block font-normal">
                            ₹{prod.originalPrice}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {prod.rating || 4.8}
                        </span>
                      </td>
                      <td className="p-4">
                        {prod.stock < 30 ? (
                          <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold px-2.5 py-1 rounded-full text-[10px] inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-600" /> Limited ({prod.stock})
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Stock ({prod.stock})
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/edit/${prod.id}`}
                            className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-bold flex items-center gap-1 text-xs"
                            title="Edit Price & Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit Price
                          </Link>
                          <button
                            onClick={() => handleDelete(prod.id, prod.title)}
                            className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 sm:gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="tazaj-card rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="relative aspect-square rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4 flex items-center justify-center">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                    {prod.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">{prod.title}</h3>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">₹{prod.price}</span>
                    <span className="text-slate-500">{prod.unit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-3">
                  <Link
                    to={`/admin/products/edit/${prod.id}`}
                    className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Price
                  </Link>
                  <button
                    onClick={() => handleDelete(prod.id, prod.title)}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageProducts;
