import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { addToast } = useNotification();
  const isFav = isInWishlist(product.id);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast(`Added ${product.title} to cart!`, 'success');

    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(isFav ? `Removed from wishlist` : `Saved to wishlist`, 'info');
  };

  const getBadgeStyle = (badge) => {
    const b = badge.toUpperCase();
    if (b.includes('BEST') || b.includes('SALE')) return 'bg-[#800c0c] text-white';
    if (b.includes('FROZEN')) return 'bg-[#eab308] text-slate-950 font-bold';
    if (b.includes('OFF') || b.includes('%')) return 'bg-[#ea580c] text-white';
    if (b.includes('ORGANIC')) return 'bg-[#10b981] text-white';
    return 'bg-[#0284c7] text-white';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="tazaj-card group relative flex flex-col justify-between rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all h-full w-full min-w-0 overflow-hidden"
    >
      {/* Top Header: Badges & Wishlist */}
      <div className="flex items-start justify-between gap-1 z-10">
        <div className="flex flex-wrap items-center gap-1 max-w-[78%]">
          {product.badges && product.badges.length > 0 ? (
            product.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`text-[9px] xs:text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs ${getBadgeStyle(
                  badge
                )}`}
              >
                {badge}
              </span>
            ))
          ) : product.discount ? (
            <span className="bg-[#ea580c] text-white text-[9px] xs:text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md uppercase">
              {product.discount}% OFF
            </span>
          ) : (
            <span className="bg-[#0284c7] text-white text-[9px] xs:text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md uppercase">
              {product.category?.split(' ')[0] || 'FRESH'}
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleToggleWishlist}
          className={`p-1 xs:p-1.5 rounded-full transition-all duration-200 shrink-0 ${
            isFav
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </motion.button>
      </div>

      {/* Product Image */}
      <Link
        to={`/customer/products/${product.id}`}
        className="block relative my-1.5 sm:my-2 overflow-hidden rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/40 p-2 sm:p-3 aspect-square flex items-center justify-center group-hover:bg-emerald-50/40 dark:group-hover:bg-slate-800/80 transition-colors"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain object-center block group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-rose-600 text-white font-bold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-1 mt-0.5">
        {/* Title */}
        <Link to={`/customer/products/${product.id}`}>
          <h3 className="font-semibold text-[11px] xs:text-xs sm:text-sm line-clamp-2 text-slate-800 dark:text-slate-100 leading-tight sm:leading-snug group-hover:text-[#053b27] dark:group-hover:text-emerald-400 transition-colors min-h-[2rem] xs:min-h-[2.2rem] sm:min-h-[2.4rem]">
            {product.title}
          </h3>
        </Link>

        {/* Unit / Weight & Rating */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] xs:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
            {product.unit || '1000gm'}
          </span>
          {/* Rating */}
          <div className="flex items-center gap-0.5 text-amber-500 text-[10px] xs:text-xs font-semibold shrink-0">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 stroke-amber-500" />
            <span>({product.rating || '4.8'})</span>
          </div>
        </div>

        {/* Bottom Row: Price with Rupee symbol & Green Circle Plus Button */}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-slate-100 dark:border-slate-800/80 mt-1">
          <div className="flex items-baseline gap-1 truncate">
            <span className="text-xs xs:text-sm sm:text-base md:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              ₹{typeof product.price === 'number' ? (Number.isInteger(product.price) ? product.price : product.price.toFixed(2)) : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] xs:text-xs text-slate-400 dark:text-slate-500 line-through">
                ₹{typeof product.originalPrice === 'number' ? (Number.isInteger(product.originalPrice) ? product.originalPrice : product.originalPrice.toFixed(2)) : product.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-md shrink-0 ${
              addedAnim
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-[#053b27] hover:bg-[#032619] text-white active:bg-emerald-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Add to Cart"
          >
            <AnimatePresence mode="wait">
              {addedAnim ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                </motion.div>
              ) : (
                <motion.div key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
