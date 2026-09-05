import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Trash2
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, moveAllWishlistToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div id="empty-wishlist-view" className="py-16 text-center max-w-md mx-auto animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-5">
          <Heart className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">Your wishlist is empty</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Tap the heart icon on any product to save items you want to keep an eye on or buy later.
        </p>
        <Link
          to="/products"
          id="wishlist-browse-btn"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div id="wishlist-page" className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Wishlist</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
              {wishlist.length} saved
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Items you have bookmarked for later. Move them directly to your cart at any time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="move-all-to-cart-btn"
            type="button"
            onClick={moveAllWishlistToCart}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Cart</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
