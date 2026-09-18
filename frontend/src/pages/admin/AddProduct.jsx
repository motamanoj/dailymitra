import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, ArrowLeft, Image, Save } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useNotification } from '../../context/NotificationContext';
import { useProducts } from '../../context/ProductContext';
import { categoriesList } from '../../data/products';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addToast } = useNotification();
  const { addProduct } = useProducts();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categoriesList[1] || 'Milk & Dairy');
  const [brand, setBrand] = useState('DailyMitra');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [unit, setUnit] = useState('1000gm');
  const [stock, setStock] = useState('50');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    if (!title || isNaN(parsedPrice) || parsedPrice <= 0) {
      addToast('Please enter a valid product title and selling price', 'warning');
      return;
    }

    addProduct({
      title,
      category,
      brand,
      price: parsedPrice,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      unit,
      stock: parseInt(stock, 10) || 50,
      image: image || 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80',
      description,
    });

    addToast(`Successfully created ${title} for ₹${parsedPrice}!`, 'success');
    navigate('/admin/products');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 max-w-[1400px] w-full min-w-0">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
        </button>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Add New Store Product
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            List a new product item in the DailyMitra catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Organic Green Capsicum"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              >
                {categoriesList.filter((c) => c !== 'All Categories').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="24"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Original Price / MRP (₹)</label>
              <input
                type="number"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="30"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Unit Portion / Size</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="1000gm / 4pc"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Initial Stock Quantity</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Organic Farm / DailyMitra"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed item description..."
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="bg-[#053b27] hover:bg-[#032619] active:scale-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Save className="w-4 h-4" /> Save & Publish Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
