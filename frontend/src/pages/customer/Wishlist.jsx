import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import ProductCard from '../../components/ProductCard';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useCart();
  const { addToast } = useNotification();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500/50">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-400">Save your favourite daily products to quickly reorder them anytime.</p>
        </div>
        <Link
          to="/customer/products"
          className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-xl shadow-glow"
        >
          Explore Catalog →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-100">Saved Wishlist Items</h1>
        <span className="text-xs font-semibold text-rose-400">{wishlist.length} Saved</span>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 gap-3 sm:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
