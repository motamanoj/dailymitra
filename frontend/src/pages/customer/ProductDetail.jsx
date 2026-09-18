import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Milk, Star, ShoppingBag, Heart, ShieldCheck, Truck, Plus, Minus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { useProducts } from '../../context/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState('Daily Morning');
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { addToast } = useNotification();

  const isFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, frequency);
    addToast(`Added ${quantity}x ${product.title} to cart!`, 'success');
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-8 space-y-4 sm:space-y-8 overflow-x-hidden">
      {/* Back Button */}
      <Link to="/customer/products" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Image Preview */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 sm:p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
            {product.discount && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-orange-500 text-white font-bold text-[11px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg">
                {product.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Details & Purchase Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{product.title}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating || 4.8}</span>
                <span className="text-slate-400">({product.reviewsCount || 120} customer reviews)</span>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock || 50} available)
              </span>
            </div>
          </div>

          {/* Pricing in Rupees */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              ₹{typeof product.price === 'number' ? (Number.isInteger(product.price) ? product.price : product.price.toFixed(2)) : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ₹{typeof product.originalPrice === 'number' ? (Number.isInteger(product.originalPrice) ? product.originalPrice : product.originalPrice.toFixed(2)) : product.originalPrice}
              </span>
            )}
            <span className="text-xs text-slate-500">/ {product.unit || '1000gm'}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description || 'Farm-fresh quality product, processed with 100% natural standards and zero artificial preservatives.'}
          </p>

          {/* Subscription Frequency Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">Delivery Schedule</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Daily Morning', 'Alternate Days', 'Once a Week', 'One Time Buy'].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    frequency === freq
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-700 dark:text-emerald-300 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector & Add to Cart */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-slate-900 dark:text-slate-100">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-1 bg-[#053b27] hover:bg-[#032619] text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart ({frequency})</span>
            </button>

            <button
              onClick={() => {
                toggleWishlist(product);
                addToast(isFav ? 'Removed from wishlist' : 'Saved to wishlist', 'info');
              }}
              className={`p-3.5 rounded-xl border transition-all ${
                isFav
                  ? 'bg-rose-50 border-rose-400 text-rose-600'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Morning Delivery by 7 AM
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Pure & Untouched Quality
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
