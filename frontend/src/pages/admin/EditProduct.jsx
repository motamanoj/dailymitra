import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useNotification } from '../../context/NotificationContext';
import { useProducts } from '../../context/ProductContext';
import { categoriesList } from '../../data/products';

const EditProduct = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const navigate = useNavigate();
  const { addToast } = useNotification();
  const { products, updateProduct } = useProducts();

  const existingProduct = products.find((p) => p.id === productId) || products[0];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (existingProduct) {
      setTitle(existingProduct.title || '');
      setCategory(existingProduct.category || 'Milk & Dairy');
      setPrice(existingProduct.price !== undefined ? existingProduct.price.toString() : '');
      setOriginalPrice(existingProduct.originalPrice !== undefined ? existingProduct.originalPrice.toString() : '');
      setStock(existingProduct.stock !== undefined ? existingProduct.stock.toString() : '50');
      setUnit(existingProduct.unit || '1000gm');
      setImage(existingProduct.image || '');
    }
  }, [existingProduct, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      addToast('Please enter a valid price', 'warning');
      return;
    }

    const updatedData = {
      title,
      category,
      price: parsedPrice,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      stock: parseInt(stock, 10) || 0,
      unit,
      image,
    };

    updateProduct(productId, updatedData);
    addToast(`Successfully updated price for ${title} to ₹${parsedPrice}!`, 'success');
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
            Edit Item #{id}: {title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Modify product details, selling price, MRP, and stock inventory.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          {/* Image preview thumbnail */}
          {image && (
            <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <img src={image} alt={title} className="w-16 h-16 object-contain rounded-xl bg-white dark:bg-slate-900 p-1" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{title}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Current Price: ₹{price}</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 24"
                className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500/50 dark:border-emerald-500/40 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Original Price / MRP (₹)</label>
              <input
                type="number"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. 30"
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Unit Portion</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Stock Count</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-[#053b27] hover:bg-[#032619] active:scale-95 text-white font-extrabold text-xs sm:text-sm px-7 py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Save className="w-4 h-4" /> Save & Apply Price Changes
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs px-5 py-3 rounded-full transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProduct;
